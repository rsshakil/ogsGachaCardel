import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams, useParams, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
// import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";
// import { accessState } from "../../store/recoil/accessState";
import '../../css/Icatch.css';
import {useIntl} from 'react-intl'


export const HeaderMedia = () => {
    const intl = useIntl()
    const location = useLocation();
    const navigate = useNavigate();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const videoHeaderMovie = useRef(null);
    const moviePath ="https://productvideo-ogs-cardel.s3.ap-northeast-1.amazonaws.com/pre-regist-pr.mp4";


    //  言語ごとの商品取り出し
    let languageResource;
    languageResource = UserStateObj.languageResource;

    useEffect(() => {
        //  NotAllowedError を回避するため.catch(() => {}必須
        videoHeaderMovie.current?.play().catch(() => {});
    }, [videoHeaderMovie.readyState]);

    function loadeddata(e){
        //  音量0に上書き[ios対策]
        if(videoHeaderMovie.current?.volume){
            videoHeaderMovie.current.volume = 0;
        }

    }

  return (
    // <section id="Icatch" className="py-4 sm:py-5" onClick={false}>
    <section id="Icatch" className="py-4 sm:py-5 cursor-pointer" onClick={() => window.location.reload()}>
        <div 
            id={`HeaderMovie-Wrap`}
            className="aspect-[3/2] w-full overflow-hidden rounded"
            // onClick={go2gacha}
            title={`HeaderMovie | ${intl.formatMessage({ id: 'CARDEL' })} ${intl.formatMessage({ id: 'official_site' })}`}
            >
                <figure 
                    id="HeaderMovie"
                    className="transition transform  w-full h-full bg-no-repeat bg-cover bg-center "
                    style={{ backgroundImage: `url()` }}
                >
                    <img src="/slider/bank-payment.jpg" className="h-full w-full bg-black"></img>
                        {/* <video
                            className="h-full w-full bg-black"
                            ref={videoHeaderMovie}
                            onLoadedData={(e) => loadeddata(e)}
                            muted
                            // controls
                            loop
                            autoPlay
                            playsInline={true}
                            // webkitPlaysinline
                            webkitplaysinline={true}
                            preload="auto"
                            poster="/PreRegistration/poster.jpg" 
                        >
                            <source src={moviePath} type="video/mp4" />
                        </video> */}
                </figure>

        </div>
    </section>
    );
};


