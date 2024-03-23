import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'

let hText;
export const ContentSmsNotAuthenticated = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const {
        BaseModalOpen,
        modalType,
        mode,
    } = modalStateValue;
    const {
        // エラーになるやつは初期値を入れておく
        price = 0,
        gachaId,
        gachaTranslateId,
        gachaTranslateDescription,
        gachaTranslateGachaId,
        gachaTranslateLocalizeId,
        gachaTranslateName,
        gachaTranslateImageDetail,
        gachaTranslateJpFlag,
        gachaTranslateImageMain,
        takeAllGacha,
        gachaSinglePoint,
        gachaConosecutivePoint,
        gachaTotalCount,
        gachaRemainingCount,
        gachaConosecutiveCount,
        select,
        takeNumber = 0,
    } = modalStateValue['data'];


    if(mode === 'shipping'){
        hText = 'Please_complete_SMS_verification_before_requesting_shipment'
    }
    else if(mode === 'payment'){
        hText = 'Please_complete_SMS_verification_before_requesting_payment'
    }
    else {
        hText = 'invalid_mode';
    }



    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <Headline
                type="h2"
                spanText=''
                spanClass="font-bold text-center text-base font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: hText })}
                headlineClass="font-bold text-left text-base  font-Prompt text-white flex flex-col"
            />
        </div>
    )
    
}

