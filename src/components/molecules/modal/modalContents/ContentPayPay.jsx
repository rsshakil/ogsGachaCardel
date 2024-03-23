// https://qiita.com/ikeike443/items/e45cd498950d2a1ce302
// https://qiita.com/kazama1209/items/6981331fb43b80ff916d
//  LINEブラウザーで遷移して標準ブラウザーに帰ってくるなどの不正対策考慮が必要
//  https://faq.chibajets.jp/support/solutions/articles/73000591236-paypay%E6%94%AF%E6%89%95%E3%81%84%E5%BE%8C%E3%80%81%E9%95%B7%E6%99%82%E9%96%93%E7%94%BB%E9%9D%A2%E3%81%8C%E9%81%B7%E7%A7%BB%E3%81%9B%E3%81%9A%E8%B3%BC%E5%85%A5%E5%AE%8C%E4%BA%86%E3%81%A8%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93-
//  エラーページの用意が必要


import React, { useRef, useState, useEffect, Suspense,useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/item.css';
import {useIntl,FormattedDate} from 'react-intl'
import { BaseCard } from "../../../atoms/cards/BaseCard";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import * as queries from "../../../../restapi/queries";

import { CheckoutForm } from "./CheckoutForm";
import axios from "axios";
import { Loading } from "./Loading";
import { PointCard } from "../../../atoms/cards/PointCard";
import { headersParam } from '../../../../functions/commonFunctions';
import {useInterval,useBoolean,useUpdateEffect,useEffectOnce} from 'react-use';
import useSessionCheck from "../../../../hooks/useSessionCheck";
import { instance } from "../../../../services/axios";


////////////////////////////////
//  classの定義

let ContentStripeDisplay = 'hidden';
let testTimer;
//  classの定義
//
////////////////////////////////


// const PAYPAY = require('@paypayopa/paypayopa-sdk-node');


export const ContentPayPay = () => {
    const intl = useIntl()
    const [ modalStateValue, setModalState ] = useRecoilState(modalState);
    const [ UserStateObj, setUserState ] = useRecoilState(userState);
    const [ stripePromise, setStripePromise ] = useState(null);
    const [ clientSecret, setClientSecret ] = useState('');
    const [ isTimeout, setIsTimeout ] = useState(false);

    const { getSessionCheck } = useSessionCheck();

    console.log("[ContentPayPay]stripePromise==>", stripePromise);
    console.log("[ContentPayPay]modalStateValue.data.showForm==>",modalStateValue.data.showForm);
    console.log("[ContentPayPay]modalStateValue==>", modalStateValue);

    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentPayPay]languageResource==>", languageResource);




    ////////////////////////////////
    //  背面でストライプを組み立て全て組み立ったら表示する
    if(modalStateValue.data.showForm){
        console.log("[ContentPayPay]ContentStripeDisplay==>grid",);
        ContentStripeDisplay = 'grid'
    }else{
        console.log("[ContentPayPay]ContentStripeDisplay==>hidden",);
        // ContentStripeDisplay = 'hidden'
        ContentStripeDisplay = 'grid'
    }
    //  背面でストライプを組み立て全て組み立ったら表示する
    ////////////////////////////////
    
    return (
    <>
        {
            modalStateValue.data.showForm
            ?   //  全て組み立て終わったらローディング非表示
            <></>
            :   //  組み立て中は背面でhiddenの状態で<Loading/>表示
            <></>
            // <Loading/>
            
        }
        
        <div id="ContentStripe" className={`w-full ${ContentStripeDisplay} sm:grid-cols-4 gap-2 sm:gap-4 justify-center items-center h-fit`}>
            <div id="ElementsWrap" className="sm:col-span-4">
                <p className="py-2">くるくるしながらURL生成</p>
                <p className="py-2">生成できたらボタンを活性化</p>
                <p className="py-2">リダイレクトで戻ってきた時にこのブラウザではない可能性があるので、案内のページを用意する</p>
                <p className="py-2">リダイレクトで戻ってきた時に同じアカウントでログインしているブラウザかどうか必ず確認する</p>
            </div>
        </div>
    </>
    )
}