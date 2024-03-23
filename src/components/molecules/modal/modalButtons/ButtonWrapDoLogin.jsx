import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
// import {apiURL} from "../../../Form/LoginForm";
import {pointState} from "../../../../store/recoil/pointState";
import {userState} from "../../../../store/recoil/userState";
import * as queries from "../../../../restapi/queries";
import checkStartValue from '../../../../functions/checkStartValue';


export const ButtonWrapDoLogin = ({openConfirmModal = ()=>{}}) => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [userStateValue, setUserState] = useRecoilState(userState);

    function go2login(e) {
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Login',
            mode: "",
            data: {}
        }))
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div 
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => go2login()}
                >
                <p className="pointer-events-none text-base font-bold font-Roboto">{intl.formatMessage({ id: 'login' })}</p>
            </div>
        </div>
    )
}