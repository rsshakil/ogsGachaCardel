import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import useSessionCheck from "../../../../hooks/useSessionCheck";
import * as queries from "../../../../restapi/queries";
import {instance} from "../../../../services/axios";

let testTimer;
export const ButtonWrapEnterEpsilonPurchaseForm = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const { getSessionCheck } = useSessionCheck();

    function MetodOfPaymentConfirm(e) {
        console.log("[ButtonWrapEnterEpsilonPurchaseForm]closeModal e==>", e);
        clearTimeout(testTimer)
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'MethodOfPayment',
            mode: "",
            data: {
                ...prevState.data,
                showForm : false,
                PaymentElementReady : false,
            }
        }))
    }

    async function doCheckout(e) {
        console.log("[ButtonWrapEnterEpsilonPurchaseForm]doCheckout e==>", e);

        const formElements = document.getElementById('MetodOfPaymentConfirm').elements;

        let formData ={};
        for(let i = 0 ; i < formElements.length ; i++){
            let item = formElements.item(i);
            formData[item.name] = item.value;
        }
        console.log("formData", formData);


        const { userPaymentHistoryPayerName, userPaymentHistoryPayerTelNo, userPaymentHistoryPayerMail} = formData || {};
        

        let userPaymentHistoryPayerNameErrorMessage = null;
        let userPaymentHistoryPayerNameMaxLenErrorMessage = null;
        if (!userPaymentHistoryPayerName.trim()) userPaymentHistoryPayerNameErrorMessage = 'Please_enter_your_payer_name'; 
        else if(userPaymentHistoryPayerName.length > 32) userPaymentHistoryPayerNameMaxLenErrorMessage = 'Payer_name_max_length_error'; 
        

        let userPaymentHistoryPayerTelNoErrorMessage = null;
        let userPaymentHistoryPayerTelNoMaxLenErrorMessage = null;
        if (!userPaymentHistoryPayerTelNo.trim()) userPaymentHistoryPayerTelNoErrorMessage = 'Please_enter_your_payer_tel_no'; 
        else if(userPaymentHistoryPayerTelNo.length > 32) userPaymentHistoryPayerTelNoMaxLenErrorMessage = 'Payer_tel_no_max_length_error'; 

        let userPaymentHistoryPayerMailErrorMessage = null;
        let userPaymentHistoryPayerMailMaxLenErrorMessage = null;
        if (!userPaymentHistoryPayerMail.trim()) userPaymentHistoryPayerMailErrorMessage = 'Please_enter_your_payer_mail'; 
        else if(userPaymentHistoryPayerMail.length > 128) userPaymentHistoryPayerMailMaxLenErrorMessage = 'Payer_mail_max_length_error'; 

        const errorMessages = {
            userPaymentHistoryPayerNameErrorMessage,
            userPaymentHistoryPayerNameMaxLenErrorMessage,
            userPaymentHistoryPayerTelNoErrorMessage,
            userPaymentHistoryPayerTelNoMaxLenErrorMessage,
            userPaymentHistoryPayerMailErrorMessage,
            userPaymentHistoryPayerMailMaxLenErrorMessage,
        }

        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData,
                errorMessages
            }
        }))

        if(Object.values(errorMessages).filter(value => value !== null && value !== undefined && value !== '').length > 0) return;
       
        try{
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'Loading',
            }));

            if (await getSessionCheck()) {
                const config = {
                    method: queries.postMethod,
                    url: queries.baseURL + queries.userBankPayment,
                    data: formData
                }
    
              const {status} = await instance.request(config);

                if (status == 200) {
                    //show successModal
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'bankTransferApplicationCompleted',
                    }))
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
                    prevModalName:"enterCustomerInformation"
                };

                //show error modal when api error occured
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: mType,
                    data: {...prevState.data, ...mData}
                }))
            }
        }
    }


    return (
        <div className="w-full flex flex-col justify-center items-center">
            <>
                <button id="epsilon-form-submit-button"
                    className="button-full flex flex-row justify-center items-center touch-none select-none"
                    // onClick={(e) => doCheckout()}
                    // type="submit"
                    form="epsilonPurchaseForm"
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto">
                        {intl.formatMessage({ id: 'Purchase__pt' },{ChargePoint:modalStateValue.data.userChargePoint.toLocaleString()})}
                    </p>
                </button>
                <div 
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => MetodOfPaymentConfirm()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-slate">
                    {intl.formatMessage({ id: 'Return_to_Payment_method' })}
                    </p>
                </div>
            </>


        </div>
    )
}