import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams, useParams } from "react-router-dom";
import { productListStateMultilingual } from "../../store/recoil/productListStateMultilingual";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";
import { lillieLogState } from "../../store/recoil/lillieLogState";
import '../../css/Detail.css';
import {useIntl} from 'react-intl'
import * as queries from "../../restapi/queries";
import { AddressCard } from "../atoms/cards/AddressCard";



export const LillieDetail = () => {
    const intl = useIntl()

    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [lillieLogObj, setLillieLogState] = useRecoilState(lillieLogState);

    //  ユーザーに割り当てられた利用言語
    let languageResource;
    languageResource = UserStateObj.languageResource;



    return (
        <div id="ProductDetail" className="p-4 grid grid-cols-1 gap-2 bg-gradient-to-r from-black via-stone-700 to-black text-white">
            <div className="py-4">
                <h1 className="text-center text-2xl font-bold font-Prompt text-white sm:col-span-2 lg:col-span-3 flex flex-col">
                神神エクバリーリエ降臨
                    <small className="text-center text-sm text-white">
                    お年玉史上最高額の7,480,000ptを引き当てたのは！？
                    </small>
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 py-8 gap-4">
                <AddressCard
                    data={{
                        type : 'showCollection',
                        userShippingId : '',
                        //  選択済みかどうか
                        isSlected : '',
                        itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                        itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                        itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                        //  header
                        headerWrapStyleFront : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                        headerWrapStyleBack : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                        addressOrderStyleFront : 'rarity text-right text-2xl font-black font-Noto',
                        addressOrderStyleBack : 'rarity text-right text-2xl font-black font-Noto',
                        addressOrderTxtFront : '神賞',
                        addressOrderTxtleBack : intl.formatMessage({ id: 'Shipping_Address' }),
                        // addressOrderTxtFront : intl.formatMessage({ id: 'Shipping_Address' }) + shippingAddressIndex,
                        // addressOrderTxtleBack : intl.formatMessage({ id: 'Shipping_Address' }) + shippingAddressIndex,
                        //  content
                        contentWrapStyleFront : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                        contentWrapStyleBack : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                        //  name                    
                        nameWrapStyleFront : 'point-exchange grow flex items-center justify-center',
                        nameWrapStyleBack : 'point-exchange grow flex items-center justify-center',
                        nameStyleFront : 'text-6xl xs:text-6xl sm:text-6xl font-black font-Roboto',
                        nameStyleBack : 'text-6xl xs:text-6xl sm:text-6xl font-black font-Roboto',
                        nameTxtFront : 'リーリエ',
                        nameTxtBack : 'リーリエ',
                        // nameTxtFront : UserStateObj.myShippingAddress[key].userShippingName,
                        // nameTxtBack : UserStateObj.myShippingAddress[key].userShippingName,
                        //  phone
                        phoneStyleFront : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                        phoneStyleBack : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                        phoneTxtFront : '……o………k……@…u…………c……',
                        phoneTxtBack : '……o………k……@…u…………c……',
                        //  address
                        addressWrapStyleFront : 'justify-center itemAttribute-shadow flex flex-row text-base my-2 font-medium font-Noto tracking-tight',
                        addressWrapStyleBack : 'justify-center itemAttribute-shadow flex flex-row text-base my-2 font-medium font-Noto tracking-tight',
                        //❗️❗️❗️❗️❗️[↓↓ここで分割されたアドレスデータをさらに結合する↓↓]❗️❗️❗️❗️❗️
                        addressTextFront : '#1448',
                        addressTextBack : '#1448',
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
                <AddressCard
                    data={{
                        type : 'showCollection',
                        userShippingId : '',
                        //  選択済みかどうか
                        isSlected : '',
                        itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                        itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                        itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-1 grid-rows-4 p-2',
                        //  header
                        headerWrapStyleFront : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                        headerWrapStyleBack : 'row-span-1 border-b pb-1 flex flex-row justify-between',
                        addressOrderStyleFront : 'rarity text-right text-2xl font-black font-Noto',
                        addressOrderStyleBack : 'rarity text-right text-2xl font-black font-Noto',
                        addressOrderTxtFront : 'リーリエ賞',
                        addressOrderTxtleBack : 'リーリエ賞',
                        // addressOrderTxtFront : intl.formatMessage({ id: 'Shipping_Address' }) + shippingAddressIndex,
                        // addressOrderTxtleBack : intl.formatMessage({ id: 'Shipping_Address' }) + shippingAddressIndex,
                        //  content
                        contentWrapStyleFront : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                        contentWrapStyleBack : 'row-span-3 flex flex-col items-stretch content-between w-full overflow-hidden',
                        //  name                    
                        nameWrapStyleFront : 'point-exchange grow flex items-center justify-center',
                        nameWrapStyleBack : 'point-exchange grow flex items-center justify-center',
                        nameStyleFront : 'text-6xl xs:text-6xl sm:text-6xl font-black font-Roboto',
                        nameStyleBack : 'text-6xl xs:text-6xl sm:text-6xl font-black font-Roboto',
                        nameTxtFront : 'リーリエ',
                        nameTxtBack : 'リーリエ',
                        // nameTxtFront : UserStateObj.myShippingAddress[key].userShippingName,
                        // nameTxtBack : UserStateObj.myShippingAddress[key].userShippingName,
                        //  phone
                        phoneStyleFront : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                        phoneStyleBack : 'rarity leading-5 text-canter text-base font-black font-Roboto self-center',
                        phoneTxtFront : '……………9…@t…t……………a……o…',
                        phoneTxtBack : '……………9…@t…t……………a……o…',
                        //  address
                        addressWrapStyleFront : 'justify-center itemAttribute-shadow flex flex-row text-base my-2 font-medium font-Noto tracking-tight',
                        addressWrapStyleBack : 'justify-center itemAttribute-shadow flex flex-row text-base my-2 font-medium font-Noto tracking-tight',
                        //❗️❗️❗️❗️❗️[↓↓ここで分割されたアドレスデータをさらに結合する↓↓]❗️❗️❗️❗️❗️
                        addressTextFront : '#2000',
                        addressTextBack : '#2000',
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

            {lillieLogObj.map((History) => {
                let data = History.m
                //  Json自体が加工されていればここでのマスク処理は不要
                // data = data.split('')
                // for (var i = 2; i < data.length; i++) {
                //     if (data[i] === '@') {
                //         break
                //     }
                //     data[i] = '*'
                // }
                // data = data.join('')
                return (
                    <div className="">
                        <div className="flex text-sm">
                            <div className="grow-0">{History.o}</div>
                            <div className="grow pl-2">{data}</div>
                        </div>
                        <div className="col-span-2 font-bold">{History.i}</div>
                    </div>
                );
            })}
        </div>
    );
};


