import React, { useRef, useState, useEffect, Suspense } from "react";
import { SyntheticEvent } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { historyState } from "../../../../store/recoil/historyState";
import { gachaHistoryState } from "../../../../store/recoil/gachaHistoryState";
import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/OnGacha.css';
import {useIntl} from 'react-intl'
import Helmet from 'react-helmet';
import { ButtonWrapClose } from "../modalButtons/ButtonWrapClose";
import { ButtonWrapShowCollection } from "../modalButtons/ButtonWrapShowCollection";
import { ButtonWrapEnterCoupon } from "../modalButtons/ButtonWrapEnterCoupon";
import { ButtonWrapHistoryBottom} from "../modalButtons/ButtonWrapHistoryBottom";
// import video_mp4 from {process.env.PUBLIC_URL} + '/logo192.png'

export const GachaHistory = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const {records = []} = modalStateValue.data;

    return (
        <ul className="w-full">
            {/* {JSON.stringify(modalStateValue.data,null, '\t')} */}

            {records.map((History) => {
                return (
                    <li key={History.o}>{History.o}:{History.i}</li>
                );
            })}

            {(records.length > 0) && <ButtonWrapHistoryBottom />}
        </ul>
)

}