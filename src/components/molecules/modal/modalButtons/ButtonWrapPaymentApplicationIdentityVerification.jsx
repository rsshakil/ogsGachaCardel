import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
// import {apiURL} from "../../../Form/LoginForm";
import {pointState} from "../../../../store/recoil/pointState";
import {userState} from "../../../../store/recoil/userState";
import * as queries from "../../../../restapi/queries";
import checkStartValue from '../../../../functions/checkStartValue';
import {instance} from "../../../../services/axios";
import useSessionCheck from "../../../../hooks/useSessionCheck";
import {userSmsAuth} from "../../../../restapi/queries";
import { headersParam } from "../../../../functions/commonFunctions";
import {loadStripe} from '@stripe/stripe-js';
import useSessionBillingCheck from "../../../../hooks/useSessionBillingCheck";
import {browserTrackingState} from "../../../../store/recoil/browserTrackingState";
import {unixTimestampToDateFormat} from "../../../../utils/commonFunctions";
import { debugState } from "../../../../store/recoil/debugState";

export const ButtonWrapPaymentApplicationIdentityVerification = ({openConfirmModal = ()=>{}}) => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [userStateValue, setUserState] = useRecoilState(userState);
    const [browserTrackingObj, setBrowserTrackingState] = useRecoilState(browserTrackingState);
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    const { getSessionCheck } = useSessionCheck();
    const { getSessionBillingCheck } = useSessionBillingCheck();

    const {key } = modalStateValue.data || {};

    function MetodOfPaymentConfirm(e) {
        console.log("[ButtonWrapStripe]closeModal e==>", e);

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'MethodOfPayment',
            mode: "",
            data: {
                ...prevState.data,
                showForm : false,
                PaymentElementReady : false,
            }
        }))
    }

    async function doCheckout(e) {
        e.preventDefault();

        const formElements = document.getElementById('userSMSTokenVerifyForm').elements;

        let formData ={};
        for(let i = 0 ; i < formElements.length ; i++){
            let item = formElements.item(i);
            formData[item.name] = item.value;
        }
        console.log("formData", formData);

        const { userSMSToken} = formData;

        let userSMSTokenErrorMessage = null;
        if (!userSMSToken.trim()) {
            userSMSTokenErrorMessage = 'Please_enter_your_sms_token'; 
        }

        const errorMessages = {
            userSMSToken: userSMSTokenErrorMessage,
            userSMSValidToken: null
        }

        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData,
                errorMessages
            }
        }))

        if(Object.values(errorMessages).filter(value => value !== null && value !== undefined && value !== '').length > 0) return;

        try{
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'Loading',
            }));

            if (await getSessionCheck()) {
                const config = {
                    method: queries.postMethod,
                    url: queries.baseURL + queries.userSmsPaymentVerify,
                    data:{
                        userPaymentSMSToken: userSMSToken,
                    }
                }
        
                const {status} = await instance.request(config);
    
                if (status == 200) {
                    if (await getSessionBillingCheck()) {
                        const {paymentMethodType} = modalStateValue?.data || {};

                        console.log('my paymentMethodType >>>', paymentMethodType)

                        switch(paymentMethodType){
                            case 'MANUAL_BANK_TRANSFER':
                                openManualBankTransferInstance();
                                break;
                            case 'STRIPE_BANK_TRANSFER':
                                openStripeBankTransferInstance();
                                break;
                            case 'STRIPE_CREDIT_CARD':
                                openStripeCreditCardInstance();
                                break;    
                            case 'EPSILON_CREDIT_CARD':
                                openEpsilonCreditCardInstance('EPSILON_CREDIT_CARD');
                                break;
                            case 'PAYPAY':
                                openPaypayInstance('PAYPAY');
                                break;    
                        } 
                    }
                } 
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType:"PaymentApplicationIdentityVerification",
                        data: {
                            ...prevState.data,
                            formData,
                            errorMessages: {userSMSValidToken:  'Please_enter_your_valid_sms_token'}
                        }
                    }))
                }
            }
        }catch(err) {
            console.log('Error: ', err);

            if(err){
                // console.log("Api error",err);
                const { errorCode } = err.response?.data || '';
                console.log("errorCode",errorCode);

                let mType ="error";
                let mData = {
                    title: "",
                    body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" }),
                    backToPrevModal: true,
                    prevModalName: "PaymentApplicationIdentityVerification",
                };

                 if(errorCode===403){
                    mType = "PaymentApplicationIdentityVerification";
                    mData = {
                        formData,
                        errorMessages: {userSMSValidToken:  'Please_enter_your_valid_sms_token'} 
                    };
                }

                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: mType,
                    data: {...prevState.data, ...mData}
                }))
            }
        }
    }

    async function openManualBankTransferInstance (successModalType,modalMode="") {
        let response;
        try{
            const config = {
                method: queries.getMethod,
                url: queries.baseURL + queries.readUser + "?l=" + userStateValue.language
            }
            response = await instance.request(config);
        }catch(err){
            if(err){
                // console.log("Api error",err);
                const { errorCode } = err.response?.data || '';
                let mType ="error";
                let mData = {
                    title: "",
                    body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })
                };
                if(errorCode===101){
                    mType = "Login"
                    mData = {}
                }
                //show error modal when api error occured
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: mType,
                    // mode: "",
                    data: mData
                }))
            }
        }
        console.log('@@@@@@ response',response);
        if(response){
            const { status } = response || '';
            if (status == 200) {
                setUserState((prevState)=>({
                    ...prevState,
                    waiting4Shipping:{...response.data?.myApplying},
                    myCollection:{...response.data?.myCollection},
                    myShippingAddress:{...response.data?.myShippingAddress},
                    shippingCompleted:{...response.data?.myShipping},
                    userEmailAddress: response.data?.user?.userEmail,
                    userId: response.data?.user?.userId,
                }))
                if(successModalType=="SmsAuth" && response.data?.user?.userSMSFlag==1){
                    successModalType ="SMSAuthenticated";
                }
            }
            //////////////////////////////////////////
            // ユーザーの注文商品
            let userChargeKey = modalStateValue.data.key;    
            let userChargePoint = userStateValue.myChargeList[userChargeKey].userChargePoint
            let userChargePointEntry =  userChargePoint + 'pt';
            //  最終的なparamsを生成
            let formParams = '?usp=pp_url&entry.373702299=' + userChargePointEntry + '&entry.900159542=' + userStateValue?.loginId + '&entry.726731249=' + userStateValue?.userId + '&entry.468945068=' + userStateValue?.smsAuthNo;
            let formUrl =  "https://docs.google.com/forms/d/e/1FAIpQLScIVWgO2rXY0Cez9OAyAIHD1uqtzYCm9BgW37tQH_V9QqKQZA/viewform" + formParams

            // window.open(formUrl, '_blank')
            // ユーザーの注文商品
            //////////////////////////////////////////
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'enterCustomerInformation',
                mode: modalMode,
                data : {...prevState.data,userChargePoint : userChargePoint}
            }))
        }
    }

    async function openStripeBankTransferInstance () {
        if (await getSessionBillingCheck()) {
            console.log("modalStateValue",modalStateValue);
            let userChargeKey = modalStateValue.data.key;
            console.log("userChargeKey",userChargeKey)
            let userInfo = userStateValue.myChargeList[userChargeKey];
            console.log("userInfo",userInfo);

            //TODO call bank api
            const apiUrl = `https://payment-develop.cardel.online/create-payment-intent-bank?cpp=${userInfo?.userChargePointPattern}&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxNCwiaWF0IjoxNzA2NjA0MDU1LCJleHAiOjE3MzgxNDAwNTV9.6E0K0P78QrPuPw8dP6oslKgDNj2oLfewpDwfLlVi4gE`;//this is development url
            let response;
           
            try{
                const config = {
                    method: queries.getMethod,
                    url: apiUrl
                }
                response = await instance.request(config);
                console.log("bank api response",response)

                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'bankTransferApplicationCompleted',
                }))
            }catch(err){
                console.log('invalid formData');
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
                }));
            }
        }
    }

    async function openStripeCreditCardInstance () {
        if (await getSessionBillingCheck()) {
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'Stripe',
                //  初期化しておく
                stripe : false,
                elements : false,
                isLoading : false,
                isPaymentIntentSucceeded : false,
                showForm : false,
                message : false,
            }))
        }
    }

    async function openEpsilonCreditCardInstance (paymentPattern) {
        //Call GachaCreatePaymentHistory lambda to create payment-history
        const { browserUUID, browserUserAgent, appRendersDateTime } = browserTrackingObj;
        try {
            const config = {
                method: queries.postMethod,
                url: queries.baseURL + queries.createPaymentHistory,
                data:{
                    cpp: key,
                    browserUUID,
                    browserUserAgent,
                    appRendersDateTime: Math.floor( appRendersDateTime / 1000 ),
                    paymentPattern
                }
            }
    
            const {data, status} = await instance.request(config);

            if (status == 200 && await getSessionBillingCheck()) {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'epsilonPurchaseForm',
                    data: {...prevState.data,paymentHistoryId: data.paymentHistoryId}

                }))
            }
        }catch(error) {
            console.log("create payment history error",error);
            let statusCode = 400;
            if (error.response) {
                console.log("create payment history error?.response", error?.response);
                const {data = {}, status} = error?.response || '';
                const {errorCode = '', ip = "", timestamp = []} = data || '';
                console.log("create payment history status", status);
                statusCode = errorCode ? errorCode : status;
                console.log("create payment history errorCode", errorCode);
                //status 405 means invalid cpp id then display the poin ichiran again

                if (errorCode === 405) {
                    await doCharge();
                } else if (statusCode == 601) {//ipAddressError
                    // let attemptTimes = timestamp[0] && timestamp[0].length > 0 && timestamp[0].map(attemptTime => {
                    //     return `\t\t\t${unixTimestampToDateFormat(attemptTime.userCreatedAt, true, true)}`;
                    // });
                    // setModalState((prevState) => ({
                    //     ...prevState,
                    //     BaseModalOpen: true,
                    //     modalType: 'IPFail2BanError',
                    //     mode: "",
                    //     data: {
                    //         ...prevState.data,
                    //         formData: {},
                    //         IPAddress: ip,
                    //         datearray: attemptTimes

                    //     }
                    // }))
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'ipRestriction'
                    }))
                } else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        data: {
                            title: '',
                            body: intl.formatMessage({id: "A_system_error_has_occurred__Please_try_again"})
                        }
                    }));
                }
            }
        }
    }

    async function openPaypayInstance (paymentPattern) {
        const { browserUUID, browserUserAgent, appRendersDateTime } = browserTrackingObj;
        try {
            const config = {
                method: queries.postMethod,
                url: queries.baseURL + queries.createPaymentHistory,
                data:{
                    cpp: key,
                    browserUUID,
                    browserUserAgent,
                    appRendersDateTime: Math.floor( appRendersDateTime / 1000 ),
                    paymentPattern
                }
            }
    
            const {data, status} = await instance.request(config);

            if (status == 200) {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'doPayPay',
                    mode: "purchase",
                    data: { ...prevState.data, paymentHistoryId: data.paymentHistoryId}
                }))
            }
        }catch(error) {
            console.log("create payment history error > paypay",error);
            console.log("create payment history error?.response > paypay",error?.response);
            const { data = {}, status } = error?.response || '';
            const { errorCode = '' } = data || '';
            console.log("create payment history status > paypay",status);
            console.log("create payment history errorCode > paypay",errorCode);
            //status 405 means invalid cpp id then display the poin ichiran again

            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'error',
                data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
            }));
        }
    }

    //displayPointChargeModal
    async function doCharge(e) {
        //loader
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            // data: {}
        }))
        // check-sessionに問題なし
        if (await getSessionCheck(doCharge,e)) {
            //SessionCheckSuccess display ChargeModal

            try {
                const config = {
                    method: queries.getMethod,
                    url: queries.baseURL + queries.readPoint,
                }
    
                const response = await instance.request(config);
                console.log('response', response)
                if (response.status == 200) {
                    const {records = {}} = response.data || {};

                    setUserState(prevState => ({...prevState, myChargeList : records}))

                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'charge',
                        mode: "purchase",
                        data: {isPurchaseAgain:true}
                    }))
                }
            } catch (err) {
                console.log("err >>>", err);

                let mData = {
                    title: "",
                    body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" }),
                };

                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: "error",
                    data: mData
                }))
                
            } 
        }
    }


    console.log("modalDataInfo[ButtonWrapAuthenticationExecution]doLogin e==>", modalStateValue);
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-row mt-4 justify-between items-center">
                <div 
                    className="button-half-left  flex flex-row justify-center items-center touch-none select-none"
                    onClick={doCheckout}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-white">{intl.formatMessage({ id: 'Send_verification_code' })}</p>
                </div>
                <div 
                    className="button-half-right button-white flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => MetodOfPaymentConfirm()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-slate">{intl.formatMessage({ id: 'Back' })}</p>
                </div>
            </div>
        </div>
    )
}