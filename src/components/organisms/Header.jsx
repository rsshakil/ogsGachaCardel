import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, NavLink, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { elmState } from "../../store/recoil/elmState";
import { UseWindowDimensions } from "../../functions/UseWindowDimensions";
import { useLocation } from "react-router-dom";
import CountUp, { useCountUp } from 'react-countup';
import { productListStateMultilingual } from "../../store/recoil/productListStateMultilingual";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";
import { pointState } from "../../store/recoil/pointState";
import { displayState } from "../../store/recoil/displayState";
import { modalState } from "../../store/recoil/modalState";
import { pageLoaderState } from "../../store/recoil/pageLoaderState";
import { ceilingGaugeState } from "../../store/recoil/ceilingGaugeState";
import { accessState } from "../../store/recoil/accessState";
import _ from "lodash";
import Loader from "../atoms/Loading/TherapistLoader";
import { settingsState } from "../../store/_trash/settingsState";


import Plus from "../atoms/img/Plus.svg";
import { MenuButtonSub } from "../atoms/buttons/trash/MenuButtonSub";
import { BurgerMenu } from "../molecules/headers/BurgerMenu";
import '../../css/Header.css';
import {useIntl} from 'react-intl'
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';
import useCsrfToken from '../../hooks/useCsrfToken'
import session from '../../store/recoil/sessionState'
import { headersParam } from '../../functions/commonFunctions';
import useSessionCheck from '../../hooks/useSessionCheck'
import useSound from 'use-sound';
import countries from "../../store/dictionary/countries";
import { debugState } from "../../store/recoil/debugState";


