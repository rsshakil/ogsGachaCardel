import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams, useParams, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";
import { modalState } from "../../store/recoil/modalState";

// import { accessState } from "../../store/recoil/accessState";
import '../../css/Icatch.css';
import {useIntl} from 'react-intl'

import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';

// GA4 Pack
// import useGA4EventPack from "../../lib/useGA4EventPack";
let IcatchInterval;
export const Icatch = ({productFilterClass="",gachaDisplay=""}) => {
    const intl = useIntl()
    const location = useLocation();
    const navigate = useNavigate();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [productListArray, setProductList] = useRecoilState(productListState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    // console.log("[Icatch]", productListArray)
    //  メモリーに格納して使用するとタイミングの問題があるので各所で冗長に取得する必要がある
    const { id } = useParams();
    // console.log("[Icatch]useParams.id=======>",id);

    //  言語ごとの商品取り出し
    let languageResource;
    languageResource = UserStateObj.languageResource;
    const {
        gachaId,
        gachaTranslateId,
        gachaTranslateGachaId,
        gachaTranslateLocalizeId,
        gachaTranslateName,
        gachaTranslateDescription,
        gachaTranslateImageDetail,
        gachaTranslateJpFlag,
        gachaTranslateImageMain,
        gachaSinglePoint,
        gachaTotalCount,
        gachaRemainingCount,
        gachaConosecutiveCount,
        gachaRemainingDisplayFlag,
        
    // } = productListArray.find((row) => row.gachaId === id) 
    // } = productListArray.find((row) => row.gachaId == id);
    } = productListArray[id];
    // } = productListArray.find((row) => row.gachaId == id);
    // console.log("[Icatch]gachaTranslateImageMain=======>",gachaTranslateImageMain);
    

    ///////////////////////////////
    // set fron API
    ///////////////////////////////
    // let gachaRemainingCount;
    // let gachaTotalCount;
    // let gachaSinglePoint;
    let remainingLevel;
    let remainingRate;
    let nowCount;
    let numberOfDigits

    // gachaRemainingCount = Math.floor( Math.random() * ( 30000 - 0 ) + 0);
    // gachaRemainingCount = 2;
    // gachaTotalCount = 30000; // set dummy
    // gachaSinglePoint = 99999 // set dummy
    ///////////////////////////////
    ///////////////////////////////
    // rate calculation
    ///////////////////////////////
    remainingRate = Math.floor(gachaRemainingCount / gachaTotalCount * 100);
    // console.log("[ProductList]remainingRate", remainingRate)
    remainingLevel = Math.floor(remainingRate / 5)*5;
    // console.log("[ProductList]remainingLevel", remainingLevel)
    if(gachaRemainingCount === 0){
        remainingLevel = "empty"
    }

    //  最大数の桁数
    numberOfDigits = gachaRemainingCount.toString().length;
    //  現在の回転数　を　最大数の桁数でゼロ埋め
    nowCount = String(gachaTotalCount- gachaRemainingCount).padStart(numberOfDigits, '0');

    // useGA4EventPack(gachaTranslateName);

  return (
    // <section id="Icatch" className="py-4 sm:py-5" onClick={false}>
    <section id="Icatch" className="py-4 sm:py-5 cursor-pointer" onClick={() => window.location.reload()}>
        <div 
            id={`${gachaId}-Wrap`}
            className="aspect-[3/2] w-full overflow-hidden rounded"
            // onClick={go2gacha}
            title={`${gachaTranslateName} | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}
            >
                <figure 
                    id={gachaId}
                    className={`${productFilterClass} w-full h-full bg-no-repeat bg-cover bg-center`}
                    style={{ backgroundImage: `url(${gachaTranslateImageMain})` }}
                >
                    {
                    gachaTranslateImageMain
                    ?
                    <img className="hidden" src={`${gachaTranslateImageMain}`} alt={`${gachaTranslateName}-thumbnail | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}></img>
                    :
                    <></>
                    }
                </figure>
                <div className={`${productFilterClass} product-footer-wrap relative w-full bottom-9 h-8 flex flex-row justify-between`}>
                    <div className="flex-none w-32 items-end flex">
                    {gachaRemainingDisplayFlag ? <p className="remaining-number remainingFromH rounded-2xl pl-1 ml-2 font-Roboto font-black text-md w-full">{gachaDisplay==="soldout"?"0":gachaRemainingCount.toLocaleString()}/{gachaTotalCount.toLocaleString()}</p>:''}
                    </div>
                    <div className={`product-footer-panel--life-${remainingLevel} grow flex justify-between self-center max-w-xs`}>
                        <div className="pl-[10%] ">
                            {gachaRemainingDisplayFlag ? <p className="product-footer-name relative font-Roboto font-bold left-1 self-center ">#{nowCount}</p>:''}
                        </div>
                        <div className="flex justify-end text-white">
                            <p className="leading-8 font-Noto text-xs -bottom-0.5">
                                {intl.formatMessage({ id: 'card_number' },{ number: 1 })}
                            </p>
                            <p className="leading-8 text-sm font-Roboto font-black">{gachaSinglePoint.toLocaleString()}</p>
                            <p className="leading-8 pr-1 font-Noto text-xs -bottom-0.5">pt</p>
                        </div>
                    </div>
                </div>
        </div>
    </section>
    );
};


