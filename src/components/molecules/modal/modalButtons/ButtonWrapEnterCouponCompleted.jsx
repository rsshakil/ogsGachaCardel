import React, { useRef, useState, useEffect, Suspense } from "react";
import {useIntl} from 'react-intl'


export const ButtonWrapEnterCouponCompleted = ({updateGachaUserPoint=()=>{}}) => {
    const intl = useIntl()

    function closeModal(e) {
        updateGachaUserPoint();
        console.log("[ButtonWrapPaymentClose]closeModal e==>", e);
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => closeModal()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text-close">
                    {intl.formatMessage({ id: 'close' })}
                </p>
            </div>
        </div>
    )
}