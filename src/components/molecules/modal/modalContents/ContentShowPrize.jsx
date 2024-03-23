import React, { useRef, useState, useEffect, Suspense, useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/item.css';
import {useIntl,FormattedDate} from 'react-intl'
import { BaseCard } from "../../../atoms/cards/BaseCard";
import useSound from 'use-sound';
import {useInterval,useThrottle,useUpdateEffect} from 'react-use';

export const ContentShowPrize = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[ContentShowPrize]modalStateValue==>", modalStateValue);
    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;

    ////////////////////////////////
    //  カード配布音の部品
    //  カウント初期値
    const [dealCardsCount, setDealCardsCount] = React.useState(1);
    //  カウント間隔 1000=1秒
    const [dealCardsDelay, setDealCardsDelay] = React.useState(333);
    //  カウントループ開始停止
    const [isDealCardsCountRunning, setIsDealCardsCountRunning] = useState(false);
    //  カード配布音の部品
    ////////////////////////////////

    ////////////////////////////////
    //  classの定義
    let pointExchangeStyleFront = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointExchangeStyleBack = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointUnitStyleFront = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    let pointUnitStyleBack = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    //  classの定義
    ////////////////////////////////

    /////////////////////////////////
    //  カード配布音の定義
    const [dealCards, { stopHit1 }] = useSound('/sound/dealCards.mp3',{ 
        id: 'dealCards',
        volume: 0.4,
        html5 : false,
        playbackRate : 0.9,
    });
    // const dealCards = useSound('/sound/dealCards.mp3',{ 
    //     id: 'dealCards',
    //     volume: 0.6,
    //     html5 : false,
    // });

    //  カード配布音の定義
    /////////////////////////////////

    /////////////////////////////////
    //  カード払い出し音開始・停止
    useLayoutEffect(() => {
        if(modalStateValue.data.prizesLength){
            setIsDealCardsCountRunning(true)
            //  今回の枚数
            setDealCardsCount(modalStateValue.data.prizesLength)
            //  戻るなどで獲得音が何度もならないようにカードの枚数を０にする
            setModalState((prevState) => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    'prizesLength' : 0,
                }
            }));
        }
        // console.log("[ContentShowPrize]modalStateValue.data.prizesLength==>", modalStateValue.data.prizesLength);
    }, [modalStateValue.data.prizesLength]);
    //  カード払い出し音開始・停止
    /////////////////////////////////

    /////////////////////////////////
    //  カード払い出し音鳴動
    useInterval(
        () => {
            if(dealCardsCount <= 0){
                // 1以下になったらカンターストップ（０にはならない）
                setIsDealCardsCountRunning(false)
                setDealCardsCount(1)
            }else{
                dealCards()
                // console.log("[ContentShowPrize]カード払い出し音鳴動：==>", dealCardsCount);
                setDealCardsCount(dealCardsCount - 1);
            }
            
        },
        isDealCardsCountRunning ? dealCardsDelay : null
    );
    //  カード払い出し音鳴動
    /////////////////////////////////




    //  選択したアイテム
    function itemSelected(e) {
        // console.log("[ContentShowPrize]選択したアイテム==>", e);
        // console.log("[ContentShowPrize]modalStateValue==>", modalStateValue);
        // console.log("[ContentShowPrize]選択した位置の裏表==>", modalStateValue.data.prizes[e.key].isItemSelected);
        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                'prizes': {
                    ...prevState.data.prizes,
                    [e.key]: {
                        ...prevState.data.prizes[e.key],
                        'isItemSelected' : !modalStateValue.data.prizes[e.key].isItemSelected

                    },
                }
            }
        }))
    }
    //  選択したアイテムのフラグClass
    let isSlected = '';
    //  発送制限の文言
    let unable2ShipRibbonText = ''

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center h-fit">
            {Object.keys(modalStateValue.data.prizes).map(key => {
                // console.log("[ContentShowPrize]key==>", key);
                // console.log("[ContentShowPrize][key]==>", modalStateValue.data.prizes[key]);
                //  ポイント０や文字量を考慮
                if(modalStateValue.data.prizes[key].itemPoint === 0) {
                }else if (modalStateValue.data.prizes[key].itemPoint > 999999){
                    pointExchangeStyleFront = 'text-left text-xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
                }else if (modalStateValue.data.prizes[key].itemPoint > 99999){
                    pointExchangeStyleFront = 'text-left text-2xl sm:text-2xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-2xl sm:text-2xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
                }else if (modalStateValue.data.prizes[key].itemPoint > 9999){
                    pointExchangeStyleFront = 'text-left text-3xl sm:text-3xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-3xl sm:text-3xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-2 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-2 sm:pt-1';
                }else if (modalStateValue.data.prizes[key].itemPoint > 999){
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

                //  選択済みかどうか
                if([1, true, "1", "true"].includes(modalStateValue.data.prizes[key].isItemSelected)) {
                    isSlected = 'isSlected'
                }else{
                    isSlected = ''
                }
                // console.log("sssssssssssss1", modalStateValue.data.prizes[key].itemShippingFlag);
                //  発送制限あるかどうか
                // if(modalStateValue.data.prizes[key].itemShippingFlag === true) {
                if(modalStateValue.data.prizes[key].itemShippingFlag === 0) {
                    unable2ShipRibbonText  = intl.formatMessage({ id: 'Unable_to_ship' });
                }else{
                    unable2ShipRibbonText  = '';
                }
                // console.log("[ContentShowPrize]isSlected==>", isSlected);
                // console.log("[ContentShowPrize]pointExchangeStyle==>", pointExchangeStyle);
                // console.log("[ContentShowPrize]pointUnitStyle==>", pointUnitStyle);
                return (
                    <div
                    key={`ShowPrize-${key} `}
                    id={key}
                    className=""
                    onClick={(e) => itemSelected({"key":key})}
                >
                    <BaseCard
                        key={key}
                        data={{
                            key : key,
                            type : 'showPrize',
                            emissionUUID : modalStateValue.data.prizes[key].emissionUUID,
                            //  選択済みかどうか
                            isSlected : isSlected,
                            //  画像のパス
                            itemImagePath1 : modalStateValue.data.prizes[key].itemImagePath1,
                            itemImagePath2 : '',
                            itemImagePath3 : '',

                            itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                            itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-2',
                            itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-2',
                            itemFigureAlt : '',

                            rightSideBottomStyleFront : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',
                            rightSideBottomStyleBack : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',

                            //  pointExchange
                            // pointExchangeText : modalStateValue.data.prizes[key].pointExchange?.toLocaleString(), //.toLocaleString()
                            pointExchangeText : modalStateValue.data.prizes[key].itemPoint?.toLocaleString(), //.toLocaleString()
                            pointExchangeStyleFront : pointExchangeStyleFront,
                            pointExchangeStyleBack : pointExchangeStyleBack,
                            pointUnitStyleFront : pointUnitStyleFront,
                            pointUnitStyleBack : pointUnitStyleBack,
                            //  Rarity
                            raritytext : modalStateValue.data.prizes[key].itemAttribute4,
                            rarityStyleFront : 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
                            rarityStyleBack : 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
                            //  appraisalRank
                            appraisalRankText : modalStateValue.data.prizes[key].itemAttribute5,
                            appraisalRankStyleFront : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
                            appraisalRankStyleBack : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
                            //  itemName
                            itemNameText : modalStateValue.data.prizes[key].itemName,
                            itemNameStyleFront : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                            itemNameStyleBack  : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                            itemAttributeWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            itemAttributeWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            //  Shipping request deadline
                            shippingRequestDeadlineText : intl.formatMessage({ id: 'deadline' }) + ':' + intl.formatDate(modalStateValue.data.prizes[key].shippingRequestDeadline, {month: 'numeric',day: 'numeric',}),
                            shippingRequestDeadlineStyleFront : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                            shippingRequestDeadlineStyleBack : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
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

                            expansionSeriesText : modalStateValue.data.prizes[key].itemAttribute2,
                            serial : modalStateValue.data.prizes[key].itemAttribute3,
                        }}
                    />
                </div>
                );
            })}
        </div>
)

}