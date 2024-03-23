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


export const ContentShippingConfirm = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[ContentShippingConfirm]UserStateObj==>", UserStateObj);
    // console.log("[ContentShippingConfirm]modalStateValue==>", modalStateValue);

    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentShippingConfirm]languageResource==>", languageResource);

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

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center h-fit">
            <Headline
                type="h2"
                headlineText={intl.formatMessage({ id: 'Card_to_be_shipped' })}
                headlineClass="sm:col-span-2 font-bold text-center text-base font-Prompt text-white flex flex-col py-4"
            />
            {Object.keys(UserStateObj.myCollection).map(key => {
                // console.log("[ContentShippingConfirm]key==>", key);
                // console.log("[ContentShippingConfirm]UserStateObj.myCollection[key]==>", UserStateObj.myCollection[key]);
                //  ポイント０や文字量を考慮
                if(UserStateObj.myCollection[key].itemPoint === 0) {
                }else if (UserStateObj.myCollection[key].itemPoint > 999999){
                    pointExchangeStyleFront = 'text-left text-xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
                }else if (UserStateObj.myCollection[key].itemPoint > 99999){
                    pointExchangeStyleFront = 'text-left text-2xl sm:text-2xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-2xl sm:text-2xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
                }else if (UserStateObj.myCollection[key].itemPoint > 9999){
                    pointExchangeStyleFront = 'text-left text-3xl sm:text-3xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-3xl sm:text-3xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-2 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-2 sm:pt-1';
                }else if (UserStateObj.myCollection[key].itemPoint > 999){
                    pointExchangeStyleFront = 'text-left text-4xl sm:text-3xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-4xl sm:text-3xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-2 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-2 sm:pt-1';
                }else {
                    pointExchangeStyleFront = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-5xl sm:text-3xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-3 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-3 sm:pt-1';
                }
                //  選択済みを表示
                if([1, true, "1", "true"].includes(UserStateObj.myCollection[key].isItemSelected)) {
                    return (
                        <div key={`ShippingConfirm-${key}`} id={key} className="">
                            <BaseCard
                                key={key}
                                data={{
                                    key : key,
                                    type : 'showWaiting4Shipping',
                                    emissionUUID : UserStateObj.myCollection[key].emissionUUID,
                                    //  選択済みかどうか
                                    isSlected : isSlected,
                                    //  画像のパス
                                    itemImagePath1 : UserStateObj.myCollection[key].itemImagePath1,
                                    itemImagePath2 : '',
                                    itemImagePath3 : '',
                                    itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                                    itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-2',
                                    itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-2',
                                    itemFigureAlt : '',
                                    rightSideBottomStyleFront : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',
                                    rightSideBottomStyleBack : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',
                                    //  pointExchange
                                    pointExchangeText : UserStateObj.myCollection[key].itemPoint?.toLocaleString(), //.toLocaleString()
                                    pointExchangeStyleFront : pointExchangeStyleFront,
                                    pointExchangeStyleBack : pointExchangeStyleBack,
                                    pointUnitStyleFront : pointUnitStyleFront,
                                    pointUnitStyleBack : pointUnitStyleBack,
                                    //  Rarity
                                    raritytext : UserStateObj.myCollection[key].itemAttribute4,
                                    rarityStyleFront : 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
                                    rarityStyleBack : 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
                                    //  appraisalRank
                                    appraisalRankText : UserStateObj.myCollection[key].itemAttribute5,
                                    appraisalRankStyleFront : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
                                    appraisalRankStyleBack : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
                                    //  itemName
                                    itemNameText : UserStateObj.myCollection[key].itemName,
                                    itemNameStyleFront : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                                    itemNameStyleBack  : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                                    itemAttributeWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                                    itemAttributeWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                                    //  Shipping request deadline
                                    shippingRequestDeadlineText : intl.formatMessage({ id: 'deadline' }) + ':' + intl.formatDate(UserStateObj.myCollection[key].shippingRequestDeadline, {month: 'numeric',day: 'numeric',}),
                                    shippingRequestDeadlineStyleFront : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                                    shippingRequestDeadlineStyleBack : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                                    //  ribbon
                                    ribbonStyleFront : 'ribbon font-Roboto',
                                    ribbonStyleBack : 'ribbon ribbon-green font-Roboto',
                                    ribbonTextFront : '',
                                    ribbonTextBack : '' ,
                                    //  bottomRibbon　裏表同じものでOK
                                    bottomRibbonStyleFront : 'bottom-ribbon font-Roboto',
                                    bottomRibbonStyleBack : 'bottom-ribbon font-Roboto',
                                    bottomRibbonTextFront : '',
                                    bottomRibbonTextBack : '',
                                    expansionSeriesText : UserStateObj.myCollection[key].itemAttribute2,
                                    serial : UserStateObj.myCollection[key].itemAttribute3,
                                }}
                            />
                        </div>
                    );
                }else{
                    //  選択していない
                }
                // console.log("[ContentShippingConfirm]isSlected==>", isSlected);
            })}
            <Headline
                type="h2"
                headlineText={intl.formatMessage({ id: 'Shipping_Address' })}
                headlineClass="sm:col-span-2 font-bold text-center text-base font-Prompt text-white flex flex-col py-4"
            />
           {Object.keys(UserStateObj.myShippingAddress).map(key => {
                // console.log("[ContentShippingConfirm]key==>", key);
                // console.log("[ContentShippingConfirm]UserStateObj.myCollection[key]==>", UserStateObj.myShippingAddress[key]);
                //  ナンバリング
                shippingAddressIndex = shippingAddressIndex + 1;

                //  選択済みかどうか
                if([1, true, "1", "true"].includes(UserStateObj.myShippingAddress[key].isItemSelected) === true) {
                    //  選択したアドレス
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
                        <div key={key} id={key} className="">
                            <AddressCard
                                data={{
                                    key : key,
                                    type : 'showCollection',
                                    userShippingId : UserStateObj.myShippingAddress[key].userShippingId,
                                    //  選択済みかどうか
                                    isSlected : isSlected,
    
                                    itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                                    itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                                    itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                                    //  header
                                    headerWrapStyleFront : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                                    headerWrapStyleBack : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                                    addressOrderStyleFront : 'rarity text-right text-lg font-black font-Noto',
                                    addressOrderStyleBack : 'rarity text-right text-lg font-black font-Noto',
                                    addressOrderTxtFront : intl.formatMessage({ id: 'Shipping_Address' }) + ':' + shippingAddressIndex,
                                    addressOrderTxtleBack : intl.formatMessage({ id: 'Shipping_Address' }) + ':' + shippingAddressIndex,
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
                                    bottomRibbonTextFront : '',
                                    bottomRibbonTextBack : '',
                                }}
                            />
                        </div>
                    );
                }else{
                    //  選択してないアドレス
                }
                // console.log("[ContentShippingConfirm]isSlected==>", isSlected);



            })}
            <Headline
                type="h2"
                headlineText={intl.formatMessage({ id: 'shipping_method' })}
                headlineClass="sm:col-span-2 font-bold text-center text-base font-Prompt text-white flex flex-col py-4"
            />
            <p className="sm:col-span-2 ">{intl.formatMessage({ id: 'Uses_300pt' })}
                <span>({intl.formatMessage({ id: 'deposit' })})</span></p>
            <p className="sm:col-span-2 ">※{intl.formatMessage({ id: '_200_points_will_be_returned_after_shipping_is_completed' })}</p>
            <p className="sm:col-span-2 ">※{intl.formatMessage({ id: 'It_may_take_up_to_2_weeks_for_shipping_to_be_completed' })}</p>
            <p className="sm:col-span-2 ">※{intl.formatMessage({ id: 'Depending_on_the_delivery_situation__it_may_take_several_days_from_shipping_to_delivery' })}</p>
            <p className="sm:col-span-2 ">※{intl.formatMessage({ id: 'The_address_currently_displayed_will_be_the_delivery_address__Please_be_careful_if_you_change_your_address_after_submitting_your_shipping_request' })}</p>
            <p className="sm:col-span-2 ">※{intl.formatMessage({ id: 'When_shipping_high_value_cards__we_may_take_special_measures_by_calling_you_in_advance' })}</p>
            <p className="sm:col-span-2 ">※{intl.formatMessage({ id: 'In_order_to_ensure_that_important_items_are_delivered_to_you__we_may_verify_your_identity_before_shipping__We_ask_for_your_cooperation_in_preventing_accidents_caused_by_account_hijacking' })}</p>
            
            <p className="sm:col-span-2 ">{intl.formatMessage({ id: 'Press_the_Confirm_button_to_confirm_the_shipping_request' })}</p>

        </div>
)}