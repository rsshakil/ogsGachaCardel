import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/Loading.css';
import {useIntl} from 'react-intl'

//  エラーが起きた時はこれを使いまわしてください
//  modalTypeを'error'にするだけでモーダを開いたままエラーに遷移します
//  メッセージ内容などはdata: {}に格納して引きまわしてください


export const Error = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const intl = useIntl()
    let errorBody = '';
    console.log("[ModalHead]modalStateValue.data.title==>", modalStateValue.data.body);
    errorBody = modalStateValue.data.body ? modalStateValue.data.body : '';

    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <Headline
                type="h2"
                spanText=''
                spanClass="font-bold text-left text-base font-Prompt text-white flex flex-col"
                headlineText={errorBody}
                headlineClass="font-bold text-left text-base  font-Prompt text-white flex flex-col"
            />

        </div>
)

}