import React, { useRef, useState, useEffect, Suspense, useLayoutEffect } from "react";
import { useRecoilState, } from 'recoil';
import {useIntl,FormattedDate} from 'react-intl'
import { modalState } from "../../../store/recoil/modalState";
import { playScenarioState } from "../../../store/recoil/playScenarioState";
import { Cardel } from "./Fishs/Cardel";
import {useInterval,useThrottle,useUpdateEffect} from 'react-use';


/////////////////////////////////
//　変数宣言
//  テーマの抽選結果
let ThemaRandResult = '';
//  ステップの抽選結果
let StepRandResult = '';
//  Fishタイマー
let FishInterval;
let FishIntervalArray = new Array();
//  現在の再生位置
// let FishTickerCurrentTime = 0;
//  今回確定したSTEPの演出時間
let FishDuration = 0;
//  今回確定したSTEPのテキスト取得
let FishType = '';
//  抽選の結果この演出が表示されるかどうか
let isFishAppear = false
//  タイマー
let timeOutFireMovieId
//  動画のファイル名
let movieFileName = '';
//  魚群通過のベストタイミング
let fishPoint = 99 //0の誤動作防止
//  魚群撤収のベストタイミング
let escapePoint = 0
//  CSS設定
let ShowFishClass = 'absolute z-30 top-0 w-full h-screen flex flex-col items-center justify-center';
//  表示非表示
let showFishClass = 'hidden';
//　変数宣言
/////////////////////////////////

