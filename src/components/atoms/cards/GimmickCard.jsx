import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../store/recoil/modalState";
import { userState } from "../../../store/recoil/userState";
import '../../../css/Card.css';
import {useIntl} from 'react-intl'
import { Fishs } from "../../atoms/img/Fish.png";
import Logo from "../../atoms/img/cardel_online_logo_en_small_1.png";

export const GimmickCard = (props) => {
    const data = props.data;
    // console.log("[GimmickCard]UserStateObjprops.data==>", data);
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    // console.log("[GimmickCard]modalStateValue==>", modalStateValue);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[GimmickCard]UserStateObj==>", UserStateObj);

    // const img = new Image();
    // const src = "../../atoms/img/cardel_online_logo_en_small_1.png";
    // img.src = src

    const {
        //  propsの受け取り
        key,
        type,
        userShippingId,
        isSlected = false,

        itemOuterAreaStyle ='itemOuter relative aspect-[3/2] w-full ',
        itemWrapStyleFront = 'absolute itemWrap h-full w-full rounded cursor-pointer text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
        itemWrapStyleBack = 'absolute itemWrapBack h-full w-full rounded cursor-pointer text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
        //  header
        headerWrapStyleFront = 'row-span-1 border-b pb-1 flex flex-row justify-between',
        headerWrapStyleBack = 'row-span-1 border-b pb-1 flex flex-row justify-between',
        addressOrderStyleFront = 'rarity leading-10 text-right text-lg font-black font-Noto',
        addressOrderStyleBack = 'rarity leading-10 text-right text-lg font-black font-Noto',
        addressOrderTxtFront = 'お届け先',
        addressOrderTxtBack = 'お届け先',
        //  content
        contentWrapStyleFront = 'row-span-3 flex flex-col items-stretch content-between w-full',
        contentWrapStyleBack = 'row-span-3 flex flex-col items-stretch content-between w-full',
        //  ギミック
        gimmickWrapFront = 'text-sm font-bold flex flex-col flex-wrap text-indigo-800',
        gimmickWrapBack = 'text-sm font-bold flex flex-col flex-wrap text-indigo-800',

        gimmickDetailWrapFront = 'text-sm font-bold flex flex-col text-rose-900',
        gimmickDetailWrapBack = 'text-sm font-bold flex flex-col text-rose-900',

        gimmickDetailFront = 'text-sm font-bold flex flex-col',
        gimmickDetailBack = 'text-sm font-bold flex flex-col',
        ////////////////////////////////////
        //  動画前の演出
        movieID,
        movieName,
        moviePath,
        //  動画前の演出
        ////////////////////////////////////

        ////////////////////////////////////
        //  動画前の演出
        //
        //  あるかどうか
        hasUndercard,
        //  割合
        UndercardFrequency,
        //  北斗
        UndercardFrequencyHokuto,
        //  告知
        UndercardFrequencyAnnouncement,
        //  カイジ
        UndercardFrequencyKaiji,
        //  エヴァ
        UndercardFrequencyEva,
        //  jojo
        UndercardFrequencyJojo,
        //  ワンピース
        UndercardFrequencyOnePiece,
        //  動画前の演出
        ////////////////////////////////////

        ////////////////////////////////////
        //  魚群の演出
        //
        //  あるかどうか
        hasFish,
        //  割合
        FishFrequency,
        //  カーデル
        FishFrequencyCadel,
        //  zawazawa
        FishFrequencyZawazawa,
        //  dodododo
        FishFrequencyDodododo,
        //  gogogogo
        FishFrequencyGogogogo,
        //  doooooon
        FishFrequencyDoooooon,
        //  zokuzoku
        FishFrequencyZokuzoku,
        //  魚群の演出
        ////////////////////////////////////

        ////////////////////////////////////
        //  挿入ミッション
        //
        //  あるかどうか
        hasInsertMission,
        //  割合
        insertMissionFrequency,
        //  ButtonMash
        insertMissionFrequencyButtonMash,
        //  ButtonLongPress
        insertMissionFrequencyButtonLongPress,
        //  ButtonShortPress
        insertMissionFrequencyButtonShortPress,
        //  Pull
        insertMissionFrequencyPull,
        //  Slot
        insertMissionFrequencySlot,
        //  HighLow
        insertMissionFrequencyHighLow,
        //  挿入ミッション
        ////////////////////////////////////

        //  name
        nameWrapStyleFront = 'point-exchange grow flex items-center justify-center',
        nameWrapStyleBack = 'point-exchange grow flex items-center justify-center',
        nameStyleFront = 'text-left text-5xl sm:text-3xl font-black font-Roboto',
        nameStyleBack = 'text-left text-5xl sm:text-3xl font-black font-Roboto',
        nameTxtFront = '',
        nameTxtBack = '',
        //  phone
        phoneStyleFront = 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
        phoneStyleBack = 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
        phoneTxtFront = 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
        phoneTxtBack = 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
        //  address
        addressWrapStyleFront = 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
        addressWrapStyleBack = 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
        addressTextFront = '',
        addressTextBack = '',
        //  ribbon
        ribbonStyleFront = 'ribbon font-Roboto',
        ribbonStyleBack = 'ribbon font-Roboto',
        ribbonTextFront = '',
        ribbonTextBack = '',
        //  bottomRibbon
        bottomRibbonStyleFront = 'bottom-ribbon font-Roboto',
        bottomRibbonStyleBack = 'bottom-ribbon font-Roboto',
        bottomRibbonTextFront = '発送不可',
        bottomRibbonTextBack = '発送不可',

    } = data;


    return (
        <div className={`${isSlected} ${itemOuterAreaStyle}`}>
            {
                moviePath
                ?
                <></>
                :
                <div className={`${itemWrapStyleFront}`}>
                    <div className={`${headerWrapStyleFront}`}>
                        <figure className={`h-full`} ><img src={Logo} className="h-full"/></figure>
                        <div className="flex items-end"><p className={`${addressOrderStyleFront}`}>{addressOrderTxtFront}</p></div>
                    </div>
                    <div className={`${contentWrapStyleFront}`}>
                        <div className={`${nameWrapStyleFront}`}>
                            <div className={`gimmickWrap ${gimmickWrapFront}`}>
                                <div className="flex flex-row">
                                    <p className="w-22">始動前演出：</p>
                                    <p className="w-8">{hasUndercard?'あり':'なし'}</p>
                                    <p className="">{hasUndercard?UndercardFrequency?UndercardFrequency.total+'%':'0%':''}</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">北斗{UndercardFrequency.hokuto}%</p>
                                    <p className="px-0.5">信頼度{UndercardFrequency.announcement}%</p>
                                    <p className="px-0.5">カイジ{UndercardFrequency.kaiji}%</p>
                                    <p className="px-0.5">エヴァ{UndercardFrequency.eva}%</p>
                                    <p className="px-0.5">JOJO{UndercardFrequency.jojo}%</p>
                                    <p className="px-0.5">ワンピース{UndercardFrequency.onePiece}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailWrapFront}`}>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">北斗レート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyHokuto.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyHokuto.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyHokuto.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyHokuto.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyHokuto.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyHokuto.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">信頼度レート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyAnnouncement.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyAnnouncement.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyAnnouncement.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyAnnouncement.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyAnnouncement.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyAnnouncement.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">カイジレート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyKaiji.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyKaiji.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyKaiji.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyKaiji.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyKaiji.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyKaiji.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">エヴァレート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyEva.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyEva.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyEva.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyEva.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyEva.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyEva.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">JOJOレート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyJojo.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyJojo.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyJojo.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyJojo.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyJojo.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyJojo.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">ワンピレート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyOnePiece.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyOnePiece.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyOnePiece.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyOnePiece.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyOnePiece.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyOnePiece.step6}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${nameWrapStyleFront}`}>
                            <div className={`gimmickWrap ${gimmickWrapFront}`}>
                                <div className="flex flex-wrap">
                                        <p className="w-22">魚群演出：</p>
                                        <p className="w-8">{hasFish?'あり':'なし'}</p>
                                        <p className="">{hasFish?FishFrequency?FishFrequency.total+'%':'0%':''}</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">カーデル:{FishFrequency.cadel}%</p>
                                    <p className="px-0.5">ざわ:{FishFrequency.zawazawa}%</p>
                                    <p className="px-0.5">ド:{FishFrequency.dodododo}%</p>
                                    <p className="px-0.5">ゴ:{FishFrequency.gogogogo}%</p>
                                    <p className="px-0.5">ドオォ-ン:{FishFrequency.doooooon}%</p>
                                    <p className="px-0.5">ゾク:{FishFrequency.zokuzoku}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailWrapFront}`}>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">カーデル:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{FishFrequencyCadel.step1}%</p>
                                        <p className="px-0.5">STEP2:{FishFrequencyCadel.step2}%</p>
                                        <p className="px-0.5">STEP3:{FishFrequencyCadel.step3}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">ざわざわ:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{FishFrequencyZawazawa.step1}%</p>
                                        <p className="px-0.5">STEP2:{FishFrequencyZawazawa.step2}%</p>
                                        <p className="px-0.5">STEP3:{FishFrequencyZawazawa.step3}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">ドドドド:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{FishFrequencyDodododo.step1}%</p>
                                        <p className="px-0.5">STEP2:{FishFrequencyDodododo.step2}%</p>
                                        <p className="px-0.5">STEP3:{FishFrequencyDodododo.step3}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">ゴゴゴゴ:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{FishFrequencyGogogogo.step1}%</p>
                                        <p className="px-0.5">STEP2:{FishFrequencyGogogogo.step2}%</p>
                                        <p className="px-0.5">STEP3:{FishFrequencyGogogogo.step3}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">ドオォ-ン:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{FishFrequencyDoooooon.step1}%</p>
                                        <p className="px-0.5">STEP2:{FishFrequencyDoooooon.step2}%</p>
                                        <p className="px-0.5">STEP3:{FishFrequencyDoooooon.step3}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">ゾクゾク:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{FishFrequencyZokuzoku.step1}%</p>
                                        <p className="px-0.5">STEP2:{FishFrequencyZokuzoku.step2}%</p>
                                        <p className="px-0.5">STEP3:{FishFrequencyZokuzoku.step3}%</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className={`${nameWrapStyleFront}`}>
                            <div className={`gimmickWrap ${gimmickWrapFront}`}>
                                <div className="flex flex-wrap">
                                    <p className="w-22">ミッション:</p>
                                    <p className="w-8">{hasInsertMission?'あり':'なし'}</p>
                                    <p className="">{hasInsertMission?insertMissionFrequency?insertMissionFrequency.total+'%':'0%':''}</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">連打:{insertMissionFrequency.ButtonMash}%</p>
                                    <p className="px-0.5">長押:{insertMissionFrequency.ButtonLongPress}%</p>
                                    <p className="px-0.5">短押:{insertMissionFrequency.ButtonShortPress}%</p>
                                    <p className="px-0.5">引張:{insertMissionFrequency.Pull}%</p>
                                    <p className="px-0.5">回胴:{insertMissionFrequency.Slot}%</p>
                                    <p className="px-0.5">高低:{insertMissionFrequency.HighLow}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailWrapFront}`}>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">連打レート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{insertMissionFrequencyButtonMash.step1}%</p>
                                        <p className="px-0.5">STEP2:{insertMissionFrequencyButtonMash.step2}%</p>
                                        <p className="px-0.5">STEP3:{insertMissionFrequencyButtonMash.step3}%</p>
                                        <p className="px-0.5">STEP4:{insertMissionFrequencyButtonMash.step4}%</p>
                                        <p className="px-0.5">STEP5:{insertMissionFrequencyButtonMash.step5}%</p>
                                        <p className="px-0.5">STEP6:{insertMissionFrequencyButtonMash.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">長押レート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{insertMissionFrequencyButtonLongPress.step1}%</p>
                                        <p className="px-0.5">STEP2:{insertMissionFrequencyButtonLongPress.step2}%</p>
                                        <p className="px-0.5">STEP3:{insertMissionFrequencyButtonLongPress.step3}%</p>
                                        <p className="px-0.5">STEP4:{insertMissionFrequencyButtonLongPress.step4}%</p>
                                        <p className="px-0.5">STEP5:{insertMissionFrequencyButtonLongPress.step5}%</p>
                                        <p className="px-0.5">STEP6:{insertMissionFrequencyButtonLongPress.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">短押レート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{insertMissionFrequencyButtonShortPress.step1}%</p>
                                        <p className="px-0.5">STEP2:{insertMissionFrequencyButtonShortPress.step2}%</p>
                                        <p className="px-0.5">STEP3:{insertMissionFrequencyButtonShortPress.step3}%</p>
                                        <p className="px-0.5">STEP4:{insertMissionFrequencyButtonShortPress.step4}%</p>
                                        <p className="px-0.5">STEP5:{insertMissionFrequencyButtonShortPress.step5}%</p>
                                        <p className="px-0.5">STEP6:{insertMissionFrequencyButtonShortPress.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">引張レート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{insertMissionFrequencyPull.step1}%</p>
                                        <p className="px-0.5">STEP2:{insertMissionFrequencyPull.step2}%</p>
                                        <p className="px-0.5">STEP3:{insertMissionFrequencyPull.step3}%</p>
                                        <p className="px-0.5">STEP4:{insertMissionFrequencyPull.step4}%</p>
                                        <p className="px-0.5">STEP5:{insertMissionFrequencyPull.step5}%</p>
                                        <p className="px-0.5">STEP6:{insertMissionFrequencyPull.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">回胴レート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{insertMissionFrequencySlot.step1}%</p>
                                        <p className="px-0.5">STEP2:{insertMissionFrequencySlot.step2}%</p>
                                        <p className="px-0.5">STEP3:{insertMissionFrequencySlot.step3}%</p>
                                        <p className="px-0.5">STEP4:{insertMissionFrequencySlot.step4}%</p>
                                        <p className="px-0.5">STEP5:{insertMissionFrequencySlot.step5}%</p>
                                        <p className="px-0.5">STEP6:{insertMissionFrequencySlot.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailFront}`}>
                                    <div className="w-24">
                                        <p className="">高低レート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{insertMissionFrequencyHighLow.step1}%</p>
                                        <p className="px-0.5">STEP2:{insertMissionFrequencyHighLow.step2}%</p>
                                        <p className="px-0.5">STEP3:{insertMissionFrequencyHighLow.step3}%</p>
                                        <p className="px-0.5">STEP4:{insertMissionFrequencyHighLow.step4}%</p>
                                        <p className="px-0.5">STEP5:{insertMissionFrequencyHighLow.step5}%</p>
                                        <p className="px-0.5">STEP6:{insertMissionFrequencyHighLow.step6}%</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {/* <div className={`${addressWrapStyleFront}`}><p className="leading-3">{addressTextFront}</p></div> */}
                    </div>
                </div>
            }

        <div className={`${itemWrapStyleBack}`}>
            <div className={`${headerWrapStyleBack}`}>
                    <figure className={`h-full`} ><img src={Logo} className="h-full"/></figure>
                    <div className="flex items-end"><p className={`${addressOrderStyleBack}`}>{addressOrderTxtBack}</p></div>
                </div>
                <div className={`${contentWrapStyleBack}`}>
                {
                    moviePath
                    ?
                    <div className={`${nameWrapStyleFront}`}>
                        <div className={`gimmickWrap ${gimmickWrapFront}`}>
                            <div className="flex flex-row">
                                <p className="w-16">動画名：</p>
                                <p className="w-16">{movieID}</p>
                            </div>
                            <div className="flex flex-wrap font-normal">
                                <p className="px-0.5">{movieName}</p>
                            </div>
                            <video
                            className="h-full w-5/12 mx-auto"
                            // id={emissionUUID}
                            // ref={videoRefBasa}
                            // onLoadedData={(e) => loadeddata(e)}
                            muted
                            // controls
                            loop
                            autoPlay
                            playsInline={true}
                            // webkitPlaysinline
                            webkitplaysinline="true"
                            preload="auto"
                            // poster="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%229%22%2F%3E" 
                        >
                            <source src={moviePath} type="video/mp4" />
                        </video>

                        </div>
                    </div>
                    :
                    <></>
                    }


                    <div className={`${nameWrapStyleBack}`}>
                            <div className={`gimmickWrap ${gimmickWrapBack}`}>
                                <div className="flex flex-row">
                                    <p className="w-22">始動前演出：</p>
                                    <p className="w-8">{hasUndercard?'あり':'なし'}</p>
                                    <p className="">{hasUndercard?UndercardFrequency?UndercardFrequency.total+'%':'0%':''}</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">北斗{UndercardFrequency.hokuto}%</p>
                                    <p className="px-0.5">信頼度{UndercardFrequency.announcement}%</p>
                                    <p className="px-0.5">カイジ{UndercardFrequency.kaiji}%</p>
                                    <p className="px-0.5">エヴァ{UndercardFrequency.eva}%</p>
                                    <p className="px-0.5">JOJO{UndercardFrequency.jojo}%</p>
                                    <p className="px-0.5">ワンピース{UndercardFrequency.onePiece}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailWrapBack}`}>
                                <div className={`${gimmickDetailBack}`}>
                                    <div className="w-24">
                                        <p className="">北斗レート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyHokuto.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyHokuto.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyHokuto.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyHokuto.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyHokuto.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyHokuto.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailBack}`}>
                                    <div className="w-24">
                                        <p className="">信頼度レート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyAnnouncement.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyAnnouncement.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyAnnouncement.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyAnnouncement.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyAnnouncement.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyAnnouncement.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailBack}`}>
                                    <div className="w-24">
                                        <p className="">カイジレート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyKaiji.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyKaiji.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyKaiji.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyKaiji.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyKaiji.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyKaiji.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailBack}`}>
                                    <div className="w-24">
                                        <p className="">エヴァレート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyEva.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyEva.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyEva.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyEva.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyEva.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyEva.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailBack}`}>
                                    <div className="w-24">
                                        <p className="">JOJOレート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyJojo.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyJojo.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyJojo.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyJojo.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyJojo.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyJojo.step6}%</p>
                                    </div>
                                </div>
                                <div className={`${gimmickDetailBack}`}>
                                    <div className="w-24">
                                        <p className="">ワンピレート:</p>
                                    </div>
                                    <div className="flex flex-wrap font-normal">
                                        <p className="px-0.5">STEP1:{UndercardFrequencyOnePiece.step1}%</p>
                                        <p className="px-0.5">STEP2:{UndercardFrequencyOnePiece.step2}%</p>
                                        <p className="px-0.5">STEP3:{UndercardFrequencyOnePiece.step3}%</p>
                                        <p className="px-0.5">STEP4:{UndercardFrequencyOnePiece.step4}%</p>
                                        <p className="px-0.5">STEP5:{UndercardFrequencyOnePiece.step5}%</p>
                                        <p className="px-0.5">STEP6:{UndercardFrequencyOnePiece.step6}%</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className={`${nameWrapStyleBack}`}>
                        <div className={`gimmickWrap ${gimmickWrapBack}`}>
                            <div className="flex flex-wrap">
                                    <p className="w-22">魚群演出：</p>
                                    <p className="w-8">{hasFish?'あり':'なし'}</p>
                                    <p className="">{hasFish?FishFrequency?FishFrequency.total+'%':'0%':''}</p>
                            </div>
                            <div className="flex flex-wrap font-normal">
                                <p className="px-0.5">カーデル:{FishFrequency.cadel}%</p>
                                <p className="px-0.5">ざわ:{FishFrequency.zawazawa}%</p>
                                <p className="px-0.5">ド:{FishFrequency.dodododo}%</p>
                                <p className="px-0.5">ゴ:{FishFrequency.gogogogo}%</p>
                                <p className="px-0.5">ドオォ-ン:{FishFrequency.doooooon}%</p>
                                <p className="px-0.5">ゾク:{FishFrequency.zokuzoku}%</p>
                            </div>
                        </div>
                        <div className={`${gimmickDetailWrapBack}`}>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">カーデル:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{FishFrequencyCadel.step1}%</p>
                                    <p className="px-0.5">STEP2:{FishFrequencyCadel.step2}%</p>
                                    <p className="px-0.5">STEP3:{FishFrequencyCadel.step3}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">ざわざわ:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{FishFrequencyZawazawa.step1}%</p>
                                    <p className="px-0.5">STEP2:{FishFrequencyZawazawa.step2}%</p>
                                    <p className="px-0.5">STEP3:{FishFrequencyZawazawa.step3}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">ドドドド:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{FishFrequencyDodododo.step1}%</p>
                                    <p className="px-0.5">STEP2:{FishFrequencyDodododo.step2}%</p>
                                    <p className="px-0.5">STEP3:{FishFrequencyDodododo.step3}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">ゴゴゴゴ:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{FishFrequencyGogogogo.step1}%</p>
                                    <p className="px-0.5">STEP2:{FishFrequencyGogogogo.step2}%</p>
                                    <p className="px-0.5">STEP3:{FishFrequencyGogogogo.step3}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">ドオォ-ン:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{FishFrequencyDoooooon.step1}%</p>
                                    <p className="px-0.5">STEP2:{FishFrequencyDoooooon.step2}%</p>
                                    <p className="px-0.5">STEP3:{FishFrequencyDoooooon.step3}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">ゾクゾク:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{FishFrequencyZokuzoku.step1}%</p>
                                    <p className="px-0.5">STEP2:{FishFrequencyZokuzoku.step2}%</p>
                                    <p className="px-0.5">STEP3:{FishFrequencyZokuzoku.step3}%</p>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className={`${nameWrapStyleBack}`}>
                        <div className={`gimmickWrap ${gimmickWrapBack}`}>
                            <div className="flex flex-wrap">
                                <p className="w-22">ミッション:</p>
                                <p className="w-8">{hasInsertMission?'あり':'なし'}</p>
                                <p className="">{hasInsertMission?insertMissionFrequency?insertMissionFrequency.total+'%':'0%':''}</p>
                            </div>
                            <div className="flex flex-wrap font-normal">
                                <p className="px-0.5">連打:{insertMissionFrequency.ButtonMash}%</p>
                                <p className="px-0.5">長押:{insertMissionFrequency.ButtonLongPress}%</p>
                                <p className="px-0.5">短押:{insertMissionFrequency.ButtonShortPress}%</p>
                                <p className="px-0.5">引張:{insertMissionFrequency.Pull}%</p>
                                <p className="px-0.5">回胴:{insertMissionFrequency.Slot}%</p>
                                <p className="px-0.5">高低:{insertMissionFrequency.HighLow}%</p>
                            </div>
                        </div>
                        <div className={`${gimmickDetailWrapBack}`}>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">連打レート:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{insertMissionFrequencyButtonMash.step1}%</p>
                                    <p className="px-0.5">STEP2:{insertMissionFrequencyButtonMash.step2}%</p>
                                    <p className="px-0.5">STEP3:{insertMissionFrequencyButtonMash.step3}%</p>
                                    <p className="px-0.5">STEP4:{insertMissionFrequencyButtonMash.step4}%</p>
                                    <p className="px-0.5">STEP5:{insertMissionFrequencyButtonMash.step5}%</p>
                                    <p className="px-0.5">STEP6:{insertMissionFrequencyButtonMash.step6}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">長押レート:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{insertMissionFrequencyButtonLongPress.step1}%</p>
                                    <p className="px-0.5">STEP2:{insertMissionFrequencyButtonLongPress.step2}%</p>
                                    <p className="px-0.5">STEP3:{insertMissionFrequencyButtonLongPress.step3}%</p>
                                    <p className="px-0.5">STEP4:{insertMissionFrequencyButtonLongPress.step4}%</p>
                                    <p className="px-0.5">STEP5:{insertMissionFrequencyButtonLongPress.step5}%</p>
                                    <p className="px-0.5">STEP6:{insertMissionFrequencyButtonLongPress.step6}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">短押レート:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{insertMissionFrequencyButtonShortPress.step1}%</p>
                                    <p className="px-0.5">STEP2:{insertMissionFrequencyButtonShortPress.step2}%</p>
                                    <p className="px-0.5">STEP3:{insertMissionFrequencyButtonShortPress.step3}%</p>
                                    <p className="px-0.5">STEP4:{insertMissionFrequencyButtonShortPress.step4}%</p>
                                    <p className="px-0.5">STEP5:{insertMissionFrequencyButtonShortPress.step5}%</p>
                                    <p className="px-0.5">STEP6:{insertMissionFrequencyButtonShortPress.step6}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">引張レート:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{insertMissionFrequencyPull.step1}%</p>
                                    <p className="px-0.5">STEP2:{insertMissionFrequencyPull.step2}%</p>
                                    <p className="px-0.5">STEP3:{insertMissionFrequencyPull.step3}%</p>
                                    <p className="px-0.5">STEP4:{insertMissionFrequencyPull.step4}%</p>
                                    <p className="px-0.5">STEP5:{insertMissionFrequencyPull.step5}%</p>
                                    <p className="px-0.5">STEP6:{insertMissionFrequencyPull.step6}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">回胴レート:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{insertMissionFrequencySlot.step1}%</p>
                                    <p className="px-0.5">STEP2:{insertMissionFrequencySlot.step2}%</p>
                                    <p className="px-0.5">STEP3:{insertMissionFrequencySlot.step3}%</p>
                                    <p className="px-0.5">STEP4:{insertMissionFrequencySlot.step4}%</p>
                                    <p className="px-0.5">STEP5:{insertMissionFrequencySlot.step5}%</p>
                                    <p className="px-0.5">STEP6:{insertMissionFrequencySlot.step6}%</p>
                                </div>
                            </div>
                            <div className={`${gimmickDetailBack}`}>
                                <div className="w-24">
                                    <p className="">高低レート:</p>
                                </div>
                                <div className="flex flex-wrap font-normal">
                                    <p className="px-0.5">STEP1:{insertMissionFrequencyHighLow.step1}%</p>
                                    <p className="px-0.5">STEP2:{insertMissionFrequencyHighLow.step2}%</p>
                                    <p className="px-0.5">STEP3:{insertMissionFrequencyHighLow.step3}%</p>
                                    <p className="px-0.5">STEP4:{insertMissionFrequencyHighLow.step4}%</p>
                                    <p className="px-0.5">STEP5:{insertMissionFrequencyHighLow.step5}%</p>
                                    <p className="px-0.5">STEP6:{insertMissionFrequencyHighLow.step6}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}