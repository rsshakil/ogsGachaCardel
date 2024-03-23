import React, { useRef, useState, useEffect, Suspense } from "react";
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

let testTimer;

export const ContentStripe = () => {
    const intl = useIntl()
    const [ modalStateValue, setModalState ] = useRecoilState(modalState);
    const [ UserStateObj, setUserState ] = useRecoilState(userState);
    const [ stripePromise, setStripePromise ] = useState(null);
    const [ clientSecret, setClientSecret ] = useState('');
    const [ isTimeout, setIsTimeout ] = useState(false);

    console.log("[ContentStripe]stripePromise==>", stripePromise);
    console.log("[ContentStripe]modalStateValue.data.showForm==>",modalStateValue.data.showForm);
    console.log("[ContentShowPrize]modalStateValue==>", modalStateValue);

    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentShowPrize]languageResource==>", languageResource);

    ////////////////////////////////
    //  classの定義
    let pointExchangeStyleFront = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointExchangeStyleBack = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointUnitStyleFront = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    let pointUnitStyleBack = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    let ContentStripeDisplay = 'hidden';
    //  classの定義
    //
    ////////////////////////////////



    let isSlected = '';
    let userChargeKey = modalStateValue.data.key;
    ////////////////////////////////
    //  clearTimeout(testTimer)
    useEffect(() => {
        clearTimeout(testTimer)
    }, [modalStateValue.modalType]);
    //  clearTimeout(testTimer)
    ////////////////////////////////

    ////////////////////////////////
    //  コーンポーネント読み込み時の処理
    useEffect(() => {
        console.log("[ContentStripe]useEffect[]");

        ////////////////////////////////
        //  利用不能の時のタイムアウト離脱
        //	テスト用タイマーリセット
		clearTimeout(testTimer)
        setIsTimeout(false)
        testTimer = setTimeout(() => {
            console.log("[ContentStripe]タイムアウト離脱");
            //  タイムアウト後の情報が古いのでフラグだけ立てて鮮度高い情報で処理する
            setIsTimeout(true)
            if(modalStateValue.modalType === 'Stripe'){
                //  他のモーダルにいるときにタイムアウトしないように制限
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'TimeoutStripe',
                }))
            }else{

            }

        }, 30000);
        //  利用不能の時のタイムアウト離脱
        ////////////////////////////////
        fetch(queries.paymentURL + queries.readConfig, {
            method: 'get',
            headers: headersParam(),
            credentials: 'include',
            mode: 'cors',
        })
        .then(async (r) => {
            const { publishableKey } = await r.json();
            setStripePromise(loadStripe(publishableKey));
            
        })
        .catch(error => console.error(error));
