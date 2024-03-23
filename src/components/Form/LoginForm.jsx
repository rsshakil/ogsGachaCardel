import React, { } from "react";
import {useIntl} from 'react-intl'
import {useRecoilState} from "recoil";
import {modalState} from "../../store/recoil/modalState";


///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';
///////////////////

export const apiURL =
    process.env.REACT_APP_ENV !== "production"
        ? process.env.REACT_APP_AUTH_URL_LOCALHOST
        : process.env.REACT_APP_AUTH_URL_PRODUCTION;

export const LoginForm = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    //  パスワード忘れた
    const handleForgotPassword = (e) => {
        setModalState((prevState) => ({
            ...prevState,
            modalType: 'ForgotPassword',
        }))
    };

    // Get errorMessages from modalState recoil
    const errorMessages = modalStateValue.data?.errorMessages;

    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form className="gap-2">
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'email_address' })}
                    </label>
                    <input name="email" id="loginEmail" className="" />
                    <span className="text-xs text-error-message">
                        {errorMessages?.email && intl.formatMessage({ id: errorMessages.email })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium">{intl.formatMessage({ id: 'Password' })}</label>
                    <input type="password" name="password" id="loginPassword" className="" placeholder={intl.formatMessage({ id: '_6_to_32_characters' })}/>
                    <span className="text-xs text-error-message">
                        {errorMessages?.password && intl.formatMessage({ id: errorMessages.password })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <p className="text-xs text-error-message">
                        {errorMessages?.forgot_password && intl.formatMessage({ id: 'authentication_failed_Please_try_again' })}
                    </p>
                </div>
                <div 
                    id="" 
                    className={`${inputWrapClass} self-end justify-self-end`}
                    onClick={(e) => handleForgotPassword()}
                >
                    <p className="text-xs underline cursor-pointer">
                        {intl.formatMessage({ id: 'Forgot_password' })}
                    </p>
                </div>
            </form>
        </div>
    )
}