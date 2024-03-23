import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ButtonMashState } from "../../store/recoil/ButtonMashState";
import {useIntl} from 'react-intl'


//これは使わなくなるかもしれない

// export const CheckButtonMash = (props) => {
export default function CheckButtonMash(props) {
    // console.log("[CheckButtonMash]props==>", props)
    const {
        currentTime,
    } = props;
    console.log("[CheckButtonMash]currentTime==>", currentTime)
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
        //  この演出が現在表示中かどうか
        showButtonMashing,
        //  この演出が開始したかかどうか
        ButtonMashedStarted,
        //  この演出が終了したかかどうか
        ButtonMashedEnded,
    } = ButtonMashObj;
    console.log("[CheckButtonMash]ButtonMashObj==>", ButtonMashObj)

    ////////////////////////////////////////////////////////
    //  叩けボタンのチェック
    //  後の条件から
    // function checkButtonMash(e) {
        console.log("[CheckButtonMash]",currentTime,"function checkButtonMash()");
        if(!ButtonMashObj.hasButtonMashing) {
            //  この演出がない時
            console.log("[CheckButtonMash]",currentTime,"function checkButtonMash() if(ButtonMashObj.hasButtonMashing)");
            // //  念の為非表示
            // setButtonMashing('hidden 3')
            // //  念の為再生
            // videoRestart()
            // //  念の為叩くボタンを終了したフラグ
            // setButtonMashedFin(true)
        }else if(ButtonMashObj.ButtonMashedEnded) {
            //  演出終了済みの時
            console.log("[CheckButtonMash]",currentTime,"function checkButtonMash() else if(e > ButtonMashObj.ButtonMashedEnded)");
            // //  念の為非表示
            // setButtonMashing('hidden 2')
            // //  念の為再生
            // videoRestart()
            // //  念の為叩くボタンを終了したフラグ
            // setButtonMashedFin(true)
        }else if(currentTime > ButtonMashObj.hiddenButtonMashingTime) {
            //  演出終了時間を過ぎている時
            console.log("[CheckButtonMash]",currentTime,"function checkButtonMash() else if(e > ButtonMashObj.hiddenButtonMashingTime)");
            // //  念の為非表示
            // setButtonMashing('hidden 1')
            // //  念の為再生
            // videoRestart()
            // //  念の為叩くボタンを終了したフラグ
            // setButtonMashedFin(true)
        }else if(ButtonMashObj.ButtonMashedStarted) {
            //  演出がすでに開始されている
            console.log("[CheckButtonMash]",currentTime,"function checkButtonMash() else if(e > ButtonMashObj.ButtonMashedStarted)");
            // //  念の為エリア表示
            // setButtonMashing('')
        }else if(currentTime > ButtonMashObj.showButtonMashingTime) {
            //  演出開始時間を過ぎている時
            console.log("[CheckButtonMash]",currentTime,"function checkButtonMash() else if(e > ButtonMashObj.showButtonMashingTime)");
            //  エリア表示
            // setButtonMashing('')
            // //  タイマースタート
            // timer = setTimeout(() => {
            //     console.log("[CheckButtonMash]",currentTime,"指定時間を経過したので自動的に再生開始");
            //     videoRef.current?.play()
            //     //  成功した場合
            //     .then(() => {
            //         //  play()の成功フラグ
            //         setPlaySuccess(true)
            //         //  叩くボタンのShow hide
            //         setButtonMashing('hidden 1')
            //         console.log("[CheckButtonMash]",currentTime,"指定時間を経過したので自動的に再生開始してボタン非表示");
            //         //  叩くボタンを終了したフラグ[時間切れのケース]
            //         setButtonMashedFin(true)
            //         console.log("[CheckButtonMash]",currentTime,"叩くボタンを終了したフラグ[時間切れのケース]==>",ButtonMashedFin);
            //     })
            //     //  失敗することもある
            //     .catch((error) => {
            //         //  play()の成功フラグ
            //         setPlaySuccess(false)
            //         //  叩くボタンのShow hide
            //         setButtonMashing('')
            //         console.log("[CheckButtonMash]",currentTime,"指定時間を経過したのに失敗『叩け』表示フラグ==>",ButtonMashing);
            //     })
            //     // 叩けの待ち時間 通常30000
            // }, 300000);
            // //  動画の一時停止
            // videoRef.current?.pause();
        }else if(currentTime < ButtonMashObj.showButtonMashingTime) {
            console.log("[CheckButtonMash]",currentTime,"function checkButtonMash() else if(e < ButtonMashObj.showButtonMashingTim)");
            //  演出開始時間を過ぎていない
            //  念の為非表示
            // setButtonMashing('hidden 1')
            // //  念の為タイマークリア
            // clearTimeout(timer)
        }else{
            console.log("[CheckButtonMash]",currentTime,"function checkButtonMash() else ❗️");
            //  そのほか
            // //  念の為非表示
            // setButtonMashing('hidden 1')
            // //  念の為タイマークリア
            // clearTimeout(timer)
        }
    // }
    return ;
};

