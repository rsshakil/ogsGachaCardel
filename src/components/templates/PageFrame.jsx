import React, { useRef, useState, useEffect } from "react";
import { Header } from "../organisms/Header";
import { Content } from "../organisms/Content";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { accessState } from "../../store/recoil/accessState";
// import { historyState } from "../../store/recoil/historyState";
// import { referrerState } from "../../store/recoil/referrerState";
import { LinkList } from "../molecules/LinkList";
import { DebugWindow } from "../molecules/DebugWindow";
import { debugState } from "../../store/recoil/debugState";
import { elmState } from "../../store/recoil/elmState";
import { UseWindowDimensions } from "../../functions/UseWindowDimensions";
import { displayState } from "../../store/recoil/displayState";
import { Footer } from "../organisms/Footer";


import BaseModal from "../molecules/modal/BaseModal";


export const PageFrame = (props) => {
    const { children } = props;
    //  Debug受信
    const [searchParams] = useSearchParams();
    const initiaDebug = '';
    //  Debug受信しなければ空にし、それを初期値とする
    const getDebug  = searchParams.get("debug") ? searchParams.get("debug") : initiaDebug;
    //  recoilから取り出し
	const [accessStateValue, setAccessState] = useRecoilState(accessState);
	const [debugStateValue, setDebugState] = useRecoilState(debugState);
    //  recoilにDebugがなければ初期値,recoilにあればgetの受信がなくてもデバッグ状態とする
    const stateDebug= accessStateValue.getDebug  ? accessStateValue.getDebug : getDebug;
    //  getの受信があればその値で最終的なデバッグキーとする
    const Debug  = getDebug ? getDebug : stateDebug ;
    //　ヘッターフッターの高さ取得
    const [elmStateValue, setElmState] = useRecoilState(elmState);
    // 画面の幅　最新情報取得
    const { width, height } = UseWindowDimensions();
    //contentOuterWrapの情報を取得する



    // console.log("stepDisplay=>"+stepDisplay);
    const location = useLocation();
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    // const [displayStateValue, setDisplayState] = useRecoilState(pageState);

    const elm = useRef(null);
    // console.log("[HeaderFooter]elm=>",elm);
    // console.log("[HeaderFooter]elmStateValue=>",elmStateValue);
    // console.log("[HeaderFooter]width=>",width);
    useEffect(() => {
        setElmState((prevState) => ({
            ...prevState,
            contentOuterWrapHeight: elm.current.offsetHeight,
            vh: height,
            vw: width
        }))
    }, [width, height,location]);

    // ヘッダーの高さをダイナミックに取得してpaddingTopを更新する
    // let contentWrapStyle = {paddingTop: elmStateValue.headerHeight}  //  固定値に変更
    let contentStyle = {minHeight: `calc(100vh - (${elmStateValue.headerHeight}px + ${elmStateValue.footerHeight}px))`}

    //リファラー関係
    // const [historyStateValue, setHistoryState] = useRecoilState(historyState);
    // const [referrerStateValue, setReferrerState] = useRecoilState(referrerState);
    // const referrerValue = historyStateValue[1] ? Object.values(historyStateValue[1]) : "";
    // const [recoilDebugStateValue, setRecoilDebugState] = useRecoilState(debugState);
    // console.log('historyStateValue=>'+JSON.stringify(historyStateValue,null,'\t'));
    // console.log("リファラーは=>" + referrerValue);
    //現在のパスの取得
    let currentPathname = location['pathname'].replace("/", "_");
    // console.log("currentPathname", currentPathname);
    // console.log("lastPath", referrerValue[0])
    // console.log("現在のパスは=>" + currentPathname);
    //ヒストリー作成機に送る
    // historyStateController({currentPathname:currentPathname});

    //ステレージ空っぽ対策をやる
    useEffect(() => {
        document.querySelector('title').textContent = displayStateValue.PageTitle;
        setAccessState((prevState) => ({
            ...prevState,
            getDebug: Debug
        }))
    }, [location]);

    let getDebugSwich = '1tw-ざぉ$#eSfsソhc7(+5vぱTVq9(Pu!6$shd愛Wb7S~et]5OpG8p@uy=f9徳JGg0da';
    let debugKey = "1eQz2が[ニfGfGだQ+52ぎ[TxFT4xTgaがTx@g殿3pyJ!q4P34ふjfgD49#fGえuH2t%5犬Gfgh71@=あ~4pof7";
    debugKey = debugStateValue.token;

    getDebugSwich = getDebugSwich == debugKey ? 'px-4 bg-gray-800 text-emerald-400' : 'hidden';

    useEffect(() => {
        getDebugSwich = accessStateValue.getDebug;
        if(getDebugSwich == debugKey){
            setDebugState((prevState) => ({
                ...prevState,
                isDebug: true
            }))
        }else{
            setDebugState((prevState) => ({
                ...prevState,
                isDebug: false
            }))
        }
    }, [accessStateValue.getDebug]);

    // contentMarginTopをやめてpaddingCss
    return (
        <>
            <div id="pageWrap" className={`flex flex-col text-black`}>
                
                {/* <FirstTimeInitialization /> */}
                <Header />
                {/* ヘッダーの高さに合わせてPTを設定する */}
                <div id="contentWrap" className="pt-12 sm:pt-16 flex min-h-full justify-center grow ">
                {/* <div id="contentWrap" className="flex min-h-full justify-center grow " style={contentWrapStyle}> */}
                    {/* headerと同じ高さのpaddingTopを設ける */}
                    <main
                        //  headerとfooterを引いた高さがminHeightとなる
                        ref={elm}
                        id="content"
                        // style={style}
                        className={`
                                    w-full
                                    min-h-full
                                    flex
                                    border-white
                                    overflow-x-clip
                                    `}
                        style={contentStyle}
                    >
                        <Content>{children}</Content>
                    </main>
                </div>
                <Footer/>
                {
                ////❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️////
                ////❗️❗️❗️❗️❗️❗️❗️❗️❗️[本番デプロイ禁止]❗️❗️❗️❗️❗️❗️❗️❗️❗️////
                ////❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️////
                debugStateValue.isDebug
                ?   //デバッグモードである
                <div className={`px-4 bg-gray-800 text-emerald-400`}>
                    <DebugWindow />
                </div>
                :   //デバッグモードでない
                <></>
                ////❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️////
                ////❗️❗️❗️❗️❗️❗️❗️❗️❗️[本番デプロイ禁止]❗️❗️❗️❗️❗️❗️❗️❗️❗️////
                ////❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️////
                }
            </div>
            <BaseModal/>
        </>
    );
};
