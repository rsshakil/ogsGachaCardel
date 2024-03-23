import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'
import countries from '../../../../store/dictionary/countries';
import {useInterval,useThrottle,useUpdateEffect,useMount,useUnmount} from 'react-use';
import useAlert from "../../../../hooks/useAlert";

export const ContentSMSAuthenticated = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);

    const  {showAlert1, showAlert2} = useAlert();

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
    //❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
    //  コンポーネントがマウントされているかどうかでheadのjs入れ替え
    const admusubiBox = document.getElementById("admusubiBox");
    const jsPath1 = "/alert1.js";
    const jsPath2 = "/alert2.js";
    const head = document.getElementsByTagName('head')[0];
    const scriptUrl = document.createElement('script');
/*
    useMount(() => {
        //まず消す
        console.log('[ContentSMSAuthenticated]マウントされました');        
        scriptUrl.type = 'text/javascript';
        scriptUrl.src = jsPath1;
        scriptUrl.setAttribute("data-client-key", 'admusubikey1');
        head.appendChild(scriptUrl);
    });
*/
   

/*
    useUnmount(() => {
        console.log('[ContentSMSAuthenticated]アンマウントされました');
        scriptUrl.type = 'text/javascript';
        scriptUrl.src = jsPath2;
        scriptUrl.setAttribute("data-client-key", 'admusubikey2');
        head.appendChild(scriptUrl);
        // const script1 = document.createElement('script');
        // script1.type = 'text/javascript';
        // script1.src = jsPath1;
        // script1.setAttribute("data-client-key", 'admusubikey2');
        // document.head.appendChild(script1);
        // const element1 = document.getElementById("admusubikey2");
        // element1.remove();
    });
*/
    //❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
    //  コンポーネントがマウントされているかどうかでheadのjs入れ替え
    /////////////////////////////////////



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
    let countrieNameIndex = countries.findIndex((userCountry) => userCountry.countryId == countrieNameKey);
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
        let countrieNameIndexVal = countries.findIndex((userCountry) => userCountry.countryId == countrieNameKey);
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


    useEffect(() => {
        // haga add
        if (process.env.REACT_APP_ENVIRONMENT === 'cardel-develop') {
            showAlert1();
            return;

            const script1 = document.createElement('script');
            script1.type = 'text/javascript';
            script1.src = jsPath1;
            script1.id = 'admusubikey1';
            // script1.setAttribute("data-client-key", 'admusubikey1');
            const script2 = document.createElement('script');
            script2.id = 'line_script1';
            // innerHTMLでやりたい内容を書く
            script2.innerHTML = `
                <!--
                admusubi_cv.cv('admage_admusubi_xuid', 'https://ad-musubi.com/ad', '_buyer=842&_price=&_buid=');
                //-->
            `;
            document.head.appendChild(script1);
            // document.head.appendChild(script2);
            const element1 = document.getElementById("admusubikey1");
            // const element2 = document.getElementById("line_script1");
            element1.remove();
            // element2.remove();
        }
    }, [])



    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <Headline
                type="h2"
                spanText={intl.formatMessage({ id: "SMS_authenticated" })}
                spanClass="font-bold text-center text-2xl font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'Enjoy_cardel' })}
                headlineClass="font-bold text-left text-base font-Prompt text-white flex flex-col"
            />
            <p className="text-center font-Prompt text-white flex flex-col pt-4">{intl.formatMessage({ id: 'If_you_would_like_to_change_your_verification_phone_number__please_contact_our_support_desk' })}</p>
        </div>
    )
    
}