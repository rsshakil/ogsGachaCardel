import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import '../../../../css/item.css';

import {useIntl,FormattedDate} from 'react-intl'
import { AddressCard } from "../../../atoms/cards/AddressCard";
import { GiftCard } from "../../../atoms/cards/GiftCard";
import { PointCard } from "../../../atoms/cards/PointCard";
import { debugState } from "../../../../store/recoil/debugState";
    


export const ContentShowChargeList = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[ContentShowChargeList]UserStateObj==>", UserStateObj);
    // console.log("[ContentShowChargeList]modalStateValue==>", modalStateValue);
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    ////////////////////////////////
    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentShowChargeList]languageResource==>", languageResource);

 

    ////////////////////////////////
    //  選択したアイテムの状態を反転させる
    //  選択していないアイテムの状態を非選択にする
    //  
    let selectData;
    let shippingUUID;
    function itemSelected(e) {
        // console.log("[ContentShowChargeList]選択したアイテム==>", e);
        // console.log("[ContentShowChargeList]UserStateObj.myChargeList==>", UserStateObj.myChargeList);
        // console.log("[ContentShowChargeList]選択した位置の裏表==>", UserStateObj.myChargeList[e.key].isItemSelected);
        selectData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'MethodOfPayment',
            // mode: "edit",
            data: selectData
        }))
    }

    //  選択したアイテムのフラグClass
    let isSlected = '';

    //testDemoCardAdded when debugMode is true
    let customChargeList = {};
    if(debugStateValue.isDebug){
        customChargeList = {
            // '550e8400-e29b-41d4-a717-446655440007':{
            //     "userChargeUUID": 9,
            //     "userChargePointPattern": 9,
            //     "userChargeName": "CARDEL.ONLINE 10",
            //     "userChargePoint": 10,
            //     "userChargePrice": 10,
            //     "hasCardStripe": false,
            //     "hasCardEpsilon": true,
            //     "hasBankStripe": false,
            //     "hasBankEpsilon": false,
            //     "hasBankManual": false,
            //     "hasPaypayEpsilon": false,
            //     "hasConvenienceStore": false,
            //     "hasEMoney": false
            // },
            '550e8400-e29b-41d4-a717-446655440000':{
                'chargeSelected' : false,
                'userChargeUUID' : '550e8400-e29b-41d4-a717-446655440000',
                'userChargeName' : 'CARDEL.ONLINE000500',
                'userChargeLimit' : 0,
                'userChargePoint' : 500,
                "userChargePrice": 500,
                'userChargePointPattern' : 1,
                "hasCardStripe": false,
                "hasCardEpsilon": true,
                "hasBankStripe": false,
                "hasBankEpsilon": false,
                "hasBankManual": false,
                "hasPaypayEpsilon": false,
                "hasConvenienceStore": false,
                "hasPointPaypay":false,
                "hasEMoney": false
        
            },
        }
    }


    let filteredPointList = [];
    if(debugStateValue.isDebug) filteredPointList = UserStateObj.myChargeList;
    else filteredPointList = Object.fromEntries(Object.entries(UserStateObj.myChargeList).filter(([key, item]) => item.pointStatus != 2)); //Get only active points
    
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center h-fit">
            {Object.keys(filteredPointList).sort((a,b) => filteredPointList[a].userPointOrder - filteredPointList[b].userPointOrder).map(key => {
                // console.log("[ContentShowChargeList]key==>", key);
                // console.log("[ContentShowChargeList]UserStateObj.myCollection[key]==>", UserStateObj.myChargeList[key]);
                //  ナンバリング
                // shippingAddressIndex = shippingAddressIndex + 1;

                //  選択済みかどうか
                if([1, true, "1", "true"].includes(filteredPointList[key]?.isItemSelected)) {
                    //　今回裏にはならない
                    isSlected = ''
                }else{
                    isSlected = ''
                }
                // console.log("[ContentShowChargeList]isSlected==>", isSlected);


                return (
                
                <div
                    key={`ShowChargeList-${key}`} 
                    id={key}
                    className=""
                    onClick={(e) => itemSelected({
                        "key":key, 
                        "chargePoint":filteredPointList[key].userChargePointPattern,
                        "userChargePoint" : filteredPointList[key].userChargePoint,
                    
                    })}
                >
                    <PointCard
                        key={key}
                        data={{
                            key : key,
                            type : 'ShowGiftBox',
                            userShippingId : filteredPointList[key]?.userGiftUUID,
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
                            addressOrderTxtFront : intl.formatMessage({ id: 'Purchase_points' }) ,
                            addressOrderTxtleBack : intl.formatMessage({ id: 'Purchase_points' }) ,
                            
                            //  content
                            contentWrapStyleFront : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                            contentWrapStyleBack : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                            //  name                    
                            nameWrapStyleFront : 'point-exchange grow flex items-center justify-center',
                            nameWrapStyleBack : 'point-exchange grow flex items-center justify-center',
                            nameStyleFront : 'text-lg xs:text-4xl sm:text-5xl font-black font-Roboto',
                            nameStyleBack : 'text-lg xs:text-4xl sm:text-5xl font-black font-Roboto',
                            nameTxtFront : filteredPointList[key].userChargePoint,
                            nameTxtBack : filteredPointList[key].userChargePoint,
                            //  phone
                            phoneStyleFront : 'rarity leading-5 text-canter text-base font-black font-Libre self-center',
                            phoneStyleBack : 'rarity leading-5 text-canter text-base font-black font-Libre self-center',
                            phoneTxtFront : filteredPointList[key].userChargeName + ' ' + intl.formatDate(new Date(), {year: 'numeric',month: '2-digit',day: '2-digit',hour: '2-digit', minute:'2-digit',}),
                            phoneTxtBack : filteredPointList[key].userChargeName + ' ' + new Date().toLocaleString(),
                            
                            //  address
                            // addressWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            // addressWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            // addressTextFront : UserStateObj.myChargeList[key].userShippingZipcode + " " + UserStateObj.myChargeList[key].userShippingAddress,
                            // addressTextBack : UserStateObj.myChargeList[key].userShippingZipcode + " " + UserStateObj.myChargeList[key].userShippingAddress,
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

                            //　決済可能種別アイコンのフラグ
                            hasBankEpsilon : filteredPointList[key].hasBankEpsilon,
                            hasBankManual : filteredPointList[key].hasBankManual,
                            hasBankStripe : filteredPointList[key].hasBankStripe,
                            hasCardEpsilon : filteredPointList[key].hasCardEpsilon,
                            hasCardStripe : filteredPointList[key].hasCardStripe,
                            hasPaypayEpsilon : filteredPointList[key].hasPaypayEpsilon,
                            hasPointPaypay : filteredPointList[key]?.hasPointPaypay,
                            hasConvenienceStore : filteredPointList[key].hasConvenienceStore,
                            hasEMoney : filteredPointList[key].hasEMoney,

                        }}
                    />
                </div>
                );
            })}

            {/* {debugStateValue.isDebug && Object.keys(customChargeList).length>0 && Object.keys(customChargeList).map(key => {
                // console.log("[ContentShowChargeList]key==>", key);
                // console.log("[ContentShowChargeList]UserStateObj.myCollection[key]==>", UserStateObj.myChargeList[key]);
                //  ナンバリング
                // shippingAddressIndex = shippingAddressIndex + 1;

                //  選択済みかどうか
                if([1, true, "1", "true"].includes(customChargeList[key]?.isItemSelected)) {
                    //　今回裏にはならない
                    isSlected = ''
                }else{
                    isSlected = ''
                }
                // console.log("[ContentShowChargeList]isSlected==>", isSlected);


                return (
                
                <div
                    key={`ShowChargeList-${key}`} 
                    id={key}
                    className=""
                    onClick={(e) => itemSelected({
                        "key":key, 
                        "chargePoint":customChargeList[key].userChargePointPattern,
                        "userChargePoint" : customChargeList[key].userChargePoint,
                    
                    })}
                >
                    <PointCard
                        key={key}
                        data={{
                            key : key,
                            type : 'ShowGiftBox',
                            userShippingId : customChargeList[key]?.userGiftUUID,
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
                            addressOrderTxtFront : intl.formatMessage({ id: 'Purchase_points' }) ,
                            addressOrderTxtleBack : intl.formatMessage({ id: 'Purchase_points' }) ,
                            
                            //  content
                            contentWrapStyleFront : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                            contentWrapStyleBack : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                            //  name                    
                            nameWrapStyleFront : 'point-exchange grow flex items-center justify-center',
                            nameWrapStyleBack : 'point-exchange grow flex items-center justify-center',
                            nameStyleFront : 'text-lg xs:text-4xl sm:text-5xl font-black font-Roboto',
                            nameStyleBack : 'text-lg xs:text-4xl sm:text-5xl font-black font-Roboto',
                            nameTxtFront : customChargeList[key].userChargePoint,
                            nameTxtBack : customChargeList[key].userChargePoint,
                            //  phone
                            phoneStyleFront : 'rarity leading-5 text-canter text-base font-black font-Libre self-center',
                            phoneStyleBack : 'rarity leading-5 text-canter text-base font-black font-Libre self-center',
                            phoneTxtFront : customChargeList[key].userChargeName + ' ' + intl.formatDate(new Date(), {year: 'numeric',month: '2-digit',day: '2-digit',hour: '2-digit', minute:'2-digit',}),
                            phoneTxtBack : customChargeList[key].userChargeName + ' ' + new Date().toLocaleString(),
                            
                            //  address
                            // addressWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            // addressWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            // addressTextFront : UserStateObj.myChargeList[key].userShippingZipcode + " " + UserStateObj.myChargeList[key].userShippingAddress,
                            // addressTextBack : UserStateObj.myChargeList[key].userShippingZipcode + " " + UserStateObj.myChargeList[key].userShippingAddress,
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

                            //　決済可能種別アイコンのフラグ
                            hasBankEpsilon : customChargeList[key].hasBankEpsilon,
                            hasBankManual : customChargeList[key].hasBankManual,
                            hasBankStripe : customChargeList[key].hasBankStripe,
                            hasCardEpsilon : customChargeList[key].hasCardEpsilon,
                            hasCardStripe : customChargeList[key].hasCardStripe,
                            hasPaypayEpsilon : customChargeList[key].hasPaypayEpsilon,
                            hasPointPaypay : customChargeList[key].hasPointPaypay,
                            hasConvenienceStore : customChargeList[key].hasConvenienceStore,
                            hasEMoney : customChargeList[key].hasEMoney,

                        }}
                    />
                </div>
                );
            })} */}
        </div>
)

}