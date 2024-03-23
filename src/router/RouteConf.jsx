import React from "react";
import { Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import ScrollTop from './ScrollTop'
import Validator from './Validator'
import { accessState } from "../store/recoil/accessState";
import { useRecoilState } from "recoil";

import { Top } from "../components/pages/Top";
import { PageFrame } from "../components/templates/PageFrame";
import { About } from "../components/pages/About";
import { Terms } from "../components/pages/Terms";
import { Tradelaw } from "../components/pages/Tradelaw";
import { Privacy } from "../components/pages/Privacy";
import { Gacha, Pack } from "../components/pages/Pack";
import { Verification } from "../components/pages/Verification";
import { VerificationError } from "../components/pages/VerificationError";
import { VerifyMail } from "../components/pages/VerifyMail";
import { VerifyChangeMail } from "../components/pages/VerifyChangeMail";
import { VerifyForgetPassword } from "../components/pages/VerifyForgetPassword";
import { QueryParameter } from "../functions/QueryParameter";
import { PreRegistration } from "../components/pages/PreRegistration";
import { Faq } from "../components/pages/Faq";
import { Sns } from "../components/pages/Sns";
import { Antique } from "../components/pages/Antique";
import { Maintenance } from "../components/pages/Maintenance";
import { PageLillie } from "../components/pages/PageLillie";
import { BankPayment } from "../components/pages/BankPayment";


// export const RouteConf = ({ setPageLoadingEnded, isPageLoading, isPageLoadingStopState }) => {
// export const RouteConf = ({ setPageLoadingEnded, isPageLoading, isPageLoadingStopState, timer = '', clearTimer = () => { } }) => {
export const RouteConf = () => {
    const [recoilStateValue] = useRecoilState(accessState);
    // const { id } = useParams();
    // console.log("[RouteConf]useParams.id=======>",id);
    // useEffect(() => {
    const getDebugSwich = recoilStateValue.getDebug ? recoilStateValue.getDebug : '1';

    switch (getDebugSwich) {
        case '9JhdbGtd65egh$$rf%gq':
            console.log("switch========> (getDebugSwich)" + recoilStateValue.getDebug);
            // initLogger(true); 
            break;
        default:
            console.log("switch========> (default)" + recoilStateValue.getDebug);
            // initLogger(false); 
            break;
    }

    const location = useLocation();
    console.log("location.pathname", location.pathname);

    return (
        <>
            {/* <BrowserRouter> */}
                    {/* <ReferrerController /> */}
                    <ScrollTop />
                    <PageFrame>
                        <Routes>
                            <Route
                                element={
                                    <Validator>
                                        <Outlet />
                                    </Validator>
                                }>
                                <Route path="/" element={<Top />} />
                                <Route path="*" element={<Top />} />
                                <Route path="top" element={<Top />} />
                                <Route path="about" element={<About />} />
                                <Route path="terms" element={<Terms />} />
                                <Route path="tradelaw" element={<Tradelaw />} />
                                <Route path="antique" element={<Antique />} />
                                <Route path="privacy" element={<Privacy />} />
                                {/* <Route path="gacha" element={<Gacha />} /> */}
                                {/* コードなしのgachaはTOPへ */}
                                <Route path="pack" element={<Top />} />
                                <Route path="pack/p-undefined" element={<Top />} />
                                <Route path="pack/:id" element={<Pack />} />
                                <Route path="faq" element={<Faq />} />
                                <Route path="sns" element={<Sns />} />
                                {/* 特設ページ */}
                                <Route path="pre-registration" element={<BankPayment />} />
                                <Route path="page-lillie" element={<BankPayment />} />
                                <Route path="bank-payment" element={<BankPayment />} />

                                <Route path="verification" element={<Verification />} />
                                
                                {/* 新規登録メール確認 */}
                                <Route path="verify-mail" element={<VerifyMail />} />
                                <Route path="verification-error" element={<VerificationError />} />
                                {/* メールアドレスの変更 */}
                                {/* ↓↓↓↓↓↓↓↓↓↓↓↓2024-1-22自動的に変更する仕組み一時退避↓↓↓↓↓↓↓↓↓↓↓↓ */}
                                <Route path="verify-change-mail" element={<Top />} />
                                {/* <Route path="verify-change-mail" element={<VerifyChangeMail />} /> */}
                                {/* ↑↑↑↑↑↑↑↑↑↑↑↑2024-1-22自動的に変更する仕組み一時退避↑↑↑↑↑↑↑↑↑↑↑↑ */}
                                {/* パスワード忘れ */}
                                <Route path="verify-forget-mail" element={<VerifyForgetPassword />} />
                                <Route path="maintenance" element={<Maintenance />} />
                            </Route>
                        </Routes>
                    </PageFrame>
            {/* </BrowserRouter> */}
        </>
    )
}
