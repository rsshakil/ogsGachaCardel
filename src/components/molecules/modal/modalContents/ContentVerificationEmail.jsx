//  本登録完了のfinal
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { browserTrackingState } from "../../../../store/recoil/browserTrackingState";
import { accessState } from "../../../../store/recoil/accessState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'
import {useInterval,useThrottle,useUpdateEffect,useEffectOnce} from 'react-use';
// GA4 本登録完了
import useGA4EventRegist from "../../../../lib/useGA4EventRegist";

let now = '';
export const ContentVerificationEmail = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [browserTrackingObj, setBrowserTrackingState] = useRecoilState(browserTrackingState);
    const [accessStateValue, setAccessState] = useRecoilState(accessState);

    console.log("[ContentVerificationEmail]modalStateValue.data==>",modalStateValue.data);
    ////////////////////////////////////
    //  本登録完了でIP＆タイムスタンプを記録
    useEffectOnce(() => {
        now = Date.now();
        // 起動元が'verifyMail'=新規登録の時だけ
        if(modalStateValue.data?.from === 'verifyMail'){
            setBrowserTrackingState((prevState) => ({
                ...prevState,
                accountCreate: {
                    ...prevState.accountCreate,
                    lastCreationDateTime : now,
                    [now] : {
                        timeStamp : now,
                        ip : accessStateValue?.accessIp,
                    }
                }
            }))
        }
    });
    //  本登録完了でIP＆タイムスタンプを記録
    ////////////////////////////////////


    useGA4EventRegist(modalStateValue.data.from );



    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Headline
            type="h3"
            spanText={intl.formatMessage({ id: 'Your_email_address_has_been_confirmed' })}
            spanClass="font-bold text-left text-base font-Prompt text-white flex flex-col"
            headlineText={intl.formatMessage({ id: 'Enjoy_cardel' })}
            headlineClass="font-bold text-left text-base  font-Prompt text-white flex flex-col"
            />
            <ul className="w-full mt-4 text-error-message list-disc">
                {/* <span className="w-full text-center text-sm">※エラーの場合</span>
                <li className="text-left text-xs py-2">認証状態によってこのモーダルの中身は変わります</li>
                <li className="text-left text-xs py-2">期限切れの場合:このまま再登録へ</li>
                <li className="text-left text-xs py-2">認証済みとかの場合:ログイン状態でTOPへ</li>
                <li className="text-left text-xs py-2">その他エラー:このまま再登録へ</li> */}
            </ul>
        </div>
    )
}