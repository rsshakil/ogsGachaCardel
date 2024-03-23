import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';
import { browserTrackingState } from "../../../../store/recoil/browserTrackingState";
import { accessState } from "../../../../store/recoil/accessState";
import { userState } from "../../../../store/recoil/userState";
import useCsrfToken from '../../../../hooks/useCsrfToken'
import session from '../../../../store/recoil/sessionState'
import checkStartValue from '../../../../functions/checkStartValue';
import {pointState} from "../../../../store/recoil/pointState";
import { headersParam } from '../../../../functions/commonFunctions';
import useSessionCheck from '../../../../hooks/useSessionCheck'




export const ButtonWrapEnterCoupon = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [{ loading, error, state }, setValid] = useRecoilState(session);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [browserTrackingObj, setBrowserTrackingState] = useRecoilState(browserTrackingState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    const intl = useIntl()
    


    function closeModal(e) {
        // console.log("[ButtonWrapEnterCoupon]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }

    // クーポン実行ボタン
    async function doEnterCoupon(e) {
        // console.log("[ButtonWrapEnterCoupon]doLogin e==>", e);
        let formData = {};
        const couponCode = document.getElementById("couponCode").value;
        formData.couponCode = couponCode;

        let couponErrorMessage = null;
        
        if (!couponCode) {
            //  クーポンコードがない時
            couponErrorMessage = intl.formatMessage({ id: 'please_enter_your_coupon' });
        }

        const errorMessages = {
            couponCode: couponErrorMessage
        }

        // console.log("errorMessages", errorMessages)

        setModalState((prevState) => ({
            ...prevState,
            data: {formData, errorMessages}
        }))
        //  クーポンコードがない時処理終了
        if (!couponCode) return;
        // console.log("========================== Submit ==========================")

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            mode: "",
            data: {e}
        }))

        ////////////////////////////////////////
        //  ネズミ取り判定
        //
        //  このクーポンの利用回数
        let enterThisCouponCount = 0;
        let couponSucceedObj = {};
        couponSucceedObj = browserTrackingObj?.couponSucceed[couponCode]
        if(couponSucceedObj){
            enterThisCouponCount = (Object.keys(browserTrackingObj?.couponSucceed[couponCode])?.length)
        }

        // console.log("[ButtonWrapEnterCoupon]Object.keys(browserTrackingObj.couponSucceed[couponCode]).length==>",enterThisCouponCount);
        // console.log("[ButtonWrapEnterCoupon]enterThisCouponCount==>",enterThisCouponCount);
        if(enterThisCouponCount > 1){
            //  ２回目の使用に成功し３回目を使用しようとしたときにここに入る
            console.log("[ButtonWrapEnterCoupon]２回目の使用に成功し３回目を使用したときにここに入る==>",enterThisCouponCount);
            let modalType = 'MultipleEnterCouponCodeError';
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: modalType,
                data: {
                    couponCode: couponCode,
                }
            }))
        }
        //  ネズミ取り判定
        ////////////////////////////////////////
        ////////////////////////////////////////
        //  ネズミ取り判定にelaseの時だけ以下実行に変更する
        else if (await getSessionCheck()) {
            // check-sessionに問題なし
            //SessionCheckSuccess
            try {
                let response;
                const config = {
                    method: queries.postMethod,
                    url: queries.baseURL + queries.executeCoupon,
                    data:formData
                }
                response = await instance.request(config);
                console.log('response of coupon', response);
                if (response.status == 200) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'EnterCouponCompleted',
                        // mode: "edit",
                        data: {
                            couponCode: couponCode,
                            couponName: response?.data?.couponName,
                            couponPoint: response?.data?.couponPoint,
                        }
                    }))
                    //////////////////
                    //  クーポン利用済みの痕跡を記録
                    setBrowserTrackingState((prevState) => ({
                        ...prevState,
                        couponSucceed: {
                            ...prevState.couponSucceed,
                            [couponCode] : {    //  クーポンIDについての証跡
                                ...prevState.couponSucceed[couponCode],
                                [UserStateObj.loginId]:{
                                    timeStamp : Date.now(),
                                    id : UserStateObj.loginId
                                }
                            }
                        }
                    }))
                    //  クーポン利用済みの痕跡を記録
                    //////////////////
                }
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        // mode: "",
                        data: {
                            title: "",//intl.formatMessage({ id: 'sign_up' }),
                            body: intl.formatMessage({ id: 'Coupon_code_is_invalid' }),
                            backToPrevModal:true,
                            prevModalName:"EnterCoupon"
                        }
                    }))
                }
            } catch (err) {
                console.log("err", err);
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    // mode: "",
                    data: {
                        title: "",//intl.formatMessage({ id: 'sign_up' }),
                        body: intl.formatMessage({ id: 'Coupon_code_is_invalid' }),
                        backToPrevModal:true,
                        prevModalName:"EnterCoupon"
                    }
                }))
            }

        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => doEnterCoupon()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    {intl.formatMessage({ id: 'use_coupon' })}
                </p>
            </div>
            <div 
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => closeModal()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text-close">
                    {intl.formatMessage({ id: 'close' })}
                </p>
            </div>
        </div>
)

}