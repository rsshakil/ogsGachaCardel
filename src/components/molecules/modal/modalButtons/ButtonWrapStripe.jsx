import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'

let testTimer;
export const ButtonWrapStripe = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    function MetodOfPaymentConfirm(e) {
        console.log("[ButtonWrapStripe]closeModal e==>", e);
        clearTimeout(testTimer)
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'MethodOfPayment',
            mode: "",
            data: {
                ...prevState.data,
                showForm : false,
                PaymentElementReady : false,
            }
        }))
    }
    function doCheckout(e) {
        console.log("[ButtonWrapStripe]doCheckout e==>", e);
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     data: {
        //         ...prevState.data,
        //         doCheckout : true,
 
        //     }
        // }))
    }



    return (
        <div className="w-full flex flex-col justify-center items-center">
            {
            modalStateValue.data?.showForm
            ?   
            <>
                <button
                    className="button-full flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => doCheckout()}
                    form="CheckoutForm"
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto">
                        {intl.formatMessage({ id: 'Purchase__pt' },{ChargePoint:modalStateValue.data.userChargePoint.toLocaleString()})}
                    </p>
                </button>
                <div 
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => MetodOfPaymentConfirm()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-slate">
                    {intl.formatMessage({ id: 'Return_to_Payment_method' })}
                    </p>
                </div>
            </>

            :
            <></>
            }
        </div>
    )
}