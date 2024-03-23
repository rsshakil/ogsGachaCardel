import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'



export const ContentBillingLock = () => {
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
        couponCode,
        couponName,
        couponPoint
    } = modalStateValue['data'] || {};




    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <Headline
                type="h2"
                spanText={intl.formatMessage({ id: 'Unable_to_purchase_product' })}
                spanClass="font-normal text-left text-sm font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'If_you_have_trouble_purchasing_a_product__please_contact_support' })}
                headlineClass="font-normal text-left text-sm font-Prompt text-white flex flex-col"
            />
        </div>
    )
    
}

