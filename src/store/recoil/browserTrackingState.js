//  このStoreは可能な限り残す
//  リロードで初期化をしてはならない
import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
import { encode, decode } from 'js-base64';
import { v4 as uuidv4 } from 'uuid';
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

export const browserTrackingState = atom({
  key: 'browserTrackingState',
  // default: { row: [false,1,2,3,4,5] }
  // default: ['1111111'],
  default: {
    //  このブラウザのUUID
    browserUUID : uuidv4(),
    //  このブラウザのUA
    browserUserAgent: window.navigator.userAgent,
    // このソースはいつ得たものかの日時
    //app.jsの80行目あたりで都度更新
    appRendersDateTime : 0,

    // アカウント作成に関する証跡
    accountCreate: {
        lastCreationDateTime : 0,
        [new Date().setDate(new Date().getDate() - 90)]: {
            timeStamp : new Date().setDate(new Date().getDate() - 90),
            ip : "192.168.11.2",
        }, 
    },
    // ログインに関する証跡
    loginSuccessful: {
      // "aaa@ccc.vv": {
      //   timeStamp : 0,
      //   id : "aaa@ccc.vv",
      // }, 
    //   "bbb@ccc.vv": {
    //     timeStamp : 1705020999,
    //     id : "bbb@ccc.vv",
    //   }, 
    },
    // クーポン利用に関する証跡
    couponSucceed: {
        'coupon-11223344': {  //  クーポンIDについての証跡
            "bbb@ccc.vv": {
                timeStamp : 0,
                id : "bbb@ccc.vv",
            },
        }, 
    },
  },
  effects_UNSTABLE: [persistAtom]
})
