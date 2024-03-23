import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';
import { userState } from "../../../../store/recoil/userState";
import useCsrfToken from '../../../../hooks/useCsrfToken'
import session from '../../../../store/recoil/sessionState'
import checkStartValue from '../../../../functions/checkStartValue';
import {pointState} from "../../../../store/recoil/pointState";
import { headersParam } from '../../../../functions/commonFunctions';
import useFetchGachaHistoryQuery from "../../../../hooks/useFetchGachaHistoryQuery";


export const ButtonWrapHistoryBottom = () => {
    const [fetchGachaHistory] = useFetchGachaHistoryQuery();

    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const {gachaId, hasNextPage, hasPrevPage, currentPageNo} = modalStateValue.data;

    const intl = useIntl()

    function prevHistory(e) {
        e.preventDefault();

        if(hasPrevPage) {
            fetchGachaHistory(gachaId, (currentPageNo - 1));
        }
    }
    function nextHistory(e) {
        e.preventDefault();

        if(hasNextPage) {
            fetchGachaHistory(gachaId, (currentPageNo + 1));
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-row mt-4 justify-between items-center">
                <div 
                    className={`button-half-left button-green flex flex-row justify-center items-center touch-none select-none ${!hasPrevPage && 'cursor-not-allowed button-white button-disable' }`}
                    onClick={prevHistory}
                >
                    <p 
                        className={`pointer-events-none text-base font-bold font-Roboto text-white ${!hasPrevPage && 'mix-blend-soft-light' }`}>
                            {intl.formatMessage({ id: 'Previous' })}
                    </p>
                </div>
                <div 
                    className={`button-half-right button-green flex flex-row justify-center items-center touch-none select-none ${!hasNextPage && 'cursor-not-allowed button-white button-disable'}`}
                    onClick={nextHistory}
                >
                    <p className={`pointer-events-none text-base font-bold font-Roboto text-white ${!hasNextPage && 'mix-blend-soft-light'}`}>{intl.formatMessage({ id: 'Next' })}</p>
                </div>
            </div>
        </div>
)

}