import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios';
import axios from "axios";

///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';
///////////////////

export const EnterEpsilonPurchaseForm2 = () => {
    const tokenRef = useRef(null);
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const [formData, setFormData] = useState({
        userPaymentHistoryCardNumber: "",
        userPaymentHistoryCardExpire: "",
        userPaymentHistoryCardCVC: "",
        userPaymentHistoryCardHolderName: "",
    });
    const [errorMessage, setErrorMessage] = useState({
        userPaymentHistoryCardNumberErrorMessage: null,
        userPaymentHistoryCardNumberMaxLenErrorMessage: null,
        userPaymentHistoryCardExpireErrorMessage: null,
        userPaymentHistoryCardExpireMaxLenErrorMessage: null,
        userPaymentHistoryCardCVCErrorMessage: null,
        userPaymentHistoryCardCVCMaxLenErrorMessage: null,
        userPaymentHistoryCardHolderNameErrorMessage: null,
        userPaymentHistoryCardHolderNameMaxLenErrorMessage: null,
    });
    

    useEffect(() => {
        setModalState(prevState => ({...prevState, data: {...prevState.data, formData}}))
    }, []);

    useEffect(() => {
        const { data } = modalStateValue;
        if (data) {
            const { formData, errorMessages } = data;
            if(formData) {
                setFormData(formData);
            }
            if (errorMessages) {
                setErrorMessage(errorMessages);
            }
        }
    }, [modalStateValue]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const execTrade = async(response) => {
        try {
            console.log("response.tokenObject", response.tokenObject);
            if( response.resultCode != '000' ){
                window.alert('トークン発行処理中にエラーが発生しました')
            }
            else{
                console.log('トークン発行処理成功')
                // トークンを元にフォーム送信
                // その前にトークンデータでPaymentHistoryを作成する
                const config = {
                    method: queries.postMethod,
                    url: queries.createPaymentEpsilon2,
                    data: {
                        token: response.tokenObject?.token,
                        cpp: 1 // 購入商品により変動
                    }
                }
                const createPayment = await instance.request(config);
                console.log("createPayment", createPayment);
                const {data, status} = createPayment || {};


/*
                // ペイメント新規作成完了
                if (status == 200) {

                    console.log('data check >>', data)

                    // console.log(document.getElmentsById("orderForm").submit());
                    // return;
                    const config2 = {
                        // method: queries.postMethod,
                        // url: "https://beta.epsilon.jp/cgi-bin/order/direct_card_payment.cgi",
                        // data: {
                        contract_code: 74526050,
                        token: response.tokenObject?.token,
                        user_id: data.userId,
                        user_id: 'satoh002',
                        user_name: '佐藤太郎',
                        user_mail_add: 'sato@sample.jp',
                        item_code: 'T2000',
                        item_name: 'りんご×5個',
                        order_number: 'A123456789',
                        st_code: '11000-0000-00000',
                        mission_code: 1,
                        item_price: 50000,
                        process_code: 1,
                        user_agent: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
                        memo1: '青森産',
                        memo2:'配送は月曜日',
                        card_st_code: 10,
                        pay_time: null,
                        tds_check_code: 1,
                        keitai: 0,
                        kari_flag: 1,
                        security_check: 1,
                        // }
                    }
                    fetch("https://beta.epsilon.jp/cgi-bin/order/direct_card_payment.cgi", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(config2),
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("response data", data);
                    });
                    const url = "https://beta.epsilon.jp/cgi-bin/order/direct_card_payment.cgi"
                    const headers = {
                        // 'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const response2 = await axios.post(url, config2, {headers: headers});
                    console.log("response2", response2);
*/
/*
                    await fetch(url, {
                        mode: 'cors',
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(config2)
                    })
                    .then(response => {
                        console.log("response", response);
                    });
*/
// const axios = require('axios');
/*
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://beta.epsilon.jp/cgi-bin/order/direct_card_payment.cgi',
  headers: {'Content-Type':'application/xml', }
};

await axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});                    
*/
                // }
                // ペイメント作成失敗 システムエラー問い合わせ表示
                // else {
                // }
            }
        }catch(error) {
            console.log('my error >>>', error);
            const { errorCode } = error.response?.data || '';
        }
/*
            //カード情報は念のため値を除去
            document.getElementById('cardno').value=""; 
            document.getElementById('expire_year').value=""
            document.getElementById('expire_month').value=""
            document.getElementById('securitycode').value=""
            //予め購入フォームに用意したtokenフィールドに、値を設定
            document.getElementById('token').value = response.tokenObject.token;
            //スクリプトからフォームをsubmit
            document.getEmentsById('purchaseForm').submit() 
*/
    }

    window.execTrade = execTrade;

	////////////////////////////////////////////
	//	別コンポーネントからSubmitされる
	const onEpsilonPurchaseFormsubmit = async (e) => {
        e.preventDefault();
        // クルクルを実装
        console.log("[EnterEpsilonPurchaseForm2]onEpsilonPurchaseFormsubmit");
        console.log('pppppp >>>',   window.EpsilonToken)
        var cardObj = {};
        // cardObj.cardno = document.getElementById('cardno').value;
        // cardObj.expire = document.getElementById('expire_year').value + document.getElementById('expire_month').value;
        // cardObj.securitycode = document.getElementById('securitycode').value;
        // cardObj.holdername = document.getElementById('holdername').value;
        cardObj.cardno = "3573708502901001";
        cardObj.expire = "202405";
        cardObj.securitycode = "111";
        cardObj.holdername = "takuya haga";
        window.EpsilonToken.init("74526050");
        console.log("cardObj", cardObj);
        window.EpsilonToken.getToken(cardObj, "execTrade");
    }
	//	別コンポーネントからSubmitされる
	////////////////////////////////////////////

    // function onsubmit(){
    //     console.log("[EnterEpsilonPurchaseForm2]onsubmit");

    //  }
      

 
    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form 
                className="gap-2" 
                id="epsilonPurchaseForm2" 
                // onSubmit={handleSubmit}
                // method="POST"
                // name="myForm" 
                // target="dummyIframe"
                onSubmit={onEpsilonPurchaseFormsubmit}
            >
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Card_number' })}
                    </label>
                    <input name="userPaymentHistoryCardNumber" onChange={handleInputChange} id="" className="" value={formData.userPaymentHistoryCardNumber} />
                    <span className="text-xs text-error-message">
                        {errorMessage.userPaymentHistoryCardNumberErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryCardNumberErrorMessage })}
                        {errorMessage.userPaymentHistoryCardNumberMaxLenErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryCardNumberMaxLenErrorMessage })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Card_expire' })}
                    </label>
                    <input name="userPaymentHistoryCardExpire" onChange={handleInputChange} id="" className="" value={formData.userPaymentHistoryCardExpire} />
                    <span className="text-xs text-error-message">
                        {errorMessage.userPaymentHistoryCardExpireErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryCardExpireErrorMessage })}
                        {errorMessage.userPaymentHistoryCardExpireMaxLenErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryCardExpireMaxLenErrorMessage })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Card_cvc' })}
                    </label>
                    <input name="userPaymentHistoryCardCVC" onChange={handleInputChange} id="" className="" value={formData.userPaymentHistoryCardCVC} />
                    <span className="text-xs text-error-message">
                        {errorMessage.userPaymentHistoryCardCVCErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryCardCVCErrorMessage })}
                        {errorMessage.userPaymentHistoryCardCVCMaxLenErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryCardCVCMaxLenErrorMessage })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Card_holdername' })}
                    </label>
                    <input name="userPaymentHistoryCardHolderName" onChange={handleInputChange} id="" className="" value={formData.userPaymentHistoryCardHolderName} />
                    <span className="text-xs text-error-message">
                        {errorMessage.userPaymentHistoryCardHolderNameErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryCardHolderNameErrorMessage })}
                        {errorMessage.userPaymentHistoryCardHolderNameMaxLenErrorMessage && intl.formatMessage({ id: errorMessage.userPaymentHistoryCardHolderNameMaxLenErrorMessage })}
                    </span>
                </div>


                <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                    <p className="text-xs">
説明            1111
                    </p>
                    <p className="text-xs">

                    </p>
                </div>
                <form name="orderForm" id="orderForm" action="https://beta.epsilon.jp/cgi-bin/order/direct_card_payment.cgi" method="post">
                    <input type="hidden" id="contract_code" name="contract_code" value="74526050"/>
                    <input type="hidden" id="token" name="token" value="" ref={tokenRef}/>
                </form>
                <input name="userPaymentHistoryPaymentPoint" type="hidden" id="userPaymentHistoryPaymentPoint" className="" value={modalStateValue?.data?.userChargePoint} />
            </form>
        </div>
    )
}