import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import { userState } from "../../../../store/recoil/userState";
import {pointState} from "../../../../store/recoil/pointState";
import { productListState } from "../../../../store/recoil/productListState";
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';    
import useCsrfToken from '../../../../hooks/useCsrfToken'
import session from '../../../../store/recoil/sessionState'
import checkStartValue from '../../../../functions/checkStartValue';
import { headersParam } from '../../../../functions/commonFunctions';
import useSessionCheck from '../../../../hooks/useSessionCheck'
import {unixTimestampToDateFormat} from "../../../../utils/commonFunctions";



export const ButtonWrapShippingConfirm = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [{ loading, error, state }, setValid] = useRecoilState(session)
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    const {
        BaseModalOpen,
        modalType,
        mode,
    } = modalStateValue;

    //  初期化
    function showPrize(e) {
        // console.log("[ButtonWrapShippingConfirm]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'showPrize',
            // mode: "",
            // data: {}
        }))
    }
    function back2yShippingAddress(e) {
        //  現在のmodeでキャンセル後の遷移先をスイッチする
        //  allFromCollection=>コレクション
        //  selectedFromCollection=>コレクション
        //  allFromShowPrize=>抽選結果
        //  なし＝＞閉じる（例外）

        // console.log("[ButtonWrapShippingConfirm]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'ConfirmShippingAddress',
            mode: "select",
            // data: {}
        }))
    }


    async function shippingConfirmed(e) {
        // console.log("[ButtonWrapShippingConfirm]playMovie==>", e);
        //  API通信のためにくるくるを開始
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "edit",
            // data: {}
        }));
        //Get userShipping
        let userShippingObject = UserStateObj.myShippingAddress && Object.keys(UserStateObj.myShippingAddress)
        .filter(key => UserStateObj.myShippingAddress[key].isItemSelected==true)
        .reduce((obj, key) => {
        obj[key] = UserStateObj.myShippingAddress[key];
        return obj;
        }, {});
        console.log("userShippingObject",userShippingObject);
        let shippingId = userShippingObject && Object.keys(userShippingObject).length>0 && Object.keys(userShippingObject).map(key=>userShippingObject[key].userShippingId)[0];
        //Get userCollectionIds
        let userCollectionListObject = UserStateObj.myCollection && Object.keys(UserStateObj.myCollection)
        .filter(key => UserStateObj.myCollection[key].userCollectionId && UserStateObj.myCollection[key].isItemSelected==true)
        .reduce((obj, key) => {
        obj[key] = UserStateObj.myCollection[key];
        return obj;
        }, {});
        console.log("userCollectionListObject",userCollectionListObject);
        let userCollectionIds = userCollectionListObject && Object.keys(userCollectionListObject).length>0 && Object.keys(userCollectionListObject).map(key=>userCollectionListObject[key].userCollectionId);
        console.log("userShippingId",shippingId);

        let unableShippingItemLength = userCollectionListObject && Object.keys(userCollectionListObject).length>0 && Object.keys(userCollectionListObject).filter(key=>!userCollectionListObject[key].itemShippingFlag).length;

        console.log("userCollectionIds",userCollectionIds);
        //Not need to check from frontend
        // if(unableShippingItemLength>0){
        //     setModalState((prevState) => ({
        //         ...prevState,
        //         BaseModalOpen: true,
        //         modalType: 'error',
        //         mode: "",
        //         data: {title: '',body: "unable shipping item exists"}
        //     }));
        //     return false;
        // }
        //CallAppi

        // check-sessionに問題なし
        if (await getSessionCheck(shippingConfirmed,e)) {
            try{
                //1. Check for SMS authentication
               const config = {
                    method: queries.postMethod,
                    url: queries.baseURL + queries.userSmsShipping,
                    data:{
                        userShippingId: shippingId
                    }
                }
                const {data, status} = await instance.request(config);
    
                //Open OTP input modal
                if(status == 200) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType:"ShippingApplicationIdentityVerification",
                        data: {
                            pattern: 2,
                            userCollectionId: userCollectionIds,
                            userShippingId: shippingId,
                        }
                    }))
                }
                //Open error contentSmsNotAuthenticated modal
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        mode: "shipping",
                        modalType: "SmsNotAuthenticated",
                    }))
                }

            }catch(err){
                console.log("Api error",err);
                let statusCode = 400;
                if (err.response) {
                    const { status = 400 } = err.response || '';
                    const {errorCode, ip = "", timestamp = []} = err.response?.data || '';
                    console.log("errorCode", errorCode);
                    statusCode = errorCode ? errorCode : status;

                    if (errorCode == 403) {
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            mode: "shipping",
                            modalType: "SmsNotAuthenticated",
                        }))

                        return;
                    } else if (statusCode == 601) {//ipAddressError
                        // let attemptTimes = timestamp[0] && timestamp[0].length > 0 && timestamp[0].map(attemptTime => {
                        //     return `\t\t\t${unixTimestampToDateFormat(attemptTime.userCreatedAt, true, true)}`;
                        // });
                        // setModalState((prevState) => ({
                        //     ...prevState,
                        //     BaseModalOpen: true,
                        //     modalType: 'IPFail2BanError',
                        //     mode: "",
                        //     data: {
                        //         ...prevState.data,
                        //         formData: {},
                        //         IPAddress: ip,
                        //         datearray: attemptTimes

                        //     }
                        // }))
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'ipRestriction'
                        }))

                        return;
                    }
                    else {
                        let mType = "error";
                        let mData = {
                            title: "",
                            body: intl.formatMessage({id: "A_system_error_has_occurred__Please_try_again"})
                        };

                        //show error modal when api error occured
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: mType,
                            // mode: "",
                            data: mData
                        }))
                    }
                }
            }
        }
    }


    return (
    <>
        <div 
            className="button-half-left flex flex-row justify-center items-center touch-none select-none"
            // onClick={(e) => gachaLoading()}
            onClick={(e) => shippingConfirmed({})}
        >
            <p className="pointer-events-none text-base font-bold font-Roboto">
                {intl.formatMessage({ id: 'Shipping_application' })}
            </p>
        </div>
        <div 
            className="button-half-right button-white flex flex-row justify-center items-center touch-none select-none"
            onClick={(e) => back2yShippingAddress()}
        >
            <p className="pointer-events-none text-base font-bold font-Roboto text-slate">
                {intl.formatMessage({ id: 'Back' })}
            </p>
        </div>
    </>
)

}