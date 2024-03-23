import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, } from 'recoil';
import { FishesState } from "../../../store/recoil/FishesState";
import '../../../css/Fishs.css';
import Fish_1 from "../img/Fish.png";

export const Fishs = () => {
    let colStart;
    let colEnd;
    let random;
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




    return (
        <div className="fish-group absolute h-full  grid grid-cols-24 content-center pointer-events-non">
        {[...Array(257)].map((i,value,index) => {
            // console.log("[Fishs]111111==>", value)

            if(value === 0){
                colStart =  'col-start-2';
            }else if(value === 18 || value === 38  || value ===59 || value ===81 || value ===104 || value ===128 || value ===152 || value ===175 || value ===197 || value ===218 || value ===238 || value ===257){
                colStart =  'col-start-1';
            }else{
                colStart = '';
                colEnd = '';
            }

            random = Math.floor( Math.random() * 20 );
            return (
                <>
                    <div className={`${colStart} ${colEnd} fish-wrap fish-wrap-${value} fish-wrap-rand-${random}`}>
                        <img className={`aspect-square fish-img fish-img-rand-${random} fish-img-${value}`} src={`${Fish_1}`}></img>
                    </div>

                </>
            );
        })}
        </div>
    );




}