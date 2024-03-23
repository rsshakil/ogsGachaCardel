import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'

// GA4 クーポン利用
import useGA4EventCouponExecute from "../../../../lib/useGA4EventCouponExecute";

export const ContentEnterCouponCompleted = () => {
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

    useGA4EventCouponExecute(couponCode);

    ////////////////////////////////
    //  デザイン用決め打ちテキスト
    let point = 500;
    let CouponNema = '事前登録クーポン';


    //  デザイン用決め打ちテキスト
    ////////////////////////////////
    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <Headline
                type="h2"
                spanText={intl.formatMessage({ id: 'Coupon_nema' })+ '：' + couponName}
                spanClass="font-normal text-left text-sm font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'Points_awarded' })+ '：' + new Intl.NumberFormat('ja-JP').format(couponPoint) + 'pt'}
                headlineClass="font-normal text-left text-sm font-Prompt text-white flex flex-col"
            />
            <Headline
                type="h3"
                spanText=''
                spanClass="font-bold text-center text-base font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'Enjoy_cardel' })}
                headlineClass="font-bold text-left text-base  font-Prompt text-white flex flex-col pt-4"
            />
        </div>
    )
    
}

