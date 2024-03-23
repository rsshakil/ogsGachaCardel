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


export const ContentSelectGimmick = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [playScenarioObj, setPlayScenarioState] = useRecoilState(playScenarioState);
    // console.log("[ContentSelectGimmick]UserStateObj==>", UserStateObj);
    // console.log("[ContentSelectGimmick]modalStateValue==>", modalStateValue);
    const hokutoConf = playScenarioObj.gimmick.config.hokuto;
    const ButtonMashConf = playScenarioObj.gimmick.config.ButtonMash;

    ////////////////////////////////
    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentSelectGimmick]languageResource==>", languageResource);

 

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
            Object.keys(playScenarioObj.gimmick).map(gimmickID => {
                if(gimmickID === selectKey){
                    // console.log("[ContentConfirmShippingAddress]IF:shippingUUIDy==>", shippingUUID,"selectKey==>",selectKey);
                    //  クリックしたitemの選択状態を反転させる
                    setPlayScenarioState((prevState) => ({
                        ...prevState,
                            'gimmick': {
                                ...prevState.gimmick,
                                [e.key]: {
                                    ...prevState.gimmick[e.key],
                                    'isGimmickSelected' : !prevState.gimmick[e.key].isGimmickSelected
                                },
                            }
                    }))
                }else{
                    // console.log("[ContentConfirmShippingAddress]ELSE:shippingUUIDy==>", shippingUUID,"selectKey==>",selectKey);
                    //  クリックしていないitemの選択状態を非選択にする
                    setPlayScenarioState((prevState) => ({
                        ...prevState,
                            'gimmick': {
                                ...prevState.gimmick,
                                [gimmickID]: {
                                    ...prevState.gimmick[gimmickID],
                                    'isGimmickSelected' : false
                                },
                            }
                    }))
                }
            })
        }
    }




    //  選択したアイテムのフラグClass
    let isSlected = '';

    
    return (
        <div className="w-full grid grid-cols-1 gap-2 sm:gap-4 justify-center items-center h-fit">
            {Object.keys(playScenarioObj.gimmick).map(key => {
                // console.log("[ContentSelectGimmick]key==>", key);
                // console.log("[ContentSelectGimmick]UserStateObj.myCollection[key]==>", playScenarioObj.gimmick[key]);
                //  ナンバリング
                // shippingAddressIndex = shippingAddressIndex + 1;

                if(key === 'config'){
                    //  configだったらカードに変換しない
                }else{
                    //  configでないのであればカードにする
                    //  選択済みかどうか
                    if(playScenarioObj.gimmick[key].isGimmickSelected === true) {
                        isSlected = 'isSlected'
                    }else{
                        isSlected = ''
                    }
                    // console.log("[ContentSelectGimmick]isSlected==>", isSlected);

                    return (
                    
                    <div
                        key={`SelectGimmick-${key} `}
                        id={key}
                        className=""
                        onClick={(e) => itemSelected({"key":key})}
                    >
                        <GimmickCard
                            key={key}
                            data={{
                                key : key,
                                type : 'SelectGimmick',
                                userShippingId : playScenarioObj.gimmick[key].gimmickID,
                                //  選択済みかどうか
                                isSlected : isSlected,
                                itemOuterAreaStyle : 'itemOuter relative  w-full',
                                itemWrapStyleFront : 'itemWrap  rounded cursor-pointer text-white flex flex-col p-2',
                                itemWrapStyleBack : 'absolute h-full w-full itemWrapBack  rounded cursor-pointer text-white flex flex-col p-2',
                                //  header
                                headerWrapStyleFront : 'border-b pb-1 flex flex-row justify-between h-8',
                                headerWrapStyleBack : 'border-b pb-1 flex flex-row justify-between h-8',
                                addressOrderStyleFront : 'rarity text-black text-right text-xl font-black font-Noto',
                                addressOrderStyleBack : 'rarity text-black text-right text-xl font-black font-Noto',
                                addressOrderTxtFront : 'RANK:' + playScenarioObj.gimmick[key].gimmickID,
                                addressOrderTxtBack : 'RANK:' + playScenarioObj.gimmick[key].gimmickID,
                                
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
                                nameWrapStyleFront : 'p-2 addressWrapStyleFront grow flex flex-col items-start justify-start',
                                nameWrapStyleBack : 'p-2 addressWrapStyleFront grow flex flex-col items-start justify-start',

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
                    );
                }
            })}


            <ul className="border-white border-double border-4 p-2">
                <p className="">北斗ステップ設定</p>
                <li className="">
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP1:{hokutoConf.step1.duration}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">1</p>
                            <p className="px-1">{hokutoConf.step1[1].text[1]}</p>
                            <p className="px-1">{hokutoConf.step1[1].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">2</p>
                            <p className="px-1">{hokutoConf.step1[2].text[1]}</p>
                            <p className="px-1">{hokutoConf.step1[2].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">3</p>
                            <p className="px-1">{hokutoConf.step1[3].text[1]}</p>
                            <p className="px-1">{hokutoConf.step1[3].text[2]}</p>
                        </div>
                    </ul>
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP2:{hokutoConf.step2.duration}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">1</p>
                            <p className="px-1">{hokutoConf.step2[1].text[1]}</p>
                            <p className="px-1">{hokutoConf.step2[1].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">2</p>
                            <p className="px-1">{hokutoConf.step2[2].text[1]}</p>
                            <p className="px-1">{hokutoConf.step2[2].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">3</p>
                            <p className="px-1">{hokutoConf.step2[3].text[1]}</p>
                            <p className="px-1">{hokutoConf.step2[3].text[2]}</p>
                        </div>
                    </ul>
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP3:{hokutoConf.step3.duration}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">1</p>
                            <p className="px-1">{hokutoConf.step3[1].text[1]}</p>
                            <p className="px-1">{hokutoConf.step3[1].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">2</p>
                            <p className="px-1">{hokutoConf.step3[2].text[1]}</p>
                            <p className="px-1">{hokutoConf.step3[2].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">3</p>
                            <p className="px-1">{hokutoConf.step3[3].text[1]}</p>
                            <p className="px-1">{hokutoConf.step3[3].text[2]}</p>
                        </div>
                    </ul>
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP4:{hokutoConf.step2.duration}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">1</p>
                            <p className="px-1">{hokutoConf.step4[1].text[1]}</p>
                            <p className="px-1">{hokutoConf.step4[1].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">2</p>
                            <p className="px-1">{hokutoConf.step4[2].text[1]}</p>
                            <p className="px-1">{hokutoConf.step4[2].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">3</p>
                            <p className="px-1">{hokutoConf.step4[3].text[1]}</p>
                            <p className="px-1">{hokutoConf.step4[3].text[2]}</p>
                        </div>
                    </ul>
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP5:{hokutoConf.step2.duration}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">1</p>
                            <p className="px-1">{hokutoConf.step5[1].text[1]}</p>
                            <p className="px-1">{hokutoConf.step5[1].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">2</p>
                            <p className="px-1">{hokutoConf.step5[2].text[1]}</p>
                            <p className="px-1">{hokutoConf.step5[2].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">3</p>
                            <p className="px-1">{hokutoConf.step5[3].text[1]}</p>
                            <p className="px-1">{hokutoConf.step5[3].text[2]}</p>
                        </div>
                    </ul>
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP6:{hokutoConf.step2.duration}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">1</p>
                            <p className="px-1">{hokutoConf.step6[1].text[1]}</p>
                            <p className="px-1">{hokutoConf.step6[1].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">2</p>
                            <p className="px-1">{hokutoConf.step6[2].text[1]}</p>
                            <p className="px-1">{hokutoConf.step6[2].text[2]}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">3</p>
                            <p className="px-1">{hokutoConf.step6[3].text[1]}</p>
                            <p className="px-1">{hokutoConf.step6[3].text[2]}</p>
                        </div>
                    </ul>
                </li>
            </ul>
            <ul className="border-white border-double border-4 p-2">
                <p className="">叩けミッション設定</p>
                <li className="">
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP1:{ButtonMashConf.step1.elapsedTime}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">ボタン文言</p><p className="px-1">{ButtonMashConf.step1.text}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">波紋色</p><p className="px-1">{ButtonMashConf.step1.RippleColor}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">タイプ</p><p className="px-1">{ButtonMashConf.step1.type}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">Warning</p><p className="px-1">{ButtonMashConf.step1.isWarning.toString()}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">倍率</p><p className="px-1">{ButtonMashConf.step1.scale}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">刻み</p><p className="px-1">{ButtonMashConf.step1.tickSize}</p>
                        </div>
                    </ul>
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP2:{ButtonMashConf.step2.elapsedTime}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">ボタン文言</p><p className="px-1">{ButtonMashConf.step2.text}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">波紋色</p><p className="px-1">{ButtonMashConf.step2.RippleColor}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">タイプ</p><p className="px-1">{ButtonMashConf.step2.type}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">Warning</p><p className="px-1">{ButtonMashConf.step2.isWarning.toString()}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">倍率</p><p className="px-1">{ButtonMashConf.step2.scale}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">刻み</p><p className="px-1">{ButtonMashConf.step2.tickSize}</p>
                        </div>
                    </ul>
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP3:{ButtonMashConf.step3.elapsedTime}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">ボタン文言</p><p className="px-1">{ButtonMashConf.step3.text}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">波紋色</p><p className="px-1">{ButtonMashConf.step3.RippleColor}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">タイプ</p><p className="px-1">{ButtonMashConf.step3.type}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">Warning</p><p className="px-1">{ButtonMashConf.step3.isWarning.toString()}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">倍率</p><p className="px-1">{ButtonMashConf.step3.scale}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">刻み</p><p className="px-1">{ButtonMashConf.step3.tickSize}</p>
                        </div>
                    </ul>
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP4:{ButtonMashConf.step4.elapsedTime}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">ボタン文言</p><p className="px-1">{ButtonMashConf.step4.text}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">波紋色</p><p className="px-1">{ButtonMashConf.step4.RippleColor}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">タイプ</p><p className="px-1">{ButtonMashConf.step4.type}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">Warning</p><p className="px-1">{ButtonMashConf.step4.isWarning.toString()}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">倍率</p><p className="px-1">{ButtonMashConf.step4.scale}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">刻み</p><p className="px-1">{ButtonMashConf.step4.tickSize}</p>
                        </div>
                    </ul>
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP5:{ButtonMashConf.step5.elapsedTime}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">ボタン文言</p><p className="px-1">{ButtonMashConf.step5.text}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">波紋色</p><p className="px-1">{ButtonMashConf.step5.RippleColor}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">タイプ</p><p className="px-1">{ButtonMashConf.step5.type}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">Warning</p><p className="px-1">{ButtonMashConf.step5.isWarning.toString()}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">倍率</p><p className="px-1">{ButtonMashConf.step5.scale}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">刻み</p><p className="px-1">{ButtonMashConf.step5.tickSize}</p>
                        </div>
                    </ul>
                    <ul className="">
                        <p className="px-2 border border-slate-700 border-dotted">STEP6:{ButtonMashConf.step6.elapsedTime}ms</p>
                        <div className="flex flex-row">
                            <p className="px-1">ボタン文言</p><p className="px-1">{ButtonMashConf.step6.text}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">波紋色</p><p className="px-1">{ButtonMashConf.step6.RippleColor}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">タイプ</p><p className="px-1">{ButtonMashConf.step6.type}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">Warning</p><p className="px-1">{ButtonMashConf.step6.isWarning.toString()}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">倍率</p><p className="px-1">{ButtonMashConf.step6.scale}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="px-1">刻み</p><p className="px-1">{ButtonMashConf.step6.tickSize}</p>
                        </div>
                    </ul>
                </li>
            </ul>


        </div>
)

}