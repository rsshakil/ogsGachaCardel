import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'


export const ContentConfirm = () => {
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



    return (
        <div className="
            grow
            grid grid-cols-1
            justify-items-center content-center
            text-2xl sm:text-3xl
            font-bold
            ">
            <p className="">
                {price.toLocaleString()}pt&nbsp;
                {intl.formatMessage({ id: 'pay' })}
            </p>
            <p className="">
                {intl.formatMessage({ id: 'draw_n_card' },{ number: takeNumber.toLocaleString() })}&nbsp;!
            </p>
        </div>  
    )

}