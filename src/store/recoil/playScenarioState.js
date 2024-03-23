import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
import { encode, decode } from 'js-base64';

// const { persistAtom } = recoilPersist({
//   key: 'recoil-persist', // this key is using to store data in local storage
//   storage: sessionStorage, // configurate which stroage will be used to store the data
// })
// sessionStorage.setItem('key', 'BBBBB');

// 20230110 add'js-base64
// const localStorageBase64 = () => {
//   return {
//     setItem: (key, value) => {
//       sessionStorage.setItem(encode(key), encode(value))
//     },
//     getItem: (key) => {
//       const getItem =  sessionStorage.getItem(encode(key))
//       // return getItem && decode(getItem) || {}
//       return (getItem && decode(getItem)) || {}
//     },
//     clear: () => {
//       sessionStorage.clear()
//     },
//   }
// }
//  202312/14 to localStorage
const localStorageBase64 = () => {
    return {
      setItem: (key, value) => {
        sessionStorage.setItem(encode(key), encode(value))
      },
      getItem: (key) => {
        const getItem =  sessionStorage.getItem(encode(key))
        // return getItem && decode(getItem) || {}
        return (getItem && decode(getItem)) || {}
      },
      clear: () => {
        sessionStorage.clear()
      },
    }
  }

  
const { persistAtom } = recoilPersist({ key: 'recoil-persist', storage: localStorageBase64() })

