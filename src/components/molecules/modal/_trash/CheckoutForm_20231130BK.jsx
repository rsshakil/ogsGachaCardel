import React, { useRef, useState, useEffect, Suspense } from "react";
import {
	PaymentElement,
	LinkAuthenticationElement,
	ElementsConsumer,
	useStripe, 
	useElements
} from '@stripe/react-stripe-js'
import { useLocation } from "react-router-dom";
import { Loading } from './Loading';
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'

let onReadyTimer;
export const CheckoutForm = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
	console.log("::::::::::::::::checkoutform");

	const stripe = useStripe();
	const elements = useElements();
	const [message, setMessage] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// const [paymentElementReady, setPaymentElementReady] = useState(false);

	const pathName = useLocation().pathname;
	console.log("[CheckoutForm]isLoading==>",isLoading);
	console.log("[CheckoutForm]message==>",message);
	// console.log("[CheckoutForm]stripe==>",stripe);
	// console.log("[CheckoutForm]elements==>",elements);
	// console.log("[CheckoutForm]paymentElementReady==>",paymentElementReady);

	//	if (isLoading || !stripe || !elements)であればローディング出す準備
	// useEffect(() => {

    //     setModalState((prevState) => ({
    //         ...prevState,
    //         data: {
    //             ...prevState.data,
	// 			stripe:stripe,
	// 			elements:elements,
	// 			isLoading:isLoading,
	// 			message:message,
    //         }
    //     }))
	// }, [stripe,elements,isLoading,message]);

	// useEffect(() => {
	// 	// ボタン押された場合　処理を終えたらフラグを戻す
	// 	console.log("[CheckoutForm]useEffect[modalStateValue.data.doCheckout]==>ボタン押された場合　処理を終えたらフラグを戻す",modalStateValue.data.doCheckout);
	// 	if(modalStateValue.data.doCheckout){
	// 		//❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
	// 		// handleSubmit();
	// 		//❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
	// 		setModalState((prevState) => ({
	// 			...prevState,
	// 			data: {
	// 				...prevState.data,
	// 				doCheckout : false
	// 			}
	// 		}))
	// 	}
	// }, [modalStateValue.data.doCheckout]);



	// const handleSubmit = async (e) => {
	// 	e.preventDefault();

	// 	if (!stripe || !elements) {
	// 		// Stripe.js has not yet loaded.
	// 		// Make sure to disable form submission until Stripe.js has loaded.
	// 		console.log("[CheckoutForm]!stripe || !elements==>Stripe.js has not yet loaded");
	// 		return;
	// 	}

	// 	setIsLoading(true);

	// 	const successURL = process.env.REACT_APP_URL_PRODUCTION + pathName

	// 	const { paymentIntent,error } = await stripe.confirmPayment({

	// 		// if (!stripe || !elements) return
	// 		// const result = await stripe.confirmPayment({
	// 		// 	elements,
	// 		// 	redirect: 'if_required',
	// 		// })
	// 		//	https://stripe.com/docs/payments/payment-element/migration?locale=ja-JP
	// 		elements,
	// 		// confirmParams: {
	// 		// 	// Make sure to change this to your payment completion page
	// 		// 	// return_url: successURL,
	// 		// 	return_url: successURL,
	// 		// },
	// 		//	リダイレクト不要な時
	// 		redirect: 'if_required',
	// 	})
	// 	// .then(function(result) {
	// 	// 	console.log("[CheckoutForm].then(function(result)==>result",result);
	// 	// 	if (result.error) {
	// 	// 	  // Inform the customer that there was an error.
			  
	// 	// 	}
	// 	//   });

	// 	// This point will only be reached if there is an immediate error when
	// 	// confirming the payment. Otherwise, your customer will be redirected to
	// 	// your `return_url`. For some payment methods like iDEAL, your customer will
	// 	// be redirected to an intermediate site first to authorize the payment, then
	// 	// redirected to the `return_url`.
	// 	if (paymentIntent){
	// 		//	https://stripe.com/docs/payments/payment-intents
	// 		console.log("[CheckoutForm]paymentIntent",paymentIntent);

	// 		if(paymentIntent.status === 'succeeded'){
	// 			//	決済が実行され成功した時
	// 			console.log("[CheckoutForm]paymentIntent:決済が実行され成功した時==>",paymentIntent.status);
	// 			setModalState((prevState) => ({
	// 				...prevState,
	// 				data: {
	// 					...prevState.data,
	// 					isPaymentIntentSucceeded:true
	// 				}
	// 			}))
	// 		}

	// 	}
	// 	if (error){
	// 		//	https://stripe.com/docs/payments/payment-intents
	// 		console.log("[CheckoutForm]error",error);
	// 	}
	// 	if (error.type === "card_error" || error.type === "validation_error") {
	// 		// setMessage(error?.message);
	// 	} else {
	// 		// setMessage("An unexpected error occured.");
	// 	}

	// 	setIsLoading(false);
	// }

	function onReady(e) {
		console.log("[CheckoutForm]onReady",e);
		//	モアモアするので2秒稼ぐ
		setModalState((prevState) => ({
			...prevState,
			data: {
				...prevState.data,
				PaymentElementReady : true,
			}
		}))

		// if(onReadyTimer) {
		// 	//	タイマーが残っていたら削除
        //     clearTimeout(onReadyTimer)
        // }
		// onReadyTimer = setTimeout(() => {
		// 	setModalState((prevState) => ({
		// 		...prevState,
		// 		data: {
		// 			...prevState.data,
		// 			PaymentElementReady : true,
		// 		}
		// 	}))
		// }, 2000);
	}
	function onBlur(e) {
		console.log("[CheckoutForm]onBlur",e);
	}
	function onChange(e) {
		console.log("[CheckoutForm]onChange",e);
	}



	return (

		<div id="CheckoutFormWrap" className="w-full grid grid-cols-1">
		{/* https://qiita.com/hideokamoto/items/e487b5dc48355a7976bf */}
		<form
        style={{marginTop: '20px'}}
        onSubmit={async e => {
          e.preventDefault()
          if (!stripe || !elements) return
          const result = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
          })
          console.log(result)
        }}
      >
          <PaymentElement />
          <button type='submit'>注文する</button>
      </form>


			{/* <form
				className='px-1'
				onSubmit={handleSubmit}
				id="CheckoutForm"
				// style={{marginTop: '20px'}}
				// onSubmit={async e => {
				// e.preventDefault()
				// if (!stripe || !elements) return
				// const result = await stripe.confirmPayment({
				// 	elements,
				// 	redirect: 'if_required',
				// })
				// console.log(result)
				// }}
			> */}
				{/* <PaymentElement 
					id="payment-element"
					// onReady={(e) => onReady(e)}
					// onBlur={(e) => onBlur(e)}
					// onChange={(e) => onChange(e)}
				/> */}
				{/* <div id="payment-form-button-wrap" className="w-full flex flex-col justify-center items-center">
					<button 
						className='button-half-left flex flex-row justify-center items-center touch-none select-none'
						disabled={isLoading || !stripe || !elements}
						id="submit"
						type='submit'
					>
						<span id="button-text pointer-events-none text-base font-bold font-Roboto">
							{isLoading ? <div className="spinner" id="spinner"></div> : "偽物ボタン"}
						</span>
					</button>
				</div> */}
				{/* <button id="submit" type='submit'>注文する</button> */}
			{/* </form> */}

			{/* <form 
				id="payment-form" onSubmit={handleSubmit}
				className='px-1'
			>
				<LinkAuthenticationElement 
					id="link-authentication-element"
					onChange={(e) => onChange(e)}
					onReady={(e) => onReady(e)}
				// Access the email value like so:
				// onChange={(event) => {
				//  setEmail(event.value.email);
				// }}
				//
				// Prefill the email field like so:
				// options={{defaultValues: {email: 'foo@bar.com'}}}
				/>
				<PaymentElement 
					id="payment-element"
					onReady={(e) => onReady(e)}
					onBlur={(e) => onBlur(e)}
					onChange={(e) => onChange(e)}
				/>
				<div  id="payment-form-button-wrap" className="w-full flex flex-col justify-center items-center">
					<button 
						className='button-half-left flex flex-row justify-center items-center touch-none select-none'
						disabled={isLoading || !stripe || !elements}
						id="submit">
						<span id="button-text pointer-events-none text-base font-bold font-Roboto">
							{isLoading ? <div className="spinner" id="spinner"></div> : "偽物ボタン"}
						</span>
					</button> */}
					{/* Show any error or success messages */}
					{
						isLoading || !stripe || !elements
						?
						<p>isLoading || !stripe || !elements</p>
						:<></>
					}
				{/* {message && <div id="payment-message">{message}</div>}
				</div>
			</form> */}
		</div>
	)
}
