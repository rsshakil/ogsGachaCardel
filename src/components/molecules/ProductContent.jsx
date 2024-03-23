import React, { useRef, useState, useEffect, useLayoutEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams, useParams, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";
import { modalState } from "../../store/recoil/modalState";
import { Icatch } from "../molecules/Icatch";
import { ProductDetail } from "../molecules/ProductDetail";
               

// import { accessState } from "../../store/recoil/accessState";
import '../../css/Icatch.css';
import {useIntl} from 'react-intl'

import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';

// GA4 Pack
import useGA4EventPack from "../../lib/useGA4EventPack";
let IcatchInterval;
export const ProductContent = () => {
    const intl = useIntl()
    const location = useLocation();
    const navigate = useNavigate();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [productListArray, setProductList] = useRecoilState(productListState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    // console.log("[Icatch]", productListArray)
    //  メモリーに格納して使用するとタイミングの問題があるので各所で冗長に取得する必要がある
    const { id } = useParams();
    // console.log("[Icatch]useParams.id=======>",id);

    //  テスト用の基準時間セット
    let testDateTimeUTC;
    testDateTimeUTC = new Date(UserStateObj.currentDateTimeUTC)
    useLayoutEffect(() => {
        setUserState((prevState) => ({
            ...prevState,
            currentDateTimeUTC : Date.now()
        }))
    }, []);
    //  言語ごとの商品取り出し
    let languageResource;
    languageResource = UserStateObj.languageResource;
    const {
        gachaId,
        gachaTranslateId,
        gachaTranslateGachaId,
        gachaTranslateLocalizeId,
        gachaTranslateName,
        gachaTranslateDescription,
        gachaTranslateImageDetail,
        gachaTranslateJpFlag,
        gachaTranslateImageMain,
        gachaSinglePoint,
        gachaTotalCount,
        gachaRemainingCount,
        gachaConosecutiveCount,
        gachaRemainingDisplayFlag,
        gachaViewFlag = true,
        gachaAllRestCount,
        //  テスト用に初期値を設定
       
        // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
        gachaSoldOutFlag  = true,
        //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
        gachaPostStartDate = testDateTimeUTC.setSeconds(testDateTimeUTC.getSeconds() + 1),  //  秒後に表示開始　表示後はカウントダウン　表示前はリダイレクト
        //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
        gachaStartDate = testDateTimeUTC.setSeconds(testDateTimeUTC.getSeconds() + 69),  //   秒後にパック解禁
        // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
        gachaEndDate = testDateTimeUTC.setSeconds(testDateTimeUTC.getSeconds() + 180),  //    秒後にパック販売停止　停止後はリダイレクト
        
    // } = productListArray.find((row) => row.gachaId === id) 
    // } = productListArray.find((row) => row.gachaId == id);
    } = productListArray[id];
    // } = productListArray.find((row) => row.gachaId == id);
    // console.log("[Icatch]gachaTranslateImageMain=======>",gachaTranslateImageMain);
    
    const [currentDateTimeUTC, setCurrentDateTimeUTC] = useState(Date.now());
    let tick = () => {
        setCurrentDateTimeUTC(Date.now());
        // console.log("[Play]currentDateTimeUTC==>",currentDateTimeUTC)
    };
    useLayoutEffect(() => {
        if(modalStateValue.BaseModalOpen){
            clearInterval(IcatchInterval);
        }else{
                // intervalがすでに有るのなら、それはキャンセル。
                if(IcatchInterval) {
                    clearInterval(IcatchInterval);
                }
                // あらためてintervalを作成
                IcatchInterval = setInterval(tick,1000);
        }
    }, [modalStateValue.BaseModalOpen])

    ///////////////////////////////
    // set fron API
    ///////////////////////////////
    // let gachaRemainingCount;
    // let gachaTotalCount;
    // let gachaSinglePoint;
    let remainingLevel;
    let remainingRate;
    let nowCount;
    let numberOfDigits
    
    let gachaPostStartDateExceed = true
    let gachaStartDateExceed = true
    let gachaEndDateExceed = false
    let gachaOutOfStock = false
    let gachaStartDateTime;
    let gachaStartRemainingTime;
    let gachaStartRemainingDay;
    let gachaStartRemainingHour;
    let gachaStartRemainingMinutes;
    let gachaStartRemainingSeconds;
    let gachaStartRemainingTotalSeconds;
    let gachaDisplay;
    let playButtonFilterClass;
    let playButtonWrapHiddenClass = '';
    let soldOutClass = 'soldOutClass';
    let countdownClass = 'countdownClass';
    let productFilterClass;
    let productWrapHiddenClass = '';
    let viewResetButton = gachaRemainingCount <= gachaAllRestCount;

    //  売り切れ表示最終判定
    function displayOutOfStock(e) {
        // console.log('[Play]function displayOutOfStock=>e.gachaSoldOutFlag==>',e.gachaSoldOutFlag);
        if(e.gachaSoldOutFlag){
            //  ❗️売り切れ表示確定
            gachaDisplay = 'soldout';
            //  ❗️販売できる商品が０になる
            // gachaRemainingCount = 0; //playで表示しないので避ける　cnstでもある
        }else{
            //  ❗️非表示確定
            // gachaDisplay = 'hidden';
            //  ❗️売り切れ表示確定
            gachaDisplay = 'soldout';   //この状態を見ることは相当な例外
            // alert('販売終了。そして非表示。この画面を見てはいけない状況です')
        }
    }



    //  表示開始日を超過しているかどうか？
    if(currentDateTimeUTC >= gachaPostStartDate){
        // console.log("[Play]表示開始日時を超過している", currentDateTimeUTC, ">", gachaPostStartDate)
        //  表示開始日時を超過している
        gachaPostStartDateExceed = true;
    }else if(currentDateTimeUTC < gachaPostStartDate){
        // console.log("[Play]表示開始日時を超過していない", currentDateTimeUTC, ">", gachaPostStartDate)
        //  表示開始日時を超過していない
        gachaPostStartDateExceed = false;   //  念の為
    }else{
        // console.log("[Play]表示開始日時を判断できない", currentDateTimeUTC, ">", gachaPostStartDate)
        gachaPostStartDateExceed = true;
    }
    // //  ガチャ開始日を超過しているかどうか？
    if(Math.floor(currentDateTimeUTC) > Math.floor(gachaStartDate)){
        // console.log("[ProductList]gachaStartDateExceed", currentDateTimeUTC, ">", gachaStartDate)
        //  ガチャ開始日を超過している
        gachaStartDateExceed = true;
    }else if(Math.floor(currentDateTimeUTC) <= Math.floor(gachaStartDate)){
        // console.log("[Play]ガチャ開始日を超過していない", currentDateTimeUTC, "<", gachaStartDate)
        //  ガチャ開始日を超過していない
        gachaStartDateExceed = false;   //  念の為
        //  開始日
        gachaStartDateTime = gachaStartDate
        // console.log("[Play]gachaStartDateTime", gachaStartDateTime)
        //  残りの時間
        gachaStartRemainingTime = gachaStartDate - currentDateTimeUTC + 4000; //開始の瞬間の演出のため数秒時計を遅らせる
        gachaStartRemainingDay = Math.floor(gachaStartRemainingTime/1000/60/60/24);
        gachaStartRemainingHour = Math.floor(gachaStartRemainingTime/1000/60/60)%24;
        gachaStartRemainingMinutes = Math.floor(gachaStartRemainingTime/1000/60)%60;
        gachaStartRemainingSeconds = Math.floor(gachaStartRemainingTime/1000)%60;
        gachaStartRemainingTotalSeconds = Math.floor(gachaStartRemainingTime/1000);

    }else{
        //  ガチャ開始日を超過しているか判定できない
        gachaStartDateExceed = true;
    }
    // //  ガチャ終了日を超過しているかどうか？
    if(currentDateTimeUTC >= gachaEndDate){
        // console.log("[Play]gachaEndDateExceed", currentDateTimeUTC, ">", gachaEndDate)
        // //  ガチャ終了日を超過している
        gachaEndDateExceed = true;
    }else{
        //  ガチャ終了日を超過していない
        // console.log("[Play]ガチャ終了日を超過していない", currentDateTimeUTC, "<", gachaEndDate)
        gachaEndDateExceed = false;   //  念の為
    }
    // //  ガチャ完売しているかどうか？
    // //  念の為マイナスも考慮
    if(gachaRemainingCount <= 0){
        // console.log("[Play]gachaRemainingCount", gachaRemainingCount)
        //  ガチャ完売している
        gachaOutOfStock = true;
    }else{
        //  ガチャ完売していない
        gachaOutOfStock = false;   //  念の為
    }

    // console.log("@@@@@ gachaOutOfStock",gachaOutOfStock);
    // console.log("@@@@@ gachaEndDateExceed",gachaEndDateExceed);
    // console.log("@@@@@ gachaSoldOutFlag",gachaSoldOutFlag);
    ////////////////////////
    //  GachaDisplayの判断
    ////////////////////////
    if(gachaViewFlag){
        //  発売前表示フラグ=表示
        if(gachaPostStartDateExceed){
            //  表示開始時刻＝超過
            if(gachaStartDateExceed){
                //  販売開始時刻＝超過
                if(gachaOutOfStock){
                    //  在庫状態＝完売
                    displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                }else{
                    //  在庫状態＝在庫あり
                    if(gachaEndDateExceed){
                        //  ガチャ終了日=超過
                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                    }else{
                        //  ガチャ終了日=未超過
                        //  ❗️通常表示確定
                        gachaDisplay = 'display';
                    }
                }
            }else{
                //  販売開始時刻＝未超過
                //  ❗️カウントダウン表示確定
                gachaDisplay = 'countdown';
            }
        }else{
            //  表示開始時刻＝未超過
            if(gachaStartDateExceed){
                //  販売開始時刻＝超過
                //  設定誤りで表示開始時刻より前に販売が開始されるケース
                //  予告なしにいきなり出現
                if(gachaOutOfStock){
                    //  在庫状態＝完売
                    //  何らかの操作で在庫ゼロで開始を迎える
                    displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                }else{
                    //  在庫状態＝在庫あり
                    if(gachaEndDateExceed){
                        //  ガチャ終了日=超過
                        displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
                    }else{
                        //  ガチャ終了日=未超過
                        //  ❗️通常表示確定
                        gachaDisplay = 'display';
                    }
                }
            }else{
                //  販売開始時刻＝未超過
                //  ❗️非表示確定
                gachaDisplay = 'hidden';
                // alert('販売開始時刻＝未超過。そして非表示。この画面を見てはいけない状況です')
            }
        }
    }else{
        //  発売前表示フラグ=非表示
        if(gachaOutOfStock){
            //  在庫状態＝完売
            displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
        }else{
            //  在庫状態＝在庫あり
            if(gachaEndDateExceed){
                //  ガチャ終了日=超過
                displayOutOfStock({gachaSoldOutFlag:gachaSoldOutFlag});
            }else{
                //  ガチャ終了日=未超過
                //  ❗️非表示確定
                gachaDisplay = 'hidden';
                // alert('発売前表示フラグ=非表示。そしてガチャ終了日=未超過。この画面を見てはいけない状況です')
                
            }
        }
    }


    if(gachaDisplay === 'soldout'){
        //  売り切れ or countdown表示
        productFilterClass = soldOutClass;
        //　商品丸ごと非表示を初期化
        productWrapHiddenClass = '';
    }else if(gachaDisplay === 'countdown'){
        //  売り切れ or countdown表示
        productFilterClass = countdownClass;
        //　商品丸ごと非表示を初期化
        productWrapHiddenClass = '';
    }else if(gachaDisplay === 'hidden'){
        //  売り切れ or countdown表示を初期化
        productFilterClass = '';
        //　商品丸ごと非表示
        productWrapHiddenClass = 'hidden';
    }else{
        //  売り切れ or countdown表示を初期化
        productFilterClass = '';
        //　商品丸ごと非表示を初期化
        productWrapHiddenClass = '';
    }
    // gachaRemainingCount = Math.floor( Math.random() * ( 30000 - 0 ) + 0);
    // gachaRemainingCount = 2;
    // gachaTotalCount = 30000; // set dummy
    // gachaSinglePoint = 99999 // set dummy
    ///////////////////////////////
    ///////////////////////////////
    // rate calculation
    ///////////////////////////////
    remainingRate = Math.floor(gachaRemainingCount / gachaTotalCount * 100);
    // console.log("[ProductList]remainingRate", remainingRate)
    remainingLevel = Math.floor(remainingRate / 5)*5;
    // console.log("[ProductList]remainingLevel", remainingLevel)
    if(gachaRemainingCount === 0){
        remainingLevel = "empty"
    }

    //  最大数の桁数
    numberOfDigits = gachaRemainingCount.toString().length;
    //  現在の回転数　を　最大数の桁数でゼロ埋め
    nowCount = String(gachaTotalCount- gachaRemainingCount).padStart(numberOfDigits, '0');

    useGA4EventPack(gachaTranslateName);

console.log("¥¥¥¥¥¥¥¥¥¥gachaDisplay",gachaDisplay)
    //  上部タップでリロードする機能を追加すること
  return (
    <>
        <Icatch productFilterClass ={productFilterClass} gachaDisplay={gachaDisplay}/>
        <ProductDetail productFilterClass ={productFilterClass} gachaDisplay={gachaDisplay}/>
    </>
    
    );
};


