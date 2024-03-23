//  https://docs.google.com/spreadsheets/d/1hIOIAQ6EWzHLW5dGrDXYQfCg24ZXsDHVkGLw6DLSk18/edit#gid=1257072823&range=4:4

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

export const snsState = atom({
  key: 'snsState',
  default: {
    conf: {},
    'bn':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },

        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: 'Chokohachi পোস্ট করার জন্য আপনাকে ধন্যবাদ',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: 'ফাইটিং প্রেসিডেন্ট টিভি ~বাকুসাই চ্যানেল~ পোস্ট করার জন্য আপনাকে ধন্যবাদ',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: 'আপনার পোস্টের জন্য আপনাকে ধন্যবাদ, ওয়ান্ডারিং জিপ্পো।',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: 'Japonetman☺︎ পোস্ট করার জন্য আপনাকে ধন্যবাদ [পোকেকা]',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: 'পোকেকা ট্রেজার হান্টার পোস্ট করার জন্য আপনাকে ধন্যবাদ [PokeTrade]',
        },


        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: 'Anpoke ch পোস্ট করার জন্য আপনাকে ধন্যবাদ',
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'ডাইকি 🐌👑 [পোকেমন মাস্টার] পোস্ট করার জন্য আপনাকে ধন্যবাদ',
        },
        'info-06': {
          informationId: 'info-06',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2023/12/27',
          displayText: 'Kiyuunayouta পোস্ট করার জন্য আপনাকে ধন্যবাদ',
        },
          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'ফাইটিং প্রেসিডেন্ট টিভি ~বাকুসাই চ্যানেল~ পোস্ট করার জন্য আপনাকে ধন্যবাদ',
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Anpoke ch পোস্ট করার জন্য আপনাকে ধন্যবাদ',
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'দক্ষিণ তিমুর পোস্ট করার জন্য আপনাকে ধন্যবাদ',
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'শুকুরী পোস্ট করার জন্য আপনাকে ধন্যবাদ',
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'শিরাসুনো চ্যানেলে পোস্ট করার জন্য আপনাকে ধন্যবাদ🐟',
          },
      }
    },
    'de':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: 'Vielen Dank für den Beitrag von Chokohachi',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: 'Vielen Dank, dass Sie Fighting President TV ~Bakusai Channel~ gepostet haben',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: 'Vielen Dank für deinen Beitrag, Wandering Zippo',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: 'Japonetman☺︎Vielen Dank für den Beitrag [Pokeka]',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: 'Vielen Dank für die Veröffentlichung von Pokeka Treasure Hunter [PokeTrade]',
        },

        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: 'Vielen Dank für die Veröffentlichung von Anpoke ch',
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'Daiki 🐌👑 [Pokémon-Meister] Vielen Dank für den Beitrag',
        },
        'info-06': {
          informationId: 'info-06',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2023/12/27',
          displayText: 'Vielen Dank, dass Sie Kiyuunayouta gepostet haben',
        },

        'info-05': {
          informationId: 'info-05',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2023/12/22',
          displayText: 'Vielen Dank, dass Sie Fighting President TV ~Bakusai Channel~ gepostet haben',
        },
        'info-04': {
          informationId: 'info-04',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2023/12/22',
          displayText: 'Vielen Dank für die Veröffentlichung von Anpoke ch.',
        },
        'info-03': {
          informationId: 'info-03',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2023/12/22',
          displayText: 'Vielen Dank für Ihren Beitrag zu Südtimor',
        },
        'info-02': {
          informationId: 'info-02',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2023/12/22',
          displayText: 'Vielen Dank, dass Sie Shukuri gepostet haben',
        },
        'info-01': {
          informationId: 'info-01',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2023/12/22',
          displayText: 'Vielen Dank für Ihren Beitrag auf dem Shirasuno-Kanal🐟',
        },
      }
    },
    'en':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: 'Thank you for posting Chokohachi',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: 'Thank you for posting Fighting President TV ~Bakusai Channel~',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: 'Thank you for your post, Wandering Zippo',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: 'Japonetman☺︎Thank you for posting [Pokeka]',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: 'Thank you for posting Pokeka Treasure Hunter [PokeTrade]',
        },


        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: 'Thank you for posting Anpoke ch',
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'Daiki 🐌👑 [Pokémon Master] Thank you for posting',
        },
        'info-06': {
          informationId: 'info-06',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2023/12/27',
          displayText: 'Thank you for posting Kiyuunayouta.',
        },

          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Thank you for posting Fighting President TV ~Bakusai Channel~',
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Thank you for posting Anpoke ch',
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Thank you for posting South Timor',
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Thank you for posting Shukuri',
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Thank you for posting on Shirasuno Channel🐟',
          },
      }
    },
    'es':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: 'Gracias por publicar Chokohachi',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: 'Gracias por publicar Fighting President TV ~Bakusai Channel~',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: 'Gracias por tu publicación, Zippo errante',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: 'Japonetman☺︎Gracias por publicar [Pokeka]',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: 'Gracias por publicar Pokeka Treasure Hunter [PokeTrade]',
        },

        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: 'Gracias por publicar Anpoke cap',
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'Gracias por publicar Kiyuunayouta',
        },
        'info-06': {
          informationId: 'info-06',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'Daiki 🐌👑 [Maestro Pokémon] Gracias por publicar',
        },


          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Gracias por publicar Fighting President TV ~Bakusai Channel~',
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Gracias por publicar Anpoke cap',
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Gracias por publicar Timor del Sur',
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Gracias por publicar Shukuri',
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Gracias por publicar en el canal Shirasuno🐟',
          },
      }
    },
    'fr':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: "Merci d'avoir posté Chokohachi",
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: "Merci d'avoir publié Fighting President TV ~Bakusai Channel~",
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: 'Merci pour votre message, Wandering Zippo',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: "Japonetman☺︎Merci d'avoir posté [Pokeka]",
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: "Merci d'avoir publié Pokeka Treasure Hunter [PokeTrade]",
        },

        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: "Merci d'avoir publié Anpoke ch",
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'Daiki 🐌👑 [Pokémon Master] Merci pour votre message',
        },
        'info-06': {
          informationId: 'info-06',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2023/12/27',
          displayText: "Merci d'avoir publié Kiyuunayouta",
        },

          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: "Merci d'avoir publié Fighting President TV ~Bakusai Channel~",
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: "Merci d'avoir publié Anpoke ch",
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: "Merci d'avoir posté le Timor du Sud",
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: "Merci d'avoir posté Shukuri",
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: "Merci d'avoir publié sur la chaîne Shirasuno🐟",
          },
      }
    },
    'id':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: 'Terima kasih telah memposting Chokohachi',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: 'Terima kasih telah memposting Fighting President TV ~Bakusai Channel~',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: 'Terima kasih atas postingan Anda, Mengembara Zippo',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: 'Japonetman☺︎Terima kasih telah memposting [Pokeka]',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: 'Terima kasih telah memposting Pokeka Treasure Hunter [PokeTrade]',
        },

        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: "Terima kasih telah memposting Anpoke ch",
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'Daiki 🐌👑 [Master Pokemon] Terima kasih telah memposting',
        },
        'info-06': {
            informationId: 'info-06',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/27',
            displayText: "Terima kasih telah memposting Kiyuunayouta",
          },

          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Terima kasih telah memposting Fighting President TV ~Bakusai Channel~',
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Terima kasih telah memposting Anpoke ch',
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Terima kasih telah mengirimkan Timor Selatan',
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Terima kasih telah memposting Shukuri',
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Terima kasih telah memposting di Saluran Shirasuno🐟',
          },
      }
    },
    'it':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: 'Grazie per aver postato Chokohachi',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: 'Grazie per aver pubblicato Fighting President TV ~Bakusai Channel~',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: 'Grazie per il tuo post, Wandering Zippo',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: 'Japonetman☺︎Grazie per aver postato [Pokeka]',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: 'Grazie per aver pubblicato Pokeka Treasure Hunter [PokeTrade]',
        },
        
        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: "Grazie per aver postato Anpoke cap",
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'Daiki 🐌👑 [Pokémon Master] Grazie per il post',
        },
        'info-06': {
            informationId: 'info-06',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/27',
            displayText: "Grazie per aver postato Kiyuunayouta",
          },

          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Grazie per aver pubblicato Fighting President TV ~Bakusai Channel~',
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Grazie per aver postato Anpoke cap',
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Grazie per aver postato Timor Sud',
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Grazie per aver pubblicato Shukuri',
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Grazie per aver pubblicato su Shirasuno Channel🐟',
          },
      }
    },
    'ja':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: 'ちょこはち様投稿ありがとうございます',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: '闘う社長TV　〜爆斎チャンネル〜様投稿ありがとうございます',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: 'さすらいのジッポ様投稿ありがとうございます',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: 'じゃぽねっとまん☺︎【ポケカ】様投稿ありがとうございます',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: 'ポケカトレジャーハンター【ポケトレ】様投稿ありがとうございます',
        },
        
        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: "杏ポケch様投稿ありがとうございます",
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/01/06',
          displayText: 'ダイキ様🐌👑【ポケモンマスター】様投稿ありがとうございます',
        },
        'info-06': {
            informationId: 'info-06',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/27',
            displayText: "キユウナヨウタ様投稿ありがとうございます",
          },

          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '闘う社長TV　〜爆斎チャンネル〜様投稿ありがとうございます',
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '杏ポケch様投稿ありがとうございます',
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '南ティモール様投稿ありがとうございます',
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'しゅーくり様投稿ありがとうございます',
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'しらすのちゃんねる🐟様投稿ありがとうございます',
          },
      }
    },
    'ko':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: '쵸코 하치 님 게시 감사합니다',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: '싸우는 사장 TV ~ 폭재 채널 ~님 게시 감사합니다',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: '사스라의 지포 님 게시 감사합니다',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: '쟈포네토만 ☺︎【포케카】님 투고 감사합니다',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: '포켓 카트 레저 헌터 【포켓 토레】님 게시해 주셔서 감사합니다',
        },
        
        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: "살구 포켓 ch님 게시해 주셔서 감사합니다",
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2023/12/22',
          displayText: '다이키님 🐌👑【포켓몬 마스터】님 투고 감사합니다',
        },
        'info-06': {
            informationId: 'info-06',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/27',
            displayText: "키유나 요우타 님 게시 감사합니다",
          },

          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '싸우는 사장 TV ~ 폭재 채널 ~님 게시 감사합니다',
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '살구 포켓 ch님 게시해 주셔서 감사합니다',
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '미나미 티모르님 게시 감사합니다',
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '슈 쿠리 님 게시 해 주셔서 감사합니다',
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Shirasu No-chan 🐟님의 게시에 감사드립니다',
          },
      }
    },
    'pt':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: 'Obrigado por postar Chokohachi',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: 'Obrigado por postar Fighting President TV ~Bakusai Channel~',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: 'Obrigado pela sua postagem, Wandering Zippo',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: 'Japonetman☺︎Obrigado por postar [Pokeka]',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: 'Obrigado por postar Pokeka Treasure Hunter [PokeTrade]',
        },
        
        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: "Obrigado por postar Anpoke ch",
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'Daiki 🐌👑 [Mestre Pokémon] Obrigado por postar',
        },
        'info-06': {
            informationId: 'info-06',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/27',
            displayText: "Obrigado por postar Kiyuunayouta",
          },

          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Obrigado por postar Fighting President TV ~Bakusai Channel~',
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Obrigado por postar Anpoke ch',
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Obrigado por postar Timor Sul',
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Obrigado por postar Shukuri',
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'Obrigado por postar no Canal Shirasuno🐟',
          },
      }
    },
    'th':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: 'ขอบคุณสำหรับการโพสต์ Chokohachi',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: 'ขอบคุณที่โพสต์ Fighting President TV ~Bakusai Channel~',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: 'ขอบคุณสำหรับการโพสต์ของคุณ Wandering Zippo',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: 'Japonetman☺︎ขอบคุณที่โพสต์ [Pokeka]',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: 'ขอบคุณสำหรับการโพสต์ Pokeka Treasure Hunter [PokeTrade]',
        },
        
        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: "ขอบคุณที่ลง Anpoke ch",
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'Daiki 🐌👑 [Pokémon Master] ขอบคุณสำหรับการโพสต์',
        },
        'info-06': {
            informationId: 'info-06',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/27',
            displayText: "ขอบคุณสำหรับการโพสต์ Kiyuunayouta",
          },

          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'ขอบคุณที่โพสต์ Fighting President TV ~Bakusai Channel~',
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'ขอบคุณที่ลง Anpoke ch',
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'ขอบคุณสำหรับการโพสต์ติมอร์ใต้',
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'ขอบคุณสำหรับการโพสต์ Shukuri',
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: 'ขอบคุณสำหรับการโพสต์บน Shirasuno Channel🐟',
          },
      }
    },
    'zh':{
      slider: {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
      },
      youtubeList : {
        '_tjD58e2sBI' : {
          title : '【閲覧注意】怪しいオンラインガチャを50万円使って検証して当たりがでなければガチで訴えます',
          videoId : '_tjD58e2sBI',
          type : 'movie',
        },
        'xcpD_5AV9lA' : {
          title : '【不正率0%？】40万円使って新しいポケカオリパの闇を暴いていく！！							',
          videoId : 'xcpD_5AV9lA',
          type : 'movie',
        },
        'IRwojnNZLnE' : {
          title : '【ポケカ】最高額のぶん回し！マリピカGETに600万使う男！							',
          videoId : 'IRwojnNZLnE',
          type : 'movie',
        },
        'T9hd7a8JpUo' : {
          title : '【最新オンラインオリパ】の闇を暴くために本気で10万円分用意してぶん回したら楽しすぎた！！							',
          videoId : 'T9hd7a8JpUo',
          type : 'movie',
        },
        'SfhVjaFOvtA' : {
          title : '【オリパの闇】怪しいオンラインガチャに10万使った結果…							',
          videoId : 'SfhVjaFOvtA',
          type : 'movie',
        },
        'r20J8SHWxe4' : {
          title : '【衝撃】CARDELオリパ（カーデルオリパ）で130万円の帽子リーリエ狙って10万円引いた結果...#ポケカ #ポケカ開封 #ポケモンカード							',
          videoId : 'r20J8SHWxe4',
          type : 'movie',
        },
        'BtKKMXKDJSY' : {
          title : '1/77でボックスが当たる！？当たり出るまで引く！！【カーデルオリパ】#71',
          videoId : 'BtKKMXKDJSY',
          type : 'movie',
        },
        'IjUmYET5_J0' : {
          title : '【ポケカ】新サービスのネットガチャCARDEL！トップ出すまで100万回す！S賞をまさかの還元！？',
          videoId : 'IjUmYET5_J0',
          type : 'movie',
        },
        '0xxDZpgvN_M' : {
          title : '10万円分ガチャ引いてPSA10ゲットだぜ！！【カーデルオリパ】#67',
          videoId : '0xxDZpgvN_M',
          type : 'movie',
        },
        'Tb_O_nCEdUQ' : {
          title : '【検証】新オープンしたオンラインガチャを10万円分引いたらどれくらい当たるか検証してみた。(ポケモンカード・ガチャ・オリパ・オンラインガチャ)',
          videoId : 'Tb_O_nCEdUQ',
          type : 'movie',
        },
        'k8ujqMnlNWI' : {
          title : '【ポケカ】リザードンオリパ10万円分開けていく！',
          videoId : 'k8ujqMnlNWI',
          type : 'shorts',
        },
        'mcDgp5E39aE' : {
          title : '【ポケカ】オリパで10万円使ったらナンジャモSARをGETできるのか！？　#ポケカ #オリパ開封 #PR',
          videoId : 'mcDgp5E39aE',
          type : 'shorts',
        },
        'H9fviahXHUc' : {
          title : 'ポケカのオリパを10万円分やった結果がこちらw',
          videoId : 'H9fviahXHUc',
          type : 'shorts',
        },
      },
      webList : {
        'web001' : {
          title : 'カーデルオリパの評判と口コミ！無料でポイントをもらう方法も解説【CARDELオリパ】',
          url : 'https://altema.jp/pokemoncard/cardeloripa',
          img : 'https://img.altema.jp/pokemoncard/uploads/2023/12/2023y12m21d_1139324682.jpg',
        },
      },
      infoList : {
        'info-13': {
          informationId: 'info-13',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/18',
          displayText: '感謝您發布長八',
        },
        'info-12': {
          informationId: 'info-12',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/17',
          displayText: '感謝您發佈格鬥總裁電視～爆彩頻道～',
        },
        'info-11': {
          informationId: 'info-11',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/05',
          displayText: '謝謝你的帖子，流浪的 Zippo',
        },
        'info-10': {
          informationId: 'info-10',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/04',
          displayText: 'Japonetman☺︎感謝您發文[Pokeka]',
        },
        'info-09': {
          informationId: 'info-09',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/02/02',
          displayText: '感謝您發布 Pokeka 寶藏獵人 [PokeTrade]',
        },
        
        'info-08': {
          informationId: 'info-08',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/21',
          displayText: "感謝您發布 Anpoke ch",
        },
        'info-07': {
          informationId: 'info-07',
          displayStart : '2023/12/1',
          displayEnd : '2030/1/1',
          displayDate: '2024/1/6',
          displayText: 'Daiki 🐌👑 [神奇寶貝大師] 謝謝您的發帖',
        },
        'info-06': {
            informationId: 'info-06',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/27',
            displayText: "感謝您發布 Kiyuunayouta",
          },

          'info-05': {
            informationId: 'info-05',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '感謝您發佈格鬥總裁電視～爆彩頻道～',
          },
          'info-04': {
            informationId: 'info-04',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '感謝您發布 Anpoke ch',
          },
          'info-03': {
            informationId: 'info-03',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '謝謝您發文南帝汶',
          },
          'info-02': {
            informationId: 'info-02',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '感謝您發布 Shukuri',
          },
          'info-01': {
            informationId: 'info-01',
            displayStart : '2023/12/1',
            displayEnd : '2030/1/1',
            displayDate: '2023/12/22',
            displayText: '謝謝您在 Shirasuno 頻道發文🐟',
          },
      }
    },


  },
  effects_UNSTABLE: [persistAtom]
})


