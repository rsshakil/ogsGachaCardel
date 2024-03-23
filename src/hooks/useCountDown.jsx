import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, } from 'recoil';
import { ButtonMashState } from "../store/recoil/ButtonMashState";
import { FishesState } from "../store/recoil/FishesState";
import {useIntl} from 'react-intl'

// const useCountDown = (
//     // countTime: number | null,
//     countTime = 0,
//     setCountTime = 60,
//         ) => {
//         useEffect(() => {
//                 const countDownInterval = setInterval(() => {
//             if (countTime === 0) {
//                     clearInterval(countDownInterval)
//             }
//             if (countTime && countTime > 0) {
//                     setCountTime(countTime - 1)
//             }
//             }, 1000)
//             return () => {
//                 clearInterval(countDownInterval)
//             }
//         }, [countTime])
//     }
  
//   export { useCountDown }



// export default function useCountDown(props) {
//     // console.log("[useFishes]props==>", props)
//     const {
//         remainingTotalSeconds = 0,
//         isUnder60Sec = false
//     } = props;
//     const [returnSec, setreturnSec] = useState(0);

//     ////////////////////////////////////////////////
//     //  カウントダウン



//     useEffect(() => {
//         if(isUnder60Sec){
//             const Sec = () => {
//                 let localSec = 60;
//                 return new Promise((resolve) => {
//                     let localSecid = setInterval(() => {
//                         console.log(`[useCountDown]⏰カウントダウン中:${localSec}`);
//                         nowCount(localSec)
//                         setreturnSec(localSec)
//                         if (localSec <= 0) {
//                             clearInterval(localSecid);
//                             resolve(localSec);
//                         }
//                         localSec --;
//                         return localSec;
//                     }, 1000);
//                 });
//             };
//             console.log('[useCountDown]⏰カウントダウン開始');
//             Sec().then((localSec) => {
//               console.log(`[useCountDown]⏰カウントダウン完了:${localSec}`);
//             });
            
//         }
        
//     }, [isUnder60Sec])
//     //  カウントダウン
//     ////////////////////////////////////////////////
//     let count
//     function nowCount(e) {
//         console.log('[useCountDown]⏰nowCount',e)
//         count = e
        
//     }

//     return {
//         returnSec,
//         count

//     }
// }