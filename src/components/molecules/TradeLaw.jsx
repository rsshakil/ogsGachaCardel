import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productListState } from "../../store/recoil/productListState";
import { Headline } from "../atoms/text/Headline";
import {useIntl} from 'react-intl'
import '../../css/textPanel.css';

// import { useNavigate } from 'react-router-dom';
let productWrapStyle = 'aspect-[3/2] w-full overflow-hidden rounded';
let productBgStyle = 'transition transform duration-150 ease-in w-full h-full bg-no-repeat bg-cover bg-center hover:scale-125';
let class1stLevelLi = '';
let class1stLevelSpan = 'font-bold text-xl leading-loose';
let class1stLevelP = '';

let class2ndLevelUl = 'pl-4 py-4';
let class2ndLevelLi = 'pl-4';

let class3rdLevelUl = 'pl-4 py-4';
let class3rdLevelLi = 'pl-4';
let class3rdLevelSpan = 'font-bold';
let class3rdLevelP = 'font-normal text-base';

let class4thLevelUl = 'pl-4';
let class4thLevelLi = 'pl-4';

let class5thLevelUl = 'pl-4';
let class5thLevelLi = 'pl-4';

export const TradeLaw = () => {
    const [productListArray, setProductList] = useRecoilState(productListState);
    console.log("[ProductList]", productListArray)
    const intl = useIntl()
    

    return (
    <>
        <section id="informationWrap" className={`flex justify-center text-white py-8 px-4`}>
        <div className="w-256 grid grid-cols-1 gap-4 justify-items-center">
            <Headline 
                        type="h1"
                        spanText=""
                        spanClass="text-center text-sm text-white drop-shadow-md"
                        headlineText="特定商取引法に基づく表記"
                        headlineClass="text-center text-5xl font-bold font-Prompt text-white flex flex-col drop-shadow-md"
            />
            <div className="text-panel w-full lg:w-256">
                <div className="text-panel-inner px-10 sm:px-12 md:px-14 lg:px-16 py-16 text-white">
                    <span className="font-bold">本サービス内で「ポイント」をご購入いただくにあたり、特定商取引に関する法律第１１条に基づき、以下のとおり表示いたします。</span>
                    <ul className="grid grid-cols-1 gap-4 sm:gap-12 font-Prompt text-white pt-8">
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>販売事業者の名称</span>
                            <p className={`${class1stLevelP}`}>株式会社ヤムヤム</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>{intl.formatMessage({ id: 'CEO' })}</span>
                            <p className={`${class1stLevelP}`}>宮崎　和也</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>{intl.formatMessage({ id: 'Head_office_location' })}</span>
                            <p className={`${class1stLevelP}`}>〒104-0061　東京都中央区銀座 7-13-6 サガミビル2階</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>{intl.formatMessage({ id: 'Phone_number_Japan' })}</span>
                            <p className={`${class1stLevelP}`}>050-6869-1707</p>
                            <p className={`${class1stLevelP}`}>受付時間 10:00-16:00（土日祝を除く）</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>お問い合わせ先</span>
                            <p className={`${class1stLevelP}`}>メールアドレス：support@cardel.online</p>
                            <p className={`${class1stLevelP}`}>本ウェブサイト内の「お問い合わせデスク」からご請求をいただいた場合、遅滞なく電子メールで電話番号を提供いたします。</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>販売価格</span>
                            <p className={`${class1stLevelP}`}>ポイントの購入画面に税込金額を表示いたします。</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>販売価格以外にご負担いただく費用</span>
                            <p className={`${class1stLevelP}`}>ウェブサイトの閲覧等に必要となるインターネット接続料金、通信料金等はお客様のご負担となります。</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>送料について</span>
                            <p className={`${class1stLevelP}`}>【通常配送】</p>
                            <p className={`${class1stLevelP}`}>全国一律300pt</p>
                            <p className={`${class1stLevelP}`}>※配送処理完了後200pt返還致します。</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>お支払時期・お支払方法</span>
                            <p className={`${class1stLevelP}`}>ポイントの提供前に、クレジットカード又は各種決済方法でお支払いいただきます。</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>提供時期</span>
                            <p className={`${class1stLevelP}`}>お支払いの手続き完了後、直ちに提供いたします。</p>
                            <p className={`${class1stLevelP}`}>商品の発送に関しましては、申請後１４日以内の発送手続きとさせていただいております。</p>
                            <p className={`${class1stLevelP}`}>※天候や災害によって配送が遅れる場合がございます。</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>返品・キャンセル</span>
                            <p className={`${class1stLevelP}`}>ポイントの返品、交換、換金等はできません。</p>
                            <p className={`${class1stLevelP}`}>商品ページに掲載されている商品と状態・品目が異なる商品が送られてきた場合は、返品対応させていただきます。商品到着から3日以内にメールもしくはお問い合わせフォームにてご連絡ください。</p>
                            <p className={`${class1stLevelP}`}>商品が到着してからの期間が7日間を超えた場合は、一切保証を致しません。</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>資格・免許</span>
                            <p className={`${class1stLevelP}`}>東京都公安委員会</p>
                            <p className={`${class1stLevelP}`}>古物商許可 第304412322055号</p>
                        </li>








                    </ul>

                </div>
            </div>
        </div>
        </section>
    </>
    );
};


