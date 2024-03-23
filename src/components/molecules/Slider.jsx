import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { productListState } from "../../store/recoil/productListState";
import { productListStateMultilingual } from "../../store/recoil/productListStateMultilingual";
import { userState } from "../../store/recoil/userState";
import { modalState } from "../../store/recoil/modalState";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import useSessionCheck from '../../hooks/useSessionCheck'
import * as queries from "../../restapi/queries";
import '@splidejs/splide/css'; 
import {useIntl} from 'react-intl'
import { instance } from '../../services/axios.js';
import { debugState } from "../../store/recoil/debugState";

// React Splide
// https://ja.splidejs.com/integration/react-splide/

///////////////////
let gachaRemainingCount;
let gachaTotalCount;
let gachaSinglePoint;
let gachaRemainingDisplayFlag;
let gachaViewFlag;
let gachaSoldOutFlag;
let gachaPostStartDate;
let gachaStartDate;
let gachaEndDate;
let gachaDisplay;
let gachaStartDateTime;
let gachaStartRemainingTime;
let gachaStartRemainingDay;
let gachaStartRemainingMinutes;
let gachaStartRemainingHour;
let gachaStartRemainingSeconds;
let gachaPostStartDateExceed = true
let gachaStartDateExceed = true
let gachaEndDateExceed = false
let gachaOutOfStock = false
let nowCount;
let numberOfDigits;
let envCurrentName;
///////////////////


