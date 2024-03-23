import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams, useParams, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";



import {useIntl} from 'react-intl'


export const SoldOut = (props) => {
    const intl = useIntl()
    const location = useLocation();
    const navigate = useNavigate();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [productListArray, setProductList] = useRecoilState(productListState);
    // console.log("[CountDown]", productListArray)





  return (
    <div className="sold-out-wrap top-0 absolute w-full h-full flex flex-col justify-center items-center">
        <div className="sold-out flex flex-row items-end font-Noto font-black text-5xl">
            <p>SOLDOUT</p>
        </div>
    </div>
    );
};


