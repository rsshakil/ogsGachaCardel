import React, { useRef, useState, useEffect, Suspense,useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import { useSearchParams, useParams, useLocation } from "react-router-dom";
import {pointState} from "../../../../store/recoil/pointState";
import { productListState } from "../../../../store/recoil/productListState";
import { userState } from "../../../../store/recoil/userState";
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';
import useCsrfToken from '../../../../hooks/useCsrfToken'
import session from '../../../../store/recoil/sessionState'
import checkStartValue from '../../../../functions/checkStartValue';
import { headersParam } from '../../../../functions/commonFunctions';
import useSessionCheck from '../../../../hooks/useSessionCheck'
import useSound from 'use-sound';
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";

export const ButtonWrapConfirm = () => {
    const intl = useIntl()
    const [{ loading, error, state }, setValid] = useRecoilState(session)
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    // console.log("[ButtonWrapConfirm]modalStateValue.data==>", modalStateValue.data);
    const gachaTranslateId = modalStateValue.data.gachaTranslateId;
    // console.log("[ButtonWrapConfirm]gachaTranslateId==>", gachaTranslateId);
    const location = useLocation();
    const [gachaId, setGachaId] = useState(0) ;
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [productListArraySingle, setProductListSingle] = useRecoilState(productListState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    //  今回のシナリオのUUID
    const uniqueId = uuidv4();

    /////////////////////////////////
    //  始動素材の定義
    const [startSingle, { stopHit1 }] = useSound('/sound/start-single.mp3',{ 
        id: 'startSingle',
        volume: 0.5,
        html5 : false,
    });
    const [startMultiple, { stopHit2 }] = useSound('/sound/start-multiple.mp3',{ 
        id: 'startMultiple',
        volume: 0.5,
        html5 : false,
    });
    //  始動素材の定義
    /////////////////////////////////

    /////////////////////////////////
    //  GachaIdの抽出
    useLayoutEffect(() => {
        if(location) {
            // console.log('location',location)
            let tmp = location && location?.pathname && location.pathname.slice(location.pathname.lastIndexOf("/") , location.pathname.length);
            // console.log("tmp",tmp)
            if(tmp) setGachaId(tmp);
        }
    }, [location])
    //  GachaIdの抽出
    /////////////////////////////////

    /////////////////////////////////
    //  モーダルdata初期化
    function closeModal(e) {
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "",
            data: {}
        }))
    }
    //  モーダルdata初期化
    /////////////////////////////////

    /////////////////////////////////
    //  動画を早めに読み込む為のプレロードの箱を取得
    const videoPreload = document.getElementById("video-preload");
    //  動画を早めに読み込む為のプレロードの箱を取得
    /////////////////////////////////

    /////////////////////////////////
    //  最新のページ情報
    const updateGachaPage = ()=>{
        // console.log("Sakil updateGachaPage staarted when error occured");
        (async () => {
            // 通信処理 商品詳細を取得
            try {
                let gachaId = location && location?.pathname && location.pathname.slice(location.pathname.lastIndexOf("/") , location.pathname.length);
                gachaId = gachaId.slice(1);
                // console.log("Sakil GachaID",gachaId);
                // console.log("@@@@@@@@@3", gachaId);
                const config = {
                    method: "get",
                    url: queries.baseURL + queries.readProduct + gachaId + "?l=" + UserStateObj.language
                }
                const result = await instance.request(config);
                // 商品詳細をrecoilにセットする
                const gachaIdKey = Object.keys(result?.data.response.gachaData)[0];
                // productListArraySingle[gachaIdKey] = result.data.response.gachaData[gachaIdKey];
                setProductListSingle({...productListArraySingle,[gachaIdKey]:result.data.response.gachaData[gachaIdKey]});
            } catch (err) {
                // console.log('app count up err---3', err)
            }
        })();
    }
    //  最新のページ情報
    /////////////////////////////////


    async function gacha(e) {
        let gachaIdOrginal = gachaId.slice(1);//"/101" to 101
        //  API通信のためにくるくるを開始
        // console.log("[ButtonWrapConfirm]modalStateValue.data==>", modalStateValue.data);
        // loader start
        let modalDataInfo = modalStateValue.data;
        ////////////////////////////////////////////
        //  シングルorマルチで始動音切り替え
        if(modalDataInfo?.takeNumber > 1){
            console.log("[ButtonWrapConfirm]modalDataInfo?.takeNumber > 1==>", modalDataInfo?.takeNumber);
            startMultiple()
        }else{
            console.log("[ButtonWrapConfirm]modalDataInfo?.takeNumber else ==>", modalDataInfo?.takeNumber);
            startSingle()
        }
        //  シングルorマルチで始動音切り替え
        ////////////////////////////////////////////

        // console.log("modalDataInfo",modalDataInfo);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            // modalType: 'gachaLoading',
            modalType: 'gacha',
            mode: "edit",
            data: {},    //  ここで初期化を行わないと通信に失敗すると前回の当選を引きずる
        }));

        let response;
        // check-sessionに問題なし
        const checkResponse = await getSessionCheck(modalDataInfo, true);
        
        let gachaToken = UserStateObj.gachaToken;
        let isSuccess = checkResponse;

        if(_.isObject(checkResponse)) {
            gachaToken = checkResponse.gachaToken;
            isSuccess = checkResponse.success;
        }

        if (isSuccess) {
            const gachaUrl = queries.baseURL + queries.executeProduct + gachaIdOrginal;
             
            try{
                const config = {
                    method: queries.postMethod,
                    url: gachaUrl,
                    data: {...modalStateValue.data, gachaToken}
                }
                response = await instance.request(config);
            }catch(err){
                if(err){
                    const { errorCode } = err.response?.data || '';
                    await apiResponseStatusCodeProcess(errorCode,modalDataInfo);
                }
                // 失敗しても商品情報を更新する
                updateGachaPage();
            }
            console.log("[ButtonWrapConfirm]response==>", response);
            if(response){
                const { status } = response || '';
                if (status == 200) {
                    // console.log('@@@@@@ xxxx1');
                    //setPointFromApi
                    const { 
                        startPoint, 
                        endPoint, 
                        videoUrl, 
                        prizes, 
                        prizeRarity, 
                        packName, 
                        count, 
                        point, 
                        videoKey, 
                        videoH265Path, 
                        videoMp4Path, 
                        videoWebmPath
                    } = response.data || '';
                    // console.log('startPoint',startPoint);
                    // console.log("setPointState4 start = " + checkStartValue(startPoint, endPoint, pointStateValue) + " end = " + endPoint);
                    if (startPoint && startPoint >= 1) {
                        setPointState((prevState) => ({
                            ...prevState,
                            start: checkStartValue(startPoint, endPoint, pointStateValue)
                        }))
                    }
                    // console.log('@@@@@@ xxxx2');
                    // console.log('endPoint',endPoint);
                    if (endPoint && endPoint >= 1) {
                        setPointState((prevState) => ({
                            ...prevState,
                            end: endPoint
                        }))
                    }
                    let prizesLength = prizes.length
                    console.log("[ButtonWrapConfirm]prizesLength==>", prizesLength);
                    //  同じ動画の連続再生とならないようにパラメーター付与
                    let videoUrlNew = videoH265Path + videoKey + '.mp4?uuid=' + uniqueId;
                    videoPreload.href = videoUrlNew;
                    // console.log('@@@@@@ videoUrl', videoUrlNew);
                    //  動画の準備を始めるためにクルクルしながらロードさせる
                    //setTimeOut added according to tomiye sans instruction==>move2 gacha.jsx
                    // setTimeout(()=>{
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'gacha',
                        mode: "edit",
                        data: {
                            'videoUrl': videoUrlNew,
                            'videoId': videoKey,
                            'videoPathH264': videoMp4Path,
                            'videoPathH265': videoH265Path,
                            'videoPathWebm': videoWebmPath,
                            'prizes': {...prizes},
                            'prizeRarity':prizeRarity,
                            'packName': packName,
                            'count': count,
                            'point': point,
                            'uuid' : uniqueId,
                            'prizesLength' : prizesLength,
                        }
                    }));
                    // },1000)
                } else {
                    // console.log('invalid formData');
                    // ガチャに失敗した。エラーコードがあった場合の処理
                    await apiResponseStatusCodeProcess(status,modalDataInfo);
                }
            }
        }
    }


    //DecessionMaking base on error code
    const apiResponseStatusCodeProcess = async (errorCode,modalDataInfo) =>{
        // console.log('errorCode',errorCode)
        let displayModalType = '';
        let mMode="";
        let modalBody = {message:''};
        // errorCode = "";//need to be confirm for 102
        // console.log('@@@@@@errorCode',errorCode);
        switch (errorCode) {
            case 101: // ログインしていない
            case 103: // JWTが解析できない
                displayModalType = 'Login';
                mMode="pattern_"+modalDataInfo.pattern;//Here will be 3 types of pattern 1 for take single;2 for take multi;3 for take all
                break;
            case 104: // 国が選択されていない
                displayModalType = 'CountryofResidenceRegistration';
                mMode="pattern_"+modalDataInfo.pattern;//Here will be 3 types of pattern 1 for take single;2 for take multi;3 for take all
                break;
            case 102: // パラメーターが不正
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 201: // ポイントが足りない
                displayModalType = 'charge';//displayPoint docharge
                mMode="pattern_"+modalDataInfo.pattern;//Here will be 3 types of pattern 1 for take single;2 for take multi;3 for take all
                break;
            case 202: // ロックされている
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 203: // 枚数が足りない
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 204: // SQS発行エラー
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 205: // 無効なガチャが対象
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 206: // ガチャが表示エラー対象
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 207: // ガチャが期限内ではない
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 208: // 残り全部の枚数不正
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 301: // ガチャが１人１日上限数に引っかかっている
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 302: // ガチャが全員１日上限数に引っかかっている
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 303: // ガチャが１人上限数に引っかかっている
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 304: // ガチャが１人上限数に引っかかっている
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 305: // ガチャが１人上限数に引っかかっている
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            case 306: // ガチャが１人上限数に引っかかっている
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_'+errorCode })};
                break;
            default: // それ以外のエラー　発生した場合は要注意
                displayModalType = 'error';
                modalBody = {title:'',body:intl.formatMessage({ id: 'gacha_action_error_code_null' })};
                break;
        }
        // console.log('@@@@@@displayModalType',displayModalType);
        // console.log('@@@@@@modalBody',modalBody);
        if(displayModalType){
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: displayModalType,
                data : modalBody,
            }))
            if(mMode){
                setModalState((prevState) => ({
                    ...prevState,
                    mode:mMode,
                })) 
            }
        }
        
    }



    return (
    <>
        <div 
            className="button-half-left flex flex-row justify-center items-center touch-none select-none"
            onClick={(e) => gacha()}
        >
            <p className="pointer-events-none text-base font-bold font-Roboto">
                {intl.formatMessage({ id: 'confirm' })}
            </p>
        </div>
        <div 
            className="button-half-right button-white flex flex-row justify-center items-center touch-none select-none"
            onClick={(e) => closeModal()}
        >
            <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text-close">
                {intl.formatMessage({ id: 'cancel' })}
            </p>
        </div>
    </>
)

}