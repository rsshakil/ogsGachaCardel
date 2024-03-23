import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import useSessionCheck from "../../../../hooks/useSessionCheck";
import * as queries from "../../../../restapi/queries";
import {instance} from "../../../../services/axios";
import _ from "lodash";

let testTimer;
export const ButtonWrapDoPayPay = () => {
    const buttonRef = useRef(null);
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [redirect, setRedirect] = useState('');

    const { getSessionCheck } = useSessionCheck();

    const {key, paymentHistoryId } = modalStateValue.data || {};

    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         setModalState((prevState) => ({
    //             ...prevState,
    //             BaseModalOpen: false,
    //             modalType:''
    //         }))
    //     };
    
    //     // Add the event listener when the component mounts
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    
        
    
    //     // Redirect to the external URL
    //     const externalUrl = 'https://example.com';
    //     window.location.href = externalUrl;

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //       };
    //   }, []);

    function MetodOfPaymentConfirm(e) {
        console.log("[ButtonWrapDoPayPay]closeModal e==>", e);
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

    const disableSubmitButton = ()=> {
        buttonRef.current.disabled = true;
        buttonRef.current.style.cursor = 'default';
    }

    async function doCheckout(e) {
        e.preventDefault();
        console.log("[ButtonWrapDoPayPay]doCheckout e==>", e);
        disableSubmitButton();

        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
        }));

        try{
            const formData  = {
                paymentHistoryId, 
                cpp: key,
                redirectUrl: window.location.href
            };

            const config = {
                method: queries.postMethod,
                url: queries.baseURL + queries.createPaymentPayPay,
                data: formData
            }
    
            const {status, data: responseData} = await instance.request(config);

            if (status == 200) {
                const {data, resultInfo} = responseData || {};

                console.log('data >>', data)
                console.log('resultInfo >>', resultInfo)

                if(resultInfo.code == 'SUCCESS') {
                    const {url, modifiedUrl} = data || {};

                    window.location.href = modifiedUrl;

                    setTimeout(()=> {
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: false,
                            modalType:''
                        }))
                        console.log('loader stopped >>>>>')
                    }, [1000])
                }
                //Handle any error to create QR code here....
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        data: {title: '', body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
                    }));
                }
            } 
        }catch(err) {
            console.log('Error: ', err);
            const { errorCode } = err.response?.data || '';
            console.log("errorCode",errorCode);

            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'error',
                data: {title: '', body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
            }));
        }
    }


    return (
        <div className="w-full flex flex-col justify-center items-center">
            <>
                <button ref={buttonRef}
                    className="button-full flex flex-row justify-center items-center touch-none select-none"
                    onClick={doCheckout}
                    type="submit"
                    form="paypayPurchaseForm"
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