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

export const informationState = atom({
  key: 'informationState',
  // default: { row: [false,1,2,3,4,5] }
  // default: ['1111111'],
  default: {

    'info-09': {
      informationId: 'info-09',
      displayDate: '2222.2.22',
      displayText: '[開発情報]',
    },
    'info-08': {
      informationId: 'info-08',
      displayDate: '2222.2.22',
      displayText: '[開発情報]',
    },
    'info-07': {
      informationId: 'info-07',
      displayDate: '2222.2.22',
      displayText: '[開発情報]',
    },
    'info-06': {
      informationId: 'info-06',
      displayDate: '2222.2.22',
      displayText: '[開発情報]',
    },
    'info-05': {
      informationId: 'info-05',
      displayDate: '2222.2.22',
      displayText: '[開発情報]',
    },
    'info-04': {
      informationId: 'info-04',
      displayDate: '2023.12.3',
      displayText: '12/3は大型還元祭！爆アド企画たっぷりご用意♬ お楽しみに!',
    },
    'info-02': {
      informationId: 'info-02',
      displayDate: '2023.12.2',
      displayText: 'ついにカーデル公式サイト プレオープン！',
    },
    'info-01': {
      informationId: 'info-01',
      displayDate: '2023.11.27',
      displayText: 'カーデル オリパ公式サイト公開！',
    },

  },
  effects_UNSTABLE: [persistAtom]
})
