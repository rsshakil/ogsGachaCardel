//  本登録完了のメール認証アクセスページ
import React, { useRef, useState, useEffect, Suspense } from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/_trash/settingsState";
import { displayState } from "../../store/recoil/displayState";
import { modalState } from "../../store/recoil/modalState";
import {browserTrackingState} from "../../store/recoil/browserTrackingState";
import usePageTitle from "../../hooks/usePageTitle";
import { Slider } from "../molecules/Slider";
import { ProductList } from "../molecules/ProductList";
import { Information } from "../molecules/Information";
import {useIntl} from 'react-intl'
import { QueryParameter } from "../../functions/QueryParameter";
import {apiURL} from "../Form/LoginForm";
import useMetaDescription from "../../hooks/useMetaDescription";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';
import {useInterval,useBoolean,useUpdateEffect,useMount} from 'react-use';


export const VerifyMail = () => {
    const apiURL = process.env.REACT_APP_API_URL + '/' + process.env.REACT_APP_ENVIRONMENT;
    const [queryParameters] = useSearchParams();
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [browserTrackingObj, setBrowserTrackingState] = useRecoilState(browserTrackingState);
    const navigate = useNavigate();
    const intl = useIntl()
    const location = useLocation();
    //  １ヶ月より内のアカウント作成回数
    const [accountCreateCount, setAccountCreateCount] = useState(0);
    //  １ヶ月より内のアカウント作成回数のObj要素数
    const [accountCreateLength, setAccountCreateLength] = useState(99);

    let pagePath = 'verify-mail';
    // let pageName = location.state?.data.name;
    let pageTitle = intl.formatMessage({ id: 'top' }) + " | " + intl.formatMessage({ id: 'CARDEL' }) + " " + intl.formatMessage({ id: 'official_site' });
    let metaDescription = intl.formatMessage({ id: 'meta_description' });
    useEffect(() => {
        // window.history.pushState(null, '', window.location.href);
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,
            // pageName: pageName,
        }))
    }, [location]);
    usePageTitle(displayStateValue.pageTitle);
    useMetaDescription(metaDescription);


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
        setAccountCreateLength(Object.keys(AccountCreate).length);
        console.log("[SignUpForm]AccountCreateの要素数==>",accountCreateLength);
        //  １ヶ月より内のアカウント作成回数を0にリセット
        setAccountCreateCount(0)
        // console.log("[SignUpForm]AccountCreate==>", AccountCreate);
        // console.log("[SignUpForm]browserTrackingObj.accountCreate==>", browserTrackingObj.accountCreate);
        // console.log("[SignUpForm]nowDate,monthAgoDate==>", intl.formatDate(nowDate),intl.formatDate(monthAgoDate));
        Object.keys(AccountCreate).map(key => {
            // console.log("[SignUpForm]AccountCreates==>", key, new Date(key), intl.formatDate(new Date(browserTrackingObj.accountCreate[key].timeStamp)));
            setAccountCreateLength((prevCount) => prevCount - 1);
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
    //  多重作成のチェック完了を監視
    useUpdateEffect(() => {
        if(!accountCreateLength){
            //  チェックが完了した
            console.log("[SignUpForm]AccountCreateの残数==>",accountCreateLength);
            console.log("[SignUpForm]レッドカードの枚数==>", accountCreateCount);
            if(accountCreateCount >= 3){
                console.log("[SignUpForm]ネズミ取り開始==>", accountCreateCount);
                let modalType = 'MultipleAccountCreationError';
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: modalType,
                }))
                removeTokenFromURL(true);
            }else if(accountCreateCount < 3){
                //  既定の回数以下なのでverifyMail実行
                verifyMail();
            }else{
                //  予備
            }
        }
    }, [accountCreateLength]);
    //  多重作成のチェック完了を監視
    ///////////////////////////////////////////////////////

    ////////////////////////////////
    //  旧式　本登録認証
    // useEffect(() => {
    //     //  ネズミ取り機に引っ掛からなかった時だけverifyMail();を実行する
    //     verifyMail();
    // }, []);
    //  旧式　本登録認証
    ////////////////////////////////


    async function verifyMail() {
        const token = queryParameters.get("token");
        console.log('token', token);
        const successStatus = queryParameters.get("success");
        let response;
        if (token) {
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'Loading'
            }))

            const submitData = {
                token: token
            }

            try {
                const config = {
                    method: queries.postMethod,
                    url: queries.baseURL + queries.verifyMail,
                    data:submitData
                }

                response = await instance.request(config);
                if (response.status == 200) {
                    // navigate(`/verification`);
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'verificationEmail',
                        mode: "edit",
                        data: {from : 'verifyMail'}
                    }))
                    removeTokenFromURL(true);
                } else {
                    // navigate(`/verification-error`);
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'verificationEmail',
                        mode: "edit",
                        data: {from : 'verifyMail'}
                    }))
                    removeTokenFromURL(false);
                }
            }
            catch (err) {
                console.log("err", err);
                const { errorCode } = err.response?.data || '';
                console.log("errorCode",errorCode);
                let mType ="error";
                let mData = {
                    title: "",
                    body: intl.formatMessage({ id: 'A_system_error_has_occurred__Please_try_again' })
                };
                if(errorCode===503){
                    mType = "error"
                    mData = {
                        title: "",
                        body: intl.formatMessage({ id: 'mail_signup_token_verification_error' })
                    }
                }
                
                // navigate(`/verification-error`);
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: mType,
                    // mode: "",
                    data: mData
                }));
                removeTokenFromURL(false);
            }
        } else {
            if (successStatus === 'true') {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'verificationEmail',
                    mode: "edit",
                    data: {from : 'verifyMail'}
                }))
            }
            else {
                const mType ="error";
                const mData = {
                    title: "",
                    body: intl.formatMessage({ id: 'mail_signup_token_verification_error' })
                }
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: mType,
                    data: mData
                }));
            }
        }
    }

    // Function to remove the 'token' parameter from the URL
    const removeTokenFromURL = (successStatus) => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('token')) {
            urlParams.delete('token');
            urlParams.set('success', successStatus);
            const newURL = `${window.location.pathname}?${urlParams.toString()}`;
            window.history.replaceState({}, '', window.location.origin);
        }
    };

    return (
        <>
            <QueryParameter />
            <Slider />
            <ProductList />
            <Information />
        </>
    )
};



