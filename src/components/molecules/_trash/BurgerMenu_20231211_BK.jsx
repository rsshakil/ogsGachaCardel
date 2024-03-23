import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../store/recoil/modalState";
import { userState } from "../../../store/recoil/userState";
import { pointState } from "../../../store/recoil/pointState";
import { debugState } from "../../../store/recoil/debugState";
// import { historyState } from "../../../store/recoil/historyState";
import { gachaHistoryState } from "../../../store/recoil/gachaHistoryState";
import { useNavigate,useSearchParams,useParams } from 'react-router-dom';
import { elmState } from "../../../store/recoil/elmState";
import { UseWindowDimensions } from "../../../functions/UseWindowDimensions";
import { useLocation } from "react-router-dom";
import { slide as Menu ,isOpen} from 'react-burger-menu'
import '../../../css/burger-menu.css';
import {useIntl} from 'react-intl'
import { productListState } from "../../../store/recoil/productListState";
import { testingState } from "../../../store/recoil/testingState";
import * as queries from "../../../restapi/queries";
import { instance } from '../../../services/axios.js';
import useCsrfToken from '../../../hooks/useCsrfToken'
import useSessionCheck from '../../../hooks/useSessionCheck'
import session from '../../../store/recoil/sessionState'
import countries from '../../../store/dictionary/countries';
  

// import checkStartValue from '../../../functions/checkStartValue';
import { headersParam } from '../../../functions/commonFunctions';

///////////////////
let anchorClass = 'py-3 px-4 block w-full cursor-pointer menu-item text-white font-Prompt hover:opacity-70 font-medium text-base';
let anchorClassDev = 'py-1 px-4 block w-full cursor-pointer menu-item text-white font-Noto hover:opacity-70 ';
let langLiClass = 'py-1.5 px-2 block cursor-pointer menu-item  text-white font-Noto';
let timer;
let translationObj;



export const apiURL =
    process.env.REACT_APP_ENV !== "production"
        ? process.env.REACT_APP_AUTH_URL_LOCALHOST
        : process.env.REACT_APP_AUTH_URL_PRODUCTION;
///////////////////

