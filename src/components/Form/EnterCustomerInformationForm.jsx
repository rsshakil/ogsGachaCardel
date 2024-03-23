import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const EnterCustomerInformationForm = () => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const [formData, setFormData] = useState({
        userPaymentHistoryPayerName: "",
        userPaymentHistoryPayerTelNo: "",
        userPaymentHistoryPayerMail: "",
    });
    const [errorMessage, setErrorMessage] = useState({
        userPaymentHistoryPayerNameErrorMessage: null,
        userPaymentHistoryPayerNameMaxLenErrorMessage: null,
        userPaymentHistoryPayerTelNoErrorMessage: null,
        userPaymentHistoryPayerTelNoMaxLenErrorMessage: null,
        userPaymentHistoryPayerMailErrorMessage: null,
        userPaymentHistoryPayerMailMaxLenErrorMessage: null,
    });
    

    useEffect(() => {
        setModalState(prevState => ({...prevState, data: {...prevState.data, formData}}))
    }, []);

    useEffect(() => {
        const { data } = modalStateValue;
        if (data) {
            const { formData, errorMessages } = data;
            if(formData) {
                setFormData(formData);
            }
            if (errorMessages) {
                setErrorMessage(errorMessages);
            }
        }
    }, [modalStateValue]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
	////////////////////////////////////////////
	//	別コンポーネントからSubmitされる
	const handleSubmit = async (e) => {

    }
	//	別コンポーネントからSubmitされる
	////////////////////////////////////////////

    function getReferrer(){
        // Referrerの name属性
        // document.myForm.elements['entry.**********'].value = document.referrer;
     }


    //  https://imuza.com/googleforms/
    //  https://forms.gle/n47frwm3vRC77ZACA
    //  <form action="https://docs.google.com/forms/d/e/**********" method="POST" name="myForm" target="dummyIframe" onsubmit="getReferrer();">
    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form 
                className="gap-2" 
                id="MetodOfPaymentConfirm" 
                onSubmit={handleSubmit}
                method="POST"
                name="myForm" 
                target="dummyIframe"
                onsubmit={getReferrer()}
            >
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Payer_name' })}
                    </label>
                    <input 
                        name="userPaymentHistoryPayerName" 
                        onChange={handleInputChange} 
                        id="" 
                        className="" 
                        value={formData.userPaymentHistoryPayerName}
                        placeholder={intl.formatMessage({ id: 'userName_kana' })}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessage.userPaymentHistoryPayerNameErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryPayerNameErrorMessage })}
                        {errorMessage.userPaymentHistoryPayerNameInvalidCharErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryPayerNameInvalidCharErrorMessage })}
                        {errorMessage.userPaymentHistoryPayerNameMaxLenErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryPayerNameMaxLenErrorMessage })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Customer_phone_number' })}
                    </label>
                    <input 
                        name="userPaymentHistoryPayerTelNo" 
                        onChange={handleInputChange} 
                        id="" 
                        className="" 
                        value={formData.userPaymentHistoryPayerTelNo}
                        placeholder={intl.formatMessage({ id: '09011112222' })}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessage.userPaymentHistoryPayerTelNoErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryPayerTelNoErrorMessage })}
                        {errorMessage.userPaymentHistoryPayerTelNoMaxLenErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryPayerTelNoMaxLenErrorMessage })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Customer_email_address' })}
                    </label>
                    <input 
                        name="userPaymentHistoryPayerMail" 
                        onChange={handleInputChange} 
                        id="" className="" 
                        value={formData.userPaymentHistoryPayerMail}
                        placeholder={intl.formatMessage({ id: 'name@cardel.online' })}
                     />
                    <span className="text-xs text-error-message">
                        {errorMessage.userPaymentHistoryPayerMailErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryPayerMailErrorMessage })}
                        {errorMessage.userPaymentHistoryPayerMailMaxLenErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryPayerMailMaxLenErrorMessage })}
                    </span>
                </div>


                <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'After_completing_your_application__we_will_send_you_an_email_with_payment_instructions' })}
                    </p>
                    <div className="w-full grid grid-cols-[3fr_1fr_2fr_3fr_2fr] text-base text-center mt-8">
                        <p className="col-span-6 text-center">銀行振込　ボーナスpt還元中❗️</p>
                        <p className="text-xs text-right">10,000pt購入</p><p className="text-xs">👉</p><p className="text-xs">5%還元</p><p className="text-xs">👉</p><p className="text-xs text-right">10,500pt獲得</p><p></p>
                        <p className="text-xs text-right">50,000pt購入</p><p className="text-xs">👉</p><p className="text-xs">7%還元</p><p className="text-xs">👉</p><p className="text-xs text-right">53,500pt獲得</p><p></p>
                        <p className="text-xs text-right">100,000pt購入</p><p className="text-xs">👉</p><p className="text-xs">10%還元</p><p className="text-xs">👉</p><p className="text-xs text-right">110,000pt獲得</p><p></p>
                        <p className="text-xs text-right">200,000pt購入</p><p className="text-xs">👉</p><p className="text-xs">11%還元</p><p className="text-xs">👉</p><p className="text-xs text-right">222,000pt獲得</p><p></p>
                        <p className="text-xs text-right">500,000pt購入</p><p className="text-xs">👉</p><p className="text-xs">12%還元</p><p className="text-xs">👉</p><p className="text-xs text-right">560,000pt獲得</p><p></p>
                    </div>
                </div>
                
                <input name="userPaymentHistoryPaymentPoint" type="hidden" id="userPaymentHistoryPaymentPoint" className="" value={modalStateValue?.data?.userChargePoint} />
                <input name="cpp" type="hidden" id="cpp" className="" value={modalStateValue?.data?.key} />
            </form>
        </div>
    )
}