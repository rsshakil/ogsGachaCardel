import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { pointState } from "../../../../store/recoil/pointState";
import {useIntl} from 'react-intl'


export const ButtonWrapExchangeCompleted = ({updateGachaUserPoint=()=>{}}) => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    
    function closeModal(e) {
        // console.log("[ButtonWrapExchangeCompleted]closeModal e==>", e);
        //  初期化
        //call api to update userPoint this function has been defined on ModalButton 
        updateGachaUserPoint();
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: false,
        //     modalType: '',
        //     mode: "",
        //     data: {}
        // }))
        // setPointState((prevState) => ({
        //     ...prevState,
        //     start: modalStateValue.data?.pointStart,
        //     end: modalStateValue.data?.pointEnd,
        // }))

    }



    return (
    <>
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
    </>
)

}