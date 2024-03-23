import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import '../../../../css/item.css';

import {useIntl,FormattedDate} from 'react-intl'
import { AddressCard } from "../../../atoms/cards/AddressCard";
import { AddAddressCard } from "../../../atoms/cards/AddAddressCard";


export const ContentShowShippingAddress = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[ContentShowShippingAddress]UserStateObj==>", UserStateObj);
    // console.log("[ContentShowShippingAddress]modalStateValue==>", modalStateValue);

    ////////////////////////////////
    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentShowShippingAddress]languageResource==>", languageResource);

 

    ////////////////////////////////
    //  選択したアイテムの状態を反転させる
    //  選択していないアイテムの状態を非選択にする
    //  
    let selectKey;
    let shippingUUID;
    function doEditShippingAddres(e) {
        // console.log("[ContentShowShippingAddress]doEditShippingAddres e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'editShippingAddress',
            mode: "edit",
            data: {formData:e}
        }))
    }
    function doCreateShippingAddres(e){
        // console.log("[ContentShowShippingAddress]doCreateShippingAddres e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'createShippingAddress',
            mode: "edit",
            data: {
                formData:{
                    userShippingName: '',
                    userShippingZipcode: '', 
                    userShippingAddress: '',
                    userShippingAddress2: '',
                    userShippingAddress3: '',
                    userShippingAddress4: '',
                    userShippingTelCountryCode: '',
                    userShippingTelCCValue: '',
                    userShippingTel: '',
                    userShippingPriorityFlag:0
                },
                errorMessages:{
                    userShippingName: null, 
                    userShippingZipcode: null, 
                    userShippingAddress: null, 
                    userShippingAddress2: null, 
                    userShippingAddress3: null, 
                    userShippingTel: null
                }
        }
        }))
    }

    //  選択したアイテムのフラグClass
    let isSlected = '';
    //  発送制限の文言
    let unable2ShipRibbonText = '';
    //  アドレスナンバリング
    let shippingAddressIndex = 0;




    
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center h-fit">
            {Object.keys(UserStateObj.myShippingAddress).map(key => {
                // console.log("[ContentShowShippingAddress]key==>", key);
                // console.log("[ContentShowShippingAddress]UserStateObj.myCollection[key]==>", UserStateObj.myShippingAddress[key]);
                //  ナンバリング
                shippingAddressIndex = shippingAddressIndex + 1;

                //  選択済みかどうか
                // if([1, true, "1", "true"].includes(UserStateObj.myShippingAddress[key].isItemSelected)) {
                //     isSlected = 'isSlected'
                // }else{
                //     isSlected = ''
                // }
                // console.log("[ContentShowShippingAddress]isSlected==>", isSlected);

                //  既定の送付先があるかどうか
                if(UserStateObj.myShippingAddress[key].userShippingPriorityFlag === 1) {
                    unable2ShipRibbonText  = intl.formatMessage({ id: 'Default_shipping_address' });
                }else{
                    unable2ShipRibbonText  = '';
                }
                // console.log("[ContentShowShippingAddress]unable2ShipRibbonText==>", unable2ShipRibbonText);

                //////////////////////////////////////////////////////////////////////
                //  アドレス結合
                let {
                    userShippingZipcode = '',
                    userShippingAddress = '',
                    userShippingAddress2 = '',
                    userShippingAddress3 = '',
                    userShippingAddress4 = '',
                } = UserStateObj.myShippingAddress[key];

                let addressText = userShippingZipcode + " " + userShippingAddress;
                if(userShippingAddress2) addressText += userShippingAddress2;
                if(userShippingAddress3) addressText += userShippingAddress3;
                if(userShippingAddress4) addressText += userShippingAddress4;
                //  アドレス結合
                //////////////////////////////////////////////////////////////////////

                return (
                
                <div
                    key={key} 
                    id={key}
                    className=""
                    onClick={(e) => doEditShippingAddres(UserStateObj.myShippingAddress[key])}
                >
                    <AddressCard
                        data={{
                            key : key,
                            type : 'showCollection',
                            // userShippingId : UserStateObj.myShippingAddress[key].userShippingId,
                            //  選択済みかどうか
                            isSlected : isSlected,


                            itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                            itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                            itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                            //  header
                            headerWrapStyleFront : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                            headerWrapStyleBack : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                            // addressOrderStyleFront : 'rarity text-right text-lg font-black font-Noto',
                            // addressOrderStyleBack : 'rarity text-right text-lg font-black font-Noto',
                            // addressOrderTxtFront : 'お届け先:' + shippingAddressIndex,
                            // addressOrderTxtleBack : 'お届け先:' + shippingAddressIndex,
                            //  content
                            contentWrapStyleFront : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                            contentWrapStyleBack : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                            //  name                    
                            nameWrapStyleFront : 'point-exchange grow flex items-center justify-center',
                            nameWrapStyleBack : 'point-exchange grow flex items-center justify-center',
                            nameStyleFront : 'text-lg xs:text-2xl sm:text-3xl font-black font-Roboto',
                            nameStyleBack : 'text-lg xs:text-2xl sm:text-3xl font-black font-Roboto',
                            nameTxtFront : UserStateObj.myShippingAddress[key].userShippingName,
                            nameTxtBack : UserStateObj.myShippingAddress[key].userShippingName,
                            //  phone
                            phoneStyleFront : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                            phoneStyleBack : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                            phoneTxtFront : UserStateObj.myShippingAddress[key].userShippingTel,
                            phoneTxtBack : UserStateObj.myShippingAddress[key].userShippingTel,
                            //  address
                            addressWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            addressWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            //❗️❗️❗️❗️❗️[↓↓ここで分割されたアドレスデータをさらに結合する↓↓]❗️❗️❗️❗️❗️
                            addressTextFront : addressText,
                            addressTextBack : addressText,
                            //❗️❗️❗️❗️❗️[↑↑ここで分割されたアドレスデータをさらに結合する↑↑]❗️❗️❗️❗️❗️
                            //  ribbon
                            ribbonStyleFront : 'ribbon font-Roboto',
                            ribbonStyleBack : 'ribbon ribbon-green font-Roboto',
                            ribbonTextFront : '',
                            ribbonTextBack : intl.formatMessage({ id: 'select' }) ,
                            //  bottomRibbon　裏表同じものでOK
                            bottomRibbonStyleFront : 'bottom-ribbon font-Roboto',
                            bottomRibbonStyleBack : 'bottom-ribbon font-Roboto',
                            bottomRibbonTextFront : unable2ShipRibbonText,
                            bottomRibbonTextBack : unable2ShipRibbonText,

                        }}
                    />
                </div>
                );
            })}
            <div

                className=""
                onClick={(e) => doCreateShippingAddres()}
            >
                <AddAddressCard
                    data={{
    
                        type : 'showCollection',
                        userShippingId : 'userShippingId',
                        //  選択済みかどうか
                        isSlected : isSlected,

                        itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                        itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                        itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                        //  header
                        headerWrapStyleFront : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                        headerWrapStyleBack : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                        addressOrderStyleFront : 'rarity text-right text-lg font-black font-Noto',
                        addressOrderStyleBack : 'rarity text-right text-lg font-black font-Noto',
                        //  content
                        contentWrapStyleFront : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                        contentWrapStyleBack : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                        //  name                    
                        nameWrapStyleFront : 'point-exchange grow flex items-center justify-center',
                        nameWrapStyleBack : 'point-exchange grow flex items-center justify-center',
                        nameStyleFront : 'text-lg xs:text-8xl sm:text-8xl font-black font-Roboto',
                        nameStyleBack : 'text-lg xs:text-8xl sm:text-8xl font-black font-Roboto',
                        nameTxtFront : '＋',
                        nameTxtBack : '＋',
                        //  phone
                        phoneStyleFront : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                        phoneStyleBack : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                        phoneTxtFront : intl.formatMessage({ id: 'Add_new_delivery_address' }),
                        phoneTxtBack : intl.formatMessage({ id: 'Add_new_delivery_address' }),
                        ribbonStyleFront : 'ribbon font-Roboto',
                        ribbonStyleBack : 'ribbon ribbon-green font-Roboto',
                        ribbonTextFront : '',
                        ribbonTextBack : intl.formatMessage({ id: 'select' }) ,
                        //  bottomRibbon　裏表同じものでOK
                        bottomRibbonStyleFront : 'bottom-ribbon font-Roboto',
                        bottomRibbonStyleBack : 'bottom-ribbon font-Roboto',
                        bottomRibbonTextFront : unable2ShipRibbonText,
                        bottomRibbonTextBack : unable2ShipRibbonText,
                    }}
                />
            </div>
        </div>
)

}