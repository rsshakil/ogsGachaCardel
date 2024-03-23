import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
import {accessState} from "../../store/recoil/accessState";
import {browserTrackingState} from "../../store/recoil/browserTrackingState";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';
import {useInterval,useBoolean,useUpdateEffect,useMount} from 'react-use';
///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const SignUpForm = () => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [accessStateObj, setAccessState] = useRecoilState(accessState);
    const [browserTrackingObj, setBrowserTrackingState] = useRecoilState(browserTrackingState);
    const [formData, setFormData] = useState({ emailAddress: '', password: '', confirmedPassword: '' , invitationCode: accessStateObj.getInvitation });
    const [errorMessage, setErrorMessage] = useState({ emailAddress: null, password: null, confirmedPassword: null, duplicate: null });
    //  １ヶ月より内のアカウント作成回数
    const [accountCreateCount, setAccountCreateCount] = useState(0);

    ///////////////////////////////////////////////////////
    //  マウントされた時にアカウント量産ねずみ取り機の発動
    useMount(() => {
        console.log("[SignUpForm]アカウント量産ねずみ取り機の発動==>");
        MultipleAccountCreationCheck()
    });
    //  マウントされた時にアカウント量産ねずみ取り機の発動
    ///////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////
    //  多重作成のチェック
    function MultipleAccountCreationCheck(e) {
        // let nowDate = Date.now();
        let monthAgoDate = new Date().setDate(new Date().getDate() - 30);
        let AccountCreate = browserTrackingObj.accountCreate;
        //  １ヶ月より内のアカウント作成回数を0にリセット
        setAccountCreateCount(0)
        // console.log("[SignUpForm]AccountCreate==>", AccountCreate);
        // console.log("[SignUpForm]browserTrackingObj.accountCreate==>", browserTrackingObj.accountCreate);
        // console.log("[SignUpForm]nowDate,monthAgoDate==>", intl.formatDate(nowDate),intl.formatDate(monthAgoDate));
        Object.keys(AccountCreate).map(key => {
            // console.log("[SignUpForm]AccountCreates==>", key, new Date(key), intl.formatDate(new Date(browserTrackingObj.accountCreate[key].timeStamp)));
            if(browserTrackingObj.accountCreate[key].timeStamp > monthAgoDate){
                console.log("[SignUpForm]１ヶ月より内==>", intl.formatDate(new Date(browserTrackingObj.accountCreate[key].timeStamp)));
                setAccountCreateCount((prevCount) => prevCount + 1);
            }else if (browserTrackingObj.accountCreate[key].timeStamp <= monthAgoDate){
                console.log("[SignUpForm]１ヶ月以上前==>", intl.formatDate(new Date(browserTrackingObj.accountCreate[key].timeStamp)));
            }else{
                console.log("[SignUpForm]例外　型違い==>", intl.formatDate(new Date(browserTrackingObj.accountCreate[key].timeStamp)));
            }
        })
    }
    //  多重作成のチェック
    ///////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////
    //  規定値以上であればネズミ取り作戦
    useEffect(() => {
        console.log("[SignUpForm]レッドカードの枚数==>", accountCreateCount);
        if(accountCreateCount >= 3){
            console.log("[SignUpForm]ネズミ取り開始==>", accountCreateCount);
            let modalType = 'MultipleAccountCreationError';
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: modalType,
            }))
        }
    }, [accountCreateCount])
    //  規定値以上であればネズミ取り作戦
    ///////////////////////////////////////////////////////

    const handleTermsCheckedChange = (e) => {
        // console.log("[SignUpForm]handleTermsCheckedChange e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            data: {
                // ...prevState.data,
                formData:{...formData},
                errorMessages:{...errorMessages},
                termsChecked : !prevState.data.termsChecked
            }
        }))
    };

    useEffect(() => {
        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                termsChecked : false
            }
        }))
    }, []);

    useEffect(() => {

        const { data } = modalStateValue;
        if (data) {
            const { formData, errorMessage } = data;
            if(formData) {
                setFormData(formData);
            }
            if (errorMessage) {
                setErrorMessage(errorMessage);
            }
        }
    }, [modalStateValue]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if(name==="invitationCode"){
            value = value.replace(/\D/g, '')
        }
        setFormData({ ...formData, [name]: value });
    };
    console.log("modalStateValue signup",modalStateValue)

    // Get errorMessages from modalState recoil
    const errorMessages = modalStateValue.data?.errorMessages;
    console.log("errorMessages ", errorMessages)

    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form className="gap-2" id="signUpForm" onSubmit={e => { e.preventDefault(); }}>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'email_address' })}
                    </label>
                    <input name="emailAddress" id="" className="" onChange={handleInputChange} value={formData.emailAddress} />
                    <span className="text-xs text-error-message">
                        {errorMessages?.emailAddress && intl.formatMessage({ id: errorMessages.emailAddress })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-center`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Password' })}
                    </label>
                    <input 
                        placeholder={intl.formatMessage({ id: '_6_to_32_characters' })}
                        name="password" 
                        type="password" 
                        id="" 
                        className="" 
                        onChange={handleInputChange} value={formData.password} />
                    <span className="text-xs text-error-message">
                        {errorMessages?.password && intl.formatMessage({ id: errorMessages.password })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Password' })}（{intl.formatMessage({ id: 'For_checking' })}）
                    </label>
                    <input 
                        placeholder={intl.formatMessage({ id: '_6_to_32_characters' })}
                        name="confirmedPassword" 
                        type="password" 
                        id="" 
                        className="" 
                        onChange={handleInputChange} value={formData.confirmedPassword} />
                    <span className="text-xs text-error-message">
                        {errorMessages?.confirmedPassword && intl.formatMessage({ id: errorMessages.confirmedPassword })}
                    </span>
                </div>



                <div id="" className={`${inputWrapClass} self-start`}>
                    <p className="text-xs text-error-message mb-2">
                        {errorMessages?.duplicate && intl.formatMessage({ id: errorMessages.duplicate })}
                    </p>
                </div>
                <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                    <label className="flex flex-row items-center cursor-pointer" for="sample_checkbox">
                        <input
                            name="termsChecked"
                            className="p-2 mx-2" 
                            type="checkbox" 
                            id="sample_checkbox" 
                            checked={modalStateValue.data.checked}
                            onChange={handleTermsCheckedChange}
                         />
                        <p className="text-xs">
                            {intl.formatMessage({ id: 'I_will_register_as_a_member_after_agreeing_to_the_terms_of_use_and_privacy_policy_of_this_service' })}
                        </p>
                    </label>
                </div>
                {/* 招待コードの入力を反映させる場合以下を解放 */}
                {/* <div id="" className={`${inputWrapClass} self-start mt-12`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'invitation_code' })}（{intl.formatMessage({ id: 'Only_if_you_have' })}）
                    </label>
                    <input 
                        placeholder={intl.formatMessage({ id: 'Please_enter_your_invitation_code' })}
                        name="invitationCode" 
                        id="" 
                        className=""
                        onChange={handleInputChange} value={formData.invitationCode} />
                    <span className="text-xs text-error-message">
                        {errorMessages?.invitationCode && intl.formatMessage({ id: errorMessages.invitationCode })}
                    </span>
                </div> */}
            </form>
        </div>
    )

}