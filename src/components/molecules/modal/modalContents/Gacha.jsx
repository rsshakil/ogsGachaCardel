import React, { useRef, useState, useEffect, Suspense, useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { playScenarioState } from "../../../../store/recoil/playScenarioState";
import { Headline } from "../../../atoms/text/Headline";
import { GachaLoader } from "../modalChild/GachaLoader";
import { GachaPlayer } from "../modalChild/GachaPlayer";
import { v4 as uuidv4 } from 'uuid';
import {useInterval,useBoolean,useUpdateEffect} from 'react-use';

let timeoutGachaLoader;
export const Gacha = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [playScenarioObj, setPlayScenario] = useRecoilState(playScenarioState);
    // console.log("[Gacha]==>クルクルの開始");
    // console.log("[Gacha]==>modalStateValue",modalStateValue);
    const [GachaVideoUrl, setGachaVideoUrl] = useState(false);
    //  タイムアウトまで進んだかどうか
    // const [isTimeout, setIsTimeout] = useState(false);
    //  今回のシナリオのUUID=>ButtonWrapConfirmで生成してmodalStateValue.data.uuidで受取
    // const uniqueId = uuidv4();
    //  modalStateValueに変化が起きた
    useLayoutEffect(() => {
        // console.log("[Gacha]==>動画URLありフラグを初期化");
        setGachaVideoUrl(false)
        // console.log("[Gacha]==>useEffect(() => {}, []);クリーンアップ処理");
        // clearTimeout(timeoutGachaLoader)
    }, []);

    //  modalStateValueに変化が起きた
    useEffect(() => {
        //  動画URLありフラグを初期化
        setGachaVideoUrl(false)
        // console.log("[Gacha]==>useEffect(() => {}, []);modalStateValue.data.videoUrl]");
        // clearTimeout(timeoutGachaLoader)
        // console.log("[Gacha]==>useEffect==>modalStateValue",modalStateValue);
        if (modalStateValue.data.videoUrl) {
            //  動画URLが渡された
            console.log("[Gacha]==>useEffect==>⭕️動画URLがある⭕️modalStateValue.data.videoUrl",modalStateValue.data.videoUrl);
            setGachaVideoUrl(true)
            setPlayScenario((prevState) => ({
                ...prevState,
                    'current': {
                        ...prevState.current,
                        playScenarioUUID : modalStateValue.data.uuid,
                        prizeRarity: modalStateValue.data.prizeRarity
                    }
            }))
        }else{
            console.log("[Gacha]==>useEffect==>❌動画URLがない❌modalStateValue.data.videoUrl",modalStateValue.data.videoUrl);

        }
      }, [modalStateValue.data.videoUrl]);
    //   console.log("[Gacha]==>GachaVideoUrl",GachaVideoUrl);

    return (
        <div id="GachaPlayerWrap" className="top-0 left-0 h-full w-full flex flex-col justify-center items-center overflow-hidden absolute grow">
            {/* 動画URLがセットされたら早めにプレイヤー表示 */}
            {GachaVideoUrl ? <GachaPlayer/> : '' }
            {/* プレイヤーが構築され準備が整ったらローダーは非表示 */}
            {modalStateValue.mode === 'playMovie' ? '' : <GachaLoader/>}
            {/* <GachaPlayer/> */}
        </div>
    )
}