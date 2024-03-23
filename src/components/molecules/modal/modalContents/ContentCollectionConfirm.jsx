import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'


export const ContentCollectionConfirm = () => {
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
        <div className="w-full flex flex-col justify-center items-center ">
            <Headline
                type="h2"
                spanText={intl.formatMessage({ id: 'Store_selected_cards_in_collection' })}
                spanClass="font-bold text-left text-base font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'Cards_that_are_not_selected_will_be_automatically_converted_into_points' })}
                headlineClass="text-left text-sm font-Prompt text-white flex flex-col"
            />
            <Headline
                type="h3"
                spanText=""
                spanClass="font-bold text-left text-base font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'Cards_that_have_been_converted_into_points_cannot_be_returned' })}
                headlineClass="text-left text-sm font-Prompt text-white flex flex-col"
            />
            <Headline
                type="h4"
                spanText=""
                spanClass="text-left text-sm font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'Cards_stored_in_the_collection____' })}
                headlineClass="text-left text-sm font-Prompt text-white flex flex-col"
            />
        </div>
    )
    
}