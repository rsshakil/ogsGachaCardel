import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import { userState } from "../../store/recoil/userState";
import countries from '../../store/dictionary/countries';

///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';

///////////////////
export const ResidenceRegistrationForm = () => {
    const intl = useIntl();
    const [UserStateObj, setUserState] = useRecoilState(userState);

    /////////////////////////////////////
    //  ユーザーに割り当てられた利用言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ResidenceRegistrationForm]languageResource=>", languageResource)

    /////////////////////////////////////
    //  countriesから利用する国名のkey
    let countrieNameKey;
    //  表示する国名
    let countrieName;

    if(languageResource === 'ja'){
        //　この後shortがなければfullを使う
        countrieNameKey = 'name';
        // console.log("[ResidenceRegistrationForm]countrieNameKey:ja=>", countrieNameKey)
    }else{
        //　この後shortがなければfullを使う
        countrieNameKey = 'en_name';
        // console.log("[ResidenceRegistrationForm]countrieNameKey:not ja=>", countrieNameKey)
    }

    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form className="gap-2" id="countryOfResidence" onSubmit={e => { e.preventDefault(); }}>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Country_of_residence' })}
                    </label>
                    <select name="countryId" id="countryId">
                        {countries.map((countrie) => {
                        // console.log("[ResidenceRegistrationForm]countrie=>", countrie)
                        // console.log("[ResidenceRegistrationForm]countrie.code=>", countrie.code)
                        // console.log("[ResidenceRegistrationForm]countrieNameKey=>", countrieNameKey)
                        // console.log("[ResidenceRegistrationForm]countrie[countrieNameKey]=>", countrie[countrieNameKey])
                        //  shortがなければfullを利用する
                        countrieName = countrie[countrieNameKey].short ? countrie[countrieNameKey].short : countrie[countrieNameKey].full;
                        // console.log("[ResidenceRegistrationForm]countrieName=>", countrieName)
                        return <option key={countrie[countrieNameKey]} value={countrie.countryId}>{countrieName}</option>;
                        })}
                     </select>
                </div>

                <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'Notes_on_regional_registration' })}
                    </p>
                </div>
            </form>
        </div>
    )
}