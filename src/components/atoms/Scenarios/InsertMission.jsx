import React, { useRef, useState, useEffect, Suspense, useLayoutEffect} from "react";
import { useRecoilState, } from 'recoil';
import {useIntl,FormattedDate} from 'react-intl'
import { HokutoState } from "../../../store/recoil/HokutoState";
import { modalState } from "../../../store/recoil/modalState";
import { playScenarioState } from "../../../store/recoil/playScenarioState";
import { ButtonMashing } from "./Mission/ButtonMashing";
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
//  InsertMissionタイマー
let InsertMissionInterval;
let InsertMissionIntervalArray = new Array();
//  現在の再生位置
// let InsertMissionTickerCurrentTime = 0;
//  今回確定したSTEPの演出時間
let InsertMissionDuration = 0;
//  今回確定したSTEPのテキスト取得
let InsertMissionText = {};
//  抽選の結果この演出が表示されるかどうか
let isInsertMissionAppear = false
//  待ち時間タイマー
let InsertMissionWaitId = 0;
//  待ち時間の上限　この時間まで待つ
let InsertMissionWaitLimitTime = 0;
//  動画のファイル名
let movieFileName = '';
//  今回の演出の制限時間
let InsertMissionLimitTime = 0;
//  このミッションの開始時間
let InsertMissionStartTime = 0.1;   //誤判断避ける為0.1にしておく
//  このミッションの終了時間
let InsertMissionEndTime = 0;
//  ラストステップの転換点
let InsertMissionLastStepStartTime = 3;
//  このミッションの設定
let InsertMissionConf = {}
//  ギミックの表示非表示Class
let showInsertMissionClass = 'hidden';
//　変数宣言
/////////////////////////////////

