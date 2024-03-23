import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate,useLocation } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import {useIntl} from 'react-intl'
import useSessionCheck from '../../../../hooks/useSessionCheck'
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';

export const ButtonWrapSmsNotAuthenticated = () => {
    const intl = useIntl();
    const location = useLocation();
    const navigate = useNavigate();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const { getSessionCheck } = useSessionCheck();
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

    /////////////////////////////////////
    //  SMS認証
    async function openSmsAuth(e) {
        // setOpen(false)
        let modalType = 'SmsAuth';
        let openData = e;
        if (await getSessionCheck(openSmsAuth,e)) {
            callUserReadApi(openData,modalType,"");
        }
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: modalType,
        //     data : openData,
        // }))
    }
    //  SMS認証
    /////////////////////////////////////
    async function callUserReadApi(e,successModalType,modalMode=""){
        // setOpen(false)
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            // data: {}
        }))
        let response;
        
        try{
            const config = {
                method: queries.getMethod,
                url: queries.baseURL + queries.readUser + "?l=" + UserStateObj.language
            }
            response = await instance.request(config);
        }catch(err){
            if(err){
                // console.log("Api error",err);
                const { errorCode } = err.response?.data || '';
                let mType ="error";
                let mData = {
                    title: "",
                    body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })
                };
                if(errorCode===101){
                    mType = "Login"
                    mData = {}
                }
                //show error modal when api error occured
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: mType,
                    // mode: "",
                    data: mData
                }))
            }
        }
        console.log('@@@@@@ response',response);
        if(response){
            const { status } = response || '';
            if (status == 200) {
                setUserState((prevState)=>({
                    ...prevState,
                    waiting4Shipping:{...response.data?.myApplying},
                    myCollection:{...response.data?.myCollection},
                    myShippingAddress:{...response.data?.myShippingAddress},
                    shippingCompleted:{...response.data?.myShipping},
                    userEmailAddress: response.data?.user?.userEmail,
                    userId: response.data?.user?.userId
                }))
                if(successModalType=="SmsAuth" && response.data?.user?.userSMSFlag==1){
                    successModalType ="SMSAuthenticated";
                }
            }
            //displayshowShippingAddressModal
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: successModalType,
                mode: modalMode,
                data : openData
            }))
        }
    }


    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div 
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => openSmsAuth({})}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">{intl.formatMessage({ id: 'SMS_authentication' })}</p>
            </div>
            <div
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => closeModal2reload()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text-close">
                    {intl.formatMessage({ id: modalStateValue?.data && modalStateValue.data?.hasOwnProperty('backToPrevModal')?'Back':'close' })}
                </p>
            </div>
        </div>
    )
}