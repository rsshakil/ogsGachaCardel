import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../../store/recoil/userState";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import useSessionCheck from '../../../../hooks/useSessionCheck'


export const ButtonWrapShowCollection = ({handleOnSubmit}) => {
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const intl = useIntl()
    const { getSessionCheck } = useSessionCheck();

    function closeModal(e) {
        // console.log("[ButtonWrapShowCollection]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "",
            data: {}
        }))
    }
    ///////////////////////////////////////////////////////
    //  選択カードを発送
    //  住所の選択を規定値にリセットする
    async function doShipping(e) {
        // console.log("[ButtonWrapShowCollection]closeModal e==>", e);
        //  住所の選択を規定値にリセットする
        let selectedCard = Object.keys(UserStateObj.myCollection).filter(key=>UserStateObj.myCollection[key].isItemSelected);
        console.log("selectedCard",selectedCard);
        if(selectedCard && selectedCard.length>10){
            let mData = {
                title: "",
                body: intl.formatMessage({ id: 'max_card_limit_shipping_error' }),
                backToPrevModal:true,
                prevModalName:"showCollection",
                prevModalMode:"select"
            }
            //show error modal when api error occured
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: "error",
                mode:"select",
                data: {...prevState.data, ...mData}
            }))
            return false;
        }
        if (await getSessionCheck(doShipping,e)) {
            let ShippingPriorityFlag = 0;
            Object.keys(UserStateObj.myShippingAddress).map(priorityFlagUUID => {
                ShippingPriorityFlag = UserStateObj.myShippingAddress[priorityFlagUUID].userShippingPriorityFlag;
                // console.log("[ContentShowShippingAddress]priorityFlagUUID==>",priorityFlagUUID,"ShippingPriorityFlag==>", ShippingPriorityFlag);
                if(ShippingPriorityFlag === 1){
                    //  規定値：選択済みにする
                    setUserState((prevState) => ({
                        ...prevState,
                            'myShippingAddress': {
                                ...prevState.myShippingAddress,
                                [priorityFlagUUID]: {
                                    ...prevState.myShippingAddress[priorityFlagUUID],
                                    'isItemSelected' : true
                                },
                            }
                    }))
                }else if(ShippingPriorityFlag === 0){
                    //  ！規定値：非選択にする
                    setUserState((prevState) => ({
                        ...prevState,
                            'myShippingAddress': {
                                ...prevState.myShippingAddress,
                                [priorityFlagUUID]: {
                                    ...prevState.myShippingAddress[priorityFlagUUID],
                                    'isItemSelected' : false
                                },
                            }
                    }))
                }
            })

            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'ConfirmShippingAddress',
                mode: "select",
                // data: {}
            }))
        }
    }


    ///////////////////////////////////////////////////////
    //  全てpt還元
    function doExchange(e) {
        console.log("[ButtonWrapShowCollection]doExchange e==>", e);
        
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'exchangeConfirm',
                mode: e,
                data:{
                    prizes:{...UserStateObj.myCollection}
                }
            }))
    }
    ///////////////////////////////////////////////////////
    //  card選択の判定
    //
    //  現在の表示言語
    let languageResource;
    languageResource = UserStateObj?.languageResource;
    // console.log("[ButtonWrapShowCollection]languageResource==>", languageResource);
    //  現在の表示言語で利用している景品の配列
    let prizesArray;
    // prizesArray = modalStateValue.data?.prizes
    prizesArray = UserStateObj.myCollection;
    // console.log("[ButtonWrapShowCollection]UserStateObj==>", UserStateObj);
    // console.log("[ButtonWrapShowCollection]現在の表示言語で利用している景品の配列==>", prizesArray);
    //  現在の表示言語で利用している景品の配列の変動を監視
    //  選択候補をコレクション押せるかどうかのフラグ
    const [canCollection, setCanCollection] = useState('disableCollection');
    //  全てpt還元押せるかどうかのフラグ
    const [canExchangeAllPoints, setCanExchangeAllPoints] = useState('disableExchangeAllPoints');
    useEffect(() => {
        // console.log("[ButtonWrapShowCollection]現在の表示言語で利用している景品の配列の変動を監視==>", prizesArray);
        //  初期化してtrueがあれば上書きされる
        setCanCollection('disableCollection')
        //  からになった可能性もあるので初期化
        setCanExchangeAllPoints('disableExchangeAllPoints')
        Object.keys(prizesArray).map(key => {
            console.log("[ButtonWrapShowCollection]prizesArray[key].isItemSelected==>", prizesArray[key].isItemSelected);
            //  コレクションがあるので全てpt還元を活性化
            setCanExchangeAllPoints('enableExchangeAllPoints')
            if(prizesArray[key].isItemSelected){
                setCanCollection('enableCollection')
            }
        })
    }, [prizesArray]);







    ///////////////////////////////////////////////////////
    //　全て還元はいつでも押せて良い
    //  選択カードコレクションは選択した時だけ押せるようにする
    //  
    //  
    ///////////////////////////////////////////////////////

    async function doLogin(e) {
        // console.log("[ButtonWrapShowPrize]doLogin e==>", e);
        handleOnSubmit();
    }
    
    return (
        <div id="ButtonWrapShowCollection" className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-row justify-between items-center">
            {
                {
                    'disableCollection':
                    <>
                        <div className={`cursor-not-allowed button-half-left button-white button-disable flex flex-row justify-center items-center touch-none select-none`}>
                            <p className="pointer-events-none text-sm font-bold font-Roboto mix-blend-soft-light">
                                {intl.formatMessage({ id: 'Ship_selected_cards' })}
                            </p>
                        </div>
                        <div className={`cursor-not-allowed button-half-right button-white button-disable flex flex-row justify-center items-center touch-none select-none`}>
                            <p className="pointer-events-none text-sm font-bold font-Roboto mix-blend-soft-light">
                                {intl.formatMessage({ id: 'Exchange_selected_cards' })}
                            </p>
                        </div>
                    </>,
                    'enableCollection':
                    <>
                        <div 
                            className={`cursor-pointer button-half-left flex flex-row justify-center items-center touch-none select-none text-white`}
                            onClick={(e) => doShipping({})}
                        >
                            <p className="pointer-events-none text-sm font-bold font-Roboto">
                                {intl.formatMessage({ id: 'Ship_selected_cards' })}
                            </p>
                        </div>
                        <div 
                            className={`cursor-pointer button-half-right  flex flex-row justify-center items-center touch-none select-none text-white`}
                            onClick={(e) => doExchange("selectedFromCollection")}
                        >
                            <p className="pointer-events-none text-sm font-bold font-Roboto">
                                {intl.formatMessage({ id: 'Exchange_selected_cards' })}
                            </p>
                        </div>
                    </>,
                }[canCollection]
            }
            </div>
            <div className="w-full flex flex-row mt-4 justify-between items-center">
            {
                {
                    'disableExchangeAllPoints':
                        <>
                            <div 
                                className="cursor-not-allowed button-half-left button-white button-disable flex flex-row justify-center items-center touch-none select-none"
                            >
                                <p className="pointer-events-none text-sm font-bold font-Roboto mix-blend-soft-light">{intl.formatMessage({ id: 'Exchange_all_points' })}</p>
                            </div>
                        </>,
                    'enableExchangeAllPoints':
                        <>
                            <div 
                                className="button-half-left button-green flex flex-row justify-center items-center touch-none select-none"
                                onClick={(e) => doExchange("allFromCollection")}
                            >
                                <p className="pointer-events-none text-base font-bold font-Roboto text-white">{intl.formatMessage({ id: 'Exchange_all_points' })}</p>
                            </div>
                        </>
                }[canExchangeAllPoints]
            }
                <div 
                    className="button-half-right button-white flex flex-row justify-center items-center touch-none select-none"
                    onClick={(e) => closeModal()}
                >
                    <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text-close">{intl.formatMessage({ id: 'close' })}</p>
                </div>
            </div>










        </div>
)

}