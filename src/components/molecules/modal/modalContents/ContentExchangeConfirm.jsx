import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'


export const ContentExchangeConfirm = () => {
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

    ////////////////////////////////
    //  表示文言をmodeで切り替える
    //  念の為modeなしも用意しておく
    //  
    let headlineText;
    if(mode === 'allFromCollection'){
        headlineText = intl.formatMessage({ id: 'Exchange_all_cards_into_points' })
    }else if(mode === 'allFromShowPrize'){
        headlineText = intl.formatMessage({ id: 'Exchange_all_cards_into_points' })
    }else if(mode === 'selectedFromCollection'){
        headlineText = intl.formatMessage({ id: 'Exchange_selected_cards_into_points' })
    }else{
        headlineText = intl.formatMessage({ id: 'Exchange_cards_for_points' })
    }



    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <Headline
                type="h2"
                spanText={headlineText}
                spanClass="font-bold text-left text-base font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'Cards_that_have_been_converted_into_points_cannot_be_returned' })}
                headlineClass="text-left text-sm font-Prompt text-white flex flex-col"
            />
        </div>
    )
    
}