import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams, useParams } from "react-router-dom";

import { userState } from "../../store/recoil/userState";
import { KiraKiraButton } from "../atoms/buttons/KiraKiraButton";
import { modalState } from "../../store/recoil/modalState";

import { LongPressEventType, useLongPress } from "use-long-press";
import {useIntl} from 'react-intl'
import '../../css/Play.css';




export const SignUp = () => {
    const intl = useIntl()
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);



    //  新規登録モーダルの起動
    function openSignUp(e) {
        let modalType = 'SignUp';
        let openData = e;
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            // mode : openMode,
            data : openData,
        }))
    }


    return (
        <>
            <section id="Play" className="sticky bottom-0 ">
                <div id="Play-type-3" className={`grid grid-cols-2 overflow-hidden place-content-center select-none`}>
                    <div className="play-button-3 h-14 col-span-2 select-none">
                        <div className="PreRegistration top-button h-14 bg-orange-800 absolute flex justify-center items-center select-none ">
                            <div onClick={(e) => openSignUp({})}
                            className="button-full flex flex-row justify-center items-center select-none"
                            >
                                <p className="pointer-events-none text-lg font-Noto text-center">
                                {intl.formatMessage({ id: 'Advance_membership_registration' })}
                                </p>
                            </div>
                            <KiraKiraButton/>
                            <div className="top-light-wrap h-14 absolute pointer-events-none "></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};


