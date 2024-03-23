import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../store/recoil/modalState";
import { userState } from "../../../store/recoil/userState";
import '../../../css/Card.css';
import {useIntl} from 'react-intl'
import { Fishs } from "../../atoms/img/Fish.png";
import Logo from "../../atoms/img/cardel_online_logo_en_small_1.png";

export const AddressCard = (props) => {
    const data = props.data;
    console.log("[AddressCard]UserStateObjprops.data==>", data);
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    console.log("[AddressCard]modalStateValue==>", modalStateValue);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    console.log("[AddressCard]UserStateObj==>", UserStateObj);

    // const img = new Image();
    // const src = "../../atoms/img/cardel_online_logo_en_small_1.png";
    // img.src = src

    const {
        //  propsの受け取り
        key,
        type,
        userShippingId,
        isSlected = false,

        itemOuterAreaStyle ='itemOuter relative aspect-[3/2] w-full overflow-hidden',
        itemWrapStyleFront = 'absolute itemWrap h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
        itemWrapStyleBack = 'absolute itemWrapBack h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
        //  header
        headerWrapStyleFront = 'row-span-1 border-b pb-1 flex flex-row justify-between',
        headerWrapStyleBack = 'row-span-1 border-b pb-1 flex flex-row justify-between',
        addressOrderStyleFront = 'rarity leading-10 text-right text-lg font-black font-Noto',
        addressOrderStyleBack = 'rarity leading-10 text-right text-lg font-black font-Noto',
        addressOrderTxtFront = 'お届け先',
        addressOrderTxtleBack = 'お届け先',
        //  content
        contentWrapStyleFront = 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
        contentWrapStyleBack = 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
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
            <div className={`${itemWrapStyleFront}`}>
                <div className={`${headerWrapStyleFront}`}>
                    <figure className={`h-full`} ><img src={Logo} className="h-full"/></figure>
                    <div className="flex items-end"><p className={`${addressOrderStyleFront}`}>{addressOrderTxtFront}</p></div>
                </div>
                <div className={`${contentWrapStyleFront}`}>
                    <div className={`${nameWrapStyleFront}`}><p className={`${nameStyleFront}`}>{nameTxtFront}</p></div>
                    <div className={`${phoneStyleFront}`}>{phoneTxtFront}</div>
                    <div className={`${addressWrapStyleFront}`}><p className="leading-3">{addressTextFront}</p></div>
                </div>
                {/* テキストが空なら非表示 */}
                {ribbonTextFront ? <div class="label_inner"><span className={`${ribbonStyleFront}`}>{ribbonTextFront}</span></div>:''}
                {bottomRibbonTextFront?<div class="bottom_label_inner"><span className={`${bottomRibbonStyleFront}`}>{bottomRibbonTextFront}</span></div>:''}
            </div>
            <div className={`${itemWrapStyleBack}`}>
                <div className={`${headerWrapStyleBack}`}>
                    <figure className={`h-full`} ><img src={Logo} className="h-full"/></figure>
                    <div className="flex items-end"><p className={`${addressOrderStyleBack}`}>{addressOrderTxtleBack}</p></div>
                </div>
                <div className={`${contentWrapStyleBack}`}>
                        <div className={`${nameWrapStyleBack}`}><p className={`${nameStyleBack}`}>{nameTxtBack}</p></div>
                        <div className={`${phoneStyleBack}`}>{phoneTxtBack}</div>
                        <div className={`${addressWrapStyleBack}`}><p className="leading-3">{addressTextBack}</p></div>
                </div>
                {/* テキストが空なら非表示 */}
                {ribbonTextBack ? <div class="label_inner"><span className={`${ribbonStyleBack}`}>{ribbonTextBack}</span></div>:''}
                {bottomRibbonTextBack?<div class="bottom_label_inner"><span className={`${bottomRibbonStyleBack}`}>{bottomRibbonTextBack}</span></div>:''}
            </div>
        </div>
    );
}