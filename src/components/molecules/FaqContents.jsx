import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { faqState } from "../../store/recoil/faqState";
import { userState } from "../../store/recoil/userState";
import { Headline } from "../atoms/text/Headline";
import {useIntl} from 'react-intl'
import '../../css/textPanel.css';

// import { useNavigate } from 'react-router-dom';
let productWrapStyle = 'aspect-[3/2] w-full overflow-hidden rounded';
let productBgStyle = 'transition transform duration-150 ease-in w-full h-full bg-no-repeat bg-cover bg-center hover:scale-125';
let class1stLevelLi = '';
let class1stLevelSpan = 'font-bold text-xl leading-loose';
let class1stLevelP = '';

let class2ndLevelUl = 'pl-4 py-4';
let class2ndLevelLi = 'pl-4';

let class3rdLevelUl = 'pl-4 py-4';
let class3rdLevelLi = 'pl-4';
let class3rdLevelSpan = 'font-bold';
let class3rdLevelP = 'font-normal text-base';

let class4thLevelUl = 'pl-4';
let class4thLevelLi = 'pl-4';

let class5thLevelUl = 'pl-4';
let class5thLevelLi = 'pl-4';

export const FaqContents = () => {
    const intl = useIntl()
    const [faqStateObj, setFaqState] = useRecoilState(faqState);
    const [UserStateObj, setUserState] = useRecoilState(userState);

    ////////////////////////////////////////
    //  ユーザーに割り当てられた利用言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    //  ユーザーに割り当てられた利用言語
    ////////////////////////////////////////

    return (
    <>
        <section id="faqWrap" className={`flex justify-center text-white py-8 px-4 `}>
            <div class="grid divide-y divide-neutral-200 mx-auto">
                <Headline 
                            type="h1"
                            spanText=""
                            spanClass="text-center text-sm text-white drop-shadow-md"
                            headlineText={intl.formatMessage({ id: 'faq' })}
                            headlineClass="my-2 text-center text-5xl font-bold font-Prompt text-white flex flex-col drop-shadow-md"
                />
                <div className="text-panel w-full ">
                    <div className="text-panel-inner px-10 sm:px-12 md:px-14 lg:px-16 py-16 text-white">
                        <span className="font-bold">お問い合わせの前によくある質問をご確認お願いします。その他のご質問お問い合わせは下部のカスタマーサポートよりお問合せください</span>
                        <div class="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8 font-Prompt text-white">
                            {Object.keys(faqStateObj[languageResource]).map((faqKey) => {
                                console.log("[FaqContents]faqKey===>", faqStateObj[languageResource][faqKey].Q)
                                return (
                                    <div 
                                        className="py-5 font-Noto whitespace-pre-wrap break-words overflow-hidden"
                                        key={faqKey}
                                    >
                                        <details className="group">
                                            <summary className="flex justify-between items-center font-bold cursor-pointer list-none">
                                                <span>{faqStateObj[languageResource][faqKey].Q}</span>
                                                <span className="transition group-open:rotate-180">
                                            <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                            </summary>
                                            <p className="text-white mt-3 group-open:animate-fadeIn">
                                            {faqStateObj[languageResource][faqKey].A}
                                            </p>
                                        </details>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
};


