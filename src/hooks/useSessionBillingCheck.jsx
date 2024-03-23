import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import session from '../store/recoil/sessionState'
import useCsrfToken from './useCsrfToken'
import {pointState} from "../store/recoil/pointState";
import {userState} from "../store/recoil/userState";
import { modalState } from "../store/recoil/modalState";
import { browserTrackingState } from "../store/recoil/browserTrackingState";
import {useIntl} from 'react-intl'

import checkStartValue from '../functions/checkStartValue';
import { headersParam } from '../functions/commonFunctions';

const ENDPOINT =
    process.env.REACT_APP_ENV !== 'production'
        ? process.env.REACT_APP_CHECK_SESSION_LOCALHOST
        : process.env.REACT_APP_CHECK_SESSION_PRODUCTION;

export default function useSessionBillingCheck() {
    const [{ loading, error, state }, setValid] = useRecoilState(session)
    const { getCsrfToken } = useCsrfToken();
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [userStateValue, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [browserTrackingObj, setBrowserTrackingState] = useRecoilState(browserTrackingState);
    const key = sessionStorage.getItem('key');
    const intl = useIntl()
    const navigate = useNavigate();
    //  最後にソースを得た時間
    const appRendersDateTime = browserTrackingObj.appRendersDateTime;

    // console.log();
    const getSessionBillingCheck = (modalDataInfo={},eventOfFunction) => {
        //Do not call check-session api again if the prev call timing not excess the THRESHOLD value 5min in this case
        const {lastSessionCheckSuccessTimeUTC = 0} = userStateValue || {};
        const nextCallInVal = Math.floor(lastSessionCheckSuccessTimeUTC / 1000) + Number(process.env.REACT_APP_CHECK_SESSION_CALL_THRESHOLD);
        const now = Math.floor(new Date().getTime() / 1000);

        if(now <= nextCallInVal) return new Promise((resolve, reject) => resolve(true));

        // return true;
        return new Promise((resolve, reject) => {
        fetch(ENDPOINT, {
            body: JSON.stringify({ csrf: getCsrfToken(), key: key }),
            method: 'POST',
            headers: headersParam(),
            credentials: 'include',
            mode: 'cors',
        })
        .then((res) => res.json())
        .then(({ flag, userPointStart, userPointEnd, bf, cid, windowCommand={}, gachaToken  }) => {
            //  flag    セッション評価      true false
            //  bf      課金禁止フラグ      0:禁止中   1:禁止ではない
            //  cid     カントリーID       Number型
            //  windowCommand              メンテナンス系のサーバー指示　リロードかメンテページ遷移か
            console.log("[getSessionBillingCheck]flag", flag,bf,cid);
            //////////////////////////////////
            //  windowCommandによる動作
            //
            //  以下の例の形式のobject形式で返却してください
            //  flagの状態に関係なく（ログアウト中でも）windowCommandに従います
            // {
            //     reload : {
            //         //  この時間よりも古いソースであればリロードを要求
            //         //  最後のAPPデプロイ時間がベストである
            //         //  appRendersDateTimeが古ければリロードを行う
            //         //  appRendersDateTimeが新しければリロードを行わない
            //         unixTimeStamp : 1705253100, 
            //     },
            //     maintenance : {
            //         //  現在時間がこの時間を超えていたらメンテナンス画面を表示
            //         //  メンテナンスが必要のない時は最大値2,147,483,647を返却
            //         unixTimeStamp : 1705253100, 
            //     }
            // }
            //❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
            //❗️❗️❗️❗️❗️❗️❗️以下をコメントアウト解放してください❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
            if(windowCommand?.reload?.unixTimeStamp > Math.floor( appRendersDateTime / 1000 )){
                console.log("[getSessionCheck]windowCommand?.reload?.unixTimeStamp > appRendersDateTime", windowCommand?.reload?.unixTimeStamp,appRendersDateTime);
                //  最後にソースを得た時間より未来の時間にロードが必要な場合
                //  リロードを実行する
                window.location.reload();
            }else if( Math.floor( Date.now() / 1000 ) > windowCommand?.maintenance?.unixTimeStamp){
                console.log("[getSessionCheck]Date.now() > windowCommand?.maintenance?.unixTimeStamp",  Math.floor( Date.now() / 1000 ) ,windowCommand?.maintenance?.unixTimeStamp);
                //  現在時間がメンテナンス時間を超えていたらメンテナンスページに移動
                navigate("/maintenance");
            }else 
            //  後続の処理をさせないために　else if　で接続
            //❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
            //❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
            //  windowCommandによる動作
            //////////////////////////////////
            if (flag && bf) {//sessionCheck success
                if (cid !== 0) {
                    resolve(true);

                    setUserState((prevState) => ({
                        ...prevState,
                        lastSessionCheckSuccessTimeUTC: Date.now(),
                        gachaToken,
                    }))
                }
                else {
                    setPointState((prevState) => ({
                        ...prevState,
                        start: 0,
                        end: 0,
                        update: 0
                    }))
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'CountryofResidenceRegistration',
                        mode:"goToStripe",
                        // data : {}
                    }))
                    resolve(false);
                }
            }else if(bf === 0){
                //  課金禁止だった場合
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: "BillingLock"
                    // data : modalBody,
                }));
                resolve(false);
            }

            else {
/*
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    mode: "",
                    data: {title: "",body: intl.formatMessage({ id: 'account_cannnot_be_used_to_purchase' })}
                }))
                resolve(false);
*/
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: "Login"
                    // data : modalBody,
                }));
                resolve(false);
            }
        })
        .catch((err) => {
            sessionStorage.removeItem("token");
            console.log('Error => ,', err)
            setValid(prevState => ({
                ...prevState,
                loading: false,
                state: true,
                error: null,
            }));
            //setUser point to 0 and display login modal
            console.log("setPointState1 start = 0 end = 0");
            setPointState((prevState) => ({
                ...prevState,
                start: 0,
                end: 0,
                update: 0
            }))
            // ログインモーダルの起動
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: "Login"
                // data : modalBody,
            }));
            if(modalDataInfo && Object.keys(modalDataInfo).length>0 && modalDataInfo.hasOwnProperty('pattern')){
                setModalState((prevState) => ({
                    ...prevState,
                    mode:"pattern_"+modalDataInfo.pattern,//Here will be 3 types of pattern 1 for take single;2 for take multi;3 for take all
                }));
            }
            resolve(false);
        })
    })
    }//getSessionCheck

    return { getSessionBillingCheck };
}