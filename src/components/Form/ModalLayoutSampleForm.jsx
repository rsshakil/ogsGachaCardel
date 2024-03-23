import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';
///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const ModalLayoutSampleForm = ({buttonElement}) => {
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

    const handleOnSubmit = async (e) => {
        // console.log('handleOnSubmit from ModalLayoutSampleForm',formData);

        // console.log(formData)
        const { couponCode } = formData;

        let couponErrorMessage = null;
        if (!couponCode) {
            couponErrorMessage = intl.formatMessage({ id: 'please_enter_your_coupon' });
        }

        const errorMessages = {
            couponCode: couponErrorMessage
        }

        // console.log("errorMessages", errorMessages)

        setErrorMessage((prevState) => ({
            ...errorMessage,
            ...errorMessages
        }));

        if (!couponCode) return;
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
                url: queries.baseURL + queries.executeCoupon,
                data:formData
            }

            const response = await instance.request(config);
            // console.log('response', response)
            if (response.status == 200) {
                    setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'EnterCouponCompleted',
                // mode: "edit",
                data: {}
            }))
            }
            else {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    mode: "",
                    data: {
                        title: "",//intl.formatMessage({ id: 'sign_up' }),
                        body: intl.formatMessage({ id: 'Coupon_code_is_invalid' })
                    }
                }))
            }
        } catch (err) {
            console.log("err", err);
            setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        mode: "",
                        data: {
                            title: "",//intl.formatMessage({ id: 'sign_up' }),
                            body: intl.formatMessage({ id: 'Coupon_code_is_invalid' })
                        }
                    }))
        } finally {
            // console.log('finally');
        }
    }

    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form className="gap-2 " onSubmit={e => { e.preventDefault(); }}>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        Sample input 1
                    </label>
                    <input name="couponCode" id="" className="" onChange={handleInputChange} value={formData.couponCode} />
                    <span className="text-xs text-error-message">
                        {errorMessage.couponCode && intl.formatMessage({ id: errorMessage.couponCode })}
                    </span>
                    <label className="text-sm font-medium">
                        Sample input 2
                    </label>
                    <input name="couponCode" id="" className="" onChange={handleInputChange} value={formData.couponCode} />
                    <span className="text-xs text-error-message">
                        {errorMessage.couponCode && intl.formatMessage({ id: errorMessage.couponCode })}
                    </span>

                </div>


                <div id="" className={`${inputWrapClass} self-start`}>
                    <p className="text-xs text-error-message">
                        {errorMessage.duplicate && intl.formatMessage({ id: errorMessage.duplicate })}
                    </p>
                </div>
                <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                    <p className="text-xs">
                    The header is on top. The footer is attached at the bottom.
                    </p>
                    <p className="text-xs">
                    Content fits all heights in the center
                    </p>
                    <p className="text-xs">
                    ❗️❗️Footer should not rise up❗️❗️
                    </p>
                </div>
            </form>
        </div>
    )

}