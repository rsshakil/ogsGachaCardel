import React, { useRef, useState, useEffect, useLayoutEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../store/recoil/modalState";
import { gachaHistoryState } from "../../store/recoil/gachaHistoryState";
import { userState } from "../../store/recoil/userState";
import { snsState } from "../../store/recoil/snsState";
import { Headline } from "../atoms/text/Headline";
import '../../css/ProductList.css';
import {useIntl} from 'react-intl'
import { debugState } from "../../store/recoil/debugState";


import Youtube from 'react-youtube';



//  https://blog.fundely.co.jp/tech/2023/02/08/react-youtube%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%AE%E5%B0%8E%E5%85%A5/
///////////////////
let productWrapStyle = 'aspect-[3/2] w-full overflow-hidden rounded cursor-pointer relative';
let productBgStyle = 'w-full h-full bg-no-repeat bg-cover bg-center ';/*hover trinsionOFF "transition transform duration-150 ease-in hover:scale-125"*/
let remainingNumberClass = 'remaining-number rounded-2xl pl-1 ml-2 font-Roboto font-black text-md w-full'; 
let productFooterWrapClass = 'product-footer-wrap relative w-full bottom-9 h-8 flex flex-row justify-between';
let productFooterNameClass = 'product-footer-name relative font-Roboto font-bold left-1 self-center';
let soldOutClass = 'soldOutClass';
let countdownClass = 'countdownClass';
let productWrapHiddenClass = '';
let productFilterClass;
let gachaTotalCount;
let gachaRemainingCount;
let gachaSinglePoint;
let remainingRate;
let remainingLevel;
let gachaRemainingDisplayFlag;
let gachaViewFlag;
let gachaSoldOutFlag;
let gachaEndDate;
let gachaPostStartDate;
let gachaStartDate;
let gachaStartDateTime;
let gachaStartRemainingTime;
let gachaStartRemainingTotalSeconds;
let gachaStartRemainingDay;
let gachaStartRemainingMinutes;
let gachaStartRemainingHour;
let gachaStartRemainingSeconds;
let gachaStartRemainingTimeTemp;
let gachaPostStartDateExceed = true
let gachaStartDateExceed = true
let gachaEndDateExceed = false
let gachaOutOfStock = false
let nowCount;
let numberOfDigits;
let productListInterval;
let gachaGenreId;

///////////////////





export const SnsList = (props) => {
    let data = props.data;


    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [gachaHistoryStateObj, setGachaHistoryState] = useRecoilState(gachaHistoryState);
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    const [snsStateObj, setSnsStateObj] = useRecoilState(snsState);
    // console.log("[ProductList]UserStateObj==>",UserStateObj)
    const navigate = useNavigate();
    const intl = useIntl()

    ///////////////////////////////////////////////
    //  ユーザーの言語ごとの定義
    let languageResource = UserStateObj.languageResource;
    console.log("[SnsList]languageResource=>", UserStateObj.languageResource)
    let snsResource = snsStateObj[languageResource];
    console.log("[SnsList]snsResource=>", snsResource)
    //  ユーザーの言語ごとの定義
    ///////////////////////////////////////////////




    const opts = {
        
        // width: 300,
        // height: 168,
        
        // width: 1280,
        // height: 720,
        width: '100%',
        aspectRatio: '16 / 9',
        playerVars: {
            playsinline: 1,
            autoplay: 0,
            mute: 1,
            loop: 1,
            iv_load_policy : 3,
            rel : 0,
            fontSize: 8,
      }, 
    }

    return (
    <>        
        <section id="contentWrap" className={`flex justify-center bg-gradient-to-r from-black via-stone-700 to-black text-white py-8 px-4`}>
            <div className="w-256 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-4 justify-items-center">
                <Headline 
                    spanClass='text-center text-sm text-white'
                    headlineText='PICKUP SNS'
                    headlineClass='text-center text-5xl font-bold font-Prompt text-white md:col-span-2 2xl:col-span-2 flex flex-col'
                    type='h1'
                    spanText={intl.formatMessage({ id: 'Everyones_posts' })}
                    
                />
                {Object.keys(snsResource.youtubeList).map((videoId) => {
                    console.log("[SnsList]videoId=>", videoId)
                    return (
                        <div 
                            key={snsResource.youtubeList[videoId].videoId}
                            id={`${snsResource.youtubeList[videoId].videoId}-wrap`}
                            className="w-full  overflow-hidden rounded cursor-pointer " 
                            title={`${snsResource.youtubeList[videoId].title} | カーデル オリパ公式サイト`} 
                        >
                            <Youtube 
                                videoId={snsResource.youtubeList[videoId].videoId} 
                                opts={opts}
                                className=""
                            >
                             {/* <img
                                src={`https://img.youtube.com/vi/${videoId}/` + "mqdefault.jpg"}
                                alt={`${snsResource.slider[videoId].title} `}
                                className="video-thumbnail slide-img"
                            >
                            </img> */}
                            </Youtube>
                        </div>
                    )
                })}
                <Headline 
                    spanClass='text-center text-sm text-white'
                    headlineText='PICKUP WEB'
                    headlineClass='text-center text-5xl font-bold font-Prompt text-white md:col-span-2 2xl:col-span-2 flex flex-col'
                    type='h1'
                    spanText={intl.formatMessage({ id: 'Posted_on_website' })}
                    
                />
                {Object.keys(snsResource.webList).map((webId) => {
                    console.log("[SnsList]webId=>", webId)
                    return (
                        <div 
                            key={webId}
                            id={`${webId}-wrap`}
                            className="aspect-[3/2] w-full overflow-hidden rounded cursor-pointer relative" 
                            title={`${snsResource.webList[webId].title} | カーデル オリパ公式サイト`} 
                        >
                            <Link className="text-white text-base" activeClassName="active" to={snsResource.webList[webId].url} target="_blank">
                                <figure 
                                    id={`${webId}-figure`}
                                    className={`${productFilterClass} ${productBgStyle}`}
                                    style={{ backgroundImage: `url(${snsResource.webList[webId].img})` }}
                                >
                                    <img className="hidden" src={`${snsResource.webList[webId].img}`} alt={`${snsResource.webList[webId].title}-thumbnail | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}></img>
                                    <p className="web-title absolute bottom-0 text-ellipsis whitespace-nowrap overflow-hidden w-full text-white py-2 px-2 font-bold font-Noto text-center">{snsResource.webList[webId].title}</p>
                                </figure>
                            </Link>
                        </div>
                    )
                })}


            </div>
            <style jsx>{`
                .web-title {
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
                    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
                }
        `}</style>

        </section>
    </>
    );
};


