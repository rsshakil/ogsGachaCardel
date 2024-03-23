import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../store/recoil/modalState";
import { userState } from "../../../store/recoil/userState";
import '../../../css/Card.css';
import {useIntl} from 'react-intl'


export const BaseCard = (props) => {
    const data = props.data;
    // console.log("[BaseCard]UserStateObjprops.data==>", data);
    const intl = useIntl()
    const videoRefBasa = useRef(null);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    // console.log("[BaseCard]modalStateValue==>", modalStateValue);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    // console.log("[BaseCard]UserStateObj==>", UserStateObj);

    function loadeddata(e){
        //  音量0に上書き[ios対策]
        if(videoRefBasa.current?.volume){
            videoRefBasa.current.volume = 0;
        }
        videoRefBasa.current.pause();

        videoRefBasa.current.currentTime = 0.5;
    }
        

    const {
        //  propsの受け取り
        key,
        type,
        //  各種key
        emissionUUID,
        isSlected = false,
        //  動画のパス
        moviePath = '',
        //  画像のパス
        itemImagePath1 = '',
        itemImagePath2 = '',
        itemImagePath3 = '',

        itemOuterAreaStyle ='itemOuter relative aspect-[3/2] w-full overflow-hidden',
        itemWrapStyleFront = 'absolute itemWrap h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-4 grid-cols-2',
        itemWrapStyleBack = 'absolute itemWrapBack h-full w-full overflow-hidden rounded cursor-pointer text-white grid gap-4 grid-cols-2',
        itemBgStyle = 'itemThumbnail h-full bg-no-repeat bg-cover bg-center self-center',
        itemFigureAlt,

        rightSideBottomStyleFront = 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',
        rightSideBottomStyleBack = 'pt-2 pb-2 pr-2 flex flex-col items-stretch content-between w-full overflow-hidden',

        //  pointExchange
        pointExchangeText = 'text-left text-5xl sm:text-3xl font-black font-Roboto',
        pointExchangeStyleFront = 'text-left text-5xl sm:text-3xl font-black font-Roboto',
        pointExchangeStyleBack = 'text-left text-5xl sm:text-3xl font-black font-Roboto',

        pointUnitStyleFront = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1',
        pointUnitStyleBack = 'align-bottom leading-[3rem] sm:leading-[2.25rem] font-Roboto pt-3 sm:pt-1',
        //  rarity
        raritytext,
        rarityStyleFront = 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
        rarityStyleBack = 'rarity leading-10 text-right text-5xl sm:text-3xl font-black font-Roboto',
        //  appraisalRank
        appraisalRankText,
        appraisalRankStyleFront = 'rarity leading-3 text-right text-base font-black font-Roboto self-end',
        appraisalRankStyleBack = 'rarity leading-3 text-right text-base font-black font-Roboto self-en',
        //  itemName
        itemNameText,
        itemNameStyleFront = 'itemAttribute-shadow text-xs font-bold font-Roboto leading-3',
        itemNameStyleBack  = 'itemAttribute-shadow text-xs font-bold font-Roboto leading-3',
        itemAttributeWrapStyleFront = 'itemAttribute-shadow flex flex-row text-xs font-medium font-Roboto',
        itemAttributeWrapStyleBack = 'itemAttribute-shadow flex flex-row text-xs font-medium font-Roboto',
        //  Shipping request deadline
        shippingRequestDeadlineText = '発送依頼期限:',
        shippingRequestDeadlineStyleFront = 'itemAttribute-shadow text-xs font-bold font-Roboto leading-3',
        shippingRequestDeadlineStyleBack = 'itemAttribute-shadow text-xs font-bold font-Roboto leading-3',
        //  ribbon
        ribbonStyleFront = 'ribbon font-Roboto',
        ribbonStyleBack = 'ribbon font-Roboto',
        ribbonTextFront = '',
        ribbonTextBack = '',
        //  bottomRibbon
        bottomRibbonStyleFront = 'bottom-ribbon font-Roboto',
        bottomRibbonStyleBack = 'bottom-ribbon font-Roboto',
        bottomRibbonTextFront = '発送不可',
        bottomRibbonTextBack = '発送不可',


        expansionSeriesText,
        serial,
    } = data;

    //  背景画像のURLがないときの処理
    let backgroundImageStyle;
    if(itemImagePath1){
        backgroundImageStyle = { backgroundImage: `url(${itemImagePath1})` };
    }else{
        backgroundImageStyle = { };
    }
    

    return (
        <div className={`${isSlected} ${itemOuterAreaStyle}`}>
            <div className={`${itemWrapStyleFront}`}>
                <div className="pt-2 pb-2 pl-2 aspect-[62/88] h-full max-h-[98%]">
                    {type === 'selectMovie'
                    ?<figure className={`${itemBgStyle}`} style={backgroundImageStyle}>
                        <video
                            className="h-full w-full"
                            id={emissionUUID}
                            ref={videoRefBasa}
                            onLoadedData={(e) => loadeddata(e)}
                            muted
                            // controls
                            // loop
                            autoPlay
                            playsInline={true}
                            // webkitPlaysinline
                            webkitplaysinline="true"
                            preload="auto"
                            // poster="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%229%22%2F%3E" 
                        >
                            <source src={moviePath} type="video/mp4" />
                        </video>
                    </figure>
                    :<figure className={`${itemBgStyle}`} style={backgroundImageStyle} loading="lazy">
                        <img src={itemImagePath1} alt={`${itemFigureAlt}`} className="hidden"></img>
                    </figure>
                    }
                </div>
                <div className={`${rightSideBottomStyleFront}`}>
                    <div className={`${rarityStyleFront}`}>{raritytext}</div>
                    <div className={`${appraisalRankStyleFront}`}>{appraisalRankText}</div>
                    <div className="point-exchange grow flex items-center justify-center">
                        <p className={`${pointExchangeStyleFront}`}>{pointExchangeText}</p>
                        <p className={`${pointUnitStyleFront}`}>pt</p>
                    </div>
                    <div className={`${itemNameStyleFront}`}>{itemNameText}</div>
                    {/* テキストが空なら非表示 */}
                    {shippingRequestDeadlineText?<div className={`${shippingRequestDeadlineStyleFront}`}>{shippingRequestDeadlineText}</div>:''}
                    <div className={`${itemAttributeWrapStyleFront} mb-1`}>
                    {expansionSeriesText 
                        ? //  左辺がある
                            serial
                            ?   //右辺がある
                                <>
                                    <p className="leading-3">{expansionSeriesText}</p>
                                    <p className="leading-3">&nbsp;|&nbsp;</p>
                                    <p className="leading-3">{serial}</p>
                                </>
                            :   //右辺がない
                            <p className="leading-3">{expansionSeriesText}</p>
                                 
                        :// 左辺がない
                        <p className="leading-3">{serial}</p>
                    }
                    </div>
                </div>
                {/* テキストが空なら非表示 */}
                {ribbonTextFront ? <div class="label_inner"><span className={`${ribbonStyleFront}`}>{ribbonTextFront}</span></div>:''}
                {bottomRibbonTextFront?<div class="bottom_label_inner"><span className={`${bottomRibbonStyleFront}`}>{bottomRibbonTextFront}</span></div>:''}
            </div>
            <div className={`${itemWrapStyleBack}`}>
                <div className="pt-2 pb-2 pl-2 aspect-[62/88] h-full max-h-[98%]">
                    {type === 'selectMovie'
                    ?<figure className={`${itemBgStyle}`} style={backgroundImageStyle}>
                        <video
                            className="h-full w-full"
                            id={emissionUUID}
                            // controls
                            loop
                            autoPlay
                            playsInline={true}
                            webkitplaysinline="true"
                            preload="auto"
                            // poster="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%229%22%2F%3E" 
                        >
                            {isSlected ? <source src={moviePath} type="video/mp4" /> : <></>}
                        </video>
                    </figure>
                    :<figure className={`${itemBgStyle}`} style={backgroundImageStyle}>
                        <img src={itemImagePath1} alt={`${itemFigureAlt}`} className="hidden"></img>
                    </figure>
                    }
                </div>
                <div className={`${rightSideBottomStyleBack}`}>
                    <div className={`${rarityStyleBack}`}>{raritytext}</div>
                    <div className={`${appraisalRankStyleBack}`}>{appraisalRankText}</div>
                    <div className="point-exchange grow flex items-center justify-center">
                        <p className={`${pointExchangeStyleBack}`}>{pointExchangeText}</p>
                        <p className={`${pointUnitStyleBack}`}>pt</p>
                    </div>
                    <div className={`${itemNameStyleBack}`}>{itemNameText}</div>
                    {/* テキストが空なら非表示 */}
                    {shippingRequestDeadlineText ? <div className={`${shippingRequestDeadlineStyleBack}`}>{shippingRequestDeadlineText}</div> : ''}
                    <div className={`${itemAttributeWrapStyleBack} mb-1`}>
                        {expansionSeriesText 
                            ? //  左辺がある
                                serial
                                ?   //右辺がある
                                    <>
                                        <p className="leading-3">{expansionSeriesText}</p>
                                        <p className="leading-3">&nbsp;|&nbsp;</p>
                                        <p className="leading-3">{serial}</p>
                                    </>
                                :   //右辺がない
                                <p className="leading-3">{expansionSeriesText}</p>
                                    
                            :// 左辺がない
                            <p className="leading-3">{serial}</p>
                        }
                    </div>
                </div>
                {/* テキストが空なら非表示 */}
                {ribbonTextBack ? <div class="label_inner"><span className={`${ribbonStyleBack}`}>{ribbonTextBack}</span></div>:''}
                {bottomRibbonTextBack?<div class="bottom_label_inner"><span className={`${bottomRibbonStyleBack}`}>{bottomRibbonTextBack}</span></div>:''}
            </div>
            
        </div>
    );
}