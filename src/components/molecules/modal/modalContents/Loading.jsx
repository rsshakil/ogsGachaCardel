import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/Loading.css';


export const Loading = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    console.log("[Loading]",);

    function closeModal(e) {
        // console.log("[BaseModal]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
 
        }))
    }


    return (
        <div className="w-full flex flex-col justify-center items-center overflow-hidden">
            <div className="loading"> 
                {/* <h1>Loading</h1> */}
                <span>
                    <span>
                        <span>
                            <span>
                                <span>
                                    <span>
                                        <span>
                                            <span>
                                                <span>
                                                    <span>
                                                        <span>
                                                            <span>
                                                                <span>
                                                                    <span>
                                                                        <span>
                                                                            <span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </div>
        </div>
)

}