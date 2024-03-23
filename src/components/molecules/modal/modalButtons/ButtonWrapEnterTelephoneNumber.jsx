import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';
import { userState } from "../../../../store/recoil/userState";
import useCsrfToken from '../../../../hooks/useCsrfToken'
import session from '../../../../store/recoil/sessionState'
import checkStartValue from '../../../../functions/checkStartValue';
import {pointState} from "../../../../store/recoil/pointState";
import { headersParam } from '../../../../functions/commonFunctions';
import useSessionCheck from '../../../../hooks/useSessionCheck'
import {putMethod} from "../../../../restapi/queries";
import {unixTimestampToDateFormat} from "../../../../utils/commonFunctions";

export const ButtonWrapEnterTelephoneNumber = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [{ loading, error, state }, setValid] = useRecoilState(session);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    const intl = useIntl()
    function closeModal(e) {
        
        // console.log("[ButtonWrapEnterTelephoneNumber]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }

    // クーポン実行ボタン
    async function doSendSMS(e) {
        let prevModalInfo = modalStateValue;
        console.log('modalDataInfo', prevModalInfo);
        // console.log("[ButtonWrapEnterTelephoneNumber]doLogin e==>", e);
        let formData = {};
        const countryCodeTitle = document.querySelector('.selected-flag').title;
        const countryCodeRegex = /\+(\d+)/; // Regular expression to match the country code starting with '+'
        const match = countryCodeTitle.match(countryCodeRegex); // Use match to find the country code
        let countryCode = "";
        if (match && match.length > 1) {
            countryCode = `+${match[1]}`; // Extract the country code and add the '+' sign
        }

        const telephoneNumber = document.getElementById("TelephoneNumber").value;

        formData.countryCode = countryCode;
        formData.telephoneNumber = telephoneNumber;

        let errorMessage = null;
        if (!telephoneNumber) {
            errorMessage = intl.formatMessage({ id: 'Please_enter_your_phone_number' });
        }

        const errorMessages = {
            telephoneNumber: errorMessage
        }

        setModalState((prevState) => ({
            ...prevState,
            data: {formData, errorMessages}
        }))

        if (!telephoneNumber) return;
        // console.log("========================== Submit ==========================")

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            mode: "",
            data: {e}
        }))
        // check-sessionに問題なし
        if (await getSessionCheck()) {
            //SessionCheckSuccess
            try {
                let response;
                const config = {
                    method: queries.putMethod,
                    url: queries.baseURL + queries.userSms,
                    data:formData
                }
    
                response = await instance.request(config);
                console.log('response', response);
                if (response.status == 200) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'SendSmsCompleted',
                        // mode: "edit",
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
                        data: {
                            title: "",//intl.formatMessage({ id: 'sign_up' }),
                            body: intl.formatMessage({ id: 'Please_check_your_phone_number' }),
                            backToPrevModal:true,
                            prevModalName:"SmsAuth"
                        }
                    }))
                }
            } catch (err) {
                console.log("err", err);
                let statusCode = 400;
                if (err.response) {
                    const { data = {}, status = 400 } = err.response || '';
                    const { errorCode = '', ip="", timestamp=[] } = data || '';
                    statusCode = errorCode ? errorCode : status;
                    if(statusCode==101){
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'CountryofResidenceRegistration',
                            data : {}
                        }))
                    }
                    //userSMSAuthentication records exists 
                    else if(statusCode==103){
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'error',
                            data: {
                                title: "",//intl.formatMessage({ id: 'sign_up' }),
                                body: intl.formatMessage({ id: 'this_phone_number_is_not_available' }),
                                backToPrevModal:true,
                                prevModalName:"SmsAuth"
                            }
                        }))
                    }
                    else if (statusCode == 601) {//ipAddressError
                        let attemptTimes = timestamp[0] && timestamp[0].length>0 && timestamp[0].map(attemptTime=>{
                            return `\t\t\t${unixTimestampToDateFormat(attemptTime.userCreatedAt,true,true)}`;
                        });
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'IPFail2BanError',
                            mode: "",
                            data: {
                                ...prevState.data,
                                formData: formData,
                                IPAddress:ip,
                                datearray:attemptTimes

                            }
                        }))
                    }
                    else{
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'error',
                            mode: "",
                            data: {title: "",body: intl.formatMessage({ id: 'A_system_error_has_occurred__Please_try_again' }),backToPrevModal:true,prevModalName:"SmsAuth"}
                        }))
                    }
                }
            }

        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => doSendSMS()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    {intl.formatMessage({ id: 'Send_SMS' })}
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