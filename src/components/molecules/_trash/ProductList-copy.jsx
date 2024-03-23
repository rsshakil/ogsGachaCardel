import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from "recoil";
import { productListStateMultilingual } from "../../../store/recoil/productListStateMultilingual";
import { userState } from "../../../store/recoil/userState";
import { Headline } from "../../atoms/text/Headline";
import '../../css/ProductList.css';
import {useIntl} from 'react-intl'
// import { useNavigate } from 'react-router-dom';

///////////////////
let productWrapStyle = 'aspect-[3/2] w-full overflow-hidden rounded cursor-pointer';
let productBgStyle = 'transition transform duration-150 ease-in w-full h-full bg-no-repeat bg-cover bg-center hover:scale-125';
let gachaTotalCount;
let gachaRemainingCount;
let gachaSinglePoint;
let remainingRate;
let remainingLevel;

///////////////////





export const ProductList = () => {
    const [productListArray, setProductList] = useRecoilState(productListStateMultilingual);
    console.log("[ProductList]productListArray==>",productListArray)
    const [UserStateObj, setUserState] = useRecoilState(userState);
    console.log("[ProductList]UserStateObj==>",UserStateObj)
    const navigate = useNavigate();
    const intl = useIntl()
    // console.log("[ProductList]", productListArray)
    //  ページ遷移
    function go2gacha(e) {
        // console.log("[ProductList]go2gacha====>e",e)
        // console.log("[ProductList]go2gacha====>e.data",e.data)
        console.log("[ProductList]go2gacha====>e.data.gachaTranslateId=====>",e.data.gachaTranslateId)
        navigate('/gacha/p-' + e.data.gachaId);

        // console.log("[setModalState]", e.key)
        // let pagePath = e.path
        // let pageName = e.data.name;
        // let pageParam = e.data.id;
        // if (pagePath=='/payment-request-detail' || pagePath=='/invoice-detail') { 
        //     pageName = e.data.rowName;
        //     pageParam = pageName.replace(/年|月/g, ""); 
        // }
         

    }
    //  言語ごとの商品取り出し
    let languageResource;
    languageResource = UserStateObj.languageResource;
    console.log("[ProductList]UserStateObj.languageResource==>",UserStateObj.languageResource)
    let translationObj;
    translationObj = productListArray[languageResource];
    console.log("[ProductList]UserStateObj.languageResource==>",productListArray[languageResource])

    return (
    <>        
        <section id="contentWrap" className={`flex justify-center bg-gradient-to-r from-black via-stone-700 to-black text-white py-8 px-4`}>
            <div className="w-256 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                <Headline 
                    spanClass='text-center text-sm text-white'
                    headlineText='PICKUP ITEM'
                    headlineClass='text-center text-5xl font-bold font-Prompt text-white sm:col-span-2 lg:col-span-3 flex flex-col'
                    type='h1'
                    spanText={`${intl.formatMessage({ id: 'Carefully_selected_original_pack' })}`}
                    
                    />

                {Object.keys(translationObj).map((productKey) => {
                    console.log("[ProductList]productKey===>", productKey)
                    console.log("[ProductList]productListArray[productKey]===>", translationObj[productKey])
                    console.log("[ProductList]productListArray[productKey].productThumbnail===>", translationObj[productKey].productThumbnail)

                    ///////////////////////////////
                    // set fron json
                    ///////////////////////////////
                    // gachaRemainingCount = Math.floor( Math.random() * ( 30000 - 0 ) + 0);
                    // gachaRemainingCount = 2;
                    gachaRemainingCount = translationObj[productKey].gachaRemainingCount;
                    // gachaTotalCount = 30000; // set dummy
                    gachaTotalCount = translationObj[productKey].gachaTotalCount;
                    // gachaSinglePoint = 99999 // set dummy
                    gachaSinglePoint =  translationObj[productKey].gachaSinglePoint;
                    ///////////////////////////////

                    ///////////////////////////////
                    // rate calculation
                    ///////////////////////////////
                    remainingRate = Math.floor(gachaRemainingCount / gachaTotalCount * 100);
                    console.log("[ProductList]remainingRate", remainingRate)
                    remainingLevel = Math.floor(remainingRate / 5)*5;
                    console.log("[ProductList]remainingLevel", remainingLevel)
                    if(gachaRemainingCount === 0){
                        remainingLevel = "empty"
                    }

                    return (
                        <>
                            <div 
                                id={`${productKey}-Wrap`}
                                className={`${productWrapStyle}`}
                                // onClick={go2gacha}
                                title={`${translationObj[productKey].gachaTranslateName} | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}
                                onClick={(e) => go2gacha({data:translationObj[productKey]})}
                                >
                                    <figure 
                                        id={productKey}
                                        className={`${productBgStyle}`}
                                        style={{ backgroundImage: `url(${translationObj[productKey].gachaTranslateImageMain})` }}
                                    >
                                        <img className="hidden" src={`${translationObj[productKey].gachaTranslateImageMain}`} alt={`${translationObj[productKey].gachaTranslateName}-IMAGE | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}></img>
                                    </figure>
                                    <div className="product-footer-wrap relative w-full bottom-9 h-8 flex flex-row justify-between">
                                        <div className="flex-none w-32 items-end flex">
                                            <p className="remaining-number  rounded-2xl pl-1 ml-2 font-Roboto font-black text-md w-full">{gachaRemainingCount.toLocaleString()}/{gachaTotalCount.toLocaleString()}</p>
                                        </div>
                                        <div className={`product-footer-panel--life-${remainingLevel} grow flex justify-between self-center max-w-xs`}>
                                            {/* <div className="ml-[3%] w-[44%] bg-gradient-to-r from-red-700 via-amber-600 to-lime-600 bg-gradient-t-to-b "></div> */}
                                            <div className="pl-[10%] ">
                                                <p className="product-footer-name relative font-Roboto font-bold left-1 self-center"></p>
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="leading-8 font-Noto text-xs -bottom-0.5">
                                                    {intl.formatMessage({ id: 'card_number' },{ number: 1 })}
                                                </p>
                                                <p className="leading-8 text-sm font-Roboto font-black">{gachaSinglePoint.toLocaleString()}</p>
                                                <p className="leading-8 pr-1 font-Noto text-xs -bottom-0.5">pt</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </>
                    );
                })}
                <Headline 
                    type="h2"
                    spanText={intl.formatMessage({ id: 'Bonus_oripa' })}
                    spanClass="text-center text-sm text-white"
                    headlineText="BONUS ITEM"
                    headlineClass="text-center text-5xl font-bold font-Prompt text-white sm:col-span-2 lg:col-span-3 flex flex-col"
                />

            </div>
        </section>
    </>
    );
};


