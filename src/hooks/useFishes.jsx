import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, } from 'recoil';
import { ButtonMashState } from "../store/recoil/ButtonMashState";
import { FishesState } from "../store/recoil/FishesState";
import {useIntl} from 'react-intl'



let ShowFishes = false;
let FishesStarted = false;
let FishesEnded = false;

export default function useFishes(props) {
    // console.log("[useFishes]props==>", props)
    const {
        currentTime,
    } = props;
    // console.log("[useFishes]currentTime==>", currentTime)
    const intl = useIntl()
    const [FishesObj, setFishesObj] = useRecoilState(FishesState);
    const {
        //  この演出があるのか
        hasFishes,
        //  この演出の登場する時間
        showFishesTime,
        //  この演出の終了する時間
        hiddenFishesTime,
        //  この演出のバリエーションタイプ
        FishesType,
        //  この演出が現在表示中かどうか
        // showButtonMashing,
        //  この演出が開始したかかどうか
        // ButtonMashedStarted,
        //  この演出が終了したかかどうか
        // c,
    } = FishesObj;
    // console.log("[useFishes]FishesObj==>", FishesObj)
    
    

    /////////////////////////////////
    //  useState郡
    //  魚群が表示中かどうか
    const [isShowFishes, setIsShowFishes] = useState(false);
    //  魚群が開始したかどうか
    const [isFishesStarted, setIsFishesStarted] = useState(false);
    //  魚群が終了したかどうか
    const [isFishesEnded, setIsFishesEnded] = useState(false);

    useEffect(() => {
        // console.log("[useFishes]",currentTime,"useEffect currentTime");
        if(!FishesObj.hasFishes) {
            //  この演出がない時
            console.log("[useFishes]",currentTime,"function checkButtonMash() if(FishesObj.hasFishes)");
            //  エリア非表示
            setIsShowFishes(false)
            //  念の為演出の開始済み
            setIsFishesStarted(true)
            //  演出の終了済み
            setIsFishesEnded(true)

        }else if(isFishesEnded) {
            //  演出終了済みの時
            console.log("[useFishes]",currentTime,"function checkButtonMash() else if(FishesObj.isFishesEnded)");
            //  エリア非表示
            setIsShowFishes(false)
            //  念の為演出の開始済み
            setIsFishesStarted(true)
            //  演出の終了済み
            setIsFishesEnded(true)

        }else if(currentTime > FishesObj.hiddenFishesTime) {
            //  演出終了時間を過ぎている時
            console.log("[useFishes]",currentTime,"function checkButtonMash() else if(currentTime > FishesObj.hiddenFishesTime)");
            //  エリア非表示
            setIsShowFishes(false)
            //  念の為演出の開始済み
            setIsFishesStarted(true)
            //  演出の終了済み
            setIsFishesEnded(true)

        }else if(isFishesStarted) {
            //  演出がすでに開始されている
            console.log("[useFishes]",currentTime,"function checkButtonMash() else if(FishesObj.isFishesStarted)");
            //  エリア表示
            setIsShowFishes(true)


        }else if(currentTime > FishesObj.showFishesTime) {
            //  演出開始時間を過ぎている時
            console.log("[useFishes]",currentTime,"function checkButtonMash() else if(currentTime > FishesObj.showFishesTime)");
            //  エリア表示
            setIsShowFishes(true)
            //  念の為演出の開始済み
            setIsFishesStarted(true)
            //  演出の終了していない
            setIsFishesEnded(false)

        }else if(currentTime < FishesObj.showFishesTime) {
            console.log("[useFishes]",currentTime,"function checkButtonMash() else if(currentTime < FishesObj.showFishesTime)");
            //  演出開始時間を過ぎていない
            //  念の為非表示
            setIsShowFishes(false)
            //  演出の開始していない
            setIsFishesStarted(false)
            //  演出の終了していない
            setIsFishesEnded(false)

        }else{
            console.log("[useFishes]",currentTime,"else ❗️");
            //  そのほか
            //  念の為非表示
            setIsShowFishes(false)
            //  演出の開始していない
            setIsFishesStarted(false)
            //  演出の終了していない
            setIsFishesEnded(false)

        }
    }, [currentTime]);

    ShowFishes = isShowFishes
    FishesStarted = isFishesStarted
    FishesEnded = isFishesEnded
    return {
        currentTime,
        //  この演出があるのか
        hasFishes,
        //  この演出の登場する時間
        showFishesTime,
        //  この演出の終了する時間
        hiddenFishesTime,
        //  この演出のバリエーションタイプ
        FishesType,
        //  この演出が現在表示中かどうか
        ShowFishes,
        //  この演出が開始したかかどうか
        FishesStarted,
        //  この演出が終了したかかどうか
        FishesEnded,
    }
}