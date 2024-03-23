import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import '../../../css/ButtonMashing.css';
import {useIntl} from 'react-intl'
import { ButtonMashState } from "../../../store/recoil/ButtonMashState";



//  ボタン下部のテキスト
let MashingText = '';
//  ボタン押した時の波紋の色
let RippleColor = '';
//  パトランプ点灯
let isWarning = false;


export const ButtonMash_old = (props) => {
    const data = props.data;
    const intl = useIntl()
    const {
        currentTime,
        duration,
        isEvenMashing = false,
    } = data;
    //  ボタン演出のセッティング
    const [ButtonMashObj, setButtonMashObj] = useRecoilState(ButtonMashState);


    



    //  再生時間が変化した時に変更する
    useEffect(() => {
        if(currentTime === 0){
            //  スタート位置に着いたのでリセットする
            //  ボタン下部のテキスト
            MashingText = '';
            //  ボタン押した時の波紋の色
            RippleColor = '';
            //  パトランプ点灯
            isWarning = false;
        }else if(currentTime > ButtonMashObj.showButtonMashingTime + 2.0){
            // 現在位置が表示位置を[2.0]超えた時
            //  叩けテキストなし
            MashingText = intl.formatMessage({ id: ButtonMashObj[2.0].MashingText })
            //  波紋なし
            RippleColor = ButtonMashObj[2.0].RippleColor
            //  パトランプ
            isWarning = ButtonMashObj[2.0].isWarning
        }else if(currentTime > ButtonMashObj.showButtonMashingTime + 1.6){
            //  現在位置が表示位置を[1.6]超えた時
            //  突破しろ！
            MashingText = intl.formatMessage({ id: ButtonMashObj[1.6].MashingText })
            // 叩け波紋　Rainbow
            RippleColor = ButtonMashObj[1.6].RippleColor
            //  パトランプ
            isWarning = ButtonMashObj[1.6].isWarning
        }else if(currentTime > ButtonMashObj.showButtonMashingTime + 1.2){
            //  現在位置が表示位置を[1.2]超えた時
            //  まだまだ！！！！
            MashingText = intl.formatMessage({ id: ButtonMashObj[1.2].MashingText })
            // 叩け波紋　赤色
            RippleColor = ButtonMashObj[1.2].RippleColor
            //  パトランプ
            isWarning = ButtonMashObj[1.2].isWarning
        }else if(currentTime > ButtonMashObj.showButtonMashingTime + 0.8){
            //  現在位置が表示位置を[0.8]超えた時
            //  逃すな！！
            MashingText = intl.formatMessage({ id: ButtonMashObj[0.8].MashingText })
            // 叩け波紋　黄色
            RippleColor = ButtonMashObj[0.8].RippleColor
            //  パトランプ
            isWarning = ButtonMashObj[0.8].isWarning
        }else if(currentTime > ButtonMashObj.showButtonMashingTime + 0.4){
            //  現在位置が表示位置を[0.4]超えた時
            //  もっと叩け！
            MashingText = intl.formatMessage({ id: ButtonMashObj[0.4].MashingText })
            // 叩け波紋　青
            RippleColor = ButtonMashObj[0.4].RippleColor
            //  パトランプ
            isWarning = ButtonMashObj[0.4].isWarning
        }else if(currentTime > ButtonMashObj.showButtonMashingTime + 0.0){
            //  現在位置が表示位置を[0.0]超えた時
            //  叩け！
            MashingText = intl.formatMessage({ id: ButtonMashObj[0.0].MashingText })
            //  叩け波紋　透明
            RippleColor = ButtonMashObj[0.0].RippleColor
            //  パトランプ
            isWarning = ButtonMashObj[0.0].isWarning
        }else{
            //  それ以外
            //  叩けテキストなし
            MashingText = intl.formatMessage({ id: ButtonMashObj['initial'].MashingText })
            //  波紋なし
            RippleColor = ButtonMashObj['initial'].RippleColor
            //  パトランプ
            isWarning = ButtonMashObj['initial'].isWarning
        }
    }, [currentTime]);


    let Warning;
    if(isWarning){
        Warning = '-Warning'
    }else{
        Warning = ''
    }
    return (
            <div 
                className={`btn-emergency-real `}
                href="#" 
                onCopy={() => console.log()}
                onContextMenu={() => console.log()}
                // onTouchStart={() => console.log()}
                >
                <span className="btn-emergency-real-bottom"></span>
                <span className={`btn-emergency-real-ripple ripple-even-${isEvenMashing} ${RippleColor}`}></span>
                <span className={`btn-emergency-real-top${Warning} isEvenMashing-${isEvenMashing}${Warning}`}>
                    <span className="btn-emergency-real-push">
                        <p className="btn-emergency-real-push-text">PUSH</p>
                    </span>
                </span>
                {/* <span className="btn-emergency-real-body"></span> */}
                {/* <span className="btn-emergency-real-ButtonMashingText">{ButtonMashingText}</span> */}
                <span className="btn-emergency-real-ButtonMashingText">{MashingText}</span>
            </div>
    );
}