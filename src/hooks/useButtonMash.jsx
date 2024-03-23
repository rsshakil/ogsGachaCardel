import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, } from 'recoil';
import { ButtonMashState } from "../store/recoil/ButtonMashState";
import {useIntl} from 'react-intl'


let timer;
let showButtonMashing;
let ButtonMashedStarted;
let ButtonMashedEnded;
export default function useButtonMash(props) {
    // console.log("[useButtonMash]props==>", props)
    const {
        //  現在の再生位置
        currentTime,
        //  この動画の最大の長さ
        duration,
    } = props;
    // console.log("[useButtonMash]currentTime==>", currentTime)
    const intl = useIntl()
    const [ButtonMashObj, setButtonMashObj] = useRecoilState(ButtonMashState);
    const {
        //  この演出があるのか
        hasButtonMashing,
        //  この演出の登場する時間
        showButtonMashingTime,
        //  この演出の終了する時間
        hiddenButtonMashingTime,
        //  この演出のバリエーションタイプ
        buttonMashingType,
        // ButtonMashedStarted,
        //  この演出が終了したかかどうか
        // c,
    } = ButtonMashObj;
    // console.log("[useButtonMash]ButtonMashObj==>", ButtonMashObj)
    
    

    /////////////////////////////////
    //  useState郡
    //  叩くボタンのShow hide
    const [isShowButtonMashing, setIsShowButtonMashing] = useState(false);
    //  叩くボタンの演出が開始したかどうか
    const [isButtonMashedStarted, setIsButtonMashedStarted] = useState(false);
    //  叩くボタンの演出が終了したかどうか
    const [isButtonMashedEnded, setIsButtonMashedEnded] = useState(false);

    useEffect(() => {
        // console.log("[useButtonMash]",currentTime,"function checkButtonMash()");
        // console.log("[useButtonMash]",currentTime,"duration==>",duration);
        if(currentTime === 0 || (duration > 0 && duration === currentTime)){
            //  現在時間が0地点もしくは
            //  総再生時間が0以上と取得できていて、現在時間と同じであれば動画を見終わったと解釈
            //  各フラグのリセット
            setIsShowButtonMashing(false)
            setIsButtonMashedStarted(false)
            setIsButtonMashedEnded(false)
            //  念の為タイマークリア
            clearTimeout(timer)
        }else if(!ButtonMashObj.hasButtonMashing) {
            //  この演出がない時
            // console.log("[useButtonMash]",currentTime,"function checkButtonMash() if(ButtonMashObj.hasButtonMashing)");
            //  エリア非表示
            setIsShowButtonMashing(false)
            //  念の為演出の開始済み
            setIsButtonMashedStarted(false)
            //  演出の終了済み
            setIsButtonMashedEnded(false)
            //  念の為タイマークリア
            clearTimeout(timer)
        }else if(isButtonMashedEnded) {
            //  演出終了済みの時
            // console.log("[useButtonMash]",currentTime,"function checkButtonMash() else if(ButtonMashObj.ButtonMashedEnded)");
            //  エリア非表示
            setIsShowButtonMashing(false)
            //  念の為演出の開始済み
            setIsButtonMashedStarted(true)
            //  演出の終了済み
            setIsButtonMashedEnded(true)
            //  念の為タイマークリア
            clearTimeout(timer)
        }else if(currentTime > ButtonMashObj.hiddenButtonMashingTime) {
            //  演出終了時間を過ぎている時
            console.log("[useButtonMash]",currentTime,"function checkButtonMash() else if(currentTime > ButtonMashObj.hiddenButtonMashingTime)");
            //  エリア非表示
            setIsShowButtonMashing(false)
            //  念の為演出の開始済み
            setIsButtonMashedStarted(true)
            //  演出の終了済み
            setIsButtonMashedEnded(true)
            //  念の為タイマークリア
            clearTimeout(timer)
        }else if(isButtonMashedStarted) {
            //  演出がすでに開始されている
            console.log("[useButtonMash]",currentTime,"function checkButtonMash() else if(ButtonMashObj.ButtonMashedStarted)");
            //  エリア表示
            setIsShowButtonMashing(true)


        }else if(currentTime > ButtonMashObj.showButtonMashingTime) {
            //  演出開始時間を過ぎている時
            console.log("[useButtonMash]",currentTime,"function checkButtonMash() else if(currentTime > ButtonMashObj.showButtonMashingTime)");
            //  エリア表示
            setIsShowButtonMashing(true)
            //  念の為演出の開始済み
            setIsButtonMashedStarted(true)
            //  演出の終了していない
            setIsButtonMashedEnded(false)
            //  タイマースタート
            timer = setTimeout(() => {
                //  時間切れの為エリア非表示
                setIsShowButtonMashing(false)
                //  時間切れの為演出の終了している
                setIsButtonMashedEnded(true)
                // 叩けの待ち時間 通常30000
            }, 300000);

        }else if(currentTime < ButtonMashObj.showButtonMashingTime) {
            console.log("[useButtonMash]",currentTime,"function checkButtonMash() else if(currentTime < ButtonMashObj.showButtonMashingTime)");
            //  演出開始時間を過ぎていない
            //  念の為非表示
            setIsShowButtonMashing(false)
            //  演出の開始していない
            setIsButtonMashedStarted(false)
            //  演出の終了していない
            setIsButtonMashedEnded(false)
            //  念の為タイマークリア
            clearTimeout(timer)
        }else{
            console.log("[useButtonMash]",currentTime,"function checkButtonMash() else ❗️");
            //  そのほか
            //  念の為非表示
            setIsShowButtonMashing(false)
            //  演出の開始していない
            setIsButtonMashedStarted(false)
            //  演出の終了していない
            setIsButtonMashedEnded(false)
            //  念の為タイマークリア
            clearTimeout(timer)
        }
    }, [currentTime]);

    showButtonMashing = isShowButtonMashing
    ButtonMashedStarted = isButtonMashedStarted
    ButtonMashedEnded = isButtonMashedEnded
    return {
        currentTime,
        //  この演出があるのか
        hasButtonMashing,
        //  この演出の登場する時間
        showButtonMashingTime,
        //  この演出の終了する時間
        hiddenButtonMashingTime,
        //  この演出のバリエーションタイプ
        buttonMashingType,
        //  この演出が現在表示中かどうか
        showButtonMashing,
        //  この演出が開始したかかどうか
        ButtonMashedStarted,
        //  この演出が終了したかかどうか
        ButtonMashedEnded,
    }
}