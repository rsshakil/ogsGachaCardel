import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../../store/recoil/userState";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'

// GA4 ガチャ行動
import useGA4EventOripaExecute from "../../../../lib/useGA4EventOripaExecute";

export const ButtonWrapShowPrize = () => {
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const intl = useIntl()

    function closeModal(e) {
        // console.log("[ButtonWrapShowPrize]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            // mode: "edit",
            // data: {}
        }))
    }
    ///////////////////////////////////////////////////////
    //　選択カードをコレクション
    function doCollection(e) {
        // console.log("[ButtonWrapShowPrize]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'collectionConfirm',
            // mode: "edit",
            // data: {}
        }))
    }
    ///////////////////////////////////////////////////////
    //　全てpt還元
    function doExchange(e) {
        // console.log("[ButtonWrapShowPrize]doExchange e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'exchangeConfirm',
            mode: e,
            // data: {}
        }))
    }
    ///////////////////////////////////////////////////////
    //　card選択の判定
    //
    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj?.languageResource;
    // console.log("[ButtonWrapShowPrize]languageResource==>", languageResource);
    //  現在の表示言語で利用している景品の配列
    let prizesArray;
    prizesArray = modalStateValue.data?.prizes
    // console.log("[ButtonWrapShowPrize]現在の表示言語で利用している景品の配列==>", prizesArray);
    //  現在の表示言語で利用している景品の配列の変動を監視
    //  選択候補をコレクション押せるかどうかのフラグ
    const [canCollection, setCanCollection] = useState('disableCollection');
    useEffect(() => {
        // console.log("[ButtonWrapShowPrize]現在の表示言語で利用している景品の配列の変動を監視==>", prizesArray);
        //  初期化してtrueがあれば上書きされる
        setCanCollection('disableCollection')
        Object.keys(prizesArray).map(key => {
            // console.log("[ButtonWrapShowPrize]prizesArray[key].isItemSelected==>", prizesArray[key].isItemSelected);
            if(prizesArray[key].isItemSelected){
                setCanCollection('enableCollection')
            }
        })
    }, [prizesArray]);





// console.log("@@@@====kokoka?", modalStateValue.data);
    
    useGA4EventOripaExecute(modalStateValue);

    ///////////////////////////////////////////////////////
    //　全て還元はいつでも押せて良い
    //  選択カードコレクションは選択した時だけ押せるようにする
    //  
    //  
    ///////////////////////////////////////////////////////

    async function doLogin(e) {
        console.log("[ButtonWrapShowPrize]doLogin e==>", e);
    }
    
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => doExchange("allFromShowPrize")}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    {intl.formatMessage({ id: 'Exchange_all_points' })}
                </p>
            </div>
            {
                {
                    'disableCollection':<div className={`cursor-not-allowed button-full button-white button-disable flex flex-row justify-center items-center touch-none select-none mt-4`}>
                                            <p className="pointer-events-none text-base font-bold font-Roboto mix-blend-soft-light">
                                                {intl.formatMessage({ id: 'Collect_selected_cards' })}
                                            </p>
                                        </div>,
                    'enableCollection':<div 
                                            className={`cursor-pointer button-full button-white flex flex-row justify-center items-center touch-none select-none mt-4`}
                                            onClick={(e) => doCollection()}
                                        >
                                            <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text">
                                                {intl.formatMessage({ id: 'Collect_selected_cards' })}
                                            </p>
                                        </div>,
                }[canCollection]
            }
        </div>
)

}