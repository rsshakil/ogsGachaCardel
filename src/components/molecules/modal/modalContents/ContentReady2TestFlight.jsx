import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import { playScenarioState } from "../../../../store/recoil/playScenarioState";
import '../../../../css/item.css';

import {useIntl,FormattedDate} from 'react-intl'
import { AddressCard } from "../../../atoms/cards/AddressCard";
import { GiftCard } from "../../../atoms/cards/GiftCard";
import { GimmickCard } from "../../../atoms/cards/GimmickCard";
import { Cardel } from "../../../atoms/Scenarios/Fishs/Cardel";


export const ContentReady2TestFlight = () => {
    // const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [playScenarioObj, setPlayScenarioState] = useRecoilState(playScenarioState);
    // console.log("[ContentReady2TestFlight]UserStateObj==>", UserStateObj);
    // console.log("[ContentReady2TestFlight]modalStateValue==>", modalStateValue);

    ////////////////////////////////
    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentReady2TestFlight]languageResource==>", languageResource);

 
    //  選択したアイテムのフラグClass
    let isSlected = '';
    let movieID;
    let movieName;
    let moviePath;
    let currentEnv;
    let currentS3Path;

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

    return (
        <div className="w-full grid grid-cols-1 gap-2 sm:gap-4 justify-center items-center h-fit">
            
            {Object.keys(playScenarioObj.movie).map(key => {
                    if(playScenarioObj.movie[key].isMovieSelected === true) {
                        movieID = playScenarioObj.movie[key].movieID;
                        movieName = playScenarioObj.movie[key].movieName;
                        moviePath = currentS3Path + playScenarioObj.movie[key].movieID + '.mp4';
                    }else{

                    }
            })}
            {Object.keys(playScenarioObj.gimmick).map(key => {
                // console.log("[ContentReady2TestFlight]key==>", key);
                // console.log("[ContentReady2TestFlight]UserStateObj.myCollection[key]==>", playScenarioObj.gimmick[key]);
                //  ナンバリング
                // shippingAddressIndex = shippingAddressIndex + 1;

                if(key === 'config'){
                    //  configだったらカードに変換しない
                }else{
                    //  configでないのであればカードにする
                    //  gimmick選択済みかどうか
                    if(playScenarioObj.gimmick[key].isGimmickSelected === true) {
                        isSlected = 'isSlected'
                    }else{
                        isSlected = ''
                    }
                    // console.log("[ContentReady2TestFlight]isSlected==>", isSlected);

                    return (
                    isSlected  === 'isSlected'
                    ?
                    <div
                        key={`${key}-GimmickCardWrap`}
                        id={key}
                        className=""
                        // onClick={(e) => itemSelected({"key":key})}
                    >
                        <GimmickCard
                            key={`${key}-GimmickCard`}
                            data={{
                                key : key,
                                type : 'SelectGimmick',
                                userShippingId : playScenarioObj.gimmick[key].gimmickID,
                                //  選択済みかどうか
                                isSlected : isSlected,
                                itemOuterAreaStyle : 'itemOuter relative  w-full',
                                itemWrapStyleFront : 'itemWrap  rounded cursor-pointer text-white flex flex-col p-2',
                                itemWrapStyleBack : 'w-full itemWrapBack  rounded cursor-pointer text-white flex flex-col p-2',
                                //  header
                                headerWrapStyleFront : 'border-b pb-1 flex flex-row justify-between h-8',
                                headerWrapStyleBack : 'border-b pb-1 flex flex-row justify-between h-8',
                                addressOrderStyleFront : 'rarity text-black text-right text-xl font-black font-Noto',
                                addressOrderStyleBack : 'rarity text-black text-right text-xl font-black font-Noto',
                                addressOrderTxtFront : 'RANK:' + playScenarioObj.gimmick[key].gimmickID,
                                addressOrderTxtBack : 'RANK:' + playScenarioObj.gimmick[key].gimmickID,
                                //  movie
                                movieID : movieID,
                                movieName : movieName,
                                moviePath : moviePath,
                                //  content
                                contentWrapStyleFront : 'grow flex flex-col divide-y content-start w-full',
                                contentWrapStyleBack : 'grow flex flex-col divide-y content-start w-full',
                                ////////////////////////////////////
                                //  動画前の演出
                                //
                                //  あるかどうか
                                hasUndercard : playScenarioObj.gimmick[key].Undercard.hasUndercard,
                                //  割合
                                UndercardFrequency: playScenarioObj.gimmick[key].Undercard.UndercardFrequency,
                                //  北斗
                                UndercardFrequencyHokuto: playScenarioObj.gimmick[key].Undercard.hokuto,
                                //  告知
                                UndercardFrequencyAnnouncement: playScenarioObj.gimmick[key].Undercard.announcement,
                                //  カイジ
                                UndercardFrequencyKaiji: playScenarioObj.gimmick[key].Undercard.kaiji,
                                //  エヴァ
                                UndercardFrequencyEva: playScenarioObj.gimmick[key].Undercard.eva,
                                //  jojo
                                UndercardFrequencyJojo: playScenarioObj.gimmick[key].Undercard.jojo,
                                //  ワンピース
                                UndercardFrequencyOnePiece: playScenarioObj.gimmick[key].Undercard.onePiece,
                                //  動画前の演出
                                ////////////////////////////////////

                                ////////////////////////////////////
                                //  魚群の演出
                                //
                                //  あるかどうか
                                hasFish : playScenarioObj.gimmick[key].Fish.hasFish,
                                //  割合
                                FishFrequency : playScenarioObj.gimmick[key].Fish.FishFrequency,
                                //  カーデル
                                FishFrequencyCadel : playScenarioObj.gimmick[key].Fish.cardel,
                                //  zawazawa
                                FishFrequencyZawazawa : playScenarioObj.gimmick[key].Fish.zawazawa,
                                //  dodododo
                                FishFrequencyDodododo : playScenarioObj.gimmick[key].Fish.dodododo,
                                //  gogogogo
                                FishFrequencyGogogogo : playScenarioObj.gimmick[key].Fish.gogogogo,
                                //  doooooon
                                FishFrequencyDoooooon : playScenarioObj.gimmick[key].Fish.doooooon,
                                //  zokuzoku
                                FishFrequencyZokuzoku : playScenarioObj.gimmick[key].Fish.zokuzoku,
                                //  魚群の演出
                                ////////////////////////////////////

                                ////////////////////////////////////
                                //  挿入ミッション
                                //
                                //  あるかどうか
                                hasInsertMission : playScenarioObj.gimmick[key].insertMission.hasInsertMission,
                                //  割合
                                insertMissionFrequency : playScenarioObj.gimmick[key].insertMission.insertMissionFrequency,
                                //  ButtonMash
                                insertMissionFrequencyButtonMash : playScenarioObj.gimmick[key].insertMission.ButtonMash,
                                //  ButtonLongPress
                                insertMissionFrequencyButtonLongPress: playScenarioObj.gimmick[key].insertMission.ButtonLongPress,
                                //  ButtonShortPress
                                insertMissionFrequencyButtonShortPress: playScenarioObj.gimmick[key].insertMission.ButtonShortPress,
                                //  Pull
                                insertMissionFrequencyPull: playScenarioObj.gimmick[key].insertMission.Pull,
                                //  Slot
                                insertMissionFrequencySlot: playScenarioObj.gimmick[key].insertMission.Slot,
                                //  HighLow
                                insertMissionFrequencyHighLow: playScenarioObj.gimmick[key].insertMission.HighLow,
                                //  挿入ミッション
                                ////////////////////////////////////

                                //  name                    
                                nameWrapStyleFront : 'p-2 addressWrapStyleFront  flex flex-col items-start justify-start',
                                nameWrapStyleBack : 'p-2 addressWrapStyleFront  flex flex-col items-start justify-start',

                                nameStyleFront : 'text-lg xs:text-4xl sm:text-3xl font-black font-Roboto',
                                nameStyleBack : 'text-lg xs:text-4xl sm:text-3xl font-black font-Roboto',
                                nameTxtFront : '******',
                                nameTxtBack : '******',
                                //  phone
                                phoneStyleFront : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                                phoneStyleBack : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                                phoneTxtFront : '******',
                                phoneTxtBack : '******',
                                //  address
                                // addressWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                                // addressWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                                // addressTextFront : UserStateObj.myGiftCards[key].userShippingZipcode + " " + UserStateObj.myGiftCards[key].userShippingAddress,
                                // addressTextBack : UserStateObj.myGiftCards[key].userShippingZipcode + " " + UserStateObj.myGiftCards[key].userShippingAddress,
                                //  ribbon
                                ribbonStyleFront : 'ribbon font-Roboto',
                                ribbonStyleBack : 'ribbon ribbon-green font-Roboto',
                                ribbonTextFront : '',
                                ribbonTextBack : '',
                                //  bottomRibbon　裏表同じものでOK
                                // bottomRibbonStyleFront : 'bottom-ribbon font-Roboto',
                                // bottomRibbonStyleBack : 'bottom-ribbon font-Roboto',
                                // // bottomRibbonTextFront : unable2ShipRibbonText,
                                // // bottomRibbonTextBack : unable2ShipRibbonText,

                            }}
                        />
                    </div>
                    :<></>
                    );
                }
            })}
            
        </div>
)

}