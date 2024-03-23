import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'

import {pointState} from "../../../../store/recoil/pointState";
import { productListState } from "../../../../store/recoil/productListState";
import { userState } from "../../../../store/recoil/userState";
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';
import useCsrfToken from '../../../../hooks/useCsrfToken'
import session from '../../../../store/recoil/sessionState'
import checkStartValue from '../../../../functions/checkStartValue';
import { headersParam } from '../../../../functions/commonFunctions';
import useSessionCheck from '../../../../hooks/useSessionCheck'
import useSMSFlagCheck from "../../../../hooks/useSMSFlagCheck";



export const ButtonWrapResidenceRegistration = ({openConfirmModal = ()=>{}}) => {
    const [{ loading, error, state }, setValid] = useRecoilState(session)

    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [productListArraySingle, setProductListSingle] = useRecoilState(productListState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    const intl = useIntl();
    const {verifySMSFlag} = useSMSFlagCheck();

    function closeModal(e) {
        
        // console.log("[ButtonWrapResidenceRegistration]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }

    async function doResidenceRegistration(e) {
        // console.log("[ButtonWrapResidenceRegistration]playMovie==>", e);
        //  API通信のためにくるくるを開始
        let prevModalInfo = modalStateValue;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "edit",
            // data: {}
        }))

        //getCountryId
        const countryId = document.getElementById('countryId').value;
        console.log("countryId",countryId);
        let response;
        // check-sessionに問題なし
        if (await getSessionCheck()) {
            const countryUrl = queries.baseURL + queries.userCountryUpdate;
            try{
                const config = {
                    method: queries.putMethod,
                    url: countryUrl,
                    data:{countryId:countryId}
                }
                response = await instance.request(config);
                
            }catch(err){
                console.log('invalid formData');
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    // mode: "",
                    data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" }),backToPrevModal:true,prevModalName:"CountryofResidenceRegistration"}
                }));
            }
            console.log('@@@@@@ response',response);
            if(response){
                const { status } = response || '';
                if (status == 200) {
                    console.log('@@@@@@ xxxx1');
                    setUserState((prevState)=>({
                        ...prevState,
                        countryOfResidence:parseInt(countryId),
                    }))
                    //back to prevModal implemented
                    console.log("modalDataInfo[prevModalInfo]doLogin e==>", prevModalInfo);
                    if(prevModalInfo.mode==="goToStripe"){
                        console.log("modalDataInfo[prevModalInfo]doLogin e==>set", prevModalInfo);
                        
                        const {data, status} =  await verifySMSFlag('payment') || {};

                        if(data && status == 200) {
                            const {smsAuthNo = '', myShippingAddress = []} = data || {};
            
                            setUserState((prevState) => ({
                                ...prevState,
                                smsAuthNo,
                                myShippingAddress: {...myShippingAddress}
                            }))
            
                            setModalState((prevState) => ({
                                ...prevState,
                                BaseModalOpen: true,
                                modalType:"PaymentApplicationIdentityVerification",
                            }))
                        }
                    }
                    else if(prevModalInfo.mode==="shippingConfirmation"){
                        //displayShippingConfirmModal
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'ShippingConfirm',
                            mode: "",
                            // data: {}
                        }))
                    }
                    else if(prevModalInfo.mode==="showSmsAuthModal"){
                        //displayShippingConfirmModal
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'SmsAuth',
                            mode: "read",
                            data: {
                                ...prevModalInfo?.data
                            }
                        }))
                    }
                    else if(prevModalInfo.mode==="pattern_1" || prevModalInfo.mode==="pattern_2" || prevModalInfo.mode==="pattern_3"){
                        //displayDrawpointConfirmModal
                        console.log("prevModalInfo.mode",prevModalInfo.mode);
                        openConfirmModal(prevModalInfo.mode);
                    }else if(prevModalInfo.mode==="callFromFunction"){
                        console.log("prevModalInfo.mode",prevModalInfo.mode);
                        console.log("prevModalInfo.callBackFunction",prevModalInfo.callBackFunction)
                        prevModalInfo.callBackFunction();
                    }else{
                        closeModal();
                    }
                    
                } else {
                    console.log('invalid formData');
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        // mode: "",
                        data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" }),backToPrevModal:true,prevModalName:"CountryofResidenceRegistration"}
                    }));
                }
            }
        }
        //  実際はタイムアウトではなくAPI通信を行う
        // setTimeout(function(){
        //     setModalState((prevState) => ({
        //         ...prevState,
        //         BaseModalOpen: true,
        //         modalType: 'CountryOfResidence',
        //         // mode: "edit",
        //         // data: {
        //         //     'pointStart':Math.floor(Math.random() * (99 - 1) + 1), 
        //         //     'pointEnd':Math.floor(Math.random() * (99999 - 1) + 1)
        //         // }
        //     }))
        //     },3000)
    }


    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => doResidenceRegistration({})}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    {intl.formatMessage({ id: 'confirm' })}
                </p>
            </div>
            <div 
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => closeModal()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text-close">
                    {intl.formatMessage({ id: 'cancel' })}
                </p>
            </div>
        </div>
)

}