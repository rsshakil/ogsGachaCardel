import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'
import countries from '../../../../store/dictionary/countries';

export const ContentCountryOfResidence = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const {
        BaseModalOpen,
        modalType,
        mode,
    } = modalStateValue;
    const {
        // エラーになるやつは初期値を入れておく
        price = 0,
        gachaId,
        gachaTranslateId,
        gachaTranslateDescription,
        gachaTranslateGachaId,
        gachaTranslateLocalizeId,
        gachaTranslateName,
        gachaTranslateImageDetail,
        gachaTranslateJpFlag,
        gachaTranslateImageMain,
        takeAllGacha,
        gachaSinglePoint,
        gachaConosecutivePoint,
        gachaTotalCount,
        gachaRemainingCount,
        gachaConosecutiveCount,
        select,
        takeNumber = 0,
    } = modalStateValue['data'] || {};

    /////////////////////////////////////
    //  ユーザーに割り当てられた利用言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentCountryOfResidence]languageResource=>", languageResource)
    //  表示する国名
    let useLanguageName;
    if(languageResource === 'ja'){
        //　この後shortがなければfullを使う
        useLanguageName = 'name';
        // console.log("[ResidenceRegistrationForm]countrieNameKey:ja=>", useLanguageName)
    }else{
        //　この後shortがなければfullを使う
        useLanguageName = 'en_name';
        // console.log("[ResidenceRegistrationForm]countrieNameKey:not ja=>", useLanguageName)
    }

    /////////////////////////////////////
    //  countriesから利用する国名のkey
    let countrieNameKey;
    countrieNameKey = UserStateObj?.countryOfResidence;
    console.log("[ContentCountryOfResidence]languageResource=>", countrieNameKey)

    /////////////////////////////////////
    //  表示する国名
    let countrieName;
    let countrieNameIndex = countries.findIndex((userCountry) => userCountry.countryId === countrieNameKey);
    console.log("countrieNameIndex",countrieNameIndex)
    if(countrieNameIndex>0){
        // console.log("[ContentCountryOfResidence]countrieNameIndex=>", countrieNameIndex);
        console.log("[ContentCountryOfResidence]countries[countrieNameIndex]=>", countries[countrieNameIndex]);
        console.log("[ContentCountryOfResidence]countries[countrieNameIndex][useLanguageName]=>", countries[countrieNameIndex][useLanguageName]);
        countrieName = countries[countrieNameIndex][useLanguageName].short ? countries[countrieNameIndex][useLanguageName].short : countries[countrieNameIndex][useLanguageName].full;
        console.log("[ContentCountryOfResidence]countrieName=>", countrieName);
    }

    countrieName = countries[countrieNameIndex][useLanguageName].short ? countries[countrieNameIndex][useLanguageName].short : countries[countrieNameIndex][useLanguageName].full;

    useEffect(()=>{
        let countrieNameIndexVal = countries.findIndex((userCountry) => userCountry.countryId === countrieNameKey);
        if(countrieNameIndexVal<0){
            //DisplayResidenceSelectModal
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'CountryofResidenceRegistration',
                // mode: "read",
                data : {}
            }))
        }
    },[countrieNameKey])

    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <Headline
                type="h2"
                spanText={countrieName}
                spanClass="font-bold text-center text-2xl font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'Enjoy_cardel' })}
                headlineClass="font-bold text-left text-base font-Prompt text-white flex flex-col"
            />
        </div>
    )
    
}