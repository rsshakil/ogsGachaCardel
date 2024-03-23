import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'


export const ButtonWrapShippingCompleted = ({updateGachaUserPoint=()=>{}}) => {
// export const ButtonWrapClose = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    function closeModal(e) {
        updateGachaUserPoint();
        // console.log("[ButtonWrapClose]closeModal e==>", e);
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: false,
        //     modalType: '',
        //     mode: "edit",
        //     data: {}
        // }))
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