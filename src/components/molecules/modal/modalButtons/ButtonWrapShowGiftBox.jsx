import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import {userState} from "../../../../store/recoil/userState";
import * as queries from "../../../../restapi/queries";
import {instance} from "../../../../services/axios";
import useSessionCheck from '../../../../hooks/useSessionCheck'



export const ButtonWrapShowGiftBox = ({handleOnSubmit}) => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const intl = useIntl();

    const { myGiftCards = {} } = UserStateObj;
    const [btnDisabled, setBtnDisabled] = useState(true);
    const { getSessionCheck } = useSessionCheck();
    useEffect(() => {
        setBtnDisabled(true)
        Object.keys(myGiftCards).map(key => {
            if(myGiftCards[key].isItemSelected){
                setBtnDisabled(false);
            }
        })
    }, [myGiftCards]);

    function closeModal(e) {
        
        // console.log("[ButtonWrapShowGiftBox]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }

    async function getGift(e) {
        // console.log("[ButtonWrapShowGiftBox]doLogin e==>", e);
        //  API通信のためにくるくるを開始
        let modalProperTy = {
            displayModal:true,
            modalType:"showGiftBox",
            mode:"read",
            data:{}
        }
        if (await getSessionCheck(modalProperTy,e)) {
            let selectedItemsInfo = [];
            let selectedItems = [];
            Object.keys(myGiftCards).map(key => {
                if(myGiftCards[key].isItemSelected){
                    setBtnDisabled(false);
                    selectedItemsInfo.push(myGiftCards[key])

                    let selectedItem = {};
                    selectedItem.userPresentId = myGiftCards[key].userPresentId;
                    selectedItems.push(selectedItem);
                }
            })
            console.log(selectedItems, 'selectedItems')

            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'Loading',
                data: {}
            }))

            try {
                let response;
                const config = {
                    method: queries.postMethod,
                    url: queries.baseURL + queries.userPresentExecute,
                    data: { 'giftCards': selectedItems }
                }

                response = await instance.request(config);

                console.log('response', response)
                if (response.status === 200) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'GetGiftCompleted',
                        data: { 'giftCardsInfo': selectedItemsInfo }
                    }))
                }
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        mode: "",
                        data: {title: "",body: intl.formatMessage({ id: 'A_system_error_has_occurred__Please_try_again' }),backToPrevModal:true,prevModalName:"showGiftBox"}
                    }))
                }
            } catch (err) {
                console.log("err--->", err);
                let statusCode = 400;
                if (err.response) {
                    const { data = {}, status = 400 } = err.response || '';
                    const { errorCode = '' } = data || '';
                    statusCode = errorCode ? errorCode : status;
                    if(statusCode === 400){
                        //user_id_invalid_error
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'error',
                            mode: "",
                            data: {title: "",body: "プレゼント受け取りが失敗しました",backToPrevModal:true,prevModalName:"showGiftBox"}
                        }))
                    }
                }
            }
        }
    }

    //  選択してから受け取るボタンを活性化する

    return (
        <div className="w-full flex flex-col justify-center items-center">
            {
                btnDisabled ?
                    <div
                        className="cursor-not-allowed button-white button-disable button-full flex flex-row justify-center items-center touch-none select-none"
                    >
                        <p className="pointer-events-none text-base font-bold font-Roboto">
                            {intl.formatMessage({ id: 'receive_gift' })}
                        </p>
                    </div>
                :
                    <div
                        className="button-full flex flex-row justify-center items-center touch-none select-none"
                        onClick={(e) => getGift()}
                    >
                        <p className="pointer-events-none text-base font-bold font-Roboto">
                            {intl.formatMessage({ id: 'receive_gift' })}
                        </p>
                    </div>
            }
            <div 
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => closeModal()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto text-button-error-text-close">
                    {intl.formatMessage({ id: 'close' })}
                </p>
            </div>
        </div>
    )

}