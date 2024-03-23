import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { productListState } from "../../../store/recoil/productListState";
import { userState } from "../../../store/recoil/userState";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; 
import {useIntl} from 'react-intl'


export const Slider = () => {
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const navigate = useNavigate();
    const intl = useIntl()
    const [productListArray, setProductList] = useRecoilState(productListState);
    console.log("[Slider]productListArray=>", productListArray)

    //  言語ごとの商品取り出し
    let languageResource;
    languageResource = UserStateObj.languageResource;
    console.log("[Slider]languageResource=>", languageResource)
    let translationObj;
    translationObj = productListArray[languageResource];

    //  ページ遷移
    function go2gacha(e) {
        navigate('/gacha/p-' + e.data.gachaId);
    }



  return (
    <section id="slider" className="py-4 sm:py-5 md:py-8 lg:py-16 xl:py-24">
      <Splide
        aria-label={intl.formatMessage({ id: 'Pick_up_items' })}
        options={{
            autoplay: true, // 自動再生を有効
            interval: 3000, // 自動再生の間隔を3秒に設定
            // interval: 1000, // テスト用
            speed: 1200,
            pauseOnHover: true, // スライダーの上にマウスカーソルが乗ったとき、スクロールを停止
            //   rewind: true, // 最後のスライドに達した際、最初に巻き戻す
            type   : 'loop', // ループ（カルーセル）スライダー
            // autoWidth: true,
            autoHeight: true,
            perPage: 3,
            focus: 'center',
            gap: 32,
            lazyLoad: true,
            arrows: false,
            pagination: false,
            preloadPages: 1,
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
                        perPage: 1.5,
                    },
                    960: {
                        perPage: 2,
                    },
                    1024: {
                        perPage: 2,
                    },
                    1280: {
                        perPage: 2,
                    },
                    1536: {
                        perPage: 3,
                        gap: 32,
                    },
                },
          classes: {
            'slide': 'aaaaaaaaaaaaaaaaa',

          }
        }}
      >

    {/* 商品一覧以外のSNS登録促進やお知らせなどをTOPに割り込ませる */}
    <SplideSlide
        slide={`公式LINE | カーデル オリパ公式サイト`}
        onClick={() => window.open("https://www.google.com/", '_blank')}
        className="cursor-pointer"
    >
        <img className="slide-img rounded-md" src="https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/top/pokemon-card/20.png" alt="LINE登録の案内 | カーデル オリパ公式サイト`" />
    </SplideSlide>


    {Object.keys(translationObj).map((productKey) => {
        console.log("[Slider]productKey===>", productKey)
        console.log("[Slider]productListArray[productKey]===>", translationObj[productKey])
        console.log("[Slider]productListArray[productKey].gachaTranslateImageMain===>", translationObj[productKey].gachaTranslateImageMain)

        return (
            <>
                <SplideSlide 
                    slide={`${translationObj[productKey].gachaTranslateName} | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}
                    onClick={(e) => go2gacha({data:translationObj[productKey]})}
                    className="cursor-pointer"
                >
                    <img className="slide-img rounded-md" src={`${translationObj[productKey].gachaTranslateImageMain}`} alt={`${translationObj[productKey].gachaTranslateName}-IMAGE | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`} />
                </SplideSlide>
            </>
        );
    })}


      </Splide>

      {/* 画像の高さを揃えて表示させるために以下スタイルを適用 */}
      <style jsx>{`
        .slide-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </section>
    );
};


