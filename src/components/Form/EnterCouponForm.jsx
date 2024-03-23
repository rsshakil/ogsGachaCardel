import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";

///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const EnterCouponForm = () => {
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
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Get errorMessages from modalState recoil
    const errorMessages = modalStateValue.data?.errorMessages;

    return (
        <div className="w-full grid grid-cols-1">
            <form className="gap-2" onSubmit={e => { e.preventDefault(); }}>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Coupon_code' })}
                    </label>
                    <input name="couponCode" id="couponCode" className="" />
                    <span className="text-xs text-error-message">
                        {errorMessages?.couponCode && intl.formatMessage({ id: errorMessages.couponCode })}
                    </span>
                </div>
            </form>
        </div>
    )
}