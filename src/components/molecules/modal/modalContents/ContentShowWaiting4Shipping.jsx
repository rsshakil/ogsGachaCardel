import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import '../../../../css/item.css';
import { BaseCard } from "../../../atoms/cards/BaseCard";
// import { BaseCard } from "../../../atoms/cards/BaseCard";
import {useIntl,FormattedDate} from 'react-intl'


export const ContentShowWaiting4Shipping = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[ContentShowWaiting4Shipping]UserStateObj==>", UserStateObj);
    // console.log("[ContentShowWaiting4Shipping]modalStateValue==>", modalStateValue);

    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentShowWaiting4Shipping]languageResource==>", languageResource);

    ////////////////////////////////
    //  classの定義

    let pointExchangeStyleFront = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointExchangeStyleBack = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointUnitStyleFront = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    let pointUnitStyleBack = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    //  アイテムがない時のエラー処理作ること
    //
    ////////////////////////////////

    //  選択したアイテム
    function itemSelected(e) {
        // console.log("[ContentShowWaiting4Shipping]選択したアイテム==>", e);
        // console.log("[ContentShowWaiting4Shipping]modalStateValue==>", modalStateValue);
        // console.log("[ContentShowWaiting4Shipping]選択した位置の裏表==>", UserStateObj.myCollection[e.key].isItemSelected);
        //  modalStateValue.mode === 'select'の時だけクリックイベント動作
        if(modalStateValue.mode === 'select'){
            setUserState((prevState) => ({
                ...prevState,
                    'myCollection': {
                        ...prevState.myCollection,
                        [e.key]: {
                            ...prevState.myCollection[e.key],
                            'isItemSelected' : !prevState.myCollection[e.key].isItemSelected
                        },
                    }            
            }))
        }
    }
    //  選択したアイテムのフラグClass
    let isSlected = '';
    //  発送制限の文言
    let unable2ShipRibbonText = ''
    //  onClickの動作
    const [useOnClick, setUseOnClick] = useState(false);




    
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center h-fit">
            {Object.keys(UserStateObj.waiting4Shipping).map(key => {
                // console.log("[ContentShowWaiting4Shipping]key==>", key);
                // console.log("[ContentShowWaiting4Shipping]UserStateObj.myCollection[key]==>", UserStateObj.myCollection[key]);
                //  ポイント０や文字量を考慮
                if(UserStateObj.waiting4Shipping[key].itemPoint === 0) {
                }else if (UserStateObj.waiting4Shipping[key].itemPoint > 999999){
                    pointExchangeStyleFront = 'text-left text-xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
                }else if (UserStateObj.waiting4Shipping[key].itemPoint > 99999){
                    pointExchangeStyleFront = 'text-left text-2xl sm:text-2xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-2xl sm:text-2xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
                }else if (UserStateObj.waiting4Shipping[key].itemPoint > 9999){
                    pointExchangeStyleFront = 'text-left text-3xl sm:text-3xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-3xl sm:text-3xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-2 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-2 sm:pt-1';
                }else if (UserStateObj.waiting4Shipping[key].itemPoint > 999){
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
                if([1, true, "1", "true"].includes(UserStateObj.waiting4Shipping[key].isItemSelected)) {
                    isSlected = 'isSlected'
                }else{
                    isSlected = ''
                }
                // console.log("[ContentShowWaiting4Shipping]isSlected==>", isSlected);

                //  発送制限あるかどうか
                if(UserStateObj.waiting4Shipping[key].unable2Ship === true) {
                    unable2ShipRibbonText  = intl.formatMessage({ id: 'Unable_to_ship' });
                }else{
                    unable2ShipRibbonText  = '';
                }
                console.log("[ContentShowWaiting4Shipping]unable2ShipRibbonText==>", unable2ShipRibbonText);

                return (
                
                <div
                    key={`ShowWaiting4Shipping-${key}`} 
                    id={key}
                    className=""
                    onClick={(e) => itemSelected({"key":key})}
                >


                    <BaseCard
                        key={key} 
                        data={{
                            key : key,
                            type : 'showWaiting4Shipping',
                            emissionUUID : UserStateObj.waiting4Shipping[key].emissionUUID,
                            //  選択済みかどうか
                            isSlected : isSlected,
                            //  画像のパス
                            itemImagePath1 : UserStateObj.waiting4Shipping[key].itemImagePath1,
                            itemImagePath2 : '',
                            itemImagePath3 : '',

                            itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                            itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-2',
                            itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-2',
                            itemFigureAlt : '',

                            rightSideBottomStyleFront : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',
                            rightSideBottomStyleBack : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',

                            //  pointExchange
                            pointExchangeText : UserStateObj.waiting4Shipping[key].itemPoint?.toLocaleString(), //.toLocaleString()
                            pointExchangeStyleFront : pointExchangeStyleFront,
                            pointExchangeStyleBack : pointExchangeStyleBack,
                            pointUnitStyleFront : pointUnitStyleFront,
                            pointUnitStyleBack : pointUnitStyleBack,
                            //  Rarity
                            raritytext : UserStateObj.waiting4Shipping[key].itemAttribute4,
                            rarityStyleFront : 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
                            rarityStyleBack : 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
                            //  appraisalRank
                            appraisalRankText : UserStateObj.waiting4Shipping[key].itemAttribute5,
                            appraisalRankStyleFront : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
                            appraisalRankStyleBack : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
                            //  itemName
                            itemNameText : UserStateObj.waiting4Shipping[key].itemName,
                            itemNameStyleFront : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                            itemNameStyleBack  : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                            itemAttributeWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            itemAttributeWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            //  Shipping request deadline
                            shippingRequestDeadlineText : intl.formatMessage({ id: 'Shipping_application' }) + ':' + intl.formatDate(UserStateObj.waiting4Shipping[key].shippingRequestDeadline, {month: 'numeric',day: 'numeric',}),
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
                            expansionSeriesText : UserStateObj.waiting4Shipping[key].itemAttribute2,
                            serial : UserStateObj.waiting4Shipping[key].itemAttribute3,
                        }}
                    />
                </div>
                );
            })}
        </div>
)

}