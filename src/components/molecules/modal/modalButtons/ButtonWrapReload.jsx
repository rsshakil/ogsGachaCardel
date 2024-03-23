import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate,useLocation } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'

export const ButtonWrapReload = () => {
    const intl = useIntl();
    const location = useLocation();
    const navigate = useNavigate();

    const [modalStateValue, setModalState] = useRecoilState(modalState);

    function closeModal2reload(e) {
        // 閉じるに見せかけてリロードしてそのほかのプロセスもcloseさせる
        //  あらゆる場所で使える

        //reload Implemented in all errorPage
        let pathNameValue = location && location?.pathname;
        console.log("pageUrlName",pathNameValue);
        //backModalDisplayIf BackButtonExists
        if(modalStateValue?.data && modalStateValue?.data?.hasOwnProperty('backToPrevModal')){
            let modalType = modalStateValue?.data.prevModalName;
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: modalType,
            }))
            if(modalStateValue?.data?.hasOwnProperty('prevModalMode')){
                setModalState((prevState) => ({
                    ...prevState,
                    mode: modalStateValue?.data.prevModalMode
                }))
            }
        }else if(!modalStateValue?.data?.hasOwnProperty('backToPrevModal') && pathNameValue.includes("/verify-forget-mail")){
            navigate("/");
        }else{
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: false,
                modalType: '',
                mode: "edit",
                data: {}
            }));
            //Implemnet page reload when getting error 
            window.location.reload();
        }
    }
    console.log("modalDataInfo[ButtonWrapLogin]closeModal e==>", modalStateValue);
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => closeModal2reload()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text-close">
                    {intl.formatMessage({ id: modalStateValue?.data && modalStateValue.data?.hasOwnProperty('backToPrevModal')?'Back':'close' })}
                </p>
            </div>
        </div>
    )
}