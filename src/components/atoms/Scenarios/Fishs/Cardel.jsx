import React, { useRef, useState, useEffect, Suspense, useLayoutEffect,useUpdateEffect } from "react";
import { useRecoilState, } from 'recoil';
import { playScenarioState } from "../../../../store/recoil/playScenarioState";
import '../../../../css/Fishs.css';
import Fish_1 from "../../img/Fish.png";


let arrayCount; //  1-256
let randCount; //  1-21

export const Cardel = () => {
    const [playScenarioObj, setPlayScenario] = useRecoilState(playScenarioState);

    let colStart;
    let colEnd;
    let random;
    let fishArray;

    let currentStep = 'step1'

    /////////////////////////////////
    //　今回のSTEP
    useLayoutEffect(() => {
        currentStep = playScenarioObj?.current?.Fish?.StepRandResult
        console.log("[Cardel]currentStep==>", currentStep)
        if(currentStep === 'step3'){
            arrayCount = 256
            randCount = 11
        }else if(currentStep === 'step2'){
            arrayCount = 156
            randCount = 10
        }else if(currentStep === 'step1'){
            arrayCount = 60
            randCount = 9
        }else{
            arrayCount = 256
            randCount = 10
        }

    }, [playScenarioObj.current.Fish]);
    //　今回のSTEP
    /////////////////////////////////

    // currentStep = 'step3';
    // if(currentStep === 'step3'){
    //     arrayCount = 256
    //     randCount = 11
    // }else if(currentStep === 'step2'){
    //     arrayCount = 156
    //     randCount = 10
    // }else if(currentStep === 'step1'){
    //     arrayCount = 60
    //     randCount = 9
    // }else{
    //     arrayCount = 256
    //     randCount = 10
    // }

    fishArray = Array(arrayCount)
    return (
        <>
        <div className="fish-group absolute h-full  grid grid-cols-24 content-center pointer-events-non">
        {[...fishArray].map((i,value,index) => {
            // console.log("[Fishs]111111==>", value)

            if(value === 0){
                colStart =  'col-start-2';
            }else if(value === 18 || value === 38  || value ===59 || value ===81 || value ===104 || value ===128 || value ===152 || value ===175 || value ===197 || value ===218 || value ===238 || value ===257){
                colStart =  'col-start-1';
            }else{
                colStart = '';
                colEnd = '';
            }

            random = Math.floor( Math.random() * randCount );
            return (
                <>
                    <div className={`${colStart} ${colEnd} fish-wrap fish-wrap-${value} fish-wrap-rand-${random}`}>
                        <img className={`aspect-square fish-img fish-img-rand-${random} fish-img-${value}`} src={`${Fish_1}`}></img>
                        
                    </div>
                </>
            );
        })}

        </div>
        </>
    );




}