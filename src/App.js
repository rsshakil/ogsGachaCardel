import './App.css';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { RouteConf } from './router/RouteConf';
import { useResetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { isMatchedPageLoading, isStoppeddPageLoading } from './store/recoil/pageLoadiongState';
import { modalState } from "./store/recoil/modalState";
import { userState } from "./store/recoil/userState";
import { historyState } from "./store/recoil/historyState";
import { ButtonMashState } from "./store/recoil/ButtonMashState";
import { FishesState } from "./store/recoil/FishesState";
import { ceilingGaugeState } from "./store/recoil/ceilingGaugeState";
import { gachaHistoryState } from "./store/recoil/gachaHistoryState";
import { HokutoState } from "./store/recoil/HokutoState";
import { playScenarioState } from "./store/recoil/playScenarioState";
import { testingState } from "./store/recoil/testingState";
import { snsState } from "./store/recoil/snsState";
import { accessState } from "./store/recoil/accessState";
import { browserTrackingState } from "./store/recoil/browserTrackingState";
import { useLocation, useNavigate } from 'react-router';
import Loader from './components/atoms/Loading/Loader';
import { instance } from './services/axios.js';
import { pointState } from "./store/recoil/pointState";
import { productListState } from "./store/recoil/productListState";
import axios from "axios";
import getUnixTime from 'date-fns/getUnixTime';
import { IntlProvider } from 'react-intl';
import * as queries from "./restapi/queries";
import useSetLanguage from "./hooks/useSetLanguage";
import { useMount } from "react-use";
import checkStartValue from '../src/functions/checkStartValue';


function App() {
  let location = useLocation();

  const navigate = useNavigate();
  // console.log('[App]navigate', navigate);

  let { pathname } = location;
  pathname = pathname.substring(1);
  // console.log('[App]pathname', pathname);

  ////////////////////////////////////
  //  recoil
  const [accessStateValue, setAccessState] = useRecoilState(accessState);
  const [UserStateObj, setUserState] = useRecoilState(userState);
  const [historyStateValue, setHistoryState] = useRecoilState(historyState);
  const [pointStateValue, setPointState] = useRecoilState(pointState);
  const [productListStateValue, setProductListState] = useRecoilState(productListState);
  const [browserTrackingObj, setBrowserTrackingState] = useRecoilState(browserTrackingState);
  const [modalStateValue, setModalState] = useRecoilState(modalState);
  //  recoil
  ////////////////////////////////////

  ////////////////////////////////////
  //  Recoil初期化の準備
  const resetButtonMashState = useResetRecoilState(ButtonMashState)
  const resetFishesState = useResetRecoilState(FishesState)
  const resetCeilingGaugeState = useResetRecoilState(ceilingGaugeState)
  const resetGachaHistoryState = useResetRecoilState(gachaHistoryState)
  const resetHokutoState = useResetRecoilState(HokutoState)
  const resetModalState = useResetRecoilState(modalState)
  const resetPlayScenarioState = useResetRecoilState(playScenarioState)
  const resetTestingState = useResetRecoilState(testingState)
  const resetSnsState = useResetRecoilState(snsState)
  //  Recoil初期化の準備
  ////////////////////////////////////


  const authApiURL =
    process.env.REACT_APP_ENV !== 'production'
      ? process.env.REACT_APP_AUTH_URL_LOCALHOST
      : process.env.REACT_APP_AUTH_URL_PRODUCTION;
  ///////////////////////////////////////////////////////
  //  マウントされた時にその時間を取得記録
  useMount(() => {
    console.log('[App]マウントされました。ソース取得時間を記録します', Date.now());
    setBrowserTrackingState((prevState) => ({
      ...prevState,
      appRendersDateTime: Date.now()
    }))
  });
  //  マウントされた時にその時間を取得記録
  ///////////////////////////////////////////////////////

  ////////////////////////////////////
  //  IPチェックに関するconfig
  //  調子の良いところでIPチェックする
  const API_URL = 'https://httpbin.org/ip';
  let AccessIp = '';
  //  https://ipinfo.io/ip
  //  https://api.ipify.org/'
  //  http://inet-ip.info/
  //  調子の良いところでIPチェックする
  ////////////////////////////////////

  ////////////////////////////////////
  //  IPチェック実行
  useEffect(() => {
    axios.get(API_URL, {
      params: {
        //GETのパラメータ
        format: 'json',
      }
    }).then((response) => {
      console.log('[App]response', response);
      //  ipの格納空間はapiによって違うので要注意
      AccessIp = response.data.origin;
      console.log('[App]AccessIp', AccessIp);
      setAccessState((oldSetAccessState) => (
        {
          ...oldSetAccessState,
          accessIp: AccessIp,
        }
      ));
    });
  }, [location]);
  //  IPチェック実行
  ////////////////////////////////////

  useLayoutEffect(() => {
    //タッチデバイスかどうかの判定
    let hasTouchScreen = false;
    //タッチポイントが0より多いつまりタッチできる端末
    if ('ontouchstart' in window && navigator.maxTouchPoints > 0) {
      hasTouchScreen = true;
    }

    setUserState((prevState) => ({
      ...prevState,
      hasTouchScreen: hasTouchScreen,
      navigatorAppVersion: window.navigator.appVersion,
      navigatorLanguage: window.navigator.language,
      navigatorLanguages: window.navigator.languages,
      navigatorOnLine: window.navigator.onLine,
      navigatorPlatform: window.navigator.platform,
      navigatorUserAgent: window.navigator.userAgent,
    }))
    setHistoryState((prevState) => ({
      ...prevState,
      [new Date().toLocaleString()]: pathname,
    }))
    ////////////////////////////////////
    //  ページ遷移でリコイル初期化
    resetButtonMashState();
    resetFishesState();
    resetCeilingGaugeState();
    resetGachaHistoryState();
    resetHokutoState();
    resetModalState();
    resetPlayScenarioState();
    resetTestingState();
    resetSnsState();
    //  ページ遷移でリコイル初期化
    ////////////////////////////////////
  }, [location]);

  //
  //  ブラウザー情報
  ////////////////////////////////////


  ////////////////////////////////////
  //  言語設定
  //
  const setLangHookRes = useSetLanguage();
  console.log("setLangHookRes", setLangHookRes)
  //
  //  言語設定
  ////////////////////////////////////

  const start = Date.now();

  const isPageLoading = useRecoilValue(isMatchedPageLoading(pathname));
  const isStoppedPageLoading = useRecoilValue(isStoppeddPageLoading(pathname));
  const isModalOpen = useRecoilValue(modalState).BaseModalOpen;
  // console.log('[App]isModalOpen', isModalOpen);

  const end = Date.now();
  // console.log(`Execution time: ${end - start} ms`);

  const [pageLoadingEnded, setPageLoadingEnded] = useState(false);
  // const { resetPageLoader } = usePageLoader(pathname);

  let timerRef = React.useRef(null);

  //execute when reload page by browser btn then reset
  // useLayoutEffect(() => {
  //   resetPageLoader(pathname);
  // }, [])

  useEffect(() => {
    // console.log('page loading check : ', isPageLoading)
    // console.log('page loading check >> pathname : ', pathname)

    //start page loader
    if (isPageLoading === 0) {
      document.body.classList.add("overflow-hidden", "h-screen", "w-screen", "fixed");
      //reset page loader
      // resetPageLoader(pathname);

      timerRef.current = setTimeout(() => {
        document.body.classList.remove("overflow-hidden", "h-screen", "w-screen", "fixed");
        navigate('/500');
      }, 25000); //120s[120000] 25s[25000]

      return () => clearTimeout(timerRef.current);
    } if (isModalOpen) {
      // window.scrollBy(0,100);
      document.body.classList.add("overflow-hidden", "h-screen", "w-screen", "modalOpen");
      document.body.style.height = '-webkit-fill-available';
    }
    // page loader not applicable for the curren page
    else {
      document.body.classList.remove("overflow-hidden", "h-screen", "w-screen", "fixed", "h-full", "modalOpen");
      document.body.style.height = '';
      if (timerRef.current) clearTimeout(timerRef.current);
    }

  }, [isPageLoading, location, isModalOpen])

  useEffect(() => {
    //if stopped page loader reset classes
    if (isStoppedPageLoading) {
      document.body.classList.remove("overflow-hidden", "h-screen", "w-screen", "fixed");
      if (timerRef.current) clearTimeout(timerRef.current);
    }

  }, [isStoppedPageLoading])

  // useEffect(() => {

  //   alert( window.outerHeight )
  // }, [window])


  useEffect(() => {
    ///////////////check network is alive/not/////////////////////
    axios.get('/favicon.ico' + `?v=${getUnixTime(new Date())}`).then(res => {
      // console.log('[App]sssss', res)
    }).catch(err => {
      // console.log('[App]navigate to 500 ....', err);

      if (pathname != '500' && err == 'Network Error') {
        navigate('/500');
      }
    })

  }, [location])

  if (location.pathname.includes('pack')) {
    // console.log('[App]URLに[pack]文字列が含まれています。');
  }

  // haga add 
  useEffect(() => {
    // console.log("[App]location--------@@@@@@");
    (async () => {
      // console.log("[App]location", location);
      if (
        location.pathname === '/'
        || location.pathname === '/verify-mail'
        || location.pathname === '/verify-change-mail'
        || location.pathname === '/verify-forget-mail'
      ) {
        // 通信処理 商品一覧を取得
        try {
          const config = {
            method: "get",
            url: queries.baseURL + queries.readProduct + "?l=" + UserStateObj.language
          }
          const result = await instance.request(config);
          // console.log('[App]app count up success', result?.data.gachaList)
          // Objectのキーの名前を変更
          // const translationObj = result?.data.gachaList
          // Object.keys(translationObj).map((productKey) => {
          //   //  先頭の一文字を取り除いて数値型に変更
          //   let key  = Number(productKey.slice(1));
          //   setProductListState((prevState) => ({
          //     ...prevState,
          //     //  新しいkeyに文字列結合をしてkeyの生成
          //     [key]:translationObj[productKey]
          //   }))
          // })
          // 商品一覧をrecoilにセットする
          setProductListState(result?.data.gachaList)
          /*
                    setPointState((prevState) => ({
                        ...prevState,
                        start: result?.data.point,
                        end: result?.data.point
                    }))
          */
        }
        catch (err) {
          console.log('[App]app count up err', err)
        }
      }
    })();
    //sakil added call userPoint api
    if (location.pathname === '/' || location.pathname.includes('pack')) {
      (async () => {
        try {
          const config = {
            method: "get",
            url: queries.baseURL + queries.readUser + "?pp=" + pointStateValue.end
          }
          const result = await instance.request(config);
          if (result) {
            const { userPointStart: startPoint, userPointEnd: endPoint } = result.data || 0;
            const updateValue = pointStateValue.end - endPoint;
            setPointState((prevState) => ({
              ...prevState,
              start: checkStartValue(pointStateValue.end, endPoint, pointStateValue),
              end: endPoint,
              // start: pointStateValue.end,
              update: updateValue
            }));
          }
        } catch (err) {
          console.log('app UserPoint up err---3');
        }
      })();
    }
  }, [location]);


  // const appStates = useRecoilValue(appState);
  // const appId = appStates.appId
  // useEffect(() => {
  //   // 通信処理 APPにカウントする
  //   try {
  //     const result = axios.put(queries.baseURL + queries.readProduct + appId);
  //     console.log('app count up success', result)
  //   }
  //   catch (err) {
  //     console.log('app count up err', err)
  //   }
  // }, []);


  // console.log('>>>>>>>>>>>>>>>>>>>>>>------ isPageLoading', isPageLoading)
  // console.log('>>>>>>>>>>>>>>>>>>>>>>------pageLoadingEnded', pageLoadingEnded)

  // Google Tag Manager start
  /*
    useEffect(() => {
      TagManager.initialize({ gtmId: 'GTM-NG8K5TRD' })
    }, [])
  
    useEffect(() => {
      document.body.classList?.remove('loading')
    }, [])
  */

  return (
    <>
      {(isPageLoading === 0 && !isStoppedPageLoading) && <Loader />}

      {/* <ErrorBoundary>
        <RouteConf />
      // </ErrorBoundary> */}
      {/* < AccessStateController /> */}
      <IntlProvider messages={setLangHookRes.dictionary} formats={setLangHookRes.dictionary} locale={setLangHookRes.setLanguage} defaultLocale="ja">
        {/* <IntlProvider messages={dictionary} formats="ja" locale="ja" defaultLocale="ja"> */}
        {setLangHookRes.languageSetFlag && <RouteConf />}
      </IntlProvider>
    </>
  )
}

export default App;