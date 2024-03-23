import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import session from '../store/recoil/sessionState'
import useCsrfToken from './useCsrfToken'
import {pointState} from "../store/recoil/pointState";
import {userState} from "../store/recoil/userState";
import { modalState } from "../store/recoil/modalState";
import { browserTrackingState } from "../store/recoil/browserTrackingState";
import checkStartValue from '../functions/checkStartValue';
import { headersParam } from '../functions/commonFunctions';
import {useIntl} from 'react-intl'


const ENDPOINT =
    process.env.REACT_APP_ENV !== 'production'
        ? process.env.REACT_APP_CHECK_SESSION_LOCALHOST
        : process.env.REACT_APP_CHECK_SESSION_PRODUCTION;

export default function useSessionCheck() {
    const intl = useIntl();
    const navigate = useNavigate();
    const [{ loading, error, state }, setValid] = useRecoilState(session)
    const { getCsrfToken } = useCsrfToken();
    ////////////////////////////////////
    //  recoil
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const resetPointState = useResetRecoilState(pointState)
    const [userStateValue, setUserState] = useRecoilState(userState);
    const resetUserState = useResetRecoilState(userState)
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [browserTrackingObj, setBrowserTrackingState] = useRecoilState(browserTrackingState);
    //  recoil
    ////////////////////////////////////

    const key = sessionStorage.getItem('key');
    //  最後にソースを得た時間
    const appRendersDateTime = browserTrackingObj.appRendersDateTime;

    // console.log();
    //  lastSessionCheckSuccessTimeUTCからの経過時間でチェック頻度を調整できる
    const getSessionCheck = (modalDataInfo={}, fromGachaExecute = false) => {
        console.log("[getSessionCheck]");

        //Do not call check-session api again if the prev call timing not excess the THRESHOLD value 5min in this case
        const {lastSessionCheckSuccessTimeUTC = 0} = userStateValue || {};
        const nextCallInVal = Math.floor(lastSessionCheckSuccessTimeUTC / 1000) + Number(process.env.REACT_APP_CHECK_SESSION_CALL_THRESHOLD);
        const now = Math.floor(new Date().getTime() / 1000);

        if(now <= nextCallInVal) return new Promise((resolve, reject) => resolve(true));

        return new Promise((resolve, reject) => {
        fetch(ENDPOINT, {
            body: JSON.stringify({ csrf: getCsrfToken(), key: key }),
            method: 'POST',
            headers: headersParam(),
            credentials: 'include',
            mode: 'cors',
        })
        .then(async (res) => {
            return {
                apiResponse:await res.json(),
                statusCode:res.status
            }
        })
        .then((apiRes) => {
            console.log("statusCode apiRes",apiRes);
            const { flag, userPointStart, userPointEnd, message="", windowCommand={}, gachaToken } = apiRes?.apiResponse || {};
            const {statusCode=200} = apiRes || {};
            console.log("[getSessionCheck]windowCommand", flag,windowCommand,message);
            //  flag    セッション評価      true false
            //  bf      課金禁止フラグ      0:禁止中   1:禁止ではない
            //  cid     カントリーID       Number型
            //  windowCommand              メンテナンス系のサーバー指示　リロードかメンテページ遷移か

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


            if (flag) {
                //  セッション最終成功時間の更新
                setUserState((prevState) => ({
                    ...prevState,
                    lastSessionCheckSuccessTimeUTC: Date.now(),
                    gachaToken,
                }))

                //sessionCheck success
                if (fromGachaExecute === true) resolve({success: true, gachaToken}); //As state update is asynchronous operation so if data take from state then posibility to get prev data so need to pass
                else resolve(true);
            }else if(statusCode===504 && message === "Endpoint request timed out"){//504 handled
                //collusion occurred throw exception to catch it
                const error = new Error(message);
                error.response = {status:504}
                throw error;
            }else if(statusCode===400 && apiRes?.apiResponse){//400 handled
                //collusion occurred throw exception to catch it
                console.log("statusCode from 400 its a json response for 400 error");
                const error = new Error("json response");
                error.response = {status:400,isJson:true}
                throw error;
            } else {
                console.log("statusCode succ>>","successhappen");
                //  正常にセッションチェックが行えログアウトと判定されたとき
                console.log("modalDataInfo",modalDataInfo);
                // setUserState((prevState) => ({
                //     ...prevState,
                //     isLogin: false
                // }))
                //  前ユーザの痕跡を全て消す
                resetUserState()
                sessionStorage.removeItem("token");
                //setUser point to 0 and display login modal
                console.log("setPointState1 start = 0 end = 0");
                resetPointState()
                // ログインモーダルの起動
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: "Login",
                    // data : modalBody,
                }));
                
                if(modalDataInfo instanceof Function){
                    console.log("modalDataInfo its a call back function");
                    setModalState((prevState) => ({
                        ...prevState,
                        mode:"callFromFunction",
                        callBackFunction:(eventOfFunction)=>modalDataInfo(eventOfFunction),
                    }));
                }else if(modalDataInfo && typeof modalDataInfo === 'object' && Object.keys(modalDataInfo).length>0 && modalDataInfo.hasOwnProperty('pattern')){
                    setModalState((prevState) => ({
                        ...prevState,
                        mode:"pattern_"+modalDataInfo.pattern,//Here will be 3 types of pattern 1 for take single;2 for take multi;3 for take all
                    }));
                }else if(modalDataInfo && typeof modalDataInfo === 'object' && Object.keys(modalDataInfo).length>0 && modalDataInfo.hasOwnProperty('displayModal')){
                    setModalState((prevState) => ({
                        ...prevState,
                        mode:"displayModal",
                        modalProperty:{
                            modalType:modalDataInfo.modalType,
                            mode:modalDataInfo.mode,
                            data:modalDataInfo.data
                        }
                    }));
                }
                resolve(false);
            }
        })
        .catch((err) => {
            //  正常にセッションチェックが行えなかったとき
            //  ネットワークエラー等にしてログイン維持でいいのではないか
            //  lastSessionCheckSuccessTimeUTCからの経過時間で問答無用にログアウト
            // setUserState((prevState) => ({
            //     ...prevState,
            //     isLogin: false
            // }))
            //  前ユーザの痕跡を全て消す
            let isBussyError = false;
            const { data = {}, status = 400,isJson=false } = err.response || '';
            const { errorCode = '' } = data || '';

            let statusCode = errorCode ? errorCode : status;
            console.log("statusCode from catch block",statusCode);
            console.log("statusCode from data block",data);
            //checking is 504 error
            if(statusCode===504 && err.message=="Endpoint request timed out"){
                console.log("statusCode from 504 block");
                isBussyError = true;
            }

            //checking is 504 error
            if(statusCode===400 && !isJson){
                console.log("statusCode from 400 its not a json response for 400 error");
                isBussyError = true;
            }

            if(isBussyError){
                //collusion occurred display currently bussy modal
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    mode: "",
                    data: {title: "",body: intl.formatMessage({ id: 'currently_busy' })}
                }))
            }else{
                //sessionExpiredLogout the user
                resetUserState()
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
                // setPointState((prevState) => ({
                //     ...prevState,
                //     start: 0,
                //     end: 0,
                //     update: 0
                // }))
                //  ポイント初期化
                resetPointState()
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
            }
            resolve(false);
        })
    })
    }//getSessionCheck

    return { getSessionCheck };
}