import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
import { userState } from "../../store/recoil/userState";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';
import { Headline } from "../atoms/text/Headline";

///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const ChangeEmailAddressForm = ({buttonElement}) => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [userStateObj, setUserState] = useRecoilState(userState);

    const [formData, setFormData] = useState({ emailAddress: '', password: '', confirmedPassword: '' });
    const [errorMessage, setErrorMessage] = useState({ emailAddress: null, password: null, confirmedPassword: null, duplicate: null });

    useEffect(() => {
        const { data } = modalStateValue;
        if (data) {
            const { formData:formData, errorMessages:errorMessage } = data;
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
        // console.log('handleOnSubmit from ChangeEmailAddressForm');

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
        console.log("========================== Submit ==========================")

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
                url: queries.baseURL + queries.createUser,
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
            console.log('finally');
        }
    }

    //  2024-1-22メールアドレスの自動変更方式は一旦退避
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Headline
            type="h3"
            spanText=''
            spanClass="font-bold text-left text-base font-Prompt text-white flex flex-col"
            headlineText={intl.formatMessage({ id: 'If_you_need_to_change_your_email_address__please_contact_support' })}
            headlineClass="font-bold text-left text-base  font-Prompt text-white flex flex-col"
            />
        </div>

        // <div id="loginWrap" className="w-full grid grid-cols-1">
        //     <form className="gap-2" id="changeEmailAddress" onSubmit={e => { e.preventDefault(); }}>
        //         <div id="" className={`${inputWrapClass} self-end`}>
        //             <label className="text-sm font-medium">
        //                 {intl.formatMessage({ id: 'Registered_email_address' })}
        //             </label>
        //             <input value={userStateObj?.userEmailAddress} name="emailAddress" id="" className="bg-gray-300" readOnly={true} disabled/>
        //             <span className="text-xs text-error-message">
        //                 {errorMessage.emailAddress && intl.formatMessage({ id: errorMessage.emailAddress })}
        //             </span>
        //         </div>
        //         <div id="" className={`${inputWrapClass} self-center`}>
        //             <label className="text-sm font-medium">
        //                 {intl.formatMessage({ id: 'New_email_address' })}
        //             </label>
        //             <input autoComplete="off" name="newEmailAddress" id="" className="" onChange={handleInputChange} value={formData.newEmailAddress} />
        //             <span className="text-xs text-error-message">
        //                 {errorMessage.newEmailAddress && intl.formatMessage({ id: errorMessage.newEmailAddress })}
        //             </span>
        //         </div>
        //         <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
        //             <p className="text-xs">
        //                 {intl.formatMessage({ id: 'Send_the_authentication_URL_your_new_email_address' })}
        //             </p>
        //         </div>
        //     </form>
        // </div>
    )

}