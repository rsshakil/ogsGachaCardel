import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'



export const ContentGetGiftCompleted = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    function closeModal(e) {
        
        // console.log("[BaseModal]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }
    ////////////////////////////////
    //  デザイン用決め打ちテキスト
    let point = 1500;
    let GiftNema = '事前登録プレゼント';


    //  デザイン用決め打ちテキスト
    ////////////////////////////////

    return (
        <div className="w-full flex flex-col justify-center items-center">
            {modalStateValue.data.giftCardsInfo?.map(item => (
                <Headline
                    type="h2"
                    spanText={intl.formatMessage({ id: 'Gift_nema' })+ '：' + item.presentName}
                    spanClass="font-normal text-left text-sm font-Prompt text-white flex flex-col"
                    headlineText={intl.formatMessage({ id: 'Points_awarded' })+ '：' + item.presentPoint + 'pt'}
                    headlineClass="font-normal text-left text-sm font-Prompt text-white flex flex-col mb-4"
                />
            ))}

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