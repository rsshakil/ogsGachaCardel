import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';
///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const EnterNewPasswordForm = ({buttonElement}) => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const [formData, setFormData] = useState({ emailAddress: '', password: '', confirmedPassword: '' });
    const [errorMessage, setErrorMessage] = useState({ emailAddress: null, password: null, confirmedPassword: null, duplicate: null });

    useEffect(() => {
        const { data } = modalStateValue;
        if (data) {
            const { formData, errorMessage } = data;
            if(formData) {
                setFormData(formData);
            }
            if (errorMessage) {
                setErrorMessage(errorMessage);
            }
        }
    }, [modalStateValue]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        // console.log('handleOnSubmit from EnterNewPasswordForm');

        // console.log(formData)
        const { emailAddress, password, confirmedPassword } = formData;

        let emailErrorMessage = null;
        if (!emailAddress) {
            emailErrorMessage = 'Please_enter_your_email_address';
        }

        let passwordErrorMessage = null;
        if (!password) {
            passwordErrorMessage = 'Please_enter_your_password';
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

        // console.log("errorMessages", errorMessages)

        setErrorMessage((prevState) => ({
            ...errorMessage,
            ...errorMessages
        }));

        if (!emailAddress || !password || !confirmedPassword || (password !== confirmedPassword)) return;
        // console.log("========================== Submit ==========================")

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            mode: "",
            data: {e}
        }))

        try {
            const config = {
                method: queries.postMethod,
                url: queries.baseURL + queries.readUser,
                data:formData
            }

            const response = await instance.request(config);
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
            console.log("err", err);
            let statusCode = 400;
            if (err.response) {
                const { data = {}, status = 400 } = err.response || '';
                const { errorCode = '' } = data || '';
                statusCode = errorCode ? errorCode : status;
                if (statusCode == 505) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'SignUp',
                        mode: "",
                        data: {formData: formData, errorMessage: {...errorMessages, duplicate: 'This_email_address_is_in_use'}}
                    }))
                }
                else if (statusCode == 109) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'SignUp',
                        mode: "",
                        data: {formData: formData, errorMessage: {...errorMessages, duplicate: 'This_email_address_is_in_use'}}
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
        } finally {
            // console.log('finally');
        }
    }

    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form className="gap-2" onSubmit={e => { e.preventDefault(); }}>
                {/* <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: '現在のパスワード' })}
                    </label>
                    <input name="emailAddress" id="" className="" onChange={handleInputChange} value={formData.emailAddress} />
                    <span className="text-xs text-error-message">
                        {errorMessage.emailAddress && intl.formatMessage({ id: errorMessage.emailAddress })}
                    </span>
                </div> */}
                <div id="" className={`${inputWrapClass} self-center`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'New_Password' })}
                    </label>
                    <input type='password' name="password" id="" className="" onChange={handleInputChange} value={formData.password} />
                    <span className="text-xs text-error-message">
                        {errorMessage.password && intl.formatMessage({ id: errorMessage.password })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'New_Password' })}（{intl.formatMessage({ id: 'For_checking' })}）
                    </label>
                    <input type='password' name="confirmedPassword" id="" className="" onChange={handleInputChange} value={formData.confirmedPassword} />
                    <span className="text-xs text-error-message">
                        {errorMessage.confirmedPassword && intl.formatMessage({ id: errorMessage.confirmedPassword })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <p className="text-xs text-error-message">
                        {errorMessage.duplicate && intl.formatMessage({ id: errorMessage.duplicate })}
                    </p>
                </div>
                <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                    {/* <p className="text-xs">
                        {intl.formatMessage({ id: 'I_will_register_as_a_member_after_agreeing_to_the_terms_of_use_and_privacy_policy_of_this_service' })}
                    </p> */}
                </div>
            </form>
            {/* {buttonElement((e) => handleOnSubmit(e))} */}
        </div>
    )

}