import React, { useRef, useState, useEffect, Suspense, useLayoutEffect} from "react";
import { useRecoilState, } from 'recoil';
import {useIntl,FormattedDate} from 'react-intl'
import { HokutoState } from "../../../store/recoil/HokutoState";
import { modalState } from "../../../store/recoil/modalState";
import { playScenarioState } from "../../../store/recoil/playScenarioState";
import { Hokuto } from "./Under/Hokuto";
import {useInterval,useThrottle,useUpdateEffect} from 'react-use';


//  https://god48.com/javascript-clearinterval
//  https://iroiro.burariarekore.com/2023clearinterval.php
//  https://qiita.com/higa02/items/7c86de43499a90a25822
//  https://lorem-co-ltd.com/settimeout-setinterval/

/////////////////////////////////
//　変数宣言
//  テーマの抽選結果
let ThemaRandResult = '';
//  ステップの抽選結果
let StepRandResult = '';
//  Undercardタイマー
let UndercardInterval;
let UndercardIntervalArray = new Array();
//  現在の再生位置
// let UndercardTickerCurrentTime = 0;
//  今回確定したSTEPの演出時間
let UndercardDuration = 0;
//  今回確定したSTEPのテキスト取得
let UndercardText = {};
//  抽選の結果この演出が表示されるかどうか
let isUndercardAppear = false
//  タイマー
let timeOutFireMovieId
//  表示非表示Class
let showUndercardClass = 'hidden'
//　変数宣言
/////////////////////////////////

