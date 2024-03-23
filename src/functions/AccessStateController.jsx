import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessState } from "../store/recoil/accessState";
import { useLocation } from "react-router-dom";
import axios from "axios";

//これは使わなくなるかもしれない

export const AccessStateController = () => {

	const location = useLocation();
    const navigate = useNavigate();
    const API_URL = 'http://httpbin.org/ip';
    let AccessIp = '';
    //  https://ipinfo.io/ip
    //  https://api.ipify.org/'
    //  http://inet-ip.info/
    // const logDataRecordTime = new Date().toLocaleString();
    //recoilStateValueからqrのIDを取り出し
	const [accessStateValue, setAccessState] = useRecoilState(accessState);
    const logDataRecordTime = new Date().toLocaleString();
    useEffect(() => {
        axios.get(API_URL,{
            params: {
                //GETのパラメータ
                format: 'json',
              }
        }).then((response) => {
            AccessIp = response.data.ip;
            console.log("中＝＞",response);
            console.log("中＝＞"+JSON.stringify(AccessIp,null, '...'));
            setAccessState((oldSetAccessState) => (
                {
                    ...oldSetAccessState,

                    accessIp : response.data.ip,
                    accessUrl: window.location.href,
                    accessLanguage: window.navigator.language,
                    accessReferrer: document.referrer,
                    userAgent: window.navigator.userAgent,
                    LogDataRecordTime: logDataRecordTime,
                }
                ));
        });

    },[location]);
    return ;
};

