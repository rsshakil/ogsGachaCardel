//  役割
//  北斗演出開始して全部終わったら再度ファイアー
//  ❗️これは廃止予定
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, } from 'recoil';
import { ButtonMashState } from "../store/recoil/ButtonMashState";
import { HokutoState } from "../store/recoil/HokutoState";
import {useIntl} from 'react-intl'

//  北斗の待ち時間
let timeOutHokuto;
//  北斗タイマー
let hokutoInterval;

export default function useHokuto(props) {
    const intl = useIntl()
    const [HokutoObj, setHokutoObj] = useRecoilState(HokutoState);

    const {
        currentTime,
        // //  この演出が現在表示中かどうか
        // isShowHokuto,
        //  prayer側から開始の要求があった時
        ShowHokuto,
        //  prayer側から開始の要求があった時
        ShowUndercard,
        // //  この演出が終了したかかどうか
        // isHokutoEnded
        //  動画が終了処理済み
        isVideoEnded = false,
    } = props;

    const {
        //  この演出があるのか
        hasHokuto,
        //  この演出の登場する時間
        showHokutoTime,
        //  の演出の終了するまでのミリ秒
        hiddenHokutoSec,
        //  この演出のバリエーションタイプ
        HokutoType = 0,
        //  北斗シナリオobj step,type,text,info
        HokutoScenario,
    } = HokutoObj;
    // console.log("[useHokuto]Obj==>", HokutoObj)
    

    /////////////////////////////////
    //  useState郡
    //  この演出が開始したかかどうか
    const [isHokutoStarted, setIsHokutoStarted] = useState(false);
    //  この演出が現在表示中かどうか
    const [isShowHokuto, setIsShowHokuto] = useState(false);
    //  北斗が終了したかどうか
    const [isHokutoEnded, setIsHokutoEnded] = useState(false);
    //  北斗タイマー
    const [HokutoTicker, setHokutoTicker] = useState(0);
    //  useState郡
    /////////////////////////////////

    useEffect(() => {
        if(isVideoEnded){
            console.log("[useHokuto]動画終了になったのでリセットObj==>", HokutoObj)
            setIsHokutoStarted(false)
            setIsShowHokuto(false)
            setIsHokutoEnded(false)
            setHokutoTicker(0)
        }
    }, [isVideoEnded]);

    useEffect(() => {
        if(ShowHokuto){
            //  一方向で開始した事だけ上書き
            setIsHokutoStarted(ShowHokuto)
        }
    }, [ShowHokuto]);



   
    let hokutoTick = () => {
        if(HokutoTicker < hiddenHokutoSec){
            setHokutoTicker(HokutoTicker + 200)
        ////////////////////////////////////
        //  テスト用のループ処理
        // }else if(HokutoTicker >5800){
            
        //     setHokutoTicker(0)
        //  テスト用のループ処理
        ////////////////////////////////////
        }else{
            console.log("[useHokuto]HokutoTicker終了==>", HokutoTicker)
            setHokutoTicker(99999999)
            //  北斗終了とする
            setIsHokutoEnded(true)
            //  表示終了とする
            setIsShowHokuto(false)
        }
        
    };



    if(isHokutoEnded){
        //  北斗終了しているのでクリア
        clearInterval(hokutoInterval);
    }else if(isHokutoStarted  && !isShowHokuto){
        //  北斗が開始中でまだ非表示なのでフラグを立てる
        setIsShowHokuto(true)
        //  一応クリアする
        clearInterval(hokutoInterval);
    }else{
        // intervalがすでに有るのなら、それはキャンセル。
        if(hokutoInterval) {
            clearInterval(hokutoInterval);
        }
        // あらためてintervalを作成
        hokutoInterval = setInterval(hokutoTick,200);
    }











    console.log("[useHokuto]HokutoTicker：", HokutoTicker,{
        currentTime : currentTime,
        isShowHokuto : isShowHokuto,
        isHokutoStarted : isHokutoStarted,
        isHokutoEnded : isHokutoEnded,
    })



    return {
        currentTime,
        //  北斗ティッカー
        HokutoTicker,
        //  この演出があるのか
        hasHokuto,
        //  この演出の登場する時間
        showHokutoTime,
        //  の演出の終了するまでのミリ秒
        hiddenHokutoSec,
        //  この演出のバリエーションタイプ
        HokutoType,
        //  この演出が現在表示中かどうか
        isShowHokuto,
        //  この演出が開始したかかどうか
        isHokutoStarted,
        //  この演出が終了したかかどうか
        isHokutoEnded,
        //  北斗シナリオobj step,type,text,info
        HokutoScenario,
    }
}