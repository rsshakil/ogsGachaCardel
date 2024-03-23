import React, { useRef, useState, useEffect, useLayoutEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from "recoil";
import { productListStateMultilingual } from "../../store/recoil/productListStateMultilingual";
import { productListState } from "../../store/recoil/productListState";
import { modalState } from "../../store/recoil/modalState";
import { gachaHistoryState } from "../../store/recoil/gachaHistoryState";
import { productList4TestingState } from "../../store/recoil/productList4TestingState";
import { userState } from "../../store/recoil/userState";
import { Headline } from "../atoms/text/Headline";
import { CountDown } from "./CountDown";
import '../../css/ProductList.css';
import '../../css/CountDown.css';
import '../../css/SoldOut.css';
import {useIntl} from 'react-intl'
import { SoldOut } from "./SoldOut";
import { debugState } from "../../store/recoil/debugState";
// import { useNavigate } from 'react-router-dom';
import useFetchGachaHistoryQuery from "../../hooks/useFetchGachaHistoryQuery";

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





export const ProductList = (props) => {
    let data = props.data;

    const [fetchGachaHistory] = useFetchGachaHistoryQuery();

    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [gachaHistoryStateObj, setGachaHistoryState] = useRecoilState(gachaHistoryState);
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    // console.log("[ProductList]UserStateObj==>",UserStateObj)
    const navigate = useNavigate();
    const intl = useIntl()

    ///////////////////////////////
    //  パックが内包されてなければタイトルを表示しない為のstate
    const [hasGachaGenreId1, setHasGachaGenreId1] = useState(false);
    const [hasGachaGenreId2, setHasGachaGenreId2] = useState(false);
    const [hasGachaGenreId3, setHasGachaGenreId3] = useState(false);
    const [hasGachaGenreId4, setHasGachaGenreId4] = useState(false);
    const [hasGachaGenreId5, setHasGachaGenreId5] = useState(false);
    const [hasGachaGenreId6, setHasGachaGenreId6] = useState(false);
    const [hasGachaGenreIdOther, setHasGachaGenreIdOther] = useState(false);
    //  パックが内包されてなければタイトルを表示しない為のstate
    ///////////////////////////////


    ///////////////////////////////
    //  現在時刻UTCの維持
    //  初期値は今
    // const currentDateTimeUTC = UserStateObj.currentDateTimeUTC;
    const [currentDateTimeUTC, setCurrentDateTimeUTC] = useState(Date.now());
    let tick = () => {
        let now = Date.now()
        if(Math.floor(currentDateTimeUTC/100) !== Math.floor(now/100)){
            setCurrentDateTimeUTC(now);
        }
        
        // console.log("[ProductList]currentDateTimeUTC==>",currentDateTimeUTC)
    };
    // setInterval(tick, 1000);
    useLayoutEffect(() => {
        if(modalStateValue.BaseModalOpen){
            clearInterval(productListInterval);
        }else{
                // intervalがすでに有るのなら、それはキャンセル。
                if(productListInterval) {
                    clearInterval(productListInterval);
                }
                // あらためてintervalを作成
                productListInterval = setInterval(tick,1000);
        }
    }, [modalStateValue.BaseModalOpen])
    //
    //////////////////////////////




    //  表示状態のフラグ
    //  hidden, countdown, display, soldout
    // const [gachaDisplay, setGachaDisplay] = useState('');
    let gachaDisplay;


    //  ユーザーに割り当てられた利用言語
    let languageResource;
    languageResource = UserStateObj?.languageResource;
    // console.log("[ProductList]UserStateObj.languageResource==>",languageResource)

    let translationObj;
    /////////////////////////////////////
    //  APIからの返却が多言語の場合
    // const [productListArray, setProductList] = useRecoilState(productListStateMultilingual);
    // console.log("[ProductList]productListArray==>",productListArray)
    // translationObj = productListArray[languageResource];
    // console.log("[ProductList]UserStateObj.languageResource==>",productListArray[languageResource])
    
    /////////////////////////////////////
    // APIからの返却が単言語の場合
    const [productListArraySingle, setProductListSingle] = useRecoilState(productListState);
    translationObj = productListArraySingle;
    // console.log("translationObj>>>>",translationObj)
    /////////////////////////////////////
    // Only For testing
    //
    const [productList4TestingObj, setProductList4Testing] = useRecoilState(productList4TestingState);
    let testingObj = productList4TestingObj;


    //  ページ遷移
    function go2gacha(e) {
        // console.log("[ProductList]go2gacha====>e.data.gachaTranslateId=====>",e.data.gachaTranslateId)
        //  eがある時だけ遷移するように制限
        if(e){
            navigate('/pack/p-' + e.data.gachaId);
        }
        
    }
    //  ガチャ履歴
     function openGachaHistory(data, e) {
        const {gachaId} = data || {};
        
        fetchGachaHistory(gachaId);

        // //  実際はタイムアウトではなくAPI通信を行う
        // historyTimer = setTimeout(() => {
        //     // console.log('[ProductList]setTimeout==>',e);
        //     setModalState((prevState) => ({
        //         ...prevState,
        //         // BaseModalOpen: true,
        //         modalType: 'gachaHistory',
        //         // mode : openMode,
        //         data : openData,
        //     }))
        // }, 3000);
    }
    //  売り切れ表示最終判定
    function displayOutOfStock(e) {
        // console.log('[ProductList]function displayOutOfStock=>e.gachaSoldOutFlag==>',e.gachaSoldOutFlag);
        if(e.gachaSoldOutFlag){
            //  ❗️売り切れ表示確定
            gachaDisplay = 'soldout';
            //  ❗️販売できる商品が０になる
            gachaRemainingCount = 0;
        }else{
            //  ❗️非表示確定
            gachaDisplay = 'hidden';
        }
    }


    return (
    <>        
        <section id="contentWrap" className={`flex justify-center bg-gradient-to-r from-black via-stone-700 to-black text-white py-8 px-4`}>
            <div className="w-256 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {/* ピックアップオリパ */}
                {hasGachaGenreId1
                ?
                <Headline 
                    spanClass='text-center text-sm text-white'
                    headlineText='PICKUP ITEM'
                    headlineClass='text-center text-5xl font-bold font-Prompt text-white sm:col-span-2 lg:col-span-3 flex flex-col'
                    type='h1'
                    spanText={`${intl.formatMessage({ id: 'Carefully_selected_original_pack' })}`}
                    
                />
                :
                <></>}
                {typeof translationObj==="object" && Object.keys(translationObj).length>0 && Object.keys(translationObj).map((productKey) => {
                    // console.log("[ProductList]productKey===>", productKey)
                    // console.log("[ProductList]productListArray[productKey]===>", translationObj[productKey])
                    // console.log("[ProductList]productListArray[productKey].productThumbnail===>", translationObj[productKey].productThumbnail)

                    ///////////////////////////////
                    // set from json
                    //
                    // gachaRemainingCount = Math.floor( Math.random() * ( 30000 - 0 ) + 0);
                    // gachaRemainingCount = 2;
                    gachaRemainingCount = translationObj[productKey].gachaRemainingCount;
                    // gachaTotalCount = 30000; // set dummy
                    gachaTotalCount = translationObj[productKey].gachaTotalCount;
                    // gachaSinglePoint = 99999 // set dummy
                    gachaSinglePoint = translationObj[productKey].gachaSinglePoint;
                    gachaRemainingDisplayFlag = translationObj[productKey]?.gachaRemainingDisplayFlag;
                    //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
                    gachaViewFlag = translationObj[productKey]?.gachaViewFlag;
                    // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
                    gachaSoldOutFlag = translationObj[productKey]?.gachaSoldOutFlag;
                    gachaPostStartDate = translationObj[productKey]?.gachaPostStartDate;
                    gachaStartDate = translationObj[productKey]?.gachaStartDate;
                    gachaEndDate = translationObj[productKey]?.gachaEndDate;
                    //  ボーナスとかのジャンル
                    gachaGenreId = translationObj[productKey]?.gachaGenreId;
                    
                    //
                    ///////////////////////////////

                    ///////////////////////////////
                    // 現在の#を求める
                    ///////////////////////////////
                    //  最大数の桁数
                    numberOfDigits = gachaRemainingCount.toString().length;
                    //  現在の回転数　を　最大数の桁数でゼロ埋め
                    nowCount = String(gachaTotalCount- gachaRemainingCount).padStart(numberOfDigits, '0');


                    ///////////////////////////////
                    //  GachaDisplayを判定していくために
                    //  各状態のフラグ化
                    //  hidden, countdown, display, soldout
                    //  setGachaDisplay('')
                    //  ‼️販売終了で在庫0にする
                    //
                    //  表示開始日を超過しているかどうか？
                    gachaPostStartDateExceed = true;
                    if(currentDateTimeUTC >= gachaPostStartDate){
                        // console.log("[ProductList]gachaPostStartDateExceed", currentDateTimeUTC, ">", gachaPostStartDate)
                        // console.log("[ProductList]",productKey,"表示開始日時を超過している", currentDateTimeUTC, ">", gachaPostStartDate)
                        //  表示開始日時を超過している
                        gachaPostStartDateExceed = true;
                    }else if(currentDateTimeUTC < gachaPostStartDate){
                        // console.log("[ProductList]",productKey,"表示開始日時を超過していない", currentDateTimeUTC, ">", gachaPostStartDate)
                        //  表示開始日時を超過していない
                        gachaPostStartDateExceed = false;   //  念の為
                    }else{
                        // console.log("[ProductList]",productKey,"表示開始日時を判断できない", currentDateTimeUTC, ">", gachaPostStartDate)
                        gachaPostStartDateExceed = true;
                    }
                    //  ガチャ開始日を超過しているかどうか？
                    if(Math.floor(currentDateTimeUTC) > Math.floor(gachaStartDate)){//get 3 sec diff between utcTime and dbTime for this need to apply math
                        // console.log("[ProductList]gachaStartDateExceed", currentDateTimeUTC, ">", gachaStartDate)
                        //  ガチャ開始日を超過している
                        gachaStartDateExceed = true;
                    }else if(Math.floor(currentDateTimeUTC) <= Math.floor(gachaStartDate)){
                        // console.log("[ProductList]ガチャ開始日を超過していない", currentDateTimeUTC, "<", gachaStartDate)
                        //  ガチャ開始日を超過していない
                        gachaStartDateExceed = false;   //  念の為
                        //  開始日
                        gachaStartDateTime = gachaStartDate
                        // console.log("[ProductList]gachaStartDateTime", gachaStartDateTime)
                        //  残りの時間
                        gachaStartRemainingTime = gachaStartDate - currentDateTimeUTC - 4000; //開始の瞬間の演出のため残り時間を補正
                        gachaStartRemainingDay = Math.floor(gachaStartRemainingTime/1000/60/60/24);
                        gachaStartRemainingHour = Math.floor(gachaStartRemainingTime/1000/60/60)%24;
                        gachaStartRemainingMinutes = Math.floor(gachaStartRemainingTime/1000/60)%60;
                        gachaStartRemainingSeconds = Math.floor(gachaStartRemainingTime/1000)%60;
                        gachaStartRemainingTotalSeconds = Math.floor(gachaStartRemainingTime/1000);
                    }else{
                        //  ガチャ開始日を超過しているか判定できない
                        gachaStartDateExceed = true;
                    }
                    //  ガチャ終了日を超過しているかどうか？
                    if(currentDateTimeUTC >= gachaEndDate){
                        // console.log("[ProductList]gachaEndDateExceed", currentDateTimeUTC, ">", gachaEndDate)
                        //  ガチャ終了日を超過している
                        gachaEndDateExceed = true;
                        }else{
                        //  ガチャ終了日を超過していない
                        // console.log("[ProductList]ガチャ終了日を超過していない", currentDateTimeUTC, "<", gachaEndDate)
                        gachaEndDateExceed = false;   //  念の為
                    }
                    //  ガチャ完売しているかどうか？
                    //  念の為マイナスも考慮
                    if(gachaRemainingCount <= 0){
                        // console.log("[ProductList]gachaRemainingCount", gachaRemainingCount)
                        //  ガチャ完売している
                        gachaOutOfStock = true;
                    }else{
                        //  ガチャ完売していない
                        gachaOutOfStock = false;   //  念の為
                    }
                    ////////////////////////
                    //  GachaDisplayの判断
                    ////////////////////////
                    if(gachaViewFlag){
                        //  発売前表示フラグ=表示
                        if(gachaPostStartDateExceed){
                            //  表示開始時刻＝超過
                            if(gachaStartDateExceed){
                                //  販売開始時刻＝超過
                                if(gachaOutOfStock){
                                    //  在庫状態＝完売
                                    displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                }else{
                                    //  在庫状態＝在庫あり
                                    if(gachaEndDateExceed){
                                        //  ガチャ終了日=超過
                                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                    }else{
                                        //  ガチャ終了日=未超過
                                        //  ❗️通常表示確定
                                        gachaDisplay = 'display';
                                    }
                                }
                            }else{
                                //  販売開始時刻＝未超過
                                //  ❗️カウントダウン表示確定
                                gachaDisplay = 'countdown';
                            }
                        }else{
                            //  表示開始時刻＝未超過
                            if(gachaStartDateExceed){
                                //  販売開始時刻＝超過
                                //  設定誤りで表示開始時刻より前に販売が開始されるケース
                                //  予告なしにいきなり出現
                                if(gachaOutOfStock){
                                    //  在庫状態＝完売
                                    //  何らかの操作で在庫ゼロで開始を迎える
                                    displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                }else{
                                    //  在庫状態＝在庫あり
                                    if(gachaEndDateExceed){
                                        //  ガチャ終了日=超過
                                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                    }else{
                                        //  ガチャ終了日=未超過
                                        //  ❗️通常表示確定
                                        gachaDisplay = 'display';
                                    }
                                }
                            }else{
                                //  販売開始時刻＝未超過
                                //  ❗️非表示確定
                                gachaDisplay = 'hidden';
                            }
                        }
                    }else{
                        //  発売前表示フラグ=非表示
                        if(gachaOutOfStock){
                            //  在庫状態＝完売
                            displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                        }else{
                            //  在庫状態＝在庫あり
                            if(gachaEndDateExceed){
                                //  ガチャ終了日=超過
                                displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                            }else{
                                //  ガチャ終了日=未超過
                                //  ❗️非表示確定
                                gachaDisplay = 'hidden';
                            }
                        }
                    }
                    //
                    //  GachaDisplayを判定していくために
                    //  各状態のフラグ化
                    ///////////////////////////////

                    ///////////////////////////////
                    //  rate calculation
                    //  残量LIFEゲージの計算
                    //
                    remainingRate = Math.floor(gachaRemainingCount / gachaTotalCount * 100);
                    // console.log("[ProductList]remainingRate", remainingRate)
                    remainingLevel = Math.floor(remainingRate / 5)*5;
                    // console.log("[ProductList]remainingLevel", remainingLevel)
                    if(gachaRemainingCount === 0){
                        remainingLevel = "empty"
                    }
                    //
                    ///////////////////////////////

                    if(gachaDisplay === 'soldout'){
                        //  売り切れ or countdown表示
                        productFilterClass = soldOutClass;
                        //　商品丸ごと非表示を初期化
                        productWrapHiddenClass = '';
                    }else if(gachaDisplay === 'countdown'){
                        //  売り切れ or countdown表示
                        productFilterClass = countdownClass;
                        //　商品丸ごと非表示を初期化
                        productWrapHiddenClass = '';
                    }else if(gachaDisplay === 'hidden'){
                        //  売り切れ or countdown表示を初期化
                        productFilterClass = '';
                        //　商品丸ごと非表示
                        productWrapHiddenClass = 'hidden';
                    }else{
                        //  売り切れ or countdown表示を初期化
                        productFilterClass = '';
                        //　商品丸ごと非表示を初期化
                        productWrapHiddenClass = '';
                    }

                    ///////////////////////////////
                    //  カテゴリーによる最終仕分け
                    //  (gachaGenreId === 1)
                    //
                    
                    if(gachaGenreId === 1 ){
                        //  このジャンルでなんらかの表示中の個数
                        if(gachaDisplay !== 'hidden'){
                            if(!hasGachaGenreId1){setHasGachaGenreId1(true)}
                        }
                    }else{
                        //  目的のジャンルではないのでここでは表示
                        productWrapHiddenClass = 'hidden';
                    }

                    // console.log("[ProductList]productKey=====>",productKey)
                    // console.log("[ProductList]productListArraySingle=====>",productListArraySingle)
                    // console.log("[ProductList]productListArraySingle[productKey]=====>",productListArraySingle[productKey])
                    return (
                        <>
                            <div 
                                key={`${productKey}`}
                                id={`${productKey}-Wrap`}
                                className={`${productWrapHiddenClass} ${productWrapStyle}`}
                                // onClick={go2gacha}
                                title={`${translationObj[productKey].gachaTranslateName} | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}
                                onClick={(e) => go2gacha({data:translationObj[productKey]})}
                                // onClick={
                                //     gachaDisplay === 'soldout' ?
                                //     (e) => openGachaHistory(translationObj[productKey], e)
                                //     :(e) => go2gacha({data:translationObj[productKey]})
                                // }
                                >
                                    <figure 
                                        loading="lazy"
                                        id={productKey}
                                        className={`${productFilterClass} ${productBgStyle}`}
                                        style={{ backgroundImage: `url(${translationObj[productKey].gachaTranslateImageMain})` }}
                                    >
                                        <img className="hidden" src={`${translationObj[productKey].gachaTranslateImageMain}`} alt={`${translationObj[productKey].gachaTranslateName}-thumbnail | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}></img>
                                    </figure>
                                    <div className={`${productFilterClass} ${productFooterWrapClass}`}>
                                        <div className="flex-none w-32 items-end flex">
                                            {gachaRemainingDisplayFlag ?
                                                <p className={`${remainingNumberClass}`}>{gachaRemainingCount.toLocaleString()}/{gachaTotalCount.toLocaleString()}</p>
                                            : ''}
                                        </div>
                                        <div className={`product-footer-panel--life-${remainingLevel} grow flex justify-between self-center max-w-xs`}>
                                            {/* <div className="ml-[3%] w-[44%] bg-gradient-to-r from-red-700 via-amber-600 to-lime-600 bg-gradient-t-to-b "></div> */}
                                            <div className="pl-[10%] ">
                                            {gachaRemainingDisplayFlag ? <p className={`${productFooterNameClass}`}>#{nowCount}</p>: ''}
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="leading-8 font-Noto text-xs -bottom-0.5">
                                                    {intl.formatMessage({ id: 'card_number' },{ number: 1 })}
                                                </p>
                                                <p className="leading-8 text-sm font-Roboto font-black">{gachaSinglePoint.toLocaleString()}</p>
                                                <p className="leading-8 pr-1 font-Noto text-xs -bottom-0.5">pt</p>
                                            </div>
                                        </div>
                                    </div>
                                    {gachaDisplay === 'countdown'?
                                    <CountDown 
                                    key={`pickup-${productKey}`}
                                    data={{
                                        gachaDisplay : gachaDisplay,
                                        day:gachaStartRemainingDay,
                                        hour:gachaStartRemainingHour,
                                        minutes:gachaStartRemainingMinutes,
                                        seconds:gachaStartRemainingSeconds,
                                        start:gachaStartDate,
                                        remainingTotalSeconds:gachaStartRemainingTotalSeconds
                                        }}/>
                                    :<></>}
                                    {gachaDisplay === 'soldout'?
                                    <SoldOut/>
                                    :<></>}
                            </div>
                        </>
                    );
                })}
                {/* ボーナスオリパ */}
                {hasGachaGenreId2
                ?
                <Headline 
                    spanClass='text-center text-sm text-white'
                    headlineText='BONUS ITEM'
                    headlineClass='text-center text-5xl font-bold font-Prompt text-white sm:col-span-2 lg:col-span-3 flex flex-col'
                    type='h1'
                    // spanText={`${intl.formatMessage({ id: 'Carefully_selected_original_pack' })}`}
                    spanText={`${intl.formatMessage({ id: 'bonus_oripa' })}`}
                    
                />
                :<></>}
                {typeof translationObj==="object" && Object.keys(translationObj).length>0 && Object.keys(translationObj).map((productKey) => {
                    // console.log("[ProductList]productKey===>", productKey)
                    // console.log("[ProductList]productListArray[productKey]===>", translationObj[productKey])
                    // console.log("[ProductList]productListArray[productKey].productThumbnail===>", translationObj[productKey].productThumbnail)

                    ///////////////////////////////
                    // set from json
                    //
                    // gachaRemainingCount = Math.floor( Math.random() * ( 30000 - 0 ) + 0);
                    // gachaRemainingCount = 2;
                    gachaRemainingCount = translationObj[productKey].gachaRemainingCount;
                    // gachaTotalCount = 30000; // set dummy
                    gachaTotalCount = translationObj[productKey].gachaTotalCount;
                    // gachaSinglePoint = 99999 // set dummy
                    gachaSinglePoint = translationObj[productKey].gachaSinglePoint;
                    gachaRemainingDisplayFlag = translationObj[productKey]?.gachaRemainingDisplayFlag;
                    //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
                    gachaViewFlag = translationObj[productKey]?.gachaViewFlag;
                    // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
                    gachaSoldOutFlag = translationObj[productKey]?.gachaSoldOutFlag;
                    gachaPostStartDate = translationObj[productKey]?.gachaPostStartDate;
                    gachaStartDate = translationObj[productKey]?.gachaStartDate;
                    gachaEndDate = translationObj[productKey]?.gachaEndDate;
                    //  ボーナスとかのジャンル
                    gachaGenreId = translationObj[productKey]?.gachaGenreId;
                    
                    //
                    ///////////////////////////////

                    ///////////////////////////////
                    // 現在の#を求める
                    ///////////////////////////////
                    //  最大数の桁数
                    numberOfDigits = gachaRemainingCount.toString().length;
                    //  現在の回転数　を　最大数の桁数でゼロ埋め
                    nowCount = String(gachaTotalCount- gachaRemainingCount).padStart(numberOfDigits, '0');


                    ///////////////////////////////
                    //  GachaDisplayを判定していくために
                    //  各状態のフラグ化
                    //  hidden, countdown, display, soldout
                    //  setGachaDisplay('')
                    //  ‼️販売終了で在庫0にする
                    //
                    //  表示開始日を超過しているかどうか？
                    gachaPostStartDateExceed = true;
                    if(currentDateTimeUTC >= gachaPostStartDate){
                        // console.log("[ProductList]gachaPostStartDateExceed", currentDateTimeUTC, ">", gachaPostStartDate)
                        // console.log("[ProductList]",productKey,"表示開始日時を超過している", currentDateTimeUTC, ">", gachaPostStartDate)
                        //  表示開始日時を超過している
                        gachaPostStartDateExceed = true;
                    }else if(currentDateTimeUTC < gachaPostStartDate){
                        // console.log("[ProductList]",productKey,"表示開始日時を超過していない", currentDateTimeUTC, ">", gachaPostStartDate)
                        //  表示開始日時を超過していない
                        gachaPostStartDateExceed = false;   //  念の為
                    }else{
                        // console.log("[ProductList]",productKey,"表示開始日時を判断できない", currentDateTimeUTC, ">", gachaPostStartDate)
                        gachaPostStartDateExceed = true;
                    }
                    //  ガチャ開始日を超過しているかどうか？
                    if(Math.floor(currentDateTimeUTC) > Math.floor(gachaStartDate)){
                        // console.log("[ProductList]gachaStartDateExceed", currentDateTimeUTC, ">", gachaStartDate)
                        //  ガチャ開始日を超過している
                        gachaStartDateExceed = true;
                    }else if(Math.floor(currentDateTimeUTC) <= Math.floor(gachaStartDate)){
                        // console.log("[ProductList]ガチャ開始日を超過していない", currentDateTimeUTC, "<", gachaStartDate)
                        //  ガチャ開始日を超過していない
                        gachaStartDateExceed = false;   //  念の為
                        //  開始日
                        gachaStartDateTime = gachaStartDate
                        // console.log("[ProductList]gachaStartDateTime", gachaStartDateTime)
                        //  残りの時間
                        gachaStartRemainingTime = gachaStartDate - currentDateTimeUTC - 4000; //開始の瞬間の演出のため残り時間を補正
                        gachaStartRemainingDay = Math.floor(gachaStartRemainingTime/1000/60/60/24);
                        gachaStartRemainingHour = Math.floor(gachaStartRemainingTime/1000/60/60)%24;
                        gachaStartRemainingMinutes = Math.floor(gachaStartRemainingTime/1000/60)%60;
                        gachaStartRemainingSeconds = Math.floor(gachaStartRemainingTime/1000)%60;
                        gachaStartRemainingTotalSeconds = Math.floor(gachaStartRemainingTime/1000);
                    }else{
                        //  ガチャ開始日を超過しているか判定できない
                        gachaStartDateExceed = true;
                    }
                    //  ガチャ終了日を超過しているかどうか？
                    if(currentDateTimeUTC >= gachaEndDate){
                        // console.log("[ProductList]gachaEndDateExceed", currentDateTimeUTC, ">", gachaEndDate)
                        //  ガチャ終了日を超過している
                        gachaEndDateExceed = true;
                        }else{
                        //  ガチャ終了日を超過していない
                        // console.log("[ProductList]ガチャ終了日を超過していない", currentDateTimeUTC, "<", gachaEndDate)
                        gachaEndDateExceed = false;   //  念の為
                    }
                    //  ガチャ完売しているかどうか？
                    //  念の為マイナスも考慮
                    if(gachaRemainingCount <= 0){
                        // console.log("[ProductList]gachaRemainingCount", gachaRemainingCount)
                        //  ガチャ完売している
                        gachaOutOfStock = true;
                    }else{
                        //  ガチャ完売していない
                        gachaOutOfStock = false;   //  念の為
                    }
                    ////////////////////////
                    //  GachaDisplayの判断
                    ////////////////////////
                    if(gachaViewFlag){
                        //  発売前表示フラグ=表示
                        if(gachaPostStartDateExceed){
                            //  表示開始時刻＝超過
                            if(gachaStartDateExceed){
                                //  販売開始時刻＝超過
                                if(gachaOutOfStock){
                                    //  在庫状態＝完売
                                    displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                }else{
                                    //  在庫状態＝在庫あり
                                    if(gachaEndDateExceed){
                                        //  ガチャ終了日=超過
                                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                    }else{
                                        //  ガチャ終了日=未超過
                                        //  ❗️通常表示確定
                                        gachaDisplay = 'display';
                                    }
                                }
                            }else{
                                //  販売開始時刻＝未超過
                                //  ❗️カウントダウン表示確定
                                gachaDisplay = 'countdown';
                            }
                        }else{
                            //  表示開始時刻＝未超過
                            if(gachaStartDateExceed){
                                //  販売開始時刻＝超過
                                //  設定誤りで表示開始時刻より前に販売が開始されるケース
                                //  予告なしにいきなり出現
                                if(gachaOutOfStock){
                                    //  在庫状態＝完売
                                    //  何らかの操作で在庫ゼロで開始を迎える
                                    displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                }else{
                                    //  在庫状態＝在庫あり
                                    if(gachaEndDateExceed){
                                        //  ガチャ終了日=超過
                                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                    }else{
                                        //  ガチャ終了日=未超過
                                        //  ❗️通常表示確定
                                        gachaDisplay = 'display';
                                    }
                                }
                            }else{
                                //  販売開始時刻＝未超過
                                //  ❗️非表示確定
                                gachaDisplay = 'hidden';
                            }
                        }
                    }else{
                        //  発売前表示フラグ=非表示
                        if(gachaOutOfStock){
                            //  在庫状態＝完売
                            displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                        }else{
                            //  在庫状態＝在庫あり
                            if(gachaEndDateExceed){
                                //  ガチャ終了日=超過
                                displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                            }else{
                                //  ガチャ終了日=未超過
                                //  ❗️非表示確定
                                gachaDisplay = 'hidden';
                            }
                        }
                    }
                    //
                    //  GachaDisplayを判定していくために
                    //  各状態のフラグ化
                    ///////////////////////////////

                    ///////////////////////////////
                    //  rate calculation
                    //  残量LIFEゲージの計算
                    //
                    remainingRate = Math.floor(gachaRemainingCount / gachaTotalCount * 100);
                    // console.log("[ProductList]remainingRate", remainingRate)
                    remainingLevel = Math.floor(remainingRate / 5)*5;
                    // console.log("[ProductList]remainingLevel", remainingLevel)
                    if(gachaRemainingCount === 0){
                        remainingLevel = "empty"
                    }
                    //
                    ///////////////////////////////

                    if(gachaDisplay === 'soldout'){
                        //  売り切れ or countdown表示
                        productFilterClass = soldOutClass;
                        //　商品丸ごと非表示を初期化
                        productWrapHiddenClass = '';
                    }else if(gachaDisplay === 'countdown'){
                        //  売り切れ or countdown表示
                        productFilterClass = countdownClass;
                        //　商品丸ごと非表示を初期化
                        productWrapHiddenClass = '';
                    }else if(gachaDisplay === 'hidden'){
                        //  売り切れ or countdown表示を初期化
                        productFilterClass = '';
                        //　商品丸ごと非表示
                        productWrapHiddenClass = 'hidden';
                    }else{
                        //  売り切れ or countdown表示を初期化
                        productFilterClass = '';
                        //　商品丸ごと非表示を初期化
                        productWrapHiddenClass = '';
                    }

                    ///////////////////////////////
                    //  カテゴリーによる最終仕分け
                    //  (gachaGenreId === 2)
                    //
                    if(gachaGenreId === 2 ){
                        //  目的のジャンルであるのでここでは表示
                        //  このジャンルでなんらかの表示中の個数
                        if(gachaDisplay !== 'hidden'){
                            if(!hasGachaGenreId2){setHasGachaGenreId2(true)}
                        }
                    }else{
                        //  目的のジャンルではないのでここでは表示
                        productWrapHiddenClass = 'hidden';
                    }



                    // console.log("[ProductList]productKey=====>",productKey)
                    // console.log("[ProductList]productListArraySingle=====>",productListArraySingle)
                    // console.log("[ProductList]productListArraySingle[productKey]=====>",productListArraySingle[productKey])
                    return (
                        <>
                            <div 
                                key={`${productKey}`}
                                id={`${productKey}-Wrap`}
                                className={`${productWrapHiddenClass} ${productWrapStyle}`}
                                // onClick={go2gacha}
                                title={`${translationObj[productKey].gachaTranslateName} | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}
                                onClick={(e) => go2gacha({data:translationObj[productKey]})}
                                // onClick={
                                //     gachaDisplay === 'soldout' ?
                                //     (e) => openGachaHistory(translationObj[productKey],e)
                                //     :(e) => go2gacha({data:translationObj[productKey]})
                                // }
                                >
                                    <figure 
                                        loading="lazy"
                                        id={productKey}
                                        className={`${productFilterClass} ${productBgStyle}`}
                                        style={{ backgroundImage: `url(${translationObj[productKey].gachaTranslateImageMain})` }}
                                    >
                                        <img className="hidden" src={`${translationObj[productKey].gachaTranslateImageMain}`} alt={`${translationObj[productKey].gachaTranslateName}-thumbnail | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}></img>
                                    </figure>
                                    <div className={`${productFilterClass} ${productFooterWrapClass}`}>
                                        <div className="flex-none w-32 items-end flex">
                                            {gachaRemainingDisplayFlag ?
                                                <p className={`${remainingNumberClass}`}>{gachaRemainingCount.toLocaleString()}/{gachaTotalCount.toLocaleString()}</p>
                                            : ''}
                                        </div>
                                        <div className={`product-footer-panel--life-${remainingLevel} grow flex justify-between self-center max-w-xs`}>
                                            {/* <div className="ml-[3%] w-[44%] bg-gradient-to-r from-red-700 via-amber-600 to-lime-600 bg-gradient-t-to-b "></div> */}
                                            <div className="pl-[10%] ">
                                            {gachaRemainingDisplayFlag ? <p className={`${productFooterNameClass}`}>#{nowCount}</p>: ''}
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="leading-8 font-Noto text-xs -bottom-0.5">
                                                    {intl.formatMessage({ id: 'card_number' },{ number: 1 })}
                                                </p>
                                                <p className="leading-8 text-sm font-Roboto font-black">{gachaSinglePoint.toLocaleString()}</p>
                                                <p className="leading-8 pr-1 font-Noto text-xs -bottom-0.5">pt</p>
                                            </div>
                                        </div>
                                    </div>
                                    {gachaDisplay === 'countdown'?
                                    <CountDown 
                                    key={`bonus-${productKey}`}
                                    data={{
                                        gachaDisplay : gachaDisplay,
                                        day:gachaStartRemainingDay,
                                        hour:gachaStartRemainingHour,
                                        minutes:gachaStartRemainingMinutes,
                                        seconds:gachaStartRemainingSeconds,
                                        start:gachaStartDate,
                                        remainingTotalSeconds:gachaStartRemainingTotalSeconds
                                        }}/>
                                    :<></>}
                                    {gachaDisplay === 'soldout'?
                                    <SoldOut/>
                                    :<></>}
                            </div>
                        </>
                    );
                })}
                {/* プレオープン */}
                {hasGachaGenreId3
                ?
                <Headline 
                    spanClass='text-center text-sm text-white'
                    headlineText='PRE-OPENING ITEM'
                    headlineClass='text-center text-5xl font-bold font-Prompt text-white sm:col-span-2 lg:col-span-3 flex flex-col'
                    type='h1'
                    spanText={`${intl.formatMessage({ id: 'pre_opening' })}`}
                    
                />
                :<></>}
                {typeof translationObj==="object" && Object.keys(translationObj).length>0 && Object.keys(translationObj).map((productKey) => {


                    ///////////////////////////////
                    // set from json
                    //
                    // gachaRemainingCount = Math.floor( Math.random() * ( 30000 - 0 ) + 0);
                    // gachaRemainingCount = 2;
                    gachaRemainingCount = translationObj[productKey].gachaRemainingCount;
                    // gachaTotalCount = 30000; // set dummy
                    gachaTotalCount = translationObj[productKey].gachaTotalCount;
                    // gachaSinglePoint = 99999 // set dummy
                    gachaSinglePoint = translationObj[productKey].gachaSinglePoint;
                    gachaRemainingDisplayFlag = translationObj[productKey]?.gachaRemainingDisplayFlag;
                    //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
                    gachaViewFlag = translationObj[productKey]?.gachaViewFlag;
                    // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
                    gachaSoldOutFlag = translationObj[productKey]?.gachaSoldOutFlag;
                    gachaPostStartDate = translationObj[productKey]?.gachaPostStartDate;
                    gachaStartDate = translationObj[productKey]?.gachaStartDate;
                    gachaEndDate = translationObj[productKey]?.gachaEndDate;
                    //  ボーナスとかのジャンル
                    gachaGenreId = translationObj[productKey]?.gachaGenreId;
                    
                    //
                    ///////////////////////////////

                    ///////////////////////////////
                    // 現在の#を求める
                    ///////////////////////////////
                    //  最大数の桁数
                    numberOfDigits = gachaRemainingCount.toString().length;
                    //  現在の回転数　を　最大数の桁数でゼロ埋め
                    nowCount = String(gachaTotalCount- gachaRemainingCount).padStart(numberOfDigits, '0');


                    ///////////////////////////////
                    //  GachaDisplayを判定していくために
                    //  各状態のフラグ化
                    //  hidden, countdown, display, soldout
                    //  setGachaDisplay('')
                    //  ‼️販売終了で在庫0にする
                    //
                    //  表示開始日を超過しているかどうか？
                    gachaPostStartDateExceed = true;
                    if(currentDateTimeUTC >= gachaPostStartDate){
                        // console.log("[ProductList]gachaPostStartDateExceed", currentDateTimeUTC, ">", gachaPostStartDate)
                        // console.log("[ProductList]",productKey,"表示開始日時を超過している", currentDateTimeUTC, ">", gachaPostStartDate)
                        //  表示開始日時を超過している
                        gachaPostStartDateExceed = true;
                    }else if(currentDateTimeUTC < gachaPostStartDate){
                        // console.log("[ProductList]",productKey,"表示開始日時を超過していない", currentDateTimeUTC, ">", gachaPostStartDate)
                        //  表示開始日時を超過していない
                        gachaPostStartDateExceed = false;   //  念の為
                    }else{
                        // console.log("[ProductList]",productKey,"表示開始日時を判断できない", currentDateTimeUTC, ">", gachaPostStartDate)
                        gachaPostStartDateExceed = true;
                    }
                    //  ガチャ開始日を超過しているかどうか？
                    if(Math.floor(currentDateTimeUTC) > Math.floor(gachaStartDate)){
                        // console.log("[ProductList]gachaStartDateExceed", currentDateTimeUTC, ">", gachaStartDate)
                        //  ガチャ開始日を超過している
                        gachaStartDateExceed = true;
                    }else if(Math.floor(currentDateTimeUTC) <= Math.floor(gachaStartDate)){
                        // console.log("[ProductList]ガチャ開始日を超過していない", currentDateTimeUTC, "<", gachaStartDate)
                        //  ガチャ開始日を超過していない
                        gachaStartDateExceed = false;   //  念の為
                        //  開始日
                        gachaStartDateTime = gachaStartDate
                        // console.log("[ProductList]gachaStartDateTime", gachaStartDateTime)
                        //  残りの時間
                        gachaStartRemainingTime = gachaStartDate - currentDateTimeUTC - 4000; //開始の瞬間の演出のため残り時間を補正
                        gachaStartRemainingDay = Math.floor(gachaStartRemainingTime/1000/60/60/24);
                        gachaStartRemainingHour = Math.floor(gachaStartRemainingTime/1000/60/60)%24;
                        gachaStartRemainingMinutes = Math.floor(gachaStartRemainingTime/1000/60)%60;
                        gachaStartRemainingSeconds = Math.floor(gachaStartRemainingTime/1000)%60;
                        gachaStartRemainingTotalSeconds = Math.floor(gachaStartRemainingTime/1000);
                    }else{
                        //  ガチャ開始日を超過しているか判定できない
                        gachaStartDateExceed = true;
                    }
                    //  ガチャ終了日を超過しているかどうか？
                    if(currentDateTimeUTC >= gachaEndDate){
                        // console.log("[ProductList]gachaEndDateExceed", currentDateTimeUTC, ">", gachaEndDate)
                        //  ガチャ終了日を超過している
                        gachaEndDateExceed = true;
                        }else{
                        //  ガチャ終了日を超過していない
                        // console.log("[ProductList]ガチャ終了日を超過していない", currentDateTimeUTC, "<", gachaEndDate)
                        gachaEndDateExceed = false;   //  念の為
                    }
                    //  ガチャ完売しているかどうか？
                    //  念の為マイナスも考慮
                    if(gachaRemainingCount <= 0){
                        // console.log("[ProductList]gachaRemainingCount", gachaRemainingCount)
                        //  ガチャ完売している
                        gachaOutOfStock = true;
                    }else{
                        //  ガチャ完売していない
                        gachaOutOfStock = false;   //  念の為
                    }
                    ////////////////////////
                    //  GachaDisplayの判断
                    ////////////////////////
                    if(gachaViewFlag){
                        //  発売前表示フラグ=表示
                        if(gachaPostStartDateExceed){
                            //  表示開始時刻＝超過
                            if(gachaStartDateExceed){
                                //  販売開始時刻＝超過
                                if(gachaOutOfStock){
                                    //  在庫状態＝完売
                                    displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                }else{
                                    //  在庫状態＝在庫あり
                                    if(gachaEndDateExceed){
                                        //  ガチャ終了日=超過
                                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                    }else{
                                        //  ガチャ終了日=未超過
                                        //  ❗️通常表示確定
                                        gachaDisplay = 'display';
                                    }
                                }
                            }else{
                                //  販売開始時刻＝未超過
                                //  ❗️カウントダウン表示確定
                                gachaDisplay = 'countdown';
                            }
                        }else{
                            //  表示開始時刻＝未超過
                            if(gachaStartDateExceed){
                                //  販売開始時刻＝超過
                                //  設定誤りで表示開始時刻より前に販売が開始されるケース
                                //  予告なしにいきなり出現
                                if(gachaOutOfStock){
                                    //  在庫状態＝完売
                                    //  何らかの操作で在庫ゼロで開始を迎える
                                    displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                }else{
                                    //  在庫状態＝在庫あり
                                    if(gachaEndDateExceed){
                                        //  ガチャ終了日=超過
                                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                    }else{
                                        //  ガチャ終了日=未超過
                                        //  ❗️通常表示確定
                                        gachaDisplay = 'display';
                                    }
                                }
                            }else{
                                //  販売開始時刻＝未超過
                                //  ❗️非表示確定
                                gachaDisplay = 'hidden';
                            }
                        }
                    }else{
                        //  発売前表示フラグ=非表示
                        if(gachaOutOfStock){
                            //  在庫状態＝完売
                            displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                        }else{
                            //  在庫状態＝在庫あり
                            if(gachaEndDateExceed){
                                //  ガチャ終了日=超過
                                displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                            }else{
                                //  ガチャ終了日=未超過
                                //  ❗️非表示確定
                                gachaDisplay = 'hidden';
                            }
                        }
                    }
                    //
                    //  GachaDisplayを判定していくために
                    //  各状態のフラグ化
                    ///////////////////////////////

                    ///////////////////////////////
                    //  rate calculation
                    //  残量LIFEゲージの計算
                    //
                    remainingRate = Math.floor(gachaRemainingCount / gachaTotalCount * 100);
                    // console.log("[ProductList]remainingRate", remainingRate)
                    remainingLevel = Math.floor(remainingRate / 5)*5;
                    // console.log("[ProductList]remainingLevel", remainingLevel)
                    if(gachaRemainingCount === 0){
                        remainingLevel = "empty"
                    }
                    //
                    ///////////////////////////////

                    if(gachaDisplay === 'soldout'){
                        //  売り切れ or countdown表示
                        productFilterClass = soldOutClass;
                        //　商品丸ごと非表示を初期化
                        productWrapHiddenClass = '';
                    }else if(gachaDisplay === 'countdown'){
                        //  売り切れ or countdown表示
                        productFilterClass = countdownClass;
                        //　商品丸ごと非表示を初期化
                        productWrapHiddenClass = '';
                    }else if(gachaDisplay === 'hidden'){
                        //  売り切れ or countdown表示を初期化
                        productFilterClass = '';
                        //　商品丸ごと非表示
                        productWrapHiddenClass = 'hidden';
                    }else{
                        //  売り切れ or countdown表示を初期化
                        productFilterClass = '';
                        //　商品丸ごと非表示を初期化
                        productWrapHiddenClass = '';
                    }

                    ///////////////////////////////
                    //  カテゴリーによる最終仕分け
                    //  (gachaGenreId === 3)
                    //
                    if(gachaGenreId === 3 ){
                        //  目的のジャンルであるのでここでは表示
                        //  このジャンルでなんらかの表示中の個数
                        if(gachaDisplay !== 'hidden'){
                            if(!hasGachaGenreId3){setHasGachaGenreId3(true)}
                        }
                    }else{
                        //  目的のジャンルではないのでここでは表示
                        productWrapHiddenClass = 'hidden';
                    }

                    // console.log("[ProductList]productKey=====>",productKey)
                    // console.log("[ProductList]productListArraySingle=====>",productListArraySingle)
                    // console.log("[ProductList]productListArraySingle[productKey]=====>",productListArraySingle[productKey])
                    return (
                        <>
                            <div 
                                key={`${productKey}`}
                                id={`${productKey}-Wrap`}
                                className={`${productWrapHiddenClass} ${productWrapStyle}`}
                                // onClick={go2gacha}
                                title={`${translationObj[productKey].gachaTranslateName} | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}
                                onClick={(e) => go2gacha({data:translationObj[productKey]})}
                                // onClick={
                                //     gachaDisplay === 'soldout' ?
                                //     (e) => openGachaHistory(translationObj[productKey],e)
                                //     :(e) => go2gacha({data:translationObj[productKey]})
                                // }
                                >
                                    <figure 
                                        loading="lazy"
                                        id={productKey}
                                        className={`${productFilterClass} ${productBgStyle}`}
                                        style={{ backgroundImage: `url(${translationObj[productKey].gachaTranslateImageMain})` }}
                                    >
                                        <img className="hidden" src={`${translationObj[productKey].gachaTranslateImageMain}`} alt={`${translationObj[productKey].gachaTranslateName}-thumbnail | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}></img>
                                    </figure>
                                    <div className={`${productFilterClass} ${productFooterWrapClass}`}>
                                        <div className="flex-none w-32 items-end flex">
                                            {gachaRemainingDisplayFlag ?
                                                <p className={`${remainingNumberClass}`}>{gachaRemainingCount.toLocaleString()}/{gachaTotalCount.toLocaleString()}</p>
                                            : ''}
                                        </div>
                                        <div className={`product-footer-panel--life-${remainingLevel} grow flex justify-between self-center max-w-xs`}>
                                            {/* <div className="ml-[3%] w-[44%] bg-gradient-to-r from-red-700 via-amber-600 to-lime-600 bg-gradient-t-to-b "></div> */}
                                            <div className="pl-[10%] ">
                                            {gachaRemainingDisplayFlag ? <p className={`${productFooterNameClass}`}>#{nowCount}</p>: ''}
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="leading-8 font-Noto text-xs -bottom-0.5">
                                                    {intl.formatMessage({ id: 'card_number' },{ number: 1 })}
                                                </p>
                                                <p className="leading-8 text-sm font-Roboto font-black">{gachaSinglePoint.toLocaleString()}</p>
                                                <p className="leading-8 pr-1 font-Noto text-xs -bottom-0.5">pt</p>
                                            </div>
                                        </div>
                                    </div>
                                    {gachaDisplay === 'countdown'?
                                    <CountDown 
                                    key={`pre-${productKey}`}
                                    data={{
                                        day:gachaStartRemainingDay,
                                        hour:gachaStartRemainingHour,
                                        minutes:gachaStartRemainingMinutes,
                                        seconds:gachaStartRemainingSeconds,
                                        start:gachaStartDate,
                                        remainingTotalSeconds:gachaStartRemainingTotalSeconds
                                        }}/>
                                    :<></>}
                                    {gachaDisplay === 'soldout'?
                                    <SoldOut/>
                                    :<></>}
                            </div>
                        </>
                    );
                })}




                {debugStateValue.isDebug
                ?   //  デバッグの時だけ表示
                <>
                {/* 1,2,3で拾えなかったその他のオリパ */}
                    {
                    hasGachaGenreIdOther
                    ?
                    <Headline 
                        spanClass='text-center text-sm text-white'
                        headlineText='OTHER ITEMS'
                        headlineClass='text-center text-5xl font-bold font-Prompt text-white sm:col-span-2 lg:col-span-3 flex flex-col'
                        type='h1'
                        // spanText={`${intl.formatMessage({ id: 'Carefully_selected_original_pack' })}`}
                        spanText={`${intl.formatMessage({ id: 'Other_items' })}`}
                        
                    />
                    :<></>
                    }
                    {typeof translationObj==="object" && Object.keys(translationObj).length>0 && Object.keys(translationObj).map((productKey) => {
                        // console.log("[ProductList]productKey===>", productKey)
                        // console.log("[ProductList]productListArray[productKey]===>", translationObj[productKey])
                        // console.log("[ProductList]productListArray[productKey].productThumbnail===>", translationObj[productKey].productThumbnail)

                        ///////////////////////////////
                        // set from json
                        //
                        // gachaRemainingCount = Math.floor( Math.random() * ( 30000 - 0 ) + 0);
                        // gachaRemainingCount = 2;
                        gachaRemainingCount = translationObj[productKey].gachaRemainingCount;
                        // gachaTotalCount = 30000; // set dummy
                        gachaTotalCount = translationObj[productKey].gachaTotalCount;
                        // gachaSinglePoint = 99999 // set dummy
                        gachaSinglePoint = translationObj[productKey].gachaSinglePoint;
                        gachaRemainingDisplayFlag = translationObj[productKey]?.gachaRemainingDisplayFlag;
                        //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
                        gachaViewFlag = translationObj[productKey]?.gachaViewFlag;
                        // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
                        gachaSoldOutFlag = translationObj[productKey]?.gachaSoldOutFlag;
                        gachaPostStartDate = translationObj[productKey]?.gachaPostStartDate;
                        gachaStartDate = translationObj[productKey]?.gachaStartDate;
                        gachaEndDate = translationObj[productKey]?.gachaEndDate;
                        //  ボーナスとかのジャンル
                        gachaGenreId = translationObj[productKey]?.gachaGenreId;
                        
                        //
                        ///////////////////////////////

                        ///////////////////////////////
                        // 現在の#を求める
                        ///////////////////////////////
                        //  最大数の桁数
                        numberOfDigits = gachaRemainingCount.toString().length;
                        //  現在の回転数　を　最大数の桁数でゼロ埋め
                        nowCount = String(gachaTotalCount- gachaRemainingCount).padStart(numberOfDigits, '0');


                        ///////////////////////////////
                        //  GachaDisplayを判定していくために
                        //  各状態のフラグ化
                        //  hidden, countdown, display, soldout
                        //  setGachaDisplay('')
                        //  ‼️販売終了で在庫0にする
                        //
                        //  表示開始日を超過しているかどうか？
                        gachaPostStartDateExceed = true;
                        if(currentDateTimeUTC >= gachaPostStartDate){
                            // console.log("[ProductList]gachaPostStartDateExceed", currentDateTimeUTC, ">", gachaPostStartDate)
                            // console.log("[ProductList]",productKey,"表示開始日時を超過している", currentDateTimeUTC, ">", gachaPostStartDate)
                            //  表示開始日時を超過している
                            gachaPostStartDateExceed = true;
                        }else if(currentDateTimeUTC < gachaPostStartDate){
                            // console.log("[ProductList]",productKey,"表示開始日時を超過していない", currentDateTimeUTC, ">", gachaPostStartDate)
                            //  表示開始日時を超過していない
                            gachaPostStartDateExceed = false;   //  念の為
                        }else{
                            // console.log("[ProductList]",productKey,"表示開始日時を判断できない", currentDateTimeUTC, ">", gachaPostStartDate)
                            gachaPostStartDateExceed = true;
                        }
                        //  ガチャ開始日を超過しているかどうか？
                        if(Math.floor(currentDateTimeUTC) > Math.floor(gachaStartDate)){
                            // console.log("[ProductList]gachaStartDateExceed", currentDateTimeUTC, ">", gachaStartDate)
                            //  ガチャ開始日を超過している
                            gachaStartDateExceed = true;
                        }else if(Math.floor(currentDateTimeUTC) <= Math.floor(gachaStartDate)){
                            // console.log("[ProductList]ガチャ開始日を超過していない", currentDateTimeUTC, "<", gachaStartDate)
                            //  ガチャ開始日を超過していない
                            gachaStartDateExceed = false;   //  念の為
                            //  開始日
                            gachaStartDateTime = gachaStartDate
                            // console.log("[ProductList]gachaStartDateTime", gachaStartDateTime)
                            //  残りの時間
                            gachaStartRemainingTime = gachaStartDate - currentDateTimeUTC - 4000; //開始の瞬間の演出のため数秒時計を遅らせる
                            gachaStartRemainingDay = Math.floor(gachaStartRemainingTime/1000/60/60/24);
                            gachaStartRemainingHour = Math.floor(gachaStartRemainingTime/1000/60/60)%24;
                            gachaStartRemainingMinutes = Math.floor(gachaStartRemainingTime/1000/60)%60;
                            gachaStartRemainingSeconds = Math.floor(gachaStartRemainingTime/100)%60;    //小数点のこす
                            gachaStartRemainingTotalSeconds = Math.floor(gachaStartRemainingTime/100);    //小数点のこす
                        }else{
                            //  ガチャ開始日を超過しているか判定できない
                            gachaStartDateExceed = true;
                        }
                        //  ガチャ終了日を超過しているかどうか？
                        if(currentDateTimeUTC >= gachaEndDate){
                            // console.log("[ProductList]gachaEndDateExceed", currentDateTimeUTC, ">", gachaEndDate)
                            //  ガチャ終了日を超過している
                            gachaEndDateExceed = true;
                            }else{
                            //  ガチャ終了日を超過していない
                            // console.log("[ProductList]ガチャ終了日を超過していない", currentDateTimeUTC, "<", gachaEndDate)
                            gachaEndDateExceed = false;   //  念の為
                        }
                        //  ガチャ完売しているかどうか？
                        //  念の為マイナスも考慮
                        if(gachaRemainingCount <= 0){
                            // console.log("[ProductList]gachaRemainingCount", gachaRemainingCount)
                            //  ガチャ完売している
                            gachaOutOfStock = true;
                        }else{
                            //  ガチャ完売していない
                            gachaOutOfStock = false;   //  念の為
                        }
                        ////////////////////////
                        //  GachaDisplayの判断
                        ////////////////////////
                        if(gachaViewFlag){
                            //  発売前表示フラグ=表示
                            if(gachaPostStartDateExceed){
                                //  表示開始時刻＝超過
                                if(gachaStartDateExceed){
                                    //  販売開始時刻＝超過
                                    if(gachaOutOfStock){
                                        //  在庫状態＝完売
                                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                    }else{
                                        //  在庫状態＝在庫あり
                                        if(gachaEndDateExceed){
                                            //  ガチャ終了日=超過
                                            displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                        }else{
                                            //  ガチャ終了日=未超過
                                            //  ❗️通常表示確定
                                            gachaDisplay = 'display';
                                        }
                                    }
                                }else{
                                    //  販売開始時刻＝未超過
                                    //  ❗️カウントダウン表示確定
                                    gachaDisplay = 'countdown';
                                }
                            }else{
                                //  表示開始時刻＝未超過
                                if(gachaStartDateExceed){
                                    //  販売開始時刻＝超過
                                    //  設定誤りで表示開始時刻より前に販売が開始されるケース
                                    //  予告なしにいきなり出現
                                    if(gachaOutOfStock){
                                        //  在庫状態＝完売
                                        //  何らかの操作で在庫ゼロで開始を迎える
                                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                    }else{
                                        //  在庫状態＝在庫あり
                                        if(gachaEndDateExceed){
                                            //  ガチャ終了日=超過
                                            displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                        }else{
                                            //  ガチャ終了日=未超過
                                            //  ❗️通常表示確定
                                            gachaDisplay = 'display';
                                        }
                                    }
                                }else{
                                    //  販売開始時刻＝未超過
                                    //  ❗️非表示確定
                                    gachaDisplay = 'hidden';
                                }
                            }
                        }else{
                            //  発売前表示フラグ=非表示
                            if(gachaOutOfStock){
                                //  在庫状態＝完売
                                displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                            }else{
                                //  在庫状態＝在庫あり
                                if(gachaEndDateExceed){
                                    //  ガチャ終了日=超過
                                    displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                }else{
                                    //  ガチャ終了日=未超過
                                    //  ❗️非表示確定
                                    gachaDisplay = 'hidden';
                                }
                            }
                        }
                        //
                        //  GachaDisplayを判定していくために
                        //  各状態のフラグ化
                        ///////////////////////////////

                        ///////////////////////////////
                        //  rate calculation
                        //  残量LIFEゲージの計算
                        //
                        remainingRate = Math.floor(gachaRemainingCount / gachaTotalCount * 100);
                        // console.log("[ProductList]remainingRate", remainingRate)
                        remainingLevel = Math.floor(remainingRate / 5)*5;
                        // console.log("[ProductList]remainingLevel", remainingLevel)
                        if(gachaRemainingCount === 0){
                            remainingLevel = "empty"
                        }
                        //
                        ///////////////////////////////

                        if(gachaDisplay === 'soldout'){
                            //  売り切れ or countdown表示
                            productFilterClass = soldOutClass;
                            //　商品丸ごと非表示を初期化
                            productWrapHiddenClass = '';
                        }else if(gachaDisplay === 'countdown'){
                            //  売り切れ or countdown表示
                            productFilterClass = countdownClass;
                            //　商品丸ごと非表示を初期化
                            productWrapHiddenClass = '';
                        }else if(gachaDisplay === 'hidden'){
                            //  売り切れ or countdown表示を初期化
                            productFilterClass = '';
                            //　商品丸ごと非表示
                            productWrapHiddenClass = 'hidden';
                        }else{
                            //  売り切れ or countdown表示を初期化
                            productFilterClass = '';
                            //　商品丸ごと非表示を初期化
                            productWrapHiddenClass = '';
                        }

                        ///////////////////////////////
                        //  カテゴリーによる最終仕分け
                        //  (gachaGenreId === 1)
                        //
                        if(gachaGenreId === 1 || gachaGenreId === 2 || gachaGenreId === 3 ){
                            //  目的のジャンルであるのでここでは表示しない
                            productWrapHiddenClass = 'hidden';

                        }else{
                            //  目的のジャンルではないのでここでは表示
                            if(gachaDisplay !== 'hidden'){
                                if(!hasGachaGenreIdOther){setHasGachaGenreIdOther(true)}
                            }
                        }



                        // console.log("[ProductList]productKey=====>",productKey)
                        // console.log("[ProductList]productListArraySingle=====>",productListArraySingle)
                        // console.log("[ProductList]productListArraySingle[productKey]=====>",productListArraySingle[productKey])
                        return (
                            <>
                                <div 
                                    key={`${productKey}`}
                                    id={`${productKey}-Wrap`}
                                    className={`${productWrapHiddenClass} ${productWrapStyle}`}
                                    // onClick={go2gacha}
                                    title={`${translationObj[productKey].gachaTranslateName} | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}
                                    onClick={(e) => go2gacha({data:translationObj[productKey]})}
                                    // onClick={
                                    //     gachaDisplay === 'soldout' ?
                                    //     (e) => openGachaHistory(translationObj[productKey],e)
                                    //     :(e) => go2gacha({data:translationObj[productKey]})
                                    // }
                                    >
                                        <figure 
                                            loading="lazy"
                                            id={productKey}
                                            className={`${productFilterClass} ${productBgStyle}`}
                                            style={{ backgroundImage: `url(${translationObj[productKey].gachaTranslateImageMain})` }}
                                        >
                                            <img className="hidden" src={`${translationObj[productKey].gachaTranslateImageMain}`} alt={`${translationObj[productKey].gachaTranslateName}-thumbnail | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}></img>
                                        </figure>
                                        <div className={`${productFilterClass} ${productFooterWrapClass}`}>
                                            <div className="flex-none w-32 items-end flex">
                                                {gachaRemainingDisplayFlag ?
                                                    <p className={`${remainingNumberClass}`}>{gachaRemainingCount.toLocaleString()}/{gachaTotalCount.toLocaleString()}</p>
                                                : ''}
                                            </div>
                                            <div className={`product-footer-panel--life-${remainingLevel} grow flex justify-between self-center max-w-xs`}>
                                                {/* <div className="ml-[3%] w-[44%] bg-gradient-to-r from-red-700 via-amber-600 to-lime-600 bg-gradient-t-to-b "></div> */}
                                                <div className="pl-[10%] ">
                                                {gachaRemainingDisplayFlag ? <p className={`${productFooterNameClass}`}>#{nowCount}</p>: ''}
                                                </div>
                                                <div className="flex justify-end">
                                                    <p className="leading-8 font-Noto text-xs -bottom-0.5">
                                                        {intl.formatMessage({ id: 'card_number' },{ number: 1 })}
                                                    </p>
                                                    <p className="leading-8 text-sm font-Roboto font-black">{gachaSinglePoint.toLocaleString()}</p>
                                                    <p className="leading-8 pr-1 font-Noto text-xs -bottom-0.5">pt</p>
                                                </div>
                                            </div>
                                        </div>
                                        {gachaDisplay === 'countdown'?
                                        <CountDown key={`other-${productKey}`}
                                        data={{
                                            gachaDisplay : gachaDisplay,
                                            day:gachaStartRemainingDay,
                                            hour:gachaStartRemainingHour,
                                            minutes:gachaStartRemainingMinutes,
                                            seconds:gachaStartRemainingSeconds,
                                            start:gachaStartDate,
                                            remainingTotalSeconds:gachaStartRemainingTotalSeconds
                                            }}/>
                                        :<></>}
                                        {gachaDisplay === 'soldout'?
                                        <SoldOut
                                        key={`${productKey}`}/>
                                        :<></>}
                                </div>
                            </>
                        );
                    })}
                    {/* APIから取得しないデザイン確認用のパック */}
                    <Headline 
                        type="h2"
                        // spanText={intl.formatMessage({ id: 'Bonus_oripa' })}
                        spanText={intl.formatMessage({ id: 'Layout_test' })}
                        spanClass="text-center text-sm text-white"
                        headlineText="TESTING ITEM"
                        headlineClass="text-center text-5xl font-bold font-Prompt text-white sm:col-span-2 lg:col-span-3 flex flex-col"
                    />
                    {////////////////////////////////////
                    //  Only For testing
                    //  残数表示・カウントダウン・sold out・非表示
                    //  テスト用
                    //  売り切れ
                    //  発売前の表示
                    //

                    Object.keys(testingObj).map((productKey) => {
                        // console.log("[ProductList]productKey===>", productKey)
                        // console.log("[ProductList]productListArray[productKey]===>", testingObj[productKey])
                        // console.log("[ProductList]productListArray[productKey].productThumbnail===>", testingObj[productKey].productThumbnail)

                        ///////////////////////////////
                        // set from json
                        //
                        // gachaRemainingCount = Math.floor( Math.random() * ( 30000 - 0 ) + 0);
                        // gachaRemainingCount = 2;
                        gachaRemainingCount = testingObj[productKey].gachaRemainingCount;
                        // gachaTotalCount = 30000; // set dummy
                        gachaTotalCount = testingObj[productKey].gachaTotalCount;
                        // gachaSinglePoint = 99999 // set dummy
                        gachaSinglePoint = testingObj[productKey].gachaSinglePoint;
                        gachaRemainingDisplayFlag = testingObj[productKey]?.gachaRemainingDisplayFlag;
                        //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
                        gachaViewFlag = testingObj[productKey]?.gachaViewFlag;
                        // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
                        gachaSoldOutFlag = testingObj[productKey]?.gachaSoldOutFlag;
                        gachaPostStartDate = testingObj[productKey]?.gachaPostStartDate;
                        gachaStartDate = testingObj[productKey]?.gachaStartDate;
                        gachaEndDate = testingObj[productKey]?.gachaEndDate;
                        
                        //
                        ///////////////////////////////

                        ///////////////////////////////
                        // 現在の#を求める
                        ///////////////////////////////
                        //  最大数の桁数
                        numberOfDigits = gachaRemainingCount.toString().length;
                        //  現在の回転数　を　最大数の桁数でゼロ埋め
                        nowCount = String(gachaTotalCount- gachaRemainingCount).padStart(numberOfDigits, '0');


                        ///////////////////////////////
                        //  GachaDisplayを判定していくために
                        //  各状態のフラグ化
                        //  hidden, countdown, display, soldout
                        //  setGachaDisplay('')
                        //  ‼️販売終了で在庫0にする
                        //
                        //  表示開始日を超過しているかどうか？
                        gachaPostStartDateExceed = true;
                        if(currentDateTimeUTC >= gachaPostStartDate){
                            // console.log("[ProductList]gachaPostStartDateExceed", currentDateTimeUTC, ">", gachaPostStartDate)
                            // console.log("[ProductList]",productKey,"表示開始日時を超過している", currentDateTimeUTC, ">", gachaPostStartDate)
                            //  表示開始日時を超過している
                            gachaPostStartDateExceed = true;
                        }else if(currentDateTimeUTC < gachaPostStartDate){
                            // console.log("[ProductList]",productKey,"表示開始日時を超過していない", currentDateTimeUTC, ">", gachaPostStartDate)
                            //  表示開始日時を超過していない
                            gachaPostStartDateExceed = false;   //  念の為
                        }else{
                            // console.log("[ProductList]",productKey,"表示開始日時を判断できない", currentDateTimeUTC, ">", gachaPostStartDate)
                            gachaPostStartDateExceed = true;
                        }
                        //  ガチャ開始日を超過しているかどうか？
                        if(Math.floor(currentDateTimeUTC) > Math.floor(gachaStartDate)){
                            // console.log("[ProductList]gachaStartDateExceed", currentDateTimeUTC, ">", gachaStartDate)
                            //  ガチャ開始日を超過している
                            gachaStartDateExceed = true;
                        }else if(Math.floor(currentDateTimeUTC) <= Math.floor(gachaStartDate)){
                            // console.log("[ProductList]ガチャ開始日を超過していない", currentDateTimeUTC, "<", gachaStartDate)
                            //  ガチャ開始日を超過していない
                            gachaStartDateExceed = false;   //  念の為
                            //  開始日
                            gachaStartDateTime = gachaStartDate
                            // console.log("[ProductList]gachaStartDateTime", gachaStartDateTime)
                            //  残りの時間　❗️デザインテスト
                            gachaStartRemainingTime = gachaStartDate - currentDateTimeUTC - 4000; //開始の瞬間の演出のため残り時間を補正
                            gachaStartRemainingDay = Math.floor(gachaStartRemainingTime/1000/60/60/24);
                            gachaStartRemainingHour = Math.floor(gachaStartRemainingTime/1000/60/60)%24;
                            gachaStartRemainingMinutes = Math.floor(gachaStartRemainingTime/1000/60)%60;
                            gachaStartRemainingSeconds = Math.floor(gachaStartRemainingTime/1000)%60;
                            gachaStartRemainingTotalSeconds = Math.floor(gachaStartRemainingTime/1000);

                        }else{
                            //  ガチャ開始日を超過しているか判定できない
                            gachaStartDateExceed = true;
                        }
                        //  ガチャ終了日を超過しているかどうか？
                        if(currentDateTimeUTC >= gachaEndDate){
                            // console.log("[ProductList]gachaEndDateExceed", currentDateTimeUTC, ">", gachaEndDate)
                            //  ガチャ終了日を超過している
                            gachaEndDateExceed = true;
                            }else{
                            //  ガチャ終了日を超過していない
                            // console.log("[ProductList]ガチャ終了日を超過していない", currentDateTimeUTC, "<", gachaEndDate)
                            gachaEndDateExceed = false;   //  念の為
                        }
                        //  ガチャ完売しているかどうか？
                        //  念の為マイナスも考慮
                        if(gachaRemainingCount <= 0){
                            // console.log("[ProductList]gachaRemainingCount", gachaRemainingCount)
                            //  ガチャ完売している
                            gachaOutOfStock = true;
                        }else{
                            //  ガチャ完売していない
                            gachaOutOfStock = false;   //  念の為
                        }
                        ////////////////////////
                        //  GachaDisplayの判断
                        ////////////////////////
                        if(gachaViewFlag){
                            //  発売前表示フラグ=表示
                            if(gachaPostStartDateExceed){
                                //  表示開始時刻＝超過
                                if(gachaStartDateExceed){
                                    //  販売開始時刻＝超過
                                    if(gachaOutOfStock){
                                        //  在庫状態＝完売
                                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                    }else{
                                        //  在庫状態＝在庫あり
                                        if(gachaEndDateExceed){
                                            //  ガチャ終了日=超過
                                            displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                        }else{
                                            //  ガチャ終了日=未超過
                                            //  ❗️通常表示確定
                                            gachaDisplay = 'display';
                                        }
                                    }
                                }else{
                                    //  販売開始時刻＝未超過
                                    //  ❗️カウントダウン表示確定
                                    gachaDisplay = 'countdown';
                                }
                            }else{
                                //  表示開始時刻＝未超過
                                if(gachaStartDateExceed){
                                    //  販売開始時刻＝超過
                                    //  設定誤りで表示開始時刻より前に販売が開始されるケース
                                    //  予告なしにいきなり出現
                                    if(gachaOutOfStock){
                                        //  在庫状態＝完売
                                        //  何らかの操作で在庫ゼロで開始を迎える
                                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                    }else{
                                        //  在庫状態＝在庫あり
                                        if(gachaEndDateExceed){
                                            //  ガチャ終了日=超過
                                            displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                        }else{
                                            //  ガチャ終了日=未超過
                                            //  ❗️通常表示確定
                                            gachaDisplay = 'display';
                                        }
                                    }
                                }else{
                                    //  販売開始時刻＝未超過
                                    //  ❗️非表示確定
                                    gachaDisplay = 'hidden';
                                }
                            }
                        }else{
                            //  発売前表示フラグ=非表示
                            if(gachaOutOfStock){
                                //  在庫状態＝完売
                                displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                            }else{
                                //  在庫状態＝在庫あり
                                if(gachaEndDateExceed){
                                    //  ガチャ終了日=超過
                                    displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                                }else{
                                    //  ガチャ終了日=未超過
                                    //  ❗️非表示確定
                                    gachaDisplay = 'hidden';
                                }
                            }
                        }
                        //
                        //  GachaDisplayを判定していくために
                        //  各状態のフラグ化
                        ///////////////////////////////

                        ///////////////////////////////
                        //  rate calculation
                        //  残量LIFEゲージの計算
                        //
                        remainingRate = Math.floor(gachaRemainingCount / gachaTotalCount * 100);
                        // console.log("[ProductList]remainingRate", remainingRate)
                        remainingLevel = Math.floor(remainingRate / 5)*5;
                        // console.log("[ProductList]remainingLevel", remainingLevel)
                        if(gachaRemainingCount === 0){
                            remainingLevel = "empty"
                        }
                        //
                        ///////////////////////////////

                        if(gachaDisplay === 'soldout'){
                            //  売り切れ or countdown表示
                            productFilterClass = soldOutClass;
                            //　商品丸ごと非表示を初期化
                            productWrapHiddenClass = '';
                        }else if(gachaDisplay === 'countdown'){
                            //  売り切れ or countdown表示
                            productFilterClass = countdownClass;
                            //　商品丸ごと非表示を初期化
                            productWrapHiddenClass = '';
                        }else if(gachaDisplay === 'hidden'){
                            //  売り切れ or countdown表示を初期化
                            productFilterClass = '';
                            //　商品丸ごと非表示
                            productWrapHiddenClass = 'hidden';
                        }else{
                            //  売り切れ or countdown表示を初期化
                            productFilterClass = '';
                            //　商品丸ごと非表示を初期化
                            productWrapHiddenClass = '';
                        }

            
                        return (
                            <>
                                <div 
                                    key={`${productKey}`}
                                    id={`${productKey}-Wrap`}
                                    className={`${productWrapHiddenClass} ${productWrapStyle}`}
                                    // onClick={go2gacha}
                                    title={`${testingObj[productKey].gachaTranslateName} | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}
                                    // onClick={(e) => go2gacha({data:translationObj[productKey]})}
                                    // onClick={
                                    //     gachaDisplay === 'soldout' ?
                                    //     (e) => openGachaHistory(testingObj[productKey],e)
                                    //     :(e) => go2gacha()
                                    // }
                                    >
                                        <figure 
                                            loading="lazy"
                                            id={productKey}
                                            className={`${productFilterClass} ${productBgStyle}`}
                                            style={{ backgroundImage: `url(${testingObj[productKey].gachaTranslateImageMain})` }}
                                        >
                                            <img className="hidden" src={`${testingObj[productKey].gachaTranslateImageMain}`} alt={`${testingObj[productKey].gachaTranslateName}-thumbnail | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}></img>
                                        </figure>
                                        <div className={`${productFilterClass} ${productFooterWrapClass}`}>
                                            <div className="flex-none w-32 items-end flex">
                                                {gachaRemainingDisplayFlag ?
                                                    <p className={`${remainingNumberClass}`}>{gachaRemainingCount.toLocaleString()}/{gachaTotalCount.toLocaleString()}</p>
                                                : ''}
                                            </div>
                                            <div className={`product-footer-panel--life-${remainingLevel} grow flex justify-between self-center max-w-xs`}>
                                                {/* <div className="ml-[3%] w-[44%] bg-gradient-to-r from-red-700 via-amber-600 to-lime-600 bg-gradient-t-to-b "></div> */}
                                                <div className="pl-[10%] ">
                                                {gachaRemainingDisplayFlag ? <p className={`${productFooterNameClass}`}>#{nowCount}</p>: ''}
                                                </div>
                                                <div className="flex justify-end">
                                                    <p className="leading-8 font-Noto text-xs -bottom-0.5">
                                                        {intl.formatMessage({ id: 'card_number' },{ number: 1 })}
                                                    </p>
                                                    <p className="leading-8 text-sm font-Roboto font-black">{gachaSinglePoint.toLocaleString()}</p>
                                                    <p className="leading-8 pr-1 font-Noto text-xs -bottom-0.5">pt</p>
                                                </div>
                                            </div>
                                        </div>
                                        {gachaDisplay === 'countdown'?
                                        <CountDown 
                                        key={`test-${productKey}`}
                                        data={{
                                            gachaDisplay : gachaDisplay,
                                            day:gachaStartRemainingDay,
                                            hour:gachaStartRemainingHour,
                                            minutes:gachaStartRemainingMinutes,
                                            seconds:gachaStartRemainingSeconds,
                                            start:gachaStartDate,
                                            remainingTotalSeconds:gachaStartRemainingTotalSeconds                                        
                                            }}/>
                                        :<></>}
                                        {gachaDisplay === 'soldout'?
                                        <SoldOut key={`${productKey}`}/>
                                        :<></>}
                                </div>
                                
                            </>
                        );
                    })}
                </>
                :   //  デバッグじゃない時は何も表示しない
                <></>}
            </div>
        </section>
    </>
    );
};