let counterV = 0;
export const Header = () => {
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [pageLoadiongStateValue, setPageLoadiongState] = useRecoilState(pageLoaderState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [ceilingGaugeStateValue, setCeilingGaugeState] = useRecoilState(ceilingGaugeState);
    const [accessStateValue, setAccessState] = useRecoilState(accessState);
    const intl = useIntl()
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [ProductListStateMultilingual, setProductList] = useRecoilState(productListStateMultilingual);
    const [productListStateSingle, setProductListSingle] = useRecoilState(productListState);
    const [cailingStarValue,SetCailingStarValue] = useState("");
    const [{ loading:sessionLoading, error, state }, setValid] = useRecoilState(session)
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    const [open, setOpen] = useState(false);
    const [enableCountUp, setEnableCountUp] = useState(false);

    // console.log('[Header]counting re-renders', (counterV += 1));
    //  ここはルーターの外側でもあるのでrecoilから取得する
    // console.log("[Header]accessStateValue.pageParam.id=======>",accessStateValue.pageParam?.id);
    const id = accessStateValue.pageParam?.id;

    console.log('>>>>>>', enableCountUp, pointStateValue)
    
    // console.log("[Header]id=======>",id);
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const processing = useRef(false);

    // 画面の幅　最新情報取得
    const { width, height } = UseWindowDimensions();
    //　エレメント設定の読み込み
    const [elmStateValue, setElmState] = useRecoilState(elmState);
    //headerの高さを取得する
    const elm = useRef(null);
    //headerの高さを保存する
    useEffect(() => {
        setElmState((prevState) => ({
            ...prevState,
            headerHeight: elm.current.offsetHeight,
        }))
    }, [location, width, height]);

    useEffect(() => {
        if(pointStateValue.start != pointStateValue.end) {
            setEnableCountUp(true);
        }
    }, [pointStateValue.start])

    // useEffect(() => {
    //     if(pointStateValue.start > 0) {
    //         setEnableCountUp(true);
    //     }
    // }, [pointStateValue.end])
      
    //  ユーザーに割り当てられた利用言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[Header]languageResource==>", languageResource)

    // let translationObj;
    /////////////////////////////////////
    //  Class定義
    const headerClass = 'fixed top-0 w-full h-12 sm:h-16 grow-0 flex justify-between flex-row z-20';
    const headerLeftClass  = 'flex-none header-left-side  right-side-trapezoid_ ';
    const headerRightClass = 'flex-none header-right-side left-side-trapezoid_  ';
    const logoClass = 'logo-img 2xl:w-64 my-3 sm:mt-3 sm:mb-4 md:mt-2.5 md:mb-5 ml:mt-2.5 ml:mb-5 lg:mt-2.5 lg:mb-5 xl:mt-2.5 xl:mb-5 2xl:mt-2.5 2xl:mb-5 px-2 sm:pl-4 sm:pr-3 md:pl-7 md:pr-4 ml:pl-12 ml:pr-5 lg:pl-16 lg:pr-7 xl:pl-19 xl:pr-9 2xl:pl-10 2xl:pr-24';
    const counterClass = 'min-w-[1rem] mx-2 DSEG7-area justify-self-center font-DSEG7ModernMini-Bold-Custom font-bold text-xs xs:text-base sm:text-2xl md:text-2xl ml:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl';
    const headerCenterClass = 'center-panel grow flex justify-center items-center pb-2 shiny';
    const pointDisplayClass = 'flex flex-row justify-center items-center text-white cursor-pointer';
    //  Class定義
    /////////////////////////////////////

    /////////////////////////////////
    //  音源素材の定義
    const [countUpCoin, { stopHit1 }] = useSound('/sound/countUpCoin.mp3',{ 
        id: 'countUpCoin',
        volume: 0.35,
        html5 : false,
    });
    const [cailingDisplayChange, { stopcailingDisplayChange }] = useSound('/sound/cailingDisplayChange.mp3',{ 
        id: 'cailingDisplayChange',
        volume: 0.4,
        html5 : false,
    });
    //  音源素材の定義
    /////////////////////////////////


    /////////////////////////////////////
    // APIからの返却が単言語の場合
    // translationObj = ProductListStateSingle;
/*
    translationObj = productListStateSingle.find((row) => function() {
        if (row.gachaId == id)  {
            return row;
        }
    }) 
*/
    // let productData = productListStateSingle.find((row) => (row.gachaId == id)) 
    let productData = productListStateSingle[id] || {}
    /////////////////////////////////////
    // 商品の特定
    // let translationProduct;
    // translationProduct = productList[id];
    // console.log("[Header]translationProduct==>", translationProduct)

    /////////////////////////////////////
    // 天井数の格納
    let gachaLimitCount = 0;
    if(id){
        // console.log("[Header]translationProduct.gachaLimitCount==>", productData)
        gachaLimitCount = productData.gachaLimitCount;
    }else{
    }
    // console.log("[Header]gachaLimitCount=======>",gachaLimitCount);
    // 天井数の格納
    /////////////////////////////////////

    /////////////////////////////////////
    // 残数の格納
    let gachaRemainingCount = 0;
    if(id){
        // console.log("[Header]translationProduct.gachaLimitCount==>", productData)
        gachaRemainingCount = productData.gachaRemainingCount;
    }else{
    }
    // console.log("[Header]gachaLimitCount=======>",gachaLimitCount);
    // 残数の格納
    /////////////////////////////////////

    /////////////////////////////////////
    // 天井数パネルの表示非表示
    let ceilingGaugePanel = 'ceiling-gauge';
    let path = displayStateValue.pagePath;
    useEffect(() => {
        if(path !== 'pack'){
            ceilingGaugePanel  = 'hidden';
        }else if(gachaLimitCount === 0){
            //  天井上数が0の時はパネルを非表示にする
            ceilingGaugePanel  = 'hidden';
        }else if(gachaRemainingCount === 0){
            //  残数が0の時はパネルを非表示にする
            ceilingGaugePanel  = 'hidden';
        }else{
            // console.log("[Header]displayStateValue.pagePath=>else==>",path);
            ceilingGaugePanel = 'ceiling-gauge';
        }
        // console.log("[Header]ceilingGaugePanel===>",ceilingGaugePanel);
        setDisplayState((prevState) => ({
            ...prevState,
            ceilingGaugeClass: ceilingGaugePanel,
            
        }))
    }, [path]);
    // 天井数パネルの表示非表示
    /////////////////////////////////////

    /////////////////////////////////////
    // 天井数の演出確定
    // pointの変化に反応して差分を計算
    // 実際には都度APIから取得してrecoilを更新してからこの下の仕組みが始まる
    let updatePointValue;
    let blinkClass  = "";
    useEffect(() => {
        // console.log("[Header]useuseEffect")
        updatePointValue = pointStateValue.end - pointStateValue.start;
        //  console.log("[Header]updatePointValue=>",updatePointValue);
        if (updatePointValue <= 0) {
            // console.log("[Header]updatePointValue=> [< 1])",updatePointValue);
            blinkClass = "";
        } else if (updatePointValue < 100) {
            // console.log("[Header]updatePointValue=> [< 100])",updatePointValue);
            blinkClass = "blink-white";
        } else if (updatePointValue < 1000) {
            // console.log("[Header]updatePointValue=> [< 1000])",updatePointValue);
            blinkClass = "blink-blue";
        } else if (updatePointValue < 10000) {
            // console.log("[Header]updatePointValue=> [< 10000])",updatePointValue);
            blinkClass = "blink-red";
        } else if (updatePointValue >= 10000) {
            // console.log("[Header]updatePointValue=> [>= 10000])",updatePointValue);
            blinkClass = "blink-gold";
        }
        // console.log("[Header]blinkClass=>",blinkClass);
        // 差分に応じてblinkのクラスをスイッチ
        setPointState((prevState) => ({
            ...prevState,
            blinkClass: blinkClass,
        }))
        reset()
    }, [pointStateValue.end]);



    // カウントアップのイベント連鎖
    const [blink, setBlink] = useState(false);
    const onStart = (e) => {
        setBlink(false);
        let startEndDifference = pointStateValue.end - pointStateValue.start;
        console.log("[Header]onStart=>",e,start);
        console.log("[Header]start:end=>",pointStateValue.start,pointStateValue.end);
        console.log("[Header]startEndDifference=>",startEndDifference);
        //  差がプラスであれば鳴動
        if(startEndDifference > 0){
            countUpCoin()
        }
    }
    const onEnd = (e) => {
        setPointState((prevState) => ({
            ...prevState,
            start: pointStateValue.end
        }))

        if(!enableCountUp) return;

        setBlink(true);
        setTimeout(() => {
            setBlink(false);
        }, 3000);
        console.log("[Header]onEnd=>",e);
    }
    const onUpdate = () => {
        console.log("[Header]onUpdate=>",blink);
    }
    const onComplete = () => {
        console.log("[Header]onComplete=>",blink);
        // do your stuff here
        return { shouldRepeat: false }
    }

    // カウントアップフック
    const { start, pauseResume, reset, update } = useCountUp({
        ref: 'counter',
        start: pointStateValue.start,
        end: pointStateValue.end,
        enableScrollSpy: false,
        preserveValue: true,
        scrollSpyDelay: 1000,
        delay: 0,
        duration: 2,
        suffix: "",
        onReset: () => console.log('[Header]Reseted!'),
        onUpdate: (e) => onUpdate(e),
        onPauseResume: () => console.log('[Header]Paused or resumed!'),
        onStart: (e) => onStart(e),
        onComplete: (e) => onComplete(e),
        onEnd: (e) => onEnd(e)
    });

    /////////////////////////////////////
    // 天井の星の数計算
    // console.log("[Header]useParams.id=======>",id);
    // 
    ///////////////////////////////
    // set fron API
    ///////////////////////////////
    let ceilingNum;
    let personalNumber = (productData?.gachaMyLimitCount)?Number(productData.gachaMyLimitCount):0;
    // let ceilingLevel;
    let ceilingRate;
    let ceilingStar= "☆☆☆☆☆";
    let blinking = '';
    let rainbow = '';
    //  [開発用]ユーザー天井の仮生成
    // useEffect(() => {
    //     personalNumber = Math.floor(Math.random() * (300 - 1) + 1);
    // }, []);
    // personalNumber = Math.floor(Math.random() * (300 - 1) + 1);
    // console.log("[Header]personalNumber", personalNumber)
    // gachaRemainingCount = 2;
    ceilingNum = gachaLimitCount;
    // ceilingNum = 300; // set dummy
    ///////////////////////////////
    ///////////////////////////////
    // rate calculation
    ///////////////////////////////
    // console.log("[Header]ceilingRate1", personalNumber)
    ceilingRate = Math.floor(personalNumber / ceilingNum * 100);
    // console.log("[Header]ceilingRate2", ceilingRate)
    // ceilingLevel = Math.floor(ceilingRate / 20)*20;
    // console.log("[Header]ceilingLevel", ceilingLevel)
    if(ceilingRate === 0){
        ceilingStar = "☆☆☆☆☆"
        blinking = '';
        rainbow = '';
    //////////////////////////////////////////
    //  ここから天井数が5の時の特別なルール
    }else if(ceilingNum === 5){
        if(personalNumber === 1){
            ceilingStar = "★☆☆☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 2){
            ceilingStar = "★★☆☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 3){
            ceilingStar = "★★★☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 4){
            ceilingStar = "★★★★★"
            blinking = '';
            rainbow = 'rainbow';
        }
    //  ここから天井数が5の時の特別なルール
    //////////////////////////////////////////
    //////////////////////////////////////////
    //  ここから天井数が6の時の特別なルール
    }else if(ceilingNum === 6){
    if(personalNumber === 1){
        ceilingStar = "★☆☆☆☆"
        blinking = '';
        rainbow = '';
    }else if(personalNumber === 2){
        ceilingStar = "★★☆☆☆"
        blinking = '';
        rainbow = '';
    }else if(personalNumber === 3){
        ceilingStar = "★★★☆☆"
        blinking = '';
        rainbow = '';
    }else if(personalNumber === 4){
        ceilingStar = "★★★★☆"
        blinking = '';
        rainbow = '';
    }else if(personalNumber === 5){
        ceilingStar = "★★★★★"
        blinking = '';
        rainbow = 'rainbow';
    }
    //  ここから天井数が6の時の特別なルール
    //////////////////////////////////////////
    //////////////////////////////////////////
    //  ここから天井数が7の時の特別なルール
    }else if(ceilingNum === 7){
        if(personalNumber === 1){
            ceilingStar = "★☆☆☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 2){
            ceilingStar = "★★☆☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 3){
            ceilingStar = "★★★☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 4){
            ceilingStar = "★★★★☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 5){
            ceilingStar = "★★★★★"
            blinking = 'blinking';
            rainbow = '';
        }else if(personalNumber === 6){
            ceilingStar = "★★★★★"
            blinking = '';
            rainbow = 'rainbow';
        }
    //  ここから天井数が7の時の特別なルール
    //////////////////////////////////////////
        //////////////////////////////////////////
    //  ここから天井数が8の時の特別なルール
    }else if(ceilingNum === 8){
        if(personalNumber === 1){
            ceilingStar = "★☆☆☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 2){
            ceilingStar = "★★☆☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 3){
            ceilingStar = "★★★☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 4){
            ceilingStar = "★★★★☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 5){
            ceilingStar = "★★★★★"
            blinking = 'blinking';
            rainbow = '';
        }else if(personalNumber === 6){
            ceilingStar = "★★★★★"
            blinking = 'blinking';
            rainbow = '';
        }else if(personalNumber === 7){
            ceilingStar = "★★★★★"
            blinking = '';
            rainbow = 'rainbow';
        }
    //  ここから天井数が8の時の特別なルール
    //////////////////////////////////////////
    //////////////////////////////////////////
    //  ここから天井数が9の時の特別なルール
    }else if(ceilingNum === 9){
        if(personalNumber === 1){
            ceilingStar = "★☆☆☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 2){
            ceilingStar = "★★☆☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 3){
            ceilingStar = "★★★☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 4){
            ceilingStar = "★★★★☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 5){
            ceilingStar = "★★★★★"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 6){
            ceilingStar = "★★★★★"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 7){
            ceilingStar = "★★★★★"
            blinking = 'blinking';
            rainbow = '';
        }else if(personalNumber === 8){
            ceilingStar = "★★★★★"
            blinking = '';
            rainbow = 'rainbow';
        }
    //  ここから天井数が9の時の特別なルール
    //////////////////////////////////////////
    //////////////////////////////////////////
    //  ここから天井数が10の時の特別なルール
    }else if(ceilingNum === 10){
        if(personalNumber === 1){
            ceilingStar = "★☆☆☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 2){
            ceilingStar = "★★☆☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 3){
            ceilingStar = "★★★☆☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 4){
            ceilingStar = "★★★★☆"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 5){
            ceilingStar = "★★★★★"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 6){
            ceilingStar = "★★★★★"
            blinking = '';
            rainbow = '';
        }else if(personalNumber === 7){
            ceilingStar = "★★★★★"
            blinking = 'blinking';
            rainbow = '';
        }else if(personalNumber === 8){
            ceilingStar = "★★★★★"
            blinking = 'blinking';
            rainbow = '';
        }else if(personalNumber === 9){
            ceilingStar = "★★★★★"
            blinking = '';
            rainbow = 'rainbow';
        }
    //  ここから天井数が10の時の特別なルール
    //////////////////////////////////////////
    }else if(ceilingRate < 10){
        ceilingStar = "★☆☆☆☆"
        blinking = '';
        rainbow = '';
    }else if(ceilingRate < 30){
        ceilingStar = "★★☆☆☆"
        blinking = '';
        rainbow = '';
    }else if(ceilingRate < 50){
        ceilingStar = "★★★☆☆"
        blinking = '';
        rainbow = '';
    }else if(ceilingRate < 70){
        ceilingStar = "★★★★☆"
        blinking = '';
        rainbow = '';
    }else if(ceilingRate < 90 && ceilingNum - personalNumber < 3){
        ceilingStar = "★★★★★"
        blinking = 'blinking';
        rainbow = '';
    }else if(ceilingRate < 90){
        ceilingStar = "★★★★★"
        blinking = '';
        rainbow = '';
    }else if(ceilingRate < 95 && ceilingNum - personalNumber < 2){
        ceilingStar = "★★★★★"
        blinking = 'rainbow';
        rainbow = '';
    }else if(ceilingRate < 95){
        ceilingStar = "★★★★★"
        blinking = 'blinking';
        rainbow = '';
    }else if(ceilingRate < 101){
        ceilingStar = "★★★★★"
        blinking = '';
        rainbow = 'rainbow';
    }

    // console.log("[Header]ceilingStar", ceilingStar)
    useEffect(() => {
        console.log("[Header]ceilingStar", ceilingStar)
        setCeilingGaugeState((prevState) => ({
            ...prevState,
            ceilingStarText: ceilingStar,
        }))
        SetCailingStarValue(ceilingStar);
    }, [path,ceilingRate]);

    useEffect(() => {
        // console.log("ceilingStarceilingStar",ceilingStar)
        setCeilingGaugeState((prevState) => ({
            ...prevState,
            ceilingStarText: ceilingStar,
            ceilingtest1StarText: "ceilingStar",
        }))
        // console.log("ceilingStarceilingStarceilingGaugeStateValue",ceilingGaugeStateValue)
        SetCailingStarValue(ceilingStar);
    }, []);
    //  天井パネル変動時SE
    useEffect(() => {
        if(ceilingRate !== 0 && !isNaN(ceilingRate)){
            console.log("[Header]天井パネル変動=>ceilingStar",ceilingStar);
            console.log("[Header]天井パネル変動=>blinking",blinking);
            console.log("[Header]天井パネル変動=>rainbow",rainbow);
            console.log("[Header]天井パネル変動=>ceilingRate",ceilingRate);
            cailingDisplayChange()
        }
    }, [ceilingStar,blinking,rainbow]);

    // console.log("[Header]ceilingGaugeStateValue", ceilingGaugeStateValue)
    // console.log("[Header]path", path)
    /////////////////////////////////////
    // ポイントチャージ起動
    async function doCharge(e) {
        // console.log("[Header]charge e==>", e);
        //sessionCheck if success then show Charge Modal else show login modal

        setOpen(false)
        let openData = e;
        //loader
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            // data: {}
        }))

        // check-sessionに問題なし
        if (await getSessionCheck(doCharge,e)) {
            // Need to check user country of residence
            let response;
            try{
                const config = {
                    method: queries.getMethod,
                    url: queries.baseURL + queries.readUser + "?l=" + UserStateObj.language
                }
                response = await instance.request(config);
            }catch(err){
                if(err){
                    // console.log("Api error",err);
                    const { errorCode } = err.response?.data || '';
                    let mType ="error";
                    let mData = {
                        title: "",
                        body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })
                    };
                    if(errorCode===101){
                        mType = "Login"
                        mData = {}
                    }
                    //show error modal when api error occured
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: mType,
                        // mode: "",
                        data: mData
                    }))
                }
            }

            if (!response.data.user?.userCountryId) {
                let response;
                try{
                    const config = {
                        method: queries.getMethod,
                        url: queries.baseURL + queries.userCountryRead
                    }
                    response = await instance.request(config);
                }catch(err){
                    if(err){
                        // console.log("Api error",err);
                        const { errorCode } = err.response?.data || '';
                        console.log("errorCode",errorCode);
                        let mType ="error";
                        let mData = {
                            title: "",
                            body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })
                        };
                        if(errorCode===101){
                            mType = "Login"
                            mData = {}
                        }
                        //show error modal when api error occured
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: mType,
                            // mode: "",
                            data: mData
                        }))
                    }
                }
                console.log('@@@@@@ response',response);
                if(response){
                    const { status } = response || '';
                    console.log("countryAPI response",response);
                    if (status == 200) {
                        //updateUser & displaySuccessModal
                        let countrieNameIndexVal = countries.findIndex((userCountry) => userCountry.countryId === response.data.userCountryId);
                        if(countrieNameIndexVal>=0 && response.data.userCountryId){
                            setUserState((prevState)=>({
                                ...prevState,
                                countryOfResidence:response.data.userCountryId,
                            }))
                            setModalState((prevState) => ({
                                ...prevState,
                                BaseModalOpen: true,
                                modalType: 'CountryOfResidence',
                                data : openData
                            }))
                        }else{
                            //DisplayResidenceSelectModal
                            setModalState((prevState) => ({
                                ...prevState,
                                BaseModalOpen: true,
                                modalType: 'CountryofResidenceRegistration',
                                mode: "showSmsAuthModal",
                                data : {
                                    redirectToModal: {
                                        BaseModalOpen: true,
                                        modalType: 'charge',
                                        mode: "purchase",
                                        data: {}
                                    }
                                }
                            }))
                        }
                    }else{
                        //displayErrorModal
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: "error",
                            // mode: "",
                            data: {
                                title: "",
                                body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })
                            }
                        }))
                    }
                }

                return;
            }

            //SessionCheckSuccess display ChargeModal
            try {
                const config = {
                    method: queries.getMethod,
                    url: queries.baseURL + queries.readPoint,
                }
    
                const response = await instance.request(config);
                console.log('response', response)
                if (response.status == 200) {
                    const {records = {}} = response.data || {};

                    setUserState(prevState => ({...prevState, myChargeList : records}))

                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'charge',
                        mode: "purchase",
                        data: {}
                    }))
                }
            } catch (err) {
                console.log("err >>>", err);

                let mData = {
                    title: "",
                    body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" }),
                };

                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: "error",
                    data: mData
                }))
                
            } 
        }
    }
