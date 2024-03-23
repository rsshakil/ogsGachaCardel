import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";

// import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/_trash/settingsState";
import { displayState } from "../../store/recoil/displayState";
import { modalState } from "../../store/recoil/modalState";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";


import usePageTitle from "../../hooks/usePageTitle";
import { Slider } from "../molecules/Slider";
import { ProductList } from "../molecules/ProductList";
import { Information } from "../molecules/Information";
import { CorporateInfo } from "../molecules/CorporateInfo";
import { Icatch } from "../molecules/Icatch";
import { ProductDetail } from "../molecules/ProductDetail";
import { ProductContent } from "../molecules/ProductContent"
import { Play } from "../molecules/Play";
import { Top } from "./Top";
import BaseModal from "../molecules/modal/BaseModal";
import {useIntl} from 'react-intl';
import { QueryParameter } from "../../functions/QueryParameter";
import useMetaDescription from "../../hooks/useMetaDescription";

import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';

export const Pack = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const intl = useIntl()
    // const history = useHistory();
    const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [productListArray, setProductList] = useRecoilState(productListState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [isProductExists, setIsProductExists] = useState(true);
    const { id } = useParams();
    console.log("[Icatch]useParams.idPack=======>",id);
    // console.log(settingsStateStateValue);
    // const [searchParams] = useSearchParams();
    // console.log("[Pack]searchParams=======>",searchParams);
    // const getUseParams = useParams();
    // const { id } = useParams();
    // const { name } = useParams();
    // console.log("[Pack]useParams.id=======>",id);
    // console.log("[Pack]useParams.name=======>",name);

    useEffect(() => {
        console.log("useEfeectCallFromPack");
        (async () => {
            // 通信処理 商品詳細を取得
            try {
                console.log("@@@@@@@@@2", id);
                const config = {
                    method: "get",
                    url: queries.baseURL + queries.readProduct + id + "?l=" + UserStateObj.language
                }
                const result = await instance.request(config);
                const gachaIdKey = Object.keys(result?.data.response.gachaData)[0];
                console.log(">>>>>>>>>>>>>>>>>>>> 0-5gachaIdKeysss",gachaIdKey);
                console.log(">>>>>>>>>>>>>>>>>>>> 0-6gachaIdKey",result.data.response.gachaData[gachaIdKey]);
                if(result.data.response.gachaData[gachaIdKey]){
                    setProductList({...productListArray,[gachaIdKey]:result.data.response.gachaData[gachaIdKey]});
                    setDisplayState((prevState)=>({
                        ...prevState,
                        displayTopPageWithOutRedirect:false
                    }))
                }else{
                    //product not found go to top page
                    console.log("product not found go to top page");
                    setDisplayState((prevState)=>({
                        ...prevState,
                        displayTopPageWithOutRedirect:Math.floor(1000 + Math.random() * 99999999999)
                    }))
                    // navigate("/");
                }
                
            } catch (err) {
                console.log('app count up err', err)
            }
        })();
    }, [id]);

    //disPlayTopPageBaseOnCollectionConfirmOrExechangeConfirm
    useEffect(()=>{
        if(displayStateValue?.displayTopPageWithOutRedirect){
            (async () => {
                try {
                    const config = {
                    method: "get",
                    url: queries.baseURL + queries.readProduct + "?l=" + UserStateObj.language
                    }
                    const result = await instance.request(config);
                    setProductList(result?.data.gachaList);
                }
                catch (err) {
                    console.log('[App]app count up err', err)
                }

            })();
        }
    },[displayStateValue?.displayTopPageWithOutRedirect]);

    let pagePath = 'pack';
    // let pageName = location.state?.data.name;
    let pageTitle = intl.formatMessage({ id: 'gacha' }) + " | " + intl.formatMessage({ id: 'CARDEL' }) + " " + intl.formatMessage({ id: 'official_site' });
    let metaDescription = intl.formatMessage({ id: 'meta_description' });

    useEffect(() => {
        // window.history.pushState(null, '', window.location.href);
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,

        }))
    }, [location]);


    usePageTitle(displayStateValue.pageTitle);
    useMetaDescription(metaDescription);

    //  念の為モーダルを初期化
    function closeModal(e) {
        console.log("[BaseModal]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }
    useEffect(() => {
        closeModal();
    }, [location]);



    return (
        <div>
        {productListArray[id] && Object.keys(productListArray[id]).length>0 && productListArray[id].gachaSoldOutFlag==0 && productListArray[id].gachaRemainingCount==0?<>
            <Top />
        </> : displayStateValue?.displayTopPageWithOutRedirect==false && productListArray[id] && Object.keys(productListArray[id]).length>0? 
            <div className="flex justify-center">
                <div className="max-w-screen-sm w-full">
                        <QueryParameter />
                        <ProductContent />
                        {/* <Icatch />
                        <ProductDetail /> */}
                        <Play />
                </div>
            </div>:<Top />
        }
        </div>
    );
};



