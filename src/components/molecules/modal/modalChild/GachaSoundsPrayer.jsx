//  SE開始停止に専念する　modalに貼り付けておく
//  ❗️叩けの音は応答速度の一番近いとこに配置する
// https://tonejs.github.io/
//  https://tonejs.github.io/docs/14.7.77/index.html
//  https://audiostock.jp/audio/1268522
//  http://kirakira-soundeffect.com/soundeffect13.php
//  https://dev.classmethod.jp/articles/playing-a-sound-in-the-react-app-use-sound-part-2/
//  https://dev.classmethod.jp/articles/playing-a-sound-in-the-react-app-use-sound/
//  https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/
//  https://prettytabby.com/react-audio/
//  https://www.sansei-rd.com/p_garo_archive/download/sound.html

import React, { useRef, useState, useEffect, Suspense, useLayoutEffect } from "react";
import { useRecoilState, } from 'recoil';
import {useIntl,FormattedDate} from 'react-intl'
import { modalState } from "../../../../store/recoil/modalState";
import { playScenarioState } from "../../../../store/recoil/playScenarioState";
import useSound from 'use-sound';
import {useInterval,useBoolean,useUpdateEffect} from 'react-use';



/////////////////////////////////
//　export前変数宣言
//  動画URL
let movieFileName = '';
let startCount = 0;
//export前変数宣言
/////////////////////////////////

