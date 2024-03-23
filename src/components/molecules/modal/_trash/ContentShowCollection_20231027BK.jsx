import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/item.css';
// import { BaseCard } from "../../../atoms/cards/BaseCard";


export const ContentShowCollection = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    console.log("[ContentShowCollection]UserStateObj==>", UserStateObj);

    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj.languageResource;
    console.log("[ContentShowCollection]languageResource==>", languageResource);

    ////////////////////////////////
    //  classの定義
    let itemWrapStyle = 'absolute itemWrap h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-4 grid-cols-2';
    let itemWrapStyleBack = 'absolute itemWrapBack h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-4 grid-cols-2';
    let itemBgStyle = 'itemThumbnail h-full bg-no-repeat bg-cover bg-center self-center';
    let pointExchangeStyle = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
    let pointUnitStyle = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1';
    //  アイテムがない時のエラー処理作ること
    //
    ////////////////////////////////

    //  選択したアイテム
    function itemSelected(e) {
        console.log("[ContentShowCollection]選択したアイテム==>", e);
        console.log("[ContentShowCollection]modalStateValue==>", modalStateValue);
        console.log("[ContentShowCollection]選択した位置の裏表==>", UserStateObj.myCollection[e.key].isItemSelected);
        setUserState((prevState) => ({
            ...prevState,
                'myCollection': {
                    ...prevState.myCollection,
                    [e.key]: {
                        ...prevState.myCollection[e.key],
                        'isItemSelected' : !prevState.myCollection[e.key].isItemSelected
                    },
                }
                // 'prizes': {
                //     ...prevState.data.prizes,
                //     [e.languageResource]:{
                //         ...prevState.data.prizes[e.languageResource],
                //         [e.key]:{
                //             ...prevState.data.prizes[e.key],
                //             'isItemSelected': !UserStateObj.myCollection[e.key].isItemSelected
                //         },
                //     }
                // }
            
        }))
    }
    //  選択したアイテムのフラグClass
    let isSlected = '';

    return (
        // <BaseCard 
        //     data={{
        //         type : 'ShowCollection',
        //         //  選択済みかどうか
        //         isSlected : '',
        //         //  画像のパス
        //         itemImagePath1 : '',
        //         itemImagePath2 : '',
        //         itemImagePath3 : '',

        //         itemOuterAreaStyle : '',
        //         itemWrapStyleFront : '',
        //         itemWrapStyleBack : '',
        //         itemFigureStyle : '',
        //         itemFigureAlt : '',

        //         rightSideBottomStyleFront : '',
        //         rightSideBottomStyleBack : '',

        //         //  pointExchange
        //         pointExchangeText : '', //.toLocaleString()
        //         pointExchangeStyleFront : '',
        //         pointExchangeStyleBack : '',
        //         pointUnitStyleFront : '',
        //         pointUnitStyleBack : '',
        //         //  Rarity
        //         raritytext : '',
        //         rarityStyleFront : '',
        //         rarityStyleBack : '',
        //         //  appraisalRank
        //         appraisalRankText : '',
        //         appraisalRankStyleFront : '',
        //         appraisalRankStyleBack : '',
        //         //  itemName
        //         itemNameText : '',
        //         itemNameStyleFront : '',
        //         itemNameStyleBack  : '',
        //         itemAttributeWrapStyleFront : '',
        //         itemAttributeWrapStyleBack : '',
        //         ribbonText : '',
        //         expansionSeriesText : '',
        //         serial : '',
        //     }}
        // />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center h-fit">
            {Object.keys(UserStateObj.myCollection).map(key => {
                console.log("[ContentShowCollection]key==>", key);
                console.log("[ContentShowCollection]UserStateObj.myCollection[key]==>", UserStateObj.myCollection[key]);
                //  ポイント０や文字量を考慮
                if(UserStateObj.myCollection[key].pointExchange === 0) {
                }else if (UserStateObj.myCollection[key].pointExchange > 999999){
                    pointExchangeStyle = 'text-left text-xl font-black font-Roboto';
                    pointUnitStyle = 'align-bottom font-Roboto pt-1 sm:pt-1';
                }else if (UserStateObj.myCollection[key].pointExchange > 99999){
                    pointExchangeStyle = 'text-left text-2xl sm:text-2xl font-black font-Roboto';
                    pointUnitStyle = 'align-bottom font-Roboto pt-1 sm:pt-1';
                }else if (UserStateObj.myCollection[key].pointExchange > 9999){
                    pointExchangeStyle = 'text-left text-3xl sm:text-3xl font-black font-Roboto';
                    pointUnitStyle = 'align-bottom font-Roboto pt-2 sm:pt-1';
                }else if (UserStateObj.myCollection[key].pointExchange > 999){
                    pointExchangeStyle = 'text-left text-4xl sm:text-3xl font-black font-Roboto';
                    pointUnitStyle = 'align-bottom font-Roboto pt-2 sm:pt-1';
                }else {
                    pointExchangeStyle = 'text-left text-5xl sm:text-3xl font-black font-Roboto';
                    pointUnitStyle = 'align-bottom font-Roboto pt-3 sm:pt-1';
                }

                //  選択済みかどうか
                if([1, true, "1", "true"].includes(UserStateObj.myCollection[key].isItemSelected)) {
                    isSlected = 'isSlected'
                }else{
                    isSlected = ''
                }
                console.log("[ContentShowCollection]isSlected==>", isSlected);
                console.log("[ContentShowCollection]pointExchangeStyle==>", pointExchangeStyle);
                console.log("[ContentShowCollection]pointUnitStyle==>", pointUnitStyle);
                return (
                    <div 
                        key={UserStateObj.myCollection[key].emissionUUID} 
                        id={key} 
                        className={`${isSlected} itemOuter relative aspect-[3/2] w-full overflow-hidden`}
                        onClick={(e) => itemSelected({'key':key})}
                    >
                        <div className={`${itemWrapStyle}`}>
                            <div className="pt-2 pb-2 pl-2 aspect-[62/88] h-full">
                                <figure 
                                    className={`${itemBgStyle}`}
                                    style={{ backgroundImage: `url(${UserStateObj.myCollection[key].itemImagePath1})` }}
                                >
                                    <img src={{ backgroundImage: `url(${UserStateObj.myCollection[key].itemImagePath1})` }} alt="ちゃんと翻訳して入れること" className="hidden"></img>
                                </figure>
                            </div>
                            <div className="pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden">
                                <div className="rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto">
                                {UserStateObj.myCollection[key].itemAttribute4s}
                                </div>
                                <div className="rarity leading-3 text-right text-base font-black font-Roboto self-end">
                                    {UserStateObj.myCollection[key].itemAttribute5}
                                </div>

                                <div className="point-exchange grow flex items-center justify-center">
                                    <p className={`${pointExchangeStyle}`}>{UserStateObj.myCollection[key].pointExchange?.toLocaleString()}</p>
                                    <p className={`${pointUnitStyle}`}>pt</p>
                                </div>
                                <div className="itemAttribute-shadow text-xs font-bold font-Roboto leading-3">
                                    {UserStateObj.myCollection[key].itemName}
                                </div>
                                <div className="itemAttribute-shadow flex flex-row text-xs font-medium font-Roboto">
                                    <p className="leading-3">{UserStateObj.myCollection[key].itemAttribute2}</p>
                                    <p className="leading-3">&nbsp;|&nbsp;</p>
                                    <p className="leading-3">{UserStateObj.myCollection[key].itemAttribute3}</p>

                                </div>
                            </div>
                        </div>
                        <div className={`${itemWrapStyleBack}`}>
                            <div className="pt-2 pb-2 pl-2 aspect-[62/88] h-full">
                                <figure 
                                    className={`${itemBgStyle}`}
                                    style={{ backgroundImage: `url(${UserStateObj.myCollection[key].itemImagePath1})` }}
                                >
                                    <img src={{ backgroundImage: `url(${UserStateObj.myCollection[key].itemImagePath1})` }} alt="ちゃんと翻訳して入れること" className="hidden"></img>
                                </figure>
                            </div>
                            <div className="pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden">
                                <div className="rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto">
                                {UserStateObj.myCollection[key].itemAttribute4}
                                </div>
                                <div className="rarity leading-3 text-right text-base font-black font-Roboto self-end">
                                    {UserStateObj.myCollection[key].itemAttribute5s}
                                </div>

                                <div className="point-exchange grow flex items-center justify-center">
                                    <p className={`${pointExchangeStyle}`}>{UserStateObj.myCollection[key].pointExchange?.toLocaleString()}</p>
                                    <p className={`${pointUnitStyle}`}>pt</p>
                                </div>
                                <div className="itemAttribute-shadow text-xs font-bold font-Roboto leading-3">
                                    {UserStateObj.myCollection[key].itemName}
                                </div>
                                <div className="itemAttribute-shadow flex flex-row text-xs font-medium font-Roboto">
                                    <p className="leading-3">{UserStateObj.myCollection[key].itemAttribute2}</p>
                                    <p className="leading-3">&nbsp;|&nbsp;</p>
                                    <p className="leading-3">{UserStateObj.myCollection[key].itemAttribute3}</p>
                                </div>
                            </div>
                            <div class="label_inner">
		                        <span className="ribbon font-Roboto">select</span>
	                        </div>
                        </div>
                    </div>
                );
            })}
        </div>
)

}