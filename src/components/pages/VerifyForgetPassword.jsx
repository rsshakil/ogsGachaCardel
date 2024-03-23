import React, { useRef, useState, useEffect, Suspense } from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/_trash/settingsState";
import { displayState } from "../../store/recoil/displayState";
import { modalState } from "../../store/recoil/modalState";
import usePageTitle from "../../hooks/usePageTitle";
import { Slider } from "../molecules/Slider";
import { ProductList } from "../molecules/ProductList";
import { Information } from "../molecules/Information";
import {useIntl} from 'react-intl'
import { QueryParameter } from "../../functions/QueryParameter";
import useMetaDescription from "../../hooks/useMetaDescription";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';

export const VerifyForgetPassword = () => {
    const [queryParameters] = useSearchParams();
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const navigate = useNavigate();
    const intl = useIntl()
    const location = useLocation();

    let pagePath = 'verify-forget-password';
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

    useEffect(() => {
        // forgetPasswordVerification();
        setTimeout(() => {
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: "ForgetPassword",
                // mode: "",
                data: {}
            }));
        }, 1000);
    }, []);

    async function forgetPasswordVerification() {
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
                    url: queries.baseURL + queries.forgetPasswordVerification,
                    data: submitData
                }

                response = await instance.request(config);
                if (response.status == 200) {
                    // navigate(`/verification`);
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'verificationEmail',
                        mode: "edit",
                        data: {from : 'VerifyForgetPassword'}
                    }))
                    removeTokenFromURL(true);
                } else {
                    // navigate(`/verification-error`);
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'verificationEmail',
                        mode: "edit",
                        data: {from : 'VerifyForgetPassword'}
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
                        body: intl.formatMessage({ id: 'forget_password_token_verification_error' })
                    }
                }
                //show error modal when api error occured
                
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
                    data: {from : 'VerifyForgetPassword'}
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
            window.history.replaceState({}, '', newURL);
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



