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


export const ButtonWrapAuthenticationExecution = ({openConfirmModal = ()=>{}}) => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [userStateValue, setUserState] = useRecoilState(userState);
    const { getSessionCheck } = useSessionCheck();

    function closeModal(e) {
        // console.log("[ButtonWrapAuthenticationExecution]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }
    function go2SmsAuth(e) {
        // console.log("[ButtonWrapAuthenticationExecution]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'SmsAuth',
            mode: "",
            data: {}
        }))
    }

    async function doSmsAuth() {
        let prevModalInfo = modalStateValue;
        console.log('modalDataInfo sms authentication', prevModalInfo);
        let formData = {};
        const smsToken = document.getElementById("smsToken").value;
        console.log('smsToken', smsToken)
        formData.smsToken = smsToken;

        let errorMessage = null;
        if (!smsToken) {
            errorMessage = intl.formatMessage({ id: 'Please_enter_your_sms_token' });
        }

        const errorMessages = {
            smsToken: errorMessage
        }

        setModalState((prevState) => ({
            ...prevState,
            data: {formData, errorMessages}
        }))

        if (!smsToken) return;
        // console.log("========================== Submit ==========================")

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            mode: "",
            data: {}
        }))
        // check-sessionに問題なし
        if (await getSessionCheck()) {
            //SessionCheckSuccess
            let response;
            try {
               
                const config = {
                    method: queries.putMethod,
                    url: queries.baseURL + queries.userSmsAuth,
                    data:formData
                }

                response = await instance.request(config);
                console.log('response', response);
               
            } catch (err) {
                console.log("err", err);
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    // mode: "",
                    data: {
                        title: "",//intl.formatMessage({ id: 'sign_up' }),
                        body: intl.formatMessage({ id: 'Please_check_your_sms_token' }),
                        backToPrevModal:true,
                        prevModalName:"SendSmsCompleted"
                    }
                }))
            }
            if (response?.status == 200) {
                console.log("display SMSAuthenticated")
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'SMSAuthenticated',
                    mode:"",
                    data: {
                        ...prevModalInfo?.data
                    }
                }))
            }
            else {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    // mode: "",
                    data: {
                        title: "",//intl.formatMessage({ id: 'sign_up' }),
                        body: intl.formatMessage({ id: 'Please_check_your_sms_token' }),
                        backToPrevModal:true,
                        prevModalName:"SendSmsCompleted"
                    }
                }))
            }
        }
    }
    console.log("modalDataInfo[ButtonWrapAuthenticationExecution]doLogin e==>", modalStateValue);
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div 
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={doSmsAuth}
                >
                <p className="pointer-events-none text-base font-bold font-Roboto">{intl.formatMessage({ id: 'Send_verification_code' })}</p>
            </div>
            <div className="w-full flex flex-row mt-4 justify-between items-center">
                <div 
                    className="button-half-left button-green flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => go2SmsAuth()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-white">{intl.formatMessage({ id: 'Send_SMS_again' })}</p>
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