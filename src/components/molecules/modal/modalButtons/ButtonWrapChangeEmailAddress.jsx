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
    

export const ButtonWrapChangeEmailAddress = ({handleOnSubmit}) => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [{ loading, error, state }, setValid] = useRecoilState(session);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    const intl = useIntl()
    function closeModal(e) {
        
        console.log("[ButtonWrapChangeEmailAddress]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }

    async function doChangeEmailAddress(e) {
        // Get email address change form
        const formElements = document.getElementById('changeEmailAddress').elements;
        console.log("formElements", formElements)

        let formData ={};
        for(let i = 0 ; i < formElements.length ; i++){
            let item = formElements.item(i);
            formData[item.name] = item.value;
        }
        console.log("formData", formData);
        const { newEmailAddress } = formData;

        let errorMessages = {};
        let newEmailErrorMessage = null;
        // If a new email address has not been entered
        if (!newEmailAddress) {
            // Add error message
            newEmailErrorMessage = 'Please_enter_your_new_email_address';
            errorMessages['newEmailAddress'] = newEmailErrorMessage;
        }

        console.log("errorMessages", errorMessages)

        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData,
                errorMessages
            }
        }))

        // Validation checked if failed set error message & return
        if (Object.keys(errorMessages).length !== 0) return;

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            // data: {}
        }))

        let response;
        // check-sessionに問題なし
        if (await getSessionCheck()) {
            try{
                const config = {
                    method: queries.putMethod,
                    url: queries.baseURL + queries.userChangeMail,
                    data: formData
                }
                response = await instance.request(config);
            }catch(err){
                if(err){
                    // console.log("Api error",err);
                    const { errorCode } = err.response?.data || '';
                    console.log("errorCode",errorCode);
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
                console.log("countryAPI response",response);
                if (status == 200) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'ChangeEmailAddressCompleted',
                        // mode: "edit",
                        data: {}
                    }))
                }else{
                    //displayErrorModal
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: "error",
                        // mode: "",
                        data: {
                            title: "",
                            body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })
                        }
                    }))
                }
            }
        }
    }


    // function doSignUp(e) {
        
    //     console.log("[ButtonWrapChangeEmailAddress]closeModal e==>", e);
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
                onClick={(e) => doChangeEmailAddress()}
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
                    {intl.formatMessage({ id: 'close' })}
                </p>
            </div>
        </div>
)

}