export const BurgerMenu = () => {
    const intl = useIntl();
    const [{ loading, error, state }, setValid] = useRecoilState(session)
    const [open, setOpen] = useState(false);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    const [productListArraySingle, setProductListSingle] = useRecoilState(productListState);
    translationObj = productListArraySingle;
    const [testingStateObj, setTestingState] = useRecoilState(testingState);
    const [gachaHistoryStateObj, setGachaHistoryState] = useRecoilState(gachaHistoryState);
    const navigate = useNavigate();
    const location = useLocation();
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    //  メニューの開閉制御
    function handleOnOpen(e) {
        setOpen(true)
        // console.log("[BurgerMenu]handleOnOpen==>", open)
    }
    function handleOnClose(e) {
        setOpen(false)
        // console.log("[BurgerMenu]handleOnClose==>", open)
        
    }
    function isMenuOpen(e) {
        // console.log("[BurgerMenu]isMenuOpen==>", open)
    }


    //  ログインモーダルの起動
    function openLogin(e) {
        setOpen(false)
        let modalType = 'Login';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  新規登録モーダルの起動
    function openSignUp(e) {
        setOpen(false)
        // console.log('[BurgerMenu]openSignUp=>e==>',e);
        let modalType = 'SignUp';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            // mode : openMode,
            data : openData,
        }))
    }

    async function changeLang(e) {
        console.log('[BurgerMenu]changeLang=>e==>',e);
        console.log('[BurgerMenu]changeLang=>e==>',UserStateObj);
        setOpen(false)
        setUserState((prevState) => ({
            ...prevState,
            language: e,
            userSelectLanguage: e,
        }))
        //Call api base on page if top page call product api else call product detail api

        //check page is top
        console.log("@@@@@@@@@2",location);
        // if(location.pathname==="/"){//its top page
        if(!location.pathname.includes("/pack/")){//its top page
            //call product api
            try {
                const config = {
                  method: "get",
                  url: queries.baseURL + queries.readProduct + "?l=" + e
                }
                const result = await instance.request(config);
                console.log('[App]app count up success', result?.data.gachaList)
                if(result.status==200){
                    setProductListSingle(result?.data.gachaList);
                }
              }
              catch (err) {
                console.log('[App]app count up err', err)
              }
        }else{
            //call product details api
            try {
                const id = location && location?.pathname && location.pathname.slice(location.pathname.lastIndexOf("/") , location.pathname.length).slice(1);
                console.log("gachaId",id);
                const config = {
                    method: "get",
                    url: queries.baseURL + queries.readProduct + id + "?l=" + e
                }
                const result = await instance.request(config);
                if(result.status==200){
                    const gachaIdKey = Object.keys(result?.data.response.gachaData)[0];
                    console.log(">>>>>>>>>>>>>>>>>>>> 0-5gachaIdKey",gachaIdKey);
                    console.log(">>>>>>>>>>>>>>>>>>>> 0-6gachaIdKey",result.data.response.gachaData[gachaIdKey]);
                    if(gachaIdKey){
                        setProductListSingle({...productListArraySingle,[gachaIdKey]:result.data.response.gachaData[gachaIdKey]});
                    }
                }
                
            } catch (err) {
                console.log('app count up err', err)
            }
        }
    }
    // function openInsufficientPoints(e) {
    //     // console.log('[BurgerMenu]openInsufficientPoints=>e==>',e);
    //     setOpen(false)
    //     let modalType = 'InsufficientPoints';
    //     let openData = e;
    //     setModalState((prevState) => ({
    //         ...prevState,
    //         BaseModalOpen: true,
    //         modalType: modalType,
    //         // mode : openMode,
    //         data : openData,
    //     }))
    // }
    // function openError(e) {
    //     // console.log('[BurgerMenu]openInsufficientPoints=>e==>',e);
    //     setOpen(false)
    //     let modalType = 'error';
    //     let openData = e;
    //     setModalState((prevState) => ({
    //         ...prevState,
    //         BaseModalOpen: true,
    //         modalType: modalType,
    //         // mode : openMode,
    //         data : openData,
    //     }))
    // }
    // function openGachaHistory(e) {
    //     // console.log('[BurgerMenu]openGachaHistory=>e==>',e);
    //     setOpen(false)
    //     let modalType = 'gachaHistory';
    //     let openData = e;
    //     //  API通信のためにくるくるを開始
    //     setModalState((prevState) => ({
    //         ...prevState,
    //         BaseModalOpen: true,
    //         modalType: 'Loading',
    //         // mode: "edit",
    //         // data: {}
    //     }))
    //     //  実際はタイムアウトではなくAPI通信を行う
    //     timer = setTimeout(function(){
    //         setModalState((prevState) => ({
    //             ...prevState,
    //             BaseModalOpen: true,
    //             modalType: modalType,
    //             // mode : openMode,
    //             data : openData,
    //         }))
    //     },3000)
    // }
    async function showCollection(e) {
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
        let response;
        // check-sessionに問題なし
        if (await getSessionCheck(showCollection,e)) {
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
            console.log('@@@@@@ response',response);
            if(response){
                const { status } = response || '';
                if (status == 200) {
                    //updateUser CollectionState
                    console.log('@@@@@@ response',response.data?.myCollection);
                    console.log('@@@@@@ response22',{...response.data?.myCollection});
                    setUserState((prevState)=>({
                        ...prevState,
                        waiting4Shipping:{...response.data?.myApplying},
                        myCollection:{...response.data?.myCollection},
                        myShippingAddress:{...response.data?.myShippingAddress},
                        shippingCompleted:{...response.data?.myShipping}
                    }))
                    // console.log('@@@@@@ xxxx1');
                }
                //displayCollectionModal
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'showCollection',
                    mode: "select",
                    data : openData
                }))
            }
        }
    }
    async function showCollectionV2(e) {
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
        let response;
        // check-sessionに問題なし
        if (await getSessionCheck(showCollection,e)) {
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
            console.log('@@@@@@ response',response);
            if(response){
                const { status } = response || '';
                if (status == 200) {
                    //updateUser CollectionState
                    console.log('@@@@@@ response',response.data?.myCollection);
                    console.log('@@@@@@ response22',{...response.data?.myCollection});
                    setUserState((prevState)=>({
                        ...prevState,
                        waiting4Shipping:{...response.data?.myApplying},
                        myCollection:{...response.data?.myCollection},
                        myShippingAddress:{...response.data?.myShippingAddress},
                        shippingCompleted:{...response.data?.myShipping}
                    }))
                    // console.log('@@@@@@ xxxx1');
                }
                //displayCollectionModal
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'showCollectionV2',
                    mode: "select",
                    data : openData
                }))
            }
        }
    }

    async function callUserReadApi(e,successModalType,modalMode=""){
        setOpen(false)
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            // data: {}
        }))
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
        console.log('@@@@@@ response',response);
        if(response){
            const { status } = response || '';
            if (status == 200) {
                setUserState((prevState)=>({
                    ...prevState,
                    waiting4Shipping:{...response.data?.myApplying},
                    myCollection:{...response.data?.myCollection},
                    myShippingAddress:{...response.data?.myShippingAddress},
                    shippingCompleted:{...response.data?.myShipping},
                    userEmailAddress: response.data?.user?.userEmail
                }))
            }
            //displayshowShippingAddressModal
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: successModalType,
                mode: modalMode,
                data : openData
            }))
        }
    }

    async function showWaiting4Shipping(e) {
        setOpen(false)
        // check-sessionに問題なし
        if (await getSessionCheck(showWaiting4Shipping,e)) {
            callUserReadApi(e,"showWaiting4Shipping","read");
        }
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: 'showWaiting4Shipping',
        //     mode: "read",
        //     data : openData
        // }))
    }
    async function showShippingCompleted(e) {
        setOpen(false)
        // check-sessionに問題なし
        if (await getSessionCheck(showShippingCompleted,e)) {
            callUserReadApi(e,"showShippingCompleted","read");
        }
        // setOpen(false)
        // let openData = e;
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: 'showShippingCompleted',
        //     mode: "read",
        //     data : openData
        // }))
    }
    async function showShippingAddress(e) {
        setOpen(false)
        // check-sessionに問題なし
        if (await getSessionCheck(showShippingAddress,e)) {
            callUserReadApi(e,"showShippingAddress","read");
        }
        // setOpen(false)
        // let openData = e;
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: 'showShippingAddress',
        //     // mode: "read",
        //     data : openData
        // }))
    }
    async function displayModal(e,successModalType,modalMode=""){
        setOpen(false)
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: successModalType,
            mode: modalMode,
            data: openData
        }))
    }
    async function ChangeEmailAddress(e) {
        setOpen(false)
        // check-sessionに問題なし
        if (await getSessionCheck(ChangeEmailAddress,e)) {
            callUserReadApi(e,"ChangeEmailAddress","read");
        }
        // setOpen(false)
        // let openData = e;
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: 'ChangeEmailAddress',
        //     // mode: "read",
        //     data : openData
        // }))
    }
    async function ChangePassword(e) {
        setOpen(false)
        if (await getSessionCheck(ChangePassword,e)) {
            displayModal(e,"ChangePassword","read");
        }
        // setOpen(false)
        // let openData = e;
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: 'ChangePassword',
        //     // mode: "read",
        //     data : openData
        // }))
    }
    async function showGiftBox(e) {
        setOpen(false)
        if (await getSessionCheck(showGiftBox,e)) {
            displayModal(e,"showGiftBox","read");
        }

        // setOpen(false)
        // let openData = e;
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: 'showGiftBox',
        //     // mode: "read",
        //     data : openData
        // }))
    }
    async function openCountryOfResidence(e) {
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
        let response;
        if (await getSessionCheck(openCountryOfResidence,e)) {
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
                            // mode: "read",
                            data : openData
                        }))
                    }else{
                        //DisplayResidenceSelectModal
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'CountryofResidenceRegistration',
                            // mode: "read",
                            data : openData
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
        }
    }
    function openCountryofResidenceRegistration(e) {
        setOpen(false)
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'CountryOfResidence',
            mode: "read",
            data : openData
        }))
    }

    // function openConfirm(e) {
    //     setOpen(false)
    //     const videoPreload = document.getElementById("video-preload");
    //     console.log("[BurgerMenu]openConfirm==>", e);
    //     //  API通信のためにくるくるを開始
    //     setModalState((prevState) => ({
    //         ...prevState,
    //         BaseModalOpen: true,
    //         // modalType: 'gachaLoading',
    //         modalType: 'gacha',
    //         mode: "edit",
    //         data: {}    //  ここで初期化を行わないと通信に失敗すると前回の当選を引きずる
    //     }))

    //     //  実際はタイムアウトではなくAPI通信を行う
    //     // setTimeout(function(){
    //         // alert("gachaSession: '4f0ae8cbd32ef19d-39fa90e4f'とか飛ばしてシナリオ確定
    //         //  不正チェックレスポンス来て、動画の再生準備が整ってから再生する、ダメならエラー処理する。
    //         //  アニメーションはランダムで複数パターン用意。

    //         //  実際にはAPIから取得した動画URLを格納
    //         var movieRandum = Math.floor(Math.random() * (21 - 1) + 1)
    //         // var videoUrl = 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/videos/purchase-direction/04/018.mp4';
    //         var videoUrl = false
    //         videoUrl = 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/videos/purchase-direction/04/0' +('00' + movieRandum).slice( -2 )+ '.mp4';
    //         videoPreload.href = videoUrl;

    //         //  動画の準備を始めるためにクルクルしながらロードさせる
    //         setModalState((prevState) => ({
    //             ...prevState,
    //             BaseModalOpen: true,
    //             // modalType: 'gachaLoading',
    //             modalType: 'gacha',
    //             mode: "edit",
    //             data: {
    //                 'videoUrl': videoUrl,
    //                 //////////////////////////////////////////////////
    //                 //  -prizeRarityの説明-
    //                 //  [0-100]の数字で返却して下さい
    //                 //  この得商が総数に占める珍しさの割合。
    //                 //
    //                 //  総数8で順位1(lv.8)であれば
    //                 //  8(lv.8)　÷ 8(総数.8)　*　100 =　100
    //                 //  prizeRarity(珍しさ)は100となる
    //                 //
    //                 //  総数8で順位8(lv.1)であれば
    //                 //  1(lv.1))　÷ 1(総数.8)　*　100 =　12.5
    //                 //  prizeRarity(珍しさ)は13（四捨五入）となる
    //                 //
    //                 'prizeRarity':100,
    //                 'startPoint': 9898300,
    //                 'endPoint': 9897300,
    //                 'prizes': {
    //                     '550e8400-e29b-41d4-a716-446655440000':{
    //                         'itemShippingFlag' : true,  //配送制限true=>制限あり
    //                         'isItemSelected':false,
    //                         'prizeRank':1,  //賞の上からの順位
    //                         'itemPoint':55,
    //                         'itemUUID': '550e8400-e29b-41d4-a716-446655440000',
             
    //                         'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
    //                         'itemImagePath2':'画像２',
    //                         'itemImagePath3':'画像３',
    //                         'itemSippingFlag':1,
    //                         'categoryName':'ポケモン',
    //                         'itemName':'わたしリーリエ ほしぐもちゃん',
    //                         'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
    //                         'itemDescription2':'説明の2',
    //                         'itemAttribute1':'サポート',
    //                         'itemAttribute2':'SM4+',
    //                         'itemAttribute3':'119/114',
    //                         'itemAttribute4':'SR',
    //                         'itemAttribute5':'',
    //                         'itemAttribute6':'美品',
    //                         'itemAttribute7':'お買い得',
    //                         'itemAttribute8':'貴重品',
    //                     },
    //                     '550e8400-e29b-41d4-a716-446655440001':{
    //                         'itemShippingFlag' : false,  //配送制限true=>制限あり
    //                         'isItemSelected':false,
    //                         'prizeRank':1,  //賞の上からの順位
    //                         'itemPoint':855,
    //                         'itemUUID': '550e8400-e29b-41d4-a716-446655440001',
                       
    //                         'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
    //                         'itemImagePath2':'画像２',
    //                         'itemImagePath3':'画像３',
    //                         'itemSippingFlag':1,
    //                         'categoryName':'ポケモン',
    //                         'itemName':'リーリエ',
    //                         'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
    //                         'itemDescription2':'説明の2',
    //                         'itemAttribute1':'サポート',
    //                         'itemAttribute2':'SM4+',
    //                         'itemAttribute3':'119/114',
    //                         'itemAttribute4':'SR',
    //                         'itemAttribute5':'PSA10',
    //                         'itemAttribute6':'美品',
    //                         'itemAttribute7':'お買い得',
    //                         'itemAttribute8':'貴重品',
    //                     },

                   
        
    //                 }
    //             }
    //         }))
    //     // },1000)
    // }

    async function enterCoupon(e) {
        setOpen(false)
        if (await getSessionCheck(enterCoupon,e)) {
            displayModal(e,"EnterCoupon","read");
        }
    }
    //  パスワード変更リターンメールのURLクリック
    // function OpenEnterNewPassword(e) {
    //     setOpen(false)
    //     // console.log("[setModalState]", e.key)
    //     // console.log('[BurgerMenu]useCoupon=>e==>',e);
    //     setModalState((prevState) => ({
    //         ...prevState,
    //         BaseModalOpen: true,
    //         modalType: 'EnterNewPassword',
    //         mode : '',
    //         data : {},
    //     }))
    // }
    //  パスワード忘れましたリターンメールのURLクリック
    async function OpenForgetPassword(e) {
        setOpen(false)
        // check-sessionに問題なし
        if (await getSessionCheck(OpenForgetPassword,e)) {
            displayModal(e,"ForgetPassword","read");
        }
        // setOpen(false)
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: 'ForgetPassword',
        //     mode : '',
        //     data : {},
        // }))
    }
    function openInvitation(e) {
        setOpen(false)
        // console.log("[setModalState]", e.key)
        // console.log('[BurgerMenu]useCoupon=>e==>',e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Invitation',
            mode : '',
            data : {},
        }))
    }
    
    //  Modal layout sample
    // function OpenModalLayoutSample(e) {
    //     setOpen(false)
    //     // console.log("[setModalState]", e.key)
    //     // console.log('[BurgerMenu]useCoupon=>e==>',e);
    //     setModalState((prevState) => ({
    //         ...prevState,
    //         BaseModalOpen: true,
    //         modalType: 'ModalLayoutSample',
    //         mode : '',
    //         data : {},
    //     }))
    // }
    //  For testing
    function selectMovie(e){
        setOpen(false)
        // console.log("[setModalState]", e.key)
        // console.log('[BurgerMenu]useCoupon=>e==>',e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'selectMovie',
            mode : 'select',
            data : {},
        }))
    }
    //  for testing
    // function changeKey(e){
    //     Object.keys(translationObj).map((productKey) => {
    //         //  先頭の一文字を取り除いて数値型に変更
    //         let key  = Number(productKey.slice(1));
    //         setTestingState((prevState) => ({
    //             ...prevState,
    //             //  新しいkeyに文字列結合をしてkeyの生成
    //             [key + '==>' + Date.now()]:translationObj[productKey]
    //         }))

    //     })
    // }
    /////////////////////////////////////
    // ポイントチャージ起動
    async function doCharge(e) {
        setOpen(false)
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
            //SessionCheckSuccess display ChargeModal
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'charge',
                mode: "purchase",
                data: {}
            }))
        }
    }
    /////////////////////////////////////
    //  クーポン受け取り成功
    async function openEnterCouponCompleted(e) {
        setOpen(false)
        //loader
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'EnterCouponCompleted',
            mode: "",
            data: {}
        }))
    }
    //  クーポン受け取り成功
    /////////////////////////////////////

    /////////////////////////////////////
    //  プレゼント受け取り成功
    async function openGetGiftCompleted(e) {
        setOpen(false)
        //loader
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'GetGiftCompleted',
            mode: "",
            data: {}
        }))
    }
    //  プレゼント受け取り成功
    /////////////////////////////////////

    /*
    // haga ポイント変更テストで利用
    function changePoint() {
        let startValue = Number((sessionStorage.getItem("start"))?sessionStorage.getItem("start"):0);
        let endValue = Number((sessionStorage.getItem("end"))?sessionStorage.getItem("end"):10000);
        let updateValue = Number((sessionStorage.getItem("update"))?sessionStorage.getItem("update"):0);

        // updateValue++;
        // startValue = endValue;
        endValue++;
        console.log("{{{{{{ updateValue", updateValue);
        console.log("{{{{{{ startValue", startValue);
        console.log("{{{{{{ endValue", endValue);

        // startValue = checkData(startValue);
        console.log("{{{{{{ startValue2", startValue);

        setPointState((prevState) => ({
            ...prevState,
            start: checkStartValue(startValue),
            end: endValue,
            update: updateValue,
            redraw: true
        }))
        sessionStorage.setItem("start", startValue);
        sessionStorage.setItem("end", endValue);
        sessionStorage.setItem("update", updateValue);
    }
*/
/*
    function checkData(startValue) {
        console.log("{{{{{{ pointStateValue.start", pointStateValue.start);
        if (pointStateValue.start == startValue) return (Math.random() > 0.5)?((startValue - 1) < 0)?startValue + 1:startValue - 1:startValue + 1;
        else return startValue;
    }
*/

    
    //  ページ遷移でメニュー閉じる
    useEffect(() => {
        setOpen(false)
    }, [location]);

    const doLogout = async () => {
        try {
            const response = await fetch(apiURL + "/auth/logout", {
                body: JSON.stringify({}),
                method: "POST",
                credentials: "include",
                headers: headersParam(),
                mode: "cors",
            });
            const data = await response.json();
            if (response.status == 200) {
                // console.log("@@@@@@@@@logout success");
                //////////////////
                //  ログインフラグの変更（recoil初期値false）
                setUserState((prevState) => ({
                    ...prevState,
                    isLogin: false
                }))
                //  ログインフラグの変更（recoil初期値false）
                //////////////////
                console.log("setPointState3 start = 0 end = 0");
                setPointState((prevState) => ({
                    ...prevState,
                    start: 0,
                    end: 0,
                    update: 0
                }))
                sessionStorage.removeItem("token");
            }
            else {
            }
        } catch (err) {
            // console.log("err", err);
        } finally {
            // console.log('finally');
            navigate("/");
        }
    }
    //  https://qiita.com/hide8800kasu/items/80587455bf3cd9b0a0c3
    const menuStyles = {
        bmOverlay: {
            minHeight: '100vh',
            height: '100dvh'
        },
        bmMenuWrap: {
            minHeight: '100vh',
            height: '100dvh'
        },
    }

    return (
        <>
            <div id="burger-menu-outer-container"
                    className="overscroll-none h-screen"
                    >
                <Menu 
                    pageWrapId={ "burger-menu-wrap" } 
                    outerContainerId={ "burger-menu-outer-container" } 
                    right
                    isOpen={open}
                    onOpen={ handleOnOpen }
                    onClose={ handleOnClose }
                    onStateChange={ isMenuOpen } 
                    styles={menuStyles}
                    
                    // disableOverlayClick={() => shouldDisableOverlayClick()}
                >
                    <main id="burger-menu-wrap" className="h-full relative min-h-[32rem]">
                        <ul className="py-4 flex flex-col text-base top-0">
                            <li key="home" className={`${anchorClass}`} onClick={(e) => navigate("/")}>
                                {intl.formatMessage({ id: "top" })}
                            </li>
                            {UserStateObj.isLogin
                                ?<>
                                    <li key="Collection_List" className={`${anchorClass}`} onClick={(e) => showCollection({})}>
                                        {intl.formatMessage({ id: "Collection_List" })}
                                    </li>
                                    <li key="doCharge" className={`${anchorClass}`} onClick={(e) => doCharge({})}>
                                        {intl.formatMessage({ id: "Purchase_points" })}
                                    </li>
                                    <li key="Waiting_for_shipping" className={`${anchorClass}`} onClick={(e) => showWaiting4Shipping({})}>
                                        {intl.formatMessage({ id: "Waiting_for_shipping" })}
                                    </li>
                                    <li key="Shipping_completed" className={`${anchorClass}`} onClick={(e) => showShippingCompleted({})}>
                                        {intl.formatMessage({ id: "Shipping_completed" })}
                                    </li>
                                    <li key="Shipping_Address" className={`${anchorClass}`} onClick={(e) => showShippingAddress({})}>
                                        {intl.formatMessage({ id: "Shipping_Address" })}
                                    </li>

                                    <li key="Coupon" className={`${anchorClass}`} onClick={(e) => enterCoupon({})}>
                                        {intl.formatMessage({ id: "use_coupon" })}
                                    </li>
                                    <li key="Gift_Box" className={`${anchorClass}`} onClick={(e) => showGiftBox({})}>
                                        {intl.formatMessage({ id: "Gift_Box" })}
                                    </li>
                                    <li key="Change_email_address" className={`${anchorClass}`} onClick={(e) => ChangeEmailAddress({})}>
                                        {intl.formatMessage({ id: "Change_email_address" })}
                                    </li>
                                    <li key="Change_Password" className={`${anchorClass}`} onClick={(e) => ChangePassword({})}>
                                        {intl.formatMessage({ id: "Change_Password" })}
                                    </li>
                                    <li key="Country_of_residence" className={`${anchorClass}`} onClick={(e) => openCountryOfResidence({})}>
                                        {intl.formatMessage({ id: "Country_of_residence" })}
                                    </li>
                                    <li key="logout" className={`${anchorClass}`} onClick={(e) => doLogout({})}>
                                        {intl.formatMessage({ id: "logout" })}
                                    </li>
                                
                                </>
                                :<>
                                    <li key="login" className={`${anchorClass}`} onClick={(e) => openLogin({})}>
                                        {intl.formatMessage({ id: "login" })}
                                    </li>
                                    <li key="openSignUp" className={`${anchorClass}`} onClick={(e) => openSignUp({})}>
                                        {intl.formatMessage({ id: "sign_up" })}
                                    </li>
                                </>
                            }




                            <li key="close" className={`${anchorClass}`} onClick={(e) => handleOnClose({})}>
                                {intl.formatMessage({ id: "close" })}
                            </li>
                            {debugStateValue.isDebug
                                ?
                                    <>
                                        <hr></hr>
                                        <li key="開封演出シミュレーター" className={`${anchorClassDev}`} onClick={(e) => selectMovie()}>
                                            ✈️演出TestFlight🎬
                                        </li>
                                        {/* <li key="Modal layout sample" className={`${anchorClassDev}`} onClick={(e) => OpenModalLayoutSample()}>
                                            [DEV]Modal layout sample
                                        </li> */}
                                        {/* <li key="PW変更メールURLクリック" className={`${anchorClassDev}`} onClick={(e) => OpenEnterNewPassword()}>
                                            [DEV]PW変更メールURLクリック
                                        </li> */}
                                        <li key="PW忘れたメールクリック" className={`${anchorClassDev}`} onClick={(e) => OpenForgetPassword({})}>
                                            [DEV]PW忘れたメールクリック
                                        </li>

                                        <li key="新コレクション" className={`${anchorClassDev}`} onClick={(e) => showCollectionV2({})}>
                                            [DEV]新コレクション
                                        </li>
                                        {/* <li key={intl.formatMessage({ id: "Confirm_email_address" })} className={`${anchorClassDev}`} onClick={(e) => navigate("/verification")}>
                                            [DEV]{intl.formatMessage({ id: "Confirm_email_address" })}
                                        </li> */}
                                        {/* <li key="error" className={`${anchorClassDev}`} onClick={(e) => openError({})}>
                                            [DEV]error
                                        </li> */}
                                        {/* <li key="gachaHistory" className={`${anchorClassDev}`} onClick={(e) => openGachaHistory(gachaHistoryStateObj)}>
                                            [DEV]gachaHistory
                                        </li> */}
                                        {/* <li key="ガチャプレイヤー確認" className={`${anchorClassDev}`} onClick={(e) => openConfirm()}>
                                            [DEV]ガチャプレイヤー確認
                                        </li> */}

                                        <li key="居住地が登録済の場合" className={`${anchorClassDev}`} onClick={(e) => openCountryofResidenceRegistration({})}>
                                            [DEV]居住地が登録済の場合
                                        </li> 
                                        <li key="友達招待" className={`${anchorClassDev}`} onClick={(e) => openInvitation({})}>
                                            [DEV]友達招待
                                        </li> 
                                        <li key="クーポン利用成功" className={`${anchorClassDev}`} onClick={(e) => openEnterCouponCompleted({})}>
                                            [DEV]クーポン利用完了
                                        </li> 
                                        <li key="プレゼント受取成功" className={`${anchorClassDev}`} onClick={(e) => openGetGiftCompleted({})}>
                                            [DEV]プレゼント受取成功
                                        </li> 
                                        {/* <li key="Key変更テスト" className={`${anchorClassDev}`} onClick={(e) => changeKey({})}>
                                            [DEV]Key変更テスト
                                        </li> */}
                                        {/* <li key="ポイント変更テスト" className={`${anchorClass}`} onClick={(e) => changePoint({})}>
                                            ポイント変更テスト
                                        </li> */}
                                    </>
                                :<></>
                            }

                            
                        </ul>
                        <ul className="flex flex-row flex-wrap text-xs mt-8 absolute">
                            <li key="ja" className={`${langLiClass}`} onClick={(e) => changeLang('ja')}>
                                日本語
                            </li>
                            <li key="en" className={`${langLiClass}`} onClick={(e) => changeLang('en')}>
                                English
                            </li>
                            <li key="ko" className={`${langLiClass}`} onClick={(e) => changeLang('ko')}>
                                한국어
                            </li>
                            <li key="th" className={`${langLiClass}`} onClick={(e) => changeLang('th')}>
                                แบบไทย
                            </li>
                            <li key="fr" className={`${langLiClass}`} onClick={(e) => changeLang('fr')}>
                                Français
                            </li>
                            <li key="es" className={`${langLiClass}`} onClick={(e) => changeLang('es')}>
                                Español
                            </li>
                            <li key="de" className={`${langLiClass}`} onClick={(e) => changeLang('de')}>
                                Deutsch
                            </li>
                            <li key="it" className={`${langLiClass}`} onClick={(e) => changeLang('it')}>
                                Italiano
                            </li>
                            <li key="pt" className={`${langLiClass}`} onClick={(e) => changeLang('pt')}>
                                Português
                            </li>
                            <li key="zh" className={`${langLiClass}`} onClick={(e) => changeLang('zh')}>
                                中國
                            </li>
                            <li key="bn" className={`${langLiClass}`} onClick={(e) => changeLang('bn')}>
                                বাংলা
                            </li>
                            <li key="id" className={`${langLiClass}`} onClick={(e) => changeLang('id')}>
                                Indonesia
                            </li>
                        </ul>
                    </main>
                </Menu>
            </div>
        </>
    );


};