export const Slider = () => {
    const intl = useIntl()
    const navigate = useNavigate();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    //  スライダーの監視
    const SplideRef = useRef(null);
    //  スライダーが画面の中にあるかどうか
    const [isSplideInView, setIsSplideInView] = useState(false);
    //  ユーザーに割り当てられた利用言語
    // console.log("[Slider]UserStateObj=>", UserStateObj)
    let languageResource = UserStateObj.languageResource;
    // console.log("[Slider]languageResource=>", languageResource)
    /////////////////////////////////////
    //  APIからの返却が多言語の場合
    //  const [productListArray, setProductList] = useRecoilState(productListStateMultilingual);
    //  const translationObj = productListArray[languageResource];
    //  console.log("[Slider]translationObj=>", translationObj)
    /////////////////////////////////////
    // APIからの返却が単言語の場合
    const [productListArraySingle, setProductListSingle] = useRecoilState(productListState);
    const translationObj = productListArraySingle;
    // console.log("[Slider]productListArray_old=>", productListArraySingle)
    // console.log("[Slider]translationObj=>", translationObj)
    const { getSessionCheck } = useSessionCheck();

    //  ページ遷移
    function go2gacha(e) {
        navigate('/pack/p-' + e.data.gachaId);
    }
    ///////////////////////////////////////////////
    //  環境名の判定
    if(UserStateObj.currentEnv === 'cardel-mirror'){
        envCurrentName = '㊙︎裏面';
    }else if(UserStateObj.currentEnv === 'cardel-develop'){
        envCurrentName = '❤️開発';
    }else if(UserStateObj.currentEnv === 'cardel-localhost'){
        envCurrentName = '🏠地元';
    }else if(UserStateObj.currentEnv === 'cardel-staging'){
        envCurrentName = '✋検証';
    }
    else {
        envCurrentName = '';
    }
    //  環境名の判定
    ///////////////////////////////////////////////


 
    ///////////////////////////////////////////////
    //  モーダルが起動している時はスライダー停止
    //  モーダルが終了したらスライダーの再開
    //  画面に映ってなければ停止・画面に映ったら再開も実装すること１
    useEffect(() => {
        if(modalStateValue.BaseModalOpen){
            SplideRef.current.splide.Components.Autoplay.pause()
        }else{
            SplideRef.current.splide.Components.Autoplay.play()
        }
    }, [modalStateValue.BaseModalOpen])
    //
    ///////////////////////////////////////////////


    ///////////////////////////////////////////////
    //  スライダー表示条件
    //  大方針：買えるものだけ表示する
    //
    //  （１）在庫がある（売り切れではない）
    //  （２）販売終了日時より後（買える状態）
    //
    ///////////////////////////////////////////////

    ///////////////////////////////
    //  現在時刻UTCの維持
    //  初期値は今
    //  カウントダウンがないのでここは１分更新で良い
    //
    // const currentDateTimeUTC = UserStateObj.currentDateTimeUTC;
    const [currentDateTimeUTC, setCurrentDateTimeUTC] = useState(Date.now());
    let tick = () => {
        setCurrentDateTimeUTC(Date.now());
        // console.log("[Play]currentDateTimeUTC==>",currentDateTimeUTC)
    };
    setInterval(tick, 60000);
    //
    //////////////////////////////
    //  売り切れ表示最終判定
    function displayOutOfStock(e) {
        // console.log('[ProductList]function displayOutOfStock=>e.gachaSoldOutFlag==>',e.gachaSoldOutFlag);
        if(e.gachaSoldOutFlag){
            //  ❗️売り切れ表示確定
            gachaDisplay = 'soldout';
            //  ❗️販売できる商品が０になる
            gachaRemainingCount = 0;
        }else{
            //  ❗️非表示確定
            gachaDisplay = 'hidden';
        }
    }
    //  売り切れ表示最終判定
    //////////////////////////////


    /////////////////////////////////////
    // ポイントチャージ起動
    async function doCharge(e) {
        // console.log("[Header]charge e==>", e);
        //sessionCheck if success then show Charge Modal else show login modal


        let openData = e;
        //loader
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "",
            // data: {}
        }))
        let response;
        // check-sessionに問題なし
        if (await getSessionCheck(doCharge,e)) {
            //SessionCheckSuccess display ChargeModal

            try {
                const config = {
                    method: queries.getMethod,
                    url: queries.baseURL + queries.readPoint,
                }
    
                const response = await instance.request(config);
                console.log('response', response)
                if (response.status == 200) {
                    const {records = {}} = response.data || {};

                    setUserState(prevState => ({...prevState, myChargeList : records}))

                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'charge',
                        mode: "purchase",
                        data: {}
                    }))
                }
            } catch (err) {
                console.log("err >>>", err);

                let mData = {
                    title: "",
                    body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" }),
                };

                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: "error",
                    data: mData
                }))
                
            } 
        }
    }
    // ポイントチャージ起動
    /////////////////////////////////////


    return (
    
        <section id="slider" className="py-4 sm:py-5 md:py-8 lg:py-12 xl:py-24">
        <Splide
            ref={SplideRef}
            aria-label={intl.formatMessage({ id: 'Pick_up_items' })}
            options={{
                autoplay: true, // 自動再生を有効
                // autoplay: 'pause',
                // intersection: {
                //   inView: {
                //     autoplay: true,
                //   },
                //   outView: {
                //     autoplay: false,
                //   },
                // },
                interval: 3000, // 自動再生の間隔を3秒に設定
                // interval: 1000, // テスト用
                speed: 1200,
                pauseOnHover: true, // スライダーの上にマウスカーソルが乗ったとき、スクロールを停止
                //   rewind: true, // 最後のスライドに達した際、最初に巻き戻す
                type   : 'loop', // ループ（カルーセル）スライダー
                // autoWidth: true,
                autoHeight: true,
                perPage: 4,
                // start: 0,
                cloneStatus: true, //
                focus: 'center',    //is-activeクラスをクローンにも追加するかどうかを決定します。
                // isNavigation: true,
                gap: 32,
                lazyLoad: true,
                arrows: false,
                pagination: false,
                preloadPages: 3,
                breakpoints: {
                        280: {
                            perPage: 1,
                            // fixedWidth: '100%',
                            // height: 180,
                            gap: 0,
                            heightRatio:0.67,
                            autoHeight: false,
                            // padding: { top: 20, bottom: 20 }
                        },
                        640: {
                            perPage: 1,
                            gap: 0,
                            // heightRatio:0.67,
                            // autoHeight: false,
                        },
                        768: {
                            perPage: 2,
                        },
                        960: {
                            perPage: 2,
                        },
                        1024: {
                            perPage: 2,
                        },
                        1280: {
                            perPage: 3,
                        },
                        1536: {
                            perPage: 3,
                            gap: 32,
                        },
                        1920: {
                            perPage: 4,
                            gap: 32,
                        },
                    },
                classes: {
                'slide': 'slideClasses',

            }
            }}
        >
            {UserStateObj.currentEnv === 'cardel-product' || UserStateObj.currentEnv === 'cardel-develop'
            ?   //  本番なら環境表示カードださない
            <></>
            :
            <SplideSlide
                key='currentEnv'
                slide={`環境確認 | カーデル オリパ公式サイト`}

            >
                <div className="itemWrap slide-img rounded-md flex flex-col">
                    <div class="point-exchange grow flex flex-col items-center justify-center h-full">
                        <p class="text-7xl xs:text-8xl sm:text-9xl font-black font-Roboto">{envCurrentName}</p>
                        {
                        UserStateObj.currentEnv === 'cardel-mirror'
                        ?   //  ミラーの時だけ注意事項表示
                        <ul className="text-center">
                            <label className="font-bold pb-2">裏カーデル注意事項</label>
                            <li className="text-xs">カード在庫は本番と共通管理になります</li>
                            <li className="text-xs">裏面で握り続けると本番で使用できなくなります</li>
                            <li className="text-xs">獲得したカードは全てpt交換して下さい</li>
                        </ul>
                        :   //  ミラー以外は注意事項表示しない
                        <></>
                        }
                    </div>
                </div>
            </SplideSlide>
            }

            {/* {Object.keys(translationObj).map((productKey) => { */}
            {Object.keys(translationObj).map((productKey) => {
                // console.log("[Slider]productKey===>", productKey)
                // console.log("[Slider]translationObj[productKey]===>", translationObj[productKey])
                // console.log("[Slider]translationObj[productKey].gachaTranslateImageMain===>", translationObj[productKey].gachaTranslateImageMain)

                /////////////////////////////////
                //  この商品を表示すべきかのチェック
                /////////////////////////////////
                //
                //
                ///////////////////////////////
                // set fron json
                ///////////////////////////////
                // gachaRemainingCount = Math.floor( Math.random() * ( 30000 - 0 ) + 0);
                // gachaRemainingCount = 2;
                gachaRemainingCount = translationObj[productKey].gachaRemainingCount;
                // gachaTotalCount = 30000; // set dummy
                gachaTotalCount = translationObj[productKey].gachaTotalCount;
                // gachaSinglePoint = 99999 // set dummy
                gachaSinglePoint =  translationObj[productKey].gachaSinglePoint;
                gachaRemainingDisplayFlag = translationObj[productKey]?.gachaRemainingDisplayFlag;
                //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
                gachaViewFlag = translationObj[productKey]?.gachaViewFlag;
                // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
                gachaSoldOutFlag = translationObj[productKey]?.gachaSoldOutFlag;
                gachaPostStartDate = translationObj[productKey]?.gachaPostStartDate;
                gachaStartDate = translationObj[productKey]?.gachaStartDate;
                gachaEndDate = translationObj[productKey]?.gachaEndDate;
                ///////////////////////////////

                ///////////////////////////////
                //  GachaDisplayを判定していくために
                //  各状態のフラグ化
                //  hidden, countdown, display, soldout
                //  setGachaDisplay('')
                //  ‼️販売終了で在庫0にする
                //
                //  表示開始日を超過しているかどうか？
                gachaPostStartDateExceed = true;
                if(currentDateTimeUTC >= gachaPostStartDate){
                    // console.log("[ProductList]gachaPostStartDateExceed", currentDateTimeUTC, ">", gachaPostStartDate)
                    // console.log("[ProductList]",productKey,"表示開始日時を超過している", currentDateTimeUTC, ">", gachaPostStartDate)
                    //  表示開始日時を超過している
                    gachaPostStartDateExceed = true;
                }else if(currentDateTimeUTC < gachaPostStartDate){
                    // console.log("[ProductList]",productKey,"表示開始日時を超過していない", currentDateTimeUTC, ">", gachaPostStartDate)
                    //  表示開始日時を超過していない
                    gachaPostStartDateExceed = false;   //  念の為
                }else{
                    // console.log("[ProductList]",productKey,"表示開始日時を判断できない", currentDateTimeUTC, ">", gachaPostStartDate)
                    gachaPostStartDateExceed = true;
                }
                //  ガチャ開始日を超過しているかどうか？
                if(currentDateTimeUTC > gachaStartDate){
                    // console.log("[ProductList]gachaStartDateExceed", currentDateTimeUTC, ">", gachaStartDate)
                    //  ガチャ開始日を超過している
                    gachaStartDateExceed = true;
                }else if(currentDateTimeUTC <= gachaStartDate){
                    // console.log("[ProductList]ガチャ開始日を超過していない", currentDateTimeUTC, "<", gachaStartDate)
                    //  ガチャ開始日を超過していない
                    gachaStartDateExceed = false;   //  念の為
                    //  開始日
                    gachaStartDateTime = gachaStartDate
                    // console.log("[ProductList]gachaStartDateTime", gachaStartDateTime)
                    //  残りの時間
                    gachaStartRemainingTime = gachaStartDate - currentDateTimeUTC - 4000; //開始の瞬間の演出のため数秒時計を遅らせる
                    gachaStartRemainingDay = Math.floor(gachaStartRemainingTime/1000/60/60/24);
                    gachaStartRemainingHour = Math.floor(gachaStartRemainingTime/1000/60/60)%24;
                    gachaStartRemainingMinutes = Math.floor(gachaStartRemainingTime/1000/60)%60;
                    gachaStartRemainingSeconds = Math.floor(gachaStartRemainingTime/1000)%60;
                }else{
                    //  ガチャ開始日を超過しているか判定できない
                    gachaStartDateExceed = true;
                }
                //  ガチャ終了日を超過しているかどうか？
                if(currentDateTimeUTC >= gachaEndDate){
                    // console.log("[ProductList]gachaEndDateExceed", currentDateTimeUTC, ">", gachaEndDate)
                    //  ガチャ終了日を超過している
                    gachaEndDateExceed = true;
                    }else{
                    //  ガチャ終了日を超過していない
                    // console.log("[ProductList]ガチャ終了日を超過していない", currentDateTimeUTC, "<", gachaEndDate)
                    gachaEndDateExceed = false;   //  念の為
                }
                //  ガチャ完売しているかどうか？
                //  念の為マイナスも考慮
                if(gachaRemainingCount <= 0){
                    // console.log("[ProductList]gachaRemainingCount", gachaRemainingCount)
                    //  ガチャ完売している
                    gachaOutOfStock = true;
                }else{
                    //  ガチャ完売していない
                    gachaOutOfStock = false;   //  念の為
                }
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
                        }
                    }
                }
                //
                //  GachaDisplayを判定していくために
                //  各状態のフラグ化
                ///////////////////////////////
                return (
                    <>
                    
                    {
                    translationObj[productKey].gachaCarouselFlag ?
                    //  カルーセルに表示するフラグtrue
                        gachaDisplay === 'display' ?
                        //  gachaDisplayの判定結果が通常表示
                            (
                                <SplideSlide 
                                    key={`${productKey}`}
                                    slide={`${translationObj[productKey].gachaTranslateName} | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}
                                    onClick={(e) => go2gacha({data:translationObj[productKey]})}
                                    className="cursor-pointer"
                                >
                                    <img className="slide-img rounded-md" src={`${translationObj[productKey].gachaTranslateImageMain}`} alt={`${translationObj[productKey].gachaTranslateName}-thumbnail | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`} />
                                </SplideSlide>
                            )
                            :
                            (<></>)
                    :
                    (<></>)
                    }
                    </>
                );
            })}
            {/* 商品一覧以外のSNS登録促進やお知らせなどをTOPに割り込ませる */}
            {/* パックからのカルーセルが表示されるので撤去 */}
            <SplideSlide
                key='bank-payment'
                slide={`銀行決済導入 | カーデル オリパ公式サイト`}
                onClick={() => navigate('/bank-payment')}
                // onClick={(e) => doCharge()} 
                className="cursor-pointer"
            >
                <img className="slide-img rounded-md" src="/slider/bank-payment.jpg" alt="お年玉史上最高額の7,480,000ptを引き当てたのは！？ | カーデル オリパ公式サイト`" />
            </SplideSlide>
            {/* <SplideSlide
                key='page-lillie'
                slide={`お年玉史上最高額の7,480,000ptを引き当てたのは！？ | カーデル オリパ公式サイト`}
                onClick={() => navigate('/page-lillie')}
                className="cursor-pointer"
            >
                <img className="slide-img rounded-md" src="/opening-ceremonies/slide.png" alt="お年玉史上最高額の7,480,000ptを引き当てたのは！？ | カーデル オリパ公式サイト`" />
            </SplideSlide> */}
            {/* 検索結果のサイトサムネイルがラインになってしまうので末尾に移動する */}
            <SplideSlide
                key='line'
                slide={`公式LINE | カーデル オリパ公式サイト`}
                // onClick={() => window.open("https://lin.ee/GVlNQCl", '_blank')}
                onClick={() => window.open("https://lin.ee/pdg5Qj0", '_blank')}
                className="cursor-pointer"
                >
                    <img className="slide-img rounded-md" src="/line.jpg" alt="LINE登録の案内 | カーデル オリパ公式サイト`" />
                </SplideSlide>
            </Splide>

            {/* 画像の高さを揃えて表示させるために以下スタイルを適用 */}
            <style jsx>{`
                .slide-img {
                display: block;
                width: 100%;
                height: 100%;
                aspect-ratio: 3/2;
                object-fit: cover;
            }`}</style>
        </section>
    );
};


