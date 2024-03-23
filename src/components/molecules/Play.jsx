import React, { useRef, useState, useEffect, useCallback, useLayoutEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams, useParams } from "react-router-dom";
import { productListStateMultilingual } from "../../store/recoil/productListStateMultilingual";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";
import { KiraKiraButton } from "../atoms/buttons/KiraKiraButton";
import { modalState } from "../../store/recoil/modalState";
import { MysteryCircle } from "../atoms/material/MysteryCircle";
import { LongPressEventType, useLongPress } from "use-long-press";
import {useIntl} from 'react-intl'
import '../../css/Play.css';
import { CountDown } from "./CountDown";
import { SoldOut } from "./SoldOut";
import useFetchGachaHistoryQuery from "../../hooks/useFetchGachaHistoryQuery";

let playInterval;

export const Play = () => {
    const intl = useIntl()
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [fetchGachaHistory] = useFetchGachaHistoryQuery();

    /////////////////////////////////////
    //  ユーザーに割り当てられた利用言
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[Play]languageResource=>", languageResource)

    // let translationObj;
    /////////////////////////////////////
    //  APIからの返却が多言語の場合
    // const [productListArray, setProductList] = useRecoilState(productListStateMultilingual);
    // translationObj = productListArray[languageResource];
    /////////////////////////////////////
    // APIからの返却が単言語の場合
    const [productListArraySingle, setProductListSingle] = useRecoilState(productListState);
    // translationObj = productListArraySingle;
    
    
    // console.log("[Play]productListArraySingle==>", productListArraySingle)
    const { id } = useParams();
    // console.log("[Play]useParams.id=======>",id);

    //  テスト用の基準時間セット
    let testDateTimeUTC;
    testDateTimeUTC = new Date(UserStateObj.currentDateTimeUTC)
    useLayoutEffect(() => {
        setUserState((prevState) => ({
            ...prevState,
            currentDateTimeUTC : Date.now()
        }))
    }, []);

    // console.log("[Play]testDateTimeUTC=======>",testDateTimeUTC);

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
        takeAllGacha,
        gachaSinglePoint,
        gachaConosecutivePoint,
        gachaTotalCount,
        gachaRemainingCount,
        gachaAllRestCount,
        //  連続ガチャの回数
        gachaConosecutiveCount,
        //  テスト用に初期値を設定
        //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
        gachaViewFlag = true,
        // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
        gachaSoldOutFlag  = true,
        //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
        gachaPostStartDate = testDateTimeUTC.setSeconds(testDateTimeUTC.getSeconds() + 1),  //  秒後に表示開始　表示後はカウントダウン　表示前はリダイレクト
        //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
        gachaStartDate = testDateTimeUTC.setSeconds(testDateTimeUTC.getSeconds() + 69),  //   秒後にパック解禁
        // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
        gachaEndDate = testDateTimeUTC.setSeconds(testDateTimeUTC.getSeconds() + 180),  //    秒後にパック販売停止　停止後はリダイレクト
        //	残数表示フラグ  
        gachaRemainingDisplayFlag,
    // } = productListArraySingle[0];
    // } = productListArraySingle.find((row) => row.gachaId == id) 
    } = productListArraySingle[id]

    // console.log("[Play]gachaTranslateImageMain=======>",gachaTranslateImageMain);



    ///////////////////////////////
    //  現在時刻UTCの維持
    //  初期値は今
    // const currentDateTimeUTC = UserStateObj.currentDateTimeUTC;
    const [currentDateTimeUTC, setCurrentDateTimeUTC] = useState(Date.now());
    let tick = () => {
        setCurrentDateTimeUTC(Date.now());
        // console.log("[Play]currentDateTimeUTC==>",currentDateTimeUTC)
    };
    useLayoutEffect(() => {
        if(modalStateValue.BaseModalOpen){
            clearInterval(playInterval);
        }else{
                // intervalがすでに有るのなら、それはキャンセル。
                if(playInterval) {
                    clearInterval(playInterval);
                }
                // あらためてintervalを作成
                playInterval = setInterval(tick,1000);
        }
    }, [modalStateValue.BaseModalOpen])
    //
    //////////////////////////////

    ///////////////////////////////
    //  GachaDisplayを判定していくために
    //  各状態のフラグ化
    //  hidden, countdown, display, soldout
    //  setGachaDisplay('')
    //  ‼️販売終了で在庫0にする
    //
    let gachaPostStartDateExceed = true
    let gachaStartDateExceed = true
    let gachaEndDateExceed = false
    let gachaOutOfStock = false
    let gachaStartDateTime;
    let gachaStartRemainingTime;
    let gachaStartRemainingDay;
    let gachaStartRemainingHour;
    let gachaStartRemainingMinutes;
    let gachaStartRemainingSeconds;
    let gachaStartRemainingTotalSeconds;
    let gachaDisplay;
    let playButtonFilterClass;
    let playButtonWrapHiddenClass = '';
    let soldOutClass = 'soldOutClass';
    let countdownClass = 'countdownClass';
    let viewResetButton = gachaRemainingCount <= gachaAllRestCount;

    //  売り切れ表示最終判定
    function displayOutOfStock(e) {
        // console.log('[Play]function displayOutOfStock=>e.gachaSoldOutFlag==>',e.gachaSoldOutFlag);
        if(e.gachaSoldOutFlag){
            //  ❗️売り切れ表示確定
            gachaDisplay = 'soldout';
            //  ❗️販売できる商品が０になる
            // gachaRemainingCount = 0; //playで表示しないので避ける　cnstでもある
        }else{
            //  ❗️非表示確定
            // gachaDisplay = 'hidden';
            //  ❗️売り切れ表示確定
            gachaDisplay = 'soldout';   //この状態を見ることは相当な例外
            // alert('販売終了。そして非表示。この画面を見てはいけない状況です')
        }
    }



    //  表示開始日を超過しているかどうか？
    if(currentDateTimeUTC >= gachaPostStartDate){
        // console.log("[Play]表示開始日時を超過している", currentDateTimeUTC, ">", gachaPostStartDate)
        //  表示開始日時を超過している
        gachaPostStartDateExceed = true;
    }else if(currentDateTimeUTC < gachaPostStartDate){
        // console.log("[Play]表示開始日時を超過していない", currentDateTimeUTC, ">", gachaPostStartDate)
        //  表示開始日時を超過していない
        gachaPostStartDateExceed = false;   //  念の為
    }else{
        // console.log("[Play]表示開始日時を判断できない", currentDateTimeUTC, ">", gachaPostStartDate)
        gachaPostStartDateExceed = true;
    }
    // //  ガチャ開始日を超過しているかどうか？
    if(Math.floor(currentDateTimeUTC) > Math.floor(gachaStartDate)){
        // console.log("[ProductList]gachaStartDateExceed", currentDateTimeUTC, ">", gachaStartDate)
        //  ガチャ開始日を超過している
        gachaStartDateExceed = true;
    }else if(Math.floor(currentDateTimeUTC) <= Math.floor(gachaStartDate)){
        // console.log("[Play]ガチャ開始日を超過していない", currentDateTimeUTC, "<", gachaStartDate)
        //  ガチャ開始日を超過していない
        gachaStartDateExceed = false;   //  念の為
        //  開始日
        gachaStartDateTime = gachaStartDate
        // console.log("[Play]gachaStartDateTime", gachaStartDateTime)
        //  残りの時間
        gachaStartRemainingTime = gachaStartDate - currentDateTimeUTC - 4000; //開始の瞬間の演出のため数秒時計を遅らせる
        gachaStartRemainingDay = Math.floor(gachaStartRemainingTime/1000/60/60/24);
        gachaStartRemainingHour = Math.floor(gachaStartRemainingTime/1000/60/60)%24;
        gachaStartRemainingMinutes = Math.floor(gachaStartRemainingTime/1000/60)%60;
        gachaStartRemainingSeconds = Math.floor(gachaStartRemainingTime/1000)%60;
        gachaStartRemainingTotalSeconds = Math.floor(gachaStartRemainingTime/1000);

    }else{
        //  ガチャ開始日を超過しているか判定できない
        gachaStartDateExceed = true;
    }
    // //  ガチャ終了日を超過しているかどうか？
    if(currentDateTimeUTC >= gachaEndDate){
        // console.log("[Play]gachaEndDateExceed", currentDateTimeUTC, ">", gachaEndDate)
        // //  ガチャ終了日を超過している
        gachaEndDateExceed = true;
    }else{
        //  ガチャ終了日を超過していない
        // console.log("[Play]ガチャ終了日を超過していない", currentDateTimeUTC, "<", gachaEndDate)
        gachaEndDateExceed = false;   //  念の為
    }
    // //  ガチャ完売しているかどうか？
    // //  念の為マイナスも考慮
    if(gachaRemainingCount <= 0){
        // console.log("[Play]gachaRemainingCount", gachaRemainingCount)
        //  ガチャ完売している
        gachaOutOfStock = true;
    }else{
        //  ガチャ完売していない
        gachaOutOfStock = false;   //  念の為
    }

    // console.log("@@@@@ gachaOutOfStock",gachaOutOfStock);
    // console.log("@@@@@ gachaEndDateExceed",gachaEndDateExceed);
    // console.log("@@@@@ gachaSoldOutFlag",gachaSoldOutFlag);
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
                // alert('販売開始時刻＝未超過。そして非表示。この画面を見てはいけない状況です')
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
                // alert('発売前表示フラグ=非表示。そしてガチャ終了日=未超過。この画面を見てはいけない状況です')
                
            }
        }
    }
    //
    //  GachaDisplayを判定していくために
    //  各状態のフラグ化
    ///////////////////////////////


    ///////////////////////////////
    //  フラグをもとに適切なClassをSET
    if(gachaDisplay === 'soldout'){
        //  売り切れ or countdown表示
        playButtonFilterClass = soldOutClass;
        //　ボタンエリア丸ごと非表示
        playButtonWrapHiddenClass = 'hidden';
        // console.log("@@@@@ gachaDisplay === soldout");
    }else if(gachaDisplay === 'countdown'){
        //  売り切れ or countdown表示
        playButtonFilterClass = countdownClass;
        //　ボタンエリア丸ごと非表示
        playButtonWrapHiddenClass = 'hidden';
        // console.log("@@@@@ gachaDisplay === countdown");
    }else if(gachaDisplay === 'hidden'){
        //  売り切れ or countdown表示を初期化
        playButtonFilterClass = '';
        //　ボタンエリア丸ごと非表示
        playButtonWrapHiddenClass = 'hidden';
        // console.log("@@@@@ gachaDisplay === hidden");
    }else{
        //  売り切れ or countdown表示を初期化
        playButtonFilterClass = '';
        //　ボタンエリア丸ごと非表示を初期化
        playButtonWrapHiddenClass = '';
    }
    //  フラグをもとに適切なClassをSET
    ///////////////////////////////


    ///////////////////////////////
    // set fron API
    ///////////////////////////////
    // let gachaRemainingCount;
    // let gachaTotalCount;
    // let gachaSinglePoint;
    let remainingLevel;
    let remainingRate;

    // gachaRemainingCount = Math.floor( Math.random() * ( 30000 - 0 ) + 0);
    // gachaRemainingCount = 2;
    // gachaTotalCount = 30000; // set dummy
    // gachaSinglePoint = 99999 // set dummy
    ///////////////////////////////
    ///////////////////////////////
    // rate calculation
    ///////////////////////////////
    remainingRate = Math.floor(gachaRemainingCount / gachaTotalCount * 100);
    // console.log("[Play]remainingRate", remainingRate)
    remainingLevel = Math.floor(remainingRate / 5)*5;
    // console.log("[Play]remainingLevel", remainingLevel)
    if(gachaRemainingCount === 0){
        remainingLevel = "empty"
    }

    //  確認モーダルの起動
    function openConfirm(e) {
        // console.log("[setModalState]", e.key)
        console.log('[Play]openConfirm=>e==>',e);
        let modalType = 'Confirm';
        let openData = e;
        console.log('[Play]openData.takeNumber==>',openData.takeNumber);
        //  長押しからの0円で0回引くの対策
        //  openData.takeNumberがある時だけ最終確認に進む
        //  openData.priceは0円ガチャがあるので見てはならない
        if(openData.takeNumber){
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: modalType,
                // mode : openMode,
                data : openData,
            }))
        }

    }

    const [enabled, setEnabled] = useState(true);
    const [longPressed, setLongPressed] = useState(false);
    // console.log("[Play]longPressed:1==>", longPressed);
    const [MysteryCircleWrapDisplay, setMysteryCircleWrapDisplay] = useState('hidden');
    // const [MysteryCircleWrapDisplay, setMysteryCircleWrapDisplay] = useState('flex');

    //  長押しが成立した時
    const callback = useCallback(() => {
        // alert('Long pressed!');
        console.log("[Play]Long pressed!", callback);
        setMysteryCircleWrapDisplay("flex");
        setLongPressed(true);
    }, []);


    
    const bind = useLongPress(enabled ? callback : null, {
    onStart: (event, meta) => {
        // console.log("[Play]Press started", meta);
        // console.log("[Play]Press started event", event);
        // console.log("[Play]MysteryCircleWrapDisplay", MysteryCircleWrapDisplay);
        // console.log("[Play]longPressed:onStart==>", longPressed);
        // console.log("[Play]callback:onStart==>", callback);
        
    },
    onFinish: (event, meta) => {
        setLongPressed(false);
        // console.log("[Play]Long press finished", meta);
        setMysteryCircleWrapDisplay("hidden");
        // console.log("[Play]MysteryCircleWrapDisplay", MysteryCircleWrapDisplay);
        openConfirm({...productListArraySingle,...meta.context})
        // console.log("[Play]longPressed:onFinish==>", longPressed);
        // console.log("[Play]longPressed:onFinish:event==>", event);

    },
    onCancel: (event, meta) => {
        setLongPressed(false);
        // console.log("[Play]Press cancelled", meta);
        setMysteryCircleWrapDisplay("hidden");
        // console.log("[Play]MysteryCircleWrapDisplay", MysteryCircleWrapDisplay);
        // console.log("[Play]longPressed:onCancel==>", longPressed);
    },
    onMove: (event, meta) => {
        // setLongPressed(false);
        // setMysteryCircleWrapDisplay("hidden");
        // console.log("[Play]onMove", meta);
        // console.log("[Play]MysteryCircleWrapDisplay", MysteryCircleWrapDisplay);
    },
    onTouchStart: (event, meta) => {
        console.log("[Play]onTouchStart", meta);
        console.log("[Play]MysteryCircleWrapDisplay", MysteryCircleWrapDisplay);
    },
    onTouchMove: (event, meta) => {
        console.log("[Play]onTouchMove", meta);
        console.log("[Play]MysteryCircleWrapDisplay", MysteryCircleWrapDisplay);
    },
    onTouchEnd: (event, meta) => {
        
        console.log("[Play]onTouchEnd", meta);
        console.log("[Play]MysteryCircleWrapDisplay", MysteryCircleWrapDisplay);
    },
    onPointerLeave: (event, meta) => {

        console.log("[Play]onPointerLeave", meta);
        console.log("[Play]MysteryCircleWrapDisplay", MysteryCircleWrapDisplay);
    },
    //onMove: () => console.log("Detected mouse or touch movement"),
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: 3600,
    captureEvent: true,
    cancelOnMovement: false,
    cancelOutsideElement: true,
    // detect: LongPressEventType.touch,
    detect: LongPressEventType.Pointer
    });

    ////////////////////////////////////
    //  ガチャ履歴
    function openGachaHistory(data, e) {
        const {gachaId} = data || {};
        fetchGachaHistory(gachaId);
     }
    //  ガチャ履歴
    ////////////////////////////////////





    return (
    <>
        {
        ///////////////////////////////////
        //  カウントダウン中だけ表示する
        gachaDisplay === 'countdown'
        ?
            <div className="count-down-wrap-button">
                <CountDown data={{
                    day:gachaStartRemainingDay,
                    hour:gachaStartRemainingHour,
                    minutes:gachaStartRemainingMinutes,
                    seconds:gachaStartRemainingSeconds,
                    start:gachaStartDate,
                    remainingTotalSeconds:gachaStartRemainingTotalSeconds                                        
                    }}/>
            </div>
        :<></>
        //  カウントダウン中だけ表示する
        ///////////////////////////////////
        }
        <section id="Play" className="sticky bottom-0 ">
            <div 
                id="MysteryCircleWrap" 
                className={`${MysteryCircleWrapDisplay} fixed touch-none select-none max-w-screen-sm w-full h-[90vh] h-[90dvh] top-0 justify-center items-center pointer-events-none `}
                >
                <MysteryCircle/>    
            </div>
            {/* <p className="text-4xl text-white">{gachaDisplay}</p> */}
            {
            ///////////////////////////////////
            //  売り切れ後だけ表示する
            gachaDisplay === 'soldout' 
            ?
                <div className="relative h-full">
                    <div className="scale-125 h-screen fixed top-0 right-0 left-0 bottom-0"><SoldOut/></div> 
                    <div id="Play-type-3" className={`grid grid-cols-2 overflow-hidden place-content-center select-none sticky bottom-0`}>
                        <div className="play-button-1 h-14 touch-none select-none">
                            <div className="center-button h-14 absolute flex flex-row justify-center items-center touch-none select-none">
                                <div
                                    onClick={(e) => openGachaHistory(productListArraySingle[id])}
                                    className="button-full flex flex-row justify-center items-center touch-none select-none">
                                        <p className="pointer-events-none text-base font-Noto">
                                            {intl.formatMessage({ id: 'game_history' })}
                                        </p>
                                </div>
                            </div>
                            {/* <div className="left-light-wrap h-14 absolute "></div> */}
                        </div>
                    </div>
                </div>
                :
                ''
            //  売り切れ後だけ表示する
            ///////////////////////////////////
            }
            <div id="Play-type-3" className={`${playButtonWrapHiddenClass} grid grid-cols-2 overflow-hidden place-content-center select-none`}>
                {viewResetButton ? (
                    // 全て引くがある時
                    <div className="play-button-3 h-14 col-span-2 select-none">
                        <div className="top-button h-14 bg-orange-800 absolute flex justify-center items-center select-none ">
                            <div 
                            {...bind({
                                select:"takeAll",
                                price:gachaSinglePoint*gachaRemainingCount,
                                takeNumber:gachaRemainingCount,
                                pattern: 3
                            })}
                            onClick={(e) => openConfirm({
                                ...productListArraySingle, 
                                ...{
                                    select:"takeAll",
                                    price:gachaSinglePoint*gachaRemainingCount,
                                    takeNumber:gachaRemainingCount,
                                    pattern: 3
                                }
                            })}
                            className="button-full flex flex-row justify-center items-center select-none"
                            >
                                <p className="pointer-events-none text-xs font-Noto text-center">
                                    {intl.formatMessage({ id: 'draw_all_card' })}
                                </p>
                                <p className="pointer-events-none text-sm font-bold font-Roboto ml-0.5">
                                    {(gachaSinglePoint*gachaRemainingCount).toLocaleString()}
                                </p>
                                <p className="pointer-events-none text-xs font-Roboto">pt</p>
                                <p className="pointer-events-none text-xs font-Noto ml-0.5 text-center">
                                    {intl.formatMessage({ id: 'Guaranteed_last_prize' })}
                                </p>
                            </div>
                            <KiraKiraButton/>
                            <div className="top-light-wrap h-14 absolute pointer-events-none "></div>
                        </div>
                    </div>
                ):(<></>)}
                {gachaConosecutiveCount  ?
                // 連続ガチャがある時
                (<>
                    <div className="play-button-1 h-14 touch-none select-none">
                        <div className="left-button h-14 absolute flex flex-row justify-start items-center touch-none select-none">
                            <div
                                {...bind({
                                    select:"takeSingle",
                                    price:gachaSinglePoint,
                                    takeNumber:1,
                                    pattern: 1
                                })}
                                onClick={(e) => openConfirm({
                                    ...productListArraySingle, 
                                    ...{
                                        select:"takeSingle",
                                        price:gachaSinglePoint,
                                        takeNumber:1,
                                        pattern: 1
                                    }
                                })}
                                className="button-half-left flex flex-row justify-center items-center touch-none select-none">
                                    <p className="pointer-events-none text-xs font-Noto">
                                        {intl.formatMessage({ id: 'draw_n_card' },{ number: 1 })}
                                    </p>
                                    <p className="pointer-events-none text-base font-bold font-Roboto ml-0.5">{gachaSinglePoint.toLocaleString()}</p>
                                    <p className="pointer-events-none text-xs font-Roboto">pt</p>
                            </div>
                        </div>
                        <div className="left-light-wrap h-14 absolute "></div>
                    </div>
                    <div className="play-button-2 h-14 touch-none select-none">
                        <div className="right-button bg-orange-500 h-14 absolute flex flex-row justify-end items-center touch-none select-none">
                            <div 
                                {...bind({
                                    select:"takeMultiple",
                                    price:gachaConosecutivePoint,
                                    takeNumber:gachaConosecutiveCount,
                                    pattern: 2
                                })}
                                onClick={(e) => openConfirm({
                                    ...productListArraySingle, 
                                    ...{
                                        select:"takeMultiple",
                                        price:gachaConosecutivePoint,
                                        takeNumber:gachaConosecutiveCount,
                                        pattern: 2
                                    }
                                })}
                                className="button-half-right flex flex-row justify-center items-center touch-none select-none">
                                    <p className="pointer-events-none text-xs font-Noto">
                                        {intl.formatMessage({ id: 'draw_n_card' },{ number: gachaConosecutiveCount })}
                                    </p>
                                    <p className="pointer-events-none text-base font-bold font-Roboto ml-0.5">{gachaConosecutivePoint.toLocaleString()}</p>
                                    <p className="pointer-events-none text-xs font-Roboto">pt</p>
                            </div>
                        </div>
                    </div>
                </>)
                :
                // 連続ガチャがない時
                (<>
                    <div className="play-button-1 h-14 touch-none select-none">
                        <div className="center-button h-14 absolute flex flex-row justify-center items-center touch-none select-none">
                            <div
                                {...bind({
                                    select:"takeSingle",
                                    price:gachaSinglePoint,
                                    takeNumber:1,
                                    pattern: 1
                                })}
                                onClick={(e) => openConfirm({
                                    ...productListArraySingle, 
                                    ...{
                                        select:"takeSingle",
                                        price:gachaSinglePoint,
                                        takeNumber:1,
                                        pattern: 1
                                    }
                                })}
                                className="button-full flex flex-row justify-center items-center touch-none select-none">
                                    <p className="pointer-events-none text-xs font-Noto">
                                        {intl.formatMessage({ id: 'draw_n_card' },{ number: 1 })}
                                    </p>
                                    <p className="pointer-events-none text-base font-bold font-Roboto ml-0.5">{gachaSinglePoint.toLocaleString()}</p>
                                    <p className="pointer-events-none text-xs font-Roboto">pt</p>
                            </div>
                        </div>
                        {/* <div className="left-light-wrap h-14 absolute "></div> */}
                    </div>
                </>)
                        }
            </div>
            {
            ///////////////////////////////////
            //  売り切れ中だけ履歴ボタンを表示する
            gachaDisplay === 'soldout'
            ?   //売り切れ中
            <></>
                // <div id="Play-type-3" className={`grid grid-cols-2 overflow-hidden place-content-center select-none`}>
                //     <div className="play-button-1 h-14 touch-none select-none">
                //         <div className="center-button h-14 absolute flex flex-row justify-center items-center touch-none select-none">
                //             <div
                //                 onClick={(e) => openGachaHistory(productListArraySingle[id])}
                //                 className="button-full flex flex-row justify-center items-center touch-none select-none">
                //                     <p className="pointer-events-none text-base font-Noto">
                //                         {intl.formatMessage({ id: 'game_history' })}
                //                     </p>
                //             </div>
                //         </div>
                //         {/* <div className="left-light-wrap h-14 absolute "></div> */}
                //     </div>
                // </div>
            :   //開催中何も表示しない
                <></>
            //  売り切れ中だけ履歴ボタンを表示する
            ///////////////////////////////////
            }
        </section>
    </>
    );
};


