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

export const ceilingGaugeState = atom({
  key: 'ceilingGaugeState',
  // ガチャID配列の中に、個々の状況を格納する形になると思う
  default: {
    // 95% >  "★★★★★" with blinking rainbow
    // 90% >  "★★★★★" with blinking
    // 80% >  "★★★★★"
    // 60% >  "★★★★☆"
    // 40% >  "★★★☆☆"
    // 20% >  "★★☆☆☆"
    // 0% >  "★☆☆☆☆"
    // 0% =  "☆☆☆☆☆"
    // ceilingStarText: "☆☆☆☆☆",
    gachaLimitCount: 0,
    personalNumber: 0,
  },
  effects_UNSTABLE: [persistAtom]

})
