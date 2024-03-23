//  https://portal.game.dcontech.net/game/highandlow/index.html
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import '../../../../css/ButtonMashing.css'
import {useIntl} from 'react-intl'

//  ボタン下部のテキスト
let MashingText = '';
//  ボタン押した時の波紋の色
let RippleColor = '';
//  現在のSTEPの設定
let MissionConf = {};

export const ButtonMashing = (props) => {
    const intl = useIntl()
    /////////////////////////////////
    //  props
    const data = props.data;
    // const intl = useIntl()
    const {
        currentTime = 0,
        currentStep = 'step1',
        InsertMissionConf = {},
        isEvenMashing = false,
        showInsertMission = false,
    } = data;
    //  props
    /////////////////////////////////

    /////////////////////////////////
    //  このミッションの設定の中で現在滞在中のSTEP設定
    MissionConf = InsertMissionConf[currentStep]
    console.log("[ButtonMash]MissionConf",MissionConf)
    //  このミッションの設定の中で現在滞在中のSTEP設定
    /////////////////////////////////

    /////////////////////////////////
    //  このミッションの設定の中で現在滞在中のSTEP設定
    RippleColor = InsertMissionConf[currentStep].RippleColor
    MashingText = InsertMissionConf[currentStep].text
    console.log("[ButtonMash]RippleColor",RippleColor)
    //  このミッションの設定の中で現在滞在中のSTEP設定
    /////////////////////////////////





    let Warning;
    if(MissionConf.isWarning){
        Warning = '-Warning'
    }else{
        Warning = ''
    }

    return (
            <div 
                className={showInsertMission?`btn-emergency-real`:''}
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
                {/* <span className="btn-emergency-real-ButtonMashingText font-Noto-Serif">{intl.formatMessage({ id: MashingText })}</span> */}
                <svg 
                    className="btn-emergency-real-ButtonMashingText" 
                    version="1.1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlnsXlink="http://www.w3.org/1999/xlink" 
                    width="100%" 
                    height="200"
                >
                    <text class="font-black font-Noto-Serif stroke-text thicker color1" x="50%" y="50%">{intl.formatMessage({ id: MashingText })}</text>
                    <text class="font-bold font-Noto-Serif stroke-text thick1 color2" x="50%" y="50%">{intl.formatMessage({ id: MashingText })}</text>
                    <text class="font-bold font-Noto-Serif stroke-text thick2 color3" x="50%" y="50%">{intl.formatMessage({ id: MashingText })}</text>
                    <text class="font-bold font-Noto-Serif stroke-text color4" x="50%" y="50%">{intl.formatMessage({ id: MashingText })}</text>
                </svg>

            </div>
    );
}