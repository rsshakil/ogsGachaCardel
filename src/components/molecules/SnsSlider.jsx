import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { productListState } from "../../store/recoil/productListState";
import { productListStateMultilingual } from "../../store/recoil/productListStateMultilingual";
import { userState } from "../../store/recoil/userState";
import { modalState } from "../../store/recoil/modalState";
import { snsState } from "../../store/recoil/snsState";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Video } from '@splidejs/splide-extension-video';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';

import Youtube from 'react-youtube';
//  https://blog.fundely.co.jp/tech/2023/02/08/react-youtube%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%AE%E5%B0%8E%E5%85%A5/
import '@splidejs/splide/css'; 
import {useIntl} from 'react-intl'
// new Splide( '.splide' ).mount( { Video } );
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


export const SnsSlider = () => {
    const intl = useIntl()
    const navigate = useNavigate();
    const [snsStateObj, setSnsStateObj] = useRecoilState(snsState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    //  スライダーの監視
    const SplideRef = useRef(null);
    ///////////////////////////////////////////////
    //  ユーザーの言語ごとの定義
    let languageResource = UserStateObj.languageResource;
    console.log("[SnsSlider]languageResource=>", UserStateObj.languageResource)
    let snsResource = snsStateObj[languageResource];
    console.log("[SnsSlider]snsResource=>", snsResource)
    //  ユーザーの言語ごとの定義
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




    //
    const opts = {
        playerVars: {
        playsinline: 1,
        autoplay: 0,
        mute: 1,
        loop: 1,
      }, 
    }

  return (
    
    <section id="slider" className="py-4 sm:py-5 md:py-8 lg:py-12 xl:py-24">
      <Splide
        ref={SplideRef}
        extensions={{ Video }}
        // Extensions={{ Video }}
        // Extensions={{ Extensions: Video }}
        // extensions={Video}
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
            autoWidth: false,
            autoHeight: false,
            height: 'auto',
            heightRatio: 0.5625,
            cover      : false,
            perPage: 3,
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
                        // heightRatio:0.67,
                        heightRatio:0.5625,
                        autoHeight: false,
                        // padding: { top: 20, bottom: 20 }
                    },
                    640: {
                        perPage: 1,
                        gap: 0,
                        heightRatio: 0.5625,
                        autoWidth: false,
                        autoHeight: false,
                    },
                    768: {
                        perPage: 1,
                        gap: 0,
                        heightRatio: 0.5625,
                        autoWidth: false,
                        autoHeight: false,
                    },
                    960: {
                        perPage: 1,
                        gap: 0,
                        heightRatio: 0.5625,
                        autoWidth: false,
                        autoHeight: false,
                    },
                    1024: {
                        perPage: 2,
                        gap: 0,
                        heightRatio: 0.5625,
                        autoWidth: false,
                        autoHeight: false,
                        height: 'auto'
                    },
                    1280: {
                        perPage: 2,
                        gap: 0,
                        heightRatio: 0.5625,
                        autoWidth: false,
                        autoHeight: false,
                        height: 'auto'
                    },
                    1536: {
                        perPage: 2,
                        heightRatio: 0.5625,
                        autoWidth: false,
                        autoHeight: false,
                        height: 'auto',
                        gap: 32,
                    },
                    1920: {
                        perPage: 3,
                        heightRatio: 0.5625,
                        autoHeight: false,
                        autoWidth: false,
                        cover      : false,
                        gap: 32,
                    },
                },
            classes: {
            'slide': 'slideClasses',
            },
            video: {
                loop         : true,
                mute         : true,
                playerOptions: {
                  youtube: {
                    playsinline: 1,
                    autoplay: 0,
                    mute: 1,
                    loop: 1,
                  },
                }
            },

        }}
        
      >

        {Object.keys(snsResource.slider).map((videoId) => {
            console.log("[SnsSlider]videoId=>", videoId)
            return (
                <>
                    <SplideSlide 
                        key={snsResource.slider[videoId].videoId}
                        slide={`${snsResource.slider[videoId].title} | カーデル オリパ公式サイト`} 
                        className="cursor-pointer"
                        data-splide-youtube={`https://www.youtube.com/watch?v=${videoId}`}
                    >
                        <div className="video-thumbnail-wrap relative">
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/` + "mqdefault.jpg"}
                                alt={`${snsResource.slider[videoId].title} `}
                                className="video-thumbnail slide-img"
                            >
                            </img>
                            <p className="slide-title absolute bottom-0 text-ellipsis whitespace-nowrap overflow-hidden w-full text-white py-2 px-2 font-bold font-Noto text-center">{snsResource.slider[videoId].title}</p>
                        </div>
                    </SplideSlide>
                </>
            )
            
        })}



      </Splide>

      {/* 画像の高さを揃えて表示させるために以下スタイルを適用 */}
      <style jsx>{`
        .slide-img, .splide__video, .splide__video__wrapper {
          display: block;
          width: 100%;
          height : auto;
          aspect-ratio: 16/9;
          object-fit: cover;
        }
        .video-thumbnail-wrap{
            

        }
        .slide-title {
            // display: flex;
            // flex-direction: column;
            // justify-content: flex-end;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);

            text-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
        }
      `}</style>

    </section>
    
    );
};


