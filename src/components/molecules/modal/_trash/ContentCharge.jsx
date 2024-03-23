//  このファイルはゴミ
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/Ticket.css';


export const ContentCharge = () => {
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


    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div class="ticket3">
                <div class="ticket3__details">
                    <h3 class="ticket3__title">カーデル</h3>
                    <ul>
                        <li>PT購入</li>
                        <li>Earnings: 500$</li>
                    </ul>
                </div>
                <div class="ticket3__rip"></div>
                <div class="ticket3__price">
                    <span class="heading">Point</span>
                    <span class="price">30,000</span>
                </div>
            </div>
            <ul className="w-full mt-4 text-error-message list-disc">
                <li className="text-left text-xs py-2">500pt</li>
                <li className="text-left text-xs py-2">1000pt</li>
                <li className="text-left text-xs py-2">5000pt</li>
                <li className="text-left text-xs py-2">10000pt</li>
                <li className="text-left text-xs py-2">50000pt</li>
                <li className="text-left text-xs py-2">100000pt</li>
                <li className="text-left text-xs py-2">100000pt</li>
                <li className="text-left text-xs py-2">100000pt</li>
                <li className="text-left text-xs py-2">100000pt</li>
                <li className="text-left text-xs py-2">100000pt</li>
                <li className="text-left text-xs py-2">100000pt</li>
                <li className="text-left text-xs py-2">100000pt</li>
            </ul>
        </div>
)

}