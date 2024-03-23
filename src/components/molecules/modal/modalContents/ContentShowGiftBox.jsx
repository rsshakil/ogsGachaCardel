import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import '../../../../css/item.css';

import {useIntl,FormattedDate} from 'react-intl'
import { AddressCard } from "../../../atoms/cards/AddressCard";
import { GiftCard } from "../../../atoms/cards/GiftCard";
import {unixTimestampToDateFormat} from "../../../../utils/commonFunctions";


export const ContentShowGiftBox = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[ContentShowGiftBox]UserStateObj==>", UserStateObj);
    // console.log("[ContentShowGiftBox]modalStateValue==>", modalStateValue);

    ////////////////////////////////
    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentShowGiftBox]languageResource==>", languageResource);

    ////////////////////////////////
    //  選択したアイテムの状態を反転させる
    //  選択していないアイテムの状態を非選択にする
    //  
    let selectKey;
    let shippingUUID;
    function itemSelected(e) {
        // console.log("[ContentShowGiftBox]選択したアイテム==>", e);
        // console.log("[ContentShowGiftBox]UserStateObj.myGiftCards==>", UserStateObj.myGiftCards);
        // console.log("[ContentShowGiftBox]選択した位置の裏表==>", UserStateObj.myGiftCards[e.key].isItemSelected);
        selectKey = e.key
        setUserState((prevState) => ({
            ...prevState,
                'myGiftCards': {
                    ...prevState.myGiftCards,
                    [e.key]: {
                        ...prevState.myGiftCards[e.key],
                        'isItemSelected' : !prevState.myGiftCards[e.key].isItemSelected
                    },
                }
        }))
    }

    //  選択したアイテムのフラグClass
    let isSlected = '';

    
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center h-fit">
            {Object.keys(UserStateObj.myGiftCards).map(key => {
                // console.log("[ContentShowGiftBox]key==>", key);
                // console.log("[ContentShowGiftBox]UserStateObj.myCollection[key]==>", UserStateObj.myGiftCards[key]);
                //  ナンバリング
                // shippingAddressIndex = shippingAddressIndex + 1;

                //  選択済みかどうか
                if([1, true, "1", "true"].includes(UserStateObj.myGiftCards[key].isItemSelected)) {
                    isSlected = 'isSlected'
                }else{
                    isSlected = ''
                }
                // console.log("[ContentShowGiftBox]isSlected==>", isSlected);


                return (
                
                <div
                    key={`ShowGiftBox-${key}`} 
                    id={key}
                    className=""
                    onClick={(e) => itemSelected({"key":key})}
                >
                    <GiftCard
                        key={key}
                        data={{
                            key : key,
                            type : 'ShowGiftBox',
                            userPresentId : UserStateObj.myGiftCards[key].userPresentId,
                            //  選択済みかどうか
                            isSlected : isSlected,


                            itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                            itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                            itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                            //  header
                            headerWrapStyleFront : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                            headerWrapStyleBack : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                            addressOrderStyleFront : 'rarity text-right text-sm font-black font-Noto',
                            addressOrderStyleBack : 'rarity text-right text-sm font-black font-Noto',
                            addressOrderTxtFront : intl.formatDate(unixTimestampToDateFormat(UserStateObj.myGiftCards[key].presentDeadlineAt), {year : 'numeric', month: 'numeric',day: 'numeric',}),
                            addressOrderTxtleBack : intl.formatDate(unixTimestampToDateFormat(UserStateObj.myGiftCards[key].presentDeadlineAt), {year : 'numeric', month: 'numeric',day: 'numeric',}),
                            
                            //  content
                            contentWrapStyleFront : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                            contentWrapStyleBack : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                            //  name                    
                            nameWrapStyleFront : 'point-exchange grow flex items-center justify-center',
                            nameWrapStyleBack : 'point-exchange grow flex items-center justify-center',
                            nameStyleFront : 'text-lg xs:text-4xl sm:text-3xl font-black font-Roboto',
                            nameStyleBack : 'text-lg xs:text-4xl sm:text-3xl font-black font-Roboto',
                            nameTxtFront : UserStateObj.myGiftCards[key].presentPoint,
                            nameTxtBack : UserStateObj.myGiftCards[key].presentPoint,
                            //  phone
                            phoneStyleFront : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                            phoneStyleBack : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                            phoneTxtFront : UserStateObj.myGiftCards[key].presentName,
                            phoneTxtBack : UserStateObj.myGiftCards[key].presentName,
                            //  address
                            // addressWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            // addressWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            // addressTextFront : UserStateObj.myGiftCards[key].userShippingZipcode + " " + UserStateObj.myGiftCards[key].userShippingAddress,
                            // addressTextBack : UserStateObj.myGiftCards[key].userShippingZipcode + " " + UserStateObj.myGiftCards[key].userShippingAddress,
                            //  ribbon
                            ribbonStyleFront : 'ribbon font-Roboto',
                            ribbonStyleBack : 'ribbon ribbon-green font-Roboto',
                            ribbonTextFront : '',
                            ribbonTextBack : intl.formatMessage({ id: 'select' }) ,
                            //  bottomRibbon　裏表同じものでOK
                            // bottomRibbonStyleFront : 'bottom-ribbon font-Roboto',
                            // bottomRibbonStyleBack : 'bottom-ribbon font-Roboto',
                            // // bottomRibbonTextFront : unable2ShipRibbonText,
                            // // bottomRibbonTextBack : unable2ShipRibbonText,

                        }}
                    />
                </div>
                );
            })}
        </div>
)

}