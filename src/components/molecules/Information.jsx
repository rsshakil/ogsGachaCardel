import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { informationStateMultilingual } from "../../store/recoil/informationStateMultilingualV001";
import { informationState } from "../../store/recoil/informationState";
import { userState } from "../../store/recoil/userState";
import { Headline } from "../atoms/text/Headline";
import '../../css/Information.css';
import {useIntl,FormattedDate} from 'react-intl'

export const Information = () => {
    const intl = useIntl()
    const [UserStateObj, setUserState] = useRecoilState(userState);

    //  ユーザーに割り当てられた利用言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[Information]languageResource", languageResource)

    let translationObj;
    /////////////////////////////////////
    // APIからの返却が多言語の場合
    const [informationObj, setinformation] = useRecoilState(informationStateMultilingual);
    // console.log("[Information]informationArray[languageResource]", informationObj[languageResource])
    translationObj = informationObj[languageResource];
    /////////////////////////////////////
    // APIからの返却が単言語の場合
    // const [informationObj, setinformation] = useRecoilState(informationState);
    // translationObj = informationObj;

    //  今の日付　日本時間の0:00
    let today = new Date();
    //  表示開始日付　日本時間の0:00
    let displayStartDay = new Date();
    //  表示終了日付　日本時間の0:00
    //  ❗️この日の0:00を超えたら非表示となる
    let displayEndDay = new Date();
    //  このお知らせを表示するかどうか
    let isDisplay = false;
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
                <div className="informationPanelInner no-shine px-10 sm:px-12 md:px-14 lg:px-16 py-8 min-h-full">
                    <ol className="grid grid-cols-1 gap-4 sm:gap-12 font-Prompt text-white">
                    {Object.keys(translationObj).map((infomationKey) => {
                        console.log("[Information]infomationKey===>", infomationKey)
                        console.log("[Information]informationArray[infomationKey].displayStart)===>", translationObj[infomationKey].displayStart)
                        console.log("[Information]informationArray[infomationKey].displayEnd)===>", translationObj[infomationKey].displayEnd)
                        console.log("[Information]today===>", today)
                        displayStartDay = new Date(translationObj[infomationKey].displayStart);
                        displayEndDay = new Date(translationObj[infomationKey].displayEnd);

                        console.log("[Information]new Date(translationObj[infomationKey].displayStart)===>", new Date(translationObj[infomationKey].displayStart))
                        console.log("[Information]new Date(translationObj[infomationKey].displayEnd)===>", new Date(translationObj[infomationKey].displayEnd))
                        if(today >= new Date(translationObj[infomationKey].displayStart) && today <= new Date(translationObj[infomationKey].displayEnd)){
                            console.log("[Information]⭕️表示できる===>", infomationKey)
                            isDisplay = true
                        }else{
                            console.log("[Information]❌表示できない===>", infomationKey)
                            isDisplay = false
                        }
                        // console.log("[Information]informationArray[infomationKey])===>", translationObj[infomationKey])
                        return (
                            isDisplay
                            ?
                            <li key={infomationKey} className="">
                                <span className="font-bold">
                                    {/* {FormattedDate({ value:new Date(translationObj[infomationKey].displayDate)},{year:"numeric"},{month:"long"},{day:"numeric"})} */}
                                    {/* {intl.formatDate(Date.now(), {year: 'numeric', month: 'numeric', day: 'numeric',formatMather:"YYYY/MM/DD/YYYY"})} */}
                                    {intl.formatDate(new Date(translationObj[infomationKey].displayDate))}
                                    </span>
                                <p>{translationObj[infomationKey].displayText}</p>
                            </li>
                            :
                            <></>
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


