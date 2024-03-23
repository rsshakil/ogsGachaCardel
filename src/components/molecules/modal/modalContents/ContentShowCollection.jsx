import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import '../../../../css/item.css';
import { BaseCard } from "../../../atoms/cards/BaseCard";
// import { BaseCard } from "../../../atoms/cards/BaseCard";
import {useIntl} from 'react-intl'
import AdditionalLoading from "../../AdditionalLoading";
import useFetchUserCollectionQuery from "../../../../hooks/useFetchUserCollectionQuery";
import InfiniteLoader from "../../../atoms/Loading/InfiniteLoader";
import AdditionalLoadingV2 from "../../AdditionalLoadingV2";

export const ContentShowCollection = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[ContentShowCollection]UserStateObj==>", UserStateObj);
    // console.log("[ContentShowCollection]modalStateValue==>", modalStateValue);

    const {fetchUserCollections} = useFetchUserCollectionQuery();


    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    // console.log("[ContentShowCollection]languageResource==>", languageResource);

    ////////////////////////////////
    //  classの定義

    let pointExchangeStyleFront = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointExchangeStyleBack = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointUnitStyleFront = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    let pointUnitStyleBack = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    //  アイテムがない時のエラー処理作ること
    //
    ////////////////////////////////

    // useEffect(() => {
    //     userRead();
    // }, [])

    //call userReadApi
    // const userRead = async () =>{
    //     //no need to call here i have moved it menu.jsx when click
    // }


    //  選択したアイテム
    function itemSelected(e) {
        // console.log("[ContentShowCollection]選択したアイテム==>", e);
        // console.log("[ContentShowCollection]modalStateValue==>", modalStateValue);
        // console.log("[ContentShowCollection]選択した位置の裏表==>", UserStateObj.myCollection[e.key].isItemSelected);
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
    // const [useOnClick, setUseOnClick] = useState(false);


    const fetchMoreData = async(skip = 0) => {
        // console.log('face more fired....')

        await fetchUserCollections(skip, 50);
      };


    //   const contentTemplate = (key)=> {
    //          // console.log("[ContentShowCollection]key==>", key);
    //                 // console.log("[ContentShowCollection]UserStateObj.myCollection[key]==>", UserStateObj.myCollection[key]);
    //                 //  ポイント０や文字量を考慮
    //                 if(UserStateObj.myCollection[key].itemPoint === 0) {
    //                 }else if (UserStateObj.myCollection[key].itemPoint > 999999){
    //                     pointExchangeStyleFront = 'text-left text-xl font-black font-Roboto';
    //                     pointExchangeStyleBack = 'text-left text-xl font-black font-Roboto';

    //                     pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
    //                     pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
    //                 }else if (UserStateObj.myCollection[key].itemPoint > 99999){
    //                     pointExchangeStyleFront = 'text-left text-2xl sm:text-2xl font-black font-Roboto';
    //                     pointExchangeStyleBack = 'text-left text-2xl sm:text-2xl font-black font-Roboto';

    //                     pointUnitStyleFront = 'align-bottom font-Roboto pt-1 sm:pt-1';
    //                     pointUnitStyleBack = 'align-bottom font-Roboto pt-1 sm:pt-1';
    //                 }else if (UserStateObj.myCollection[key].itemPoint > 9999){
    //                     pointExchangeStyleFront = 'text-left text-3xl sm:text-3xl font-black font-Roboto';
    //                     pointExchangeStyleBack = 'text-left text-3xl sm:text-3xl font-black font-Roboto';

    //                     pointUnitStyleFront = 'align-bottom font-Roboto pt-2 sm:pt-1';
    //                     pointUnitStyleBack = 'align-bottom font-Roboto pt-2 sm:pt-1';
    //                 }else if (UserStateObj.myCollection[key].itemPoint > 999){
    //                     pointExchangeStyleFront = 'text-left text-4xl sm:text-3xl font-black font-Roboto';
    //                     pointExchangeStyleBack = 'text-left text-4xl sm:text-3xl font-black font-Roboto';

    //                     pointUnitStyleFront = 'align-bottom font-Roboto pt-2 sm:pt-1';
    //                     pointUnitStyleBack = 'align-bottom font-Roboto pt-2 sm:pt-1';
    //                 }else {
    //                     pointExchangeStyleFront = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    //                     pointExchangeStyleBack = 'text-left text-5xl sm:text-3xl font-black font-Roboto';

    //                     pointUnitStyleFront = 'align-bottom font-Roboto pt-3 sm:pt-1';
    //                     pointUnitStyleBack = 'align-bottom font-Roboto pt-3 sm:pt-1';
    //                 }

    //                 //  選択済みかどうか
    //                 if([1, true, "1", "true"].includes(UserStateObj.myCollection[key].isItemSelected)) {
    //                     isSlected = 'isSlected'
    //                 }else{
    //                     isSlected = ''
    //                 }
    //                 // console.log("[ContentShowCollection]isSlected==>", isSlected);

    //                 //  発送制限あるかどうか
    // // console.log("sssssssssssss2", UserStateObj.myCollection[key].itemShippingFlag);
    //                 if(UserStateObj.myCollection[key].itemShippingFlag) {
    //                     unable2ShipRibbonText  = '';
    //                 }else{
    //                     unable2ShipRibbonText  = intl.formatMessage({ id: 'Unable_to_ship' });
    //                 }
    //                 // console.log("[ContentShowCollection]unable2ShipRibbonText==>", unable2ShipRibbonText);

    //                 return (
                    
    //                 <div
    //                     key={key} 
    //                     id={key}
    //                     className=""
    //                     onClick={(e) => itemSelected({"key":key})}
    //                 >
    //                     <BaseCard
    //                         key={key}
    //                         data={{
    //                             key : key,
    //                             type : 'showCollection',
    //                             emissionUUID : UserStateObj.myCollection[key].emissionUUID,
    //                             //  選択済みかどうか
    //                             isSlected : isSlected,
    //                             //  画像のパス
    //                             itemImagePath1 : UserStateObj.myCollection[key].itemImagePath1,
    //                             itemImagePath2 : '',
    //                             itemImagePath3 : '',

    //                             itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
    //                             itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-2',
    //                             itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-2',
    //                             itemFigureAlt : '',

    //                             rightSideBottomStyleFront : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',
    //                             rightSideBottomStyleBack : 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',

    //                             //  pointExchange
    //                             pointExchangeText : UserStateObj.myCollection[key].itemPoint?.toLocaleString(), //.toLocaleString()
    //                             pointExchangeStyleFront : pointExchangeStyleFront,
    //                             pointExchangeStyleBack : pointExchangeStyleBack,
    //                             pointUnitStyleFront : pointUnitStyleFront,
    //                             pointUnitStyleBack : pointUnitStyleBack,
    //                             //  Rarity
    //                             raritytext : UserStateObj.myCollection[key].itemAttribute4,
    //                             rarityStyleFront : 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
    //                             rarityStyleBack : 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
    //                             //  appraisalRank
    //                             appraisalRankText : UserStateObj.myCollection[key].itemAttribute5,
    //                             appraisalRankStyleFront : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
    //                             appraisalRankStyleBack : 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
    //                             //  itemName
    //                             itemNameText : UserStateObj.myCollection[key].itemName,
    //                             itemNameStyleFront : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
    //                             itemNameStyleBack  : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
    //                             itemAttributeWrapStyleFront : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
    //                             itemAttributeWrapStyleBack : 'itemAttribute-shadow flex flex-row text-xs font-medium font-Noto tracking-tight',
    //                             //  Shipping request deadline
    //                             shippingRequestDeadlineText : intl.formatMessage({ id: 'deadline' }) + ':' + intl.formatDate(UserStateObj.myCollection[key].shippingRequestDeadline, {month: 'numeric',day: 'numeric',}),
    //                             shippingRequestDeadlineStyleFront : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
    //                             shippingRequestDeadlineStyleBack : 'itemAttribute-shadow text-xs font-bold font-Noto leading-3 tracking-tight',
    //                             //  ribbon
    //                             ribbonStyleFront : 'ribbon font-Roboto',
    //                             ribbonStyleBack : 'ribbon ribbon-green font-Roboto',
    //                             ribbonTextFront : '',
    //                             ribbonTextBack : intl.formatMessage({ id: 'select' }) ,
    //                             //  bottomRibbon　裏表同じものでOK
    //                             bottomRibbonStyleFront : 'bottom-ribbon font-Roboto',
    //                             bottomRibbonStyleBack : 'bottom-ribbon font-Roboto',
    //                             bottomRibbonTextFront : unable2ShipRibbonText,
    //                             bottomRibbonTextBack : unable2ShipRibbonText,

    //                             expansionSeriesText : UserStateObj.myCollection[key].itemAttribute2,
    //                             serial : UserStateObj.myCollection[key].itemAttribute3,
    //                         }}
    //                     />
    //                 </div>
    //             );
    //   }

    
    return (
        <div id="scrollableDiv" className="w-full overflow-auto collectionList">
            {/* <AdditionalLoadingV2
                dataLength={Object.keys(UserStateObj.myCollection).length}
                itemsPerPage={100}
                className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center h-fit"
                fetchMoreDataFn={fetchUserCollections}
                scrollableTarget="#scrollableDiv" 
                scrollThreshold={0.05}
                loaderTemplate={<InfiniteLoader/>}
                contentTemplate={contentTemplate}
            /> */}

            {/* <AdditionalLoading
                className=''
                dataLength={Object.keys(UserStateObj.myCollection).length} 
                fetchMoreDataFn={fetchMoreData}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv" 
                scrollThreshold={0.9}
                loaderTemplate={<InfiniteLoader isLoading={isLoading}/>}
            > */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center h-fit">
                    {Object.keys(UserStateObj.myCollection).map(key => {
                    // console.log("[ContentShowCollection]key==>", key);
                    // console.log("[ContentShowCollection]UserStateObj.myCollection[key]==>", UserStateObj.myCollection[key]);
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

                    //  選択済みかどうか
                    if([1, true, "1", "true"].includes(UserStateObj.myCollection[key].isItemSelected)) {
                        isSlected = 'isSlected'
                    }else{
                        isSlected = ''
                    }
                    // console.log("[ContentShowCollection]isSlected==>", isSlected);

                    //  発送制限あるかどうか
                    // console.log("sssssssssssss2", UserStateObj.myCollection[key].itemShippingFlag);
                    if(UserStateObj.myCollection[key].itemShippingFlag) {
                        unable2ShipRibbonText  = '';
                    }else{
                        unable2ShipRibbonText  = intl.formatMessage({ id: 'Unable_to_ship' });
                    }
                    // console.log("[ContentShowCollection]unable2ShipRibbonText==>", unable2ShipRibbonText);

                    return (
                    
                    <div
                        key={key} 
                        id={key}
                        className=""
                        onClick={(e) => itemSelected({"key":key})}
                    >
                        <BaseCard
                            data={{
                                key : key,
                                type : 'showCollection',
                                emissionUUID : UserStateObj.myCollection[key].emissionUUID,
                                //  選択済みかどうか
                                isSlected : isSlected,
                                //  画像のパス
                                itemImagePath1 : UserStateObj.myCollection[key].itemImagePath1,
                                itemImagePath2 : '',
                                itemImagePath3 : '',

                                itemOuterAreaStyle : 'itemOuter relative aspect-[3/2] w-full overflow-hidden',
                                itemWrapStyleFront : 'absolute itemWrap h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-2',
                                itemWrapStyleBack : 'absolute itemWrapBack h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-2 grid-cols-2',
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
                                ribbonTextBack : intl.formatMessage({ id: 'select' }) ,
                                //  bottomRibbon　裏表同じものでOK
                                bottomRibbonStyleFront : 'bottom-ribbon font-Roboto',
                                bottomRibbonStyleBack : 'bottom-ribbon font-Roboto',
                                bottomRibbonTextFront : unable2ShipRibbonText,
                                bottomRibbonTextBack : unable2ShipRibbonText,

                                expansionSeriesText : UserStateObj.myCollection[key].itemAttribute2,
                                serial : UserStateObj.myCollection[key].itemAttribute3,
                            }}
                        />
                    </div>
                    );
                    })}
                </div>
            {/* </AdditionalLoading> */}
        </div>
    )
}