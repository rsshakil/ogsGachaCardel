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

export const informationStateMultilingual = atom({
  key: 'informationStateMultilingual',
  // default: { row: [false,1,2,3,4,5] }
  // default: ['1111111'],
  default: {
    'bn':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) জমকালো উদ্বোধন',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: 'প্রি-ওপেন',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: 'প্রাক-নিবন্ধন শুরু হয়েছে',
      // },

    },
    'de':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) Große Eröffnung',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: 'Voreröffnet',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: 'Die Vorregistrierung hat begonnen',
      // },

    },
    'en':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) Grand opening',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: 'Pre-open',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: 'Pre-registration has start',
      // },

    },
    'es':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) Gran inauguración',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: 'Pre-abierto',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: 'Die Vorregistrierung hat begonnen',
      // },

    },
    'fr':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) Grande ouverture',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: 'Pré-ouverture',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: 'Les pré-inscriptions ont commencé',
      // },

    },
    'id':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) Pembukaan besar',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: 'Pra-pembukaan',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: 'Prapendaftaran telah dimulai',
      // },

    },
    'it':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) Grande apertura',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: 'Pre-aperto',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: 'È iniziata la pre-registrazione',
      // },

    },
    'ja':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00 カーデルグランドオープン',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/12',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: 'プレオープン',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: '事前登録開始',
      // },

    },
    'ko':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) 그랜드 오프닝',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: '사전 오픈',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: '사전등록이 시작되었습니다',
      // },

    },
    'pt':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) Grande inauguração',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: 'Pré-aberto',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: 'A pré-inscrição já começou',
      // },

    },
    'th':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) เปิดตัวอย่างยิ่งใหญ่',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: 'เปิดล่วงหน้า',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: 'การลงทะเบียนล่วงหน้าได้เริ่มต้นขึ้นแล้ว',
      // },

    },
    'zh':{
      'info-03': {
        informationId: 'info-03',
        displayStart : '2023/12/14',
        displayEnd : '2030/1/1',
        displayDate: '2023/12/22',
        displayText: '18:00(JST) 盛大開幕',
      },
      // 'info-02': {
      //   informationId: 'info-02',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/16',
      //   displayText: '試營運',
      // },
      // 'info-01': {
      //   informationId: 'info-01',
      //   displayStart : '2023/12/14',
      //   displayEnd : '2030/1/1',
      //   displayDate: '2023/12/14',
      //   displayText: '預登記已開始',
      // },

    },






  },
  effects_UNSTABLE: [persistAtom]
})