export const playScenarioState = atom({
  key: 'playScenarioState',
  default: {
    current : {
        currentTime : 0,
        //  今回のシナリオのUUID
        playScenarioUUID : 0,
        //  賞のレアリティfromAPI
        prizeRarity : 0,
        //  賞のレベル5刻み
        PrizeLevel : 0,
        //  賞の中身fromAPI
        prizes: {
            "itemId": 0,
            "itemName": "",
            "itemPoint": 0,
            "itemImagePath1": "",
            "itemDescription1": "",
            "itemDescription2": "",
            "itemAttribute1": "",
            "itemAttribute2": "",
            "itemAttribute3": "",
            "itemAttribute4": "",
            "itemAttribute5": "",
            "itemAttribute6": "",
            "itemAttribute7": "",
            "itemAttribute8": "",
            "isItemSelected": false,
            "itemShippingFlag": 0,
            "emissionId": 0,
            "shippingRequestDeadline": 0
        },
        //  今回の前座演出について
        Undercard : {
            //  前座演出がある時に実行出現するかどうかの比率に基づいて表示するかどうかの判定結果
            isUndercardAppear : false,
            //  前座演出が開始したかどうか（不発の開始も含む）　重複起動の防止
            isUndercardStarted : false,
            //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
            isShowUndercard : false,
            //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
            isUndercardEnded : false,
            //  現在上映中
            nowOnAir : false,
            //  現在の進行時間
            UndercardTickerCurrentTime : 0,
            //  テーマの抽選結果
            ThemaRandResult :'',
            //  ステップの抽選結果
            StepRandResult : '',
            //  今回確定したSTEPから取得する総演出時間　これを超えたら動画再生
            UndercardDuration : '',
            //  今回確定したSTEPのテキスト
            UndercardText : {},
            //  北斗の爆発
            showHokutoBomb : false,
            //  北斗のスタンプ
            showHokutoStamp : false,
        },
        //  今回の魚群演出について
        Fish : {
            //  前座演出がある時に実行出現するかどうかの比率に基づいて表示するかどうかの判定結果
            isFishAppear : false,
            //  前座演出が開始したかどうか（不発の開始も含む）　重複起動の防止
            isFishStarted : false,
            //  前座演出が現在表示中（してるはず）かどうか　中断して動画再生の防止
            isShowUndercard : false,
            //  前座演出が終了したかどうか　重複起動の防止・動画再生の仮死状態のとき叩き起こしを遠慮なくできる
            isFishEnded : false,
            //  現在上映中
            nowOnAir : false,
            //  テーマの抽選結果
            ThemaRandResult :'',
            //  ステップの抽選結果
            StepRandResult : '',
            //  今回確定したSTEPから取得する総演出時間　これを超えたら動画再生
            FishDuration : '',
            //  今回確定したSTEPのタイプ
            FishType : '',
            //  魚群襲来時間
            fishPoint : 0,
            //  魚群撤収時間
            escapePoint : 0,
        },
        InsertMission : {
            //  前座演出がある時に実行出現するかどうかの比率に基づいて表示するかどうかの判定結果
            isInsertMissionAppear : false,
            //  テーマの抽選結果
            ThemaRandResult : '',
            //  ステップの抽選結果
            StepRandResult : '',
            //  このテーマで待ち続ける時間　制限 ms
            InsertMissionLimitTime : 20000,
            //  今回の演出の開始時間（ST1の開始が入る）
            InsertMissionStartTime : 0,
            //  今回の演出の終了時間（選択したSTEPのリリース点が入る）
            InsertMissionEndTime : 0,
            //  ラストステップの転換点
            InsertMissionLastStepStartTime : 0,
            //  今回の演出の設定
            InsertMissionConf : {},
            //  この演出が現在表示中かどうか
            showInsertMission : false,
            //  この演出が開始したかかどうか
            InsertMissionStarted : false,
            //  この演出が終了したかかどうか
            InsertMissionEnded : false,
            //  明示的に動画を開始する通知
            reStartMovie : false, //  ❗️初期化
            //  現在のステップ
            currentStep : 'step1',
            //  制限時間までの待ち時間カウントアップ
            InsertMissionWaitTick : 0,
            //  制限時間までの待ち時間超過した
            isInsertMissionWaitTimeOut : false,
            //  叩けであれば偶数奇数
            isEvenMashing : false,
        }
    },
    movie : {
        '111-0':{
            'movieID': '111-0',
            'movieName':'クルクル[111-0]白',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':true,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.366,
                    //  これが最終節の時の終了時間
                    endTime : 4.7,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.033,
                    //  これが最終節の時の終了時間
                    endTime : 5.1,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.366,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.033,
                    //  これが最終節の時の終了時間
                    endTime : 7.733,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.666,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.233,
                    //  これが最終節の時の終了時間
                    endTime : 7.233,
                },
            },
        },
        '111-1':{
            'movieID': '111-1',
            'movieName':'クルクル[111-1]青',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.366,
                    //  これが最終節の時の終了時間
                    endTime : 4.7,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.033,
                    //  これが最終節の時の終了時間
                    endTime : 5.1,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.366,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.033,
                    //  これが最終節の時の終了時間
                    endTime : 7.733,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.666,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.233,
                    //  これが最終節の時の終了時間
                    endTime : 7.233,
                },
            },
        },
        '111-2':{
            'movieID': '111-2',
            'movieName':'クルクル[111-2]緑',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.366,
                    //  これが最終節の時の終了時間
                    endTime : 4.7,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.033,
                    //  これが最終節の時の終了時間
                    endTime : 5.1,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.366,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.033,
                    //  これが最終節の時の終了時間
                    endTime : 7.733,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.666,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.233,
                    //  これが最終節の時の終了時間
                    endTime : 7.233,
                },
            },
        },
        '111-3':{
            'movieID': '111-3',
            'movieName':'クルクル[111-3]赤',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.366,
                    //  これが最終節の時の終了時間
                    endTime : 4.7,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.033,
                    //  これが最終節の時の終了時間
                    endTime : 5.1,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.366,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.033,
                    //  これが最終節の時の終了時間
                    endTime : 7.733,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.666,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.233,
                    //  これが最終節の時の終了時間
                    endTime : 7.233,
                },
            },
        },
        '111a3':{
            'movieID': '111a3',
            'movieName':'クルクル[111a3]赤 扉閉まらない',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.366,
                    //  これが最終節の時の終了時間
                    endTime : 4.7,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.033,
                    //  これが最終節の時の終了時間
                    endTime : 5.1,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.366,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.033,
                    //  これが最終節の時の終了時間
                    endTime : 7.733,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.666,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.233,
                    //  これが最終節の時の終了時間
                    endTime : 7.233,
                },
            },
        },
        '111b3':{
            'movieID': '111b3',
            'movieName':'クルクル[111b3]赤 扉ギリギリ',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.366,
                    //  これが最終節の時の終了時間
                    endTime : 4.7,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.033,
                    //  これが最終節の時の終了時間
                    endTime : 5.1,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.366,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.033,
                    //  これが最終節の時の終了時間
                    endTime : 7.733,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.666,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.233,
                    //  これが最終節の時の終了時間
                    endTime : 7.233,
                },
            },
        },
        '111c3':{
            'movieID': '111c3',
            'movieName':'クルクル[111c3]赤 扉閉まる',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.366,
                    //  これが最終節の時の終了時間
                    endTime : 4.7,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.033,
                    //  これが最終節の時の終了時間
                    endTime : 5.1,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.366,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.033,
                    //  これが最終節の時の終了時間
                    endTime : 7.733,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.666,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.233,
                    //  これが最終節の時の終了時間
                    endTime : 6.666,
                },
            },
        },
        '111a4':{
            'movieID': '111a4',
            'movieName':'クルクル[111a4]虹 扉閉まらない',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.366,
                    //  これが最終節の時の終了時間
                    endTime : 4.7,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.033,
                    //  これが最終節の時の終了時間
                    endTime : 5.1,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.366,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.033,
                    //  これが最終節の時の終了時間
                    endTime : 7.733,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.666,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.233,
                    //  これが最終節の時の終了時間
                    endTime : 7.233,
                },
            },
        },
        '111b4':{
            'movieID': '111b4',
            'movieName':'クルクル[111b4]虹 扉ギリギリ',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.366,
                    //  これが最終節の時の終了時間
                    endTime : 4.7,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.033,
                    //  これが最終節の時の終了時間
                    endTime : 5.1,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.366,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.033,
                    //  これが最終節の時の終了時間
                    endTime : 7.733,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.666,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.233,
                    //  これが最終節の時の終了時間
                    endTime : 7.233,
                },
            },
        },
        '111c4':{
            'movieID': '111c4',
            'movieName':'クルクル[111c4]虹 扉閉まる',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.366,
                    //  これが最終節の時の終了時間
                    endTime : 4.7,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.033,
                    //  これが最終節の時の終了時間
                    endTime : 5.1,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.366,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.033,
                    //  これが最終節の時の終了時間
                    endTime : 7.733,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.666,
                    //  これが最終節の時の終了時間
                    endTime : 6.3,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.233,
                    //  これが最終節の時の終了時間
                    endTime : 6.666,
                },
            },
        },
        '122-0':{
            'movieID': '122-0',
            'movieName':'ゲーージ[122-0]白',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 2.4,
                    //  これが最終節の時の終了時間
                    endTime : 3.8,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 3.0,
                    //  これが最終節の時の終了時間
                    endTime : 4.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 3.8,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 4.3,
                    //  これが最終節の時の終了時間
                    endTime : 4.8,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 4.5,
                    //  これが最終節の時の終了時間
                    endTime : 5.2,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 5.0,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
            },
        },
        '122-1':{
            'movieID': '122-1',
            'movieName':'ゲーージ[122-1]青',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 2.4,
                    //  これが最終節の時の終了時間
                    endTime : 3.8,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 3.0,
                    //  これが最終節の時の終了時間
                    endTime : 4.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 3.8,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 4.3,
                    //  これが最終節の時の終了時間
                    endTime : 4.8,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 4.5,
                    //  これが最終節の時の終了時間
                    endTime : 5.2,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 5.0,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
            },
        },
        '122-2':{
            'movieID': '122-2',
            'movieName':'ゲーージ[122-2]緑',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 2.4,
                    //  これが最終節の時の終了時間
                    endTime : 3.8,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 3.0,
                    //  これが最終節の時の終了時間
                    endTime : 4.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 3.8,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 4.3,
                    //  これが最終節の時の終了時間
                    endTime : 4.8,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 4.5,
                    //  これが最終節の時の終了時間
                    endTime : 5.2,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 5.0,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
            },
        },
        '122-3':{
            'movieID': '122-3',
            'movieName':'ゲーージ[122-3]赤',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 2.4,
                    //  これが最終節の時の終了時間
                    endTime : 3.8,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 3.0,
                    //  これが最終節の時の終了時間
                    endTime : 4.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 3.8,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 4.3,
                    //  これが最終節の時の終了時間
                    endTime : 4.8,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 4.5,
                    //  これが最終節の時の終了時間
                    endTime : 5.2,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 5.0,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
            },
        },
        '122a3':{
            'movieID': '122a3',
            'movieName':'ゲーージ[122a3]赤 扉閉まらない',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 2.4,
                    //  これが最終節の時の終了時間
                    endTime : 3.8,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 3.0,
                    //  これが最終節の時の終了時間
                    endTime : 4.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 3.8,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 4.3,
                    //  これが最終節の時の終了時間
                    endTime : 4.8,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 4.5,
                    //  これが最終節の時の終了時間
                    endTime : 5.2,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 5.0,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
            },
        },
        '122b3':{
            'movieID': '122b3',
            'movieName':'ゲーージ[122b3]赤 扉ギリギリ',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 2.4,
                    //  これが最終節の時の終了時間
                    endTime : 3.8,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 3.0,
                    //  これが最終節の時の終了時間
                    endTime : 4.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 3.8,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 4.3,
                    //  これが最終節の時の終了時間
                    endTime : 4.8,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 4.5,
                    //  これが最終節の時の終了時間
                    endTime : 5.2,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 5.0,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
            },
        },
        '122c3':{
            'movieID': '122c3',
            'movieName':'ゲーージ[122c3]赤 扉閉まる',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 2.4,
                    //  これが最終節の時の終了時間
                    endTime : 3.8,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 3.0,
                    //  これが最終節の時の終了時間
                    endTime : 4.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 3.8,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 4.3,
                    //  これが最終節の時の終了時間
                    endTime : 4.8,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 4.5,
                    //  これが最終節の時の終了時間
                    endTime : 5.2,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 5.0,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
            },
        },
        '122a4':{
            'movieID': '122a4',
            'movieName':'ゲーージ[122a4]虹 扉閉まらない',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 2.4,
                    //  これが最終節の時の終了時間
                    endTime : 3.8,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 3.0,
                    //  これが最終節の時の終了時間
                    endTime : 4.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 3.8,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 4.3,
                    //  これが最終節の時の終了時間
                    endTime : 4.8,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 4.5,
                    //  これが最終節の時の終了時間
                    endTime : 5.2,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 5.0,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
            },
        },
        '122b4':{
            'movieID': '122b4',
            'movieName':'ゲーージ[122b4]虹 扉ギリギリ',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 2.4,
                    //  これが最終節の時の終了時間
                    endTime : 3.8,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 3.0,
                    //  これが最終節の時の終了時間
                    endTime : 4.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 3.8,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 4.3,
                    //  これが最終節の時の終了時間
                    endTime : 4.8,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 4.5,
                    //  これが最終節の時の終了時間
                    endTime : 5.2,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 5.0,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
            },
        },
        '122c4':{
            'movieID': '122c4',
            'movieName':'ゲーージ[122c4]虹 扉閉まる',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 2.4,
                    //  これが最終節の時の終了時間
                    endTime : 3.8,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 3.0,
                    //  これが最終節の時の終了時間
                    endTime : 4.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 3.8,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 4.3,
                    //  これが最終節の時の終了時間
                    endTime : 4.8,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 4.5,
                    //  これが最終節の時の終了時間
                    endTime : 5.2,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 5.0,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
            },
        },
        '133-0':{
            'movieID': '133-0',
            'movieName':'サイバー[133-0]白',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.6,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.0,
                    //  これが最終節の時の終了時間
                    endTime : 5.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.6,
                    //  これが最終節の時の終了時間
                    endTime : 5.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.2,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.6,
                    //  これが最終節の時の終了時間
                    endTime : 6.5,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.9,
                    //  これが最終節の時の終了時間
                    endTime : 7.8,
                },
            },
        },
        '133-1':{
            'movieID': '133-1',
            'movieName':'サイバー[133-1]青',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.6,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.0,
                    //  これが最終節の時の終了時間
                    endTime : 5.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.6,
                    //  これが最終節の時の終了時間
                    endTime : 5.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.2,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.6,
                    //  これが最終節の時の終了時間
                    endTime : 6.5,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.9,
                    //  これが最終節の時の終了時間
                    endTime : 7.8,
                },
            },
        },
        '133-2':{
            'movieID': '133-2',
            'movieName':'サイバー[133-2]緑',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.6,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.0,
                    //  これが最終節の時の終了時間
                    endTime : 5.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.6,
                    //  これが最終節の時の終了時間
                    endTime : 5.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.2,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.6,
                    //  これが最終節の時の終了時間
                    endTime : 6.5,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.9,
                    //  これが最終節の時の終了時間
                    endTime : 7.8,
                },
            },
        },
        '133-3':{
            'movieID': '133-3',
            'movieName':'サイバー[133-3]赤',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.6,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.0,
                    //  これが最終節の時の終了時間
                    endTime : 5.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.6,
                    //  これが最終節の時の終了時間
                    endTime : 5.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.2,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.6,
                    //  これが最終節の時の終了時間
                    endTime : 6.5,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.9,
                    //  これが最終節の時の終了時間
                    endTime : 7.8,
                },
            },
        },
        '133a3':{
            'movieID': '133a3',
            'movieName':'サイバー[133a3]赤 扉閉まらない',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.6,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.0,
                    //  これが最終節の時の終了時間
                    endTime : 5.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.6,
                    //  これが最終節の時の終了時間
                    endTime : 5.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.2,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.6,
                    //  これが最終節の時の終了時間
                    endTime : 6.5,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.9,
                    //  これが最終節の時の終了時間
                    endTime : 7.8,
                },
            },
        },
        '133b3':{
            'movieID': '133b3',
            'movieName':'サイバー[133b3]赤 扉ギリギリ',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.6,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.0,
                    //  これが最終節の時の終了時間
                    endTime : 5.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.6,
                    //  これが最終節の時の終了時間
                    endTime : 5.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.2,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.6,
                    //  これが最終節の時の終了時間
                    endTime : 6.5,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.9,
                    //  これが最終節の時の終了時間
                    endTime : 7.8,
                },
            },
        },
        '133c3':{
            'movieID': '133c3',
            'movieName':'サイバー[133c3]赤 扉閉まる',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.6,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.0,
                    //  これが最終節の時の終了時間
                    endTime : 5.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.6,
                    //  これが最終節の時の終了時間
                    endTime : 5.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.2,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.6,
                    //  これが最終節の時の終了時間
                    endTime : 6.5,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.9,
                    //  これが最終節の時の終了時間
                    endTime : 7.8,
                },
            },
        },
        '133a4':{
            'movieID': '133a4',
            'movieName':'サイバー[133a4]虹 扉閉まらない',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.6,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.0,
                    //  これが最終節の時の終了時間
                    endTime : 5.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.6,
                    //  これが最終節の時の終了時間
                    endTime : 5.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.2,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.6,
                    //  これが最終節の時の終了時間
                    endTime : 6.5,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.9,
                    //  これが最終節の時の終了時間
                    endTime : 7.8,
                },
            },
        },
        '133b4':{
            'movieID': '133b4',
            'movieName':'クルクル[133b4]虹 扉ギリギリ',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.6,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.0,
                    //  これが最終節の時の終了時間
                    endTime : 5.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.6,
                    //  これが最終節の時の終了時間
                    endTime : 5.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.2,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.6,
                    //  これが最終節の時の終了時間
                    endTime : 6.5,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.9,
                    //  これが最終節の時の終了時間
                    endTime : 7.8,
                },
            },
        },
        '133c4':{
            'movieID': '133c4',
            'movieName':'クルクル[133c4]虹 扉閉まる',
            'movieDescription':'説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
            'isMovieSelected':false,
            //  連打ボタンの出現時間（実質的にST1の始まり優先なのでこれは予備）
            showButtonMashingTime : 2.3,
            //　長押しの演出
            showButtonLongPressTime : 2.3,
            //　短押しの演出
            showButtonShortPressTime : 2.3,
            //　引っ張れ離せの演出
            showPullTime : 2.3,
            //　slotの演出
            showSlotTime : 2.3,
            //　ハイローの演出
            showHighLowTime : 2.3,
            //  動画の転換点
            turningPoint : {
                fish : {
                    //  魚群通過のベストタイミング
                    startTime : 0.5,
                    //  余裕を見て強制的に魚群を撤去するタイミング
                    endTime : 3.5,
                },
                step1 : {
                    //  区切りの時間
                    startTime : 3.6,
                    //  これが最終節の時の終了時間
                    endTime : 4.5,
                },
                step2 : {
                    //  区切りの時間
                    startTime : 4.0,
                    //  これが最終節の時の終了時間
                    endTime : 5.0,
                },
                step3 : {
                    //  区切りの時間
                    startTime : 4.6,
                    //  これが最終節の時の終了時間
                    endTime : 5.5,
                },
                step4 : {
                    //  区切りの時間
                    startTime : 5.2,
                    //  これが最終節の時の終了時間
                    endTime : 6.0,
                },
                step5 : {
                    //  区切りの時間
                    startTime : 5.6,
                    //  これが最終節の時の終了時間
                    endTime : 6.5,
                },
                step6 : {
                    //  区切りの時間
                    startTime : 6.9,
                    //  これが最終節の時の終了時間
                    endTime : 7.8,
                },
            },
        },
    },
    gimmick : {
        config : {
            'gimmickID' : 'config',
            'gimmickImagePath1' : '',
            'isGimmickSelected' : false,
            //  始動前
            hokuto : {
                step1 : {
                    duration : 6000,
                    1:{
                        text : {
                            1:'お前はもう',
                            2:'・・・。'
                        },
                    },
                    2:{
                        text : {
                            1:'お前はもう',
                            2:'・・・？'
                        }
                    },
                    3:{
                        text : {
                            1:'お前はもう',
                            2:'・・・！'
                        }
                    }
                },
                step2 : {
                    duration : 6000,
                    1:{
                        text : {
                            1:'お前はもう',
                            2:'◎△＄♪×￥●＆％＃？！'
                        }
                    },
                    2:{
                        text : {
                            1:'お前はもう',
                            2:'己に問え！'
                        }
                    },
                    3:{
                        text : {
                            1:'お前はもう',
                            2:'当てるのか？'
                        }
                    }
                },
                step3 : {
                    duration : 6000,
                    1:{
                        text : {
                            1:'お前はもう',
                            2:'当てたのか？'
                        }
                    },
                    2:{
                        text : {
                            1:'お前はもう',
                            2:'拳で感じろ！'
                        }
                    },
                    3:{
                        text : {
                            1:'お前はもう',
                            2:'曇り無し！'
                        }
                    },
                },
                step4 : {
                    duration : 6000,
                    1:{
                        text : {
                            1:'お前はもう',
                            2:'当てるのか！'
                        }
                    },
                    2:{
                        text : {
                            1:'お前はもう',
                            2:'突き抜けた！'
                        }
                    },
                    3:{
                        text : {
                            1:'お前はもう',
                            2:'悔いは無い！'
                        }
                    },
                },
                step5 : {
                    duration : 6000,
                    1:{
                        text : {
                            1:'お前はもう',
                            2:'死ぬほど喜べ！'
                        }
                    },
                    2:{
                        text : {
                            1:'お前はもう',
                            2:'死ぬほど喜べ！'
                        }
                    },
                    3:{
                        text : {
                            1:'お前はもう',
                            2:'死ぬほど喜べ！'
                        }
                    },
                },
                step6 : {
                    duration : 6000,
                    1:{
                        text : {
                            1:'お前はもう',
                            2:'当たっている！！'
                        }
                    },
                    2:{
                        text : {
                            1:'お前はもう',
                            2:'当たっている！！'
                        }
                    },
                    3:{
                        text : {
                            1:'お前はもう',
                            2:'当たっている！！'
                        }
                    },
                },
            },
            announcement : {
                step1 : {
                    duration : 6000,
                    1:{
                        text : '・・・。'
                    },
                    2:{
                        text : '・・・?'
                    },
                    3:{
                        text : '己に問え！'
                    }
                },
                step2 : {
                    duration : 6000,
                    1:{
                        text : 'ひでぶっ!!'
                    },
                    2:{
                        text : 'たゎばっ!!'
                    },
                    3:{
                        text : 'あべし!!'
                    }
                },
                step3 : {
                    duration : 6000,
                    1:{
                        text : '知っていたのか？'
                    },
                    2:{
                        text : '拳で感じろ！'
                    },
                    3:{
                        text : '蒼天に聞け！'
                    },
                },
                step4 : {
                    duration : 6000,
                    1:{
                        text : '悔いは無い！'
                    },
                    2:{
                        text : '突き抜けた！'
                    },
                    3:{
                        text : '神拳勝舞！'
                    },
                },
                step5 : {
                    duration : 6000,
                    1:{
                        text : '闘神を呼べ！'
                    },
                    2:{
                        text : '死ぬほど喜べ！'
                    },
                    3:{
                        text : '死ぬほど喜べ！'
                    },
                },
                step6 : {
                    duration : 6000,
                    1:{
                        text : '当たっている！！'
                    },
                    2:{
                        text : '当たっている！！'
                    },
                    3:{
                        text : '当たっている！！'
                    },
                },
            },
            kaiji : {
                step1 : {
                    duration : 6000,
                    1:{
                        text : '・・・。'
                    },
                    2:{
                        text : '・・・?'
                    },
                    3:{
                        text : '己に問え！'
                    }
                },
                step2 : {
                    duration : 6000,
                    1:{
                        text : '・・・！'
                    },
                    2:{
                        text : '曇り無し！'
                    },
                    3:{
                        text : '蒼天に聞け！'
                    }
                },
                step3 : {
                    duration : 6000,
                    1:{
                        text : '知っていたのか？'
                    },
                    2:{
                        text : '拳で感じろ！'
                    },
                    3:{
                        text : '拳で感じろ！'
                    },
                },
                step4 : {
                    duration : 6000,
                    1:{
                        text : '悔いは無い！'
                    },
                    2:{
                        text : '突き抜けた！'
                    },
                    3:{
                        text : '悔いは無いだろう'
                    },
                },
                step5 : {
                    duration : 6000,
                    1:{
                        text : '死ぬほど喜べ！'
                    },
                    2:{
                        text : '死ぬほど喜べ！'
                    },
                    3:{
                        text : '死ぬほど喜べ！'
                    },
                },
                step6 : {
                    duration : 6000,
                    1:{
                        text : '当たっている！！'
                    },
                    2:{
                        text : '当たっている！！'
                    },
                    3:{
                        text : '当たっている！！'
                    },
                },
            },
            eva : {
                step1 : {
                    duration : 6000,
                    1:{
                        text : '・・・。'
                    },
                    2:{
                        text : '・・・?'
                    },
                    3:{
                        text : '己に問え！'
                    }
                },
                step2 : {
                    duration : 6000,
                    1:{
                        text : '・・・！'
                    },
                    2:{
                        text : '曇り無し！'
                    },
                    3:{
                        text : '蒼天に聞け！'
                    }
                },
                step3 : {
                    duration : 6000,
                    1:{
                        text : '知っていたのか？'
                    },
                    2:{
                        text : '拳で感じろ！'
                    },
                    3:{
                        text : '拳で感じろ！'
                    },
                },
                step4 : {
                    duration : 6000,
                    1:{
                        text : '悔いは無い！'
                    },
                    2:{
                        text : '突き抜けた！'
                    },
                    3:{
                        text : '悔いは無いだろう'
                    },
                },
                step5 : {
                    duration : 6000,
                    1:{
                        text : '死ぬほど喜べ！'
                    },
                    2:{
                        text : '死ぬほど喜べ！'
                    },
                    3:{
                        text : '死ぬほど喜べ！'
                    },
                },
                step6 : {
                    duration : 6000,
                    1:{
                        text : '当たっている！！'
                    },
                    2:{
                        text : '当たっている！！'
                    },
                    3:{
                        text : '当たっている！！'
                    },
                },
            },
            jojo : {
                step1 : {
                    duration : 6000,
                    1:{
                        text : '・・・。'
                    },
                    2:{
                        text : '・・・?'
                    },
                    3:{
                        text : '己に問え！'
                    }
                },
                step2 : {
                    duration : 6000,
                    1:{
                        text : '・・・！'
                    },
                    2:{
                        text : '曇り無し！'
                    },
                    3:{
                        text : '蒼天に聞け！'
                    }
                },
                step3 : {
                    duration : 6000,
                    1:{
                        text : '知っていたのか？'
                    },
                    2:{
                        text : '拳で感じろ！'
                    },
                    3:{
                        text : '拳で感じろ！'
                    },
                },
                step4 : {
                    duration : 6000,
                    1:{
                        text : '悔いは無い！'
                    },
                    2:{
                        text : '突き抜けた！'
                    },
                    3:{
                        text : '悔いは無いだろう'
                    },
                },
                step5 : {
                    duration : 6000,
                    1:{
                        text : '死ぬほど喜べ！'
                    },
                    2:{
                        text : '死ぬほど喜べ！'
                    },
                    3:{
                        text : '死ぬほど喜べ！'
                    },
                },
                step6 : {
                    duration : 6000,
                    1:{
                        text : '当たっている！！'
                    },
                    2:{
                        text : '当たっている！！'
                    },
                    3:{
                        text : '当たっている！！'
                    },
                },
            },
            onePiece : {
                step1 : {
                    duration : 6000,
                    1:{
                        text : '・・・。'
                    },
                    2:{
                        text : '・・・?'
                    },
                    3:{
                        text : '己に問え！'
                    }
                },
                step2 : {
                    duration : 6000,
                    1:{
                        text : '・・・！'
                    },
                    2:{
                        text : '曇り無し！'
                    },
                    3:{
                        text : '蒼天に聞け！'
                    }
                },
                step3 : {
                    duration : 6000,
                    1:{
                        text : '知っていたのか？'
                    },
                    2:{
                        text : '拳で感じろ！'
                    },
                    3:{
                        text : '拳で感じろ！'
                    },
                },
                step4 : {
                    duration : 6000,
                    1:{
                        text : '悔いは無い！'
                    },
                    2:{
                        text : '突き抜けた！'
                    },
                    3:{
                        text : '悔いは無いだろう'
                    },
                },
                step5 : {
                    duration : 6000,
                    1:{
                        text : '死ぬほど喜べ！'
                    },
                    2:{
                        text : '死ぬほど喜べ！'
                    },
                    3:{
                        text : '死ぬほど喜べ！'
                    },
                },
                step6 : {
                    duration : 6000,
                    1:{
                        text : '当たっている！！'
                    },
                    2:{
                        text : '当たっている！！'
                    },
                    3:{
                        text : '当たっている！！'
                    },
                },
            },
            //  魚群
            cardel : {
                step1 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'  //魚種
                    },
                    2:{
                        type : 'medium'  //魚種
                    },
                    3:{
                        type : 'large'  //魚種
                    }
                },
                step2 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step3 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step4 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step5 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step6 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
            },
            zawazawa : {
                step1 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'  //魚種
                    },
                    2:{
                        type : 'medium'  //魚種
                    },
                    3:{
                        type : 'large'  //魚種
                    }
                },
                step2 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step3 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step4 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step5 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step6 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
            },
            dodododo : {
                step1 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'  //魚種
                    },
                    2:{
                        type : 'medium'  //魚種
                    },
                    3:{
                        type : 'large'  //魚種
                    }
                },
                step2 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step3 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step4 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step5 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step6 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
            },
            gogogogo : {
                step1 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'  //魚種
                    },
                    2:{
                        type : 'medium'  //魚種
                    },
                    3:{
                        type : 'large'  //魚種
                    }
                },
                step2 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step3 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step4 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step5 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step6 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
            },
            doooooon : {
                step1 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'  //魚種
                    },
                    2:{
                        type : 'medium'  //魚種
                    },
                    3:{
                        type : 'large'  //魚種
                    }
                },
                step2 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step3 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step4 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step5 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step6 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
            },
            zokuzoku : {
                step1 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'  //魚種
                    },
                    2:{
                        type : 'medium'  //魚種
                    },
                    3:{
                        type : 'large'  //魚種
                    }
                },
                step2 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step3 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step4 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step5 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
                step6 : {
                    duration : 3000,    //最大長
                    1:{
                        type : 'small'
                    },
                    2:{
                        type : 'medium'
                    },
                    3:{
                        type : 'large'
                    }
                },
            },
            //  ミッション
            ButtonMash : {
                //  ミッションの制限時間
                limitTime : 20000,
                step1 : {
                    type : 1,
                    isWarning : false,
                    text : 'Hit',
                    RippleColor : 'clear',
                    scale : 0,
                    tickSize : 0.095,
                },
                step2 : {
                    type : 1,
                    isWarning : false,
                    text : 'Hit',
                    RippleColor : 'Blue',
                    scale : 0,
                    tickSize : 0.095,
                },
                step3 : {
                    type : 1,
                    isWarning : false,
                    text : 'Hit_it_hard',
                    RippleColor : 'Yellow',
                    scale : 0,
                    tickSize : 0.090,
                },
                step4 : {
                    type : 1,
                    isWarning : false,
                    text : 'Donot_miss_it',
                    RippleColor : 'Red',
                    scale : 0,
                    tickSize : 0.080,
                },
                step5 : {
                    type : 1,
                    isWarning : true,
                    text : 'more_more',
                    RippleColor : 'Rainbow',
                    scale : 0,
                    tickSize : 0.040,
                },
                step6 : {
                    type : 1,
                    isWarning : true,
                    text : 'Break_through',
                    RippleColor : 'Rainbow',
                    scale : 0,
                    tickSize : 0.020,
                },
            },
            ButtonShortPress : {
                //  ミッションの制限時間
                limitTime : 30000,
                step1 : {},
                step2 : {},
                step3 : {},
                step4 : {},
                step5 : {},
                step6 : {},
            },
            ButtonLongPress : {
                //  ミッションの制限時間
                limitTime : 30000,
                step1 : {},
                step2 : {},
                step3 : {},
                step4 : {},
                step5 : {},
                step6 : {},
            },
            Pull : {
                //  ミッションの制限時間
                limitTime : 30000,
                step1 : {},
                step2 : {},
                step3 : {},
                step4 : {},
                step5 : {},
                step6 : {},
            },
            Slot : {
                //  ミッションの制限時間
                limitTime : 30000,
                step1 : {},
                step2 : {},
                step3 : {},
                step4 : {},
                step5 : {},
                step6 : {},
            },
            HighLow : {
                //  ミッションの制限時間
                limitTime : 30000,
                step1 : {},
                step2 : {},
                step3 : {},
                step4 : {},
                step5 : {},
                step6 : {},
            },
        },
        0:{
            'gimmickID': 0,
            'gimmickImagePath1':'',
            'isGimmickSelected':true,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率15
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 20,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                //　連打の演出
                ButtonMash : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        5:{
            'gimmickID': 5,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 20,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        10:{
            'gimmickID': 10,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 25,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        15:{
            'gimmickID': 15,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 80,
                    step2 : 20,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 25,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        20:{
            'gimmickID': 20,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 25,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        25:{
            'gimmickID': 25,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 25,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        30:{
            'gimmickID': 30,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 25,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 90,
                    step2 : 10,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        35:{
            'gimmickID': 35,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 25,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 90,
                    step2 : 10,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        40:{
            'gimmickID': 40,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 25,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 90,
                    step2 : 10,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 80,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 60,
                    step2 : 40,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        45:{
            'gimmickID': 45,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 25,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 70,
                    step2 : 30,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 80,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        50:{
            'gimmickID': 50,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : false,
                'UndercardFrequency' : {
                    total : 1,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 20,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 70,
                    step2 : 30,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 80,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 40,
                    step2 : 60,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        55:{
            'gimmickID': 55,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 55,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 30,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 70,
                    step2 : 30,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 70,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 70,
                    step2 : 30,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        60:{
            'gimmickID': 60,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 55,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 100,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 30,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 60,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 50,
                    step2 : 30,
                    step3 : 20,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        65:{
            'gimmickID': 65,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 65,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 40,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 60,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 50,
                    step2 : 30,
                    step3 : 20,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        70:{
            'gimmickID': 70,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 65,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 30,
                    step2 : 50,
                    step3 : 20,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 50,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 40,
                    step2 : 60,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 80,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 0,
                    step2 : 30,
                    step3 : 40,
                    step4 : 30,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        75:{
            'gimmickID': 75,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 70,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 10,
                    step2 : 50,
                    step3 : 20,
                    step4 : 20,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 60,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 30,
                    step2 : 70,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 80,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 0,
                    step2 : 20,
                    step3 : 40,
                    step4 : 40,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        80:{
            'gimmickID': 80,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 70,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 0,
                    step2 : 30,
                    step3 : 30,
                    step4 : 40,
                    step5 : 0,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 75,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 20,
                    step2 : 50,
                    step3 : 30,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 85,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 40,
                    step4 : 60,
                    step5 : 0,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        85:{
            'gimmickID': 85,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 80,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 0,
                    step2 : 20,
                    step3 : 30,
                    step4 : 30,
                    step5 : 20,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 80,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 10,
                    step2 : 80,
                    step3 : 10,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 95,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 30,
                    step4 : 60,
                    step5 : 10,
                    step6 : 0,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        90:{
            'gimmickID': 90,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 100,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 0,
                    step4 : 50,
                    step5 : 50,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 100,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 0,
                    step2 : 40,
                    step3 : 60,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 0,
                    step4 : 20,
                    step5 : 40,
                    step6 : 40,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        95:{
            'gimmickID': 95,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 100,    //動画前の演出そのもののの出現率
                    hokuto : 100,
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 0,
                    step4 : 10,
                    step5 : 90,
                    step6 : 0,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 100,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 0,
                    step2 : 30,
                    step3 : 70,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 30,
                    step6 : 70,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        100:{
            'gimmickID': 100,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 100,    //動画前の演出そのものの出現率
                    hokuto : 100,   //  当面これしかない
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 100,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : true,
                'FishFrequency' : {
                    total : 100,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 100,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 100,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
        999:{
            //  これはテスト用
            'gimmickID': 999,
            'gimmickImagePath1':'',
            'isGimmickSelected':false,
            //　動画前の演出
            Undercard : {
                'hasUndercard' : true,
                'UndercardFrequency' : {
                    total : 100,    //動画前の演出そのものの出現率
                    hokuto : 100,   //  当面これしかない
                    announcement : 0,
                    kaiji : 0,
                    eva : 0,
                    jojo : 0,
                    onePiece : 0,
                },
                hokuto : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 100,
                },
                announcement : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                kaiji : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                eva : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                jojo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                onePiece : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
            //　魚群の演出
            Fish : {
                'hasFish' : false,
                'FishFrequency' : {
                    total : 100,    //魚群の演出そのもののの出現率
                    cardel : 100,    
                    zawazawa : 0,   //  当面なし0
                    dodododo : 0,   //  当面なし0
                    gogogogo : 0,   //  当面なし0
                    doooooon : 0,   //  当面なし0
                    zokuzoku : 0,   //  当面なし0
                },
                cardel : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 100,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zawazawa : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                dodododo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                gogogogo : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                doooooon : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備0
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
                zokuzoku : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,  //当面st3までしか使わない予備
                    step5 : 0,  //当面st3までしか使わない予備0
                    step6 : 0,  //当面st3までしか使わない予備0
                },
            },
            //　挿入演出
            insertMission : {
                'hasInsertMission' : true,
                'insertMissionFrequency' : {
                    total : 100,
                    ButtonMash : 100,
                    ButtonLongPress : 0,
                    ButtonShortPress : 0,
                    Pull : 0,
                    Slot : 0,
                    HighLow : 0,
                },
                ButtonMash : {
                    step1 : 0,
                    step2 : 0,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 100,
                },
                //　長押しの演出
                ButtonLongPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　短押しの演出
                ButtonShortPress : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　引っ張れ離せの演出
                Pull : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　slotの演出
                Slot : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
                //　ハイローの演出
                HighLow : {
                    step1 : 50,
                    step2 : 50,
                    step3 : 0,
                    step4 : 0,
                    step5 : 0,
                    step6 : 0,
                },
            },
        },
    }





},
  effects_UNSTABLE: [persistAtom]
})
