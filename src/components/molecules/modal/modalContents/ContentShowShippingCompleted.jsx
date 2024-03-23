import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import '../../../../css/item.css';
import { BaseCard } from "../../../atoms/cards/BaseCard";
// import { BaseCard } from "../../../atoms/cards/BaseCard";
import {useIntl,FormattedDate} from 'react-intl'


export const ContentShowShippingCompleted = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[ContentShowShippingCompleted]UserStateObj==>", UserStateObj);
    // console.log("[ContentShowShippingCompleted]modalStateValue==>", modalStateValue);

    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentShowShippingCompleted]anguageResource==>", languageResource);

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
        // console.log("[ContentShowShippingCompleted]選択したアイテム==>", e);
        // console.log("[ContentShowShippingCompleted]modalStateValue==>", modalStateValue);
        // console.log("[ContentShowShippingCompleted]選択した位置の裏表==>", UserStateObj.shippingCompleted[e.key].isItemSelected);
        //  modalStateValue.mode === 'select'の時だけクリックイベント動作
        if(modalStateValue.mode === 'select'){
            setUserState((prevState) => ({
                ...prevState,
                    'shippingCompleted': {
                        ...prevState.shippingCompleted,
                        [e.key]: {
                            ...prevState.shippingCompleted[e.key],
                            'isItemSelected' : !prevState.shippingCompleted[e.key].isItemSelected
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
            {Object.keys(UserStateObj.shippingCompleted).map(key => {
                // console.log("[ContentShowShippingCompleted]key==>", key);
                // console.log("[ContentShowShippingCompleted]UserStateObj.shippingCompleted[key]==>", UserStateObj.shippingCompleted[key]);
                //  ポイント０や文字量を考慮
                if(UserStateObj.shippingCompleted[key].itemPoint === 0) {
                }else if (UserStateObj.shippingCompleted[key].itemPoint > 999999){
                    pointExchangeStyleFront = 'text-left text-xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
                }else if (UserStateObj.shippingCompleted[key].itemPoint > 99999){
                    pointExchangeStyleFront = 'text-left text-2xl sm:text-2xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-2xl sm:text-2xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
                }else if (UserStateObj.shippingCompleted[key].itemPoint > 9999){
                    pointExchangeStyleFront = 'text-left text-3xl sm:text-3xl font-black font-Roboto';
                    pointExchangeStyleBack = 'text-left text-3xl sm:text-3xl font-black font-Roboto';

                    pointUnitStyleFront = 'align-bottom font-Roboto pt-2 sm:pt-1';
                    pointUnitStyleBack = 'align-bottom font-Roboto pt-2 sm:pt-1';
                }else if (UserStateObj.shippingCompleted[key].itemPoint > 999){
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
                if([1, true, "1", "true"].includes(UserStateObj.shippingCompleted[key].isItemSelected)) {
                    isSlected = 'isSlected'
                }else{
                    isSlected = ''
                }
                console.log("[ContentShowShippingCompleted]isSlected==>", isSlected);

                //  発送制限あるかどうか
                if(UserStateObj.shippingCompleted[key].unable2Ship === true) {
                    unable2ShipRibbonText  = intl.formatMessage({ id: 'Unable_to_ship' });
                }else{
                    unable2ShipRibbonText  = '';
                }
                // console.log("[ContentShowShippingCompleted]unable2ShipRibbonText==>", unable2ShipRibbonText);

                return (
                
                <div
                    key={`ShowShippingCompleted-${key}`} 
                    id={key}
                    className=""
                    onClick={(e) => itemSelected({"key":key})}
                >


                    <BaseCard
                        key={key}
                        data={{
                            key : key,
                            type : 'showShippingCompleted',
                            emissionUUID : UserStateObj.shippingCompleted[key].emissionUUID,
                            //  選択済みかどうか
                            isSlected : isSlected,
                            //  画像のパス
                            itemImagePath1 : UserStateObj.shippingCompleted[key].itemImagePath1,
                            itemImagePath2 : '',
                            itemImagePath3 : '',

                            itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                            itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-2',
                            itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded text-white grid gap-2 grid-cols-2',
                            itemFigureAlt : '',

                            rightSideBottomStyleFront : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',
                            rightSideBottomStyleBack : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',

                            //  pointExchange
                            pointExchangeText : UserStateObj.shippingCompleted[key].itemPoint?.toLocaleString(), //.toLocaleString()
                            pointExchangeStyleFront : pointExchangeStyleFront,
                            pointExchangeStyleBack : pointExchangeStyleBack,
                            pointUnitStyleFront : pointUnitStyleFront,
                            pointUnitStyleBack : pointUnitStyleBack,
                            //  Rarity
                            raritytext : UserStateObj.shippingCompleted[key].itemAttribute4,
                            rarityStyleFront : 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
                            rarityStyleBack : 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
                            //  appraisalRank
                            appraisalRankText : UserStateObj.shippingCompleted[key].itemAttribute5,
                            appraisalRankStyleFront : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
                            appraisalRankStyleBack : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
                            //  itemName
                            itemNameText : UserStateObj.shippingCompleted[key].itemName,
                            itemNameStyleFront : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                            itemNameStyleBack  : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                            itemAttributeWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            itemAttributeWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
                            //  Shipping request deadline
                            shippingRequestDeadlineText : intl.formatMessage({ id: 'Shipping_processing' }) + ':' + intl.formatDate(UserStateObj.shippingCompleted[key].shippingRequestDeadline, {month: 'numeric',day: 'numeric',}),
                            shippingRequestDeadlineStyleFront : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                            shippingRequestDeadlineStyleBack : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
                            //  ribbon
                            ribbonStyleFront : 'ribbon font-Roboto',
                            ribbonStyleBack : 'ribbon ribbon-green font-Roboto',
                            ribbonTextFront : '',
                            ribbonTextBack : '',
                            //  bottomRibbon　裏表同じものでOK
                            bottomRibbonStyleFront : 'bottom-ribbon font-Roboto',
                            bottomRibbonStyleBack : 'bottom-ribbon font-Roboto',
                            bottomRibbonTextFront : '',
                            bottomRibbonTextBack : '',

                            expansionSeriesText : UserStateObj.shippingCompleted[key].itemAttribute2,
                            serial : UserStateObj.shippingCompleted[key].itemAttribute3,
                        }}
                    />
                </div>
                );
            })}
        </div>
)

}