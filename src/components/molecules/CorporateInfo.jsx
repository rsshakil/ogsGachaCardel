import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productListState } from "../../store/recoil/productListState";
import { Headline } from "../atoms/text/Headline";
import '../../css/textPanel.css';
import '../../css/CorporateInfo.css';
import {useIntl} from 'react-intl'

// import { useNavigate } from 'react-router-dom';
let productWrapStyle = 'aspect-[3/2] w-full overflow-hidden rounded';
let productBgStyle = 'transition transform duration-150 ease-in w-full h-full bg-no-repeat bg-cover bg-center hover:scale-125';

export const CorporateInfo = () => {
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
                        headlineText="運営会社"
                        headlineClass="text-center text-5xl font-bold font-Prompt text-white flex flex-col drop-shadow-md"
            />
            <div className="text-panel w-full lg:w-256">
                <div className="text-panel-inner px-10 sm:px-12 md:px-14 lg:px-16 py-8">
                <ul className="grid grid-cols-1 gap-4 sm:gap-12 font-Prompt text-white">
                    <li className="">
                        <span className="font-bold">{intl.formatMessage({ id: 'Company_Name' })}</span>
                        <p>株式会社ヤムヤム</p>
                    </li>
                    <li className="">
                        <span className="font-bold">{intl.formatMessage({ id: 'Company_name_in_English' })}</span>
                        <p>Yam-Yam Co. Ltd.</p>
                    </li>
                    <li className="">
                        <span className="font-bold">{intl.formatMessage({ id: 'CEO' })}</span>
                        <p>宮崎　和也</p>
                    </li>
                    {/* <li className="">
                        <span className="font-bold">{intl.formatMessage({ id: 'Capital' })}</span>
                        <p>100万円</p>
                    </li> */}
                    <li className="">
                        <span className="font-bold">{intl.formatMessage({ id: 'Phone_number_Japan' })}</span>
                        <p>050-6869-1707</p>
                    </li>
                    <li className="">
                        <span className="font-bold">{intl.formatMessage({ id: 'Head_office_location' })}</span>
                        <p>〒104-0061 東京都中央区銀座 7-13-6 サガミビル2階</p>
                    </li>
                    <li className="">
                        <span className="font-bold">{intl.formatMessage({ id: 'Company_establishment_date' })}</span>
                        <p>令和5年4月28日</p>
                    </li>
                    <li className="">
                        <span className="font-bold">{intl.formatMessage({ id: 'Business_content' })}</span>
                        <p>インターネットを利用した各種商品の販売</p>
                        <p>各種商品の企画、製造、販売及び輸出入</p>
                    </li>
                </ul>
                </div>
            </div>
        </div>
        </section>
    </>
    );
};


