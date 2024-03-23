import React, { useRef, useState, useEffect, useLayoutEffect} from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
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
import {useInterval,useThrottle,useUpdateEffect} from 'react-use';

// import checkStartValue from '../../../functions/checkStartValue';
import { headersParam } from '../../../functions/commonFunctions';
import useFetchUserPresentQuery from "../../../hooks/useFetchUserPresentQuery";
import {userLanguageUpdate} from "../../../restapi/queries";

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
    const resetUserState = useResetRecoilState(userState)
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const resetPointState = useResetRecoilState(pointState)
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    const [productListArraySingle, setProductListSingle] = useRecoilState(productListState);
    translationObj = productListArraySingle;
    const [testingStateObj, setTestingState] = useRecoilState(testingState);
    const [gachaHistoryStateObj, setGachaHistoryState] = useRecoilState(gachaHistoryState);
    const navigate = useNavigate();
    const location = useLocation();
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    const [ fetchUserPresents ] = useFetchUserPresentQuery();


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

    /////////////////////////////////////
    //  IP制限
    function ipRestriction(e) {
        setOpen(false)
        let modalType = 'ipRestriction';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  IP制限
    /////////////////////////////////////
    /////////////////////////////////////
    //  イプシロン
    function openEpsilonPurchaseForm(e) {
        setOpen(false)
        let modalType = 'epsilonPurchaseForm';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    function openEpsilonPurchaseForm2(e) {
        setOpen(false)
        let modalType = 'epsilonPurchaseForm2';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  イプシロン
    /////////////////////////////////////
    /////////////////////////////////////
    //  要注意者・システムブロッキング
    function isBlocking(e) {
        setOpen(false)
        let modalType = 'isBlocking';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  要注意者・システムブロッキング
    /////////////////////////////////////
    /////////////////////////////////////
    //  銀行振込申込完了
    function bankTransferApplicationCompleted(e) {
        setOpen(false)
        let modalType = 'bankTransferApplicationCompleted';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  銀行振込申込完了
    /////////////////////////////////////
    /////////////////////////////////////
    //  SMS認証
    async function openSmsAuth(e) {
        setOpen(false)
        // if (await getSessionCheck(openSmsAuth,e)) {
        //     callUserReadApi(e,"SmsAuth","");
        // }
        // let modalType = 'SmsAuth';
        // let openData = e;
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: modalType,
        //     data : openData,
        // }))
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
        if (await getSessionCheck(openSmsAuth,e)) {
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
                        //call userReadAPI
                        callUserReadApi(openData,"SmsAuth","");
                    }else{
                        //DisplaySMSAuthModal
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'CountryofResidenceRegistration',
                            mode: "showSmsAuthModal",
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
    //  SMS認証
    /////////////////////////////////////
    /////////////////////////////////////
    //  SMS送信完了
    function openSendSmsCompleted(e) {
        setOpen(false)
        let modalType = 'SendSmsCompleted';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  SMS送信完了
    /////////////////////////////////////
    /////////////////////////////////////
    //  発送申請時SMS未認証エラー
    function smsNotAuthenticatedShipping(e) {
        setOpen(false)
        let modalType = 'SmsNotAuthenticated';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            mode : 'shipping',
            modalType: modalType,
            data : openData,
        }))
    }
    //  発送申請時SMS未認証エラー
    /////////////////////////////////////
    /////////////////////////////////////
    //  課金時SMS未認証エラー
    function smsNotAuthenticatedPayment(e) {
        setOpen(false)
        let modalType = 'SmsNotAuthenticated';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            mode : 'payment',
            modalType: modalType,
            data : openData,
        }))
    }
    //  課金時SMS未認証エラー
    /////////////////////////////////////
    /////////////////////////////////////
    //  発送申請時SMS認証
    function ShippingApplicationIdentityVerification(e) {
        setOpen(false)
        let modalType = 'ShippingApplicationIdentityVerification';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  発送申請時SMS認証
    /////////////////////////////////////
    /////////////////////////////////////
    //  決済時SMS認証
    function PaymentApplicationIdentityVerification(e) {
        setOpen(false)
        let modalType = 'PaymentApplicationIdentityVerification';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  決済時SMS認証
    /////////////////////////////////////
    /////////////////////////////////////
    //  SMS送信完了
    function openSMSAuthenticated(e) {
        setOpen(false)
        let modalType = 'SMSAuthenticated';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  SMS送信完了
    /////////////////////////////////////

    /////////////////////////////////////
    //  複数アカウント作成エラー
    function openMultipleAccountCreationError(e) {
        setOpen(false)
        let modalType = 'MultipleAccountCreationError';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  複数アカウント作成エラー
    /////////////////////////////////////

    /////////////////////////////////////
    //  IP制限エラー
    function openIPFail2BanError(e) {
        setOpen(false)
        let modalType = 'IPFail2BanError';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  IP制限エラー
    /////////////////////////////////////

    /////////////////////////////////////
    //  新住所登録
    function CreateShippingAddressV2(e) {
        setOpen(false)
        let modalType = 'createShippingAddressV2';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            data : openData,
        }))
    }
    //  新住所登録
    /////////////////////////////////////

    /////////////////////////////////////
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
        //Update user language when user logged in
        // check-sessionに問題なし
        if (UserStateObj.isLogin) {
            const url = queries.baseURL + queries.userLanguageUpdate;
            try{
                const config = {
                    method: queries.putMethod,
                    url: url,
                    data:{languageCode: e}
                }
                await instance.request(config);

            }catch(err){
                console.log('invalid data');
            }
        }
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
                    userEmailAddress: response.data?.user?.userEmail,
                    userId: response.data?.user?.userId,
                }))
                if(successModalType=="SmsAuth" && response.data?.user?.userSMSFlag==1){
                    successModalType ="SMSAuthenticated";
                }
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
        await fetchUserPresents();
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
    async function openInvitation(e) {
        setOpen(false)
        // console.log("[setModalState]", e.key)
        // console.log('[BurgerMenu]useCoupon=>e==>',e);
        if (await getSessionCheck(openInvitation,e)) {
            callUserReadApi(e,"Invitation","");
        }
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     modalType: 'Invitation',
        //     mode : '',
        //     data : {},
        // }))
    }
    

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
                                data : {}
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
            //Call pointReadApi
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

    /////////////////////////////////////
    //  プレゼントBOX
    async function openGiftBox(e) {
        setOpen(false)
        //loader
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'showGiftBox',
            mode: "",
            data: {}
        }))
    }
    //  プレゼントBOX
    /////////////////////////////////////
    /////////////////////////////////////
    //  セッション過剰チェック
    async function tooMuchSessionCheck(e) {
        setOpen(false)
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'tooMuchSessionCheck',
            mode: "",
            data: {}
        }))
    }
    //  セッション過剰チェック
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
    useLayoutEffect(() => {
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
                // setUserState((prevState) => ({
                //     ...prevState,
                //     isLogin: false
                // }))
                //  ログインフラグの変更（recoil初期値false）
                //////////////////
                //////////////////
                //  UserStateの初期化
                // resetUserState()
                //  UserStateの初期化
                //////////////////

                // localStorage.clear();
                // sessionStorage.clear();



                // console.log("setPointState3 start = 0 end = 0");
                // setPointState((prevState) => ({
                //     ...prevState,
                //     start: 0,
                //     end: 0,
                //     update: 0
                // }))
                // sessionStorage.removeItem("token");

            }
            else {
            }
        } catch (err) {
            // console.log("err", err);
        } finally {
            console.log('[BurgerMenu]finally');
            //////////////////
            //  通信障害があってもログアウトさせる（再ログインする為）
            //  システム上ログアウトでUI上ログインになると救済できない
            resetUserState();
            resetPointState();
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
            //  通信障害があってもログアウトさせる（再ログインする為）
            //////////////////
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
                                    <li key="友達招待する" className={`${anchorClass}`} onClick={(e) => openInvitation({})}>
                                        友達招待する
                                    </li> 
                                    <li key="SMS_authentication" className={`${anchorClass}`} onClick={(e) => openSmsAuth({})}>
                                        {intl.formatMessage({ id: "SMS_authentication" })}
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
                            <li key="faq" className={`${anchorClass}`} onClick={(e) => navigate("/faq")}>
                                {intl.formatMessage({ id: 'faq' })}
                            </li>
                            <li key="Customer_Service" className={`${anchorClass}`} onClick={(e) => navigate("/faq")}>
                                {intl.formatMessage({ id: 'Customer_Service' })}
                            </li>
                            <li key="Everyones_posts" className={`${anchorClass}`} onClick={(e) => navigate("/sns")}>
                                {intl.formatMessage({ id: 'Everyones_posts' })}
                            </li>
                            <li key="close" className={`${anchorClass}`} onClick={(e) => handleOnClose({})}>
                                {intl.formatMessage({ id: "close" })}
                            </li>
                            {debugStateValue.isDebug
                                ?
                                    <>
                                        <hr></hr>
                                        <li key="IP制限エラー" className={`${anchorClassDev}`} onClick={(e) => ipRestriction({})}>
                                            [DEV]IP制限エラー
                                        </li> 
                                        <li key="SMS_not_authenticated" className={`${anchorClassDev}`} onClick={(e) => bankTransferApplicationCompleted({})}>
                                            [DEV]銀行振込申込完了
                                        </li> 
                                        <li key="リーリエログ" className={`${anchorClassDev}`} onClick={(e) => navigate("/page-lillie")}>
                                            [DEV]リーリエログ
                                        </li> 
                                        <li key="ShippingApplicationIdentityVerification" className={`${anchorClassDev}`} onClick={(e) => ShippingApplicationIdentityVerification({})}>
                                            [DEV]{intl.formatMessage({ id: "Shipping_application_identity_verification" })}
                                        </li> 
                                        <li key="SMS_not_authenticated" className={`${anchorClassDev}`} onClick={(e) => smsNotAuthenticatedShipping({})}>
                                            [DEV]発送時{intl.formatMessage({ id: "SMS_not_authenticated" })}
                                        </li> 
                                        <li key="SMS_not_authenticated" className={`${anchorClassDev}`} onClick={(e) => PaymentApplicationIdentityVerification({})}>
                                            [DEV]決済時本人確認
                                        </li> 
                                        <li key="SMS_not_authenticated" className={`${anchorClassDev}`} onClick={(e) => smsNotAuthenticatedPayment({})}>
                                            [DEV]決済時{intl.formatMessage({ id: "SMS_not_authenticated" })}
                                        </li> 
                                        <li key="ブロッキング/要注意" className={`${anchorClassDev}`} onClick={(e) => isBlocking({})}>
                                            [DEV]ブロッキング/要注意
                                        </li> 
                                        <li key="イプシロン" className={`${anchorClassDev}`} onClick={(e) => openEpsilonPurchaseForm({})}>
                                            [DEV]イプシロン
                                        </li> 
                                        <li key="イプシロン2" className={`${anchorClassDev}`} onClick={(e) => openEpsilonPurchaseForm2({})}>
                                            [DEV]イプシロン2
                                        </li> 
                                        {/* <li key="Modal layout sample" className={`${anchorClassDev}`} onClick={(e) => OpenModalLayoutSample()}>
                                            [DEV]Modal layout sample
                                        </li> */}
                                        {/* <li key="PW変更メールURLクリック" className={`${anchorClassDev}`} onClick={(e) => OpenEnterNewPassword()}>
                                            [DEV]PW変更メールURLクリック
                                        </li> */}
                                        {/*<li key="友達招待する" className={`${anchorClassDev}`} onClick={(e) => openInvitation({})}>
                                            [DEV]友達招待する
                                        </li> 
                                         <li key="友達招待された" className={`${anchorClassDev}`} onClick={(e) => openInvitation({})}>
                                            [DEV]友達招待された
                                        </li>  
                                        <li key="SMS_authentication" className={`${anchorClassDev}`} onClick={(e) => openSmsAuth({})}>
                                            [DEV]{intl.formatMessage({ id: "SMS_authentication" })}
                                        </li> */}
                                        {/* <li key="SendSmsCompleted" className={`${anchorClassDev}`} onClick={(e) => openSendSmsCompleted({})}>
                                            [DEV]{intl.formatMessage({ id: "SMS_sent_completed" })}
                                        </li>  */}
                                        {/* <li key="SMS_authenticated" className={`${anchorClassDev}`} onClick={(e) => openSMSAuthenticated({})}>
                                            [DEV]{intl.formatMessage({ id: "SMS_authenticated" })}
                                        </li>  */}
                                        {/* <li key="SNS" className={`${anchorClassDev}`} onClick={(e) => navigate("/sns")}>
                                            [DEV]みんなの投稿
                                        </li> */}
                                        {/* <li key="PW忘れたメールクリック" className={`${anchorClassDev}`} onClick={(e) => OpenForgetPassword({})}>
                                            [DEV]PW忘れたメールクリック
                                        </li> */}

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

                                        {/* <li key="居住地が登録済の場合" className={`${anchorClassDev}`} onClick={(e) => openCountryofResidenceRegistration({})}>
                                            [DEV]居住地が登録済の場合
                                        </li> 
                                        <li key="クーポン利用成功" className={`${anchorClassDev}`} onClick={(e) => openEnterCouponCompleted({})}>
                                            [DEV]クーポン利用完了
                                        </li> 
                                        <li key="プレゼントBOX" className={`${anchorClassDev}`} onClick={(e) => openGiftBox({})}>
                                            [DEV]プレゼントBOX
                                        </li> 
                                        <li key="プレゼント受取成功" className={`${anchorClassDev}`} onClick={(e) => openGetGiftCompleted({})}>
                                            [DEV]プレゼント受取成功
                                        </li>  */}
                                        {/* <li key="Key変更テスト" className={`${anchorClassDev}`} onClick={(e) => changeKey({})}>
                                            [DEV]Key変更テスト
                                        </li> */}
                                        {/* <li key="ポイント変更テスト" className={`${anchorClass}`} onClick={(e) => changePoint({})}>
                                            ポイント変更テスト
                                        </li> */}
                                        {/* <li key="sakilテストリンク" className={`${anchorClassDev}`} onClick={(e) => navigate("/pack/p-999")}>
                                            [DEV]sakilテストリンク
                                        </li> */}
                                        {/* <li key="新住所登録" className={`${anchorClassDev}`} onClick={(e) => CreateShippingAddressV2({})}>
                                            [DEV]新住所登録
                                        </li>  */}
                                        <li key="セッションチェックし杉" className={`${anchorClassDev}`} onClick={(e) => tooMuchSessionCheck({})}>
                                            [DEV]セッションチェックし杉
                                        </li> 
                                        {/* <li key="複数アカウント作成エラー" className={`${anchorClassDev}`} onClick={(e) => openMultipleAccountCreationError()}>
                                            [DEV]複数アカウント作成エラー
                                        </li>
                                        <li key="IP Fail2Ban" className={`${anchorClassDev}`} onClick={(e) => openIPFail2BanError()}>
                                            [DEV]IP Fail2Ban
                                        </li> */}
                                        <li key="開封演出シミュレーター" className={`${anchorClassDev}`} onClick={(e) => selectMovie()}>
                                            ✈️演出TestFlight🎬
                                        </li>

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
