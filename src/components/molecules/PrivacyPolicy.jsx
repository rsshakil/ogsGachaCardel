import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productListState } from "../../store/recoil/productListState";
import { Headline } from "../atoms/text/Headline";

import '../../css/textPanel.css';

// import { useNavigate } from 'react-router-dom';
let productWrapStyle = 'aspect-[3/2] w-full overflow-hidden rounded';
let productBgStyle = 'transition transform duration-150 ease-in w-full h-full bg-no-repeat bg-cover bg-center hover:scale-125';
let class1stLevelLi = '';
let class1stLevelSpan = 'font-bold text-base sm:text-xl leading-loose';
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

export const PrivacyPolicy = () => {
    const [productListArray, setProductList] = useRecoilState(productListState);
    console.log("[ProductList]", productListArray)
    
    

    return (
    <>
        <section id="informationWrap" className={`flex justify-center text-white py-8 px-4`}>
        <div className="w-256 grid grid-cols-1 gap-4 justify-items-center">
            <Headline 
                        type="h1"
                        spanText=""
                        spanClass="text-center text-sm text-white drop-shadow-md"
                        headlineText="プライバシーポリシー"
                        headlineClass="text-center text-5xl font-bold font-Prompt text-white flex flex-col drop-shadow-md"
            />
            <div className="text-panel w-full lg:w-256">
                <div className="text-panel-inner px-10 sm:px-12 md:px-14 lg:px-16 py-16 text-white">
                    <span className="font-bold">株式会社ヤムヤム（以下「当社」といいます。）は、ウェブアプリケーション「カーデル」（以下「本サービス」といいます。）の提供にあたり、本サービスの利用者様の個人情報を適切に保護することを社会的責務と自覚し、本プライバシーポリシー（以下「本ポリシー」といいます。）に従い、適切に利用者様の個人情報を取り扱います。</span>
                    <ul className="grid grid-cols-1 gap-4 sm:gap-12 font-Prompt text-white pt-8">
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>1. 個人情報の範囲</span>
                            <p className={`${class1stLevelP}`}>本ポリシーにおいて、個人情報とは、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）第２条第１項が定義する個人情報を指します。</p>

                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>2. 個人情報の利用目的</span>
                            <p className={`${class1stLevelP}`}>当社は、利用者様の個人情報を次の目的のために使用いたします。</p>
                            <ul className={`${class2ndLevelUl}`}>
                                <li className={`${class2ndLevelLi} bracket`}>利用者様によるユーザー登録に対する審査、本人確認等を行うため</li>
                                <li className={`${class2ndLevelLi} bracket`}>当社からの連絡事項がある場合、利用者様からのお問い合わせがあった場合などに、当社から利用者様に対して必要な連絡をするため</li>
                                <li className={`${class2ndLevelLi} bracket`}>当社から利用者様に対して商品等を発送するため</li>
                                <li className={`${class2ndLevelLi} bracket`}>当社のサービス（本サービスを含む。）に関する情報提供を行うため</li>
                                <li className={`${class2ndLevelLi} bracket`}>利用者様の取引記録等を管理するため</li>
                                <li className={`${class2ndLevelLi} bracket`}>本サービスに関する技術的なお知らせ、アップデート、セキュリティ警告等に関するメッセージを送信するため</li>
                                <li className={`${class2ndLevelLi} bracket`}>本サービスに関する統計数値の把握、市場調査、マーケティングを実施するため</li>
                                <li className={`${class2ndLevelLi} bracket`}>本サービスの改善、新サービスの研究開発等をするため</li>
                                <li className={`${class2ndLevelLi} bracket`}>本サービスの利用規約、ポリシー等の変更を通知するため</li>
                                <li className={`${class2ndLevelLi} bracket`}>本サービスに関する当社の利用規約等に違反する行為に対応するため</li>
                                <li className={`${class2ndLevelLi} bracket`}>その他、前各号に定める利用目的に付随する目的を達成するため</li>
                            </ul>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>3. 個人情報の適正な取得</span>
                            <p className={`${class1stLevelP}`}>当社は、適正に個人情報を取得し、偽りその他の不正な手段で個人情報を取得しません</p>
                            <ul className={`${class3rdLevelUl}`}>
                                <li className={`${class2ndLevelLi} bracket`}>利用者様の同意がある場合</li>
                                <li className={`${class2ndLevelLi} bracket`}>公的機関若しくはそれに準じる機関から開示請求を受けた場合</li>
                                <li className={`${class2ndLevelLi} bracket`}>生命、身体、財産に危機が生じ、緊急に開示する必要があり、かつ、利用者様の同意を得ることが困難な場合</li>
                                <li className={`${class2ndLevelLi} bracket`}>当社が個人情報の取扱いを含む業務を第三者に委託する場合</li>
                                <li className={`${class2ndLevelLi} bracket`}>合併、事業譲渡等によって個人情報の取扱いを含む業務を第三者に承継する場合</li>
                                <li className={`${class2ndLevelLi} bracket`}>個人情報保護法その他の法令において提供が認められている場合</li>
                            </ul>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>4. 個人情報の管理</span>
                            <p className={`${class1stLevelP}`}>当社は、当社が取り扱う個人情報の漏洩、滅失又は毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じるとともに、個人情報の取扱責任者を設置します。</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>5. 個人情報の第三者提供</span>
                            <p className={`${class1stLevelP}`}>当社は、次のいずれかに該当する場合を除いて、利用者様の個人情報を第三者に提供しません。</p>
                            <ul className={`${class3rdLevelUl}`}>
                            </ul>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>6. 個人情報の開示・訂正・利用停止等</span>
                            <p className={`${class1stLevelP}`}>当社は、利用者様から、利用者様の個人情報の開示、訂正、追加、削除、利用停止等の請求を受けた場合、利用者様本人からの請求であることを確認させていただいたうえで、個人情報保護法が法的義務を課している範囲内において、これに対応いたします。</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>7. 本ポリシーの改定</span>
                            <p className={`${class1stLevelP}`}>当社は、利用者様による事前の予告なく、本ポリシーの全部又は一部の改訂を行うことがあります。利用者様は、定期的に本ポリシーを確認し、本ポリシー改訂の有無を確認してください。</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>8. 連絡窓口</span>
                            <p className={`${class1stLevelP}`}>当社は、個人情報に関するお問い合わせに対して誠実に対応いたします。個人情報に関するお問い合わせがある場合、以下の連絡先にメールでご連絡ください。</p>
                            <p className={`${class1stLevelP}`}>support@cardel.online</p>
                        </li>
                    </ul>
                    <p className="text-right">以上</p>
                </div>
            </div>
        </div>
        </section>
    </>
    );
};


