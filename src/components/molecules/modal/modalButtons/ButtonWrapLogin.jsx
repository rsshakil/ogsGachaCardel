import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
// import {apiURL} from "../../../Form/LoginForm";
import {pointState} from "../../../../store/recoil/pointState";
import { browserTrackingState } from "../../../../store/recoil/browserTrackingState";
import { accessState } from "../../../../store/recoil/accessState";
import {userState} from "../../../../store/recoil/userState";
import * as queries from "../../../../restapi/queries";
import checkStartValue from '../../../../functions/checkStartValue';


export const ButtonWrapLogin = ({openConfirmModal = ()=>{}}) => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [browserTrackingObj, setBrowserTrackingState] = useRecoilState(browserTrackingState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [userStateValue, setUserState] = useRecoilState(userState);
    const [accessStateValue, setAccessState] = useRecoilState(accessState);

    function closeModal(e) {
        // console.log("[ButtonWrapLogin]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }
    function go2SignUp(e) {
        // console.log("[ButtonWrapLogin]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'SignUp',
            mode: "",
            data: {}
        }))
    }

    async function doLogin(e) {
        console.log("modalDataInfo[ButtonWrapLogin]doLogin e==>", modalStateValue);
        let prevModalInfo = modalStateValue;

        let formData = {};
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        formData.email = email;
        formData.password = password;

        let emailErrorMessage = null;
        if (!email) {
            // console.log(email, 'eeeeeeeeeeeeeeeeee')
            emailErrorMessage = 'Please_enter_your_email_address';
        }

        let passwordErrorMessage = null;
        if (!password) {
            passwordErrorMessage = 'Please_enter_your_password';
        }

        const errorMessages = {
            email: emailErrorMessage,
            password: passwordErrorMessage,
        }

        setModalState((prevState) => ({
            ...prevState,
            data: {formData, errorMessages}
        }))

        // Validation checked if failed set error message & return
        if (!email || !password) return;
        // console.log("========================== Submit ==========================")

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            data: {formData}
        }))

        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "*/*",
                "Access-Control-Allow-Origin": origin,
            };
            const response = await fetch(queries.authURL + queries.login, {
                body: JSON.stringify(formData),
                method: "POST",
                credentials: "include",
                headers: headers,
                mode: "cors",
            });
            const data = await response.json();
            if (response.status == 200) {
                // console.log("@@@@@@@@@login success", data.token);
                ////////////////////////////////////
                //  ログインフラグの変更（recoil初期値false）
                setUserState((prevState) => ({
                    ...prevState,
                    lastSessionCheckSuccessTimeUTC: Date.now(),
                    isLogin: true,
                    loginId : email,
                    countryOfResidence: data.countryId,
                    countryOfResidenceCode:  data.countryCode,
                    language: data.language,
                    userSelectLanguage: data.language,
                    gachaToken: data.gachaToken,
                    navigatorUserAgent: window.navigator.userAgent,
                }))
                //  ログインフラグの変更（recoil初期値false）
                ////////////////////////////////////
                ////////////////////////////////////
                //  ログインの痕跡を記録
                setBrowserTrackingState((prevState) => ({
                    ...prevState,
                    loginSuccessful: {
                        ...prevState.loginSuccessful,
                        [email] : {
                            timeStamp : Date.now(),
                            id : email,
                        }
                    }
                }))
                //  ログインの痕跡を記録
                ////////////////////////////////////


                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: false,
                    modalType: '',
                    mode: "",
                    data: {title: intl.formatMessage({ id: 'login' }),body: intl.formatMessage({ id: 'login_failed_Please_try_again' })}
                }))
                if (data.token) {
                    localStorage.setItem("token", data.token)
                }
                if (data.csrf) {
                    document.querySelector('meta[name="csrf-token"]').setAttribute("content", data.csrf);
                }
                // console.log("@@@@@@ data.userPointStart", data.userPointStart);
                console.log("setPointState6 start = " + checkStartValue(data.userPointStart, data.userPointEnd, pointStateValue) + " end = " + data.userPointEnd);
                setPointState((prevState) => ({
                    ...prevState,
                    start: checkStartValue(data.userPointStart, data.userPointEnd, pointStateValue),
                    end: data.userPointEnd,
                    status: "login"
                }))
                //back to prevModal implemented
                console.log("modalDataInfo[prevModalInfo]doLogin e==>", prevModalInfo);
                if(prevModalInfo.mode==="shippingConfirmation"){
                    //displayShippingConfirmModal
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'ShippingConfirm',
                        mode: "",
                        // data: {}
                    }))
                }else if(prevModalInfo.mode==="pattern_1" || prevModalInfo.mode==="pattern_2" || prevModalInfo.mode==="pattern_3"){
                    //displayDrawpointConfirmModal
                    console.log("prevModalInfo.mode",prevModalInfo.mode);
                    openConfirmModal(prevModalInfo.mode);
                }else if(prevModalInfo.mode==="callFromFunction"){
                    console.log("prevModalInfo.mode",prevModalInfo.mode);
                    console.log("prevModalInfo.callBackFunction",prevModalInfo.callBackFunction)
                    prevModalInfo.callBackFunction();
                }else if(prevModalInfo.mode==="displayModal"){
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: prevModalInfo.modalProperty.modalType,
                        mode: prevModalInfo.modalProperty.mode,
                        data: prevModalInfo.modalProperty.data
                    }))
                }
            }
            else {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    data: {title: intl.formatMessage({ id: 'login' }),body: intl.formatMessage({ id: 'login_failed_Please_try_again' }),backToPrevModal:true,prevModalName:"Login"}
                }))
            }
        } catch (err) {
            // console.log("err", err);
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'error',
                data: {title: intl.formatMessage({ id: 'login' }),body: intl.formatMessage({ id: 'login_failed_Please_try_again' }),backToPrevModal:true,prevModalName:"Login"}
            }))
        } finally {
            // console.log('finally');
        }
    }
    console.log("modalDataInfo[ButtonWrapLogin]doLogin e==>", modalStateValue);
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div 
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => doLogin({ id: '111@222222',password: '12321', session: '11111-aaaaa-cccc-eeee' })}
                >
                <p className="pointer-events-none text-base font-bold font-Roboto">{intl.formatMessage({ id: 'login' })}</p>
            </div>
            <div className="w-full flex flex-row mt-4 justify-between items-center">
                <div 
                    className="button-half-left button-green flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => go2SignUp()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-white">{intl.formatMessage({ id: 'sign_up' })}</p>
                </div>
                <div 
                    className="button-half-right button-white flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => closeModal()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-slate">{intl.formatMessage({ id: 'close' })}</p>
                </div>
            </div>
        </div>
    )
}