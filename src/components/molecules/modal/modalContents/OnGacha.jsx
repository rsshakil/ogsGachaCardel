//  不要なファイル
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/OnGacha.css';
import {useIntl} from 'react-intl'
import Helmet from 'react-helmet';
// import video_mp4 from {process.env.PUBLIC_URL} + '/logo192.png'

export const OnGacha = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const intl = useIntl()
    let errorBody = '';
    console.log("[OnGacha]modalStateValue.data.videoUrl==>", modalStateValue.data.videoUrl);
    console.log("[OnGacha]modalStateValue.data.title==>", modalStateValue.data.body);
    errorBody = modalStateValue.data.title ? modalStateValue.data.body : '';

    const videoRef = useRef(null);
    useEffect(() => {
        console.log("[OnGacha]videoRef==>", videoRef);
        console.log("[OnGacha]videoRef.current.ended==>", videoRef.current.ended);
        if (videoRef.current) {
            if (videoRef.current?.currentTime) {
                videoRef.current.currentTime = 0;
            }

            videoRef.current.play();
        }

      }, [videoRef]);


    function timeupdate(e) {
        console.log("[OnGacha]currentTime 属性で示されている時刻が更新された。")
        console.log("[OnGacha]timeupdate e==>", e);
        console.log("[OnGacha]timeupdate e==>", videoRef.current.currentTime);

    }
    function ended(e) {
        console.log("[OnGacha]動画再生終了")
        console.log("[OnGacha]ended e==>", e);
        // alert("末尾到達　動画を閉じて結果の表示をする")
        showReward();
    }
    function play(e) {
        console.log("[OnGacha]再生が始まった")
        console.log("[OnGacha]ended e==>", e);

    }
    function loadedMetadata(e) {
        console.log("[OnGacha]動画の読み込みが完了",)
        console.log("[OnGacha]loadedMetadata e==>", e);
        

    }
    function pause(e) {
        console.log("[OnGacha]再生が一時停止した。")
        console.log("[OnGacha]loadedMetadata e==>", e);

    }
    function playing(e) {
        console.log("[OnGacha]データがなくなったために一時停止または遅延した後で、再生の再開の準備ができた。。")
        console.log("[OnGacha]loadedMetadata e==>", e);

    }
    function stopMovie(e) {
        // alert("強制停止　動画を閉じて結果の表示をする")
        showReward();

    }
    function showReward(e) {
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'showReward',
            mode: "",
            data: {}
        }))

    }




    return (
        <div className="w-full flex flex-col justify-center items-center ">
            {/* <div id="header1"> */}
            {/* <h1 className="h1aaaa">Title</h1> */}
                <div id="video-area">

                    <video
                        ref={videoRef}
                        id="video"
                        playsInline={true}
                        muted
                        preload="true"
                        
                        // autoPlay
                        loop
                        onLoadedMetadata={(e) => loadedMetadata(e)}
                        onEnded={(e) => ended(e)}
                        onPlay={(e) => play(e)}
                        onPause={(e) => pause(e)}
                        onPlaying={(e) => playing(e)}

                        onTimeUpdate={(e) => timeupdate()}

                        // controls
                        poster="https://i.ytimg.com/vi/qYQRjSpZ8I8/maxresdefault.jpg" 
                        >

                        <source src={modalStateValue.data.videoUrl}  type="video/mp4" />

                        <p>{intl.formatMessage({ id: 'The_viewing_environment_is_not_suitable_for_playing_videos' })}</p>
                    </video>
                    <div className="w-full absolute z-10 bottom-0 flex justify-end pb-4 px-4">
                        <button 
                            className="bg-black"
                            onClick={(e) => stopMovie()}
                        >
                            {intl.formatMessage({ id: 'skip_video' })}
                        </button>
                    </div>
                </div>
            {/* </div> */}
        </div>
)

}