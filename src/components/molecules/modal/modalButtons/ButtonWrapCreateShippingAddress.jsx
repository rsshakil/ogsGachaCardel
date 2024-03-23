import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import { userState } from "../../../../store/recoil/userState";

import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';

export const ButtonWrapCreateShippingAddress = ({handleOnSubmit}) => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const intl = useIntl()
    function back2ShowShippingAddress(e) {
        // console.log("[ButtonWrapCreateShippingAddress]closeModal e==>", e);

        const {redirectInfo} = modalStateValue || {};

        if(redirectInfo) {
            const {modalType, mode} = redirectInfo || {};
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: modalType,
                mode
            }))
        }
        else {
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'showShippingAddress',
                mode: "",
                data: {}
            }))
        }
    }
    async function doCreateShippingAddress(e) {
        // console.log("[ButtonWrapCreateShippingAddress]closeModal e==>", e);
        //  API通信のためにくるくるを開始
        const formElements = document.getElementById('createShippingAddress').elements;
        let formData ={};
        for(let i = 0 ; i < formElements.length ; i++){
            let item = formElements.item(i);
            console.log("item>>>",item);
            let val = item.name==="userShippingPriorityFlag"?item.checked===true?1:0:item.value;
            formData[item.name] = val;
        }
        console.log("formData", formData);
        //call api to create a new shipping address
        const { 
            userShippingName,
            userShippingZipcode,
            userShippingAddress,
            userShippingAddress2,
            userShippingAddress3,
            userShippingTel,
            userShippingPriorityFlag 
        } = formData;

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

        const errorMessages = {
            userShippingName:userShippingNameErrorMessage,
            userShippingZipcode:userShippingZipcodeErrorMessage,
            userShippingAddress:userShippingAddressErrorMessage,
            userShippingAddress2:userShippingAddress2ErrorMessage,
            userShippingAddress3:userShippingAddress3ErrorMessage,
            userShippingTel:userShippingTelErrorMessage,
        }

        console.log("errorMessages", errorMessages)
        let response;
        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData,
                errorMessages
            }
        }))

        // Validation checked if failed set error message & return
        // if (!userShippingName || !userShippingZipcode || !userShippingAddress || !userShippingTel ) return;
        if(Object.values(errorMessages).filter(value => value !== null && value !== undefined && value !== '').length > 0) return;
        // console.log("========================== Submit ==========================")

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            mode: "",
            data: {e}
        }))

        try {
            const config = {
                method: queries.postMethod,
                url: queries.baseURL + queries.createUserAddress,
                data:formData
            }

            response = await instance.request(config);

            console.log('response', response)
            if (response.status == 200) {
                const {redirectInfo} = modalStateValue || {};

                //This code will execute only for address create from myCollection
                if(redirectInfo) {
                    const {modalType, mode} = redirectInfo || {};

                    let myShippingRecords = {...response.data?.myShipping};

                    //Handle selected item
                    if([0, false, "0", "false"].includes(formData.userShippingPriorityFlag)){ //If not set new default address
                        //Check if there is any prev selected item
                        const checkResult = Object.values(UserStateObj.myShippingAddress).find(x => [1, true, "true", "1"].includes(x.isItemSelected));
                        if(checkResult){
                             myShippingRecords = Object.keys(myShippingRecords).reduce((acc, key) => {
                                const {userShippingId} = myShippingRecords[key] || {};

                                if(userShippingId == checkResult.userShippingId){
                                    acc[key] = {
                                        ...myShippingRecords[key],
                                        isItemSelected: 1
                                    }
                                }
                                else {
                                    acc[key] = {
                                        ...myShippingRecords[key],
                                        isItemSelected: 0
                                    }
                                }

                                return acc;
                              }, {});
                        }
                    }

                    setUserState((prevState)=>({
                        ...prevState,
                        myShippingAddress: myShippingRecords
                    }))

             
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: modalType,
                        mode
                    }))
                }
                else {
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




    return (
        <div className="w-full flex flex-col justify-center items-center">

            <div className="w-full flex flex-row mt-4 justify-between items-center">
                <div 
                    className="button-half-left flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => doCreateShippingAddress()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-white">{intl.formatMessage({ id: 'Create_new' })}</p>
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