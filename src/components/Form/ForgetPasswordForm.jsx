import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';
import { useSearchParams, useParams, NavLink } from "react-router-dom";

///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const ForgetPasswordForm = ({buttonElement}) => {
    const intl = useIntl();
    const urlParams = useParams();
    const [searchParams] = useSearchParams();
    console.log("searchParams",searchParams)
    console.log("searchParams urlParams",urlParams)
    const registToken = searchParams.get("token");
  
    console.log("registToken",registToken);
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const [formData, setFormData] = useState({ registToken:registToken, token: '', newPassword1: '', newPassword2: '' });
    const [errorMessage, setErrorMessage] = useState({ token: null, newPassword1: null, newPassword2: null });

    useEffect(() => {
        console.log("fire useEffect show error");
        const { data } = modalStateValue;
        if (data) {
            console.log("fire useEffect show error",data);
            const { formData:formDataValue, errorMessages:errorMessageValue } = data;
            console.log("fire useEffect show error",formDataValue);
            console.log("fire useEffect show error",errorMessageValue);
            if(formDataValue) {
                setFormData(formDataValue);
            }
            if (errorMessageValue) {
                setErrorMessage(errorMessageValue);
            }
        }
    }, [modalStateValue.data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
console.log("formData",formData);
    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form className="gap-2" id="passwordUpdateFrom" autoComplete="off" onSubmit={e => { e.preventDefault(); }}>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: '確認コード' })}
                    </label>
                    <input name="token" autoComplete="new-password" id="" className="" onChange={handleInputChange} value={formData.token} />
                    <input name="registToken" type="hidden" id="" className=""  value={formData.registToken} />
                    <span className="text-xs text-error-message">
                        {errorMessage.token && intl.formatMessage({ id: errorMessage.token })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-center`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'New_Password' })}
                    </label>
                    <input type='password' name="newPassword1" autoComplete="new-password" className="" onChange={handleInputChange} value={formData.newPassword1} placeholder={intl.formatMessage({ id: '_6_to_32_characters' })}/>
                    <span className="text-xs text-error-message">
                        {errorMessage.newPassword1 && intl.formatMessage({ id: errorMessage.newPassword1 })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'New_Password' })}（{intl.formatMessage({ id: 'For_checking' })}）
                    </label>
                    <input type='password' name="newPassword2" autoComplete="new-password" className="" onChange={handleInputChange} value={formData.newPassword2} placeholder={intl.formatMessage({ id: '_6_to_32_characters' })}/>
                    <span className="text-xs text-error-message">
                        {errorMessage.newPassword2 && intl.formatMessage({ id: errorMessage.newPassword2 })}
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