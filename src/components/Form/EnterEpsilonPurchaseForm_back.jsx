import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios';
import axios from "axios";
import visaCard from "../atoms/img/cards/visa.svg";
import masterCard from "../atoms/img/cards/mastercard.svg";
import amexCard from "../atoms/img/cards/amex.svg";
import invalidCard from "../atoms/img/cards/invalid.svg";
import cardCvc from "../atoms/img/cards/cvc.svg";
import { Loading } from "../molecules/modal/modalContents/Loading";

///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';
///////////////////

const getProcessedData = (value) => value.replace(/\D/g, '');

const cardTypeRegex = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
};

export const EnterEpsilonPurchaseForm = () => {
    const tokenRef = useRef(null);
    const iframeRef = useRef(null);

    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const {key, paymentHistoryId } = modalStateValue.data || {};

    const [formData, setFormData] = useState({
        userPaymentHistoryCardNumber: "4242 4242 4242 4242",
        userPaymentHistoryCardExpire: "2024/12",
        userPaymentHistoryCardCVC: "222",
        userPaymentHistoryCardHolderName: "hasanul",
    });
    const [pareqVal, setPareqVal] = useState('');
    const [tds2UrlVal, setTds2UrlVal] = useState('');
    const [cardType, setCardType] = useState('');

    const [errorMessage, setErrorMessage] = useState({
        userPaymentHistoryCardNumberErrorMessage: null,
        userPaymentHistoryCardNumberMaxLenErrorMessage: null,
        userPaymentHistoryCardExpireErrorMessage: null,
        userPaymentHistoryCardExpireMaxLenErrorMessage: null,
        userPaymentHistoryCardCVCErrorMessage: null,
        userPaymentHistoryCardCVCMaxLenErrorMessage: null,
        userPaymentHistoryCardHolderNameErrorMessage: null,
        userPaymentHistoryCardHolderNameMaxLenErrorMessage: null,
    });
    

    useEffect(() => {
        setModalState(prevState => ({...prevState, data: {...prevState.data, formData}}))
    }, []);

    useEffect(() => {
        const { data } = modalStateValue;

        console.log('my paraq', data)

        if (data) {
            const { formData, errorMessages, pareq = '',  tds2URL = ''} = data;
            setPareqVal(pareq);
            setTds2UrlVal(tds2URL);

            if(formData) setFormData(formData);
            if (errorMessages)  setErrorMessage(errorMessages);
        }
    }, [modalStateValue]);

    useEffect(() => {
        const submitForm = () => document.downloadForm.submit();
        // if(pareqVal) submitForm();
      }, [pareqVal]);

    const formatCardNumber = (number) => {
        return number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const formatExpire = (date) => {
        let formattedDate = date.replace(/\//g, '');

        if(formattedDate.length > 4) {
            formattedDate = formattedDate.replace(/(\d{4})(\d{0,2})/, '$1/$2').replace(/\s/g, '').trim();
        }

        return formattedDate;
    }  

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if(name == 'userPaymentHistoryCardNumber') {
            const inputCardNumber = value.replace(/\D/g, ''); // Remove non-numeric characters
            if(inputCardNumber.length > 16) return;
            const formattedCardNumber = formatCardNumber(inputCardNumber);

            setFormData({ ...formData, [name]: formattedCardNumber });

            let type = '';
            for (const [card, regex] of Object.entries(cardTypeRegex)) {
                if (regex.test(inputCardNumber)) {
                    type = card;
                    break;
                }
            }

            if(type) setCardType(type);

            return;
        }
        else if(name == 'userPaymentHistoryCardExpire') {
            const inputVal = value.replace(/\D/g, ''); // Remove non-numeric characters
            if(inputVal.length > 6) return;

            //Month part can not be gretter than 12
            const valArr = value.split('/');
            console.log('valArr >>', valArr)
            if(valArr.length > 0 && Number(valArr[1]) > 12) {
                return;
            }

            const formattedExpire = formatExpire(inputVal);

            setFormData({ ...formData, [name]: formattedExpire });
            return;
        }
        else if(name == 'userPaymentHistoryCardCVC'){
            const inputVal = value.replace(/\D/g, ''); // Remove non-numeric characters
            if(inputVal.length > 4) return;

            setFormData({ ...formData, [name]: inputVal });
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const validateCardNumber = (number) => {
        const digits = number.split('').map(Number).reverse();
    
        let sum = 0;
        for (let i = 0; i < digits.length; i++) {
          let digit = digits[i];
    
          if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }
    
          sum += digit;
        }
    
        return sum % 10 === 0;
    };

    const handleOnBlurCardInput = (e) => {
        const { name, value } = e.target;

        const originalValue = value.replace(/\D/g, ''); 

        let type = '';
        for (const [card, regex] of Object.entries(cardTypeRegex)) {
            if (regex.test(originalValue)) {
                type = card;
                break;
            }
        }

        console.log('check ???', type)

        if(value.length == 0) {
            setCardType(''); 
        }
        else {
            if(type == '') setCardType('invalid');
            else if(!validateCardNumber(originalValue)) setCardType('invalid');
            else setCardType(type);
        }

        const isValid = validateCardNumber(originalValue);
        console.log('is valid', isValid)
        console.log('is valid value', originalValue)
    }

    const execTrade = async(response) => {
        try {
            console.log("response.tokenObject", response.tokenObject);
            if( response.resultCode != '000' ){
                window.alert('トークン発行処理中にエラーが発生しました')
            }
            else{
                console.log('トークン発行処理成功')
                console.log('my formdata', formData);
                // トークンを元にフォーム送信
                // その前にトークンデータでPaymentHistoryを作成する
                const config = {
                    method: queries.postMethod,
                    url: queries.createPaymentEpsilon,
                    data: {
                        cardno: getProcessedData(formData.userPaymentHistoryCardNumber),
                        expire: getProcessedData(formData.userPaymentHistoryCardExpire),
                        securitycode: formData.userPaymentHistoryCardCVC,
                        holdername: formData.userPaymentHistoryCardHolderName,
                        token: response.tokenObject?.token,
                        paymentHistoryId,
                        cpp: 1 // 購入商品により変動
                    }
                }
                const createPayment = await instance.request(config);
                console.log("createPayment", createPayment);
                const {data, status} = createPayment || {};

                // ペイメント新規作成完了
                if (status == 200) {
                    console.log('data check >>', data)
                    const {errorCode, pareq, tds2URL, result, amount} = data || {};

                    //Success
                    if(!errorCode && [1, 6, '1', '6'].includes(result)){

                        if(result == 1) {//Normal payment OK
                            setModalState((prevState) => ({
                                ...prevState,
                                BaseModalOpen: true,
                                modalType: 'paymentCompleted',
                                data: {
                                   point: amount
                                }
                            }))
                        }
                        //For 3D secure addition process remaining todo
                        else {
                            setModalState((prevState) => ({
                                ...prevState,
                                BaseModalOpen: true,
                                modalType: 'epsilonPurchaseForm',
                                data: {
                                    ...prevState.data,
                                    pareq: pareq ? decodeURI(pareq) : pareq,
                                    tds2URL: tds2URL ? decodeURIComponent(tds2URL) : tds2URL
                                }
                            }))
                        }
                    }
                    //Error
                    else {
                        setModalState((prevState) => ({
                            ...prevState,
                            modalType: 'epsilonPurchaseForm',
                            data: {
                                ...prevState.data,
                                resultError: errorCode
                            }
                        }))
                    }
                }
                // For any other unexpected error
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
                    }));
                }
            }
        }catch(error) {
            console.log('my error >>>', error);
            const { errorCode } = error.response?.data || '';

            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'error',
                data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
            }));
        }
    }

    window.execTrade = execTrade;

	////////////////////////////////////////////
	//	別コンポーネントからSubmitされる
	const onEpsilonPurchaseFormsubmit = (e) => {
        e.preventDefault();

        const {
            userPaymentHistoryCardNumber, 
            userPaymentHistoryCardExpire, 
            userPaymentHistoryCardCVC,
            userPaymentHistoryCardHolderName,
        } = formData || {};


        console.log('loppppp >>>', formData)

        let userCardNumberErrorMessage = null;
        if (!userPaymentHistoryCardNumber.trim()) userCardNumberErrorMessage = 'Please_enter_your_epsilon_card_number'; 

        let userCardExpireErrorMessage = null;
        if (!userPaymentHistoryCardExpire.trim()) userCardExpireErrorMessage = 'Please_enter_your_epsilon_card_expire'; 

        let userCardCVCErrorMessage = null;
        if (!userPaymentHistoryCardCVC.trim()) userCardCVCErrorMessage = 'Please_enter_your_epsilon_card_cvc'; 

        let userCardHolderNameErrorMessage = null;
        if (!userPaymentHistoryCardHolderName.trim()) userCardHolderNameErrorMessage = 'Please_enter_your_epsilon_card_holder_name'; 

        const errorMessages = {
            userCardNumberErrorMessage,
            userCardExpireErrorMessage,
            userCardCVCErrorMessage,
            userCardHolderNameErrorMessage,
        }

        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData,
                errorMessages
            }
        }))

        console.log('my error is >>>', errorMessages)

        if(Object.values(errorMessages).filter(value => value !== null && value !== undefined && value !== '').length > 0) return;

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
        }));

        // クルクルを実装
        console.log("[EnterEpsilonPurchaseForm]onEpsilonPurchaseFormsubmit");
        console.log('pppppp >>>',   window.EpsilonToken)
        var cardObj = {};
        // cardObj.cardno = document.getElementById('cardno').value;
        // cardObj.expire = document.getElementById('expire_year').value + document.getElementById('expire_month').value;
        // cardObj.securitycode = document.getElementById('securitycode').value;
        // cardObj.holdername = document.getElementById('holdername').value;
        cardObj.cardno = getProcessedData(userPaymentHistoryCardNumber);          //"4111111111111111";
        cardObj.expire = getProcessedData(userPaymentHistoryCardExpire);                           //"202405";
        cardObj.securitycode = userPaymentHistoryCardCVC;                        //"111";
        cardObj.holdername = userPaymentHistoryCardHolderName;                   //"takuya haga";
        window.EpsilonToken.init(process.env.REACT_APP_EPSILON_CONTRACT_CODE);
        console.log("cardObj", cardObj);

        window.EpsilonToken.getToken(cardObj, "execTrade");
    }
	//	別コンポーネントからSubmitされる
	////////////////////////////////////////////


    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
           
           {/* Redirect to epsilon payment page */}
            {pareqVal ? (
                <>
                    <form  
                        name="downloadForm" 
                        action="https://secure.epsilon.jp/cgi-bin/order/tds2.cgi" 
                        method="POST" 
                        enctype="application/x-www-form-urlencoded" 
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <br />
                        <br />
                        <center>
                            <h2>
                            3-Dセキュア認証を続けます。
                            <br />
                            ボタンをクリックしてください。
                            </h2>
                            <input type="submit" value="OK" />
                        </center>
                        <input type="hidden" name="PaReq" value={pareqVal} />
                        <input type="hidden"  name="TermUrl"  value="https://epsilon.cardel.online/cardel-payment/callback"/>
                        <input type="hidden"  name="MD" value={paymentHistoryId} />
                    </form>
                </>
            ) : 
            (
                <form 
                    className="gap-2" 
                    id="epsilonPurchaseForm" 
                    // onSubmit={handleSubmit}
                    // method="POST"
                    // name="myForm" 
                    // target="dummyIframe"
                    onSubmit={onEpsilonPurchaseFormsubmit}
                >
                    <div id="" className={`${inputWrapClass} self-end`}>
                        <label className="text-sm font-medium">{intl.formatMessage({ id: 'Card_number' })}</label>
                        
                        <div className={`relative flex items-center ${inputWrapClass}`}>
                            <input name="userPaymentHistoryCardNumber" onChange={handleInputChange} onBlur={handleOnBlurCardInput} id="" className="" value={formData.userPaymentHistoryCardNumber} placeholder="1234 1234 1234 1234" />
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                
                                {(cardType == '' || cardType == 'visa') &&  <img src={visaCard} alt="Visa" class="h-5 w-10" />}
                                {(cardType == '' || cardType == 'mastercard') &&  <img src={masterCard} alt="mastercard" class="h-5 w-10" />}
                                {(cardType == '' || cardType == 'amex') &&  <img src={amexCard} alt="amex" class="h-5 w-10" />}
                                {(cardType == 'invalid') &&  <img src={invalidCard} alt="Invalid" class="h-5 w-10" />}
                            
                            </div>
                        </div>

                        <span className="text-xs text-error-message">
                            {errorMessage.userCardNumberErrorMessage && intl.formatMessage({ id: errorMessage.userCardNumberErrorMessage })}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div id="" className={`${inputWrapClass} self-end`}>
                            <label className="text-sm font-medium">
                                {intl.formatMessage({ id: 'Card_expire' })}
                            </label>
                            <input name="userPaymentHistoryCardExpire" onChange={handleInputChange} id="" className="" value={formData.userPaymentHistoryCardExpire} placeholder="YYYY/MM"/>
                            <span className="text-xs text-error-message">
                                {errorMessage.userCardExpireErrorMessage && intl.formatMessage({ id: errorMessage.userCardExpireErrorMessage })}
                            </span>
                        </div>
                        
                        <div id="" className={`${inputWrapClass} self-end`}>
                            <label className="text-sm font-medium">
                                {intl.formatMessage({ id: 'Card_cvc' })}
                            </label>

                            <div className={`relative flex items-center ${inputWrapClass}`}>
                                <input name="userPaymentHistoryCardCVC" onChange={handleInputChange} id="" className="" value={formData.userPaymentHistoryCardCVC} placeholder="CVC"/>
                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <img src={cardCvc} alt="Visa" class="h-5 w-10" />
                                </div>
                            </div>

                            <span className="text-xs text-error-message">
                                {errorMessage.userCardCVCErrorMessage && intl.formatMessage({ id: errorMessage.userCardCVCErrorMessage })}
                            </span>
                        </div>
                    </div>

                    <div id="" className={`${inputWrapClass} self-end`}>
                        <label className="text-sm font-medium">
                            {intl.formatMessage({ id: 'Card_holdername' })}
                        </label>
                        <input name="userPaymentHistoryCardHolderName" onChange={handleInputChange} id="" className="" value={formData.userPaymentHistoryCardHolderName} />
                        <span className="text-xs text-error-message">
                            {errorMessage.userCardHolderNameErrorMessage && intl.formatMessage({ id: errorMessage.userCardHolderNameErrorMessage })}
                        </span>
                    </div>

                    <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                        <p className="text-xs">
    説明            1111
                        </p>
                        <p className="text-xs">

                        </p>
                    </div>

                    {modalStateValue.data?.resultError && <p className="pt-4 text-error-message">⚠️{modalStateValue.data.resultError}</p>}
                    
                    <form name="orderForm" action="https://beta.epsilon.jp/cgi-bin/order/direct_card_payment.cgi" method="post">
                        <input type="hidden" id="contract_code" name="contract_code" value={`${process.env.REACT_APP_EPSILON_CONTRACT_CODE}`}/>
                        <input type="hidden" id="token" name="token" value="" ref={tokenRef}/>
                    </form>

                    <input name="userPaymentHistoryPaymentPoint" type="hidden" id="userPaymentHistoryPaymentPoint" className="" value={modalStateValue?.data?.userChargePoint} />
                </form>
            )}
            
        </div>
    )
}