export const GachaSoundsPrayer = (props) => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [playScenarioObj, setPlayScenario] = useRecoilState(playScenarioState);

    //  'react-use'の部品　カウントダウン開始秒
    const [count, setCount] = React.useState(0);
    //  'react-use'の部品　カウントダウン間隔
    const [delay, setDelay] = React.useState(200);
    //  'react-use'の部品　カウントダウン開始停止
    const [isRunning, setIsRunning] = useState(false);

    //////////////////オーラ//////////////////////////
    //  'react-use'の部品　カウントダウン開始秒
    const [auraCount, setAuraCount] = React.useState(0);
    //  'react-use'の部品　カウントダウン間隔
    const [auraDelay, setAuraDelay] = React.useState(1000);
    //  'react-use'の部品　カウントダウン開始停止
    const [isAuraRunning, setIsAuraRunning] = useState(false);

    //////////////////スタンプ//////////////////////////
    //  'react-use'の部品　カウントダウン開始秒
    const [HokutoStampCount, setHokutoStampCount] = React.useState(0);
    //  'react-use'の部品　カウントダウン間隔
    const [HokutoStampDelay, setHokutoStampDelay] = React.useState(600);
    //  'react-use'の部品　カウントダウン開始停止
    const [isHokutoStampRunning, setIsHokutoStampRunning] = useState(false);

    //////////////////魚群//////////////////////////
    //  'react-use'の部品　カウントダウン開始秒
    const [fishCount, setFishCount] = React.useState(0);
    //  'react-use'の部品　カウントダウン間隔
    const [fishDelay, setFishDelay] = React.useState(200);
    //  'react-use'の部品　カウントダウン開始停止
    const [isFishRunning, setIsFishRunning] = useState(false);


    /////////////////////////////////
    //  素材の定義
    //  ボタン　さぁ押しなさいの音
    const [playStart, { stopStart }] = useSound('/sound/startButton.mp3',{ 
        id: 'Start',
        volume: 0.3,
        html5 : false,
    });
    // const [playHit1, { stopHit1 }] = useSound('/sound/hit.mp3',{ 
    //     id: 'Hit1',
    //     volume: 0.5,
    //     html5 : true,
    // });
    // const [playHit2, { stopHit2 }] = useSound('/sound/hit.mp3',{ 
    //     id: 'Hit2',
    //     volume: 0.5,
    //     html5 : true,
    // });
    const [playKyuin, { stopKyuin }] = useSound('/sound/kyuin.mp3', { 
        id: 'Kyuin',
        volume: 0.1,
        html5 : false,
    });
    // const [Siren,{stop}] = useSound('/sound/siren.mp3',{ 
    //     id: 'SirenLow',
    //     volume: 1,
    //     loop: true,
    //     html5 : true,
    // });
    const [SirenL] = useSound('/sound/sirenL.mp3',{ 
        id: 'SirenL',
        volume: 1,
        html5 : false,
    });
    const [SirenH] = useSound('/sound/sirenH.mp3',{ 
        id: 'SirenH',
        volume: 1,
        html5 : false,
    });
    //  ステップ６クリアの場合のタリラタリラパーー
    const [garo1,{stop}] = useSound('/sound/garo1.mp3',{ 
        id: 'garo1',
        volume: 0.1,
        html5 : false,
    });
    const [aura] = useSound('/sound/aura.mp3',{ 
        id: 'aura',
        volume: 0.5,
        html5 : false,
    });
    const [piyyyn] = useSound('/sound/piyyyn.mp3',{ 
        id: 'piyyyn',
        volume: 0.5,
        html5 : false,
    });
    const [dshan] = useSound('/sound/dshan.mp3',{ 
        id: 'dshan',
        volume: 0.5,
        html5 : false,
    });
    const [zapyuts] = useSound('/sound/zapyuts.mp3',{ 
        id: 'zapyuts',
        volume: 0.7,
        html5 : false,
    });
    //魚群　ブクブク
    const [waterFlow] = useSound('/sound/waterFlow.mp3',{ 
        id: 'waterFlow',
        volume: 1,
        html5 : false,
        onend: () => {
            pyon()
          }
    });
    //魚群　ピョン
    const [pyon] = useSound('/sound/pyon.mp3',{ 
        id: 'pyon',
        volume: 0.1,
        html5 : false,
        onend: () => {
            pyon()

          }
    });
    //魚群　ぽぽょいん
    const [poyoyoyoin] = useSound('/sound/poyoyoyoin.mp3',{ 
        id: 'poyoyoyoin',
        volume: 0.1,
        html5 : false,
        onend: () => {

          }
    });
    //動画始動　カード飛翔
    const [startMovie] = useSound('/sound/startMovie.mp3',{ 
        id: 'startMovie',
        volume: 1,
        html5 : false,
        onend: () => {
            console.log("[GachaSoundsPrayer]startMovie==>❌終了")
          }
    });
    //  素材の定義
    /////////////////////////////////

    /////////////////////////////////
    //　現在のシナリオ状況の取得
    const {
        //
        // timeInfo,
        //  空の時もある
        playScenarioUUID,
        //  空の時もある
        prizeRarity,
        //  空の時もある
        PrizeLevel,
        //  始動前
        Undercard,
        //  始動中
        Fish,
        //  ミッション
        InsertMission
    } = playScenarioObj.current
    //　現在のシナリオ状況の取得
    /////////////////////////////////

    /////////////////////////////////
    //  Undercard.startMovieの指示の監視
    //  空振りでも必ず指示が来る
    useUpdateEffect(() => {
        console.log("[GachaSoundsPrayer]Undercard.startMovie==>", Undercard.startMovie)
        
        if(Undercard.startMovie  && modalStateValue.modalType === 'gacha'){
            console.log("[GachaSoundsPrayer]Undercard.startMovie==>", Undercard.startMovie)
            startMovie();
            // startCount = startCount +1;
        }else{
            // startCount = 0;
        }
    }, [Undercard.startMovie]);
    //  Undercard.startMovieの指示の監視
    /////////////////////////////////

    /////////////////////////////////
    //  modalがGachaPlayerではない時にstop()
    useEffect(() => {
        console.log("[GachaSoundsPrayer]modalStateValue.modalType==>", modalStateValue.modalType)
        if(modalStateValue.modalType !== 'gacha'){
            stop();
            setIsHokutoStampRunning(false)
            //  定時鳴動停止
            if(isRunning){setIsRunning(false)};
        }
    }, [modalStateValue.modalType]);
    //  modalがGachaPlayerではない時にstop()
    /////////////////////////////////

    /////////////////////////////////
    //　ミッションSE始動コントロール
    useEffect(() => {
        if(!InsertMission.showInsertMission){
            //  定時鳴動停止
            if(isRunning){setIsRunning(false)};
            if(InsertMission.currentStep === 'step6' && modalStateValue.modalType === 'gacha'){
                //  STEP6　完走終了おめでとう
                garo1();
            }
        }else if(InsertMission.showInsertMission && modalStateValue.modalType === 'gacha'){
            //  演出が表示なので始動時効果音
            playStart();
        }
        console.log("[GachaSoundsPrayer]InsertMission==>", InsertMission)
    }, [InsertMission.showInsertMission]);
    //　ミッションSE始動コントロール
    /////////////////////////////////

    /////////////////////////////////
    //　叩けSEコントロール
    // useEffect(() => {
    //     if(!InsertMission.isEvenMashing && InsertMission.showInsertMission){
    //         //  演出が非表示なので停止させる
    //         playHit1();
    //     }else if(InsertMission.isEvenMashing && InsertMission.showInsertMission){
    //         //  演出が表示なので始動時効果音
    //         playHit2();
    //     }
    //     console.log("[GachaSoundsPrayer]InsertMission.isEvenMashing]==>", InsertMission.isEvenMashing)
    // }, [InsertMission.isEvenMashing]);
    //　叩けSEコントロール
    /////////////////////////////////

    /////////////////////////////////
    //　叩けSTEPコントロール
    useEffect(() => {
        if(!InsertMission.currentStep){
            //  何もしない
            //  演出が非表示なので停止させる
        }
        else if(InsertMission.currentStep === 'step6' && modalStateValue.modalType === 'gacha'){
            let Tick6 = 0;
            let Limit6 = 1400;
            let KyuinWaitId6;
            let KyuinDuration6 = 0;
            const KyuinWait6 = () => {
                console.log("[ButtonMashing]intervalを作成❗️InsertMissionOnAir開始")
                return new Promise((resolve) => {//・・・・・・・・・・・・①
                    KyuinWaitId6 = setInterval(() => {
                        //  1秒単位（1000）で繰り返し評価
                        if (Tick6 >= Limit6) {
                            // Tick = 0    //テスト用
                            console.log("[ButtonMashing]❗️待ち時間を超えた⏰リセット")
                            if(KyuinWaitId6){clearInterval(KyuinWaitId6)}
                            resolve(Tick6);  //②超えたので脱出
                        }
                        console.log("[ButtonMashing]interval Tick6：",Tick6)
                        Tick6 = Tick6 + 200;
                        playKyuin();
                    }, 200);
                    });
                };
                KyuinWait6().then((KyuinDuration6) => {
                    console.log("[ButtonMashing]intervalを作成❗️③制限時間までの待ち時間超過した ❗️強制停止=>再開❗️")
                    playStart()
                })
        }
        else if(InsertMission.currentStep === 'step5' && modalStateValue.modalType === 'gacha'){
            if(!isRunning){setIsRunning(true)};
            // Siren()
            let Tick5 = 0;
            let Limit5 = 900;
            let KyuinWaitId5;
            let KyuinDuration5 = 0;
            // Limit = 500000   //  デザイン確認時の超ロング上書き
            const KyuinWait5 = () => {
                console.log("[ButtonMashing]intervalを作成❗️InsertMissionOnAir開始")
                return new Promise((resolve) => {//・・・・・・・・・・・・①
                    KyuinWaitId5 = setInterval(() => {
                        //  1秒単位（1000）で繰り返し評価
                        if (Tick5 >= Limit5) {
                            // Tick = 0    //テスト用
                            console.log("[ButtonMashing]❗️待ち時間を超えた⏰リセット")
                            if(KyuinWaitId5){clearInterval(KyuinWaitId5)}
                            resolve(Tick5);  //②超えたので脱出
                        }
                        console.log("[ButtonMashing]interval Tick5：",Tick5)
                        Tick5 = Tick5 + 300;
                        playKyuin();
                    }, 300);
                    });
                };
                KyuinWait5().then((KyuinDuration5) => {
                    console.log("[ButtonMashing]intervalを作成❗️③制限時間までの待ち時間超過した ❗️強制停止=>再開❗️")
                    playStart();
            });

        }
        else if(InsertMission.currentStep === 'step4' && modalStateValue.modalType === 'gacha'){
            playKyuin();
        }
        else if(InsertMission.currentStep === 'step3' && modalStateValue.modalType === 'gacha'){
            playKyuin();
        }
        else if(InsertMission.currentStep === 'step2' && modalStateValue.modalType === 'gacha'){
            playKyuin();
        }
        else if(InsertMission.currentStep === 'step1'){
            //  演出が非表示なので停止させる
            stop();
        }else{
            //  演出が非表示なので停止させる
            stop();
        }
        console.log("[GachaSoundsPrayer]InsertMission.currentStep]==>", InsertMission.currentStep)
    }, [InsertMission.currentStep]);
    //　叩けSTEPコントロール
    /////////////////////////////////

    /////////////////////////////////
    //  叩けSirenLooper
    useInterval(
        () => {
            console.log("[GachaSoundsPrayer]SirenLooper:==>", count)
            if(InsertMission.currentStep === 'step5' && modalStateValue.modalType === 'gacha'){
                console.log("[GachaSoundsPrayer]currentStep:==>", InsertMission.currentStep)
                setDelay(900)
                setCount(count + 900);
                SirenL()
            }else if(InsertMission.currentStep === 'step6' && modalStateValue.modalType === 'gacha'){
                console.log("[GachaSoundsPrayer]currentStep:==>", InsertMission.currentStep)
                setDelay(650)
                setCount(count + 650);
                SirenL()
                SirenH()
            }else{
                console.log("[GachaSoundsPrayer]currentStep:==>", InsertMission.currentStep)
                //  事故防止
                stop();
            }
        },
        isRunning ? delay : null
    );
    //  叩けSirenLooper
    /////////////////////////////////

    /////////////////////////////////
    //  Undercard.ThemaRandResult=hokutoオーラ
    useEffect(() => {
        console.log("[GachaSoundsPrayer]cInsertMission.cUndercard.ThemaRandResult:==>", Undercard?.ThemaRandResult)
        if(Undercard?.ThemaRandResult === 'hokuto' && modalStateValue.modalType === 'gacha'){
            console.log("[GachaSoundsPrayer]cInsertMission.cUndercard.ThemaRandResult:==>", Undercard?.ThemaRandResult)
            //  オーラ音
            // aura()
            setIsAuraRunning(true)
        }
    }, [Undercard.nowOnAir]);
    //  Undercard.ThemaRandResult=hokutoオーラ
    /////////////////////////////////

    /////////////////////////////////
    //  Undercard.ThemaRandResult=hokutoオーラLooper
    useInterval(
        () => {
            console.log("[GachaSoundsPrayer]SirenLooper:==>", auraCount)
            if(Undercard.nowOnAir && modalStateValue.modalType === 'gacha'){
                if(auraCount < 1000){
                    piyyyn()
                    aura()
                    setAuraCount(auraCount + 1000);
                }else{
                    aura()
                    setAuraCount(auraCount + 1000);
                }
                console.log("[GachaSoundsPrayer]Undercard.nowOnAir:==>", Undercard.nowOnAir)
                
            }else{
                setIsAuraRunning(false)
                setIsHokutoStampRunning(false)
                setAuraCount(0);
                setHokutoStampCount(0)
            }
        },
        isAuraRunning ? auraDelay : null
    );
    //  Undercard.ThemaRandResult=hokutoオーラLooper
    /////////////////////////////////

    /////////////////////////////////
    //  Undercard.ThemaRandResult=hokutoオーラ
    useEffect(() => {
        if(Undercard.showHokutoBomb && modalStateValue.modalType === 'gacha'){
            //  爆発
            dshan()
        }
    }, [Undercard.showHokutoBomb]);
    //  Undercard.ThemaRandResult=hokutoオーラ
    /////////////////////////////////

    /////////////////////////////////
    //  Undercard.ThemaRandResult=hokuto確定スタンプ
    useEffect(() => {
        if(Undercard.showHokutoStamp && modalStateValue.modalType === 'gacha'){
            //  爆発
            setIsHokutoStampRunning(true)
        }
    }, [Undercard.showHokutoStamp]);
    //  Undercard.ThemaRandResult=hokuto確定スタンプ
    /////////////////////////////////

    /////////////////////////////////
    //  Undercard.ThemaRandResult=hokuto確定スタンプLooper
    useInterval(
        () => {
            
            if(HokutoStampCount < 3 && modalStateValue.modalType === 'gacha'){
                console.log("[GachaSoundsPrayer]HokutoStampCount:==>", HokutoStampCount)
                zapyuts()
                setHokutoStampCount(HokutoStampCount + 1);
            }else if(HokutoStampCount === 3){
                console.log("[GachaSoundsPrayer]HokutoStampCount:==>", HokutoStampCount)
                setIsHokutoStampRunning(false)
                
            }else{

            }
        },
        isHokutoStampRunning ? HokutoStampDelay : null
    );
    //  Undercard.ThemaRandResult=hokuto確定スタンプLooper
    /////////////////////////////////

    /////////////////////////////////
    //　FishSE始動コントロール
    useEffect(() => {
        if(Fish.nowOnAir && !Fish.isFishEnded && modalStateValue.modalType === 'gacha'){
            console.log("[GachaSoundsPrayer]Fish.nowOnAir==>", Fish.nowOnAir)
            console.log("[GachaSoundsPrayer]Fish.isFishEnded==>", Fish.isFishEnded)
            if(!isFishRunning){
                setFishCount(0);
                setIsFishRunning(true)
                waterFlow()
            }
        }
    }, [Fish]);
    //　FishSE始動コントロール
    /////////////////////////////////

    /////////////////////////////////
    //  Undercard.ThemaRandResult=hokuto確定スタンプLooper
    useInterval(
        () => {
            
            if(fishCount < 8 && modalStateValue.modalType === 'gacha'){
                console.log("[GachaSoundsPrayer]fishCount:==>", fishCount)
                pyon()
                if((fishCount === 0 || fishCount === 2 || fishCount === 4 || fishCount === 6 || fishCount === 8) && modalStateValue.modalType === 'gacha'){
                    poyoyoyoin()
                }
                setFishCount(fishCount + 1);
            }else if(fishCount === 8){
                console.log("[GachaSoundsPrayer]fishCount:==>", fishCount)
                setIsFishRunning(false)
                
            }else{

            }
        },
        isFishRunning ? fishDelay : null
    );
    //  Undercard.ThemaRandResult=hokuto確定スタンプLooper
    /////////////////////////////////







    return (

            <div className="">

            </div>

    );




}
