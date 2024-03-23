import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, } from 'recoil';
import {useIntl,FormattedDate} from 'react-intl'
import { HokutoState } from "../../../../store/recoil/HokutoState";
import { playScenarioState } from "../../../../store/recoil/playScenarioState";
import {useInterval,useThrottle,useUpdateEffect} from 'react-use';
import '../../../../css/Hokuto.css';
import '../../../../css/MeraMeraButton_.css';
import imgBomb from "../../img/bomb.gif";
import PillarRainbow from "../../img/luminousPillarRainbow.gif";
import PillarBlue from "../../img/luminousPillarBlue.gif";
import PillarGreen from "../../img/luminousPillarGreen.gif";
import PillarRed from "../../img/luminousPillarRed.gif";
import PillarYellow from "../../img/luminousPillarYellow.gif";
// import Bomb from "./Bomb";
//  背景の画像
let bgSrc;
//  光の柱
let Pillar;
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
export const Hokuto = (props) => {
    const intl = useIntl()
    // console.log('[Hokuto]props==>',props);

    // https://www.webdesign-tch.org/html/710/
    const {
        //  動画の進行時間
        currentTime = 0,
        //  この演出があるのか
        hasUndercard,
    } = props.data;



    const [playScenarioObj, setPlayScenario] = useRecoilState(playScenarioState);
    /////////////////////////////////
    //　今回のシナリオID
    const playScenarioUUID = playScenarioObj.current.playScenarioUUID;
    useEffect(() => {
        // console.log("[Undercard]playScenarioUUID==>", playScenarioUUID)
    }, [playScenarioUUID]);
    //　今回のシナリオID
    /////////////////////////////////

    /////////////////////////////////
    //  現在の上演内容の取得
    const {
        //  前座演出がある時に実行出現するかどうかの比率に基づいて表示するかどうかの判定結果
        isUndercardAppear = false,
        //  前座演出が開始したかどうか（不発の開始も含む）　重複起動の防止
        isUndercardStarted = false,
        //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
        isShowUndercard = false,
        //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
        isUndercardEnded = false,
        //  現在上映中
        nowOnAir = false,
        //  現在の進行時間
        UndercardTickerCurrentTime = 0,
        //  テーマの抽選結果
        ThemaRandResult = '',
        //  ステップの抽選結果
        StepRandResult = '',
        //  今回確定したSTEPから取得する総演出時間　これを超えたら動画再生
        UndercardDuration = '',
        //  今回確定したSTEPのテキスト
        UndercardText,
    } = playScenarioObj.current.Undercard;

        // console.log("[Hokuto]playScenarioObj.current.Undercard==>", playScenarioObj.current.Undercard)

    //  現在の上演内容の取得
    /////////////////////////////////


    //  この演出の暴発防止の保険
    const [isAllowDisplay, setIsAllowDisplay] = useState('hidden');
    //  第一弾発射許可
    const [firstShot, setFirstShot] = useState(false);
    //  第二弾発射許可 中身が何であるかは賞の順位で決める
    const [secondShot, setSecondShot] = useState(false);
    //  震える文字
    const [hurueruHokuto, setHurueruHokuto] = useState(false);
    //  bomb
    const [showBomb, setShowBomb] = useState(false);
    //  確定スタンプ
    const [showStamp, setShowStamp] = useState(false);

    //////////////////////////////////
    //  暴発防止の保険
    useUpdateEffect(() => {
        if(UndercardTickerCurrentTime >= UndercardDuration){
            // console.log('[Hokuto]props==>指定時間を過ぎていたら隠す');
            if(!isAllowDisplay){setIsAllowDisplay('hidden')}
        }else if(isShowUndercard === false){
            // console.log('[Hokuto]props==>表示中でなければ隠す',isShowUndercard);
            if(!isAllowDisplay){setIsAllowDisplay('hidden')}
        }else if(!hasUndercard){
            console.log('[Hokuto]props==>この演出がなければ隠す');
            if(!isAllowDisplay){setIsAllowDisplay('hidden')}
        }else if(isUndercardEnded){
            console.log('[Hokuto]props==>この演出が完了していれば隠す');
            if(!isAllowDisplay){setIsAllowDisplay('hidden')}
        }else if(!isUndercardStarted){
            console.log('[Hokuto]props==>この演出が開始していなければ隠す');
            if(!isAllowDisplay){setIsAllowDisplay('hidden')}
        }else{
            console.log('[Hokuto]props==>何もしない');
            // setIsAllowDisplay('')
        }
    }, [props]);
    //  暴発防止の保険
    //////////////////////////////////

    //////////////////////////////////
    //  時間軸で効果
    //  コマ飛びする事があるので要注意
    //  一コマずつ独立して再度指示を行うこと
    if(UndercardTickerCurrentTime > UndercardDuration){
        if(isAllowDisplay === ''){setIsAllowDisplay('hidden')}
        //  ST6なら爆破
        if(!showBomb && StepRandResult === 'step6'){setShowBomb(true)}
        //  ST6なら確定
        if(!showStamp && StepRandResult === 'step6'){setShowStamp(true)}
        //  第一弾発射許可
        if(!firstShot){setFirstShot(true)}
        //  第二弾発射許可
        if(!secondShot){setSecondShot(true)}
        //  プルプル停止
        if(hurueruHokuto){setHurueruHokuto(false)}
    }else if(UndercardTickerCurrentTime > 3400){
        //  確定発射
        if(isAllowDisplay === 'hidden'){setIsAllowDisplay('')}
        //  ST6なら爆破
        if(StepRandResult === 'step6'){
            //  爆破❗️
            if(!showBomb){setShowBomb(true)}
            //  プルプル停止
            if(hurueruHokuto){setHurueruHokuto(false)}
            //  確定❗️
            if(!showStamp){setShowStamp(true)}
        }else{
            //  プルプル開始
            if(!hurueruHokuto){setHurueruHokuto(true)}
            //  確定　装填
            if(showStamp){setShowStamp(false)}
        }
        //  第一弾発射許可
        if(!firstShot){setFirstShot(true)}
        //  第二弾発射許可
        if(!secondShot){setSecondShot(true)}

    }else if(UndercardTickerCurrentTime > 3000){
        if(isAllowDisplay === 'hidden'){setIsAllowDisplay('')}
        //  ST6かそれ以外で分岐
        if(StepRandResult === 'step6'){
            //  爆破❗️
            if(!showBomb){setShowBomb(true)}
            //  プルプル停止
            if(hurueruHokuto){setHurueruHokuto(false)}
        }else{
            //  プルプル開始
            if(!hurueruHokuto){setHurueruHokuto(true)}
        }
        //  確定　装填
        if(showStamp){setShowStamp(false)}
        //  第一弾　発射
        if(!firstShot){setFirstShot(true)}
        //  第二弾　発射
        if(!secondShot){setSecondShot(true)}
    }else if(UndercardTickerCurrentTime > 2400){
        if(isAllowDisplay === 'hidden'){setIsAllowDisplay('')}
        //  爆破　装填
        if(showBomb){setShowBomb(false)}
        //  確定　装填
        if(showStamp){setShowStamp(false)}
        //  第一弾　発射
        if(!firstShot){setFirstShot(true)}
        //  第二弾　装填
        if(secondShot){setSecondShot(false)}
        //  プルプル開始　継続
        if(!hurueruHokuto){setHurueruHokuto(true)}
    }else if(UndercardTickerCurrentTime > 0){
        if(isAllowDisplay === 'hidden'){setIsAllowDisplay('')}
        //  爆破　装填
        if(showBomb){setShowBomb(false)}
        //  確定　装填
        if(showStamp){setShowStamp(false)}
        //  第一弾　装填
        if(!firstShot){setFirstShot(true)}
        //  第二弾　装填
        if(secondShot){setSecondShot(false)}
        //  プルプル開始
        if(!hurueruHokuto){setHurueruHokuto(true)}
    }else if(UndercardTickerCurrentTime === 0){
        // リセット処理
        if(isAllowDisplay !== 'hidden'){setIsAllowDisplay('hidden')}
        if(firstShot){setFirstShot(false)}
        if(secondShot){setSecondShot(false)}
        if(showBomb){setShowBomb(false)}
        if(showStamp){setShowStamp(false)}

    }else{

    }
    //  時間軸で効果
    //////////////////////////////////

    /////////////////////////////////
    //  props
    useUpdateEffect(() => {
        setPlayScenario((prevState) => ({
            ...prevState,
            current : {
                ...prevState.current,
                Undercard : {
                    ...prevState.current.Undercard,
                    //  北斗の爆発
                    showHokutoBomb: showBomb,
                    //  北斗のスタンプ
                    showHokutoStamp : showStamp,
                }
            },
        }))
    }, [showBomb,showStamp]);
    //  props   
    /////////////////////////////////







    //////////////////////////////////
    //  光の柱のsrc切り替え
    //  StepRandResult
    switch(StepRandResult){
        case "step1":
            Pillar = PillarBlue;
            break;
        case "step2":
            Pillar = PillarGreen;
            break;
        case "step3":
            Pillar = PillarYellow;
            break;
        case "step4":
            Pillar = PillarRed;
            break;
        case "step5":
            Pillar = PillarRed;
            break;
        case "step6":
            Pillar = PillarRainbow;
            break;
        default:
            Pillar = PillarBlue;
            break;
      }
    //  光の柱のsrc切り替え
    //////////////////////////////////

    //////////////////////////////////
    //  背景が光の柱か爆発かの切り替え
    if(showBomb){
        bgSrc = imgBomb;
    }else{
        bgSrc = Pillar;
    }
    //  背景が光の柱か爆発かの切り替え
    //////////////////////////////////

    return (
        <>
        <div className={`${isAllowDisplay} textBomb-${showBomb} typewriter-Wrap font-Noto-Serif [writing-mode:vertical-rl]`}>
            <div className={`typewriter1-wrap flex justify-start items-start hurueruHokuto-${hurueruHokuto}`}>
                <p className={`typewriter1 HokutoTxt-first HokutoTxt-first-${firstShot}`}>{UndercardText[1]}</p>
            </div>
            <div className={`typewriter2-wrap flex justify-start items-start hurueruHokuto-${hurueruHokuto}`}>
                {/* <p className="typewriter HokutoTxt-secondSilent">{secondSilent.HokutoTxt}</p> */}
                <p className={`typewriter2 HokutoTxt-secondHit HokutoTxt-secondHit-${secondShot}`}>{UndercardText[2]}</p>
            </div>
        </div>
        <div className={`bomb`}>
            <img className={`bomb-img showBomb-${showBomb}`} src={bgSrc} alt='Bomb'></img>
            <div className="stamp-wrap">
                <div className={`stamp-${showStamp} stamp stamp-1 stamp-approve`}>
                    <span>{intl.formatDate(new Date().toLocaleString(), {year:'numeric',month: 'numeric',day: 'numeric',})}</span>
                    <span>カーデル</span>
                </div>
                <div className={`stamp-${showStamp} stamp stamp-2 stamp-approve`}>
                    <span>{intl.formatDate(new Date().toLocaleString(), {year:'numeric',month: 'numeric',day: 'numeric',})}</span>
                    <span>カーデル</span>
                </div>
                <div className={`stamp-${showStamp} stamp stamp-3 stamp-approve`}>
                    <span>{intl.formatDate(new Date().toLocaleString(), {year:'numeric',month: 'numeric',day: 'numeric',})}</span>
                    <span>カーデル</span>
                </div>
            </div>
        </div> 
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
            <filter id="squiggly-0">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="0"/>
                <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="6" />
            </filter>
            <filter id="squiggly-1">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="1"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
            </filter>
            <filter id="squiggly-2">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
            </filter>
            <filter id="squiggly-3">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
            </filter>
            <filter id="squiggly-4">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
            </filter>
        </defs> 
        </svg>
        {/* 
        {showBomb ? <div className={`bomb`}>AAAAAAAAAAAAAAAAAAAAAAA<img className="" src={bgSrc} alt='Bomb'></img></div> : <></>} */}
        {/* {showBomb ? <div className={`bomb`} style={{ backgroundImage: `url(${bgSrc})` }}></div> : <></>} */}
        </>
    );




}