export const InsertMission = (props) => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [playScenarioObj, setPlayScenario] = useRecoilState(playScenarioState);
    /////////////////////////////////
    //　今回のシナリオID
    const playScenarioUUID = playScenarioObj.current.playScenarioUUID;
    useLayoutEffect(() => {
        console.log("[InsertMission]❗️タイマーのゾンビ削除⏰リセット")
        if(InsertMissionWaitId){clearInterval(InsertMissionWaitId)}
        console.log("[InsertMission]playScenarioUUID==>", playScenarioUUID)
    }, [playScenarioObj.current.playScenarioUUID]);
    //　今回のシナリオID
    /////////////////////////////////

    /////////////////////////////////
    //  props
    const {
        //  賞のレベル5刻み
        PrizeLevel,
        //  動画の再生位置
        currentTime = 0,
        //  動画の終了フラグ
        currentEnded = false,
        //  叩いた回数偶数奇数
        isEvenMashing = false,
        //  ミッションプレイヤーの表示指示
        ShowInsertMissionOnPlayer = false,
        isVideoEnded,

    } = props.data;
    useEffect(() => {
        // console.log("[InsertMission]props.data.PrizeLevel[props.data.PrizeLevel]1==>", props.data.PrizeLevel)
        // console.log("[InsertMission]props.data.PrizeLevel[props.data.PrizeLevel]1==>", props.data.currentEnded)
        // console.log("[InsertMission]props.data.PrizeLevel[props.data.PrizeLevel]2==>", PrizeLevel)
    }, [props.data.PrizeLevel, props.data.videoUrl, props.data.currentEnded]);

    //  props   
    /////////////////////////////////

    /////////////////////////////////
    //  PrizeLevelに応じた設定値の取得
    const {
        //  前座演出があるのか
        hasInsertMission,
        //  前座演出がある時に実行出現するかどうかの比率
        insertMissionFrequency,
        //  連打の確率
        ButtonMash,
        //　長押しの演出,
        ButtonLongPress,
        //  短押しの確率
        ButtonShortPress,
        //  引っ張れ離せの確率
        Pull,
        //  slotの確率
        Slot,
        //  ハイローの確率
        HighLow,
    } = playScenarioObj.gimmick[PrizeLevel].insertMission;
    //  PrizeLevelに応じた設定値の取得
    /////////////////////////////////

    /////////////////////////////////
    //  modalStateValue.data.の取得
    const {
        //  動画のURL
        videoUrl,
        //  賞の１００分率
        prizeRarity
    } = modalStateValue.data;
    //  modalStateValue.data.の取得
    /////////////////////////////////

    /////////////////////////////////
    //　modalStateValue.modalType監視
    //  ガチャ状態でなければタイマー止める
    useEffect(() => {
        if(!modalStateValue.modalType === 'gacha'){
            if(InsertMissionWaitId){clearInterval(InsertMissionWaitId)}
        }
    }, [modalStateValue.modalType]);
    //　modalStateValue.modalType監視
    /////////////////////////////////


    


    /////////////////////////////////
    //  動画関連情報の取得
    //  ❗️動画の新規追加で未定義の場合のエラー処理入れる
    //  拡張子付きの正規表現　から　後方4文字(.mp4)削除して動画ID
    // movieFileName = (videoUrl.match(".+/(.+?)([\?#;].*)?$")[1]).slice( 0, -4 );
    movieFileName = modalStateValue.data.videoId
    // useUpdateEffect(() => {
    //     console.log("[InsertMission]movieFileName==>", movieFileName)
    // }, [videoUrl]);
    //  ミッション開始時間の取得
    const {
        //  連打ボタンの出現時間
        showButtonMashingTime = 0,
        //　長押しの演出
        showButtonLongPressTime = 0,
        //　短押しの演出
        showButtonShortPressTime = 0,
        //　引っ張れ離せの演出
        showPullTime = 0,
        //　slotの演出
        showSlotTime = 0,
        //　ハイローの演出
        showHighLowTime = 0,
        //  動画の転換点
        turningPoint = {},
    } = playScenarioObj.movie[movieFileName];
    //  動画関連情報の取得
    /////////////////////////////////

    /////////////////////////////////
    //   playScenarioUUID変更のタイミングで１回+PrizeLevel固まるまで
    //  （１）出現するのであれば割合に応じた出現判定
    //  （２）出現するのであればどのテーマかの抽選
    //  （３）選出されたテーマの中でSTEPの抽選
    //  （４）動画confから制限・開始・終了点の取得
    //  （５）gimmickconfから選出されたテーマの設定取得
    //  （６）最終結果をrecoilに保存
    //  ❗️レンダリング前に処理
    useLayoutEffect(() => {
    //     //  開始のタイミングで１回だけ設定処理
    //     clearInterval(timeOutFireMovieId);
    //     console.log("[InsertMission]props.data.PrizeLevel==>", props.data.PrizeLevel)
        if(playScenarioUUID !== 'ScenarioIsEnded'){
            console.log("[InsertMission]playScenarioUUIDの変化を検知'ScenarioIsEnded'以外==>", playScenarioUUID)
    //         //  InsertMissionFrequencyからtotalとそれ以外に分離
            const {total, ...ThemaFrequency} = insertMissionFrequency
    //         //  totalの出現割合obj
            console.log("[InsertMission]total==>", total)
    //         //  totalを除いた出現割合obj
            console.log("[InsertMission]ThemaFrequency==>", ThemaFrequency)

            //////////////////////////////////
            //  （１）出現するのであれば割合に応じた出現判定
            const appearRand  = Math.floor(Math.random() * 100)
            if(total >= appearRand && hasInsertMission){
                //  演出あり＋表示抽選に当たったとき
                console.log("[InsertMission]total>= appearRand:true==>", total, ':', appearRand)
                isInsertMissionAppear = true
            }else{
                console.log("[InsertMission]total>= appearRand:false==>", total, ':', appearRand)
                isInsertMissionAppear = false
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
            console.log("[InsertMission]ThemaRandResult==>", ThemaRandResult)
            console.log("[InsertMission]ThemaRand==>", ThemaRand?ThemaRand:'空')
            //  （２）出現するのであればどのテーマかの抽選
            //////////////////////////////////

            //////////////////////////////////
            //  （３）選出されたテーマの中でSTEPの抽選+このテーマの待ち時間
            //  100分率で
            const StepRand = Math.floor(Math.random() * 100)
            let stepRate = 0
            console.log("[InsertMission]playScenarioObj.gimmick[PrizeLevel].insertMission[ThemaRandResult]==>", playScenarioObj.gimmick[PrizeLevel].insertMission[ThemaRandResult])
            for (const prop in playScenarioObj.gimmick[PrizeLevel].insertMission[ThemaRandResult]) {
                stepRate += playScenarioObj.gimmick[PrizeLevel].insertMission[ThemaRandResult][prop]
                if (StepRand < stepRate) {
                    StepRandResult = prop
                  break
                }
              }
            //  step確定
            console.log("[InsertMission]StepRandResult==>", StepRandResult?StepRandResult:'空')

            //  （３）選出されたテーマの中でSTEPの抽選
            //////////////////////////////////

            //////////////////////////////////
            //  （４）動画confから制限・開始・終了点の取得
            console.log("[InsertMission]startTime==>",StepRandResult, playScenarioObj.movie[movieFileName].turningPoint[StepRandResult])
            InsertMissionStartTime = turningPoint.step1.startTime; //  
            InsertMissionEndTime = turningPoint[StepRandResult].endTime;
            //  このテーマで待ち続ける時間　制限
            InsertMissionLimitTime = playScenarioObj.gimmick.config[ThemaRandResult].limitTime;
            InsertMissionLastStepStartTime = turningPoint[StepRandResult].startTime;
            //  （４）動画confから制限・開始・終了点の取得
            //////////////////////////////////

            //////////////////////////////////
            //  （５）gimmickconfから選出されたテーマの設定取得
            InsertMissionConf = playScenarioObj.gimmick.config[ThemaRandResult];
            //  （５）gimmickconfから選出されたテーマの設定取得
            //////////////////////////////////

            //////////////////////////////////
            //  （６）最終結果をrecoilに保存
            setPlayScenario((prevState) => ({
                ...prevState,
                current : {
                    ...prevState.current,

                    InsertMission : {
                        ...prevState.current.InsertMission,
                        //  前座演出がある時に実行出現するかどうかの比率に基づいて表示するかどうかの判定結果
                        isInsertMissionAppear : isInsertMissionAppear,
                        //  テーマの抽選結果
                        ThemaRandResult : ThemaRandResult,
                        //  ステップの抽選結果
                        StepRandResult : StepRandResult,
                        //  このテーマで待ち続ける時間　制限
                        InsertMissionLimitTime : InsertMissionLimitTime,
                        //  今回の演出の開始時間
                        InsertMissionStartTime : InsertMissionStartTime,
                        //  今回の演出の終了時間
                        InsertMissionEndTime : InsertMissionEndTime,
                        //  ラストステップの転換点
                        InsertMissionLastStepStartTime : InsertMissionLastStepStartTime,
                        //  今回の演出の設定
                        InsertMissionConf : InsertMissionConf

                        // //  今回確定したSTEPから取得する総演出時間　これを超えたら動画再生
                        // InsertMissionDuration : InsertMissionDuration,
                        // //  今回確定したSTEPのテキスト
                        // InsertMissionText : InsertMissionText,
                        // //  前座演出が開始したかどうか　重複起動の防止
                        // isInsertMissionStarted : false, //  ❗️初期化
                        // //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
                        // nowOnAir : false, //  ❗️初期化
                        // //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
                        // isInsertMissionEnded : false, //  ❗️初期化
                        // //  現在の進行時間
                        // InsertMissionTickerCurrentTime : 0, //  ❗️初期化
                        // //  明示的に動画を開始する通知
                        // startMovie : false, //  ❗️初期化
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
    //  playScenarioObj.current.InsertMission.showInsertMissionを評価してタイマー発動
    //  期限が切れたら自動的に動画再生
    //  ミッションはキャンセルされる
    useUpdateEffect(() => {
        if(!hasInsertMission || !playScenarioObj.current.InsertMission.isInsertMissionAppear){
            console.log("[InsertMission]❗️showInsertMissionに変化があったがそもそも無効")
        }else if(!playScenarioObj.current.InsertMission.isInsertMissionWaitTimeOut){
            console.log("[InsertMission]❗️タイムアウトまで到達していないのでタイマー開始")
            let Tick = 0;
            let Limit = playScenarioObj.current.InsertMission.InsertMissionLimitTime;
            //  Limit = 500000   //  デザイン確認時の超ロング上書き
            const InsertMissionWait = () => {
                console.log("[InsertMission]intervalを作成❗️InsertMissionOnAir開始")
                return new Promise((resolve) => {//・・・・・・・・・・・・①
                    InsertMissionWaitId = setInterval(() => {
                        //  1秒単位（1000）で繰り返し評価
                        if (Tick >= Limit) {
                            // Tick = 0    //テスト用
                            console.log("[InsertMission]❗️待ち時間を超えた⏰リセット")
                            if(InsertMissionWaitId){clearInterval(InsertMissionWaitId)}
                            resolve(Tick);  //②超えたので脱出
                        }
                        console.log("[InsertMission]interval Tick：",Tick)
                        Tick = Tick + 1000;
                        setPlayScenario((prevState) => ({
                            ...prevState,
                            current : {
                                ...prevState.current,
                                InsertMission : {
                                    ...prevState.current.InsertMission,
                                    //  制限時間までの待ち時間カウントアップ
                                    InsertMissionWaitTick : Tick,
                                }
                            },
                        }))
                    }, 1000);
                    });
                };
                InsertMissionWait().then((InsertMissionDuration) => {
                    console.log("[InsertMission]intervalを作成❗️③制限時間までの待ち時間超過した ❗️強制停止=>再開❗️")
                    //  制限時間までの待ち時間超過した
                    setPlayScenario((prevState) => ({
                        ...prevState,
                        current : {
                            ...prevState.current,
                            InsertMission : {
                                ...prevState.current.InsertMission,
                                //  ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
                                //  ❗️❗️❗️❗️❗️❗️❗️❗️強制停止❗️❗️❗️❗️❗️❗️❗️❗️❗️
                                //  ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
                                //  制限時間までの待ち時間超過した
                                isInsertMissionWaitTimeOut : true,
                            }
                        },
                    }))
                    missionEndedReStartMovie('❗️まち時間を超えている')
            });
        }
    }, [playScenarioObj.current.InsertMission.showInsertMission]);
    //  playScenarioObj.current.InsertMission.showInsertMissionを評価してタイマー発動
    /////////////////////////////////

    /////////////////////////////////
    //  currentTimeを評価して動作選定
    useEffect(() => {
        console.log("[InsertMission]currentTime==>",currentTime)
        /////////////////////////////////////////////////
        //  ❗️❗️❗️❗️❗️❗️❗️動画始動時初期化ポイント❗️❗️❗️❗️❗️❗️❗️
        if(currentTime === 0){
            console.log("[InsertMission]❗️動画始動時全リセット⏰リセット")
            //  待ち時間タイマーのリセット
            if(InsertMissionWaitId){clearInterval(InsertMissionWaitId)}
            //  どれかのフラグがtrueの時だけ書き込み
            setPlayScenario((prevState) => ({
                ...prevState,
                current : {
                    ...prevState.current,
                    InsertMission : {
                        ...prevState.current.InsertMission,
                        //  ステップ1に滞在中初期化
                        currentStep : 'step1',
                        //  演出が開始されてない
                        InsertMissionStarted : false,
                        //  この演出が終了してない
                        InsertMissionEnded : false,
                        //  明示的に動画を開始する通知
                        reStartMovie : false,
                        //  この演出が現在表示中かどうか
                        showInsertMission : false,
                        //  制限時間までの待ち時間カウントアップ
                        InsertMissionWaitTick : 0,
                            //  制限時間までの待ち時間超過した
                        isInsertMissionWaitTimeOut : false,
                    }
                },
            }))
        }
        //  ❗️❗️❗️❗️❗️❗️❗️動画始動時初期化ポイント❗️❗️❗️❗️❗️❗️❗️
        /////////////////////////////////////////////////
        //  hasInsertMissionそもそもない
        //  playScenarioObj.current.InsertMission.isInsertMissionAppear抽選の結果ない
        if(playScenarioObj.current.InsertMission.InsertMissionEnded){
            console.log("[InsertMission]❌演出が終了されている")
            if(InsertMissionWaitId){clearInterval(InsertMissionWaitId)}
        }else if(currentTime !== 0 && (!hasInsertMission || !playScenarioObj.current.InsertMission.isInsertMissionAppear)){
            console.log("[InsertMission]❌演出が無効or抽選の結果非表示")
            /////////////////////////////////////////////////
            //  無効時のクローズ処理
            if(!playScenarioObj.current.InsertMission.reStartMovie){
                console.log("[InsertMission]❌明示的に動画を開始する通知")
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        InsertMission : {
                            ...prevState.current.InsertMission,
                            //  明示的に動画を開始する通知
                            reStartMovie : true,
                        }
                    },
                }))
                missionEndedReStartMovie('❗️無効なのでreStartMovie書き込んだ後の発火')
            }else if(playScenarioObj.current.InsertMission.showInsertMission){
                console.log("[InsertMission]❌明示的に演出を非表示に")
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        InsertMission : {
                            ...prevState.current.InsertMission,
                            //  明この演出が現在表示中かどうか
                            showInsertMission : false,
                        }
                    },
                }))
            }else if(!playScenarioObj.current.InsertMission.InsertMissionStarted){
                console.log("[InsertMission]❌明示的に演出を（空振り）開始済みに")
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        InsertMission : {
                            ...prevState.current.InsertMission,
                            //  この演出が開始したかかどうか
                            InsertMissionStarted : true,
                        }
                    },
                }))
            }else if(!playScenarioObj.current.InsertMission.InsertMissionStarted){
                console.log("[InsertMission]❌明示的に演出を（空振り）終了済みに")
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        InsertMission : {
                            ...prevState.current.InsertMission,
                            //  この演出が終了したかかどうか
                            InsertMissionEnded : true,
                        }
                    },
                }))
            }
            //  無効時のクローズ処理
            /////////////////////////////////////////////////
        }else if(currentTime !== 0 && currentTime > InsertMissionEndTime){
            console.log("[InsertMission]❗️終了時間を超えている...⏰リセット")
            if(InsertMissionWaitId){clearInterval(InsertMissionWaitId);}
            /////////////////////////////////////////
            //  終了時間を超えている中で更に整合性合わせ
            if(!playScenarioObj.current.InsertMission.reStartMovie){
                console.log("[InsertMission]❗️終了時間を超えているのに再生再開フラグが立っていない時")
                missionEndedReStartMovie('❗️終了時間を超えているのに再生再開フラグが立っていない時')
                //  再生再開フラグが立っていない時
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        InsertMission : {
                            ...prevState.current.InsertMission,
                            //  明示的に動画を開始する通知
                            reStartMovie : true,
                        }
                    },
                }))
            }else if(playScenarioObj.current.InsertMission.showInsertMission){
                console.log("[InsertMission]❗️終了時間を超えているのに現在表示中になっている時")
                //  現在表示中になっている
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        InsertMission : {
                            ...prevState.current.InsertMission,
                            //  ❗️表示終了
                            showInsertMission : false,
                        }
                    },
                }))
            }else if(!playScenarioObj.current.InsertMission.InsertMissionEnded){
            console.log("[InsertMission]❗️終了時間を超えているのに終了フラグが立っていない時")
                //  終了フラグが立っていない時
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        InsertMission : {
                            ...prevState.current.InsertMission,
                            //  この演出が終了したかかどうか
                            InsertMissionEnded : true,
                        }
                    },
                }))
            }else{
                console.log("[InsertMission]❗️終了時間を超えているのに🚨やることなし")
            }
            //  終了時間を超えている中で更に整合性合わせ
            /////////////////////////////////////////
            
        }else if(currentTime !== 0 && currentTime < playScenarioObj.current.InsertMission.InsertMissionStartTime){
            if(InsertMissionWaitId){clearInterval(InsertMissionWaitId);}
            console.log("[InsertMission]❗️開始時間を過ぎていない⏰リセット",currentTime)
        }else if(currentTime !== 0 && currentTime >= playScenarioObj.current.InsertMission.InsertMissionStartTime){
            console.log("[InsertMission]💖開始時間を過ぎている",currentTime,playScenarioObj.current.InsertMission.InsertMissionStartTime)
            /////////////////////////////////////////
            //  開始時間を超えている中で更に整合性合わせ
            if(currentTime >= playScenarioObj.current.InsertMission.InsertMissionLastStepStartTime){
                if(playScenarioObj.current.InsertMission.currentStep !== playScenarioObj.current.InsertMission.StepRandResult){
                    console.log("[InsertMission]💖開始時間を過ぎて抽選されたラストステップの開始時間を過ぎた")
                    setPlayScenario((prevState) => ({
                        ...prevState,
                        current : {
                            ...prevState.current,
                            InsertMission : {
                                ...prevState.current.InsertMission,
                                //  ラストステップに滞在中
                                currentStep : prevState.current.InsertMission.StepRandResult,
                            }
                        },
                    }))
                }
            }else if(currentTime >= turningPoint.step5.startTime){
                if(playScenarioObj.current.InsertMission.currentStep !== 'step5'){
                    console.log("[InsertMission]💖開始時間を過ぎて抽選されたステップ5の開始時間を過ぎた")
                    //  STEP5になっていない時だけ書き込み
                    setPlayScenario((prevState) => ({
                        ...prevState,
                        current : {
                            ...prevState.current,
                            InsertMission : {
                                ...prevState.current.InsertMission,
                                //  ステップ5に滞在中
                                currentStep : 'step5',
                            }
                        },
                    }))
                }
            }else if(currentTime >= turningPoint.step4.startTime){
                if(playScenarioObj.current.InsertMission.currentStep !== 'step4'){
                    console.log("[InsertMission]💖開始時間を過ぎて抽選されたステップ4の開始時間を過ぎた")
                    //  STEP5になっていない時だけ書き込み
                    setPlayScenario((prevState) => ({
                        ...prevState,
                        current : {
                            ...prevState.current,
                            InsertMission : {
                                ...prevState.current.InsertMission,
                                //  ステップ5に滞在中
                                currentStep : 'step4',
                            }
                        },
                    }))
                }
            }else if(currentTime >= turningPoint.step3.startTime){
                if(playScenarioObj.current.InsertMission.currentStep !== 'step3'){
                    console.log("[InsertMission]💖開始時間を過ぎて抽選されたステップ3の開始時間を過ぎた")
                    //  STEP5になっていない時だけ書き込み
                    setPlayScenario((prevState) => ({
                        ...prevState,
                        current : {
                            ...prevState.current,
                            InsertMission : {
                                ...prevState.current.InsertMission,
                                //  ステップ3に滞在中
                                currentStep : 'step3',
                            }
                        },
                    }))
                }
            }else if(currentTime >= turningPoint.step2.startTime){
                if(playScenarioObj.current.InsertMission.currentStep !== 'step2'){
                    console.log("[InsertMission]💖開始時間を過ぎて抽選されたステップ2の開始時間を過ぎた")
                    //  STEP5になっていない時だけ書き込み
                    setPlayScenario((prevState) => ({
                        ...prevState,
                        current : {
                            ...prevState.current,
                            InsertMission : {
                                ...prevState.current.InsertMission,
                                //  ステップ2に滞在中
                                currentStep : 'step2',
                            }
                        },
                    }))
                }
            }else if(currentTime >= turningPoint.step1.startTime){
                if(playScenarioObj.current.InsertMission.currentStep !== 'step1'){
                    console.log("[InsertMission]💖開始時間を過ぎて抽選されたステップ1の開始時間を過ぎた")
                    //  STEP1になっていない時だけ書き込み
                    setPlayScenario((prevState) => ({
                        ...prevState,
                        current : {
                            ...prevState.current,
                            InsertMission : {
                                ...prevState.current.InsertMission,
                                //  ステップ1に滞在中
                                currentStep : 'step1',
                            }
                        },
                    }))
                }
                if(!playScenarioObj.current.InsertMission.InsertMissionStarted){
                    console.log("[InsertMission]💖開始時間を過ぎて演出が開始済みフラグを立てた")
                    //  STEP5になっていない時だけ書き込み
                    setPlayScenario((prevState) => ({
                        ...prevState,
                        current : {
                            ...prevState.current,
                            InsertMission : {
                                ...prevState.current.InsertMission,
                                //  開始済みフラグ
                                InsertMissionStarted : true,
                            }
                        },
                    }))
                }
                if(!playScenarioObj.current.InsertMission.showInsertMission){
                    console.log("[InsertMission]💖開始時間を過ぎて演出がミッション中フラグを立てた")
                    //  STEP5になっていない時だけ書き込み
                    setPlayScenario((prevState) => ({
                        ...prevState,
                        current : {
                            ...prevState.current,
                            InsertMission : {
                                ...prevState.current.InsertMission,
                                //  ミッション中フラグ
                                showInsertMission : true,
                            }
                        },
                    }))
                }
            }else{
                console.log("[InsertMission]❗️開始時間を過ぎて🚨やることなし")
            }
        }else{
            console.log("[InsertMission]❗️例外発生❗️")
        }
    }, [currentTime]);
    //  currentTimeを評価して動作選定
    /////////////////////////////////

    /////////////////////////////////
    //  ミッション終了　動画再生の処理
    function missionEndedReStartMovie(e) {
        console.log("[InsertMission]🔥ミッション終了",e)
        if(!playScenarioObj.current.InsertMission.InsertMissionEnded || playScenarioObj.current.InsertMission.showInsertMission || !playScenarioObj.current.InsertMission.reStartMovie){
            setPlayScenario((prevState) => ({
                ...prevState,
                current : {
                    ...prevState.current,
                    InsertMission : {
                        ...prevState.current.InsertMission,
                        //  この演出が終了したかかどうか
                        InsertMissionEnded : true,
                        //  この演出が現在表示中かどうか
                        showInsertMission : false,
                        //  明示的に動画を開始する通知
                        reStartMovie : true,
                    }
                },
            }))
        }


    }
    //  ミッション終了　動画再生の処理
    /////////////////////////////////

    /////////////////////////////////
    //  ギミックの表示非表示
    if(playScenarioObj.current.InsertMission.showInsertMission && currentTime > 1){
        showInsertMissionClass = ''
    }else{
        showInsertMissionClass = 'hidden'
    }
    //  ギミックの表示非表示
    /////////////////////////////////

    return (
        <>

            <div className={`${showInsertMissionClass}`}>
                {
                    // playScenarioObj.current.InsertMission.showInsertMission
                    // ?
                    {
                        'ButtonMash': <>
                            {/* <p className="text-4xl font-black text-red-600 w-full text-center">
                                ButtonMash<br/>
                                {playScenarioObj.current.InsertMission.InsertMissionWaitTick}<br/>
                                {playScenarioObj.current.InsertMission.currentStep}
                            </p> */}
                                <ButtonMashing data={{
                                    currentTime : currentTime,
                                    currentStep : playScenarioObj.current.InsertMission.currentStep,
                                    isEvenMashing : isEvenMashing,
                                    InsertMissionConf : playScenarioObj.current.InsertMission.InsertMissionConf,
                                    showInsertMission : playScenarioObj.current.InsertMission.showInsertMission,
                                    isVideoEnded : isVideoEnded,
                                }}/>
                            </>,
                        // 'ButtonMash': <ButtonMash/>,
                        // 'ButtonMash':<ButtonMash data={{
                            // currentTime : currentTime,
                            // currentStep : playScenarioObj.current.InsertMission.currentStep,
                            // InsertMissionConf : playScenarioObj.current.InsertMission.InsertMissionConf,
                        // }}/>,
                        'ButtonLongPress': <p className="text-5xl font-black text-red-600 w-full text-center">ButtonLongPress{playScenarioObj.current.InsertMission.InsertMissionWaitTick}</p>,
                        'ButtonShortPress': <p className="text-5xl font-black text-red-600 w-full text-center">ButtonShortPress{playScenarioObj.current.InsertMission.InsertMissionWaitTick}</p>,
                        'Pull': <p className="text-5xl font-black text-red-600 w-full text-center">Pull{playScenarioObj.current.InsertMission.InsertMissionWaitTick}</p>,
                        'Slot': <p className="text-5xl font-black text-red-600 w-full text-center">Slot{playScenarioObj.current.InsertMission.InsertMissionWaitTick}</p>,
                        'HighLow': <p className="text-5xl font-black text-red-600 w-full text-center">HighLow{playScenarioObj.current.InsertMission.InsertMissionWaitTick}</p>,
                    }[playScenarioObj.current.InsertMission.ThemaRandResult]
                    // :<></>
                } 
            </div>
        </>
    );




}
