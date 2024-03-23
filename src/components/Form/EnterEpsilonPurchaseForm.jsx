import React, { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {useIntl, IntlProvider} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios';
import visaCard from "../atoms/img/cards/visa.svg";
import masterCard from "../atoms/img/cards/mastercard.svg";
import amexCard from "../atoms/img/cards/amex.svg";
import invalidCard from "../atoms/img/cards/invalid.svg";
import jcbCard from "../atoms/img/cards/jcb.svg";
import cardCvc from "../atoms/img/cards/cvc.svg";
import dinersCard from "../atoms/img/cards/diners.svg";
import {useInterval,useThrottle,useUpdateEffect} from 'react-use';
import ErrorMessage from "../molecules/ErrorMessage";

// ///////////////////
let CardTypeAnimateImg = visaCard;
// ///////////////////

const getProcessedData = (value) => value.replace(/\D/g, '');

/////////////////////////////////////////////////////////////////////////////////
//❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️この正規表現再確認が必要❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
const cardTypeRegex = {
    visa: /^4/, //4111111111111111,4242424242424242,4012888888881881
    mastercard: /^5[1-5]/,  //5555555555554444,5105105105105100
    amex: /^3[47]/, //378282246310005,371449635398431
    diners: /^3[08]/, //30569309025904,38520000023237
    jcb: /^35(2[89]|[3-8][0-9])/,   //,3566002020360505,3530111333300000
};
//❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
/////////////////////////////////////////////////////////////////////////////////
export const EnterEpsilonPurchaseForm = () => {
    const tokenRef = useRef(null);
    const intl = useIntl();
    const intlErrorMessage = useIntl();


    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const {key, paymentHistoryId } = modalStateValue.data || {};
    const [formData, setFormData] = useState({
        userPaymentHistoryCardNumber: "",
        userPaymentHistoryCardCVC: "",
        userPaymentHistoryCardHolderName: "",
        cardExpireMonth: "",
        cardExpireYear: "",
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
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
    
    //ボタンを押された
    useEffect(() => {
        const buttonEl = document.getElementById('epsilon-form-submit-button');
        if(buttonEl) {
            if(formSubmitted) buttonEl.style.cursor = 'default';
            else buttonEl.style.cursor = 'pointer';
        }
    }, [formSubmitted])


    useEffect(() => {
        const { data } = modalStateValue;
        // console.log('my paraq', data)
        if (data) {
            const { formData, errorMessages} = data;
           
            if(formData) setFormData(formData);
            if (errorMessages)  setErrorMessage(errorMessages);
        }
        else {
            setModalState(prevState => ({...prevState, data: formData}))
        }
    }, [modalStateValue]);

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
        if(name === 'userPaymentHistoryCardNumber') {
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
        else if(name === 'userPaymentHistoryCardCVC'){
            const inputVal = value.replace(/\D/g, ''); // Remove non-numeric characters
            if(inputVal.length > 4) return;
            setFormData({ ...formData, [name]: inputVal });
            return;
        }
        else if(name === 'cardExpireMonth'){
            const inputVal = value.replace(/\D/g, '');
            if(inputVal.length > 2) return;
            if(inputVal > 12) return;
            setFormData({ ...formData, [name]: inputVal });
            return;
        }
        else if(name === 'cardExpireYear'){
            const inputVal = value.replace(/\D/g, ''); // Remove non-numeric characters
            if(inputVal.length > 2) return;
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
        // console.log("check ??? name",name);
        // console.log("check ??? value",value);
        const originalValue = value.replace(/\D/g, ''); 
        let type = '';
        for (const [card, regex] of Object.entries(cardTypeRegex)) {
            if (regex.test(originalValue)) {
                type = card;
                break;
            }
        }
        // console.log('check ???', type)
        if(value.length == 0) {
            setCardType(''); 
        }
        else {
            if(type == '') setCardType('invalid');
            else if(!validateCardNumber(originalValue)) setCardType('invalid');
            else setCardType(type);
        }

        const isValid = validateCardNumber(originalValue);
        // console.log('is valid', isValid)
        // console.log('is valid value', originalValue)
    }

    const execTrade = async(response) => {
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
        }));

        try {
            console.log("response.tokenObject", response);
            if( response.resultCode != '000' ){
                //Create new payment history if failed to generate token
                try {
                    const config = {
                        method: queries.postMethod,
                        url: queries.createPaymentEpsilon,
                        data: {
                            cardno: getProcessedData(formData.userPaymentHistoryCardNumber),
                            expire: getProcessedData(`20${formData.cardExpireYear}${formData.cardExpireMonth}`),
                            securitycode: formData.userPaymentHistoryCardCVC,
                            holdername: formData.userPaymentHistoryCardHolderName,
                            token: undefined,
                            errorCode: response.resultCode,
                            paymentHistoryId,
                            cpp: key // 購入商品により変動
                        }
                    }
            
                    const {data, status} = await instance.request(config);
        
                    if (status == 200) {
                        setFormSubmitted(false);

                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'epsilonPurchaseForm',
                            data: {
                                ...prevState.data,
                                paymentHistoryId: data.phi,
                                resultError: data?.errorCode
                            }
        
                        }))
                    }
                }catch(error) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
                    }));
                }
            }
            //If token generate success
            else{
                // console.log('トークン発行処理成功')
                // console.log('my formdata', formData);
                // トークンを元にフォーム送信
                // その前にトークンデータでPaymentHistoryを作成する
                const config = {
                    method: queries.postMethod,
                    url: queries.createPaymentEpsilon,
                    data: {
                        cardno: getProcessedData(formData.userPaymentHistoryCardNumber),
                        expire: getProcessedData(`20${formData.cardExpireYear}${formData.cardExpireMonth}`),
                        securitycode: formData.userPaymentHistoryCardCVC,
                        holdername: formData.userPaymentHistoryCardHolderName,
                        token: response.tokenObject?.token,
                        paymentHistoryId,
                        cpp: key // 購入商品により変動
                    }
                }
                const createPayment = await instance.request(config);
                // console.log("createPayment", createPayment);
                const {data, status} = createPayment || {};

                // ペイメント新規作成完了
                if (status === 200) {
                    // console.log('data check >>', data)
                    const {errorCode, pareq, tds2URL, result, amount, trackingUUID, phi} = data || {};

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
                        //For 3D secure addition process remaining
                        else {
                            setModalState((prevState) => ({
                                ...prevState,
                                BaseModalOpen: true,
                                modalType: 'epsilon3dCheckForm',
                                data: {
                                    ...prevState.data,
                                    pareq: pareq ? decodeURI(pareq) : pareq,
                                    tds2URL: tds2URL ? decodeURIComponent(tds2URL) : tds2URL,
                                    trackingUUID,
                                }
                            }))
                        }
                    }
                    //Error
                    else {
                        setFormSubmitted(false); 
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'epsilonPurchaseForm',
                            data: {
                                ...prevState.data,
                                paymentHistoryId: phi, //phi = new payment history id as epsilon error occurred
                                resultError: errorCode
                            }
                        }))
                    }
                }
                // For any other unexpected error
                else {
                    setFormSubmitted(false); 
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'epsilonPurchaseForm',
                        data: {
                            ...prevState.data,
                            resultError: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })
                        }
                    }));
                }
            }
        }catch(error) {
            // console.log('my error >>>', error);
            const { errorCode } = error.response?.data || '';

            setFormSubmitted(false); 
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'epsilonPurchaseForm',
                data: {
                    ...prevState.data,
                    resultError: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })
                }
            }));
        }
    }

    window.execTrade = execTrade;

	////////////////////////////////////////////
	//	別コンポーネントからSubmitされる
	const onEpsilonPurchaseFormsubmit = (e) => {
        e.preventDefault();

        if(formSubmitted) return;
        const date = new Date();
        let day = date.getDate();
        let currentMonth = date.getMonth() + 1;
        let currentYear = date.getFullYear().toString().slice(-2);
        
        const {
            userPaymentHistoryCardNumber,
            userPaymentHistoryCardCVC,
            userPaymentHistoryCardHolderName,
            cardExpireMonth,
            cardExpireYear
        } = formData || {};


        // console.log('loppppp >>>', formData)
        // console.log("year",currentYear);
        // console.log("month",currentMonth);
        // console.log("cardExpireMonth",parseInt(cardExpireMonth));

        //Do not need frontend validation for this card field rather than api validation will applied
        // let userCardNumberErrorMessage = null;
        // if (!userPaymentHistoryCardNumber?.trim()) userCardNumberErrorMessage = 'Please_enter_your_epsilon_card_number'; 

        let userCardExpireErrorMessage = null;
        if (!cardExpireMonth?.trim()) userCardExpireErrorMessage = 'Please_enter_your_epsilon_card_expire_month'; 
        else {
            const month = cardExpireMonth?.trim();

            if(!Number(month) > 0) userCardExpireErrorMessage = 'Please_enter_your_epsilon_card_expire_month'; 
            else if(month.length != 2) userCardExpireErrorMessage = 'Please_enter_your_epsilon_card_expire_month'; 
        }
        
        if(!userCardExpireErrorMessage) {
            if (!cardExpireYear?.trim()) userCardExpireErrorMessage = 'Please_enter_your_epsilon_card_expire_year'; 
            else {
                const year = cardExpireYear?.trim();
    
                if(!Number(year) > 0) userCardExpireErrorMessage = 'Please_enter_your_epsilon_card_expire_year'; 
                else if(year.length != 2) userCardExpireErrorMessage = 'Please_enter_your_epsilon_card_expire_year'; 
                else if (year < currentYear) userCardExpireErrorMessage = 'Please_enter_valid_year'; 
            }
        }

        //if (!cardExpireMonth || (cardExpireMonth && cardExpireMonth.length<2)) userCardExpireErrorMessage = 'Please_enter_valid_month'; 
    
        if(!userCardExpireErrorMessage && cardExpireYear == currentYear && parseInt(cardExpireMonth) < currentMonth) userCardExpireErrorMessage = 'Your_card_allready_expired'; 

        let userCardCVCErrorMessage = null;
        if (!userPaymentHistoryCardCVC?.trim()) userCardCVCErrorMessage = 'Please_enter_your_epsilon_card_cvc'; 
        else {
            const cvc = userPaymentHistoryCardCVC?.trim();

            if(!Number(cvc) > 0) userCardCVCErrorMessage = 'Please_enter_your_epsilon_card_cvc'; 
            else if(cvc.length < 3) userCardCVCErrorMessage = 'Please_enter_your_epsilon_card_cvc'; 
        }

        let userCardHolderNameErrorMessage = null;
        let userCardHolderNameInvalidErrorMessage = null;
        if (!userPaymentHistoryCardHolderName?.trim()) userCardHolderNameErrorMessage = 'Please_enter_your_epsilon_card_holder_name'; 
        else if(userPaymentHistoryCardHolderName && !/^[a-zA-Z ]*$/.test(userPaymentHistoryCardHolderName)){
            userCardHolderNameInvalidErrorMessage = 'Epsilon_card_holder_name_invalid_char_error'; 
        }

        const errorMessages = {
            // userCardNumberErrorMessage,
            userCardExpireErrorMessage,
            userCardCVCErrorMessage,
            userCardHolderNameErrorMessage,
            userCardHolderNameInvalidErrorMessage
        }

        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData,
                errorMessages,
                resultError: null,
            }
        }))

        // console.log('my error is >>>', errorMessages)
        if(Object.values(errorMessages).filter(value => value !== null && value !== undefined && value !== '').length > 0) return;
        setFormSubmitted(true);

        //commented because if network failure the loader never stop
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: 'Loading',
        // }));

        // クルクルを実装
        // console.log("[EnterEpsilonPurchaseForm]onEpsilonPurchaseFormsubmit");
        // console.log('pppppp >>>',   window.EpsilonToken)
        var cardObj = {};
        // cardObj.cardno = document.getElementById('cardno').value;
        // cardObj.expire = document.getElementById('expire_year').value + document.getElementById('expire_month').value;
        // cardObj.securitycode = document.getElementById('securitycode').value;
        // cardObj.holdername = document.getElementById('holdername').value;
        cardObj.cardno = getProcessedData(userPaymentHistoryCardNumber);          //"4111111111111111";
        cardObj.expire = getProcessedData(`20${cardExpireYear}${cardExpireMonth}`);                           //"202405";
        cardObj.securitycode = userPaymentHistoryCardCVC;                        //"111";
        cardObj.holdername = userPaymentHistoryCardHolderName;                   //"takuya haga";
        window.EpsilonToken.init(process.env.REACT_APP_EPSILON_CONTRACT_CODE);
        // console.log("cardObj", cardObj);

        window.EpsilonToken.getToken(cardObj, "execTrade");
    }
	//	別コンポーネントからSubmitされる
	////////////////////////////////////////////

	////////////////////////////////////////////
    //  カード未確定時のループアニメ
    //  'react-use'の部品　reloadMovieカウントダウン開始秒
    const [cardTypeAnimateCount, setCardTypeAnimateCount] = React.useState(1);
    //  'react-use'の部品　reloadMovieカウントダウン間隔
    const [cardTypeAnimateDelay, setCardTypeAnimateDelay] = React.useState(1200);
    //  'react-use'の部品　reloadMovieカウントダウン開始停止
    const [isCardTypeAnimateRunning, setIiscardTypeAnimateRunning] = useState(false);
    //  カード未確定時のループアニメ
	////////////////////////////////////////////

	////////////////////////////////////////////
    //  カード未確定時のループアニメ開始停止トリガー
    useEffect(() => {
        if(cardType){
            setIiscardTypeAnimateRunning(false)
            setCardTypeAnimateCount(1);
        }else{
            setIiscardTypeAnimateRunning(true)
        }
    }, [cardType]);
    //  カード未確定時のループアニメ開始停止トリガー
    ////////////////////////////////////////////

    ////////////////////////////////////////////////
    //  カード未確定時のループアニメ
    useInterval(
        () => {                
                // console.log("[EnterEpsilonPurchaseForm]cardTypeAnimateCount",cardTypeAnimateCount);
                if(cardTypeAnimateCount === 1){
                    CardTypeAnimateImg = visaCard
                }else if(cardTypeAnimateCount === 2){
                    CardTypeAnimateImg = masterCard
                }else if(cardTypeAnimateCount === 3){
                    CardTypeAnimateImg = amexCard
                }else if(cardTypeAnimateCount === 4){
                    CardTypeAnimateImg = jcbCard
                }else if(cardTypeAnimateCount === 5){
                    CardTypeAnimateImg = dinersCard
                    setCardTypeAnimateCount(0);
                }else{
                    setCardTypeAnimateCount(0);
                }
                // console.log("[EnterEpsilonPurchaseForm]CardTypeAnimateImg",CardTypeAnimateImg);
                setCardTypeAnimateCount((prevCount) => prevCount + 1);
        },
        isCardTypeAnimateRunning ? cardTypeAnimateDelay : null
    );
    //  カード未確定時のループアニメ
    ////////////////////////////////////////////////

    return (
            <div id="epsilonPurchaseFormWrap" className="w-full">
                <form 
                    className="" 
                    id="epsilonPurchaseForm" 
                    onSubmit={onEpsilonPurchaseFormsubmit}
                >
                    <div id="epsilonPurchaseFormInnerBox" className="flex flex-col">
                        <div id="cardnumber" className={`grid grid-cols-1 content-center`}>
                            <label for="cc-number" className="text-sm ">{intl.formatMessage({ id: 'Card_number' })}</label>
                            <div id="cardnumber-input-wrap" className="relative">
                                <input 
                                    name="userPaymentHistoryCardNumber"
                                    inputmode="numeric"
                                    autocomplete="cc-number"
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlurCardInput}
                                    id="cc-number"
                                    className="w-full rounded"
                                    value={formData.userPaymentHistoryCardNumber}
                                    placeholder="1234 1234 1234 1234" />
                                <div class="absolute h-full top-0 right-2 flex  items-center pointer-events-none">
                                    {cardType ?<></> : <img src={CardTypeAnimateImg} alt="Visa" className="h-5 w-10 transition" />}
                                    {cardType === 'visa' &&  <img src={visaCard} alt="Visa" className="h-5 w-10" />}
                                    {cardType === 'mastercard' &&  <img src={masterCard} alt="mastercard" className="h-5 w-10" />}
                                    {cardType === 'amex' &&  <img src={amexCard} alt="amex" className="h-5 w-10" />}
                                    {cardType === 'jcb' &&  <img src={jcbCard} alt="jcb" className="h-5 w-10" />}
                                    {cardType === 'diners' &&  <img src={dinersCard} alt="diners" className="h-5 w-10" />}
                                    {(cardType === 'invalid') &&  <img src={invalidCard} alt="Invalid" className="h-5 w-10" />}
                                    
                                </div>
                            </div>
                            {/* <span className="text-xs text-error-message">
                                {errorMessage.userCardNumberErrorMessage && intl.formatMessage({ id: errorMessage.userCardNumberErrorMessage })}
                            </span> */}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div id="cardExpire" className={`flex flex-col `}>
                                <label className="text-sm ">
                                    {intl.formatMessage({ id: 'Card_expire' })}
                                </label>
                                <div class="flex flex-row w-full">
                                    <div className="grow ">
                                        <input
                                            inputmode="numeric"
                                            autocomplete="cc-exp-month"
                                            name="cardExpireMonth" 
                                            onChange={handleInputChange} 
                                            id="cc-exp-month" 
                                            className="w-full rounded" 
                                            value={formData.cardExpireMonth} placeholder="月"
                                        /> 
                                    </div>
                                    <div className="flex-none flex justify-center items-center w-4 h-full px-2 py-2 text-2xl font-Roboto align-middle">
                                        /
                                    </div>
                                    <div className="grow ">
                                        <input
                                            inputmode="numeric"
                                            autocomplete="cc-exp-year"
                                            name="cardExpireYear" 
                                            onChange={handleInputChange} 
                                            id="cc-exp-year" 
                                            className="w-full rounded" 
                                            value={formData.cardExpireYear} 
                                            placeholder="年"
                                        />
                                    </div>
                                </div>

                                <span className="text-xs text-error-message">
                                    {errorMessage.userCardExpireErrorMessage && intl.formatMessage({ id: errorMessage.userCardExpireErrorMessage })}
                                </span>
                            </div>

                            <div id="CVC" className={`flex flex-col sm:pl-2 `}>
                                <label for="cc-csc" className="text-sm ">
                                    {intl.formatMessage({ id: 'Card_cvc' })}
                                </label>
                                <div className={`relative flex items-center`}>
                                    <input
                                        name="userPaymentHistoryCardCVC"
                                        onChange={handleInputChange}
                                        inputmode="numeric"
                                        autocomplete="cc-csc"
                                        id="cc-csc"
                                        className="w-full rounded"
                                        value={formData.userPaymentHistoryCardCVC}
                                        placeholder="CVC"
                                    />
                                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <img src={cardCvc} alt="Visa" class="h-5 w-10" />
                                    </div>
                                </div>
                                <span className="text-xs text-error-message">
                                    {errorMessage.userCardCVCErrorMessage && intl.formatMessage({ id: errorMessage.userCardCVCErrorMessage })}
                                </span>
                            </div>
                        </div>
                        <div id="" className={`flex flex-col`}>
                            <label for="cc-name"　className="text-sm ">
                                {intl.formatMessage({ id: 'Card_holdername' })}
                            </label>
                            <input
                                name="userPaymentHistoryCardHolderName"
                                maxLength={45}
                                onChange={handleInputChange}
                                autocomplete="cc-name"
                                id="cc-name"
                                className="rounded"
                                value={formData.userPaymentHistoryCardHolderName}
                                placeholder={intl.formatMessage({ id: 'userShippingName_placeholder' })}
                            />
                            <span className="text-xs text-error-message">
                                {errorMessage.userCardHolderNameErrorMessage && intl.formatMessage({ id: errorMessage.userCardHolderNameErrorMessage })}
                                {errorMessage.userCardHolderNameInvalidErrorMessage && intl.formatMessage({ id: errorMessage.userCardHolderNameInvalidErrorMessage })}
                            </span>
                        </div>
                    </div>

                    {modalStateValue.data?.resultError && <ErrorMessage messageId={modalStateValue.data?.resultError}/>}


                    <p className="pt-4 text-xs text-error-message">⚠️他人名義のクレジットカード(デビットカード)の使用は犯罪です。</p>
                    <p className="text-xs text-error-message">⚠️クレジットカード(デビットカード)番号を渡され代理購入をすることは犯罪です。</p>
                    
                    {/* <form name="orderForm" action="https://beta.epsilon.jp/cgi-bin/order/direct_card_payment.cgi" method="post">
                        <input type="hidden" id="contract_code" name="contract_code" value={`${process.env.REACT_APP_EPSILON_CONTRACT_CODE}`}/>
                        <input type="hidden" id="token" name="token" value="" ref={tokenRef}/>
                    </form>
                    <input name="userPaymentHistoryPaymentPoint" type="hidden" id="userPaymentHistoryPaymentPoint" className="" value={modalStateValue?.data?.userChargePoint} /> */}
                </form>
            </div>
    )
}