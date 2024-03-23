import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams, useParams } from "react-router-dom";
import { productListStateMultilingual } from "../../store/recoil/productListStateMultilingual";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";
import '../../css/Detail.css';
import {useIntl} from 'react-intl'
import * as queries from "../../restapi/queries";



export const PreRegistrationDetail = () => {
    const intl = useIntl()

    const [UserStateObj, setUserState] = useRecoilState(userState);
    //  ユーザーに割り当てられた利用言語
    let languageResource;
    languageResource = UserStateObj.languageResource;



    return (
    <section id="ProductDetail" className="py-4 px-4 bg-gradient-to-r from-black via-stone-700 to-black text-white ">
        <div className="py-4">
            {/* <h1 className="text-center text-2xl font-bold font-Prompt text-white sm:col-span-2 lg:col-span-3 flex flex-col">
                {intl.formatMessage({ id: 'Pre_registration_campaign' })}
                <small className="text-center text-sm text-white">
                    {intl.formatMessage({ id: 'Get_great_benefits' })}
                </small>
            </h1> */}
        </div>
        <figure className="">
            {/* 画像のボーナスptに誤りがあるので非表示
            修正が完了したら画像を入れ替えて表示する */}
            <img 
              className="w-full select-none min-h-screen" 
              src="/bankCampaign/bank.png"
              alt={`銀行決済-thumbnail | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}/>
        </figure>
    </section>
    );
};


