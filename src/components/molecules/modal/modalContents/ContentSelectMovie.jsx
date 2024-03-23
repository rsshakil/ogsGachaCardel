import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import '../../../../css/item.css';
import { BaseCard } from "../../../atoms/cards/BaseCard";
// import { BaseCard } from "../../../atoms/cards/BaseCard";
import {useIntl,FormattedDate} from 'react-intl'
import {pointState} from "../../../../store/recoil/pointState";
import {playScenarioState} from "../../../../store/recoil/playScenarioState";
import { productListState } from "../../../../store/recoil/productListState";
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';

export const ContentSelectMovie = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [playScenarioObj, setPlayScenarioState] = useRecoilState(playScenarioState);
    // console.log("[ContentSelectMovie]UserStateObj==>", UserStateObj);
    // console.log("[ContentSelectMovie]modalStateValue==>", modalStateValue);

    ////////////////////////////////
    //  classの定義

    let pointExchangeStyleFront = 'text-left text-base leading-4 font-black font-Roboto';
    let pointExchangeStyleBack = 'text-left text-base leading-4 font-black font-Roboto';
    let pointUnitStyleFront = 'hidden';
    let pointUnitStyleBack = 'hidden';
    let moviePath;
    let currentEnv;
    let currentS3Path;
    //  アイテムがない時のエラー処理作ること
    //
    ////////////////////////////////

    //  現在の環境のS3パス

    currentEnv = UserStateObj.UserStateObj;
    if(currentEnv === 'develop'){
        currentS3Path = 'https://productvideo-ogs-develop.s3.ap-northeast-1.amazonaws.com/';
    }else if(currentEnv === 'staging'){
        currentS3Path = 'https://productvideo-ogs-staging.s3.ap-northeast-1.amazonaws.com/';
    }else if(currentEnv === 'mirror'){
        currentS3Path = 'https://productvideo-ogs-cardel.s3.ap-northeast-1.amazonaws.com/';
    }else if(currentEnv === 'cardel'){
        currentS3Path = 'https://productvideo-ogs-cardel.s3.ap-northeast-1.amazonaws.com/';
    }else{
        //  develop
        currentS3Path = 'https://productvideo-ogs-develop.s3.ap-northeast-1.amazonaws.com/';
    }
  
    //  
    let selectKey;
    function itemSelected(e) {
        // console.log("[ContentConfirmShippingAddress]選択したアイテム==>", e);
        // console.log("[ContentConfirmShippingAddress]UserStateObj.myCollection==>", UserStateObj.myShippingAddress);
        // console.log("[ContentConfirmShippingAddress]選択した位置の裏表==>", UserStateObj.myShippingAddress[e.key].isItemSelected);
        selectKey = e.key
        //  modalStateValue.mode === 'select'の時だけクリックイベント動作
        if(modalStateValue.mode === 'select'){
            // console.log("[ContentConfirmShippingAddress]modalStateValue.mode==>", modalStateValue.mode);
            //  クリックしたitmemをtrue それ以外をfalseに変更
            Object.keys(playScenarioObj.movie).map(movieID => {
                if(movieID === selectKey){
                    // console.log("[ContentConfirmShippingAddress]IF:shippingUUIDy==>", shippingUUID,"selectKey==>",selectKey);
                    //  クリックしたitemの選択状態を反転させる
                    setPlayScenarioState((prevState) => ({
                        ...prevState,
                            'movie': {
                                ...prevState.movie,
                                [e.key]: {
                                    ...prevState.movie[e.key],
                                    'isMovieSelected' : !prevState.movie[e.key].isMovieSelected
                                },
                            }
                    }))
                }else{
                    // console.log("[ContentConfirmShippingAddress]ELSE:shippingUUIDy==>", shippingUUID,"selectKey==>",selectKey);
                    //  クリックしていないitemの選択状態を非選択にする
                    setPlayScenarioState((prevState) => ({
                        ...prevState,
                            'movie': {
                                ...prevState.movie,
                                [movieID]: {
                                    ...prevState.movie[movieID],
                                    'isMovieSelected' : false
                                },
                            }
                    }))
                }
            })
        }
    }


    //  選択したアイテムのフラグClass
    let isSlected = '';
    //  発送制限の文言
    let unable2ShipRibbonText = ''
    //  onClickの動作
    // const [useOnClick, setUseOnClick] = useState(false);


    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center h-fit">
            {Object.keys(playScenarioObj.movie).map(key => {
                // console.log("[ContentSelectMovie]key==>", key);
                // console.log("[ContentSelectMovie]playScenarioState.movie[key]==>", playScenarioState.movie[key]);
                //  ポイント０や文字量を考慮
                // if(playScenarioState.movie[key].itemPoint === 0) {
                // }else if (playScenarioState.movie[key].itemPoint > 999999){
                //     pointExchangeStyleFront = 'text-left text-xl font-black font-Roboto';
                //     pointExchangeStyleBack = 'text-left text-xl font-black font-Roboto';

                //     pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
                //     pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
                // }else if (playScenarioState.movie[key].itemPoint > 99999){
                //     pointExchangeStyleFront = 'text-left text-2xl sm:text-2xl font-black font-Roboto';
                //     pointExchangeStyleBack = 'text-left text-2xl sm:text-2xl font-black font-Roboto';

                //     pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
                //     pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
                // }else if (playScenarioState.movie[key].itemPoint > 9999){
                //     pointExchangeStyleFront = 'text-left text-3xl sm:text-3xl font-black font-Roboto';
                //     pointExchangeStyleBack = 'text-left text-3xl sm:text-3xl font-black font-Roboto';

                //     pointUnitStyleFront = 'align-bottom font-Roboto pt-2 sm:pt-1';
                //     pointUnitStyleBack = 'align-bottom font-Roboto pt-2 sm:pt-1';
                // }else if (playScenarioState.movie[key].itemPoint > 999){
                //     pointExchangeStyleFront = 'text-left text-4xl sm:text-3xl font-black font-Roboto';
                //     pointExchangeStyleBack = 'text-left text-4xl sm:text-3xl font-black font-Roboto';

                //     pointUnitStyleFront = 'align-bottom font-Roboto pt-2 sm:pt-1';
                //     pointUnitStyleBack = 'align-bottom font-Roboto pt-2 sm:pt-1';
                // }else {
                //     pointExchangeStyleFront = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
                //     pointExchangeStyleBack = 'text-left text-5xl sm:text-3xl font-black font-Roboto';

                //     pointUnitStyleFront = 'align-bottom font-Roboto pt-3 sm:pt-1';
                //     pointUnitStyleBack = 'align-bottom font-Roboto pt-3 sm:pt-1';
                // }

                //  選択済みかどうか
                if(playScenarioObj.movie[key].isMovieSelected === true) {
                    isSlected = 'isSlected'
                }else{
                    isSlected = ''
                }
                // console.log("[ContentSelectMovie]isSlected==>", isSlected);

                //  動画URLの組み立て
                moviePath = currentS3Path + playScenarioObj.movie[key].movieID + '.mp4';

                //  発送制限あるかどうか

                // if(playScenarioState.movie[key].itemShippingFlag === true) {
                //     unable2ShipRibbonText  = intl.formatMessage({ id: 'Unable_to_ship' });
                // }else{
                //     unable2ShipRibbonText  = '';
                // }
                // console.log("[ContentSelectMovie]unable2ShipRibbonText==>", unable2ShipRibbonText);

                return (
                
                <div
                    key={`SelectMovie-${key}`} 
                    id={key}
                    className=""
                    onClick={(e) => itemSelected({"key":key})}
                >
                    <BaseCard
                        key={key}
                        data={{
                            key : key,
                            type : 'selectMovie',
                            emissionUUID : playScenarioObj.movie[key].movieID,
                            //  選択済みかどうか
                            isSlected : isSlected,
                            //  動画のパス
                            moviePath : moviePath,
                            //  動画の名前
                            movieName : playScenarioObj.movie[key].movieName,
                            //  動画の停止位置
                            stopPosition : playScenarioObj.movie[key].stopPosition,
                            //  画像のパス
                            itemImagePath1 : '',
                            itemImagePath2 : '',
                            itemImagePath3 : '',

                            itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                            itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-2',
                            itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-2',
                            itemFigureAlt : '',

                            rightSideBottomStyleFront : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',
                            rightSideBottomStyleBack : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',

                            //  pointExchange
                            pointExchangeText : playScenarioObj.movie[key].movieName, //.toLocaleString()
                            pointExchangeStyleFront : pointExchangeStyleFront,
                            pointExchangeStyleBack : pointExchangeStyleBack,
                            pointUnitStyleFront : pointUnitStyleFront,
                            pointUnitStyleBack : pointUnitStyleBack,
                            //  Rarity
                            raritytext : playScenarioObj.movie[key].movieID,
                            rarityStyleFront : 'rarity  text-right text-4xl sm:text-3xl font-black font-Roboto',
                            rarityStyleBack : 'rarity  text-right text-4xl sm:text-3xl font-black font-Roboto',
                            //  appraisalRank
                            appraisalRankText : '',
                            appraisalRankStyleFront : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
                            appraisalRankStyleBack : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
                            //  itemName
                            itemNameText : playScenarioObj.movie[key].movieDescription,
                            itemNameStyleFront : 'itemAttribute-shadow text-xs font-Noto leading-3 tracking-tight',
                            itemNameStyleBack  : 'itemAttribute-shadow text-xs font-Noto leading-3 tracking-tight',
                            itemAttributeWrapStyleFront : 'hidden',
                            itemAttributeWrapStyleBack : 'hidden',
                            //  Shipping request deadline
                            shippingRequestDeadlineText : '',
                            shippingRequestDeadlineStyleBack : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                            //  ribbon
                            ribbonStyleFront : 'ribbon font-Roboto',
                            ribbonStyleBack : 'ribbon ribbon-green font-Roboto',
                            ribbonTextFront : '',
                            ribbonTextBack : '',
                            //  bottomRibbon　裏表同じものでOK
                            bottomRibbonStyleFront : 'bottom-ribbon font-Roboto',
                            bottomRibbonStyleBack : 'bottom-ribbon font-Roboto',
                            bottomRibbonTextFront : unable2ShipRibbonText,
                            bottomRibbonTextBack : unable2ShipRibbonText,

                            expansionSeriesText : '',
                            serial : '',
                        }}
                    />
                </div>
                );
            })}
        </div>
    )
}