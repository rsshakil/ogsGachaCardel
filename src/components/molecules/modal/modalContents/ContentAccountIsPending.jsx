import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { browserTrackingState } from "../../../../store/recoil/browserTrackingState";
import { accessState } from "../../../../store/recoil/accessState";
import {userState} from "../../../../store/recoil/userState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'

let lastCreationDateTime = 0;
let browserTrackingLog = {};

export const ContentAccountIsPending = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [browserTrackingObj, setBrowserTrackingState] = useRecoilState(browserTrackingState);
    const [accessStateValue, setAccessState] = useRecoilState(accessState);
    const [userStateValue, setUserState] = useRecoilState(userState);
    const navigate = useNavigate();

    const {
        BaseModalOpen,
        modalType,
        mode,
    } = modalStateValue;
    const {
        // エラーになるやつは初期値を入れておく
        IPAddress = '192.168.1.1',
        datearray = [`\t\t\t1111111`,`\t\t\t1111111`,`\t\t\t1111111`,`\t\t\t1111111`]   //  ヒットしたIPの配列テスト用に決め打ちKeyも仮
    } = modalStateValue['data'] || {};


console.log("modalLog",modalStateValue['data'])
    ////////////////////////////////
    //  表示用logの生成
    // lastCreationDateTime = browserTrackingObj?.accountCreate.slice(-1)[0];
    // popRobotama = RobotamaArray.pop();
    console.log("[ContentMultipleAccountCreationError]browserTrackingObj.accountCreate==>", browserTrackingObj.accountCreate);
    lastCreationDateTime = browserTrackingObj.accountCreate?.lastCreationDateTime;

    console.log("[ContentMultipleAccountCreationError]lastCreationDateTime==>", lastCreationDateTime);

    browserTrackingLog = {
        // [intl.formatMessage({ id: 'Last_creation_date_and_time' })] : intl.formatDate(lastCreationDateTime) + " " + intl.formatTime(lastCreationDateTime),
        // [intl.formatMessage({ id: 'This_creation_date_and_time' })] : intl.formatDate(new Date()) + " " + intl.formatTime(new Date()),
        'IP-Address' : IPAddress, //    APIから受け取ったIPを格納する
        'User-Agent' : userStateValue.navigatorUserAgent,
        //'dateTime' : JSON.stringify(datearray), //    APIから受け取った時間配列を格納する　フォーマットが必要なら後程行う
    }
    browserTrackingLog = JSON.stringify(browserTrackingLog,null, '\t')
    browserTrackingLog = browserTrackingLog.slice(1)
    browserTrackingLog = browserTrackingLog.slice(0,-2)
    browserTrackingLog = browserTrackingLog.trim()
    console.log("[ContentMultipleAccountCreationError]browserTrackingLog==>", browserTrackingLog);
    //  表示用logの生成
    ////////////////////////////////
    return (
        <div className="w-full flex flex-col justify-center items-center ">


            <p className="text-left text-sm font-Prompt text-white flex flex-col ">
                {intl.formatMessage({ id: 'In_case_of_trouble___please_contact_support' })}
            </p>
            <button key="Customer_Service" className={`text-white cursor-pointer pt-6 font-bold text-lg`} onClick={(e) => navigate("/faq")}>
                -{intl.formatMessage({ id: 'Customer_Service' })}-
            </button>
            <Headline
                type="h3"
                spanText=''
                spanClass="font-bold text-center text-xl font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'Thank_you_for_your_cooperation_in_maintaining_fairness' })}
                headlineClass="font-bold text-left text-base font-Prompt text-white flex flex-col pt-6"
            />
        </div>
    )
    
}
