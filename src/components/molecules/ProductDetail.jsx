import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams, useParams } from "react-router-dom";
import { productListStateMultilingual } from "../../store/recoil/productListStateMultilingual";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";
import '../../css/Detail.css';
import {useIntl} from 'react-intl'
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';


export const ProductDetail = ({productFilterClass="",gachaDisplay=""}) => {
    const intl = useIntl()
    const { id } = useParams();
    console.log("@@@@@@@@@22", id);

    const [UserStateObj, setUserState] = useRecoilState(userState);
    //  ユーザーに割り当てられた利用言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ProductDetail]languageResource=>", languageResource)

    // let translationObj;
    /////////////////////////////////////
    //  APIからの返却が多言語の場合
    // const [productListArray, setProductList] = useRecoilState(productListStateMultilingual);
    // translationObj = productListArray[languageResource];

    /////////////////////////////////////
    // APIからの返却が単言語の場合
    const [productListArraySingle, setProductListSingle] = useRecoilState(productListState);
    // translationObj = productListArraySingle;
console.log(">>>>>>>>>>>>id", id);
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
    // } = productListArraySingle.find((row) => row.gachaId == id);
    } = productListArraySingle[id];


    return (
    <section id="ProductDetail" className="py-4 px-4 bg-gradient-to-r from-black via-stone-700 to-black text-white">
        <div className="py-4">
            <h1 className="text-center text-2xl font-bold font-Prompt text-white sm:col-span-2 lg:col-span-3 flex flex-col">
            {gachaTranslateName}
                <small className="text-center text-sm text-white whitespace-pre-wrap">
                    {gachaTranslateDescription}
                </small>
            </h1>
        </div>
        {
        gachaTranslateImageDetail
        ?
        <figure className={`${productFilterClass}`}>
            
            <img 
              className="w-full select-none min-h-screen" 
              src={`${gachaTranslateImageDetail}`}
              alt={`${gachaTranslateName}-thumbnail | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}/>
        </figure>
        :
        <></>
        }
    </section>
    );
};


