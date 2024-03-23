import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';
import { unixTimestampToDateFormat } from "../../../../utils/commonFunctions";

export const ButtonWrapSignUp = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const intl = useIntl()
    function closeModal(e) {
        // console.log("[ButtonWrapSignUp]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }

    async function doSignUp(e) {
        // console.log("[ButtonWrapSignUp]doLogin e==>", e);
        const formElements = document.getElementById('signUpForm').elements;
        let formData ={};
        for(let i = 0 ; i < formElements.length ; i++){
            let item = formElements.item(i);
            formData[item.name] = item.value;
        }
        console.log("formData", formData);
        const { emailAddress, password, confirmedPassword } = formData;

        let emailErrorMessage = null;
        if (!emailAddress) {
            emailErrorMessage = 'Please_enter_your_email_address';
        }

        let passwordErrorMessage = null;
        if (!password) {
            passwordErrorMessage = 'Please_enter_your_password';
        }

        if (password && password.length<6) {
            passwordErrorMessage = 'password_min_length_error';
        }

        if (password && password.length>32) {
            passwordErrorMessage = 'password_max_length_error';
        }

        let confirmPasswordErrorMessage = null;
        if (!confirmedPassword) {
            confirmPasswordErrorMessage = 'please_enter_your_confirmation_password';
        } else {
            if (password !== confirmedPassword) {
                confirmPasswordErrorMessage = 'password_and_confirmation_password_do_not_match';
            }
        }

        const errorMessages = {
            emailAddress: emailErrorMessage,
            password: passwordErrorMessage,
            confirmedPassword: confirmPasswordErrorMessage
        }

        console.log("errorMessages", errorMessages)
        let response;
        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData,
                errorMessages
            }
        }))

        // Validation checked if failed set error message & return
        if (!emailAddress || !password || password.length<6 || password.length>32 || !confirmedPassword || (password !== confirmedPassword) ) return;
        // console.log("========================== Submit ==========================")


        try {

            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'Loading',
                mode: "",
                data: {e}
            }));

            const config = {
                method: queries.postMethod,
                url: queries.baseURL + queries.createUser,
                data:formData
            }

            response = await instance.request(config);

            console.log('response', response)
            if (response.status == 200) {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'SignUpThanks',
                    mode: "",
                    data: {}
                }))
            }
            else {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    mode: "",
                    data: {title: intl.formatMessage({ id: 'sign_up' }),body: intl.formatMessage({ id: 'new_registration_failed' })}
                }))
            }
        } catch (err) {
            // console.log("err", err);
            let statusCode = 400;
            if (err.response) {
                const { data = {}, status = 400 } = err.response || '';
                const { errorCode = '', ip="", timestamp=[] } = data || '';
                statusCode = errorCode ? errorCode : status;
                if (statusCode == 505) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'SignUp',
                        mode: "",
                        data: {
                            ...prevState.data,
                            formData: formData,
                            errorMessages: {...errorMessages, duplicate: 'This_email_address_is_in_use'}
                        }
                    }))
                }
                else if (statusCode == 109) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'SignUp',
                        mode: "",
                        data: {
                            ...prevState.data,
                            formData: formData,
                            errorMessages: {...errorMessages, password: 'Password_format_error'}
                        }
                    }))
                }
                else if (statusCode == 110) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'SignUp',
                        mode: "",
                        data: {
                            ...prevState.data,
                            formData: formData,
                            errorMessages: {...errorMessages, password: 'Email_address_and_password_cannot_be_the_same'}
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
                    // setModalState((prevState) => ({
                    //     ...prevState,
                    //     BaseModalOpen: true,
                    //     modalType: 'SignUp',
                    //     mode: "",
                    //     data: {
                    //         ...prevState.data,
                    //         formData: formData,
                    //         errorMessages: {...errorMessages, duplicate: 'This_email_address_can_not_be_use'}
                    //     }
                    // }))
                }
                else if (statusCode == 602) {//domainBlockImplement
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'SignUp',
                        mode: "",
                        data: {
                            ...prevState.data,
                            formData: formData,
                            errorMessages: {...errorMessages, duplicate: 'This_email_address_can_not_be_use'}
                        }
                    }))
                }
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        mode: "",
                        data: {title: intl.formatMessage({ id: 'sign_up' }),body: intl.formatMessage({ id: 'new_registration_failed' })}
                    }))
                }
            }
            if (err.message === 'Network Error') {
                console.log('There was a network error.');
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    mode: "",
                    data: {title: intl.formatMessage({ id: 'sign_up' }),body: intl.formatMessage({ id: 'networkError' })}
                }))
            }
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            {modalStateValue.data.termsChecked ?
                <div
                    className="button-full flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => doSignUp()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto">
                        {intl.formatMessage({ id: 'sign_up' })}
                    </p>
                </div> :
                <div
                className="cursor-not-allowed button-disable button-white button-full flex flex-row justify-center items-center touch-none select-none"
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto mix-blend-soft-light">
                        {intl.formatMessage({ id: 'sign_up' })}
                    </p>
                </div>
            }

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