// console.log("[Header]pointStateValue is or not",pointStateValue)

    return (
    <>
        <header ref={elm} className={`${headerClass}`}>
            <div id="headerLeft" className={`${headerLeftClass}`}>
                <NavLink className="text-white text-base" activeClassName="top" to="">
                    <figure className="w-full h-full text-center">
                        <img src="/logo.png" className={`${logoClass}`} alt=""></img>
                    </figure>
                </NavLink>
            </div>
            <div id="headerCenter" className={`${headerCenterClass}`}>
                <div id="ceiling-gauge" className={`${displayStateValue.ceilingGaugeClass} `}>
                    <div className="flex flex-row justify-center items-center align-middle h-[19px] sm:h-[25px]">
                        <p className="text-right text-[8px] sm:text-sm leading-[6px] font-Noto self-center align-middle">
                            {intl.formatMessage({ id: 'ceiling' })}
                        </p>
                        <p className={`${blinking} ${rainbow} text-xs sm:text-sm leading-[19px] font-Noto align-middle`}>
                            {/* {ceilingGaugeStateValue?.ceilingStarText} {ceilingGaugeStateValue?.ceilingtest1StarText}  */}
                            &nbsp;{cailingStarValue}&nbsp;
                        </p>
                        <p className="text-left text-xs sm:text-base leading-[19px] align-middle">{personalNumber}</p>
                        <p className="text-left text-[8px] sm:text-sm leading-[19px] align-middle">/{ceilingNum}</p>
                    </div>
                </div>
                <div onClick={(e) => doCharge()} id="pointDisplay" className={`${pointDisplayClass}`}>
                    <div className="orb"><div className="light"></div></div>
                    <div id="counter" className={`${counterClass} ${blink ? pointStateValue.blinkClass : ""}`}>
                       <CountUp />
                    </div>
                    <div className="font-Noto relative text-xs -bottom-0.5 -left-3">pt</div>
                </div>
            </div>
            <div id="headerRight" className={`${headerRightClass}`}>
                
            </div>
            <BurgerMenu />
        </header>
            </>
        )
};