export const Undercard = (props) => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [playScenarioObj, setPlayScenario] = useRecoilState(playScenarioState);
    /////////////////////////////////
    //　今回のシナリオID
    const playScenarioUUID = playScenarioObj.current.playScenarioUUID;
    useEffect(() => {
        clearInterval(timeOutFireMovieId);
        // console.log("[Undercard]playScenarioUUID==>", playScenarioUUID)
    }, [playScenarioObj.current.playScenarioUUID]);
    //　今回のシナリオID
    /////////////////////////////////

    /////////////////////////////////
    //  props
    const {
        currentTime = 0,
        //  賞のレベル5刻み
        PrizeLevel,
        //  再生に成功しプレイヤーが拡大し表示の指令を受け取る
        ShowUndercardOnPlayer,
        // 再生が終了しているかどうかをBoolean値で表す
        //  https://higezine.com/blog/front-end/javascript/2021/04/29/716/
        currentEnded,
        isVideoEnded,
        // PlaySuccess
    } = props.data;
    useEffect(() => {
        console.log("[Undercard]props.data.PrizeLevel[props.data.PrizeLevel]1==>", props.data.PrizeLevel)
        console.log("[Undercard]props.data.PrizeLevel[props.data.PrizeLevel]2==>", PrizeLevel)
    }, [props.data.PrizeLevel]);
    //  props   
    /////////////////////////////////

    /////////////////////////////////
    //  PrizeLevelに応じた設定値の取得
    const {
        //  前座演出があるのか
        hasUndercard,
        //  前座演出がある時に実行出現するかどうかの比率
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
    //   playScenarioUUID変更のタイミングで１回+PrizeLevel固まるまで
    //  （１）出現するのであれば割合に応じた出現判定
    //  （２）出現するのであればどのテーマかの抽選
    //  （３）選出されたテーマの中でSTEPの抽選
    //  （４）確定したSTEPのduration取得（仮死状態のとき再生へ強制移行）
    //  （５）確定したSTEPの文言取得
    useLayoutEffect(() => {
        //  開始のタイミングで１回だけ設定処理
        clearInterval(timeOutFireMovieId);
        console.log("[Undercard]playScenarioUUIDの変化を検知==>", playScenarioUUID)
        console.log("[Undercard]props.data.PrizeLevel==>", props.data.PrizeLevel)
        if(playScenarioUUID !== 'ScenarioIsEnded'){
            //  UndercardFrequencyからtotalとそれ以外に分離
            const {total, ...ThemaFrequency} = UndercardFrequency
            //  totalの出現割合obj
            console.log("[useUndercard]total==>", total)
            //  totalを除いた出現割合obj
            console.log("[useUndercard]UndercardFrequency==>", ThemaFrequency)

            //////////////////////////////////
            //  （１）出現するのであれば割合に応じた出現判定
            const appearRand  = Math.floor(Math.random() * 100)
            if(total >= appearRand && hasUndercard){
                //  演出あり＋表示抽選に当たったとき
                console.log("[useUndercard]total>= appearRand:true==>", total, ':', appearRand)
                isUndercardAppear = true
            }else{
                console.log("[useUndercard]total>= appearRand:false==>", total, ':', appearRand)
                isUndercardAppear = false
            }
            //  （１）出現するのであれば割合に応じた出現判定
            //////////////////////////////////

            //////////////////////////////////
            //  （２）出現するのであればどのテーマかの抽選
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
            //  （２）出現するのであればどのテーマかの抽選
            //////////////////////////////////

            //////////////////////////////////
            //  （３）選出されたテーマの中でSTEPの抽選
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
            //  （３）選出されたテーマの中でSTEPの抽選
            //////////////////////////////////

            //////////////////////////////////
            //  （４）確定したSTEPのduration取得（仮死状態のとき再生へ強制移行）
            UndercardDuration = playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult].duration;
            console.log("[useUndercard]playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult].duration==>", playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult].duration)
            //  （４）確定したSTEPのduration取得（仮死状態のとき強制移行）
            //////////////////////////////////

            //////////////////////////////////
            //  （５）確定したSTEPの文言取得
            const UndercardTextRand = Math.floor( Math.random() * 3 ) + 1;
            UndercardText = playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult][UndercardTextRand].text;
            console.log("[useUndercard]playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult][UndercardTextRand].txt==>", playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult][UndercardTextRand].text)
            //  （５）確定したSTEPの文言取得
            //////////////////////////////////

            //////////////////////////////////
            //  （６）最終結果をrecoilに保存
            setPlayScenario((prevState) => ({
                ...prevState,
                current : {
                    ...prevState.current,
                    playScenarioUUID : playScenarioUUID,
                    Undercard : {
                        ...prevState.current.Undercard,
                        //  前座演出がある時に実行出現するかどうかの比率に基づいて表示するかどうかの判定結果
                        isUndercardAppear : isUndercardAppear,
                        //  テーマの抽選結果
                        ThemaRandResult : ThemaRandResult,
                        //  ステップの抽選結果
                        StepRandResult : StepRandResult,
                        //  今回確定したSTEPから取得する総演出時間　これを超えたら動画再生
                        UndercardDuration : UndercardDuration,
                        //  今回確定したSTEPのテキスト
                        UndercardText : UndercardText,
                        //  前座演出が開始したかどうか　重複起動の防止
                        isUndercardStarted : false, //  ❗️初期化
                        //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
                        nowOnAir : false, //  ❗️初期化
                        //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
                        isUndercardEnded : false, //  ❗️初期化
                        //  現在の進行時間
                        UndercardTickerCurrentTime : 0, //  ❗️初期化
                        //  明示的に動画を開始する通知
                        startMovie : false, //  ❗️初期化
                    }
                },
            }))
            //  （６）最終結果をrecoilに保存
            //////////////////////////////////
        }
    }, [playScenarioUUID,PrizeLevel]);
    //   playScenarioUUID変更のタイミングで１回+PrizeLevel固まるまで
    /////////////////////////////////

    /////////////////////////////////
    //  playerから指示を受けてUndercardTickの刻みを開始
    useUpdateEffect(() => {
        // console.log("[useUndercard]ShowUndercardOnPlayerの変化検知",ShowUndercardOnPlayer)
        if(!ShowUndercardOnPlayer && playScenarioObj.current.Undercard.isUndercardStarted){
            //  開始済みなのに非表示の指示が通知された
            console.log("[useUndercard]開始済みなのに非表示の指示が通知された")

        }else if(!ShowUndercardOnPlayer && !playScenarioObj.current.Undercard.isUndercardStarted){
            //  まだplayerから指示がないor非表示の指示を受けた&&既に開始済み(不発開始含む)
            //  タイマーリセット
            if(timeOutFireMovieId) {clearInterval(timeOutFireMovieId)}
            console.log("[useUndercard]まだplayerから指示がないor指示がfalseに変更された")
            //  表示の許可がないとき動画の再生開始を依頼しない
            setPlayScenario((prevState) => ({
                ...prevState,
                current : {
                    ...prevState.current,
                    playScenarioUUID : playScenarioUUID,
                    Undercard : {
                        ...prevState.current.Undercard,
                        //  明示的に動画を開始する通知
                        startMovie : false, //  ❗️初期化
                    }
                },
            }))
            console.log("[useUndercard]表示の許可がないとき")
        }else if(!playScenarioObj.current.Undercard.isUndercardAppear){
            //  表示の許可がないとき暴発しない
            if(timeOutFireMovieId) {clearInterval(timeOutFireMovieId)}
            //  表示の許可がないとき動画の再生開始を依頼する
            setPlayScenario((prevState) => ({
                ...prevState,
                current : {
                    ...prevState.current,
                    playScenarioUUID : playScenarioUUID,
                    Undercard : {
                        ...prevState.current.Undercard,
                        //  何度も開始指示を受けないように開始済みにする
                        isUndercardStarted : true,  //  不発開始済み
                        //  明示的に動画を開始する通知
                        startMovie : true, //
                    }
                },
            }))
            console.log("[useUndercard]表示の許可がないとき")
        }else{
            //  ❗️❗️ここが唯一のタイマー発火点❗️❗️
            // intervalがすでに有るのなら、それはキャンセル。
            if(timeOutFireMovieId) {clearInterval(timeOutFireMovieId)}
            // intervalを作成
            console.log("[useUndercard]intervalを作成❗️UndercardTick開始")

            if(!ShowUndercardOnPlayer){
                //  プレイヤーから発動指示ないとき暴発しない
                //  タイマーリセット
                if(timeOutFireMovieId) {clearInterval(timeOutFireMovieId)}
            }else if(playScenarioObj.current.Undercard.UndercardTickerCurrentTime > 0){
                //  再生時間が0より大きい場合は発火しない
                //  タイマーリセット
                // if(timeOutFireMovieId) {clearInterval(timeOutFireMovieId)}
            }else{
                let Tick = 0;
                const UndercardOnAir = () => {
                    console.log("[useUndercard]intervalを作成❗️UndercardOnAir開始")
                    return new Promise((resolve) => {//・・・・・・・・・・・・①
                        timeOutFireMovieId = setInterval(() => {
                            //  総演出長（UndercardDuration）を現在進捗（Tick）が超えるまでresolve(Tick)しない
                            if (Tick >= UndercardDuration) {
                                // Tick = 0    //テスト用
                                clearInterval(timeOutFireMovieId);
                                resolve(Tick);  //②超えたので脱出
                            }
                            console.log("[useUndercard]playScenarioObj.current.Undercard.UndercardTickerCurrentTime >= UndercardDuration：",Tick,UndercardDuration)
                            Tick = Tick + 200;
                            console.log("[useUndercard]Tick：",Tick)
                            setPlayScenario((prevState) => ({
                                ...prevState,
                                current : {
                                    ...prevState.current,
                                    Undercard : {
                                        ...prevState.current.Undercard,
                                        //  現在の進行時間
                                        UndercardTickerCurrentTime : Tick + 200, //  ❗️初期化
                                        //  前座演出が開始したかどうか　重複起動の防止
                                        isUndercardStarted : true, //  ❗️初期化
                                        //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
                                        nowOnAir : true,
                                        //  明示的に動画を開始する通知
                                        startMovie : false,
                                    }
                                },
                            }))
                        }, 200);
                        });
                    };
                    UndercardOnAir().then((UndercardDuration) => {
                        console.log("[useUndercard]intervalを作成❗️③演出が終了した")
                        //  ③演出が終了した
                        //  各種クローズ処置
                        setPlayScenario((prevState) => ({
                            ...prevState,
                            current : {
                                ...prevState.current,
                                Undercard : {
                                    ...prevState.current.Undercard,
                                    //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
                                    isUndercardEnded : true, //  終了
                                    //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
                                    nowOnAir : false,
                                    //  明示的に動画の再生開始を依頼する
                                    //  ❗️❗️❗️❗️❗️❗️❗️各所があてにしている❗️❗️❗️❗️❗️❗️
                                    //  ❗️❗️❗️❗️❗️❗️❗️空振りでもtrue❗️❗️❗️❗️❗️❗️
                                    startMovie : true,
                                    //  ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
                                }
                            },
                        }))
                });
            }
        }
    }, [ShowUndercardOnPlayer]);
    //  playerから指示を受けてUndercardTickの刻みを開始
    /////////////////////////////////

    /////////////////////////////////
    //  playScenarioObj.current.Undercard.UndercardTickerCurrentTime
    //  プログレスに応じたステータス変更
    useUpdateEffect(() => {
        if(playScenarioObj.current.Undercard.UndercardTickerCurrentTime === 0){
            //  スタート前　初期化ポイント
            //  タイマーリセット
            console.log("[useUndercard]スタート前　初期化ポイント",playScenarioObj.current.Undercard.UndercardTickerCurrentTime)
            clearInterval(timeOutFireMovieId)
            setPlayScenario((prevState) => ({
                ...prevState,
                current : {
                    ...prevState.current,
                    Undercard : {
                        ...prevState.current.Undercard,
                        //  前座演出が開始したかどうか　重複起動の防止
                        isUndercardStarted : false, //  ❗️初期化　この後プレイヤーからの指示後不発開始となる場合もある
                        //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
                        isUndercardEnded : false, //  終了
                        //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
                        nowOnAir : false,
                        //  明示的に動画の再生開始を依頼する
                        startMovie : false,
                    }
                },
            }))
        }
    }, [playScenarioObj.current.Undercard.UndercardTickerCurrentTime]);
    //  プログレスに応じたステータス変更
    //  playScenarioObj.current.Undercard.UndercardTickerCurrentTime
    /////////////////////////////////



    /////////////////////////////////
    //  ギミックの表示非表示
    if(playScenarioObj.current.Undercard.nowOnAir){
        showUndercardClass = ''
    }else{
        showUndercardClass = 'hidden'
    }
    //  ギミックの表示非表示
    /////////////////////////////////

    return (
        <>
            {/* <div className="w-full z-10 abosolute top-0 left-0">
                <p>currentTime：{currentTime}</p>
                <p>currentEnded：{currentEnded?.toString()}</p>
                <p>currentEnded[recoil]：{playScenarioObj.current.playScenarioUUID}</p>
                <p>PrizeLevel：{PrizeLevel}</p>
                <p>playScenarioUUID：{playScenarioUUID}</p>
                <p>-------------------------------------------</p>
                <p>この演出があるのか：{hasUndercard?.toString()}</p>
                <p>表示するかどうかの判定結果：{playScenarioObj.current.Undercard.isUndercardAppear.toString()}</p>
                <p>テーマの抽選結果：{playScenarioObj.current.Undercard.ThemaRandResult}</p>
                <p>STEPの抽選結果：{playScenarioObj.current.Undercard.StepRandResult}</p>
                <p>総演出時間：{playScenarioObj.current.Undercard.UndercardDuration}</p>
                <p>テキスト：{playScenarioObj.current.Undercard.UndercardText[1]} {playScenarioObj.current.Undercard.UndercardText[2]}</p>
                <p>-------------------------------------------</p>
                <p>プレイヤーからの指示：{ShowUndercardOnPlayer?.toString()}</p>
                <p>前座演出が開始：{playScenarioObj.current.Undercard.isUndercardStarted?.toString()}</p>
                <p>前座演出が終了：{playScenarioObj.current.Undercard.isUndercardEnded?.toString()}</p>
                <p>前座演出上映中：{playScenarioObj.current.Undercard.nowOnAir?.toString()}</p>
                <p>進行時間：{playScenarioObj.current.Undercard.UndercardTickerCurrentTime}</p>
                <p>本編再生開始：{playScenarioObj.current.Undercard.startMovie?.toString()}</p>
                <p>-------------------------------------------</p>
            </div> */}
            <div className={`${showUndercardClass} w-full h-full`}>
                {
                    {
                        // 'hokuto': <p className="text-9xl font-black text-red-600 w-full text-center">hokuto{playScenarioObj.current.Undercard.UndercardTickerCurrentTime}</p>,
                        'hokuto': <Hokuto data={{
                            currentTime : currentTime,
                            hasUndercard : hasUndercard,
                            isVideoEnded : isVideoEnded,
                        }}/>,
                        'announcement': '',
                        'kaiji': '',
                        'eva': '',
                        'jojo': '',
                        'onePiece': '',
                    }[playScenarioObj.current.Undercard.ThemaRandResult]


                } 
            </div>
            
        </>
    );




}
