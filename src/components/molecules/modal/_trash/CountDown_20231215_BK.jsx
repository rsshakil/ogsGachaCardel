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


let seconds4diplay = '';
export const CountDown = (props) => {
    const intl = useIntl()
    const location = useLocation();
    const navigate = useNavigate();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [productListArray, setProductList] = useRecoilState(productListState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    //  モーダルopenで隠す
    const [hiddenClass, setHiddenClass] = useState('');

    const {
        day,
        hour,
        minutes,
        seconds,
        start,
        remainingTotalSeconds
    } = props.data;
    // console.log("[CountDown]start=======>",start);
    // console.log("[CountDown]new Date(start)=======>",new Date(start));

    ////////////////////////////////////////////////
    //  現在の秒が偶数か奇数かでCSS切り替える
    //  現在の残秒が60以下ならフラグ倒す
    const [isSecondsOdd, setIsSecondsOdd] = useState(false);
    const [isUnder60Sec, setIsUnder60Sec] = useState(false);
    let displayType = ''
    useEffect(() => {
        ////////////////////////////////
        //    60秒未満の場合独自の時計に切り替える
        if(remainingTotalSeconds <= 60){
        console.log("[CountDown]60秒未満=======>",remainingTotalSeconds);
        if(!isUnder60Sec){setIsUnder60Sec(true)}
        }else{
        if(isUnder60Sec){setIsUnder60Sec(false)}
        console.log("[CountDown]60秒else=======>",remainingTotalSeconds);
        }
        //    60秒未満の場合独自の時計に切り替える
        ////////////////////////////////

        ////////////////////////////////
        //    表示タイプの決定
        if(remainingTotalSeconds === 0){
        //  表示なしの花火だけ
        displayType = 'fireworks'
        }else if(remainingTotalSeconds <= 60){
        //  60秒前カウントダウン
        displayType = 'under60Sec'
        }else if(remainingTotalSeconds <= 180){
        //  ３分切ったとき
        //  分：秒前
        displayType = 'under3Min'
        }else if(remainingTotalSeconds <= 3600){
        //  １時間切った時
        //  分前
        displayType = 'under1Hour'
        }else if(remainingTotalSeconds <= 6000){
        //  １00時間切った時（99時間？？分）
        displayType = 'under100Hour'
        }else{
        //  カウントダウンの表示はしない
        displayType = 'onlyDateTime'
        }
        //    表示タイプの決定
        ////////////////////////////////



    }, [remainingTotalSeconds])
    //  現在の秒が偶数か奇数かでCSS切り替える
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    //  isUnder60Secがtrueなら独自の時計開始
    
    useEffect(() => {
        if(isUnder60Sec){
            console.log("[CountDown]isUnder60Sec=======>",isUnder60Sec,remainingTotalSeconds);
            let localSec = 59;
            const copy = () => {
                return new Promise((resolve) => {//・・・・・・・・・・・・①
                    const localSecid = setInterval(() => {
                        seconds4diplay = localSec;
                        console.log(`[CountDown]⏰カウントダウン中:${localSec}`);
                        
                        if (localSec === 1) {
                            clearInterval(localSecid);
                            resolve(localSec);//・・・・・・・・・・・・・・・・・・・・・・・・・・②
                        }
                        localSec --;
                    }, 1000);
                });
            };
            seconds4diplay = '';
            console.log('[CountDown]⏰カウントダウン開始');

            copy().then((localSec) => {//・・・・・・・・・・・・・・・・・・・・・・・・・③
              console.log(`[CountDown]⏰カウントダウン完了:${localSec}`);
            });
            
        }else{
            console.log("[CountDown]isUnder60Sec=======>",isUnder60Sec,remainingTotalSeconds);
            seconds4diplay = remainingTotalSeconds
        }
        if( seconds4diplay % 2 === 0 ) {
            // 偶数の場合の処理
            setIsSecondsOdd(true)
          }else{
            setIsSecondsOdd(false)
          }

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

    // console.log("CountDown¥¥¥¥¥¥ >>>day",day)
    // console.log("CountDown¥¥¥¥¥¥ >>>hour",hour)
    // console.log("CountDown¥¥¥¥¥¥ >>>minutes",minutes)
    // console.log("CountDown¥¥¥¥¥¥ >>>seconds",seconds)
    // console.log("CountDown¥¥¥¥¥¥ >>>start",start)
    // console.log("CountDown¥¥¥¥¥¥ >>>remainingTotalSeconds",remainingTotalSeconds)

  return (
    <div className={`${hiddenClass} count-down-wrap top-0 absolute w-full h-full flex flex-col justify-center items-center`}>
        {hour <= 0 && day <= 0 && minutes <= 0 
            ? ''
            :
            <div className="sales-start-time test flex flex-row items-end font-Noto font-black">
            {/* <div className="sales-start-time test flex flex-row items-end font-Dela-Gothic-One font-black"> */}
                <p className="text-5xl">
                        {intl.formatDate(new Date(start).toString(),{month: 'numeric',day: 'numeric',hour:'numeric',minute:'2-digit'})}
                </p>
                <p className="ml-2 text-xl">{intl.formatMessage({ id: 'will_be_released' })}</p>
            </div>
        }
        <div className="z-50 sales-start-count-down text-lg font-bold flex flex-row items-center font-Noto">
            {remainingTotalSeconds>360000 ? "" : hour <= 0 && day <= 0 && minutes <= 0 && seconds4diplay < 0.9 ? '' : <p className="text-sm">{intl.formatMessage({ id: 'Opening_in' })}</p>}
            {
            /* if its over than 360000sec means 100 hour then do not time hour*/
            remainingTotalSeconds>360000 ? "" :
            remainingTotalSeconds > 3600 && remainingTotalSeconds < 360000
                /* if remSec 24 hours above and less than 100 hour */
                /* 0日ではない時 */
                // １日と２３時間が『１日』だとおかしいので時間で表現
                // ?   <p className="font-black text-5xl">{day}{intl.formatMessage({ id: 'day' })}</p> 
                ?   <p className="font-black text-5xl">{Math.floor(remainingTotalSeconds/3600)}{intl.formatMessage({ id: 'hour' })}</p> 
                     /* 0時間の時 */
                    :   minutes >= 3
                        /* 3分以上の時 */
                        ?   <p className="font-black text-5xl">{minutes}{intl.formatMessage({ id: 'minutes' })}</p>
                        /* 3分以内の時 */
                        :   minutes > 0
                            /* 0分ではない時 */
                            ?   <><p className="count-down-minutes font-black text-5xl">{minutes}{intl.formatMessage({ id: 'minutes' })}</p><p className="count-down-minutes font-black text-5xl">{String(seconds).padStart(2, '0')}{intl.formatMessage({ id: 'seconds' })}</p></>
                            /* 0分の時 */
                            :   seconds4diplay < 1
                                /* 1秒より少ない時 */
                                ?<p className="sales-fire font-black text-5xl"></p>
                                /* 1秒以上の時 */
                                :  
                                    /* ここは単純に時計のズレを直すための分岐 */
                                    /* 55 */
                                    <><p className={`count-down-seconds-${isSecondsOdd} font-black text-7xl`}>{seconds4diplay}</p><p className="">{intl.formatMessage({ id: 'seconds' })}</p></>
   
            }


            {/* {hour === 0 && day === 0 ? '' : <p className="">{hour}時間</p>}
            {hour === 0 && day === 0 && minutes === 0 ? <><p className="count-down-seconds font-black text-7xl">{seconds}</p><p className="">秒</p></>  : 
                minutes >= 3 ? <><p className="">{String(minutes).padStart(2, '0')}分</p><p className="">{String(seconds).padStart(2, '0')}秒</p></> : 
                <><p className="count-down-minutes font-black text-5xl">{minutes}分</p><p className="count-down-minutes font-black text-5xl">{String(seconds).padStart(2, '0')}秒</p></>} */}

        
        </div>
        {remainingTotalSeconds <= 60 ?
            <div className="flex-none absolute w-full h-full">
                <Firework/>
            </div>:
            ''}
    </div>
    );
};


