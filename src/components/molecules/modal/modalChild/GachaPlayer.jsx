import React, { useRef, useState, useEffect, Suspense, useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../../store/recoil/modalState";
import { playScenarioState } from "../../../../store/recoil/playScenarioState";
import '../../../../css/OnGacha.css';
import {useIntl} from 'react-intl'
import { Fishs } from "../../../atoms/img/Fishs";
import useFishes from "../../../../hooks/useFishes";
import useVideoRefCurrent from "../../../../hooks/useVideoRefCurrent";
import { debugState } from "../../../../store/recoil/debugState";
import { InsertMission } from "../../../atoms/Scenarios/InsertMission";
import { Undercard } from "../../../atoms/Scenarios/Undercard";
import { Fish } from "../../../atoms/Scenarios/Fish";
import {useInterval,useThrottle,useUpdateEffect} from 'react-use';
import Play from "../../../atoms/img/Play.svg";
import useSound from 'use-sound';


let gachaPlayerInterval;
//  謎の待ち時間
let timeOutFireMovie;
//  謎の待ち時間の期間
let timeOutFireMovieSec = 1000;
//  デバッグ表示用のrearity
let PrizeRarityDebug;

let isVideoEnded = false;
//  現在のステップ
let insertMissionCurrentStep;
//  現在のステップのtickサイズ
let insertMissionCurrenttickSize;


let timeInfo = '';

let debugInfo = '💖正常💖';

//  動画コンソール用　着色
var black   = '\u001b[30m';
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var yellow  = '\u001b[33m';
var blue    = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan    = '\u001b[36m';
var white   = '\u001b[37m';
var reset   = '\u001b[0m';

export const GachaPlayer = () => {
    ////////////////////////////////////////////////////////
    //  基本的に各ステータスは嘘をつく前提できっかけとして利用する
    //  完全にデータを読み込めたと、読み込みを再開しもう一度完全に読み込めたと先祖返りする
    //  節電モードに移行すると仮死状態になるので定期的に死活監視して目覚めさせる
    ////////////////////////////////////////////////////////
    const intl = useIntl()
    const videoRef = useRef(null);
  
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [debugStateValue, setDebugState] = useRecoilState(debugState);
    const [playScenarioObj, setPlayScenario] = useRecoilState(playScenarioState);
    //  ボタン演出のセッティング
    // const [ButtonMashObj, setButtonMashObj] = useRecoilState(ButtonMashState);
    // console.log("[GachaPlayer]modalStateValue.data==>", modalStateValue.data);
    //  動画の長さ
    // const [VideoDuration, setVideoDuration] = useState(0);
    //  賞の高さ
    const [PrizeRarity, setPrizeRarity] = useState(0);
    //  賞の21段階レベル
    const [PrizeLevel, setPrizeLevel] = useState(0);
    //  バッファーの割合
    const [BufferedRate, setBufferedRate] = useState(0);
    //  バッファーの範囲の始まり
    const [BufferedStart, setBufferedStart] = useState(0);
    //  バッファーの範囲の終わり
    const [BufferedEnd, setBufferedEnd] = useState(0);
    //  動画読み込み状態の状態のカスタムhookチェック
    const VideoRefCurrent = useVideoRefCurrent({
        currentTime : videoRef.current?.currentTime,
        readyState : videoRef.current?.readyState,
        volume : videoRef.current?.volume,
        duration : videoRef.current?.duration,
        remainingTime : (videoRef.current?.duration - videoRef.current?.currentTime).toFixed(3),
        bufferedLength : videoRef.current?.buffered?.length,
        bufferedStart : BufferedStart,
        bufferedEnd : BufferedEnd,
        networkState : videoRef.current?.networkState,
        defaultMuted : videoRef.current?.defaultMuted,
        muted : videoRef.current?.muted,
        ended : videoRef.current?.ended,
        src : videoRef.current?.src,
    });
    // 動画エリアの表示　十分に準備ができてから解放すると効果的
    const [VideoAreaHidden, setVideoAreaHidden] = useState('hidden');
    //  叩くボタン押すたびに表裏するフラグ
    const [isEvenMashing, setIsEvenMashing] = useState(false);
    //  叩くボタン押すたびに表裏するフラグの途中の値を間引いたもの
    const throttledEvenMashing = useThrottle(isEvenMashing, 60);
    //  play()の成功フラグ
    const [PlaySuccess, setPlaySuccess] = useState(false);
    //  video ended動画終了フラグ
    // const [isVideoEnded, setIsVideoEnded,] = useState(false);
    //  魚群表示フラグ
    const [ShowFish, setShowFish] = useState('hidden');
    //  魚群表示済みフラグ❗️廃止予定
    // const [ShowFishDone, setShowFishDone] = useState(false);
    //  北斗表示フラグ❗️廃止予定
    // const [ShowHokuto, setShowHokuto] = useState(false);
    //  Undercardの再生を下位のコンポーネントに指示するフラグ
    const [ShowUndercardOnPlayer, setShowUndercardOnPlayer] = useState(false);
    // //  再生前演出表示済みフラグ
    // const [ShowUndercardDone, setShowUndercardDone] = useState(false);
    //  スキップの表示
    const [ShowSkip, setShowSkip] = useState('hidden');
    //  動画再生ログの記録箱
    const [TestConsole, setTestConsole] = useState(['初期値']);
    //  動画再生時間の記録箱
    // const [CurrentTime, setCurrentTime] = useState(0);
    //  ボタンの状態のカスタムhookチェック
    // const checkButtonMash = useButtonMash({
    //     currentTime:VideoRefCurrent.currentTime, 
    //     duration:VideoRefCurrent.duration
    // });
    //  魚群の状態のカスタムhookチェック
    const checkFishes = useFishes({currentTime:VideoRefCurrent.currentTime});
    //  動画スキップ押した
    // const [isStopMovie, setIsStopMovie] = useState(false);
    //  'react-use'の部品　カウントダウン開始秒
    const [count, setCount] = React.useState(120);
    //  'react-use'の部品　カウントダウン間隔
    const [delay, setDelay] = React.useState(1000);
    //  'react-use'の部品　カウントダウン開始停止
    const [isRunning, setIsRunning] = useState(false);
    //  'react-use'の部品　カウントダウン開始停止
    const [showReviveMovie, setShowReviveMovie] = useState(false);

    //  'react-use'の部品　reloadMovieカウントダウン開始秒
    const [reLoadMovieCount, setReLoadMovieCount] = React.useState(15);
    //  'react-use'の部品　reloadMovieカウントダウン間隔
    const [reLoadMovieDelay, setReLoadMovieDelay] = React.useState(1000);
    //  'react-use'の部品　reloadMovieカウントダウン開始停止
    const [isreLoadMovieCountRunning, setIisreLoadMovieCountRunning] = useState(false);
    
    ////////////////////////////////////////////////////////
    //  CSS CLASS
    //
    const ShowSkipButtonWrapClass = 'w-full max-w-xl absolute z-30 bottom-0 flex justify-end pb-6 px-4';
    const ShowSkipButtonClass = 'bg-gray-950/70 hover:bg-neutral-200 hover:text-gray-800 text-gray-200 w-full';
    const ShowFishClass = 'absolute z-20 top-0 w-full h-screen flex flex-col items-center justify-center';
    const ButtonMashingWrapClass = 'text-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute z-40 text-rose-600 w-full leading-[32rem] font-black text-6xl bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent select-none';
    //
    //  CSS CLASS
    ////////////////////////////////////////////////////////

    /////////////////////////////////
    //  SE素材の定義
    //  叩けは同じ音を裏表で使う
    const [playHit1, { stopHit1 }] = useSound('/sound/hit.mp3',{ 
        id: 'Hit1',
        volume: 0.5,
        html5 : false,
    });
    const [playHit2, { stopHit2 }] = useSound('/sound/hit.mp3',{ 
        id: 'Hit2',
        volume: 0.5,
        html5 : false,
    });
    const [result , { stopResult  }] = useSound('/sound/result.mp3',{ 
        id: 'result',
        volume: 0.1,
        html5 : false,
    });
    //  E素材の定義
    /////////////////////////////////

    ////////////////////////////////////////////////////////
    //  現在滞在中のInsertMission STEP
    useLayoutEffect(() => {
        insertMissionCurrentStep = playScenarioObj.current.InsertMission?.currentStep;
        insertMissionCurrenttickSize = playScenarioObj.gimmick.config.ButtonMash[insertMissionCurrentStep].tickSize;
    }, [playScenarioObj.current.InsertMission.currentStep]);
    //   現在滞在中のInsertMission STEP
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    //  isEvenMashing　GachaSoundsPrayerに伝達
    //
    useEffect(() => {
        if(throttledEvenMashing && playScenarioObj.current.InsertMission.showInsertMission){
            playHit1()
        }else if(!throttledEvenMashing && playScenarioObj.current.InsertMission.showInsertMission){
            playHit2()
        }
    }, [throttledEvenMashing]);
    //
    //  isEvenMashing　GachaSoundsPrayerに伝達
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    //  isVideoEnded　挙動確認
    //
    useUpdateEffect(() => {
        videoLog({before : 'isVideoEnded　挙動確認', after : isVideoEnded})
    }, [isVideoEnded]);
    //
    //  isVideoEnded　挙動確認
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    //  五段階のレベルに変換
    //  set prizeRarity  modalStateValue.data
    //
    useLayoutEffect(() => {
        videoLog({before : 'prizeRarity:modalStateValue.data.prizeRarity==>', after : modalStateValue.data.prizeRarity})
        videoLog({before : 'prizeRarity:PrizeRarity', after : PrizeRarity})
        if(PrizeRarity !== modalStateValue.data.prizeRarity){
            //  受け取ったRarity
            if(PrizeRarity !== modalStateValue.data.prizeRarity){setPrizeRarity(modalStateValue.data.prizeRarity)}
            videoLog({before : 'prizeRarity==>', after : '❗️set'})
            //  5刻み　prizeRarity/5　の商に*5
            if(PrizeLevel !== Math.floor(modalStateValue.data.prizeRarity / 5)*5){setPrizeLevel(Math.floor(modalStateValue.data.prizeRarity / 5)*5)}
        }
    }, [modalStateValue.data.prizeRarity]);

    //  五段階のレベルに変換
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    //  videoRefの変化
    //  videoが要素として捉えられた,初期段階で発火する
    //  https://stackoverflow.com/questions/5235145/changing-source-on-html5-video-tag
    //  https://html.spec.whatwg.org/multipage/media.html#location-of-the-media-resource
    //  https://www.htmq.com/video/
    //  https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q10258251585
    //  https://www.w3schools.com/tags/ref_av_dom.asp
    //  https://copyprogramming.com/howto/updating-source-url-on-html5-video-with-react
    useLayoutEffect(() => {
        videoLog({before : 'videoが要素として捉えられた,初期段階で発火する', after : videoRef.videoTracks})
        isVideoEnded = false
        //  GachaSoundsPrayerにわたすおおまかな進行時間
        timeInfo = '';
        //  play()の成功フラグ初期化　ここまでは維持して誤動作を避ける
        if(PlaySuccess){setPlaySuccess(false)}
        //  再生完了フラグ初期化　ここまでは維持して誤動作を避ける
        // ❗️if(isVideoEnded){setIsVideoEnded(false)}
        //  魚群フラグ初期化　保険
        if(ShowFish !== 'hidden'){setShowFish('hidden')}
        //  reactで設定不可能なミュート設定を上書きする[ios対策]
        if(!videoRef.current?.defaultMuted){
            videoRef.current.defaultMuted=true;
        }
        //  さらに音量も0に上書き[ios対策]
        if(VideoRefCurrent.volume){
            videoRef.current.volume = 0;
        }
        //  [ios対策]を万全に担保してからソースをセット
        // videoRef.current.src = modalStateValue.data.videoUrl;
        //  明示的に読み込み開始
        videoRef.current.load();
    }, [videoRef]);
    //
    //  videoRefの変化
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    //  videoRefの変化
    //  videoが要素として捉えられたくらいの初期段階で発火する
    useUpdateEffect(() => {
        videoLog({before : 'useEffect [VideoRefCurrent.src]1', after : VideoRefCurrent.src})
        videoLog({before : 'useEffect [VideoRefCurrent.src]2', after : videoRef.current?.src})
        
    }, [VideoRefCurrent.src]);
    //
    //  videoRefの変化
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    //  BufferedRateの変化
    //  総量を不意に解釈し直して定期的にバッファー率が変わる
    //  仮死状態になることがあるのが背面ではダウンロードしてたりする
    useUpdateEffect(() => {
        videoLog({before : 'useEffect [BufferedRate]動画読み込み割合', after : BufferedRate})
        //  動画終了でない＋Undercard再生指示中ではない＋叩けボタン中でない＋動画の読み込みが25%以上＝＝＞積極的に目覚めさせる
        //  通常はBufferedRate > 33であるが少し甘くする
        if(!isVideoEnded && !ShowUndercardOnPlayer && !playScenarioObj.current.InsertMission.showInsertMission && BufferedRate > 25){
            fireMovie()
            //  20231218　退避
            // videoRef.current.currentTime = 0.00;
            // videoRef.current.pause();
        }
    }, [BufferedRate]);
    //  BufferedRateの変化
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    //  bufferedの変化
    //  仮死状態になった時に叩き起こすトリガーとして使うかもしれない程度
    useUpdateEffect(() => {
    }, [videoRef.current?.buffered]);
    //  bufferedの変化
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    //  networkStateの変化
    //  仮死状態になった時に叩き起こすトリガーとして使うかもしれない程度
    useUpdateEffect(() => {
        // 0	NETWORK_EMPTY	まだデータがない状態
        // 1	NETWORK_IDLE	メディアファイルを選択した状態でネットワーク未接続の状態
        // 2	NETWORK_LOADING	メディアファイルをダウンロードしている状態
        // 3	NETWORK_NO_SOURCE	src属性のメディアファイルが見つからない状態
        videoLog({before : 'useEffect [VideoRefCurrent.networkState]', after : VideoRefCurrent.networkState})
        //  レンダリングの都合で生データで useEffect()
    }, [videoRef.current?.networkState]);
    //  networkStateの変化
    ////////////////////////////////////////////////////////

    //////////////////////////////////
    //  readyStateの変化
    //  仮死状態になった時に叩き起こすトリガーとして使うかもしれない程度
    useUpdateEffect(() => {
        // videoLog({before : 'useEffect [VideoRefCurrent.readyState]', after : ''})
        // videoLog({before : 'useEffect [VideoRefCurrent]', after : VideoRefCurrent})
        // videoLog({before : 'useEffect [VideoRefCurrent]bufferedEnd', after : VideoRefCurrent.bufferedEnd })
        // videoLog({before : 'useEffect [VideoRefCurrent]bufferedLength', after : VideoRefCurrent.bufferedLength })
        // videoLog({before : 'useEffect [VideoRefCurrent]bufferedStart', after : VideoRefCurrent.bufferedStart })
        // videoLog({before : 'useEffect [VideoRefCurrent]bufferedEnd', after : VideoRefCurrent.bufferedEnd})
        // videoLog({before : 'useEffect [VideoRefCurrent]duration', after : VideoRefCurrent.duration})
        // videoLog({before : 'useEffect [VideoRefCurrent]readyState', after : VideoRefCurrent.readyState})
        //  ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
        //  ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️仮死状態になるのでここでなんとかする❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
        //  ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
        // videoLog({before : 'VideoRefCurrent.bufferedEnd > 0', after : VideoRefCurrent.bufferedEnd})
        // videoLog({before : 'VideoRefCurrent.bufferedLength > 0', after : VideoRefCurrent.bufferedLength})
        // videoLog({before : 'VideoRefCurrent.bufferedStart === 0', after : VideoRefCurrent.bufferedStart})
        // videoLog({before : 'VideoRefCurrent.bufferedEnd === VideoRefCurrent.duration', after : VideoRefCurrent.bufferedEnd+' === '+VideoRefCurrent.duration})
        if(
            // VideoRefCurrent.readyState > 2 && 
            VideoRefCurrent.bufferedEnd > 0 && 
            VideoRefCurrent.bufferedLength > 0 && 
            VideoRefCurrent.bufferedStart === 0 && 
            VideoRefCurrent.bufferedEnd === VideoRefCurrent.duration
            ){
            videoLog({before : '[bufferedEnd > 0][bufferedLength > 0][bufferedStart === 0][bufferedEnd === duration]', after : 'すべてを満たしてる'+videoRef.current.currentTime})
            if(videoRef.current.currentTime === 0){
            }else{
                videoLog({before : '[bufferedEnd > 0][bufferedLength > 0][bufferedStart === 0][bufferedEnd === duration]', after : 'すべてを満たしてるが再生しない'+videoRef.current.currentTime})
           }
        }else if(VideoRefCurrent.readyState > 3){
            videoLog({before : 'readyState > 3)', after : VideoRefCurrent.readyState})
            
            fireMovie('readyState[3,]のファイアー❗️')
        }else{
            videoLog({before : '}else{', after : 'バッファーが溜まってない'})
        }
    }, [VideoRefCurrent.readyState]);
    //  
    //  readyStateの変化
    //////////////////////////////////

    //////////////////////////////////
    //  再生が完了した時間の長さを表す
    //  仮死状態になった時に叩き起こすトリガーとして使うかもしれない程度
    useUpdateEffect(() => {
        // videoLog({before : 'useEffect()[videoRef.played]', after : videoRef.current.played.length})
    }, [videoRef.current?.played]);
    //  
    //  再生が完了した時間の長さを表す
    //////////////////////////////////

    //////////////////////////////////
    //  再生が終了しているかどうかをBoolean値で表す
    //  仮死状態になった時に叩き起こすトリガーとして使うかもしれない程度
    useUpdateEffect(() => {
        videoLog({before : 'useEffect()[videoRef.current?.ended]', after : videoRef.current?.ended})
    }, [videoRef.current?.ended]);
    //  
    //  再生が終了しているかどうかをBoolean値で表す
    //////////////////////////////////

    //////////////////////////////////
    //  checkButtonMashの返りに反応して再生停止を制御
    //  調整しやすいように三項演算子やめる
    useUpdateEffect(() => {
        videoLog({before : 'playScenarioObj.current.InsertMission.showInsertMission', after : playScenarioObj.current.InsertMission.showInsertMission})
        if(playScenarioObj.current.InsertMission.showInsertMission){
            //  叩けボタンの表示中であれば一時停止発動
            videoLog({before : 'playScenarioObj.current.InsertMission.showInsertMission', after : playScenarioObj.current.InsertMission.showInsertMission + '叩けボタンの表示中'})
            videoRef.current?.pause() 
        }
    }, [playScenarioObj.current.InsertMission.showInsertMission]);

    // useEffect(() => {
    //     videoLog({before : 'useEffect checkButtonMash', after : checkButtonMash})
    //     if(checkButtonMash.showButtonMashing ){
    //         videoLog({before : 'useEffect checkButtonMash', after : checkButtonMash + '叩けボタンの表示中'})
    //         //  叩けボタンの表示中であれば一時停止発動
    //         videoRef.current?.pause() 
    //     }else{
    //         videoLog({before : 'useEffect checkButtonMash', after : checkButtonMash + '叩けボタンの表示中ではない'})
    //         //  叩けボタン表示中でなければ念の為再生の判定へ
    //         if(checkButtonMash.ButtonMashedEnded){
    //             videoLog({before : 'useEffect checkButtonMash', after : checkButtonMash + '叩けボタンの表示中ではない+叩けが終わっていない'})
    //             //  叩けボタン表示中でなく演出終了であれば動画の終了判定へ
    //             if(!isVideoEnded){
    //                 videoLog({before : 'useEffect checkButtonMash', after : checkButtonMash + '叩けボタンの表示中ではない+叩けが終わっていない+動画未終了'})
    //                 //  （１）叩けボタンの表示中でない（２）演出終了（３）動画が終了していなければ再生
    //                 fireMovie()
    //             }
    //         }
    //     }
    // }, [checkButtonMash.showButtonMashing, checkButtonMash.ButtonMashedStarted, checkButtonMash.ButtonMashedEnded]);
    //  
    //  checkButtonMashの返りに反応して再生停止を制御
    //////////////////////////////////
    
    //////////////////////////////////
    //  残り１秒切ったら発表音
    useUpdateEffect(() => {
        if(VideoRefCurrent.remainingTime < 1.8){
            result()
        }
    }, [VideoRefCurrent.remainingTime]);
    //  
    //  残り１秒切ったら発表音
    //////////////////////////////////

    //////////////////////////////////
    //  checkFishesの返りに反応して再生停止を制御
    //
    useUpdateEffect(() => {
        videoLog({before : 'checkFishes', after : checkFishes})
        checkFishes.ShowFishes
            //  魚群表示状態なら表示開始
            ? setShowFish('')
            : checkFishes.FishesEnded
                //  魚群表示状態ではなく、終了している場合
                ? setShowFish('hidden')
                : <></>
            ;
    }, [checkFishes.ShowFishes, checkFishes.FishesStarted, checkFishes.FishesEnded]);
    //  
    //  checkFishesの返りに反応して再生停止を制御
    //////////////////////////////////

    //////////////////////////////////
    //  Undercardからの動画再生依頼に反応
    useUpdateEffect(() => {
        videoLog({before : 'ファイアー❓checkUndercard.isUndercardEnded', after : playScenarioObj.current.Undercard.startMovie})
        // 動画再生依頼があれば
        if(playScenarioObj.current.Undercard.startMovie){
            videoLog({before : 'ファイアー❗️checkUndercard.isUndercardEnded', after : playScenarioObj.current.Undercard.startMovie})
            // 非表示にする　レンダリングから撤去
            if(ShowUndercardOnPlayer){setShowUndercardOnPlayer(false)}
            fireMovie('Undercard動画再生依頼のファイアー❗️')
        }else{
            videoLog({before : 'ファイアー❌checkUndercard.isUndercardEnded', after : playScenarioObj.current.Undercard.startMovie})
        }
    }, [playScenarioObj.current.Undercard.startMovie]);
    //  Undercardからの動画再生依頼に反応
    //////////////////////////////////

    //////////////////////////////////
    //  InsertMissionからの動画再生依頼に反応
    useUpdateEffect(() => {
        videoLog({before : 'ファイアー❓InsertMission.reStartMovie', after : playScenarioObj.current.InsertMission.reStartMovie})
        // 動画再生依頼があれば
        if(playScenarioObj.current.InsertMission.reStartMovie){
            videoLog({before : 'ファイアー❗️InsertMission.reStartMovie', after : playScenarioObj.current.InsertMission.reStartMovie})
            // 非表示にする　レンダリングから撤去
            // if(ShowUndercardOnPlayer){setShowUndercardOnPlayer(false)}
            fireMovie('InsertMission動画再生依頼のファイアー❗️')
        }else{
            videoLog({before : 'ファイアー❌InsertMission.reStartMovie', after : playScenarioObj.current.InsertMission.reStartMovie})
        }
    }, [playScenarioObj.current.InsertMission.reStartMovie]);
    //  InsertMissionからの動画再生依頼に反応
    //////////////////////////////////

    //////////////////////////////////
    //  CurrentTimeの定時更新
    //  gachaPlayerInterval
    //  仮死状態になった時に叩き起こすトリガーとして使うかもしれない程度
    //  ❗️❗️❗️❗️拡大表示状態の時で位置が0で固まっていたら叩き起こす仮死状態復旧が必要
    //  ❗️❗️❗️❗️省電力モードから復旧
    let tick = () => {
        // setCurrentTime(videoRef.current?.currentTime)
    };
    useUpdateEffect(() => {
        videoLog({before : 'useEffect()[VideoAreaHidden]', after : ''})
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
        
        if(VideoAreaHidden === ''){
            //  画面拡大後カウントして仮死状態復旧
            videoLog({before : '画面拡大後カウントして仮死状態復旧　開始', after : VideoAreaHidden})
            if(!isRunning){setIsRunning(true)};
        }else{
            videoLog({before : '画面拡大後カウントして仮死状態復旧　停止', after : VideoAreaHidden})
            if(isRunning){setIsRunning(false)};
        }

    }, [VideoAreaHidden])
    //
    //  CurrentTimeの定時更新
    //////////////////////////////////

    ////////////////////////////////////////////////
    //  https://github.com/streamich/react-use/blob/master/docs/useInterval.md
    //  60からカウントダウンして🔥
    useInterval(
        () => {
            setCount(count - 1);
            videoLog({before : '画面拡大後カウントして仮死状態復旧　残秒', after : count})
                console.log("[CountDown]count=======>",count);
                if(count <= 0){
                    // //  カンターストップ
                    videoLog({before : '画面拡大後カウントして仮死状態復旧　タイムアップ❗️', after : count})
                    if(isRunning){setIsRunning(false)}
                    setShowReviveMovie(true)
                }
                if(videoRef.current.currentTime > 0.1){
                    // カンターストップ
                    videoLog({before : '画面拡大後カウントして仮死状態復旧　再生しているのでカンターストップ', after : count+':'+VideoRefCurrent.currentTime})
                    if(isRunning){setIsRunning(false)}
                }
            },
            isRunning ? delay : null
    );
    //  60からカウントダウンして🔥
    ////////////////////////////////////////////////

    //////////////////////////////////
    //  仮死状態からの再生
    function reviveMovie(e) {
        setShowReviveMovie(false)
        videoRef.current.currentTime = 0.00;
        fireMovie('仮死状態からの再生❗️')
    }
    //  仮死状態からの再生
    //////////////////////////////////

    ////////////////////////////////////////////////
    //  https://github.com/streamich/react-use/blob/master/docs/useInterval.md
    //  60からカウントダウンして動画を再読み込みする
    useInterval(
        () => {
            setReLoadMovieCount(reLoadMovieCount - 1);
            videoLog({before : 'エラーからの復旧　まであと', after : reLoadMovieCount})
                if(reLoadMovieCount <= 0){
                    // //  カンターストップ
                    videoLog({before : 'エラーからの復旧　タイムアップ❗️reLoad発火🔥', after : reLoadMovieCount})
                    if(isreLoadMovieCountRunning){setIisreLoadMovieCountRunning(false)}
                    //  ここで発火
                    videoRef.current.load();
                    setReLoadMovieCount(15)
                }
                if(videoRef.current.currentTime > 0.7){
                    // カンターストップ
                    videoLog({before : 'エラーからの復旧　カンターストップ', after : reLoadMovieCount+':'+VideoRefCurrent.currentTime})
                    if(isreLoadMovieCountRunning){setIisreLoadMovieCountRunning(false)}
                    setReLoadMovieCount(15)
                }
            },
            isreLoadMovieCountRunning ? reLoadMovieDelay : null
    );
    //  60からカウントダウンして動画を再読み込みする
    ////////////////////////////////////////////////





    function videoLog(e) {
        let beforeMessage = e.before;
        let afterMessage = e.after;
        //  コンソールと動画字幕　一気にコントロール
        //  ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
        //  ❗️❗️❗️❗️❗️❗️❗️❗️不要な時空振りにする❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
        console.log("[GachaPlayer] " + red + VideoRefCurrent.currentTime.toFixed(3) + " " + yellow + e.before + "：==>" + magenta + e.after + reset);
        //  🔽🔽🔽🔽🔽🔽これ使い道なくても稼働させておかないとVideoRefCurrent.currentTimeが返ってこなくなりあらゆるものが止まる
        setTestConsole([...TestConsole,VideoRefCurrent.currentTime.toFixed(3)+" "+e.before+"：==>"+e.after])
        //  ❗️❗️❗️❗️❗️❗️❗️❗️不要な時空振りにする❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
        //  ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
    }

    //  動画が再生され始まるとこれが繰り返し呼び出される
    function timeupdate(e) {
        videoLog({before : 'function timeupdate', after : ''})
        videoLog({before : 'function timeupdate->remainingTime', after : VideoRefCurrent.remainingTime})
        
    }

    function play(e) {
        videoLog({before : 'function play', after : '動画再生開始'})
        debugInfo = '💖正常💖';
        //  play()の成功フラグ
        // setPlaySuccess(true)
    }
    function loadstart(e) {
        videoLog({before : 'function loadstart', after : 'リセットを行いメディアデータの読み込み開始'})
    }
    function progress(e) {
        videoLog({before : 'function progress', after : 'メディアデータの読み込み中'})
            //  https://dieudonneawa7.medium.com/complete-guide-on-how-to-implement-a-video-player-in-react-js-afd07576d50a
            //  time rangesオブジェクトが存在する場合先に進む
            if (videoRef.current?.buffered.length){
                const bufferedEnd = videoRef.current?.buffered.end(videoRef.current?.buffered.length - 1);
                const duration = videoRef.current?.duration;
                if (videoRef && duration > 0 && bufferedEnd > 0) {
                    //  現在のレート
                    const nowRate = (bufferedEnd / duration) * 100;
                    //  たまに嘘をつくので保持しているレートより現在のレートの方が多い時だけアップデート
                    if(nowRate > BufferedRate){
                        if(BufferedRate !== nowRate){setBufferedRate(nowRate)}
                    }
                }
            }
    }
    function loadedMetadata(e) {
        videoLog({before : 'function loadedMetadata', after : 'メタデータの読み込み完了'})
    }
    function loadeddata(e) {
        videoLog({before : 'function loadeddata', after : 'データの読み込み完了:メディアデータを現在の再生位置で描画できる状態になった初回の時'})
    }
    function canplay(e) {
        videoLog({before : 'function canplay', after : '動画は開始できますが、最後まで再生されるかどうかはわかりません'})
    }
    function canPlayThrough(e) {
        videoLog({before : 'function canPlayThrough', after : 'メディアを最後まで再生するのに十分なデータが読み込まれたと推定します'})
    }
    function pause(e) {
        videoLog({before : 'function pause', after : '再生が一時停止した。'})
    }
    function playing(e) {
        videoLog({before : 'function playing', after : 'データがなくなったために一時停止または遅延した後で、再生の再開の準備ができた'})
    }
    function ratechange(e) {
        videoLog({before : 'function ratechange', after : '再生レートが変更された'})
    }
    function volumechange(e) {
        videoLog({before : 'function volumechange', after : 'ボリューム、または、ミュートが変更された'})
    }
    function durationchange(e) {
        videoLog({before : 'function durationchange', after : 'duration属性（メディアリソースの長さ、再生継続時間）が更新された'})
    }
    function waiting(e) {
        videoLog({before : 'function waiting', after : '次のフレームが利用できないため再生停止しているが、やがてそのフレームが利用できるようになるのを待っている'})
    }
    function stalled(e) {
        videoLog({before : 'function stalled', after : 'メディアデータを読み込もうとしているが、予期しない理由で読み込めない'})
    }
    function emptied(e) {
        videoLog({before : 'function emptied', after : '読み込みエラーなどの理由で、読み込みデータが空となった'})
    }
    function error(e) {
        videoLog({before : 'function error', after : '❗️メディアデータの読み込み中にエラーが発生した🚨要素をリセット'})
        debugInfo = '❗️❗️❗️ここで止まる❗️❗️❗️';
        if(!isreLoadMovieCountRunning){setIisreLoadMovieCountRunning(true)}
    }
    function abort(e) {
        videoLog({before : 'function abort', after : 'メディアリソースの読み込みが完了する前に、エラーが原因ではなく読み込みを中断'})
    }
    function suspend(e) {
        videoLog({before : 'function suspend', after : 'メディアリソース全体は読み込めていないが、読み込みを一時休止している'})
    }
    function ended(e) {
        // https://aventureworld.com/posts/96
        videoLog({before : 'function ended', after : '動画再生終了'})
        // if(!isVideoEnded){setIsVideoEnded(true)}
        isVideoEnded = true;
        setModalState((prevState) => ({
            ...prevState,
            mode: "",    //空にする事でプレイヤー終了
        }))
        // alert("末尾到達　動画を閉じて結果の表示をする")
        showPrize();
        //  動画プレイヤーの終了処理
        exitMoviePlayer();
    }
    //  動画の再生処理
    function fireMovie(e) {
        videoLog({before : 'fireMovie:PlaySuccess', after : PlaySuccess})
        // if(timeOutFireMovie) {
        //     clearTimeout(timeOutFireMovie)
        // }

        // timeOutFireMovie = setTimeout(() => {
            videoRef.current?.play()
            .then(() => {
                    //  一度も再生していない時だけ冒頭処理
                    videoLog({before : 'timeOutFireMovie.then①', after : ''})
                    if(!PlaySuccess){
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0.00;
                        //  play()の成功フラグ
                        if(!PlaySuccess){setPlaySuccess(true)}
                        //  モーダルの最大化
                        setModalState((prevState) => ({...prevState,mode: "playMovie",}))
                        videoLog({before : 'play().then', after : '一度も再生していない時だけ冒頭処理1'})
                    }
            })
            .then(() => {
                videoLog({before : 'timeOutFireMovie.then②', after : ''})
                //  スキップの表示
                if(ShowSkip !== ''){setShowSkip('')}
                //  ビデオエリア表示
                if(VideoAreaHidden !== ''){setVideoAreaHidden('')}
                //  次の謎時間は0とする
                // timeOutFireMovieSec = 0;
                videoLog({before : 'play().then', after : '一度も再生していない時だけ冒頭処理2'})
            })
            .then(() => {
                videoLog({before : 'timeOutFireMovie.then③', after : ''})
                //  まだ出現していなければ前座の表示　
                if(!playScenarioObj.current.Undercard.isUndercardStarted){
                    videoRef.current.pause(); //退避❗️
                    videoRef.current.currentTime = 0.00; //退避❗️
                    
                    videoLog({before : 'if(!checkUndercard.isUndercardStarted)', after : 'isUndercardStartedを開始せよ❗️'})
                    //  returnに現れる
                    if(!ShowUndercardOnPlayer){setShowUndercardOnPlayer(true)}
                }else if(playScenarioObj.current.Undercard.nowOnAir){
                    //　スタート済みで　Undercard上映中
                    videoRef.current.pause(); //
                    videoRef.current.currentTime = 0.00; 
                    
                    videoLog({before : 'else if(playScenarioObj.current.Undercard.nowOnAir)', after : 'Undercardスタート済みで　上映中❗️'})
                }else if(playScenarioObj.current.InsertMission.showInsertMission){
                    //　スタート済みで　InsertMission上映中

                    videoRef.current.pause(); //
                    videoLog({before : 'else if(playScenarioObj.current.Undercard.nowOnAir)', after : 'InsertMissionスタート済みで　上映中❗️'})
                }else{

                }

                // videoRef.current.pause(); //デザイン用❗️
                //❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️演出中ならpause();するをもゆ少し足す叩けとか

                videoLog({before : 'play().then', after : '一度も再生していない時だけ冒頭処理3'})
            })
            .catch((error) => {
                //  play()の失敗フラグ
                //  省電力とかでもなる　鬼門
                videoLog({before : 'play().catch(error)', after : 'play()失敗'+ error})
            });

        // }, timeOutFireMovieSec)
        // return () => {clearTimeout(timeOutFireMovie)}
    }

    function stopMovie(e) {
        videoLog({before : 'function stopMovie', after : 'スキップボタンでビデオタグ Hidden'})
        // if(!isVideoEnded){setIsVideoEnded(true)}
        // //  スキップボタンボタンを押した
        // if(!isStopMovie){setIsStopMovie(true)}
        isVideoEnded = true;
        //  Undercard非表示にする　レンダリングから撤去　終了処理でも念の為行われる
        setShowUndercardOnPlayer(false)
        // setVideoAreaHidden('動画を閉じて結果の表示をする')
        setModalState((prevState) => ({
            ...prevState,
            mode: "",
        }))
        //  動画プレイヤーの終了処理
        showPrize();
    }
    function showPrize(e) {
        //  動画再生終了　ここで上書きして誤動作避ける
        // if(!isVideoEnded){setIsVideoEnded(true)}
        isVideoEnded = true;
        if(modalStateValue.data.isTestFlight){
            //  テストフライトの場合選択画面に戻す
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'Ready2TestFlight',
                mode: "",
                data: {...prevState.data,videoUrl: '', }
            }))
        }else{
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'showPrize',
                mode: "",
                data: {...prevState.data,videoUrl: '', }   //   ❗️動画URLを削除
            }))
        }

        //  冗長になるがvideoが嘘をつくのでもう一度絞めておく
        exitMoviePlayer();
    }
    //  動画プレイヤーの終了処理
    function exitMoviePlayer(e) {
        videoLog({before : 'exitMoviePlayer', after : '動画プレイヤーの終了処理'})
        //  動画再生終了　ここで上書きして誤動作避ける
        // if(!isVideoEnded){setIsVideoEnded(true)}
        isVideoEnded = true;
        //  動画待ちの謎時間再セット
        timeOutFireMovieSec = 500;
        //  動画待ちの謎時間タイマー終了
        clearTimeout(timeOutFireMovie)
        //  Undercard非表示にする　レンダリングから撤去
        setShowUndercardOnPlayer(false)
        //  スキップの非表示
        if(ShowSkip !== 'hidden'){setShowSkip('hidden')}
        // 魚群非表示
        if(ShowFish !== 'hidden'){setShowFish('hidden')}
        //  動画ソース消す
        videoRef.current.src = '';
        //  play()の成功フラグ　ここで上書きして誤動作避ける
        if(!PlaySuccess){setPlaySuccess(true)}
        //  定時監視タイマー終了
        clearInterval(gachaPlayerInterval);
        //  透けて見えるので動画エリアを隠す
        if(VideoAreaHidden !== 'hidden'){setVideoAreaHidden('hidden')}
        //  showRewardまで進んだので動画のURLをヘッダーから削除する
        const videoPreload = document.getElementById("video-preload");
        videoPreload.href = '';
        //  このシナリオUUIDを消して終わりとする
        setPlayScenario((prevState) => ({
            ...prevState,
            current : {
                ...prevState.current,
                playScenarioUUID : 'ScenarioIsEnded',
                Undercard : {
                    ...prevState.current.Undercard,
                    //  前座演出がある時に実行出現するかどうかの比率に基づいて表示するかどうかの判定結果
                    isUndercardAppear : false,
                    //  前座演出が開始したかどうか　重複起動の防止
                    isUndercardStarted : false, //  ❗️初期化　この後プレイヤーからの指示後不発開始となる場合もある
                    //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
                    isUndercardEnded : false, //  終了
                    //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
                    nowOnAir : false,
                    //  明示的に動画の再生開始を依頼する
                    startMovie : false,
                    //  テーマの抽選結果
                    ThemaRandResult :'',
                    //  ステップの抽選結果
                    StepRandResult : '',
                    //  今回確定したSTEPから取得する総演出時間　これを超えたら動画再生
                    UndercardDuration : '',
                    //  今回確定したSTEPのテキスト
                    UndercardText : {},
                    //  演出の進行時間
                    UndercardTickerCurrentTime : 0,
                }
            },
        }))
        //  各トリガーとなるModalStateの動画URLも消しておく
        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                'videoUrl': '',
            }
        }))

    }
    //  叩くボタン
    function mashButton(e) {
        //　currentTime が終了時間を超えていたら何もしない
        //  currentTime が嘘をつくことがあるので保険として毎回チェックする
        //  シーク可能な範囲外に進ませない施策も必要
        if(!VideoRefCurrent.ended && playScenarioObj.current.InsertMission.showInsertMission && !playScenarioObj.current.Undercard.nowOnAir && videoRef.current.currentTime !== 0){
            //  演出表示中＋動画が終了していない+前座演出が非表示+再生時間が0ではない　時だけ
            // videoRef.current.currentTime = videoRef.current.currentTime + 0.050 ;
            videoRef.current.currentTime = videoRef.current.currentTime + insertMissionCurrenttickSize ;
            // videoLog({before : 'function mashButton', after : '叩いてここまで進める '+videoRef.current.currentTime})
            // setIsEvenMashing(!isEvenMashing);
            setIsEvenMashing((prev) => !prev);
            // setIsEvenMashing(!isEvenMashing);
        }
    }
    //  叩けで誤動作防止
    function handleContextMenu(e) {
        // e.preventDefault();
        videoLog({before : 'handleContextMenu(e)', after : '叩いてるうちにコンテキスト'})
    }

 
    //  デバッグモードであればPrizeRarityを表示する
    if(debugStateValue.isDebug){
        PrizeRarityDebug = '[R:' + PrizeRarity + 'L:' + PrizeLevel + 'D:' + insertMissionCurrentStep + '⏰' + insertMissionCurrenttickSize + 'T' + VideoRefCurrent.currentTime.toFixed(3) + ']'
    }else{
        PrizeRarityDebug = '';
    }


    return (
        <>
            <div
                className={`${ButtonMashingWrapClass} ButtonMashingEven-${throttledEvenMashing}`}
                onPointerDown={(e) => {mashButton()}}
                onContextMenu={(e) => {handleContextMenu()}}
                >
                <InsertMission data={{
                    PrizeLevel : PrizeLevel,
                    currentEnded : videoRef.current?.ended,
                    currentTime : VideoRefCurrent.currentTime,
                    ShowInsertMissionOnPlayer : '',
                    videoUrl : modalStateValue.data.videoUrl,
                    isEvenMashing : throttledEvenMashing,

                }}/>
            </div>
            {/* ↓↓↓↓デバッグ用に引っかかるポイントを表示する部品↓↓↓↓ */}
            {/* <p className="z-50 text-2xl font-black">{debugInfo}</p> */}
            {/* <figure className={`${ShowFish} ${ShowFishClass}`}>
                <Fishs data={{'currentTime' : VideoRefCurrent.currentTime,}}/>
            </figure> */}
            <Fish data={{
                    PrizeLevel : PrizeLevel,
                    currentTime : VideoRefCurrent.currentTime,
                    currentEnded : videoRef.current?.ended,
                    ShowFish : ShowFish,
                    }}/>
            <Undercard
                key="Undercard"
                data={{
                    PrizeLevel : PrizeLevel,
                    currentTime : VideoRefCurrent.currentTime,
                    currentEnded : videoRef.current?.ended,
                    ShowUndercardOnPlayer : ShowUndercardOnPlayer,   //  再生指示
                    // PlaySuccess : PlaySuccess
                }}
            />
            {showReviveMovie &&
            //////////////////////////////////
            // 最後の救世主手動再生ボタン
            <button 
                className="z-40 text-3xl font-black text-red-600 w-full text-center flex justify-center"
                onPointerDown={(e) => {reviveMovie();}}
            >
                <img src={Play} alt="SVG Icon" className="w-32"/>
            </button>
            // 最後の救世主手動再生ボタン
            ///////////////////////////////////
            }
            {/* スマホで動画の状況を確認するには以下を表示させる */}
            {/* <ul className="h-full overflow-auto bottom-0 absolute z-20 select-all touch-pan-y bg-gray-950/70  w-full  text-xs text-left whitespace-pre-wrap font-normal border border-solid rounded" >
                {Object.values(TestConsole).map((message,index) => {
                    return (
                        <li key={index}>{message}</li>
                    );
                })}
            </ul> */}

                <div id="video-area" className={`${VideoAreaHidden}`}>
                {/* <div id="video-area" > */}
                    <video
                        ref={videoRef}
                        id="video"
                        playsInline={true}
                        // webkitPlaysinline
                        webkitplaysinline={true}
                        // data-state={TestConsole}
                        muted
                        preload="auto"
                        // autoPlay
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
                        onTimeUpdate={(e) => timeupdate(e)}
                        onCanPlayThrough={(e) => canPlayThrough(e)}
                        onRateChange={(e) => ratechange(e)}
                        onVolumeChange={(e) => volumechange(e)}
                        onDurationChange={(e) => durationchange(e)}
                        onWaiting={(e) => waiting(e)}
                        onStalled={(e) => stalled(e)}
                        onEmptied={(e) => emptied(e)}
                        onError={(e) => error(e)}
                        onAbort={(e) => abort(e)}
                        onSuspend={(e) => suspend(e)}
                        className=""
                        // controls
                        poster="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%229%22%2F%3E" 
                        >
                        {/* <source src={modalStateValue.data.videoUrl}  type="video/mp4" /> */}
                        <source src={modalStateValue.data.videoPathH265+modalStateValue.data.videoId+'.mp4?uuid='+modalStateValue.data.uuid} type="video/mp4" />
                        <source src={modalStateValue.data.videoPathWebm+modalStateValue.data.videoId+'.webm?uuid='+modalStateValue.data.uuid} type="video/mp4" />
                        <source src={modalStateValue.data.videoPathH264+modalStateValue.data.videoId+'.mp4?uuid='+modalStateValue.data.uuid} type="video/webm" />
                        <p>{intl.formatMessage({ id: 'The_viewing_environment_is_not_suitable_for_playing_videos' })}</p>
                    </video>

                </div>
                <div className={`${ShowSkip} ${ShowSkipButtonWrapClass}`}>
                    <button className={ShowSkipButtonClass} onClick={(e) => stopMovie()}>
                        {intl.formatMessage({ id: 'skip_video' })}{PrizeRarityDebug}
                    </button>
                </div>
        </>
)

}


