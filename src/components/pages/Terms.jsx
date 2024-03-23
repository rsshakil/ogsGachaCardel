import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/_trash/settingsState";
import { displayState } from "../../store/recoil/displayState";
import usePageTitle from "../../hooks/usePageTitle";
import { Slider } from "../molecules/Slider";
import { ProductList } from "../molecules/ProductList";
import { Information } from "../molecules/Information";
import { CorporateInfo } from "../molecules/CorporateInfo";
import { TermsOfService } from "../molecules/TermsOfService";
import {useIntl} from 'react-intl'
import { QueryParameter } from "../../functions/QueryParameter";
import useMetaDescription from "../../hooks/useMetaDescription";


export const Terms = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const intl = useIntl()
    // const history = useHistory();
    const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    console.log(settingsStateStateValue);

    let pagePath = 'terms';
    // let pageName = location.state?.data.name;
    let pageTitle = intl.formatMessage({ id: 'terms_of_Use' }) + " | " + intl.formatMessage({ id: 'CARDEL' }) + " " + intl.formatMessage({ id: 'official_site' });
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

    return (
        <>
            <QueryParameter />
            <TermsOfService />

        </>
    );
};