export const Fish = (props) => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [playScenarioObj, setPlayScenario] = useRecoilState(playScenarioState);
    /////////////////////////////////
    //　今回のシナリオID
    const playScenarioUUID = playScenarioObj.current.playScenarioUUID;
    useLayoutEffect(() => {
        // clearInterval(timeOutFireMovieId);
        // (async () => {
        //     await new Promise(resolve => setTimeout(resolve, 3000)) 
        //     console.log("[useFish]aaa==>３秒後", )
        // })();
        console.log("[Fish]playScenarioUUID==>", playScenarioUUID)
    }, [playScenarioObj.current.playScenarioUUID]);
    //　今回のシナリオID
    /////////////////////////////////

    /////////////////////////////////
    //  props
    const {
        currentTime = 0,
        //  賞のレベル5刻み
        PrizeLevel,
        //  ❗️これは廃止予定　自主的に魚群登場
        ShowFish,
        // 再生が終了しているかどうかをBoolean値で表す
        //  https://higezine.com/blog/front-end/javascript/2021/04/29/716/
        currentEnded,
        // PlaySuccess
    } = props.data;
    useLayoutEffect(() => {
        console.log("[Fish]props.data.PrizeLevel[props.data.PrizeLevel]1==>", props.data.PrizeLevel)
        console.log("[Fish]props.data.PrizeLevel[props.data.PrizeLevel]2==>", PrizeLevel)
        console.log("[Fish]ShowFish==>", ShowFish)
    }, [props.data.PrizeLevel]);
    //  props   
    /////////////////////////////////

    /////////////////////////////////
    //  PrizeLevelに応じた設定値の取得
    const {
        //  前座演出があるのか
        hasFish = true,
        //  前座演出がある時に実行出現するかどうかの比率
        FishFrequency = {},
        //  それぞれの出現率
        cardel = 100,
        zawazawa = 0,
        dodododo = 0,
        gogogogo = 0,
        doooooon = 0,
        zokuzoku = 0,
    } = playScenarioObj.gimmick[PrizeLevel].Fish;
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
    //  動画関連情報の取得
    //  ❗️動画の新規追加で未定義の場合のエラー処理入れる
    //  拡張子付きの正規表現　から　後方4文字(.mp4)削除して動画ID
    // movieFileName = (videoUrl.match(".+/(.+?)([\?#;].*)?$")[1]).slice( 0, -4 );
    movieFileName = modalStateValue.data.videoId
    useLayoutEffect(() => {
        console.log("[Fish]movieFileName==>", movieFileName)
        //  魚群通過のベストタイミング
        fishPoint = playScenarioObj.movie[movieFileName].turningPoint.fish.startTime;
        //  余裕を見て強制的に魚群を撤去するタイミング
        escapePoint = playScenarioObj.movie[movieFileName].turningPoint.fish.endTime;
        console.log("[Fish]fishPoint==>", fishPoint)
    }, [videoUrl]);
  
    //  動画関連情報の取得
    /////////////////////////////////

    /////////////////////////////////
    //   playScenarioUUID変更のタイミングで１回+PrizeLevel固まるまで
    //  （１）出現するのであれば割合に応じた出現判定
    //  （２）出現するのであればどのテーマかの抽選
    //  （３）選出されたテーマの中でSTEPの抽選
    //  （４）確定したSTEPのduration取得（仮死状態のとき再生へ強制移行）
    //  （５）確定したSTEPの文言取得
    useLayoutEffect(() => {
    //     //  開始のタイミングで１回だけ設定処理
        clearInterval(timeOutFireMovieId);
        console.log("[Fish]playScenarioUUIDの変化を検知==>", playScenarioUUID)
        console.log("[Fish]props.data.PrizeLevel==>", props.data.PrizeLevel)
        if(playScenarioUUID !== 'ScenarioIsEnded'){
            //  FishFrequencyからtotalとそれ以外に分離
            const {total, ...ThemaFrequency} = FishFrequency
            //  totalの出現割合obj
            console.log("[Fish]total==>", total)
            //  totalを除いた出現割合obj
            console.log("[Fish]FishFrequency==>", ThemaFrequency)

            //////////////////////////////////
            //  （１）出現するのであれば割合に応じた出現判定
            const appearRand  = Math.floor(Math.random() * 100)
            if(total >= appearRand && hasFish){
                //  演出あり＋表示抽選に当たったとき
                console.log("[Fish]total>= appearRand:true==>", total, ':', appearRand)
                isFishAppear = true
            }else{
                console.log("[Fish]total>= appearRand:false==>", total, ':', appearRand)
                isFishAppear = false
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
            console.log("[Fish]ThemaRandResult==>", ThemaRandResult)
            console.log("[Fish]ThemaRand==>", ThemaRand?ThemaRand:'空')
            //  （２）出現するのであればどのテーマかの抽選
            //////////////////////////////////

            //////////////////////////////////
            //  （３）選出されたテーマの中でSTEPの抽選
            //  100分率で
            const StepRand = Math.floor(Math.random() * 100)
            let stepRate = 0
            console.log("[Fish]playScenarioObj.gimmick[PrizeLevel].Fish[ThemaRandResult]==>", playScenarioObj.gimmick[PrizeLevel].Fish[ThemaRandResult])
            for (const prop in playScenarioObj.gimmick[PrizeLevel].Fish[ThemaRandResult]) {
                stepRate += playScenarioObj.gimmick[PrizeLevel].Fish[ThemaRandResult][prop]
                if (StepRand < stepRate) {
                    StepRandResult = prop
                  break
                }
              }
            //  step確定
            console.log("[Fish]StepRandResult==>", StepRandResult?StepRandResult:'空')
            //  （３）選出されたテーマの中でSTEPの抽選
            //////////////////////////////////

            //////////////////////////////////
            //  （４）確定したSTEPのduration取得（仮死状態のとき再生へ強制移行）
            FishDuration = playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult].duration;
            console.log("[Fish]playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult].duration==>", playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult].duration)
            //  （４）確定したSTEPのduration取得（仮死状態のとき強制移行）
            //////////////////////////////////

            //////////////////////////////////
            //  （５）確定したSTEPのタイプ取得
            const FishTextRand = Math.floor( Math.random() * 3 ) + 1;
            console.log("[Fish]FishTextRand==>", FishTextRand)
            FishType = playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult][FishTextRand].type;
            console.log("[Fish]playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult][FishTextRand].type==>", playScenarioObj.gimmick.config[ThemaRandResult][StepRandResult][FishTextRand].type)
            //  （５）確定したSTEPのタイプ取得
            //////////////////////////////////

    //         //////////////////////////////////
    //         //  （６）最終結果をrecoilに保存
            setPlayScenario((prevState) => ({
                ...prevState,
                current : {
                    ...prevState.current,
                    playScenarioUUID : playScenarioUUID,
                    Fish : {
                        ...prevState.current.Fish,
                        //  前座演出がある時に実行出現するかどうかの比率に基づいて表示するかどうかの判定結果
                        isFishAppear : isFishAppear,
                        //  テーマの抽選結果
                        ThemaRandResult : ThemaRandResult,
                        //  ステップの抽選結果
                        StepRandResult : StepRandResult,
                        //  今回確定したSTEPから取得する総演出時間　これを超えたら動画再生
                        FishDuration : FishDuration,
                        //  今回確定したSTEPのタイプ
                        FishType : FishType,
                        //  前座演出が開始したかどうか　重複起動の防止
                        isFishStarted : false, //  ❗️初期化
                        //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
                        nowOnAir : false, //  ❗️初期化
                        //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
                        isFishEnded : false, //  ❗️初期化
                        //  魚群襲来時間
                        fishPoint : fishPoint,
                        //  魚群撤収時間
                        escapePoint : escapePoint,
                    }
                },
            }))
    //         //  （６）最終結果をrecoilに保存
    //         //////////////////////////////////
        }
    }, [playScenarioUUID,PrizeLevel]);
    //   playScenarioUUID変更のタイミングで１回+PrizeLevel固まるまで
    /////////////////////////////////

    /////////////////////////////////
    //  currentTime
    //  currentTimeに応じたステータス変更
    useUpdateEffect(() => {
        if(!hasFish){
            console.log("[Fish]❗️❗️❗️演出がない❗️❗️❗️==>", currentTime)
        }else if(!isFishAppear){
            console.log("[Fish]❗️❗️❗️演出があるが表示落選❗️❗️❗️==>", currentTime)
        }else if(currentTime === 0){
            //  ❗️❗️❗️リセット地点❗️❗️❗️
            console.log("[Fish]❗️❗️❗️リセット地点❗️❗️❗️==>", currentTime)
            setPlayScenario((prevState) => ({
                ...prevState,
                current : {
                    ...prevState.current,
                    playScenarioUUID : playScenarioUUID,
                    Fish : {
                        ...prevState.current.Fish,
                        //  前座演出が開始したかどうか　重複起動の防止
                        isFishStarted : false, //  ❗️初期化
                        //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
                        nowOnAir : false, //  ❗️初期化
                        //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
                        isFishEnded : false, //  ❗️初期化
                    }
                },
            }))
        }else if(currentTime > escapePoint && currentTime > fishPoint && (!playScenarioObj.current.Fish.isFishEnded || playScenarioObj.current.Fish.nowOnAir)){
            //  魚群撤収
            console.log("[Fish]❗️❗️❗️魚群撤収❗️❗️❗️==>", currentTime)
            if(!playScenarioObj.current.Fish.isFishEnded){
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        playScenarioUUID : playScenarioUUID,
                        Fish : {
                            ...prevState.current.Fish,
                            //  終了済み
                            isFishEnded : true,
                        }
                    },
                }))
            }else if(playScenarioObj.current.Fish.nowOnAir){
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        playScenarioUUID : playScenarioUUID,
                        Fish : {
                            ...prevState.current.Fish,
                            //  上映終了
                            nowOnAir : false,
                        }
                    },
                }))
            }else{
                console.log("[Fish]❗️❗️❗️魚群異常撤収❗️❗️❗️==>", currentTime)
            }
        }else if(currentTime > fishPoint && currentTime < escapePoint && (!playScenarioObj.current.Fish.isFishStarted || !playScenarioObj.current.Fish.nowOnAir)){
            console.log("[Fish]❗️❗️❗️魚群襲来❗️❗️❗️==>", currentTime)
            if(!playScenarioObj.current.Fish.isFishStarted){
                console.log("[Fish]❗️❗️❗️魚群開始済みフラグ❗️❗️❗️==>", currentTime)
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        playScenarioUUID : playScenarioUUID,
                        Fish : {
                            ...prevState.current.Fish,
                            //  前座演出が開始したかどうか　重複起動の防止
                            isFishStarted : true,
                        }
                    },
                }))
            }else if(!playScenarioObj.current.Fish.nowOnAir){
                console.log("[Fish]❗️❗️❗️魚群オンエア中フラグ❗️❗️❗️==>", currentTime)
                setPlayScenario((prevState) => ({
                    ...prevState,
                    current : {
                        ...prevState.current,
                        playScenarioUUID : playScenarioUUID,
                        Fish : {
                            ...prevState.current.Fish,
                            //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
                            nowOnAir : true,
                        }
                    },
                }))
            }else{
                console.log("[Fish]❗️❗️❗️魚群異常開始❗️❗️❗️==>", currentTime)
            }
        }else{
            console.log("[Fish]❗️❗️❗️currentTime例外❗️❗️❗️==>", currentTime)
        }
    }, [currentTime]);

    // isFishStarted : false, //  ❗️初期化
    // //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
    // nowOnAir : false, //  ❗️初期化
    // //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
    // isFishEnded : false, //  ❗️初期化


    //  currentTimeに応じたステータス変更
    /////////////////////////////////

    /////////////////////////////////
    //  ギミックの表示非表示
    if(playScenarioObj.current.Fish.nowOnAir){
        showFishClass = ''
    }else{
        showFishClass = 'hidden'
    }
    //  ギミックの表示非表示
    /////////////////////////////////

    return (
        <figure className={`${ShowFishClass} ${showFishClass}`}>
                {

                    {
                        'cardel': <Cardel />,
                        'zawazawa': '',
                        'dodododo': '',
                        'gogogogo': '',
                        'doooooon': '',
                        'zokuzoku': '',
                    }[playScenarioObj.current.Fish.ThemaRandResult]

                } 
        </figure>
    );




}
