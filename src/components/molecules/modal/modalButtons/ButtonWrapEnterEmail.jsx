import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import * as queries from "../../../../restapi/queries";
import {instance} from "../../../../services/axios";
import {userForgetPassword} from "../../../../restapi/queries";


export const ButtonWrapEnterEmail = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const intl = useIntl()
    function closeModal(e) {
        
        // console.log("[ButtonWrapEnterEmail]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }

    async function doSendEmail(e) {
        const formElements = document.getElementById('forgotPasswordForm').elements;
        let formData = {};
        for(let i = 0 ; i < formElements.length ; i++){
            let item = formElements.item(i);
            formData[item.name] = item.value;
        }
        console.log("formData", formData);
       

        //applyValidation

        let mailErrorMessage = null;
        if (!formData.mailAddress) {
            mailErrorMessage = intl.formatMessage({ id: 'Please_enter_your_email_address' });
        }

        const errorMessage = {
            mailAddress: mailErrorMessage
        }

        setModalState((prevState) => ({
            ...prevState,
            data: {formData, errorMessage}
        }))

        if (!formData.mailAddress) return;

         //  API通信のためにくるくるを開始
         setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading'
        }));
        
        const config = {
            method: queries.postMethod,
            url: queries.baseURL + queries.userForgetPassword,
            data:formData
        }

        let response = await instance.request(config);

        console.log('response', response)
        if (response) {
            //  実際はタイムアウトではなくAPI通信を行う
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'EmailSentSuccess',
            }))
        }
    }


    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => doSendEmail()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    {intl.formatMessage({ id: 'send' })}
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