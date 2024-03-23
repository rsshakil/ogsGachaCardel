import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'


export const ButtonWrapSelectMovie = ({handleOnSubmit}) => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const intl = useIntl()
    function closeModal(e) {
        // console.log("[ButtonWrapChangePassword]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }

    function videoSelectionConfirmed(e) {
        // console.log("[ButtonWrapChangePassword]doLogin e==>", e);
        //  API通信のためにくるくるを開始
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'selectGimmick',
            mode: "select",
            // data: {}
        }))
        //  実際はタイムアウトではなくAPI通信を行う
        // setTimeout(function(){
        //     setModalState((prevState) => ({
        //         ...prevState,
        //         BaseModalOpen: true,
        //         modalType: 'ChangePasswordCompleted',
        //         // mode: "edit",
        //         data: {}
        //     }))
        // },3000)








    }


    // function doSignUp(e) {
        
    //     console.log("[ButtonWrapChangePassword]closeModal e==>", e);
    //     setModalState((prevState) => ({
    //         ...prevState,
    //         BaseModalOpen: true,
    //         modalType: 'SignUpThanks',
    //         mode: "",
    //         data: {}
    //     }))
    // }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => videoSelectionConfirmed()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    演出動画確定
                </p>
            </div>
            <div 
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => closeModal()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text-close">
                    {intl.formatMessage({ id: 'close' })}
                </p>
            </div>
        </div>
)

}