import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
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
import useSessionCheck from '../../../../hooks/useSessionCheck'

export const ButtonWrapChangePassword = ({handleOnSubmit}) => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [{ loading, error, state }, setValid] = useRecoilState(session);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    const intl = useIntl()
    function closeModal(e) {
        
        // console.log("[ButtonWrapChangePassword]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }

    async function doChangePassword(e) {
        const formElements = document.getElementById('passwordChange').elements;
        let formData ={};
        for(let i = 0 ; i < formElements.length ; i++){
            let item = formElements.item(i);
            formData[item.name] = item.value;
        }
        console.log("formData", formData);
        const { oldPassword, newPassword1, newPassword2 } = formData;

        let oldPasswordErrorMessage = null;
        if (!oldPassword) {
            oldPasswordErrorMessage = 'Please_enter_your_old_password';
        }

        let newPassword1ErrorMessage = null;
        if (!newPassword1) {
            newPassword1ErrorMessage = 'Please_enter_your_new_password';
        }

        if (newPassword1 && newPassword1.length<6) {
            newPassword1ErrorMessage = 'password_min_length_error';
        }

        if (newPassword1 && newPassword1.length>32) {
            newPassword1ErrorMessage = 'password_max_length_error';
        }

        let newPassword2ErrorMessage = null;
        if (!newPassword2) {
            newPassword2ErrorMessage = 'please_enter_your_confirmation_password';
        } else {
            if (newPassword2 !== newPassword1) {
                newPassword2ErrorMessage = 'new_password_conf_password_not_match_error';
            }
        }

        const errorMessages = {
            oldPassword: oldPasswordErrorMessage,
            newPassword1: newPassword1ErrorMessage,
            newPassword2: newPassword2ErrorMessage
        }

        console.log("errorMessages", errorMessages)
        
        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData,
                errorMessages
            }
        }))

        // Validation checked if failed set error message & return
        if (!oldPassword || !newPassword1 || newPassword1.length<6 || newPassword1.length>32 || !newPassword2 || (newPassword1 !== newPassword2) ) return;

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "edit",
            // data: {}
        }))
        
        // check-sessionに問題なし
        if (await getSessionCheck()) {
            //SessionCheckSuccess
            try {
                let response;
                const config = {
                    method: queries.putMethod,
                    url: queries.baseURL + queries.userChangePassword,
                    data:formData
                }
    
                response = await instance.request(config);
    
                console.log('response', response)
                if (response.status == 200) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'ChangePasswordCompleted',
                        data:{}
                    }))
                }
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        mode: "",
                        data: {title: "",body: intl.formatMessage({ id: 'A_system_error_has_occurred__Please_try_again' })}
                    }))
                }
            } catch (err) {
                // console.log("err", err);
                let statusCode = 400;
                if (err.response) {
                    const { data = {}, status = 400 } = err.response || '';
                    const { errorCode = '' } = data || '';
                    statusCode = errorCode ? errorCode : status;
                    if(statusCode==101){//user_id_invalid_error
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'error',
                            mode: "",
                            data: {title: "",body: intl.formatMessage({ id: 'user_id_invalid_error' }),backToPrevModal:true,prevModalName:"ChangePassword"}
                        }))
                    }else if(statusCode==102){//oldPass not match
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'error',
                            mode: "",
                            data: {title: "",body: intl.formatMessage({ id: 'old_password_not_match' }),backToPrevModal:true,prevModalName:"ChangePassword"}
                        }))
                    }else if(statusCode==103){//confirmPass not match
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'error',
                            mode: "",
                            data: {title: "",body: intl.formatMessage({ id: 'new_password_conf_password_not_match_error' }),backToPrevModal:true,prevModalName:"ChangePassword"}
                        }))
                    }else if(statusCode==104){//new pass can not be as old pass
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'error',
                            mode: "",
                            data: {title: "",body: intl.formatMessage({ id: 'old_password_same_as_new_error' }),backToPrevModal:true,prevModalName:"ChangePassword"}
                        }))
                    }else{
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'error',
                            mode: "",
                            data: {title: "",body: intl.formatMessage({ id: 'A_system_error_has_occurred__Please_try_again' }),backToPrevModal:true,prevModalName:"ChangePassword"}
                        }))
                    }
                }
            }

        }
    }


    // function doSignUp(e) {
        
    //     console.log("[ButtonWrapChangePassword]closeModal e==>", e);
    //     setModalState((prevState) => ({
    //         ...prevState,
    //         BaseModalOpen: true,
    //         modalType: 'SignUpThanks',
    //         mode: "",
    //         data: {}
    //     }))
    // }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => doChangePassword()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    {intl.formatMessage({ id: 'Change_Password' })}
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