import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import '../../../../css/item.css';
import { BaseCard } from "../../../atoms/cards/BaseCard";
// import { BaseCard } from "../../../atoms/cards/BaseCard";
import {useIntl,FormattedDate} from 'react-intl'
import { Headline } from "../../../atoms/text/Headline";
import { AddressCard } from "../../../atoms/cards/AddressCard";
import { PointCard } from "../../../atoms/cards/PointCard";


export const ContentMetodOfPaymentConfirm = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[ContentMetodOfPaymentConfirm]UserStateObj==>", UserStateObj);
    // console.log("[ContentMetodOfPaymentConfirm]modalStateValue==>", modalStateValue);
    // console.log("[ContentMetodOfPaymentConfirm]modalStateValue.data.key==>", modalStateValue.data.key);

    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentMetodOfPaymentConfirm]languageResource==>", languageResource);

    ////////////////////////////////
    //  classの定義
    let pointExchangeStyleFront = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointExchangeStyleBack = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointUnitStyleFront = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    let pointUnitStyleBack = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    //  アイテムがない時のエラー処理作ること
    //
    ////////////////////////////////

    //  選択したアイテムのフラグClass
    let isSlected = '';
    //  アドレスナンバリング
    let shippingAddressIndex = 0;

    let userChargeKey = modalStateValue.data.key;

    return (
        <>
        <div className="w-full grid sm:grid-cols-4 gap-2 sm:gap-4 justify-center items-center h-fit">
            <Headline
                type="h2"
                headlineText={intl.formatMessage({ id: 'Points_to_purchase' })}
                headlineClass="sm:col-span-4 font-bold text-center text-base font-Prompt text-white flex flex-col py-2"
            />
                    <PointCard
                        data={{
                            key : userChargeKey,
                            type : 'ShowGiftBox',
                            userChargeUUID : userChargeKey,
                            //  選択済みかどうか
                            isSlected : isSlected,


                            itemOuterAreaStyle : 'itemOuter sm:col-start-2 sm:col-span-2 relative aspect-[3/2] w-full overflow-hidden',
                            itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                            itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
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
                            nameTxtFront : UserStateObj.myChargeList[userChargeKey]?.userChargePoint,
                            nameTxtBack : UserStateObj.myChargeList[userChargeKey]?.userChargePoint,
                            //  phone
                            phoneStyleFront : 'rarity leading-5 text-canter text-base font-black font-Libre self-center',
                            phoneStyleBack : 'rarity leading-5 text-canter text-base font-black font-Libre self-center',
                            phoneTxtFront : UserStateObj.myChargeList[userChargeKey]?.userChargeName + ' ' + intl.formatDate(new Date(), {year: 'numeric',month: '2-digit',day: '2-digit',hour: '2-digit', minute:'2-digit',}),
                            phoneTxtBack : UserStateObj.myChargeList[userChargeKey]?.userChargeName + ' ' + new Date().toLocaleString(),
                            
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

                            //  Payment type
                            hasBankEpsilon : UserStateObj?.myChargeList[userChargeKey]?.hasBankEpsilon,
                            hasBankManual : UserStateObj?.myChargeList[userChargeKey]?.hasBankManual,
                            hasBankStripe : UserStateObj?.myChargeList[userChargeKey]?.hasBankStripe,
                            hasCardEpsilon : UserStateObj.myChargeList[userChargeKey]?.hasCardEpsilon,
                            hasCardStripe : UserStateObj.myChargeList[userChargeKey]?.hasCardStripe,
                            hasPaypayEpsilon : UserStateObj.myChargeList[userChargeKey]?.hasPaypayEpsilon,
                            hasPointPaypay : UserStateObj.myChargeList[userChargeKey]?.hasPointPaypay,
                            hasConvenienceStore : UserStateObj.myChargeList[userChargeKey]?.hasConvenienceStore,
                            hasEMoney : UserStateObj.myChargeList[userChargeKey]?.hasEMoney,

                        }}
                    />

            <Headline
                type="h2"
                headlineText={intl.formatMessage({ id: 'Payment_method' })}
                headlineClass="sm:col-span-4 font-bold text-center text-base font-Prompt text-white flex flex-col py-2"
            />

            {/* <div className="sm:col-span-4">
                <p className="font-bold">{intl.formatMessage({ id: 'Under_maintenance_information_of_credit' })}</p>
                <p className="text-sm">{intl.formatMessage({ id: 'Scheduled_start_date_and_time' })} 3/18 AM 2:00</p>
                <p className="text-sm">{intl.formatMessage({ id: 'Scheduled_end_date_and_time' })} 3/18 AM 4:00</p>
                <p className="text-xs">{intl.formatMessage({ id: 'If_you_make_a_payment_during_the_above_hours__an_error_may_occur__Please_make_the_payment_again_after_the_maintenance_is_completed' })}</p>
            </div> */}
            <p className="sm:col-span-4">{intl.formatMessage({ id: 'Please_select_from_the_buttons_at_the_bottom' })}</p>

        </div>
        
        </>
)}