import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";

// import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/_trash/settingsState";
import { displayState } from "../../store/recoil/displayState";
import { modalState } from "../../store/recoil/modalState";
import usePageTitle from "../../hooks/usePageTitle";
import { Slider } from "../molecules/Slider";
import { ProductList } from "../molecules/ProductList";
import { Information } from "../molecules/Information";
import { CorporateInfo } from "../molecules/CorporateInfo";
import { Icatch } from "../molecules/Icatch";
import { ProductDetail } from "../molecules/ProductDetail";
import { Play } from "../molecules/Play";
import BaseModal from "../molecules/modal/BaseModal";
import {useIntl} from 'react-intl';
import { QueryParameter } from "../../functions/QueryParameter";
import useMetaDescription from "../../hooks/useMetaDescription";
import { PreRegistrationDetail } from "../molecules/PreRegistrationDetail";
import { SignUp } from "../molecules/SignUp";
import { HeaderMedia } from "../molecules/HeaderMedia";


export const PreRegistration = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const intl = useIntl()
    // const history = useHistory();
    const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    // console.log(settingsStateStateValue);
    // const [searchParams] = useSearchParams();
    // console.log("[PreRegistration]searchParams=======>",searchParams);
    // const getUseParams = useParams();
    // const { id } = useParams();
    // const { name } = useParams();
    // console.log("[PreRegistration]useParams.id=======>",id);
    // console.log("[PreRegistration]useParams.name=======>",name);



    let pagePath = 'PreRegistration';
    // let pageName = location.state?.data.name;
    let pageTitle = intl.formatMessage({ id: 'gacha' }) + " | " + intl.formatMessage({ id: 'CARDEL' }) + " " + intl.formatMessage({ id: 'official_site' });
    let metaDescription = intl.formatMessage({ id: 'meta_description' });

    useEffect(() => {
        // window.history.pushState(null, '', window.location.href);
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,

        }))
    }, [location]);
    usePageTitle(displayStateValue.pageTitle);
    useMetaDescription(metaDescription);

    //  念の為モーダルを初期化
    function closeModal(e) {
        console.log("[BaseModal]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }
    useEffect(() => {
        closeModal();
    }, [location]);



    return (
        <div className="flex justify-center">
            <div className="max-w-screen-sm w-full">
                <QueryParameter />
                <HeaderMedia />
                <PreRegistrationDetail />
                {/* <SignUp /> */}
                {/* <Icatch />
                <ProductDetail />
                <Play /> */}
            </div>
        </div>
    );
};



