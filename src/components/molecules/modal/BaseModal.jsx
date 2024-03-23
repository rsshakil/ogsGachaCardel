// ToDo
//  https://zenn.dev/longbridge/articles/b7e76b31f993d9
//  if (mode === 'playMovie') {この辺りをwrapしてエラー時に救済する

import React, { useRef, useState, useEffect, Suspense } from "react";
import Modal from 'react-modal'
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../store/recoil/modalState";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import '../../../css/BaseModal.css';
import { ModalHead } from "./modalFrame/ModalHead";
import { ModalContent } from "./modalFrame/ModalContent";
import { ModalButton } from "./modalFrame/ModalButton";
import { ModalOnGachaContent } from "./modalChild/ModalOnGachaContent";
import { GachaSoundsPrayer } from "./modalChild/GachaSoundsPrayer";



const BaseModal = () => {
    const location = useLocation();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    // console.log('[BaseModal]modalStateValue', modalStateValue);
 
    const [modalButtonState, setModalButtonState] = useState(false);
    // console.log('paymentB', paymentB);
    // console.log('modalButtonState1', modalButtonState);
    const {
        BaseModalOpen,
        modalType,
        mode,
    } = modalStateValue;
    const {
        price,
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
    } = modalStateValue['data'] || {};
    // console.log('[BaseModal]mode==>', mode);


    const baseStyles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            backgroundColor: "rgba(0,0,0,0.70)",
            // overscrollBehavior: 'none',
            overscrollBehaviorY: 'none',
            overflowY: 'hidden',
            height: '100%',
            // height: '100vh',
        },
        content: {
            top: '50%',
            left: '50%',
            zIndex: 9999,
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '0',
            border: 'none',
            maxHeight: '100%',
            background: '',
            overscrollBehaviorY: 'contain',
            overflowY: 'hidden',
            userSelect: 'none',
            // touchAction: 'none',
        }
    };

    const gachaStyles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            backgroundColor: "rgba(0,0,0,1)",
            overscrollBehavior: 'none',
            overscrollBehaviorY: 'none',
            // overflowY: 'hidden',
            height: '100%',
            width: '100%',
            // height: '100vh',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            height: '100%',
            width: '100%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '0',
            border: 'none',
            // maxHeight: '100%',
            background: '',
            overscrollBehaviorY: 'contain',
            overflowY: 'hidden',
            userSelect: 'none',
            touchAction: 'none',
        }
    };

    //  Modalのスタイル
    let customStyles = baseStyles;
    let modalWrapClass = 'informationPanel flex flex-col justify-center items-center text-white';
    let modalContentsWrapClass = 'informationPanelInner w-[calc(100vw_-_40px)] md:w-160 min-h-[50vh] md:min-h-[60vh] max-h-screen select-none px-8 sm:px-12 flex flex-col ';
    if(mode === 'playMovie'){
        customStyles = gachaStyles;
        modalWrapClass = 'flex flex-col justify-center items-center text-white';
        modalContentsWrapClass = 'w-full max-h-screen select-none flex flex-col';
    }
    // console.log('[BaseModal]customStyles==>', customStyles);

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
    // useEffect(() => {
    //     closeModal();
    // }, [location]);
    
    return (
        <section id="modal" className="">
            <Modal
                isOpen={modalStateValue.BaseModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel=""
                className=""
                // オーバーレイクリックで閉じるかどうか
                shouldCloseOnOverlayClick={false}
                //  スクリーンリーダー対策
                ariaHideApp={false}
            >



                <div id="modal-wrap" className={modalWrapClass}>
                    {/* 768以上で余白発生 */}
                    <div 
                        id="modal-contents-wrap"
                        className={modalContentsWrapClass}
                    >
                    {
                        (() => {
                            if (mode === 'playMovie') {
                                return( 
                                    <>
                                        <ModalContent />
                                        <ModalButton />
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <ModalHead />
                                        <ModalContent />
                                        <ModalButton />
                                    </>
                                );
                            }
                        })()
                    }
                    </div>
                </div>
                <GachaSoundsPrayer/>
            </Modal>
        </section>
    );
}

export default BaseModal;