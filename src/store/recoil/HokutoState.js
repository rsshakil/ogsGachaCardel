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

export const HokutoState = atom({
  key: 'HokutoState',
  // default: { row: [false,1,2,3,4,5] }
  // default: ['1111111'],
  default: {
    //  この演出があるのか
    hasHokuto : true,
    //  この演出の登場する時間
    showHokutoTime : 0.0,
    //  この演出の終了するまでのミリ秒　仮死状態になった時の強制措置
    hiddenHokutoSec : 6000,
    //  この演出のバリエーションタイプ
    HokutoType : 1,
    initial:{
        HokutoSrc : '',
        HokutoTxt : '',
        HokutoInfo : false,
        scale : 0,
    },
    first:{
        HokutoSrc : '',
        HokutoTxt : 'お前はもう',
        HokutoInfo : false,
        scale : 0,
    },
    secondHit:{
        HokutoSrc : '',
        HokutoTxt : '当たっている',
        HokutoInfo : false,
        scale : 0,
    },
    secondSilent:{
        HokutoSrc : '・・・。',
        HokutoTxt : '',
        HokutoInfo : false,
        scale : 0,
    },
    hundredRendingFists:{
        HokutoSrc : '',
        HokutoTxt : '当',
        HokutoInfo : true,
        scale : 0,
    },
  },
  effects_UNSTABLE: [persistAtom]

})
