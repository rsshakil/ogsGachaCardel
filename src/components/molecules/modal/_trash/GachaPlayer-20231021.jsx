import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/OnGacha.css';
import {useIntl} from 'react-intl'
import Helmet from 'react-helmet';
import { Fishs } from "../../../atoms/img/Fishs";
// import video_mp4 from {process.env.PUBLIC_URL} + '/logo192.png'

export const GachaPlayer = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    // const [VideoAreaHidden, setVideoAreaHidden] = useState('opacity-0');
    const [VideoAreaHidden, setVideoAreaHidden] = useState('hidden');
    //  叩くボタンのShow hide
    const [ButtonMashing, setButtonMashing] = useState('hidden');
    //  叩くボタンを出現したフラグ
    const [ButtonMashed, setButtonMashed] = useState(false);
    //  play()の成功フラグ
    const [PlaySuccess, setPlaySuccess] = useState(false);
    //  魚群表示フラグ
    const [ShowFish, setShowFish] = useState('hidden');


    const [TestConsole, setTestConsole] = useState(['初期値']);
    const intl = useIntl()
    // console.log("[OnGacha]modalStateValue.data.videoUrl==>", modalStateValue.data.videoUrl);

    const videoRef = useRef(null);
    useEffect(() => {
        console.log("[OnGacha]videoRef==>", videoRef);
        console.log("[OnGacha]videoRef.current==>", videoRef.current);
        console.log("[OnGacha]videoRef.current.ended==>", videoRef.current.ended);
        console.log("[OnGacha]videoRef.current.readyState==>", videoRef.current.readyState);
        console.log("[OnGacha]videoRef.current.duration==>", videoRef.current.duration);
        console.log("[OnGacha]videoRef.currentの更新発生");
        setTestConsole([...TestConsole,'videoRef.currentの更新発生','current.readyState：'+videoRef.current?.readyState]);

        // if (videoRef.current?.readyState >= 4) {
            if (videoRef.current?.readyState >= 1) {
            console.log("[OnGacha]readyState['+videoRef.current?.readyState+']十分なデータが利用可能であり、ダウンロードレートが十分に高いため、メディアを中断することなく最後まで再生できます。",)
            // setVideoAreaHidden('readyState['+videoRef.current?.readyState+']十分なデータが利用可能であり、ダウンロードレートが十分に高いため、メディアを中断することなく最後まで再生できます')
            setTestConsole([...TestConsole,'readyState['+videoRef.current?.readyState+']十分なデータが利用可能であり、ダウンロードレートが十分に高いため、メディアを中断することなく最後まで再生できます'])

            if (videoRef.current) {
                console.log("[OnGacha]videoRef.current==>", videoRef.current);
                console.log("[OnGacha]videoRef.current?.volume==>", videoRef.current?.volume);
                if (videoRef.current?.volume) {
                    console.log('[OnGacha]readyState['+videoRef.current?.readyState+']ボリュームを0にセットします');
                    // setVideoAreaHidden('readyState['+videoRef.current?.readyState+']再生位置を0にセットします')
                    setTestConsole([...TestConsole,'readyState['+videoRef.current?.readyState+']ボリュームを0にセットします'])
                    videoRef.current.volume = 0;
                    console.log("[OnGacha]videoRef.current?.volumee==>", videoRef.current?.volume);
                }
                if (videoRef.current?.currentTime) {
                    // 念の為再生位置を最初にセットする
                    // console.log("[OnGacha]videoRef.current?.currentTime==>", videoRef.current?.currentTime);
                    // console.log('[OnGacha]readyState['+videoRef.current?.readyState+']再生位置を0にセットします');

                    // setTestConsole([...TestConsole,'readyState['+videoRef.current?.readyState+']再生位置を0にセットします'])
                    // videoRef.current.currentTime = 0;
                }
                console.log("[OnGacha]ポーズ状態で待機します");
                // setVideoAreaHidden('readyState['+videoRef.current?.readyState+']ポーズ状態で待機します');
                setTestConsole([...TestConsole,'readyState['+videoRef.current?.readyState+']ポーズ状態で待機します'])
                videoRef.current?.pause();
            }

            // setTimeout(function(){
                console.log(["readyState['+videoRef.current?.readyState+']のなかで動画の再生を開始します",])

                videoRef.current?.play()
                .then(() => {
                    //  play()の成功フラグ
                    setPlaySuccess(true)
                    setTestConsole([...TestConsole,'play()成功','モーダル最大化'])
                    setModalState((prevState) => ({
                        ...prevState,
                        mode: "playMovie",
                    }))
                    console.log("[OnGacha]play()成功　モーダル最大化");
                })
                .then(() => {
                    setTestConsole([...TestConsole,'ビデオの表示開始'])
                    // ビデオエリア表示
                    setVideoAreaHidden('')
                    //  魚群表示
                    setShowFish('hidden')
                })
                .catch((error) => {
                //  play()の成功フラグ
                console.log(error, "[OnGacha]play()失敗");
                setTestConsole([...TestConsole,'play()失敗'])
                });
                



                // setVideoAreaHidden('readyState['+videoRef.current?.readyState+']モーダールの拡張')
            // },1000)
          }

    }, [videoRef.current?.readyState]);

      
    function timeupdate(e) {
        
        setTestConsole([...TestConsole,'再生時間：' + videoRef.current?.currentTime])
        console.log("[OnGacha]再生時間：==>", videoRef.current?.currentTime);
        //  1秒超えていれば魚群終了
        if (videoRef.current.currentTime > 1) {
            //  魚群非表示
            setShowFish('hidden')
        }
        let timer;
        //  3秒超えている＆ButtonMashedがfalseの時に『叩け』発動
        if (videoRef.current.currentTime > 3 && ButtonMashed === false) {
            videoRef.current?.pause();
            
            //  叩くの出現
            setButtonMashing('')
            //  叩くの出現済みフラグ
            setButtonMashed(true)
            //  指定時間を経過したら自動的に再生開始
            timer = setTimeout(() => {
                console.log("[OnGacha]指定時間を経過したので自動的に再生開始");
                videoRef.current?.play()
                //  成功した場合
                .then(() => {
                    //  play()の成功フラグ
                    setPlaySuccess(true)
                    //  叩くボタンのShow hide
                    setButtonMashing('hidden')
                })
                //  失敗することもある
                .catch((error) => {
                    //  play()の成功フラグ
                    setPlaySuccess(false)
                    //  叩くボタンのShow hide
                    setButtonMashing('hidden')
                })
            }, 20000);


            // setTimeout(function(){
            //     videoRef.current?.play()
            //     //  成功した場合
            //     .then(() => {
            //         //  play()の成功フラグ
            //         setPlaySuccess(true)
            //         setButtonMashing('hidden')
            //     })
            //     //  失敗することもある
            //     .catch((error) => {
            //         //  play()の成功フラグ
            //         setPlaySuccess(false)
            //         setButtonMashing('hidden')
            //     })
            // },20000)
        }
        //  指定時間到達　かつ　play()の成功フラグがfalseの場合繰り返し再生を実行
        console.log("[OnGacha]PlaySuccess",PlaySuccess);
        if (videoRef.current.currentTime > 3.5 && !PlaySuccess) {
            console.log("[OnGacha]指定時間到達　かつ　play()の成功フラグがfalseの場合繰り返し再生を実行");
            //  叩くボタンのShow hide
            setButtonMashing('hidden')
            videoRef.current?.play()
            //  成功した場合
            .then(() => {
                //  play()の成功フラグ
                setPlaySuccess(true)
                //  タイマーのキャンセル
                clearTimeout(timer);
            })
            //  失敗することもある
            .catch((error) => {
                //  play()の成功フラグ
                setPlaySuccess(false)
            })
        }


    }
    function ended(e) {
        console.log("[OnGacha]動画再生終了")
        console.log("[OnGacha]ended e==>", e)
        setTestConsole([...TestConsole,'動画再生終了'])
        setVideoAreaHidden('hidden')
        //  play()の成功フラグ
        setPlaySuccess(true)
        //  叩くボタンのShow hide
        setButtonMashing('hidden')
        //  魚群非表示
        setShowFish('hidden')
        // setVideoAreaHidden('')
        // videoRef.current?.play();
        setModalState((prevState) => ({
            ...prevState,
            mode: "",    //空にする事でプレイヤー終了
        }))
        // alert("末尾到達　動画を閉じて結果の表示をする")
        showReward();
    }
    function play(e) {
        console.log("[OnGacha]再生が始まった")
        setTestConsole([...TestConsole,'再生が始まった'])
        console.log("[OnGacha]play e==>", e);
        //  play()の成功フラグ
        setPlaySuccess(true)
        //  叩くボタンのShow hide
        setButtonMashing('hidden')
    }


    function loadstart(e) {
        console.log("[OnGacha]読み込み開始",)
        setTestConsole([...TestConsole,'読み込み開始'])
        console.log("[OnGacha]loadstart e==>", e);
    }
    function progress(e) {
        // console.log("[OnGacha]読み込み中",)
        // console.log("[OnGacha]progress e==>", e);
        setTestConsole([...TestConsole,'読み込み中'])
    }
    function loadedMetadata(e) {
        console.log("[OnGacha]メタデータの読み込み完了",)
        setTestConsole([...TestConsole,'メタデータの読み込み完了'])
        console.log("[OnGacha]loadedMetadata e==>", e);
        // setVideoAreaHidden('text-emerald-300')
    }
    function loadeddata(e) {
        console.log("[OnGacha]データの読み込み完了",)
        setTestConsole([...TestConsole,'データの読み込み完了'])
        console.log("[OnGacha]loadeddata e==>", e);
        // videoRef.current?.play();
    }
    function canplay(e) {
        console.log("[OnGacha]動画は開始できますが、最後まで再生されるかどうかはわかりません",)
        setTestConsole([...TestConsole,'動画は開始できますが、最後まで再生されるかどうかはわかりません'])
        console.log("[OnGacha]canplay e==>", e);
    }

    function canPlayThrough(e) {
        console.log("[OnGacha]メディアを最後まで再生するのに十分なデータが読み込まれたと推定します",)
        setTestConsole([...TestConsole,'メディアを最後まで再生するのに十分なデータが読み込まれたと推定します'])
        console.log("[OnGacha]canPlayThrough e==>", e);
        // alert("メディアを最後まで再生するのに十分なデータが読み込まれたと推定します")
        // videoRef.current?.play();
        // setVideoAreaHidden('text-red-300')
    }
    function pause(e) {
        console.log("[OnGacha]再生が一時停止した。")
        setTestConsole([...TestConsole,'再生が一時停止した'])
        console.log("[OnGacha]pause e==>", e);
        //  play()の成功フラグ
        setPlaySuccess(false)
    }
    function playing(e) {
        console.log("[OnGacha]データがなくなったために一時停止または遅延した後で、再生の再開の準備ができた")
        setTestConsole([...TestConsole,'データがなくなったために一時停止または遅延した後で、再生の再開の準備ができた'])
        console.log("[OnGacha]playing e==>", e);
        
    }
    function stopMovie(e) {
        //  play()の成功フラグ
        setPlaySuccess(false)
        setVideoAreaHidden('hidden')
        //  叩くボタンのShow hide
        setButtonMashing('hidden')
        // 魚群非表示
        setShowFish('hidden')
        // alert("強制停止　動画を閉じて結果の表示をする")
        setTestConsole([...TestConsole,'動画を閉じて結果の表示をする'])
        // setVideoAreaHidden('動画を閉じて結果の表示をする')
        setModalState((prevState) => ({
            ...prevState,
            mode: "",
        }))
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
    //  叩くボタン
    function mashButton(e) {
        videoRef.current.currentTime = videoRef.current.currentTime + 0.03;
    }




    return (
        <>
            <button 
                className={`${ButtonMashing} relative z-20 text-rose-600 w-full h-screen py-20 font-black text-6xl active:text-7xl active:bg-white/30`}
                onClick={(e) => mashButton()}
                >
                    たたけ!!!
            </button>
            {/* <figure
                className={`${ShowFish} relative z-20  w-full h-screen flex flex-col items-center justify-center`}
            >
                <Fishs />
            </figure> */}
            {/* <ul className="bottom-0 absolute z-20 select-all touch-pan-y bg-gray-950/70  w-full  text-xs text-left whitespace-pre-wrap font-normal border border-solid rounded" >
                {Object.values(TestConsole).map((message,index) => {
                    return (
                        <li key={index}>{message}</li>
                    );
                })}
            </ul> */}

                <div id="video-area" className={`${VideoAreaHidden}`}>
                    <video
                        ref={videoRef}
                        id="video"
                        playsInline={true}
                        // webkitPlaysinline
                        webkitplaysinline={true}
                        // data-state={TestConsole}
                        muted
                        preload="auto"
                        autoPlay
                        // loop
                        onLoadstart={(e) => loadstart(e)}
                        onProgress={(e) => progress(e)}
                        onLoadedMetadata={(e) => loadedMetadata(e)}
                        onLoadeddata={(e) => loadeddata(e)}
                        onEnded={(e) => ended(e)}
                        onPlay={(e) => play(e)}
                        
                        onPause={(e) => pause(e)}
                        onPlaying={(e) => playing(e)}
                        onCanplay={(e) => canplay(e)}
                        onTimeUpdate={(e) => timeupdate()}
                        onCanPlayThrough={(e) => canPlayThrough()}
                        className=""

                        // controls
                        poster="https://i.ytimg.com/vi/qYQRjSpZ8I8/maxresdefault.jpg" 
                        >

                        <source src={modalStateValue.data.videoUrl}  type="video/mp4" />

                        <p>動画を再生できる環境ではありません。</p>
                    </video>
                    <div className="w-full absolute z-30 bottom-0 flex justify-end pb-4 px-4">
                        <button 
                            className="bg-gray-950/70 w-full"
                            onClick={(e) => stopMovie()}
                        >
                            動画をスキップする
                        </button>
                    </div>
                </div>
        </>
)

}