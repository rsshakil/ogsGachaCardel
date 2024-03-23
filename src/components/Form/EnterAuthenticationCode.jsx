import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";

///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const EnterAuthenticationCode = () => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const [formData, setFormData] = useState({ couponCode: '' });
    const [errorMessage, setErrorMessage] = useState({ couponCode: null });

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
        let { name, value } = e.target;
        value = value.replace(/\D/g, '');
        setFormData({ ...formData, [name]: value });
    };

    // Get errorMessages from modalState recoil
    const errorMessages = modalStateValue.data?.errorMessages;

    return (
        <div className="w-full grid grid-cols-1">
            <form className="gap-2" onSubmit={e => { e.preventDefault(); }}>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'authentication_code' })}
                    </label>
                    <input name="smsToken" maxLength={6} pattern="[0-9]*" type="tel" id="smsToken" value={formData.smsToken} onChange={handleInputChange}/>
                    <span className="text-xs text-error-message">
                        {errorMessages?.couponCode && intl.formatMessage({ id: errorMessages.couponCode })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'Please_enter_the_verification_code_received_via_SMS' })}
                    </p>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'The_verification_code_will_arrive_within_5_minutes' })}
                    </p>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'If_you_do_not_receive_the_verification_code_via_SMS__please_send_it_again' })}
                    </p>
                </div>
            </form>
        </div>
    )
}