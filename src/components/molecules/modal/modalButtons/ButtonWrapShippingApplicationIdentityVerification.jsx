import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
// import {apiURL} from "../../../Form/LoginForm";
import {pointState} from "../../../../store/recoil/pointState";
import {userState} from "../../../../store/recoil/userState";
import * as queries from "../../../../restapi/queries";
import checkStartValue from '../../../../functions/checkStartValue';
import {instance} from "../../../../services/axios";
import useSessionCheck from "../../../../hooks/useSessionCheck";
import {userSmsAuth} from "../../../../restapi/queries";


export const ButtonWrapShippingApplicationIdentityVerification = ({openConfirmModal = ()=>{}}) => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [userStateValue, setUserState] = useRecoilState(userState);
    const { getSessionCheck } = useSessionCheck();

    function go2ShippingConfirm(e) {
        // console.log("[ButtonWrapAuthenticationExecution]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'ShippingConfirm',
            // mode: "edit",
            // data: {}
        }))
    }

    async function doShipping(e) {
        e.preventDefault();

        const formElements = document.getElementById('userSMSTokenVerifyForm').elements;

        let formData ={};
        for(let i = 0 ; i < formElements.length ; i++){
            let item = formElements.item(i);
            formData[item.name] = item.value;
        }
        console.log("formData", formData);

        const { userSMSToken} = formData;

        let userSMSTokenErrorMessage = null;
        if (!userSMSToken.trim()) {
            userSMSTokenErrorMessage = 'Please_enter_your_sms_token'; 
        }

        const errorMessages = {
            userSMSToken: userSMSTokenErrorMessage,
            userSMSValidToken: null
        }

        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData,
                errorMessages
            }
        }))

        console.log('my error ', modalStateValue)

        if(Object.values(errorMessages).filter(value => value !== null && value !== undefined && value !== '').length > 0) return;

        const {userShippingId, userCollectionId = []} = modalStateValue.data || {};

        try{
            if( userShippingId && Array.isArray(userCollectionId) && userCollectionId.length > 0) {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'Loading',
                }));

                if (await getSessionCheck()) {
                    const config = {
                        method: queries.postMethod,
                        url: queries.baseURL + queries.userCollectionExecute,
                        data:{
                            userShippingSMSToken: userSMSToken,
                            pattern: 2,
                            userCollectionId,
                            userShippingId
                        }
                    }
        
                  const {status} = await instance.request(config);
    
                    if (status == 200) {
                        //show successModal
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'shippingCompleted',
                        }))
                    } 
                    else {
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType:"ShippingApplicationIdentityVerification",
                            data: {
                                ...prevState.data,
                                formData,
                                errorMessages: {userSMSValidToken:  'Please_enter_your_valid_sms_token'}
                            }
                        }))
                    }
                }
            }
        }catch(err) {
            console.log('Error: ', err);

            if(err){
                // console.log("Api error",err);
                const { errorCode } = err.response?.data || '';
                console.log("errorCode",errorCode);

                let mType ="error";
                let mMode ="";
                let mData = {
                    title: "",
                    body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" }),
                    backToPrevModal:true,
                    prevModalName:"ShippingConfirm"
                };

                 if(errorCode===403){
                    mType = "ShippingApplicationIdentityVerification";
                    mData = {
                        formData,
                        errorMessages: {userSMSValidToken:  'Please_enter_your_valid_sms_token'} 
                    };
                }
                else if(errorCode===501){
                    mData = {
                        title: "",
                        body: intl.formatMessage({ id: 'unable_shipping_item_exists' }),
                        backToPrevModal:true,
                        prevModalName:"showCollection",
                        prevModalMode:"select"
                    }
                }else if(errorCode===502){//shipping item over at a time
                    mData = {
                        title: "",
                        body: intl.formatMessage({ id: 'max_card_limit_shipping_error' }),
                        backToPrevModal:true,
                        prevModalName:"showCollection",
                        prevModalMode:"select"
                    }
                }else if(errorCode===201){//User has not enough point
                    //displayChargeModal
                    mType='charge';//displayPoint docharge
                    mMode ="shippingConfirmation";
                    mData = {}
                }
                else if(errorCode===101){
                    mType = "Login"
                    mMode ="shippingConfirmation";
                    mData = {}
                }
                //show error modal when api error occured
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: mType,
                    data: {...prevState.data, ...mData}
                }))
                if(mMode){
                    setModalState((prevState) => ({
                        ...prevState,
                        mode:mMode,
                    })) 
                }
            }
        }
    }

    console.log("modalDataInfo[ButtonWrapAuthenticationExecution]doLogin e==>", modalStateValue);
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-row mt-4 justify-between items-center">
                <div 
                    className="button-half-left  flex flex-row justify-center items-center touch-none select-none"
                    onClick={doShipping}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-white">{intl.formatMessage({ id: 'Send_verification_code' })}</p>
                </div>
                <div 
                    className="button-half-right button-white flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => go2ShippingConfirm()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-slate">{intl.formatMessage({ id: 'Back' })}</p>
                </div>
            </div>
        </div>
    )
}