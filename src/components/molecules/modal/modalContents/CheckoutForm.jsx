import React, { useRef, useState, useEffect, Suspense } from "react";
import {
	PaymentElement,
	LinkAuthenticationElement,
	ElementsConsumer,
	AddressElement,
	useStripe, 
	useElements
} from '@stripe/react-stripe-js'
import { useLocation } from "react-router-dom";
import { Loading } from './Loading';
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import {useIntl} from 'react-intl'
import { useMount } from "react-use"; 

//	タイマー空で定義
let onReadyTimer;
let userShippingName = []
let addressElementArray = []
let addressElementArrayPriority = []
let inputWrapClass = 'grid grid-cols-1 content-center pt-2';

export const CheckoutForm = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
	const [userStateObj, setUserState] = useRecoilState(userState);
	const [errorMessage, setErrorMessage] = useState({ userName: null});
	////////////////////////////////////////////////
	//	名前inputの管理
	//	onNameInputで画面上の体裁
	//　onNameChangeで少ない回数のrecoil更新
	//	初期値はrecoilの名前で入力の手間を減らすパターン
	const [nameValue, setNameValue] = useState(userStateObj?.userChargeName)
	//	初期値は空で毎回入力させるパターン
	// const [nameValue, setNameValue] = useState()
	//	onBlurでricoil更新
    const onNameChange = event => setUserState((prevState) => ({...prevState, userChargeName:nameValue}));
	//	onChangeでstateだけ更新
	const onNameInput = event => setNameValue(event.target.value)
	console.log("[CheckoutForm]nameValue==>",nameValue);
	//	名前inputの管理
	////////////////////////////////////////////////

	const stripe = useStripe();
	const elements = useElements();
	console.log("[CheckoutForm]stripe==>",stripe);
	console.log("[CheckoutForm]elements==>",elements);

    ///////////////////////////////////////////////////////
    //  マウントされた時個人情報の形成
	//
	//	AddressElementには以下のobjを配列で渡す
	// {
	// 	name: "John due",
	// 	address: {
	// 	  line1: '千代田区千代田',
	// 	  line2: '11',
	// 	  city: '千代田区',
	// 	  country: 'JP',
	// 	  postal_code: '100-0001',
	// 	  state: '東京都',
	// 	  phone: '0120-111-333'
	// }
	//
	//	userStateObj.smsAuthNo　ここにSMS認証番号が格納されている
    useMount(() => {
		//	初期化する
		userShippingName = [];
		addressElementArray = [];
		addressElementArrayPriority = [];
		//	お届け先を走査
        Object.keys(userStateObj.myShippingAddress).map(key => {
			// console.log("[CheckoutForm]userShippingName==>",userStateObj.myShippingAddress[key].userShippingName);
			if(userStateObj.myShippingAddress[key].userShippingPriorityFlag){
				addressElementArrayPriority = [
					{
						userShippingPriorityFlag : userStateObj.myShippingAddress[key].userShippingPriorityFlag,
						name: userStateObj.myShippingAddress[key].userShippingName ? userStateObj.myShippingAddress[key].userShippingName : '配送先氏名',
						// phone: '',
						// phone: userStateObj.myShippingAddress[key].userShippingTel ? '+81' + userStateObj.myShippingAddress[key].userShippingTel : '+81' + userStateObj.smsAuthNo,
						phone: '+81' + userStateObj.smsAuthNo,
						address: {
							line1: userStateObj.myShippingAddress[key].userShippingAddress2 ? userStateObj.myShippingAddress[key].userShippingAddress2 : '-',
							line2: userStateObj.myShippingAddress[key].userShippingAddress3 ? userStateObj.myShippingAddress[key].userShippingAddress3 : '-' + userStateObj.myShippingAddress[key].userShippingAddress4 ? userStateObj.myShippingAddress[key].userShippingAddress4 : '-',
							city: userStateObj.myShippingAddress[key].userShippingAddress ? userStateObj.myShippingAddress[key].userShippingAddress : '-',
							country: userStateObj.myShippingAddress[key].userShippingTelCCValue ? userStateObj.myShippingAddress[key].userShippingTelCCValue : '-',
							postal_code: userStateObj.myShippingAddress[key].userShippingZipcode ? userStateObj.myShippingAddress[key].userShippingZipcode : '-',
							state: userStateObj.myShippingAddress[key].userShippingAddress ? userStateObj.myShippingAddress[key].userShippingAddress : '-',
							// phone: userStateObj.myShippingAddress[key].userShippingTel ? '+81' + userStateObj.myShippingAddress[key].userShippingTel : '+81' + userStateObj.smsAuthNo,
							phone: '+81' + userStateObj.smsAuthNo,
						}
					} 
				]
			}else{
				addressElementArray = [
					...addressElementArray,
					{
						userShippingPriorityFlag : userStateObj.myShippingAddress[key].userShippingPriorityFlag,
						name: userStateObj.myShippingAddress[key].userShippingName ? userStateObj.myShippingAddress[key].userShippingName : '配送先氏名',
						// phone: '',
						// phone: userStateObj.myShippingAddress[key].userShippingTel ? '+81' + userStateObj.myShippingAddress[key].userShippingTel : '+81' + userStateObj.smsAuthNo,
						phone: '+81' + userStateObj.smsAuthNo,
						address: {
							line1: userStateObj.myShippingAddress[key].userShippingAddress2 ? userStateObj.myShippingAddress[key].userShippingAddress2 : '-',
							line2: userStateObj.myShippingAddress[key].userShippingAddress3 ? userStateObj.myShippingAddress[key].userShippingAddress3 : '-' + userStateObj.myShippingAddress[key].userShippingAddress4 ? userStateObj.myShippingAddress[key].userShippingAddress4 : '-',
							city: userStateObj.myShippingAddress[key].userShippingAddress ? userStateObj.myShippingAddress[key].userShippingAddress : '-',
							country: userStateObj.myShippingAddress[key].userShippingTelCCValue ? userStateObj.myShippingAddress[key].userShippingTelCCValue : '-',
							postal_code: userStateObj.myShippingAddress[key].userShippingZipcode ? userStateObj.myShippingAddress[key].userShippingZipcode : '-',
							state: userStateObj.myShippingAddress[key].userShippingAddress ? userStateObj.myShippingAddress[key].userShippingAddress : '-',
							// phone: userStateObj.myShippingAddress[key].userShippingTel ? '+81' + userStateObj.myShippingAddress[key].userShippingTel : '+81' + userStateObj.smsAuthNo,
							phone: '+81' + userStateObj.smsAuthNo,
						}
					} 
				]
			}
		})
		addressElementArray = [...addressElementArrayPriority, ...addressElementArray]
		console.log("[CheckoutForm]addressElementArray==>",addressElementArray);
    });
    //  マウントされた時個人情報の形成
	///////////////////////////////////////////////////////


	////////////////////////////////////////////
	//	別コンポーネントからSubmitされる
	const handleSubmit = async (e) => {
		e.preventDefault();
		////////////////////////////////////////////
		//	氏名の入力がない場合エラーメッセージを表示して終わり
		// 
		if (!userStateObj?.userChargeName) {
			console.log("userStateObj?.userChargeName");
			setErrorMessage({ userName: 'Please_enter_your_name'})
			//	強制終了
			return;
		}else{
			setErrorMessage({ userName: ''})
		}
		// 氏名の入力がない場合エラーメッセージを表示して終わり
		////////////////////////////////////////////


		////////////////////////////////////////////
		//	ローディング開始
		setModalState((prevState) => ({
			...prevState,
			data: {
				...prevState.data,
				showForm : false
			}
		}))
		//	ローディング開始
		////////////////////////////////////////////

		////////////////////////////////////////////
		// Stripe.js has not yet loaded.
		// Make sure to disable form submission until Stripe.js has loaded.
		if (!stripe || !elements) {
			console.log("[CheckoutForm]!stripe || !elements==>Stripe.js has not yet loaded");
			//	強制終了
			return;
		}
		// Stripe.js has not yet loaded.
		////////////////////////////////////////////

		////////////////////////////////////////////
		// 決済実行
		const result = await stripe.confirmPayment({
			//	https://stripe.com/docs/payments/payment-element/migration?locale=ja-JP
			//	https://stripe.com/docs/radar/integration?locale=ja-JP
			elements,
			//	リダイレクト不要な時
			redirect: 'if_required',
			// customer_creation: 'always',
			// metadata: {
			// 	stripeCustomerId: '1123344'
			//   },
			confirmParams: {
				return_url: "https://cardel.online/",	//	使わないけど入れておく
				payment_method_data: {
					billing_details: {
						// https://qiita.com/hideokamoto/items/19b07b7d543974913648
						////////////////////////////////////////////////////////
						//	支払いに関する個人情報
						//	大部分はデフォルトの配送先から埋めている
						address: {
							//	デフォルトの配送先を送信
							country: userStateObj.countryOfResidenceCode,
							city: addressElementArrayPriority?.city,
							line1: addressElementArrayPriority?.line1,
							line2: addressElementArrayPriority?.line2,
							postal_code: addressElementArrayPriority?.postal_code,
							state: addressElementArrayPriority.state,
						},
						email : userStateObj.loginId,
						// name: addressElementArrayPriority.name,
						name: userStateObj?.userChargeName,

						// phone: '+81 09011223344'
						phone: '+81' + userStateObj.smsAuthNo,
						//	支払いに関する個人情報
						////////////////////////////////////////////////////////
					},
				},
			},
		})
		.then(function(result) {
			console.log("[CheckoutForm].then(function(result)==>result",result);
			if (result.error) {
				if (result.error.type === "card_error" || result.error.type === "validation_error") {
					console.log("[CheckoutForm]result.error.type",result.error.type);
					console.log("[CheckoutForm]result.error?.message",result.error?.message);
					if(result.error.message){
						//	ストライプから受け取った生のエラーメッセージを格納
						let formErrorMessage = result.error?.message;
						if(result.error.code === 'empty_phone_number'){
							//	電話番号未入力の場合は、最低限のSMS認証番号が入らなかったことになる
							formErrorMessage = "SMS認証を完了してから購入してください"
						}
						setModalState((prevState) => ({
							...prevState,
							data: {
								...prevState.data,
								showForm : true,
								resultError : formErrorMessage	//ストライプからのメッセージを格納
							}
						}))
					}
				}
				// 	//	使い道は未定だがエラーを格納

				// } else {
				// 	//	リトライページへ
				// 	setModalState((prevState) => ({
				// 		...prevState,
				// 		modalType: 'TimeoutStripe',
				// 	}))
				// }

				//according to new instruction we have to show just two type of error message #113849
				// if(result.error.code=="incorrect_cvc"){
				// 	//displayIncorrect cvc error message
				// 	setModalState((prevState) => ({
				// 		...prevState,
				// 		// BaseModalOpen: true,
				// 		// modalType: 'error',
				// 		// mode: "",
				// 		// data: {title: '',body: intl.formatMessage({ id: "incorrect_cvc_message" })}
				// 		data: {
				// 			...prevState.data,
				// 			showForm : false,
				// 			resultError : result.error?.message
				// 		}
				// 	}));
				// }else{
				// 	//show default error message
				// 	setModalState((prevState) => ({
				// 		...prevState,
				// 		BaseModalOpen: true,
				// 		modalType: 'error',
				// 		mode: "",
				// 		data: {title: '',body: intl.formatMessage({ id: "card_error_message" })}
				// 	}));
				// }


			  // Inform the customer that there was an error.
			  console.log("[CheckoutForm]result.error.message==>",result.error.message);
			  console.log("[CheckoutForm]result.error.code==>",result.error.code);
			  console.log("[CheckoutForm]result.error.type==>",result.error.type);
			}else if(result.paymentIntent.status === 'succeeded'){
				//	決済が実行され成功した時
				console.log("[CheckoutForm]paymentIntent:決済が実行され成功した時==>",result.paymentIntent.status);
				console.log("[CheckoutForm]paymentIntent:決済が実行され成功した時パラメーター1==>",result);
				console.log("[CheckoutForm]paymentIntent:決済が実行され成功した時パラメーター2==>",result.paymentIntent);
				//	サンクスページへ
				setModalState((prevState) => ({
					...prevState,
					modalType: 'paymentCompleted',
					data: {
						point: result.paymentIntent.amount
					}
				}))
			}else if(result.paymentIntent.status !== 'succeeded'){
				console.log("[CheckoutForm]paymentIntent:❗️❗️❗️決済が実行され成功以外の時==>",result.paymentIntent.status);
				////////////////////////////////////////////
				/////❗️❗️❗️要実装❗️❗️❗️
				////////////////////////////////////////////

			}else{
				console.log("[CheckoutForm]paymentIntent:❗️❗️❗️分類されていない結果の時==>",result.paymentIntent.status);
				////////////////////////////////////////////
				/////❗️❗️❗️要実装❗️❗️❗️
				////////////////////////////////////////////
			}
		});
		// 決済実行
		////////////////////////////////////////////


		// 	https://stripe.com/docs/payments/payment-intents
		//	ローディング終了
		setModalState((prevState) => ({
			...prevState,
			data: {
				...prevState.data,
				showForm : true
			}
		}))
	}
	//	別コンポーネントからSubmitされる
	////////////////////////////////////////////

	////////////////////////////////////////
	// フォームの組み立てが完了した
	function onReady(e) {
		console.log("[CheckoutForm]onReady",e);
		//	モアモアするので数秒稼ぐ
		if(onReadyTimer) {
			//	タイマーが残っていたら削除
            clearTimeout(onReadyTimer)
        }
		onReadyTimer = setTimeout(() => {
			setModalState((prevState) => ({
				...prevState,
				data: {
					...prevState.data,
					PaymentElementReady : true,
				}
			}))
		}, 1000);
	}
	// フォームの組み立てが完了した
	////////////////////////////////////////

	////////////////////////////////////////
	// イベント監視　開発用
	function onBlur(e) {
		console.log("[CheckoutForm]onBlur",e);
	}
	function onChange(e) {
		console.log("[CheckoutForm]onChange",e);
	}
	// イベント監視　開発用
	////////////////////////////////////////
	const options = {
		fields: {
			billingDetails: {
				name: 'never',
				email: 'never',
				phone : 'never',
				// address: 'never',
				address: {
					country: "never",
					// state: "never",
					// postalCode : "never",
					// line1 : "never",
					// line2 : "never",
					// city : "never",
				}
			}
		}
	};

	return (
		<div id="CheckoutFormWrap" className="w-full grid grid-cols-1">
		{/* https://qiita.com/hideokamoto/items/e487b5dc48355a7976bf */}
			<form
				className='p-1 text-white'
				onSubmit={handleSubmit}
				id="CheckoutForm"
				style={{color:  '#fff'}}
			>
				<PaymentElement 
					id="payment-element"
					onReady={(e) => onReady(e)}
					onBlur={(e) => onBlur(e)}
					onChange={(e) => onChange(e)}
					options={options}
				/>
				{/* {addressElementArray
				?
				<AddressElement 
					className="hidden"
					// validation = {
					// 	{phone : 'always'}
					// }
					// fields = {
					// 	{phone : 'always'}
					// }
					options={
						{
							// defaultValues: {
							// 	name: userStateObj?.userChargeName,
							// 	phone : '09011112222',
							// 	// phone : userStateObj?.smsAuthNo,
							// 	email:  userStateObj?.loginId,
							// 	address: {
							// 	//   line1: '354 Oyster Point Blvd',
							// 	line1: '銀座7-13-6',
							// 	line2: '',
							// 	//   city: 'South San Francisco',
							// 	city: '中央区',
							// 	  state: '東京都',
							// 	  postal_code: '1040061',
							// 	  country: userStateObj.countryOfResidenceCode,
							// 	},
							// },
							fields : {
								// phone : 'auto',
								name: 'auto',
							},
							// validation : {
							// 	phone : {
							// 		required : 'never'
							// 	}},
							mode: 'shipping',
							contacts: addressElementArray,
				}} />
				:
				''
				} */}


				 <div id="" className={`${inputWrapClass} self-end`}>
				    {/* <label className="text-sm font-medium required" data-text={intl.formatMessage({ id: 'required' })}> */}
					<label className="">
                        {intl.formatMessage({ id: 'full_name' })}
                    </label>
                    <input 
                        placeholder={intl.formatMessage({ id: 'userShippingName_placeholder' })}
                        name="name" 
                        type="text" 
                        id="name" 
                        className="rounded" 
						value={nameValue} 
						onChange={onNameInput} 
						onBlur={onNameChange}
                        // onChange={} 
						// value={formData.password} 
					/>
					<span className="text-xs text-error-message">
                        {errorMessage.userName && intl.formatMessage({ id: errorMessage.userName })}
                    </span>
				</div>
			</form>
			{
				modalStateValue.data.resultError
				?
				<p className="pt-4 text-error-message">⚠️{modalStateValue.data.resultError}</p>
				:
				<></>
			}
			<p className="pt-4 text-xs text-error-message">⚠️他人名義のクレジットカード(デビットカード)の使用は犯罪です。</p>
			<p className="pt-4 text-xs text-error-message">⚠️クレジットカード(デビットカード)番号を渡され代理購入をすることは犯罪です。</p>
		</div>
	)
}