/*
        axios.get(queries.paymentURL + queries.readConfig, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            crossDomain: true
        })
        .then(async (r) => {
            const { publishableKey } = await r.json();
            setStripePromise(loadStripe(publishableKey));
        })
        .catch(error => console.error(error));
*/
/*
        fetch(queries.paymentURL + queries.readConfig).then(async (r) => {
            const { publishableKey } = await r.json();
            setStripePromise(loadStripe(publishableKey));
        });
*/
        // fetch(queries.paymentURL + queries.config, {
        //     method: "GET",
        //     credentials: "include",
        //     headers: headers,
        //     mode: "cors",
        // }).then(async  (r) => {
        //     const { publishableKey } = await r.json();
        //     setStripePromise(loadStripe(publishableKey));
        // });
    }, []);
    //  コーンポーネント読み込み時の処理
    ////////////////////////////////

    ////////////////////////////////
    //  <Elements>が利用可能になったかどうかの管理
    useEffect(() => {
        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                stripePromise : stripePromise,
                clientSecret : clientSecret,
            }
        }))
    }, [clientSecret,stripePromise]);
    //  <Elements>が利用可能になったかどうかの管理
    ////////////////////////////////

    ////////////////////////////////
    //  modalStateValue.data.chargePointの変化に対応する処理
    useEffect(() => {
        // console.log("///======modalStateValue", modalStateValue);
        // console.log("///======modalStateValue.data", modalStateValue.data);
        // console.log("///======modalStateValue.data.chargePoint", modalStateValue.data.chargePoint);
        // Create PaymentIntent as soon as the page loads
        // 
        // fetch(queries.createPayment + "?cpp=" + modalStateValue.data.chargePoint + "&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE3MDA3OTI3NzksImV4cCI6MTczMjMyODc3OX0.wWtx-h1HirwIAEDCWCnK5YG2HU28ZZkO4SYZhmYsxgg")
        //  トークンが存在する時のみリクエストする
        if(localStorage.getItem("token")){
            fetch(queries.paymentURL + queries.createPayment + "?cpp=" + modalStateValue.data.chargePoint + "&token=" + localStorage.getItem("token"), {
                method: 'get',
                headers: headersParam(),
                credentials: 'include',
                mode: 'cors',
            })
            .then((res) => res.json())
            .then(({clientSecret}) => setClientSecret(clientSecret));
        }

        }, [modalStateValue.data.chargePoint]);
    //  modalStateValue.data.chargePointの変化に対応する処理
    ////////////////////////////////

    console.log("[ContentStripe]clientSecret==>", clientSecret);
    console.log("modalStateValue", modalStateValue);



    ////////////////////////////////
    //  stripePromise clientSecret PaymentElementReady==>３種の神器チェック
    //
    useEffect(() => {
        console.log("[CheckoutForm]modalStateValue.data.isLoading==>",modalStateValue.data.isLoading);
        console.log("[CheckoutForm]modalStateValue.data.message==>",modalStateValue.data.message);
        console.log("[CheckoutForm]modalStateValue.data.stripe==>",modalStateValue.data.stripe);
        console.log("[CheckoutForm]modalStateValue.data.elements==>",modalStateValue.data.elements);
        console.log("[CheckoutForm]modalStateValue.data.stripePromise==>",modalStateValue.data.stripePromise);
        console.log("[CheckoutForm]modalStateValue.data.clientSecret==>",modalStateValue.data.clientSecret);
        console.log("[CheckoutForm]modalStateValue.data.PaymentElementReady❗️❗️==>",modalStateValue.data.PaymentElementReady);
        if(modalStateValue.data.stripePromise && modalStateValue.data.clientSecret && modalStateValue.data.PaymentElementReady){
            console.log("[CheckoutForm]stripePromise clientSecret PaymentElementReady==>３種の神器揃った",);
            //  タイマー停止
            clearTimeout(testTimer)
            //  表示フラグ
            setModalState((prevState) => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    // showForm : true
                }
            }))
        }else{
            console.log("[CheckoutForm]stripePromise clientSecret PaymentElementReady==>３種の神器揃っていない",);
        }
	}, [modalStateValue.data]);
    //  stripePromise clientSecret PaymentElementReady==>３種の神器チェック
    ////////////////////////////////

    ////////////////////////////////
    //  背面でストライプを組み立て全て組み立ったら表示する
    if(modalStateValue.data.showForm){
            console.log("[CheckoutForm]ContentStripeDisplay==>grid",);
            ContentStripeDisplay = 'grid'
    }else{
        console.log("[CheckoutForm]ContentStripeDisplay==>hidden",);
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
            <Headline
                type="h2"
                headlineText={intl.formatMessage({ id: 'Points_to_purchase' })}
                headlineClass="sm:col-span-4 font-bold text-center text-base font-Prompt text-white flex flex-col py-4"
            />

            <PointCard
                data={{
                    key : userChargeKey,
                    type : 'ShowGiftBox',
                    userChargeUUID : userChargeKey,
                    //  選択済みかどうか
                    isSlected : isSlected,


                    itemOuterAreaStyle : 'itemOuter sm:col-start-2 sm:col-span-2 relative aspect-[3/2] w-full overflow-hidden',
                    itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                    itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                    //  header
                    headerWrapStyleFront : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                    headerWrapStyleBack : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                    addressOrderStyleFront : 'rarity text-right text-sm font-black font-Noto',
                    addressOrderStyleBack : 'rarity text-right text-sm font-black font-Noto',
                    addressOrderTxtFront : intl.formatMessage({ id: 'Purchase_points' }) ,
                    addressOrderTxtleBack : intl.formatMessage({ id: 'Purchase_points' }) ,
                    
                    //  content
                    contentWrapStyleFront : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                    contentWrapStyleBack : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                    //  name                    
                    nameWrapStyleFront : 'point-exchange grow flex items-center justify-center',
                    nameWrapStyleBack : 'point-exchange grow flex items-center justify-center',
                    nameStyleFront : 'text-lg xs:text-4xl sm:text-5xl font-black font-Roboto',
                    nameStyleBack : 'text-lg xs:text-4xl sm:text-5xl font-black font-Roboto',
                    nameTxtFront : UserStateObj.myChargeList[userChargeKey].userChargePoint,
                    nameTxtBack : UserStateObj.myChargeList[userChargeKey].userChargePoint,
                    //  phone
                    phoneStyleFront : 'rarity leading-5 text-canter text-base font-black font-Libre self-center',
                    phoneStyleBack : 'rarity leading-5 text-canter text-base font-black font-Libre self-center',
                    phoneTxtFront : UserStateObj.myChargeList[userChargeKey].userChargeName + ' ' + intl.formatDate(new Date(), {year: 'numeric',month: '2-digit',day: '2-digit',hour: '2-digit', minute:'2-digit',}),
                    phoneTxtBack : UserStateObj.myChargeList[userChargeKey].userChargeName + ' ' + new Date().toLocaleString(),
                    
                    //  address
                    // addressWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                    // addressWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                    // addressTextFront : UserStateObj.myChargeList[key].userShippingZipcode + " " + UserStateObj.myChargeList[key].userShippingAddress,
                    // addressTextBack : UserStateObj.myChargeList[key].userShippingZipcode + " " + UserStateObj.myChargeList[key].userShippingAddress,
                    //  ribbon
                    ribbonStyleFront : 'ribbon font-Roboto',
                    ribbonStyleBack : 'ribbon ribbon-green font-Roboto',
                    ribbonTextFront : '',
                    ribbonTextBack : intl.formatMessage({ id: 'select' }) ,
                    //  bottomRibbon　裏表同じものでOK
                    // bottomRibbonStyleFront : 'bottom-ribbon font-Roboto',
                    // bottomRibbonStyleBack : 'bottom-ribbon font-Roboto',
                    // // bottomRibbonTextFront : unable2ShipRibbonText,
                    // // bottomRibbonTextBack : unable2ShipRibbonText,

                }}
            />

            <Headline
                type="h2"
                headlineText={intl.formatMessage({ id: '決済情報入力' })}
                headlineClass="sm:col-span-4 font-bold text-center text-base font-Prompt text-white flex flex-col py-4"
            />

            <div id="ElementsWrap" className="sm:col-span-4">
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret : clientSecret}}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    </>
    )
}