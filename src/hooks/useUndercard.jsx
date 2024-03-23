//  役割
//  前座演出
//  （１）出現するしない判定
//  （２）出現するのであれば割合に応じた出現判定
//  （３）出現するのであればどのテーマか
//  （４）選出されたテーマの中でSTEPの抽選
//  （５）確定したSTEPのduration取得（仮死状態のとき強制移行）
//  （６）確定したSTEPの文言取得
//  （７）UndercardTickerの刻み発動
//
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, } from 'recoil';
import { playScenarioState } from "../store/recoil/playScenarioState";
import { modalState } from "../store/recoil/modalState";
import {useIntl} from 'react-intl'




//  Undercardタイマー
let UndercardInterval = 0;
//  Undercardのテーマ
// let UndercardThema;
//  現在の進行時間
let UndercardTickerCurrentTime = 0;

let UndercardFrequency = 0;
//  テーマの抽選結果
let ThemaRandResult = '';
//  ステップの抽選結果
let StepRandResult = '';
//  今回確定したSTEPの演出時間
let UndercardDuration = 0;
//  今回確定したSTEPのテキスト取得
let UndercardText = {};

export default function useUndercard(props) {
    const intl = useIntl()
    const [modalStateObj, setModalState] = useRecoilState(modalState);
    const [playScenarioObj, setPlayScenarioState] = useRecoilState(playScenarioState);

    /////////////////////////////////
    //  props
    const {
        currentTime = 0,
        //  プレイヤーが表示の要求をしてきた時
        ShowUndercard = false,
        // //  この演出が終了したかかどうか
        // 動画終了
        currentEnded,
        //  動画が終了処理済み
        isVideoEnded = false,
        //  賞のランク101段階
        PrizeRarity = 0,
        //  賞のレベル5刻み
        PrizeLevel = '',
    } = props;
    useEffect(() => {
        console.log("[useUndercard]props==>", props)

    }, [props]);
    //  props   
    /////////////////////////////////

    /////////////////////////////////
    //  PrizeLevelに応じた設定値の取得
    const {
        //  この演出があるのか
        hasUndercard,
        //  この演出の確率
        UndercardFrequency,
        //  北斗の確率
        hokuto,
        //  告知の確率
        announcement,
        //  カイジの確率
        kaiji,
        //  エヴァの確率
        eva,
        //  jojoの確率
        jojo,
        //  ワンピの確率
        onePiece,

    } = playScenarioObj.gimmick[PrizeLevel].Undercard;
    //  PrizeLevelに応じた設定値の取得
    /////////////////////////////////

    /////////////////////////////////
    //  useState郡
    //  抽選の結果この演出が表示されるかどうか
    const [isUndercardAppear, setIsUndercardAppear] = useState(false);
    //  この演出が開始したかかどうか
    const [isUndercardStarted, setIsUndercardStarted] = useState(false);
    //  Undercardが現在表示中かどうか
    const [isShowUndercard, setIsShowUndercard] = useState(false);
    //  Undercardが終了したかどうか
    const [isUndercardEnded, setIsUndercardEnded] = useState(false);
    //  Undercardタイマー数字が入る
    // const [UndercardTicker, setUndercardTicker] = useState(0);
    //  useState郡
    /////////////////////////////////




    /////////////////////////////////
    //  useEffect終了処理
    useEffect(() => {
        console.log("[useUndercard]isVideoEndedを検知==>", ShowUndercard)
        if(isVideoEnded){
            console.log("[useUndercard]isVideoEndedを検知：動画終了になったのでリセット==>")
            if(isUndercardAppear){setIsUndercardAppear(false)}
            if(isUndercardStarted){setIsUndercardStarted(false)}
            if(isShowUndercard){setIsShowUndercard(false)}
            if(isUndercardEnded){setIsUndercardEnded(false)}
            // setUndercardTicker(0)
            UndercardTickerCurrentTime = 0
        }
    }, [isVideoEnded]);
    //  useEffect終了処理
    /////////////////////////////////

    /////////////////////////////////
    //  useEffect開始処理
    useEffect(() => {
        if(ShowUndercard){
            console.log("[useUndercard]ShowUndercard:trueを検知==>", ShowUndercard)
            //  一方向で開始した事だけ[true]上書き
            if(!isUndercardStarted){setIsUndercardStarted(true)}
        }
    }, [ShowUndercard]);
    //  useEffect開始処理
    /////////////////////////////////

    /////////////////////////////////
    //   useEffect開始のタイミングで１回だけ
    //  （２）出現するのであれば割合に応じた出現判定
    //  （３）出現するのであればどのテーマかの抽選
    //  （４）選出されたテーマの中でSTEPの抽選
    useEffect(() => {
        //  開始のタイミングで１回だけ設定処理
        if(isUndercardStarted){
            //  UndercardFrequencyからtotalとそれ以外に分離
            const {total, ...ThemaFrequency} = UndercardFrequency
            //  totalの出現割合obj
            console.log("[useUndercard]total==>", total)
            //  totalを除いた出現割合obj
            console.log("[useUndercard]UndercardFrequency==>", ThemaFrequency)

            //////////////////////////////////
            //  （２）出現するのであれば割合に応じた出現判定
            const appearRand  = Math.floor(Math.random() * 100)
            if(total >= appearRand){
                console.log("[useUndercard]total>= appearRand:true==>", total, ':', appearRand)
                if(!isUndercardAppear){setIsUndercardAppear(true)}
            }else{
                console.log("[useUndercard]total>= appearRand:false==>", total, ':', appearRand)
                if(isUndercardAppear){setIsUndercardAppear(false)}
            }
            //  （２）出現するのであれば割合に応じた出現判定
            //////////////////////////////////

            //////////////////////////////////
            //  （３）出現するのであればどのテーマかの抽選
            //  100分率で
            const ThemaRand = Math.floor(Math.random() * 100)
            let ThemaRate = 0
            for (const prop in ThemaFrequency) {
                ThemaRate += ThemaFrequency[prop]
                if (ThemaRand < ThemaRate) {
                    ThemaRandResult = prop
                  break
                }
              }
            //  テーマ確定
            console.log("[useUndercard]ThemaRandResult==>", ThemaRandResult)
            console.log("[useUndercard]ThemaRand==>", ThemaRand?ThemaRand:'空')
            //  （３）出現するのであればどのテーマかの抽選
            //////////////////////////////////

            //////////////////////////////////
            //  （４）選出されたテーマの中でSTEPの抽選
            //  100分率で
            const StepRand = Math.floor(Math.random() * 100)
            let stepRate = 0
            console.log("[useUndercard]playScenarioObj.gimmick[PrizeLevel].Undercard[ThemaRandResult]==>", playScenarioObj.gimmick[PrizeLevel].Undercard[ThemaRandResult])
            for (const prop in playScenarioObj.gimmick[PrizeLevel].Undercard[ThemaRandResult]) {
                stepRate += playScenarioObj.gimmick[PrizeLevel].Undercard[ThemaRandResult][prop]
                if (StepRand < stepRate) {
                    StepRandResult = prop
                  break
                }
              }
            //  step確定
            console.log("[useUndercard]StepRandResult==>", StepRandResult?StepRandResult:'空')
            //  （４）選出されたテーマの中でSTEPの抽選
            //////////////////////////////////

            //////////////////////////////////
            //  （５）確定したSTEPのduration取得（仮死状態のとき再生へ強制移行）
            UndercardDuration = playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult].duration;
            console.log("[useUndercard]playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult].duration==>", playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult].duration)
            //  （５）確定したSTEPのduration取得（仮死状態のとき強制移行）
            //////////////////////////////////

            //////////////////////////////////
            //  （６）確定したSTEPの文言取得
            const UndercardTextRand = Math.floor( Math.random() * 3 ) + 1;
            UndercardText = playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult][UndercardTextRand].text;
            console.log("[useUndercard]playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult][UndercardTextRand].txt==>", playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult][UndercardTextRand].text)
            //  （６）確定したSTEPの文言取得
            //////////////////////////////////
        }
    }, [isUndercardStarted]);
    //   useEffect開始のタイミングで１回だけ
    /////////////////////////////////


    /////////////////////////////////
    //  （7）UndercardTickの刻み発動
    let UndercardTick = () => {
        console.log("[useUndercard]UndercardTick = () =>")
        if(UndercardTickerCurrentTime < UndercardDuration && hasUndercard && isUndercardAppear){
            //  制限時間内 + 演出がある + ある場合で表示当選
            console.log("[useUndercard]UndercardTick = () =>制限時間内 + 演出がある + ある場合で表示当選:",UndercardTickerCurrentTime)

            // setUndercardTicker(UndercardTicker + 200)
            UndercardTickerCurrentTime = UndercardTickerCurrentTime + 200
            // setUndercardTicker((prevCount) => prevCount + 200)
        ////////////////////////////////////
        //  テスト用のループ処理
        // }else if(UndercardTicker >5800){
        //     setUndercardTicker(0)
        //  テスト用のループ処理
        ////////////////////////////////////
        }else{
            console.log("[useUndercard]UndercardTick = () =>終了==>", UndercardTickerCurrentTime)
            UndercardTickerCurrentTime = 99999999
            // setUndercardTicker(99999999)
            //  Undercard終了とする
            if(!isUndercardEnded){setIsUndercardEnded(true)}
            //  Undercard表示終了とする
            if(isShowUndercard){setIsShowUndercard(false)}
            //  もし始まらずに辿り着いた場合　始まったことにする
            if(!isUndercardStarted){setIsUndercardStarted(true)}
            //  一応クリアする
            clearInterval(UndercardInterval);
        }
    };
    //   （7）UndercardTickの刻み発動
    /////////////////////////////////




    useEffect(() => {
        if(isUndercardEnded || !isUndercardStarted){
            //  Undercard終了している　or　Undercardが開始されていない
            clearInterval(UndercardInterval);
            console.log("[useUndercard]Undercard終了している　or　Undercardが開始されていない")
        }else if(isUndercardStarted  && !isShowUndercard && hasUndercard && isUndercardAppear){
            //  Undercardが開始中 + まだ非表示 + 始動前演出がある + 抽選の結果表示許可 => showフラグを立てる
            console.log("[useUndercard]Undercardが開始中 + まだ非表示 + 始動前演出がある + 抽選の結果表示許可 => showフラグを立てる")
            if(!isShowUndercard){setIsShowUndercard(true)}
            //  一応クリアする
            clearInterval(UndercardInterval);
        }else{
            // intervalがすでに有るのなら、それはキャンセル。
            if(UndercardInterval) {
                clearInterval(UndercardInterval);
            }
            // あらためてintervalを作成
            console.log("[useUndercard]あらためてintervalを作成")
            // ❗️❗️❗️❗️❗️UndercardInterval = setInterval(UndercardTick,200);
        }
    }, [isUndercardEnded, isUndercardStarted, isShowUndercard, hasUndercard, isUndercardAppear]);


    console.log("[useUndercard]UndercardTicker：", UndercardTickerCurrentTime,{
        currentTime : currentTime,
        hasUndercard : hasUndercard,
        isShowUndercard : isShowUndercard,
        isHokutoStarted : isUndercardStarted,
        isUndercardEnded : isUndercardEnded,
        isUndercardStarted : isUndercardStarted,
        isUndercardAppear : isUndercardAppear,
    })


    return {
        currentTime,
        //  この演出があるのか
        hasUndercard,
        //  抽選の結果この演出が表示されるかどうか
        isUndercardAppear,
        //  テーマの抽選結果
        ThemaRandResult,
        //  ステップの抽選結果
        StepRandResult,
        //  今回確定したSTEPの演出時間
        UndercardDuration,
        //  今回確定したSTEPのテキスト取得
        UndercardText,
        //  UndercardTティッカー
        UndercardTickerCurrentTime,
        //  この演出が現在表示中かどうか
        isShowUndercard,
        //  この演出が開始したかかどうか
        isUndercardStarted,
        //  Undercardが終了したかかどうか
        isUndercardEnded,

    }
}