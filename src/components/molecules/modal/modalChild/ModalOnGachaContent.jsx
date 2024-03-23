import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { displayState } from "../../../../store/recoil/displayState";
import { modalState } from "../../../../store/recoil/modalState";
import { LoginForm } from "../../../Form/LoginForm";
import { SignUpForm } from "../../../Form/SignUpForm";
import { ContentSignUpThanks } from "../modalContents/ContentSignUpThanks";
import { ContentConfirm } from "../modalContents/ContentConfirm";
import { ContentVerificationEmail } from "../modalContents/ContentVerificationEmail";
// import { ContentCharge } from "../modalContents/ContentCharge";
import { GachaLoading } from "../modalContents/GachaLoading";
import { Error } from "../modalContents/Error";
import { Loading } from "../modalContents/Loading";
import { OnGacha } from "../modalContents/OnGacha";



export const ModalOnGachaContent = ({}) => {
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const navigate = useNavigate();
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
        <div id="modal-content" className="">
            <OnGacha/>
        </div>
    );
};


