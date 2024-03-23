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

export const AntiqueLaw = () => {
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
                        headlineText="古物営業法に基づく表示"
                        headlineClass="text-center text-5xl font-bold font-Prompt text-white flex flex-col drop-shadow-md"
            />
            <div className="text-panel w-full lg:w-256">
                <div className="text-panel-inner px-10 sm:px-12 md:px-14 lg:px-16 py-16 text-white">
                    <span className="font-bold">カーデルでは公安委員会の許可を得て、中古品を取り扱っております</span>
                    <ul className="grid grid-cols-1 gap-4 sm:gap-12 font-Prompt text-white pt-8">
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>事業者の名称</span>
                            <p className={`${class1stLevelP}`}>株式会社ヤムヤム</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>許可公安委員会名</span>
                            <p className={`${class1stLevelP}`}>東京都公安委員会</p>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>許可証番号</span>
                            <p className={`${class1stLevelP}`}>第304412322055号</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </section>
    </>
    );
};


