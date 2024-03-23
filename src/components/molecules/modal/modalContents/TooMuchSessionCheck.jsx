import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/Loading.css';
import {useIntl} from 'react-intl'
import {useInterval,useThrottle,useUpdateEffect,useMount,useUnmount} from 'react-use';
import useSessionCheck from '../../../../hooks/useSessionCheck'

//  エラーが起きた時はこれを使いまわしてください
//  modalTypeを'error'にするだけでモーダを開いたままエラーに遷移します
//  メッセージ内容などはdata: {}に格納して引きまわしてください


export const TooMuchSessionChecK = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const intl = useIntl()
    let errorBody = '';
    console.log("[ModalHead]modalStateValue.data.title==>", modalStateValue.data.body);
    errorBody = modalStateValue.data.body ? modalStateValue.data.body : '';
    const { getSessionCheck } = useSessionCheck();
    //  'react-use'の部品　カウントダウン開始値
    const [tooMuchSessionCheckCount, setTooMuchSessionCheckCount] = React.useState(0);
    //  'react-use'の部品　カウントダウン間隔
    const [tooMuchSessionCheckdelay, setTooMuchSessionCheckDelay] = React.useState(50);
    //  'react-use'の部品　カウントダウン開始停止
    const [isTooMuchSessionCheckRunning, setIsTooMuchSessionCheckRunning] = useState(false);

    /////////////////////////////////////////
    //  セッション猛チェックの開始停止
    useMount(() => {
        setIsTooMuchSessionCheckRunning(true)
    }, []);
    useUnmount(() => {
        setIsTooMuchSessionCheckRunning(false)
    }, []);
    //  セッション猛チェックの開始停止
    /////////////////////////////////////////

    /////////////////////////////////////////
    //  セッション猛チェッカー
    useInterval(
        () => {
            setTooMuchSessionCheckCount(tooMuchSessionCheckCount + 1);
            getSessionCheck()
            console.log("[TooMuchSessionChecK]getSessionCheck");
            // if(tooMuchSessionCheckCount <= 0){
            //     // //  カンターストップ
            //     if(isTooMuchSessionCheckRunning){
            //         setIsTooMuchSessionCheckRunning(false)
            //     }
            // }
        },
        isTooMuchSessionCheckRunning ? tooMuchSessionCheckdelay : null
    );
    //  セッション猛チェッカー
    /////////////////////////////////////////


    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <Headline
                type="h2"
                spanText='モーダルを閉じると中止します'
                spanClass="text-center font-bold text-left text-base font-Prompt text-white flex flex-col"
                headlineText={tooMuchSessionCheckCount}
                headlineClass="text-center font-bold text-left text-8xl font-Prompt text-white flex flex-col"
            />
        </div>
)

}