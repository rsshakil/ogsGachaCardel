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
            localStorage.setItem(encode(key), encode(value))
        },
        getItem: (key) => {
            const getItem = localStorage.getItem(encode(key))
            // return getItem && decode(getItem) || {}
            return (getItem && decode(getItem)) || {}
        },
        clear: () => {
            localStorage.clear()
        },
    }
}


const { persistAtom } = recoilPersist({ key: 'recoil-persist', storage: localStorageBase64() })

export const userState = atom({
    key: 'userState',

    default: {
        //  ログインしているかどうかのフラグ
        isLogin: false,
        //  ログインID　GoogleログインなどあるのでeMailとは限らない
        loginId: '',
        //  SMS認証に使用している電話番号
        smsAuthNo: '',
        //  購入時に設定する名前
        userChargeName: '',
        //  最後にsessionCheck successを得た時刻
        lastSessionCheckSuccessTimeUTC: 0,
        //  ユーザーENV　現在の環境
        currentEnv: process.env.REACT_APP_ENV_CURRENT,
        //  ユーザーUTC
        currentDateTimeUTC: Date.now(),
        getDebug: '',
        //  タッチデバイスかどうかの判定の値（初期値に false を設定）
        hasTouchScreen: false,
        //  ネットワーク状態
        NetworkState: {},
        //  ユーザーの登録した居住地
        countryOfResidence: 383,//Default Japan
        //  ユーザーの登録した居住地Code
        countryOfResidenceCode: 'JP',//Default Japan
        //  ブラウザー情報
        navigatorAppVersion: '',
        //  ブラウザーに設定された言語リスト一番上が①として採用される
        navigatorLanguages: '',
        //  ①ブラウザから取得した言語の最上位
        navigatorLanguage: '',
        //  ブラウザー情報[取得できないことが多い]
        navigatorLocale: '',
        //  ブラウザー情報[ネットワーク状況]
        navigatorOnLine: '',
        //  ブラウザー情報[インテルMACとか]
        navigatorPlatform: '',
        //  ブラウザー情報[UA]
        navigatorUserAgent: '',
        //  ②DBから取得したユーザーの利用言語（過去のログイン時の③）
        userSettingLanguage: '',
        //  ③メニューから指定した言語=>DBに保存して②として復元する必要がある
        userSelectLanguage: '',
        //  不明
        languages: [],
        //  ①ブラウザ②DBから③メニューから指定　の順番で上書きされた結論
        language: 'ja', //  ❗️❗️❗️❗️❗️❗️これが最終
        //　最終的な言語をもとに翻訳ファイルのKEYを確定
        //  🚨これがグローバルな言語codeと一致するとは限らないのであくまでも翻訳ファイルのローカルなKEYとして取り扱う
        //  例えば中国語（繁体　簡体　北京語）となるとずれてくる可能性あり
        languageResource: 'ja',

        windowNavigator: {},
        LoginAccessUrl: '',
        LoginReferrer: '',
        LoginAccessLanguage: '',
        LoginAccessReferrer: '',
        LoginUserAgent: '',
        LoginDataRecordTime: '',
        appVersion: '',
        connection: '',
        myCollection: {
            /*
                    '550e8400-e29b-41d4-a716-446655440000':{
                        'unable2Ship' : true,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':111111,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440000',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'わたしリーリエ ほしぐもちゃん',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440001':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 6),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':855,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440001',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://kaitori-toretoku.jp/wp-content/uploads/2019/05/%E3%83%AA%E3%82%B6%E3%83%BC%E3%83%89%E3%83%B3VMAXHR%E7%94%BB%E5%83%8F-212x300-212x300.jpg',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440002':{
                        'unable2Ship' : true,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 7),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':5895,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440002',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://duke-kaitori.jp/wp-content/uploads/2022/12/SC002.jpg',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440003':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 8),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':58965,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440003',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://static.mercdn.net/item/detail/orig/photos/m76815368368_1.jpg',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440004':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 9),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':5234565,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440004',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://item-shopping.c.yimg.jp/i/n/motona_pk-s5i-082',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440005':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 10),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440005',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://assets.st-note.com/production/uploads/images/71754588/picture_pc_0064967e0c06d4f3778a6d9e71619b79.png',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440006':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 11),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440006',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/MiyvUFHWvFJ2jFBKko7fHiuKJe0tlaGLkcHiWSuZ_162x.gif?v=1692522528',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440007':{
                        'unable2Ship' : true,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 12),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440007',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/w4ewdEVszVCctuE3E17rg1VYAECviF3XYP7iOxY2_ed2c5ee5-7b7b-4cb1-8610-6a50a480001c_400x.jpg?v=1691050198',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'わたしリーリエ ほしぐもちゃん',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440008':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 13),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':855,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440008',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/W4LWBWlBPkG4nddZ91G1dqgL2m0upLxTYab4B6EK_162x.jpg?v=1686653440',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440009':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 14),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':5895,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440009',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/ehT2A0I5h0VV9ASBCJ6mBuEtK3cJyYHag6Mwyg9P_400x.jpg?v=1690002064',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-44665544000a':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 15),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':58965,
                        'emissionUUID': '550e8400-e29b-41d4-a716-44665544000a',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/FYDd3Zx0zn4tKXxTYc7pE9dijtpoyxw1gEhlkP6n_162x.jpg?v=1686653473',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-44665544000b':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 16),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':5234565,
                        'emissionUUID': '550e8400-e29b-41d4-a716-44665544000b',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/mTC5iClL1Uq9MWMnyMxuX8e5k3BX4Ogt24XURgsB_400x.jpg?v=1687077726',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-44665544000c':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 17),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-44665544000c',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/7p7QcpSy9sgwoGE61YVoggMGzWoyyv1Lwl7434XP_400x.jpg?v=1678166909',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-44665544000d':{
                        'unable2Ship' : true,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 18),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-44665544000d',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/OHPoW7UzUNSvwUNAOqZ1yK6LnDCZqIM5OZWNWeZ2_400x.jpg?v=1689064550',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
            */
        },
        waiting4Shipping: {
            /*
                    '550e8400-e29b-41d4-a716-446655440000':{
                        'unable2Ship' : true,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440000',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://www.cardrush-pokemon.jp/data/cardrushpokemon/_/70726f647563742f32303139303732335f6131653963302e6a7067003136300000660023666666666666.jpg',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'わたしリーリエ ほしぐもちゃん',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440001':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 8),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':855,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440001',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://www.cardrush-pokemon.jp/data/cardrushpokemon/_/70726f647563742f736d3131623036382e6a7067003136300000660023666666666666.jpg',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440002':{
                        'unable2Ship' : true,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 9),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':5895,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440002',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img.altema.jp/pokemoncard/card/icon/5994.jpg',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440003':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 10),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':58965,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440003',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://makeshop-multi-images.akamaized.net/fullpokemon/itemimages/000000002551_GXMkeuy.jpg',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
            */
        },
        shippingCompleted: {
            /*
                    '550e8400-e29b-41d4-a716-446655440000':{
                        'unable2Ship' : true,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440000',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/177657547_th.png?cmsp_timestamp=20231015191221',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'わたしリーリエ ほしぐもちゃん',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440001':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2021, 1, 15),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':855,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440001',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/158909623_th.jpg?cmsp_timestamp=20210413164116',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440002':{
                        'unable2Ship' : true,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 8),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':5895,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440002',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/175707360_th.jpg?cmsp_timestamp=20230710153841',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440003':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 4, 2),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':58965,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440003',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/175707329_th.jpg?cmsp_timestamp=20230710153653',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440004':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':5234565,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440004',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/158909624_th.jpg?cmsp_timestamp=20210413164117',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440005':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440005',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/158909554_th.jpg?cmsp_timestamp=20210413164057',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440006':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440006',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/158909625_th.jpg?cmsp_timestamp=20210413164118',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440007':{
                        'unable2Ship' : true,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440007',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/158909634_th.jpg?cmsp_timestamp=20210413164121',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'わたしリーリエ ほしぐもちゃん',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440008':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':855,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440008',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/160232149_th.jpg?cmsp_timestamp=20210531163440',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-446655440009':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':5895,
                        'emissionUUID': '550e8400-e29b-41d4-a716-446655440009',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/161729535_th.jpg?cmsp_timestamp=20210711190132',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-44665544000a':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':58965,
                        'emissionUUID': '550e8400-e29b-41d4-a716-44665544000a',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/158909742_th.jpg?cmsp_timestamp=20210413164212',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-44665544000b':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':5234565,
                        'emissionUUID': '550e8400-e29b-41d4-a716-44665544000b',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/158909744_th.jpg?cmsp_timestamp=20210413164212',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-44665544000c':{
                        'unable2Ship' : false,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-44665544000c',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/158909731_th.jpg?cmsp_timestamp=20210413164206',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
                    '550e8400-e29b-41d4-a716-44665544000d':{
                        'unable2Ship' : true,  //配送制限true=>制限あり
                        'isItemSelected':false,
                        'shippingRequestDeadline' : new Date(2022, 11, 5),
                        'prizeRank':1,  //賞の上からの順位
                        'pointExchange':55,
                        'emissionUUID': '550e8400-e29b-41d4-a716-44665544000d',
                        'itemUUID': 'p01',
                        'itemImagePath1':'https://img07.shop-pro.jp/PA01462/718/product/174279079_th.jpg?cmsp_timestamp=20230420145750',
                        'itemImagePath2':'画像２',
                        'itemImagePath3':'画像３',
                        'itemShippingFlag':1,
                        'categoryName':'ポケモン',
                        'itemName':'リーリエ',
                        'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                        'itemDescription2':'説明の2',
                        'itemAttribute1':'サポート',
                        'itemAttribute2':'SM4+',
                        'itemAttribute3':'119/114',
                        'itemAttribute4':'SR',
                        'itemAttribute5':'PSA10',
                        'itemAttribute6':'美品',
                        'itemAttribute7':'お買い得',
                        'itemAttribute8':'貴重品',
                    },
            */
        },
        myShippingAddress: {
            /*
                    '550e8400-e29b-41d4-a716-446655440000':{
                        'isItemSelected' : true,
                        'userShippingId' : '550e8400-e29b-41d4-a716-446655440000',
                        'userShippingPriorityFlag' : 0,
                        'userShippingName' : '山田　太郎大明神',
                        'userShippingZipcode' : '101-0025',
                        'userShippingAddress' : '東京都千代田区神田佐久間町1-13チョムチョム秋葉原6階',
                        'userShippingTel' : '03-1122-3344',
                    },
                    '550e8400-e29b-41d4-a716-446655440001':{
                        'isItemSelected' : false,
                        'userShippingId' : '550e8400-e29b-41d4-a716-446655440001',
                        'userShippingPriorityFlag' : 1,
                        'userShippingName' : '莊評州',
                        'userShippingZipcode' : '',
                        'userShippingAddress' : '新北市淡水區中正東路二段29-1號13樓',
                        'userShippingTel' : '03-1122-3344',
                    },
                    '550e8400-e29b-41d4-a716-446655440002':{
                        'isItemSelected' : false,
                        'userShippingId' : '550e8400-e29b-41d4-a716-446655440002',
                        'userShippingPriorityFlag' : 0,
                        'userShippingName' : '周星馳',
                        'userShippingZipcode' : '',
                        'userShippingAddress' : '852 香港 九龍石硤尾南山邨 南豐樓平台商場 204-205平台, 210-213號平台',
                        'userShippingTel' : '0411-84756450',
                    },
                    '550e8400-e29b-41d4-a716-446655440003':{
                        'isItemSelected' : false,
                        'userShippingId' : '550e8400-e29b-41d4-a716-446655440003',
                        'userShippingPriorityFlag' : 0,
                        'userShippingName' : 'MR. THỊNH',
                        'userShippingZipcode' : '',
                        'userShippingAddress' : '634 Đ. Phạm Văn Chí, Phường 8, Quận 6, Thành phố Hồ Chí Minh, Việt Nam',
                        'userShippingTel' : '+413-1122-3344',
                    },
                    '550e8400-e29b-41d4-a716-446655440004':{
                        'isItemSelected' : false,
                        'userShippingId' : '550e8400-e29b-41d4-a716-446655440004',
                        'userShippingPriorityFlag' : 0,
                        'userShippingName' : '사사키　준',
                        'userShippingZipcode' : '120-749',
                        'userShippingAddress' : '대한민국 서울특별시 서대문구 신촌동 134',
                        'userShippingTel' : '+80411-84756450',
                    },
            */
        },
        myGiftCards: {
            /*
                    '550e8400-e29b-41d4-a716-446655440000':{
                        'isItemSelected' : false,
                        'userGiftUUID' : '550e8400-e29b-41d4-a716-446655440000',
                        'userGiftgName' : '事前登録プレゼント',
                        'userGiftLimit' : new Date(2022, 11, 5),
                        'userGiftPoint' : 500,
                    },
                    '550e8400-e29b-41d4-a716-446655440001':{
                        'isItemSelected' : false,
                        'userGiftUUID' : '550e8400-e29b-41d4-a716-446655440001',
                        'userGiftgName' : 'LINE友達プレゼント',
                        'userGiftLimit' : new Date(2023, 0, 5),
                        'userGiftPoint' : 60000,
                    },
                    '550e8400-e29b-41d4-a716-446655440002':{
                        'isItemSelected' : false,
                        'userGiftUUID' : '550e8400-e29b-41d4-a716-446655440002',
                        'userGiftgName' : 'あなたの覚悟に💖',
                        'userGiftLimit' : new Date(2023, 8, 15),
                        'userGiftPoint' : 1500,
                    },
                    '550e8400-e29b-41d4-a716-446655440003':{
                        'isItemSelected' : false,
                        'userGiftUUID' : '550e8400-e29b-41d4-a716-446655440003',
                        'userGiftgName' : 'システム障害ごめんなさい',
                        'userGiftLimit' : new Date(2024, 1, 3),
                        'userGiftPoint' : 250000,
                    },
                    '550e8400-e29b-41d4-a716-446655440004':{
                        'isItemSelected' : false,
                        'userGiftUUID' : '550e8400-e29b-41d4-a716-446655440004',
                        'userGiftgName' : '管理者Aの気持ち',
                        'userGiftLimit' : new Date(2029, 1, 25),
                        'userGiftPoint' : 300,
                    },
            */
        },
        myChargeList: {
            // '550e8400-e29b-41d4-a717-446655440000':{
            //     'chargeSelected' : false,
            //     'userChargeUUID' : '550e8400-e29b-41d4-a717-446655440000',
            //     'userChargeName' : 'CARDEL.ONLINE000500',
            //     'userChargeLimit' : 0,
            //     'userChargePoint' : 500,
            //     'userChargePointPattern' : 1,
            //     'hasBankEpsilon' : false,  //銀行決済が可能かどうか
            //     'hasBankManual' : false,  //銀行決済が可能かどうか
            //     'hasBankStripe' : false,  //銀行決済が可能かどうか
            //     'hasCardEpsilon' : true,   //  カード決済
            //     'hasCardStripe' : true,   //  カード決済
            //     'hasPaypayEpsilon' : false,    //  ペイペイ
            //     'hasConvenienceStore' : false,  //コンビニ決済
            //     'hasEMoney' : false,    //  電子マネー　アップルGoogle
            // },
            // '550e8400-e29b-41d4-a717-446655440001':{
            //     'chargeSelected' : false,
            //     'userChargeUUID' : '550e8400-e29b-41d4-a717-446655440001',
            //     'userChargeName' : 'CARDEL.ONLINE001000',
            //     'userChargeLimit' : 0,
            //     'userChargePoint' : 1000,
            //     'userChargePointPattern' : 2,
            //     'hasBankEpsilon' : false,  //銀行決済が可能かどうか
            //     'hasBankManual' : false,  //銀行決済が可能かどうか
            //     'hasBankStripe' : false,  //銀行決済が可能かどうか
            //     'hasCardEpsilon' : true,   //  カード決済
            //     'hasCardStripe' : true,   //  カード決済
            //     'hasPaypayEpsilon' : false,    //  ペイペイ
            //     'hasConvenienceStore' : false,  //コンビニ決済
            //     'hasEMoney' : false,    //  電子マネー　アップルGoogle
            // },
            // '550e8400-e29b-41d4-a717-446655440002':{
            //     'chargeSelected' : false,
            //     'userChargeUUID' : '550e8400-e29b-41d4-a717-446655440002',
            //     'userChargeName' : 'CARDEL.ONLINE005000',
            //     'userChargeLimit' : 0,
            //     'userChargePoint' : 5000,
            //     'userChargePointPattern' : 3,
            //     'hasBankEpsilon' : false,  //銀行決済が可能かどうか
            //     'hasBankManual' : false,  //銀行決済が可能かどうか
            //     'hasBankStripe' : false,  //銀行決済が可能かどうか
            //     'hasCardEpsilon' : true,   //  カード決済
            //     'hasCardStripe' : true,   //  カード決済
            //     'hasPaypayEpsilon' : false,    //  ペイペイ
            //     'hasConvenienceStore' : false,  //コンビニ決済
            //     'hasEMoney' : false,    //  電子マネー　アップルGoogle
            // },
            // '550e8400-e29b-41d4-a717-446655440003':{
            //     'chargeSelected' : false,
            //     'userChargeUUID' : '550e8400-e29b-41d4-a717-446655440003',
            //     'userChargeName' : 'CARDEL.ONLINE010000',
            //     'userChargeLimit' : 0,
            //     'userChargePoint' : 10000,
            //     'userChargePointPattern' : 4,
            //     'hasBankEpsilon' : false,  //銀行決済が可能かどうか
            //     'hasBankManual' : false,  //銀行決済が可能かどうか
            //     'hasBankStripe' : false,  //銀行決済が可能かどうか
            //     'hasCardEpsilon' : true,   //  カード決済
            //     'hasCardStripe' : true,   //  カード決済
            //     'hasPaypayEpsilon' : false,    //  ペイペイ
            //     'hasConvenienceStore' : false,  //コンビニ決済
            //     'hasEMoney' : false,    //  電子マネー　アップルGoogle
            // },
            // '550e8400-e29b-41d4-a717-446655440004':{
            //     'chargeSelected' : false,
            //     'userChargeUUID' : '550e8400-e29b-41d4-a717-446655440004',
            //     'userChargeName' : 'CARDEL.ONLINE050000',
            //     'userChargeLimit' : 0,
            //     'userChargePoint' : 50000,
            //     'userChargePointPattern' : 5,
            //     'hasBankEpsilon' : false,  //銀行決済が可能かどうか
            //     'hasBankManual' : false,  //銀行決済が可能かどうか
            //     'hasBankStripe' : false,  //銀行決済が可能かどうか
            //     'hasCardEpsilon' : true,   //  カード決済
            //     'hasCardStripe' : true,   //  カード決済
            //     'hasPaypayEpsilon' : false,    //  ペイペイ
            //     'hasConvenienceStore' : false,  //コンビニ決済
            //     'hasEMoney' : false,    //  電子マネー　アップルGoogle
            // },
            // '550e8400-e29b-41d4-a717-446655440005':{
            //     'chargeSelected' : false,
            //     'userChargeUUID' : '550e8400-e29b-41d4-a717-446655440005',
            //     'userChargeName' : 'CARDEL.ONLINE100000',
            //     'userChargeLimit' : 0,
            //     'userChargePoint' : 100000,
            //     'userChargePointPattern' : 6,
            //     'hasBankEpsilon' : false,  //銀行決済が可能かどうか
            //     'hasBankManual' : false,  //銀行決済が可能かどうか
            //     'hasBankStripe' : false,  //銀行決済が可能かどうか
            //     'hasCardEpsilon' : true,   //  カード決済
            //     'hasCardStripe' : true,   //  カード決済
            //     'hasPaypayEpsilon' : false,    //  ペイペイ
            //     'hasConvenienceStore' : false,  //コンビニ決済
            //     'hasEMoney' : false,    //  電子マネー　アップルGoogle
            // },
            // '550e8400-e29b-41d4-a717-446655440006':{
            //     'chargeSelected' : false,
            //     'userChargeUUID' : '550e8400-e29b-41d4-a717-446655440006',
            //     'userChargeName' : 'CARDEL.ONLINE200000',
            //     'userChargeLimit' : 0,
            //     'userChargePoint' : 200000,
            //     'userChargePointPattern' : 7,
            //     'hasBankEpsilon' : false,  //銀行決済が可能かどうか
            //     'hasBankManual' : false,  //銀行決済が可能かどうか
            //     'hasBankStripe' : false,  //銀行決済が可能かどうか
            //     'hasCardEpsilon' : true,   //  カード決済
            //     'hasCardStripe' : true,   //  カード決済
            //     'hasPaypayEpsilon' : false,    //  ペイペイ
            //     'hasConvenienceStore' : false,  //コンビニ決済
            //     'hasEMoney' : false,    //  電子マネー　アップルGoogle
            // },
            // '550e8400-e29b-41d4-a717-446655440007':{
            //     'chargeSelected' : false,
            //     'userChargeUUID' : '550e8400-e29b-41d4-a717-446655440007',
            //     'userChargeName' : 'CARDEL.ONLINE500000',
            //     'userChargeLimit' : 0,
            //     'userChargePoint' : 500000,
            //     'userChargePointPattern' : 8,
            //     'hasBankEpsilon' : false,  //銀行決済が可能かどうか
            //     'hasBankManual' : false,  //銀行決済が可能かどうか
            //     'hasBankStripe' : false,  //銀行決済が可能かどうか
            //     'hasCardEpsilon' : true,   //  カード決済
            //     'hasCardStripe' : true,   //  カード決済
            //     'hasPaypayEpsilon' : false,    //  ペイペイ
            //     'hasConvenienceStore' : false,  //コンビニ決済
            //     'hasEMoney' : false,    //  電子マネー　アップルGoogle
            // },
        },
    },
    effects_UNSTABLE: [persistAtom]
})
