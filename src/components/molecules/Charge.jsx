import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useSearchParams, useParams, NavLink, Link} from 'react-router-dom';

import { userState } from "../../store/recoil/userState";
import { KiraKiraButton } from "../atoms/buttons/KiraKiraButton";
import { modalState } from "../../store/recoil/modalState";

import { LongPressEventType, useLongPress } from "use-long-press";
import {useIntl} from 'react-intl'
import '../../css/Play.css';
import useSessionCheck from '../../hooks/useSessionCheck'
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';
import { debugState } from "../../store/recoil/debugState";

export const Charge = () => {
    const intl = useIntl()
    const navigate = useNavigate();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    const { getSessionCheck } = useSessionCheck();


    /////////////////////////////////////
    // ポイントチャージ起動
    async function doCharge(e) {

        //loader
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            // data: {}
        }))
        // check-sessionに問題なし
        if (await getSessionCheck(doCharge,e)) {
            //SessionCheckSuccess display ChargeModal
            //Call pointReadApi
            try {
                const config = {
                    method: queries.getMethod,
                    url: queries.baseURL + queries.readPoint,
                }
    
                const response = await instance.request(config);
                console.log('response', response)
                if (response.status == 200) {
                    const {records = {}} = response.data || {};

                    setUserState(prevState => ({...prevState, myChargeList : records}))

                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'charge',
                        mode: "purchase",
                        data: {}
                    }))
                }
            } catch (err) {
                console.log("err >>>", err);

                let mData = {
                    title: "",
                    body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" }),
                };

                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: "error",
                    data: mData
                }))
                
            }

        }
    }


    return (
        <>
            <section id="Play" className="sticky bottom-0 ">
                    <div id="Play-type-3" className={`grid grid-cols-2 overflow-hidden place-content-center select-none`}>
                        <div className="play-button-3 h-14 col-span-2 select-none">
                            <div 
                                className="PreRegistration top-button h-14 bg-orange-800 absolute flex justify-center items-center select-none "
                                onClick={(e) => doCharge({})}
                            >
                                <div 
                                className="button-full flex flex-row justify-center items-center select-none"
                                >
                                    <p className="pointer-events-none text-lg font-Noto text-center">
                                    {intl.formatMessage({ id: 'Purchase_points' })}
                                    </p>
                                </div>
                                <div className="top-light-wrap h-14 absolute pointer-events-none "></div>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    );
};


