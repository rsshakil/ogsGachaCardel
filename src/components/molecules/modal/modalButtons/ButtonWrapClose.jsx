import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate,useLocation } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import * as queries from "../../../../restapi/queries";
import {instance} from "../../../../services/axios";
import {userState} from "../../../../store/recoil/userState";
import useAlert from "../../../../hooks/useAlert";
import { debugState } from "../../../../store/recoil/debugState";

// export const ButtonWrapClose = ({updateGachaUserPoint=()=>{}}) => {
export const ButtonWrapClose = () => {
    const intl = useIntl();
    const location = useLocation();
    const navigate = useNavigate();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [debugStateValue, setDebugState] = useRecoilState(debugState);

    const {showAlert1, showAlert2} = useAlert();


    const [modalStateValue, setModalState] = useRecoilState(modalState);

    async function closeModal(e) {
        console.log("modalStateValue",modalStateValue)
        if(modalStateValue.modalType=="SMSAuthenticated"){
            if (process.env.REACT_APP_ENVIRONMENT === 'cardel-develop') {
                showAlert2();
            }
        }
        
        
        // updateGachaUserPoint();
        console.log("[ButtonWrapClose]closeModal e==>", e);
        let pathNameValue = location && location?.pathname;
        console.log("pageUrlName",pathNameValue);
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
        }else{
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: false,
                modalType: '',
                mode: "edit",
                data: {}
            }))
        }

        if (modalStateValue.data?.redirectToModal) {
            if (modalStateValue.data.redirectToModal?.mode === 'purchase') {
                //loader
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'Loading',
                    // mode: "",
                    // data: {}
                }))

                try {
                    const config = {
                        method: queries.getMethod,
                        url: queries.baseURL + queries.readPoint,
                    }

                    const response = await instance.request(config);
                    console.log('response', response)
                    if (response.status == 200) {
                        const {records = {}} = response.data || {};

                        setUserState(prevState => ({...prevState, myChargeList: records}))

                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'charge',
                            mode: "purchase",
                            data: {}
                        }))
                    }
                } catch (err) {
                    console.log("err >>>", err);

                    let mData = {
                        title: "",
                        body: intl.formatMessage({id: "A_system_error_has_occurred__Please_try_again"}),
                    };

                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: "error",
                        data: mData
                    }))
                }
                return;
            }
        }

        //redirect to top page when click close button at the time of verification error
        if(!modalStateValue?.data?.hasOwnProperty('backToPrevModal') && (pathNameValue.includes("/verify-mail") || pathNameValue.includes("/verify-change-mail"))){
            navigate("/");
        }
        if(!modalStateValue?.data?.hasOwnProperty('backToPrevModal') && pathNameValue.includes("/verify-forget-mail")){
            navigate("/");
        }
    }
    console.log("modalDataInfo[ButtonWrapLogin]closeModal e==>", modalStateValue);
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => closeModal()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text-close">
                    {intl.formatMessage({ id: modalStateValue?.data && modalStateValue.data?.hasOwnProperty('backToPrevModal')?'Back':'close' })}
                </p>
            </div>
        </div>
    )
}