import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { informationState } from "../../store/recoil/informationState";
import { userState } from "../../store/recoil/userState";
import { Headline } from "../atoms/text/Headline";
import '../../css/Information.css';
import {useIntl,FormattedDate} from 'react-intl'

export const Information = () => {
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [informationObj, setinformation] = useRecoilState(informationState);
    const intl = useIntl()
    console.log("[Information]information", informationObj)

    let languageResource;
    languageResource = UserStateObj.languageResource;
    console.log("[Information]languageResource", languageResource)
    console.log("[Information]informationArray[languageResource]", informationObj[languageResource])

    let translationObj;
    translationObj = informationObj[languageResource];

    return (
    <>        

        <section id="informationWrap" className={`flex justify-center text-white py-8 px-4`}>
        <div className="w-256 grid grid-cols-1 gap-4 justify-items-center">
            <Headline 
                        type="h2"
                        spanText={intl.formatMessage({ id: 'information' })}
                        spanClass="text-center text-sm text-white drop-shadow-md"
                        headlineText="INFORMATION"
                        headlineClass="text-center text-5xl font-bold font-Prompt text-white flex flex-col drop-shadow-md"
            />
            <div className="informationPanel w-full lg:w-256">
                <div className="informationPanelInner px-10 sm:px-12 md:px-14 lg:px-16 py-8">
                <ol className="grid grid-cols-1 gap-4 sm:gap-12 font-Prompt text-white">
                {Object.keys(translationObj).map((infomationKey) => {
                    console.log("[Information]infomationKey===>", infomationKey)
                    console.log("[Information]informationArray[infomationKey])===>", translationObj[infomationKey])
                    return (
                        <li key={infomationKey} className="">
                            <span className="font-bold">
                                {/* {FormattedDate({ value:new Date(translationObj[infomationKey].displayDate)},{year:"numeric"},{month:"long"},{day:"numeric"})} */}
                                {/* {intl.formatDate(Date.now(), {year: 'numeric', month: 'numeric', day: 'numeric',formatMather:"YYYY/MM/DD/YYYY"})} */}
                                {intl.formatDate(new Date(translationObj[infomationKey].displayDate))}
                                </span>
                            <p>{translationObj[infomationKey].displayText}</p>
                        </li>
                    );

                })}
                </ol>
                </div>
            </div>
        </div>
        </section>
    </>
    );
};


