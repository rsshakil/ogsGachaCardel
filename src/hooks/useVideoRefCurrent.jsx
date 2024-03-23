import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, } from 'recoil';
import { ButtonMashState } from "../store/recoil/ButtonMashState";
import { FishesState } from "../store/recoil/FishesState";
import {useIntl} from 'react-intl'

//  バッファーは満タンかどうか
let isFullBuffered = false;

export default function useVideoRefCurrent(props) {
    // console.log("[useFishes]props==>", props)
    const {
        readyState = 0,
        currentTime = 0,
        networkState = 0,
        volume = 0,
        duration = 0,
        remainingTime = 0,
        bufferedLength = 0,
        bufferedStart = 0,
        bufferedEnd = 0,
        defaultMuted = false,
        muted = false,
        ended = false,
        src,
    } = props;

    useEffect(() => {
        if (bufferedLength === 1 && bufferedStart === 0 && bufferedEnd === duration){
            isFullBuffered = true;
        }
    }, [bufferedEnd]);

    return {
        readyState,
        currentTime,
        networkState,
        volume,
        duration,
        remainingTime,
        bufferedLength ,
        bufferedStart,
        bufferedEnd,
        isFullBuffered,
        defaultMuted,
        muted,
        ended,
        src
    }
}