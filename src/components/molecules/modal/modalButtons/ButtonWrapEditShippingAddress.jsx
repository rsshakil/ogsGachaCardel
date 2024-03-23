import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import { userState } from "../../../../store/recoil/userState";

import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';
import useCsrfToken from '../../../../hooks/useCsrfToken'
import session from '../../../../store/recoil/sessionState'
import checkStartValue from '../../../../functions/checkStartValue';
import {pointState} from "../../../../store/recoil/pointState";
import { headersParam } from '../../../../functions/commonFunctions';
import useSessionCheck from '../../../../hooks/useSessionCheck'


export const ButtonWrapEditShippingAddress = ({handleOnSubmit}) => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [{ loading, error, state }, setValid] = useRecoilState(session);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    const intl = useIntl()
    function back2ShowShippingAddress(e) {
        // console.log("[ButtonWrapEditShippingAddress]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'showShippingAddress',
            mode: "",
            data: {}
        }))
    }
    async function doDeleteShippingAddress(e) {
        // console.log("[ButtonWrapEditShippingAddress]doDeleteShippingAddress e==>", e);
        const formElements = document.getElementById('editShippingAddress').elements;
        let formData ={};
        for(let i = 0 ; i < formElements.length ; i++){
            let item = formElements.item(i);
            console.log("item>>>",item);
            let val = item.name==="userShippingPriorityFlag"?item.checked===true?1:0:item.value;
            formData[item.name] = val;
        }
        console.log("formData", formData);
        //call api to delete this shipping address
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "edit",
            // data: {}
        }));
        
        // check-sessionに問題なし
        if (await getSessionCheck()) {
            //SessionCheckSuccess
            try {
                let response;
                const config = {
                    method: queries.deleteMethod,
                    url: queries.baseURL + queries.updateUserAddress+"/"+formData.userShippingId
                }
    
                response = await instance.request(config);
    
                console.log('response', response)
                if (response.status == 200) {
                    let userShippingList = UserStateObj.myShippingAddress;
                    let existingShipping = Object.keys(userShippingList)
                    .filter(key => userShippingList[key].userShippingId!=formData.userShippingId)
                    .reduce((obj, key) => {
                    obj[key] = userShippingList[key];
                    return obj;
                    }, {});
                    setUserState((prevState)=>({
                        ...prevState,
                        myShippingAddress:{...existingShipping}
                    }))
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'showShippingAddress',
                    }))
                }
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        mode: "",
                        data: {title: "",body: intl.formatMessage({ id: 'A_system_error_has_occurred__Please_try_again' })}
                    }))
                }
            } catch (err) {
                // console.log("err", err);
                let statusCode = 400;
                if (err.response) {
                    const { data = {}, status = 400 } = err.response || '';
                    const { errorCode = '' } = data || '';
                    statusCode = errorCode ? errorCode : status;
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        mode: "",
                        data: {title: "",body: intl.formatMessage({ id: 'A_system_error_has_occurred__Please_try_again' })}
                    }))
                }
            }

        }
        //  実際はタイムアウトではなくAPI通信を行う
        // setTimeout(function(){
        //     setModalState((prevState) => ({
        //         ...prevState,
        //         BaseModalOpen: true,
        //         modalType: 'showShippingAddress',
        //     }))
        // },3000)
    }

    async function doEditShippingAddress(e) {
        // console.log("[ButtonWrapEditShippingAddress]doEditShippingAddress e==>", e);
        const formElements = document.getElementById('editShippingAddress').elements;
        let formData ={};
        for(let i = 0 ; i < formElements.length ; i++){
            let item = formElements.item(i);
            console.log("item>>>",item);
            let val = item.name==="userShippingPriorityFlag"?item.checked===true?1:0:item.value;
            formData[item.name] = val;
        }
        console.log("formData", formData);
        //call api to create a new shipping address
        const { userShippingName,
            userShippingZipcode,
            userShippingAddress,
            userShippingAddress2,
            userShippingAddress3,
            userShippingTel,
            userShippingPriorityFlag } = formData;

        let userShippingNameErrorMessage = null;
        if (!userShippingName.trim()) {
            userShippingNameErrorMessage = 'Please_enter_your_shipping_name';
        }

        let userShippingZipcodeErrorMessage = null;
        if (!userShippingZipcode.trim()) {
            userShippingZipcodeErrorMessage = 'Please_enter_your_shipping_zipcode';
        }

        let userShippingAddressErrorMessage = null;
        if (!userShippingAddress.trim()) {
            userShippingAddressErrorMessage = 'Please_enter_your_shipping_address';
        }

        let userShippingAddress2ErrorMessage = null;
        if (!userShippingAddress2.trim()) {
            userShippingAddress2ErrorMessage = 'Please_enter_your_shipping_address2';
        }

        let userShippingAddress3ErrorMessage = null;
        if (!userShippingAddress3.trim()) {
            userShippingAddress3ErrorMessage = 'Please_enter_your_shipping_address3';
        }

        let userShippingTelErrorMessage = null;
        if (!userShippingTel.trim()) {
            userShippingTelErrorMessage = 'Please_enter_your_shipping_tel';
        }

        const errorMessage = {
            userShippingName:userShippingNameErrorMessage,
            userShippingZipcode:userShippingZipcodeErrorMessage,
            userShippingAddress:userShippingAddressErrorMessage,
            userShippingAddress2:userShippingAddress2ErrorMessage,
            userShippingAddress3:userShippingAddress3ErrorMessage,
            userShippingTel:userShippingTelErrorMessage,
        }

        console.log("errorMessages", errorMessage)
        let response;
        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData,
                errorMessage
            }
        }))

        // Validation checked if failed set error message & return
        // if (!userShippingName || !userShippingZipcode || !userShippingAddress || !userShippingTel ) return;
        console.log('my error values', Object.values(errorMessage))
        if(Object.values(errorMessage).filter(value => value !== null && value !== undefined && value !== '').length > 0) return;
        // console.log("========================== Submit ==========================")

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            // data: {e}
        }))
        // check-sessionに問題なし
        if (await getSessionCheck()) {
            //SessionCheckSuccess
            try {
                const config = {
                    method: queries.putMethod,
                    url: queries.baseURL + queries.updateUserAddress+"/"+formData.userShippingId,
                    data:formData
                }
    
                response = await instance.request(config);
    
                console.log('response', response)
                if (response.status == 200) {
                    setUserState((prevState)=>({
                        ...prevState,
                        myShippingAddress:{...response.data?.myShipping}
                    }))
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'showShippingAddress',
                    }))
                }
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        mode: "",
                        data: {title: "",body: intl.formatMessage({ id: 'new_registration_failed' })}
                    }))
                }
            } catch (err) {
                // console.log("err", err);
                let statusCode = 400;
                if (err.response) {
                    const { data = {}, status = 400 } = err.response || '';
                    const { errorCode = '' } = data || '';
                    statusCode = errorCode ? errorCode : status;
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        mode: "",
                        data: {title: "",body: intl.formatMessage({ id: 'new_registration_failed' })}
                    }))
                }
            }

        }
    }
    
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div 
                className="button-full button-green flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => doEditShippingAddress()}
                >
                <p className="pointer-events-none text-base font-bold font-Roboto">{intl.formatMessage({ id: 'edit' })}</p>
            </div>
            <div className="w-full flex flex-row mt-4 justify-between items-center">
                <div 
                    className="button-half-left flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => doDeleteShippingAddress()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-white">{intl.formatMessage({ id: 'delete' })}</p>
                </div>
                <div 
                    className="button-half-right button-white flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => back2ShowShippingAddress()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-slate">{intl.formatMessage({ id: 'Back' })}</p>
                </div>
            </div>
        </div>
)

}