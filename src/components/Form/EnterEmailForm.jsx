import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const EnterEmailForm = () => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const [formData, setFormData] = useState({ token: Math.floor(100000 + Math.random() * 900000), mailAddress:""});
    const [errorMessage, setErrorMessage] = useState({ mailAddress:null });

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
    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form className="gap-2" id="forgotPasswordForm" onSubmit={e => { e.preventDefault(); }}>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Registered_email_address' })}
                    </label>
                    <input name="mailAddress" onChange={handleInputChange} id="" className="" value={formData.mailAddress} />
                    <span className="text-xs text-error-message">
                        {errorMessage.mailAddress && intl.formatMessage({ id: errorMessage.mailAddress })}
                    </span>
                    <input name="token" type="hidden" id="token" className="" value={formData.token} />
                </div>
                <div className="w-full flex justify-center">
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: '確認コード' })}
                        <p className="w-fit  text-4xl font-bold py-4 px-4 font-Noto-Serif bg-sky-950 tracking-widest">{formData.token}</p>
                    </label>
                    
                </div>


                <div id="" className={`${inputWrapClass} self-start`}>
                    <p className="text-xs text-error-message">
                        {errorMessage.duplicate && intl.formatMessage({ id: errorMessage.duplicate })}
                    </p>
                </div>
                <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'Send_to_registered_email_address' })}
                    </p>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'メール本文のURLからアクセスし上記の確認コードを入力してパスワードの再設定を行なってください' })}
                    </p>
                </div>
            </form>
        </div>
    )
}