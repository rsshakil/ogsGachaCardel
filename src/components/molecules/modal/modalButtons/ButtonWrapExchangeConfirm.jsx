import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useLocation } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { displayState } from "../../../../store/recoil/displayState";

import {useIntl} from 'react-intl'
import { productListState } from "../../../../store/recoil/productListState";
import { userState } from "../../../../store/recoil/userState";
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';
import useCsrfToken from '../../../../hooks/useCsrfToken'
import session from '../../../../store/recoil/sessionState'
import checkStartValue from '../../../../functions/checkStartValue';
import {pointState} from "../../../../store/recoil/pointState";
import { headersParam } from '../../../../functions/commonFunctions';
import useSessionCheck from '../../../../hooks/useSessionCheck'

export const ButtonWrapExchangeConfirm = ({updateGachaUserPoint=()=>{}}) => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [{ loading, error, state }, setValid] = useRecoilState(session);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const { getCsrfToken } = useCsrfToken();
    const { getSessionCheck } = useSessionCheck();
    const {
        BaseModalOpen,
        modalType,
        mode,
    } = modalStateValue;

    const navigate = useNavigate();
    const [productListArraySingle, setProductListSingle] = useRecoilState(productListState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const location = useLocation();
console.log("Sakil eee>productListArraySingle",productListArraySingle) 

console.log("@@@@====", modalStateValue);
    // useGA4EventOripaExecute(modalStateValue.data?.packName, modalStateValue.data?.count, modalStateValue.data?.point);

    //  初期化
    function showPrize(e) {
        // console.log("[ButtonWrapExchangeConfirm]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'showPrize',
            // mode: "",
            // data: {}
        }))
    }
    function exchangeCancel(e) {
        //  現在のmodeでキャンセル後の遷移先をスイッチする
        //  allFromCollection=>コレクション
        //  selectedFromCollection=>コレクション
        //  allFromShowPrize=>抽選結果
        //  なし＝＞閉じる（例外）
        let back2modalType;
        if(mode === 'allFromCollection'){
            back2modalType = 'showCollection';
        }else if(mode === 'allFromShowPrize'){
            back2modalType = 'showPrize';
        }else if(mode === 'selectedFromCollection'){
            back2modalType ='showCollection';
        }else{
            back2modalType = '';
        }
        // console.log("[ButtonWrapExchangeConfirm]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: back2modalType,
            mode: "select",
            // data: {}
        }))
    }

    const updatePageRedirectState = (stateValue)=>{
        setDisplayState((prevState)=>({
            ...prevState,
            displayTopPageWithOutRedirect:stateValue
        }))
    }

    async function exchangeConfirmed(e) {
        console.log("@@@@ modalStateValue==>", modalStateValue);
        console.log("@@@@ allCollection",modalStateValue.data.prizes);

        //loader starat
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            mode: "",
            // data: {}
        }));

        let userCollectionIds;
        if(modalStateValue.mode==="allFromCollection"){//this for only Collection all point
            userCollectionIds = "all";
        }else{
            let collectionList = modalStateValue.data?.prizes?modalStateValue.data?.prizes:{};
            let selectedItems = Object.keys(collectionList)
            .filter(key => collectionList[key].isItemSelected===true)
            .reduce((obj, key) => {
            obj[key] = collectionList[key];
            return obj;
            }, {});
            let allCollectionIds = collectionList && Object.keys(collectionList).length>0 && Object.keys(collectionList).map((item)=>collectionList[item].userCollectionId);
            console.log("selectedItems",selectedItems)
            if(selectedItems && Object.keys(selectedItems).length>0){
                let selectedCollectionId = Object.keys(selectedItems).map((item)=>selectedItems[item].userCollectionId);
                console.log("selectedCollectionId",selectedCollectionId)
                if(modalStateValue.mode=="selectedFromCollection"){//fromColectionPassJustSectionItem
                    allCollectionIds = selectedCollectionId;
                    console.log("@@@@ selectedCollectionId",allCollectionIds);
                }
            }
            console.log("@@@@ allCollectionIds",allCollectionIds);
            userCollectionIds = allCollectionIds.filter(n => n);
            console.log("@@@@ userCollectionIds",allCollectionIds);
        }

        // check-sessionに問題なし
        if (await getSessionCheck()) {
            //SessionCheckSuccess
            try {
                console.log("@@@@ allCollectionIds post",userCollectionIds);
                const config = {
                    method: queries.postMethod,
                    url: queries.baseURL + queries.userCollectionExecute,
                    data:{
                        pattern:1,
                        userCollectionId:userCollectionIds
                    }
                }

                const response = await instance.request(config);
                console.log("API RESPONSE",response)
                if (response.status == 200) {
                    // setModalState((prevState) => ({
                    //     ...prevState,
                    //     BaseModalOpen: true,
                    //     modalType: 'exchangeCompleted',
                    //     // mode: "edit",
                    //     data: {
                    //         'pointStart':Math.floor(Math.random() * (99 - 1) + 1),
                    //         'pointEnd':Math.floor(Math.random() * (99999 - 1) + 1),
                    //     }
                    // }));
                    //CloseModal & updateUserPoit #113969
                    updateGachaUserPoint();
                }
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        mode: "",
                        data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
                    }));
                }
            } catch (err) {
                console.log('app count up err---3', err)
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'error',
                    mode: "",
                    data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
                }));
            }
            let ranDomValue = Math.floor(1000 + Math.random() * 99999999999);
            try {
                let gachaId = location && location?.pathname && location.pathname.slice(location.pathname.lastIndexOf("/") , location.pathname.length);
                gachaId = gachaId.slice(1);
                console.log("Sakil GachaID",gachaId);
                console.log("@@@@@@@@@3", gachaId);
                const config = {
                    method: "get",
                    url: queries.baseURL + queries.readProduct + gachaId + "?l=" + UserStateObj.language
                }
                const result = await instance.request(config);
                // 商品詳細をrecoilにセットする
                console.log(">>>>>>>>>>>>>>>>>>>> Sakil updateResult 10",result)
                console.log(">>>>>>>>>>>>>>>>>>>> Sakil updateResult 10-2",productListArraySingle)
                const gachaIdKey = Object.keys(result?.data.response.gachaData)[0];
                // productListArraySingle[gachaIdKey] = result.data.response.gachaData[gachaIdKey];
                if(result.data.response.gachaData[gachaIdKey]){

                    setProductListSingle({...productListArraySingle,[gachaIdKey]:result.data.response.gachaData[gachaIdKey]});
                    console.log("Sakil updateRecoil>productListArraySingle",productListArraySingle)
                    //displayTOpPagesIf gachaRemainingCount 0 means all are soldOut;
                    if(result.data.response.gachaData[gachaIdKey].gachaSoldOutFlag==1){
                        updatePageRedirectState(false);//not display top page
                    }else{
                        console.log("redirectTopPage from exchangeConfirm1")
                        if(result.data.response.gachaData[gachaIdKey].gachaRemainingCount==0){
                            updatePageRedirectState(ranDomValue);//display top page
                        }
                    }
                }else{
                    //displayTopPageWithRedirect
                    console.log("redirectTopPage from exchangeConfirm")
                    updatePageRedirectState(ranDomValue);//display top page
                }
            } catch (err) {
                console.log('app count up err---3', err)
            }
        }
    }

    return (
    <>
        <div 
            className="button-half-left flex flex-row justify-center items-center touch-none select-none"
            // onClick={(e) => gachaLoading()}
            onClick={(e) => exchangeConfirmed()}
        >
            <p className="pointer-events-none text-base font-bold font-Roboto">
                {intl.formatMessage({ id: 'confirm' })}
            </p>
        </div>
        <div 
            className="button-half-right button-white flex flex-row justify-center items-center touch-none select-none"
            onClick={(e) => exchangeCancel()}
        >
            <p className="pointer-events-none text-base font-bold font-Roboto text-slate">
                {intl.formatMessage({ id: 'Back' })}
            </p>
        </div>
    </>
)

}