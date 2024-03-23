import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, Link } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import { userState } from "../../../../store/recoil/userState";
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';
import useCsrfToken from '../../../../hooks/useCsrfToken'
import session from '../../../../store/recoil/sessionState'
import checkStartValue from '../../../../functions/checkStartValue';
import {pointState} from "../../../../store/recoil/pointState";
import { headersParam } from '../../../../functions/commonFunctions';
import useSessionBillingCheck from '../../../../hooks/useSessionBillingCheck'
import useSMSFlagCheck from "../../../../hooks/useSMSFlagCheck";
import { debugState } from "../../../../store/recoil/debugState";

export const ButtonWrapMetodOfPaymentConfirm = ({handleOnSubmit}) => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [{ loading, error, state }, setValid] = useRecoilState(session);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionBillingCheck } = useSessionBillingCheck();
    const {verifySMSFlag} = useSMSFlagCheck();
    const navigate = useNavigate();

    const intl = useIntl()

    //paymentType 
    let chargeKey = modalStateValue.data.key;
    const hasBankEpsilon = UserStateObj.myChargeList[chargeKey]?.hasBankEpsilon
    const hasBankManual = UserStateObj.myChargeList[chargeKey]?.hasBankManual
    const hasBankStripe = UserStateObj.myChargeList[chargeKey]?.hasBankStripe
    const hasCardEpsilon = UserStateObj.myChargeList[chargeKey]?.hasCardEpsilon
    const hasCardStripe = UserStateObj.myChargeList[chargeKey]?.hasCardStripe
    const hasPaypayEpsilon = UserStateObj.myChargeList[chargeKey]?.hasPaypayEpsilon
    const hasPointPaypay = UserStateObj.myChargeList[chargeKey]?.hasPointPaypay
    const hasConvenienceStore = UserStateObj.myChargeList[chargeKey]?.hasConvenienceStore
    const hasEMoney = UserStateObj.myChargeList[chargeKey]?.hasEMoney
    console.log("hasBankStripe",hasBankStripe)
    console.log("hasBankManual",hasBankManual)
    //////////////////////////////////////////////////////////////////
    //  ユーザーデータの呼び出して成功したら決済フォームへ
    async function callUserReadApi(e,successModalType,modalMode=""){

        sendPaymentOTP('MANUAL_BANK_TRANSFER');

        return;


        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            // data: {}
        }))
        let response;
        try{
            const config = {
                method: queries.getMethod,
                url: queries.baseURL + queries.readUser + "?l=" + UserStateObj.language
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
            let userChargePoint = UserStateObj.myChargeList[userChargeKey].userChargePoint
            let userChargePointEntry =  userChargePoint + 'pt';
            //  最終的なparamsを生成
            let formParams = '?usp=pp_url&entry.373702299=' + userChargePointEntry + '&entry.900159542=' + UserStateObj?.loginId + '&entry.726731249=' + UserStateObj?.userId + '&entry.468945068=' + UserStateObj?.smsAuthNo;
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
    //  ユーザーデータの呼び出して成功したら決済フォームへ
    //////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////
    //  PayPay
    function doPayPay(e) {
        // console.log("[ButtonWrapMetodOfPaymentConfirm]closeModal e==>", e);

        e.preventDefault();
        sendPaymentOTP('PAYPAY');
        
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: 'doPayPay',
        //     mode: "purchase",
        //     // data: {}
        // }))
    }
    //  PayPay
    //////////////////////////////////////////////////////////////////




    function back2charge(e) {
        // console.log("[ButtonWrapMetodOfPaymentConfirm]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'charge',
            mode: "purchase",
            data: {}
        }))
    }

    const sendPaymentOTP = async(paymentMethodType = '') => {
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            data : {...prevState.data, paymentMethodType: ''}
        }))

        if (await getSessionBillingCheck()) {
            const {data, status} =  await verifySMSFlag('payment') || {};

            if(data && status == 200) {
                const {smsAuthNo = '', myShippingAddress = []} = data || {};
                setUserState((prevState) => ({
                    ...prevState,
                    smsAuthNo,
                    myShippingAddress: {...myShippingAddress}
                }))

                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType:"PaymentApplicationIdentityVerification",
                    data : {...prevState.data, paymentMethodType}
                }))
            }
        }
    }

    async function go2Stripe(e) {
        sendPaymentOTP('STRIPE_CREDIT_CARD');
    }

    //doStripeBank
    async function doStripeBank(e) {
        sendPaymentOTP('STRIPE_BANK_TRANSFER');

        return;

        let openData = e;
        //loader
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            // data: {}
        }))
        console.log("modalStateValue",modalStateValue);
        let userChargeKey = modalStateValue.data.key;
        console.log("userChargeKey",userChargeKey)
        let userInfo = UserStateObj.myChargeList[userChargeKey];
        console.log("userInfo",userInfo);
        
        // check-sessionに問題なし
        if (await getSessionBillingCheck()) {
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
                let modalType = 'bankTransferApplicationCompleted';
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: modalType,
                    // data : openData,
                }))
            }catch(err){
                console.log('invalid formData');
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    // mode: "",
                    data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
                }));
            }
        }
    }


    const doEpsilonCreditCard = (e) => {
        e.preventDefault();
        sendPaymentOTP('EPSILON_CREDIT_CARD');
    }


    // https://docs.google.com/forms/d/e/1FAIpQLScIVWgO2rXY0Cez9OAyAIHD1uqtzYCm9BgW37tQH_V9QqKQZA/viewform?usp=pp_url&entry.373702299=500pt&entry.900159542=%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9&entry.726731249=88888888
    //  https://docs.google.com/forms/d/e/1FAIpQLScIVWgO2rXY0Cez9OAyAIHD1uqtzYCm9BgW37tQH_V9QqKQZA/viewform?usp=pp_url&entry.900159542=mail@mailmail
    // 購入金額
    // ユーザー
    // メルアド
    // SMS認証番
    // とか飛ばす
    // let userChargeKey = modalStateValue.data.key;
    // console.log("[ButtonWrapMetodOfPaymentConfirm]userChargeKey==>", userChargeKey);

    // let userChargePoint = UserStateObj.myChargeList[userChargeKey].userChargePoint
    // console.log("[ButtonWrapMetodOfPaymentConfirm]userChargeName==>", userChargePoint);
    // let userChargePointEntry =  userChargePoint + 'pt';
    // console.log("[ButtonWrapMetodOfPaymentConfirm]userChargePointEntry==>", userChargePointEntry);
    // //  最終的なparamsを生成
    // let formParams = '?usp=pp_url&entry.373702299='+userChargePointEntry+'&entry.900159542='+UserStateObj.loginId+'&entry.726731249=88888888';
    console.log("debugStateValue.isDebug",debugStateValue.isDebug)
    return (

        <div className="w-full flex flex-col justify-center items-center">

            {
            //////////////////////////////デバッグの時だけ表示///////////////////////////////////
            debugStateValue.isDebug
                ?   //  デバッグの時だけ表示
                <>
                {/*
                    <div
                        className="button-full flex flex-row justify-center items-center touch-none select-none mt-4"
                        onClick={(e) => doStripeBank({})}
                            >
                            <p className="pointer-events-none text-base font-bold font-Roboto">
                                {intl.formatMessage({ id: '銀行振込Stripe' })}
                            </p>
                        </div>
                         
                        <div
                        className="button-full flex flex-row justify-center items-center touch-none select-none mt-4"
                        onClick={(e) => doPayPay(e)}
                            >
                            <p className="pointer-events-none text-base font-bold font-Roboto">
                                {intl.formatMessage({ id: 'PayPay' })}
                            </p>
                        </div>
                        <div className="button-full flex flex-row justify-center items-center touch-none select-none mt-4"
                            onClick={doEpsilonCreditCard}>
                            <p className="pointer-events-none text-base font-bold font-Roboto">
                                {intl.formatMessage({ id: 'クレジットカード' })}
                            </p>
                        </div> */}
                </>
                :   //  デバッグではなければ非表示
                <></>
            //////////////////////////////デバッグの時だけ表示///////////////////////////////////
            }

            {/* UserStateObj.myChargeList[userChargeKey].hasBank
            UserStateObj.myChargeList[userChargeKey].hasCard
            ...
            これらがtrueの時だけ表示するようにする */}
            {hasPointPaypay && <>
                <div
                        className="button-full flex flex-row justify-center items-center touch-none select-none mt-4"
                        onClick={(e) => doPayPay(e)}
                            >
                            <p className="pointer-events-none text-base font-bold font-Roboto">
                                {intl.formatMessage({ id: 'PayPay' })}
                            </p>
                        </div>
            </>}
            {hasCardEpsilon && <>
                <div className="button-full flex flex-row justify-center items-center touch-none select-none mt-4"
                    onClick={doEpsilonCreditCard}>
                    <p className="pointer-events-none text-base font-bold font-Roboto">
                        {intl.formatMessage({ id: 'epsilon_credit_card' })}
                    </p>
                </div>
            </>}
            {hasBankStripe && <>
                <div className="button-full flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => doStripeBank({})}
                    >
                    <p className="pointer-events-none text-base font-bold font-Roboto">
                        {intl.formatMessage({ id: 'Bank_stripe' })}
                    </p>
                </div>
            </>}
            {hasCardStripe && <>
                <div
                className="button-full flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => go2Stripe({})}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    {intl.formatMessage({ id: 'credit_card' })}
                </p>
            </div>
            </>}
            

            {hasBankManual && <>
                <div
                className="button-full flex flex-row justify-center items-center touch-none select-none mt-4"
                target="_blank"
                activeClassName="active"
                onClick={(e) => callUserReadApi()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    {intl.formatMessage({ id: 'Bank_transfer' })}
                </p>
            </div></>}
            
            <div 
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => back2charge()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto text-slate">
                    {intl.formatMessage({ id: 'Back' })}
                </p>
            </div>
        </div>




)

}