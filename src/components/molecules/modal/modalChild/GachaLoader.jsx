import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useInterval,useMount,useUnmount,useNetworkState} from 'react-use';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import OrbLoader from "../../../atoms/Loading/OrbLoader";


/// https://qiita.com/st_12/items/c4e4c1237e97c1b6a657
export const GachaLoader = () => {

    ///////////////////////////////////////////////////
    //  Recoil
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    //  Recoil
    ///////////////////////////////////////////////////



    ///////////////////////////////////////////////////
    //  表示状態の監視
    const state = useNetworkState();
    useMount(() => {
        console.log("[GachaLoader]useMount","GachaLoaderが表示になりました");
        setIsGachaLoaderRunning(true)
        ///////////////////////////////////////////////////
        //  表示のタイミングで最新のネットワーク状態の把握
        //  待機の限界時間のスイッチに使用する
        //  ECTはそれ以外を想定しておく
        //  ECT     最小RTT	    最大下り接続	説明
        //  slow-2g	2000ms	    50 Kbps	        テキストのみのページなど、少量の転送のみに適したネットワークです。
        //  2g	    1400ms	    70 Kbps	        このネットワークは小さな画像の転送に向いています。
        //  3g	    270ms	    700 Kbps	    高解像度の画像や音声、標準画質ビデオなどの大容量の資産の転送に適しています。
        //  4g	    0ms	        ∞	            ネットワークは HD ビデオ、リアルタイムビデオなどに適しています。
        setUserState((prevState) => ({
            ...prevState,
            NetworkState: state,
        }))
        console.log("[GachaLoader]NetworkState",state);
        //  表示のタイミングで最新のネットワーク状態の把握
        ///////////////////////////////////////////////////
    }, []);
    useUnmount(() => {
        console.log("[GachaLoader]useUnmount","GachaLoaderが非表示になりました");
        setIsGachaLoaderRunning(false)
    }, []);
    //  表示状態の監視
    ///////////////////////////////////////////////////

    ///////////////////////////////////////////////////
    //  useIntervalの部材
    //  カウント
    const [GachaLoaderCount, setGachaLoaderCount] = useState(0);
    //  カウント間隔
    const [GachaLoaderIntervalDelay, setGachaLoaderIntervalDelay] = useState(1000);
    //  カウント開始停止
    const [isGachaLoaderRunning, setIsGachaLoaderRunning] = useState(false);
    //  useIntervalの部材
    ///////////////////////////////////////////////////

    /////////////////////////////////
    //  Undercard.ThemaRandResult=hokuto確定スタンプLooper
    // const [trueOrbLoader, toggleOrbLoader] = useToggle(true)
    useInterval(
        () => {
            setGachaLoaderCount((prevCount) => prevCount + 1);
            console.log("[GachaLoader]useUnmount","GachaLoader表示してから:",GachaLoaderCount);
            if(GachaLoaderCount > 90){
                console.log("[GachaLoader]useUnmount","GachaLoader表示してから指定秒経過❗️",GachaLoaderCount);
                resuscitate()
                setIsGachaLoaderRunning(false)
            }
        },
        isGachaLoaderRunning ? GachaLoaderIntervalDelay : null
    );
    //  Undercard.ThemaRandResult=hokuto確定スタンプLooper
    /////////////////////////////////

    /////////////////////////////////
    //  Uresuscitate
    function resuscitate(e) {
        console.log("[GachaLoader]useUnmount","❤️‍🩹蘇生開始");
        // if(trueOrbLoader){
        //     console.log("[GachaLoader]useUnmount","GachaLoader表示してるのでトグル");
        //     toggleOrbLoader()
        // }
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'VideoPlayFailure',
            mode: "",
            data: "",
        }))



    }

    //  resuscitate
    /////////////////////////////////

    return (
        <>
            <OrbLoader />
        </>
    )
}