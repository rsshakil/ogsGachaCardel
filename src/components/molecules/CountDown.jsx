import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams, useParams, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";
import { modalState } from "../../store/recoil/modalState";
// import { accessState } from "../../store/recoil/accessState";
import '../../css/Icatch.css';
import {useIntl} from 'react-intl'
import { Firework } from "../atoms/material/Firework";
// import {useInterval,useBoolean} from 'react-use';
// import useCountDown from "../../hooks/useCountDown";


let seconds4diplay = '';
let localSecid = {}

export const CountDown = (props) => {
    const {
        day,
        hour,
        minutes,
        seconds,
        start,
        remainingTotalSeconds,
        productKey,
        gachaDisplay
    } = props.data;
    const intl = useIntl()
    const location = useLocation();
    const navigate = useNavigate();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [productListArray, setProductList] = useRecoilState(productListState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    //  モーダルopenで隠す
    const [hiddenClass, setHiddenClass] = useState('');
    const [isSecondsOdd, setIsSecondsOdd] = useState(false);
    const [isUnder60Sec, setIsUnder60Sec] = useState(false);
    const [displayType, setDisplayType] = useState('onlyDateTime');

    const [count, setCount] = React.useState(60);
    const [delay, setDelay] = React.useState(1000);
    const [isRunning, setIsRunning] = useState(false);

    ////////////////////////////////////////////////
    //  https://github.com/streamich/react-use/blob/master/docs/useInterval.md
    //  60からカウントダウンして🔥
    // useInterval(
    //     () => {
    //         setCount(count - 1);
    //         console.log("[CountDown]count=======>",count);
    //         if( count % 2 === 0 ) {
    //                 // 偶数の場合の処理
    //                 setIsSecondsOdd(true)
    //             }else{
    //                 setIsSecondsOdd(false)
    //         }
    //         if(count <= -5){
    //             // //  カンターストップ
    //             // if(isRunning){setIsRunning(false)}
    //         }

    //         },
    //         isRunning ? delay : null
    // );
    //  60からカウントダウンして🔥
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    //  現在の秒が偶数か奇数かでCSS切り替える
    //  現在の残秒が60以下ならフラグ倒す

    // const [localSec, setLocalSec] = useState(60);



    useEffect(() => {
        ////////////////////////////////
        //   場合独自の時計に切り替える
        if(remainingTotalSeconds <= 61){
            console.log("[CountDown]60秒未満=======>",remainingTotalSeconds);
            if(!isUnder60Sec){setIsUnder60Sec(true)}
            // if(!isRunning){setIsRunning(true)}
        }else{
            console.log("[CountDown]60秒else=======>",remainingTotalSeconds);
            // if(isUnder60Sec){setIsUnder60Sec(false)}
        }
        //    60秒未満の場合独自の時計に切り替える
        ////////////////////////////////

        if( remainingTotalSeconds % 2 === 0 ) {
            // 偶数の場合の処理
            setIsSecondsOdd(true)
        }else{
            setIsSecondsOdd(false)
        }


        ////////////////////////////////
        //    表示タイプの決定
        if(remainingTotalSeconds <= 61){
        //  60秒前カウントダウン
            if(remainingTotalSeconds < 1 ){
                if(displayType !== 'fireworks'){setDisplayType('fireworks')}
                console.log("[CountDown]countremainingTotalSeconds <= 0 =======>",count);
            }else{
                console.log("[CountDown]60秒前カウントダウン =======>",count);
                if(displayType !== 'under60Sec'){setDisplayType('under60Sec')}
            }
            
        }else if(remainingTotalSeconds <= 180){
            //  ３分切ったとき
            //  分：秒前
            if(displayType !== 'under3Min'){setDisplayType('under3Min')}
        }else if(remainingTotalSeconds <= 3600){
        //  １時間切った時
        //  分前
            if(displayType !== 'under1Hour'){setDisplayType('under1Hour')}
        }else if(remainingTotalSeconds <= 360000){
        //  100時間切った時（99時間？？分）
            if(displayType !== 'under100Hour'){setDisplayType('under100Hour')}
        }else if(gachaDisplay === 'countdown' && remainingTotalSeconds > 360000){
            //  １00時間切った時（99時間？？分）
            if(displayType !== 'onlyDateTime'){setDisplayType('onlyDateTime')}
        }else{
            //  カウントダウンの表示はしない
            if(displayType !== ''){setDisplayType('else')}
            console.log("[CountDown]countカウントダウンの表示はしない =======>",count);
        }
        //    表示タイプの決定
        console.log("[CountDown]displayType=======>",displayType);
        ////////////////////////////////
    }, [remainingTotalSeconds])
    //  現在の秒が偶数か奇数かでCSS切り替える
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    //  isUnder60Secがtrueなら独自の時計開始
       
    useEffect(() => {
        // if(isUnder60Sec){
        //     // seconds4diplay = localCountDown?.count
        //     seconds4diplay = count
        // }else{
        //     console.log("[CountDown]isUnder60Sec=======>",isUnder60Sec,remainingTotalSeconds);
        //     seconds4diplay = remainingTotalSeconds
        // }


    }, [isUnder60Sec])
    //  isUnder60Secがtrueなら独自の時計開始
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    //  モーダルが開いたらアニメーション止める
    //  スマホではほとんど見れない
    useEffect(() => {
        if(modalStateValue.BaseModalOpen){
            setHiddenClass('hidden')
        }else{
            setHiddenClass('')
        }
    }, [modalStateValue.BaseModalOpen])
    //  モーダルが開いたらアニメーション止める
    ////////////////////////////////////////////////


  return (
    <div className={`${hiddenClass} count-down-wrap top-0 absolute w-full h-full flex flex-col justify-center items-center`}>
        {remainingTotalSeconds <= 61
            ? ''
            :
            <div className="sales-start-time test flex flex-row items-end font-Noto font-black">
                <p className="whitespace-nowrap text-4xl">
                        {intl.formatDate(new Date(start).toString(),{month: 'numeric',day: 'numeric',hour:'numeric',minute:'2-digit'})}
                </p>
                <p className="whitespace-nowrap ml-2 text-xl">{intl.formatMessage({ id: 'will_be_released' })}</p>
            </div>
        }
    <div className="z-50 sales-start-count-down text-lg font-bold flex flex-row items-center font-Noto">
        {{
            
            'under100Hour': 
                <>
                    <p className="whitespace-nowrap font-black text-4xl">{Math.floor(remainingTotalSeconds/3600)}{intl.formatMessage({ id: 'hour' })}</p> 
                </>,
            'under1Hour': 
                <>
                    <p className="whitespace-nowrap font-black text-5xl w-full text-center">{minutes}{intl.formatMessage({ id: 'minutes' })}</p>
                </>,
            'under3Min': 
                <>
                    <p className="whitespace-nowrap count-down-minutes font-black text-4xl">
                        {minutes}{intl.formatMessage({ id: 'minutes' })}
                    </p>
                    <p className="whitespace-nowrap count-down-minutes font-black text-4xl">
                        {String(seconds).padStart(2, '0')}{intl.formatMessage({ id: 'seconds' })}
                    </p>
                </>,
            'under60Sec': 
                <>
                    <p className={`whitespace-nowrap count-down-seconds-${isSecondsOdd} font-black text-7xl`}>
                        {remainingTotalSeconds}
                    </p>
                    <p className="">
                        {/* {intl.formatMessage({ id: 'seconds' })} */}
                    </p>
                </>,
            'fireworks': <><p className="sales-fire font-black text-4xl"></p></>,
            'onlyDateTime': <><p className="sales-fire font-black text-4xl"></p></>,
            'else' : <></>,
        }[displayType]}
    </div>


    {remainingTotalSeconds <= 61
        ?
            <div className="flex-none absolute w-full h-full">
                <Firework/>
            </div>
        :
            ''}








        {/* <div className="z-50 sales-start-count-down text-lg font-bold flex flex-row items-center font-Noto">
            {remainingTotalSeconds>360000 ? "" : hour <= 0 && day <= 0 && minutes <= 0 && seconds4diplay < 0.9 ? '' : <p className="text-sm">{intl.formatMessage({ id: 'Opening_in' })}</p>} */}
            {
            /* if its over than 360000sec means 100 hour then do not time hour*/
            // remainingTotalSeconds>360000 ? "" :
            // remainingTotalSeconds > 3600 && remainingTotalSeconds < 360000
                /* if remSec 24 hours above and less than 100 hour */
                /* 0日ではない時 */
                // １日と２３時間が『１日』だとおかしいので時間で表現
                // ?   <p className="font-black text-5xl">{day}{intl.formatMessage({ id: 'day' })}</p> 
                // ?   <p className="font-black text-5xl">{Math.floor(remainingTotalSeconds/3600)}{intl.formatMessage({ id: 'hour' })}</p> 
                //      /* 0時間の時 */
                //     :   minutes >= 3
                //         /* 3分以上の時 */
                //         ?   <p className="font-black text-5xl">{minutes}{intl.formatMessage({ id: 'minutes' })}</p>
                //         /* 3分以内の時 */
                //         :   minutes > 0
                //             /* 0分ではない時 */
                //             ?   <><p className="count-down-minutes font-black text-5xl">{minutes}{intl.formatMessage({ id: 'minutes' })}</p><p className="count-down-minutes font-black text-5xl">{String(seconds).padStart(2, '0')}{intl.formatMessage({ id: 'seconds' })}</p></>
                //             /* 0分の時 */
                //             :   seconds4diplay < 1
                //                 /* 1秒より少ない時 */
                //                 ?<p className="sales-fire font-black text-5xl"></p>
                //                 /* 1秒以上の時 */
                //                 :  
                //                     /* ここは単純に時計のズレを直すための分岐 */
                //                     /* 55 */
                //                     <><p className={`count-down-seconds-${isSecondsOdd} font-black text-7xl`}>{seconds4diplay}</p><p className="">{intl.formatMessage({ id: 'seconds' })}</p></>
   
            }


            {/* {hour === 0 && day === 0 ? '' : <p className="">{hour}時間</p>}
            {hour === 0 && day === 0 && minutes === 0 ? <><p className="count-down-seconds font-black text-7xl">{seconds}</p><p className="">秒</p></>  : 
                minutes >= 3 ? <><p className="">{String(minutes).padStart(2, '0')}分</p><p className="">{String(seconds).padStart(2, '0')}秒</p></> : 
                <><p className="count-down-minutes font-black text-5xl">{minutes}分</p><p className="count-down-minutes font-black text-5xl">{String(seconds).padStart(2, '0')}秒</p></>} */}

        
        {/* </div> */}

    </div>
    );
};


