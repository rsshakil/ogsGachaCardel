import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { UseWindowDimensions } from "../../functions/UseWindowDimensions";
import { elmState } from "../../store/recoil/elmState";
import { BrowserRouter, Route, Switch, NavLink, Link } from 'react-router-dom';
import {useIntl} from 'react-intl'
import { useLocation } from "react-router-dom";

export const Footer = () => {

    //　エレメント状態の読み込み
    const [elmStateValue, setElmState] = useRecoilState(elmState);
    // 画面の幅　最新情報取得
    const { width, height } = UseWindowDimensions();
    const intl = useIntl()
    const location = useLocation();
    //Footerの高さを取得する
    const elm = useRef(null);
    // console.log("[Footer]elm=>",elm);
    //Footerの高さを保存する
    useEffect(() => {
        setElmState((prevState) => ({
            ...prevState,
            footerHeight: elm.current.offsetHeight,
            // vh: height,
            // vw: width
        }))
    }, [width,height,location]);



    return (
        <>
            <footer
                ref={elm}
                className={`min-h-20 flex justify-center grow-0 z-10 px-4 py-4 items-center  bg-black`}
            >
                    <ul className="w-full lg:w-256 grid grid-cols-1 sm:grid-cols-3 ml:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
                        <li key="operating_company" className="">
                            <Link className="text-white text-base" activeClassName="active" to="about">{intl.formatMessage({ id: 'operating_company' })}</Link>
                            </li>
                        <li key="terms_of_Use" className="">
                            <Link className="text-white text-base" activeClassName="active" to="terms">{intl.formatMessage({ id: 'terms_of_Use' })}</Link>
                        </li>
                        <li key="privacy_policy" className="">
                            <Link className="text-white text-base" activeClassName="active" to="privacy">{intl.formatMessage({ id: 'privacy_policy' })}</Link>
                        </li>
                        <li key="Specified_Commercial_Transaction_Act" className="">
                            <Link className="text-white text-base" activeClassName="active" to="tradelaw">{intl.formatMessage({ id: 'Specified_Commercial_Transaction_Act' })}</Link>
                        </li>
                        <li key="Specified_Commercial_Transaction_Act" className="">
                            <Link className="text-white text-base" activeClassName="active" to="antique">{intl.formatMessage({ id: 'antique' })}</Link>
                        </li>
                        <li key="faq" className="">
                            <Link className="text-white text-base" activeClassName="active" to="faq">{intl.formatMessage({ id: 'faq' })}</Link>
                        </li>
                        <li key="Everyones_posts" className="">
                            <Link className="text-white text-base" activeClassName="active" to="sns">{intl.formatMessage({ id: 'Everyones_posts' })}</Link>
                        </li>
                    </ul>
            </footer>
        </>
    );
};
