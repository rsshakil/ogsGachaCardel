import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { ButtonMashState } from "../../../../store/recoil/ButtonMashState";
import '../../../../css/OnGacha.css';
import {useIntl} from 'react-intl'
import { Fishs } from "../../../atoms/img/Fishs";
import { ButtonMash } from "../../../atoms/img/ButtonMash";
import useButtonMash from "../../../../hooks/useButtonMash";
import useFishes from "../../../../hooks/useFishes";
import useVideoRefCurrent from "../../../../hooks/useVideoRefCurrent";

let gachaPlayerInterval;

export const GachaPlayer = () => {
    const intl = useIntl()
    const videoRef = useRef(null);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    //  ボタン演出のセッティング
    // const [ButtonMashObj, setButtonMashObj] = useRecoilState(ButtonMashState);
    // console.log("[GachaPlayer]modalStateValue.data==>", modalStateValue.data);
    //  動画の長さ
    const [VideoDuration, setVideoDuration] = useState(0);
    //  バッファーの範囲の始まり
    const [BufferedStart, setBufferedStart] = useState(0);
    //  バッファーの範囲の終わり
    const [BufferedEnd, setBufferedEnd] = useState(0);
    // 動画エリアの表示　十分に準備ができてから解放すると効果的
    const [VideoAreaHidden, setVideoAreaHidden] = useState('hidden');
    //  叩くボタン押すたびに表裏するフラグ
    const [isEvenMashing, setIsEvenMashing] = useState(false);
    //  play()の成功フラグ
    const [PlaySuccess, setPlaySuccess] = useState(false);
    //  video ended動画終了フラグ
    const [isVideoEnded, setIsVideoEnded,] = useState(false);
    //  魚群表示フラグ
    const [ShowFish, setShowFish] = useState('hidden');
    //  魚群表示済みフラグ
    const [ShowFishDone, setShowFishDone] = useState(false);
    //  スキップの表示
    const [ShowSkip, setShowSkip] = useState('hidden');
    //  動画再生ログの記録箱
    const [TestConsole, setTestConsole] = useState(['初期値']);
    //  動画再生時間の記録箱
    const [CurrentTime, setCurrentTime] = useState(0);
    //  ボタンの状態のカスタムhookチェック
    const checkButtonMash = useButtonMash({currentTime:CurrentTime, duration:VideoDuration});
    //  魚群の状態のカスタムhookチェック
    const checkFishes = useFishes({currentTime:CurrentTime});
    //  動画読み込み状態の状態のカスタムhookチェック
    const VideoRefCurrent = useVideoRefCurrent({
        readyState : videoRef.current?.readyState,
        currentTime : videoRef.current?.currentTime,
        volume : videoRef.current?.volume,
        duration : VideoDuration,
        bufferedLength : videoRef.current?.buffered?.length,
        bufferedStart : BufferedStart,
        bufferedEnd: BufferedEnd,
    });
    ////////////////////////////////////////////////////////
    //  CSS CLASS
    //
    const ShowSkipButtonWrapClass = 'w-full max-w-xl absolute z-30 bottom-0 flex justify-end pb-6 px-4';
    const ShowSkipButtonClass = 'bg-gray-950/70 hover:bg-neutral-200 hover:text-gray-800 text-gray-200 w-full';
    const ShowFishClass = 'absolute z-20 top-0 w-full h-screen flex flex-col items-center justify-center';
    const ButtonMashingWrapClass = 'text-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute z-20 text-rose-600 w-full leading-[32rem] font-black text-6xl bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent';
    //
    //  CSS CLASS
    ////////////////////////////////////////////////////////
    

    useEffect(() => {
        //  念の為時間更新
        setCurrentTime(videoRef.current?.currentTime)
        // console.log("[GachaPlayer]videoRef==>", videoRef);
        // console.log("[GachaPlayer]videoRef.current==>", videoRef.current);
        // console.log("[GachaPlayer]videoRef.current.ended==>", videoRef.current.ended);
        // console.log("[GachaPlayer]",videoRef.current?.currentTime,"videoRef.currentの更新発生==videoRef.current.==>",videoRef.current);
        // console.log("[GachaPlayer]",videoRef.current?.currentTime,"videoRef.currentの更新発生==videoRef.current.readyState==>",videoRef.current?.readyState);
        // console.log("[GachaPlayer]",videoRef.current?.currentTime,"videoRef.currentの更新発生==videoRef.current?.buffered==>",videoRef.current?.buffered);
        // console.log("[GachaPlayer]",videoRef.current?.currentTime,"videoRef.currentの更新発生==videoRef.current.buffered.length==>",videoRef.current.buffered.length);
        // console.log("[GachaPlayer]",videoRef.current?.currentTime,"videoRef.currentの更新発生==videoRef.current?.buffered.duration==>",videoRef.current?.buffered.duration);
        // console.log("[GachaPlayer]",videoRef.current?.currentTime,"videoRef.currentの更新発生==videoRef.current.duration==>",videoRef.current.duration);
        //  バッファーの範囲を保持している場合
        if (videoRef.current.buffered.length === 1) {
            //  このバッファーの範囲の始まりと終わりが取得できる
            setBufferedStart(videoRef.current?.buffered.start(0))
            setBufferedEnd(videoRef.current?.buffered.end(0))
            setVideoDuration(videoRef.current?.duration)
        }
        if (videoRef.current.buffered.length === 2) {
            setBufferedEnd(videoRef.current?.buffered.end(1))
            setBufferedEnd(videoRef.current?.buffered.end(0))
            setVideoDuration(videoRef.current?.duration)
        }

    }, [videoRef.current?.buffered, videoRef.current]);
    //////////////////////////////////
    //  VideoRefCurrentの返りに反応して再生停止を制御
    //
    useEffect(() => {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"useEffect VideoRefCurrent:==>", VideoRefCurrent);
        //  念の為時間更新
        setCurrentTime(videoRef.current?.currentTime)
        //  再生されないことがあるので音量をなくす
        if(VideoRefCurrent.volume){videoRef.current.volume = 0;}
        //  バッファーが溜まったのでビデオエリア開放
        if(
            VideoRefCurrent.bufferedEnd > 0 && 
            VideoRefCurrent.bufferedLength > 0 && 
            VideoRefCurrent.bufferedStart === 0 && 
            VideoRefCurrent.bufferedEnd === VideoRefCurrent.duration
            ){
            console.log("[GachaPlayer]",videoRef.current?.currentTime,"[bufferedEnd > 0][bufferedLength > 0][bufferedStart === 0][bufferedEnd === duration]すべてを満たしてる");
            if(videoRef.current.currentTime === 0){
                //  動画の再生開始(再開始)
                videoRef.current?.play()
                .then(() => {
                    //  play()の成功フラグ
                    setPlaySuccess(true)

                    setModalState((prevState) => ({
                        ...prevState,
                        mode: "playMovie",
                    }))
                    console.log("[GachaPlayer]",videoRef.current?.currentTime,"play()成功　モーダル最大化");
                })
                .then(() => {                   
                    //  スキップの表示
                    setShowSkip('')
                    //  ビデオエリア表示
                    setVideoAreaHidden('');
                })
                .catch((error) => {
                //  play()の失敗フラグ
                // 省電力とかでもなる
                console.log("[GachaPlayer]",videoRef.current?.currentTime,error, "[GachaPlayer]play()失敗");
                });
            }else{

           }

        }else{
        //  バッファーが溜まってない
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"useEffect checkButtonMash:==>バッファーが溜まってないので0.1秒進めて0に戻す" );
        setVideoAreaHidden('hidden')
        
        videoRef.current.currentTime = 0.1;
        videoRef.current.currentTime = 0.00;
        // videoRef.current?.pause();
        }
    }, [VideoRefCurrent]);
    //  
    //  VideoRefCurrentの返りに反応して再生停止を制御
    //////////////////////////////////

    //////////////////////////////////
    //  checkButtonMashの返りに反応して再生停止を制御
    //
    // useEffect(() => {
    //     console.log("[GachaPlayer]",videoRef.current?.currentTime,"useEffect checkButtonMash:==>", checkButtonMash);
    //     ////////////////////////////
    //     //  叩けボタンの表示中であれば一時停止発動、叩けボタン表示中出なければ念の為再生
    //     checkButtonMash.showButtonMashing 
    //         //  叩けボタンの表示中であれば一時停止発動、叩けボタン表示中出なければ念の為再生
    //         ? videoRef.current?.pause() 
    //         : checkButtonMash.ButtonMashedEnded
    //             //  叩けボタンの表示中でなければ、演出終了であれば...
    //             ? isVideoEnded
    //                 //  叩けボタンの表示中でなければ、演出終了で動画が終了していなければ再生
    //                 ? <></>
                    
    //                 :videoRef.current?.play()
    //             :<></>;
    // }, [checkButtonMash]);
    //  
    //  checkButtonMashの返りに反応して再生停止を制御
    //////////////////////////////////

    //////////////////////////////////
    //  checkFishesの返りに反応して再生停止を制御
    //
    // useEffect(() => {
    //     console.log("[GachaPlayer]",videoRef.current?.currentTime,"checkFishes:==>", checkFishes);
    //     ////////////////////////////
    //     //  
    //     checkFishes.ShowFishes
    //         //  魚群表示状態なら表示開始
    //         ? setShowFish('')
    //         : checkFishes.FishesEnded
    //             //  魚群表示状態ではなく、終了している場合
    //             ? setShowFish('hidden')
    //             : <></>
    //         ;
    // }, [checkFishes]);
    //  
    //  checkFishesの返りに反応して再生停止を制御
    //////////////////////////////////

    //////////////////////////////////
    //  再生が完了した時間の長さを表す
    //
    useEffect(() => {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"videoRef.played==>", videoRef.played);
    }, [videoRef.played]);
    //  
    //  再生が完了した時間の長さを表す
    //////////////////////////////////

    //////////////////////////////////
    //  再生が終了しているかどうかをBoolean値で表す
    //
    useEffect(() => {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"videoRef.ended動画が終了したかどうか==>", videoRef.ended);
    }, [videoRef.ended]);
    //  
    //  再生が終了しているかどうかをBoolean値で表す
    //////////////////////////////////

    //////////////////////////////////
    //  CurrentTimeの定時更新
    //  gachaPlayerInterval
    let tick = () => {
        setCurrentTime(videoRef.current?.currentTime)
        
    };
    console.log("[GachaPlayer]",videoRef.current?.currentTime,"[OutOftick]CurrentTime==>", CurrentTime);
    useEffect(() => {
        if(VideoAreaHidden === 'hidden'){
            clearInterval(gachaPlayerInterval);
        }else{
            // intervalがすでに有るのなら、それはキャンセル。
            if(gachaPlayerInterval) {
                clearInterval(gachaPlayerInterval);
            }
            // あらためてintervalを作成
            // gachaPlayerInterval = setInterval(tick,4000);
        }
    }, [VideoAreaHidden])
    //
    //  CurrentTimeの定時更新
    //////////////////////////////////



    //  動画が再生され始まるとこれが繰り返し呼び出される
    function timeupdate(e) {
        //  再生時間をアップデート
        setCurrentTime(videoRef.current?.currentTime)
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"timeupdate()再生時間：==>", videoRef.current?.currentTime);
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"timeupdate()checkButtonMash：==>", checkButtonMash);

    }

    function ended(e) {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"動画再生終了")
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"ended e==>", e)
        //  タイマー終了
        clearInterval(gachaPlayerInterval);
        //  動画再生終了
        setIsVideoEnded(true)
        setVideoAreaHidden('hidden')
        //  play()の成功フラグ
        setPlaySuccess(true)
        //  魚群非表示
        setShowFish('hidden')
        // setVideoAreaHidden('')
        // videoRef.current?.play();
        setModalState((prevState) => ({
            ...prevState,
            mode: "",    //空にする事でプレイヤー終了
        }))
        // alert("末尾到達　動画を閉じて結果の表示をする")
        showPrize();
    }

    function play(e) {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"再生が始まった")
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"play e==>", e);
        //  play()の成功フラグ
        setPlaySuccess(true)
        //  念の為時間更新
        setCurrentTime(videoRef.current?.currentTime)
    }


    function loadstart(e) {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"リセットを行い読み込み開始",)
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"loadstart e==>", e);
    }
    function progress(e) {
        //  念の為時間更新
        setCurrentTime(videoRef.current?.currentTime)
        setTestConsole([...TestConsole,'読み込み中'])
    }
    function loadedMetadata(e) {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"メタデータの読み込み完了",)
        setTestConsole([...TestConsole,'メタデータの読み込み完了'])
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"loadedMetadata e==>", e);
        //  念の為時間更新
        setCurrentTime(videoRef.current?.currentTime)
    }
    function loadeddata(e) {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"データの読み込み完了",)
        setTestConsole([...TestConsole,'データの読み込み完了'])
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"loadeddata e==>", e);
        //  念の為時間更新
        setCurrentTime(videoRef.current?.currentTime)
    }
    function canplay(e) {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"動画は開始できますが、最後まで再生されるかどうかはわかりません",)
        setTestConsole([...TestConsole,'動画は開始できますが、最後まで再生されるかどうかはわかりません'])
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"canplay e==>", e);
        //  念の為時間更新
        setCurrentTime(videoRef.current?.currentTime)
    }

    function canPlayThrough(e) {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"メディアを最後まで再生するのに十分なデータが読み込まれたと推定します",)
        setTestConsole([...TestConsole,'メディアを最後まで再生するのに十分なデータが読み込まれたと推定します'])
        //  念の為時間更新
        setCurrentTime(videoRef.current?.currentTime)
    }
    function pause(e) {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"再生が一時停止した。",videoRef.current.currentTime)
        setTestConsole([...TestConsole,'再生が一時停止した'])
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"pause e==>", e);
        //  念の為時間更新
        setCurrentTime(videoRef.current?.currentTime)
        //  play()の成功フラグ
        setPlaySuccess(false)
    }
    function playing(e) {
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"データがなくなったために一時停止または遅延した後で、再生の再開の準備ができた")
        setTestConsole([...TestConsole,'データがなくなったために一時停止または遅延した後で、再生の再開の準備ができた'])
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"playing e==>", e);
        //  念の為時間更新
        setCurrentTime(videoRef.current?.currentTime)
        
    }
    function stopMovie(e) {
        //  タイマー終了
        clearInterval(gachaPlayerInterval);
        //  play()の成功フラグ
        setPlaySuccess(false)
        //  動画再生終了
        setIsVideoEnded(true)
        setVideoAreaHidden('hidden')
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"スキップボタンでビデオタグhidden==>");
        // 魚群非表示
        setShowFish('hidden')
        // alert("強制停止　動画を閉じて結果の表示をする")
        setTestConsole([...TestConsole,'動画を閉じて結果の表示をする'])
        // setVideoAreaHidden('動画を閉じて結果の表示をする')
        setModalState((prevState) => ({
            ...prevState,
            mode: "",
        }))
        showPrize();
    }
    function showPrize(e) {
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'showPrize',
            // mode: "",
            data: {...prevState.data,videoUrl: '', }   //   ❗️動画URLを削除
        }))
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"リセットの意味でload使用==>");
        videoRef.current?.load('リセットの意味で使用')
        //  showRewardまで進んだので動画のURLをヘッダーから削除する
        const videoPreload = document.getElementById("video-preload");
        videoPreload.href = '';
        //  スキップの非表示
        setShowSkip('hidden')
    }
    //  叩くボタン
    function mashButton(e) {
        //  再生可能範囲以上にいくとエラーになるので注意
        videoRef.current.currentTime = videoRef.current.currentTime + 0.025 ;
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"叩いてここまで進める==>", videoRef.current.currentTime);
        setIsEvenMashing(!isEvenMashing);
        console.log("[GachaPlayer]",videoRef.current?.currentTime,"mashButton==>", isEvenMashing);
    }

    return (
        <>
            {checkButtonMash.showButtonMashing
                ?
                    <div
                        className={`${ButtonMashingWrapClass} ButtonMashingEven-${isEvenMashing}`}
                        onClick={(e) => {mashButton();}}
                    >
                            <ButtonMash data={{
                                'currentTime' : CurrentTime,
                                'isEvenMashing' : isEvenMashing,
                                }}/>
                    </div>
                :
                    <></>
            }
            <figure className={`${ShowFish} ${ShowFishClass}`}>
                <Fishs data={{'currentTime' : CurrentTime,}}/>
            </figure>
            {/* スマホで動画の状況を確認するには以下を表示させる */}
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
                        // loop    //  通常ループなし
                        onLoadStart={(e) => loadstart(e)}
                        onProgress={(e) => progress(e)}
                        onLoadedMetadata={(e) => loadedMetadata(e)}
                        onLoadedData={(e) => loadeddata(e)}
                        onEnded={(e) => ended(e)}
                        onPlay={(e) => play(e)}
                        onPause={(e) => pause(e)}
                        onPlaying={(e) => playing(e)}
                        onCanPlay={(e) => canplay(e)}
                        onTimeUpdate={(e) => timeupdate()}
                        onCanPlayThrough={(e) => canPlayThrough()}
                        className=""
                        // controls
                        poster="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%229%22%2F%3E" 
                        >
                        <source src={modalStateValue.data.videoUrl}  type="video/mp4" />
                        <p>動画を再生できる環境ではありません。</p>
                    </video>

                </div>
                <div className={`${ShowSkip} ${ShowSkipButtonWrapClass}`}>
                    <button className={ShowSkipButtonClass} onClick={(e) => stopMovie()}>{intl.formatMessage({ id: 'skip_video' })}</button>
                </div>
        </>
)

}