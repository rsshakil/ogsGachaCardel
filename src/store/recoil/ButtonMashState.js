import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
import { encode, decode } from 'js-base64';

// const { persistAtom } = recoilPersist({
//   key: 'recoil-persist', // this key is using to store data in local storage
//   storage: sessionStorage, // configurate which stroage will be used to store the data
// })

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
      localStorage.setItem(encode(key), encode(value))
    },
    getItem: (key) => {
      const getItem =  localStorage.getItem(encode(key))
      // return getItem && decode(getItem) || {}
      return (getItem && decode(getItem)) || {}
    },
    clear: () => {
      localStorage.clear()
    },
  }
}


const { persistAtom } = recoilPersist({ key: 'recoil-persist', storage: localStorageBase64() })

export const ButtonMashState = atom({
  key: 'ButtonMashState',
  // default: { row: [false,1,2,3,4,5] }
  // default: ['1111111'],
  default: {
    //  この演出があるのか
    hasButtonMashing : true,
    //  この演出の登場する時間
    showButtonMashingTime : 2.0,
    //  この演出の終了する時間
    hiddenButtonMashingTime : 5.5,
    //  この演出のバリエーションタイプ
    buttonMashingType : 1,
    //  この演出が現在表示中かどうか
    // showButtonMashing : false,
    //  この演出が開始したかかどうか
    // ButtonMashedStarted : false,
    //  この演出が終了したかかどうか
    // ButtonMashedEnded : false,

    initial:{
        MashingText : 'Hit',
        RippleColor : 'clear',
        isWarning : false,
        scale : 0,
    },
    0.0:{
        MashingText : 'Hit',
        RippleColor : 'clear',
        isWarning : false,
        scale : 0,
    },
    0.4:{
        MashingText : 'Hit_it_hard',
        RippleColor : 'Blue',
        isWarning : false,
        scale : 0,
    },
    0.8:{
        MashingText : 'Donot_miss_it',
        RippleColor : 'Yellow',
        isWarning : false,
        scale : 0,
    },
    1.2:{
        MashingText : 'more_more',
        RippleColor : 'Red',
        isWarning : true,
        scale : 0,
    },
    1.6:{
        MashingText : 'Break_through',
        RippleColor : 'Rainbow',
        isWarning : true,
        scale : 0,
    },
    2.0:{
        MashingText : 'Hit',
        RippleColor : 'Rainbow',
        isWarning : false,
        scale : 0,
    },
  },
  effects_UNSTABLE: [persistAtom]

})
