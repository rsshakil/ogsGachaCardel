import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
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


export const Verification = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const intl = useIntl()
    // const history = useHistory();
    const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    // console.log(settingsStateStateValue);

    let pagePath = 'verification';
    // let pageName = location.state?.data.name;
    let pageTitle = intl.formatMessage({ id: 'Confirm_email_address' }) + " | " + intl.formatMessage({ id: 'CARDEL' }) + " " + intl.formatMessage({ id: 'official_site' });
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
        // console.log("verification success modal display")
        setTimeout(()=>{
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'verificationEmail',
                mode: "edit",
                data: {from : 'Verification'}
            }))
        });
    }, []);
// console.log("modateStateFromVerification",modalStateValue)
    return (
        <>
            <QueryParameter />
            <Slider />
            <ProductList />
            <Information />
        </>
    );
};



