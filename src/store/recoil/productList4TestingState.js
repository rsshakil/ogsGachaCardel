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


export const productList4TestingState = atom({
  key: 'productList4TestingState',
  ////////////////////////////////////
  //  keynoteのマトリクスに従い実装する
  // gachaViewFlag	ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
  // gachaSoldOutFlag	売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
  // gachaPostStartDate	表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる。無指定の時はガチャ開始日が返却される
  // gachaStartDate	ガチャ開始日。何も指定がない時にこの日時に表示開始される
  // gachaEndDate	ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
  //
  //	残数表示フラグ  
  //  gachaRemainingDisplayFlag
  
  default: [
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p11',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setSeconds(new Date().getSeconds() + 65),  //  65秒後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p12',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setSeconds(new Date().getSeconds() + 65),  //  65秒後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p13',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setSeconds(new Date().getSeconds() + 65),  //  65秒後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p14',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setSeconds(new Date().getSeconds() + 65),  //  65秒後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p15',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setSeconds(new Date().getSeconds() + 65),  //  65秒後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p16',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setSeconds(new Date().getSeconds() + 65),  //  65秒後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },


    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p17',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 2),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p18',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 2),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p19',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 2),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p20',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 3),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p21',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 3),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p22',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 3),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p23',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 30),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p24',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 60),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p25',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 90),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p26',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 180),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p27',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setHours(new Date().getHours() + 80), 
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p28',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setHours(new Date().getHours() + 99), 
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },   {
      /////////////////////////////////
      //  開始日前に表示されるガチャ
      gachaTranslateId: 'p29',
      gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
      gachaTranslateGachaId: '',
      gachaTranslateLocalizeId: '',
      gachaTranslateName: '発売前にガチャ表示',
      gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
      gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
      gachaTranslateJpFlag: '厳選オリパ03',
      gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
      takeAllGacha: true, //全部引くがあるかどうか
      gachaSinglePoint : 200, //１回単価
      multiplePrice: 600, //複数価格
      gachaTotalCount: 5000, //総数
      gachaRemainingCount : 5000, //残数
      multipleNumber : 30, //複数枚の数
      useSlider: true, //スライダーに表示するかどうか
      totalPrizes: 8, //このガチャの[おまけ][商品]の総数
      ceilingNumber: 320, //天井
      //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
      //  ↓↓[いつでも表示]↓↓
      gachaViewFlag	: true,
      // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
      //  ↓↓[ガチャ終了or売り切れても表示]↓↓
      gachaSoldOutFlag : true,
      //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
      //  ↓↓[現在時刻から表示開始]↓↓
      gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  3秒後に表示開始
      //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
      //  ↓↓[現在時刻+１日から販売開始]↓↓
      gachaStartDate : new Date().setHours(new Date().getHours() + 101), 
      // gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 6000),  //  1分後から開始
      // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
      //  ↓↓[現在時刻+30日後に販売終了]↓↓
      gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
      //	残数表示フラグ  
      gachaRemainingDisplayFlag : true,
    },
    // {
    //   /////////////////////////////////
    //   //  開始日前に表示されるガチャしかし在庫０で売り切れ
    //   gachaTranslateId: 'p01',
    //   gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
    //   gachaTranslateGachaId: '',
    //   gachaTranslateLocalizeId: '',
    //   gachaTranslateName: '売り切れてもガチャ表示',
    //   gachaTranslateDescription: 'S・A賞以上が10%オーバーで排出される特殊オリパ！ハズレはRR。今、己のアド力が試される。',
    //   gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1848/content_thumbnail.png',
    //   gachaTranslateJpFlag: '厳選オリパ01',
    //   gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/2062/top_thumbnail.png',
    //   takeAllGacha: true, //全部引くがあるかどうか
    //   gachaSinglePoint : 30000, //１回単価
    //   multiplePrice: 300000, //複数価格
    //   gachaTotalCount: 30000, //総数
    //   gachaRemainingCount : 0, //残数
    //   multipleNumber : 10, //複数枚の数
    //   useSlider: false, //スライダーに表示するかどうか
    //   totalPrizes: 8, //このガチャの[おまけ][商品]の総数
    //   ceilingNumber: 300, //天井
    //   //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
    //   //  ↓↓[いつでも表示]↓↓
    //   gachaViewFlag	: true,
    //   // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
    //   //  ↓↓[ガチャ終了or売り切れても表示]↓↓
    //   gachaSoldOutFlag : true,
    //   //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
    //   //  ↓↓[現在時刻から表示開始]↓↓
    //   gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  0秒後に表示開始
    //   //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
    //   //  ↓↓[現在時刻+１日から販売開始]↓↓
    //   gachaStartDate : new Date().setDate(new Date().getDate() + 2),  //  明後日から開始
    //   // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
    //   //  ↓↓[現在時刻+30日後に販売終了]↓↓
    //   gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
    //   //	残数表示フラグ  
    //   gachaRemainingDisplayFlag : true,
    // },
    // {
    //   /////////////////////////////////
    //   //  開始日前に表示されるガチャ
    //   gachaTranslateId: 'p02',
    //   gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
    //   gachaTranslateGachaId: '',
    //   gachaTranslateLocalizeId: '',
    //   gachaTranslateName: '売り切れたらガチャ非表示',
    //   gachaTranslateDescription: '強運を継続させろ！50%以上で3パック以上確定！ハズレはRR。爆アドBOX＆パックをぶち抜け！',
    //   gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1859/content_thumbnail.png',
    //   gachaTranslateJpFlag: '厳選オリパ02',
    //   gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1971/top_thumbnail.png',
    //   takeAllGacha: false, //全部引くがあるかどうか
    //   gachaSinglePoint : 100, //１回単価
    //   multiplePrice: 10000, //複数価格
    //   gachaTotalCount: 50000, //総数
    //   gachaRemainingCount : 2509, //残数
    //   multipleNumber : 100, //複数枚の数
    //   useSlider: true, //スライダーに表示するかどうか
    //   totalPrizes: 8, //このガチャの[おまけ][商品]の総数
    //   ceilingNumber: 310, //天井
    //   //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
    //   //  ↓↓[いつでも表示]↓↓
    //   gachaViewFlag	: true,
    //   // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
    //   //  ↓↓[ガチャ終了or売り切れても表示]↓↓
    //   gachaSoldOutFlag : true,
    //   //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
    //   //  ↓↓[現在時刻から表示開始]↓↓
    //   gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 5),  //  5秒後に表示開始
    //   //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
    //   //  ↓↓[現在時刻+１日から販売開始]↓↓
    //   gachaStartDate : new Date().setHours(new Date().getHours() + 3),  //  ３時間後から開始
    //   // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
    //   //  ↓↓[現在時刻+30日後に販売終了]↓↓
    //   gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
    //   //	残数表示フラグ  
    //   gachaRemainingDisplayFlag : false,
    // },
    // {
    //   /////////////////////////////////
    //   //  開始日前に表示されるガチャ
    //   gachaTranslateId: 'p03',
    //   gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
    //   gachaTranslateGachaId: '',
    //   gachaTranslateLocalizeId: '',
    //   gachaTranslateName: '発売前にガチャ表示',
    //   gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
    //   gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
    //   gachaTranslateJpFlag: '厳選オリパ03',
    //   gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1977/top_thumbnail.jpg',
    //   takeAllGacha: true, //全部引くがあるかどうか
    //   gachaSinglePoint : 200, //１回単価
    //   multiplePrice: 600, //複数価格
    //   gachaTotalCount: 5000, //総数
    //   gachaRemainingCount : 5000, //残数
    //   multipleNumber : 30, //複数枚の数
    //   useSlider: true, //スライダーに表示するかどうか
    //   totalPrizes: 8, //このガチャの[おまけ][商品]の総数
    //   ceilingNumber: 320, //天井
    //   //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
    //   //  ↓↓[いつでも表示]↓↓
    //   gachaViewFlag	: true,
    //   // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
    //   //  ↓↓[ガチャ終了or売り切れても表示]↓↓
    //   gachaSoldOutFlag : true,
    //   //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
    //   //  ↓↓[現在時刻から表示開始]↓↓
    //   gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 3),  //  3秒後に表示開始
    //   //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
    //   //  ↓↓[現在時刻+１日から販売開始]↓↓
    //   gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 1),  //  1分後から開始
    //   // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
    //   //  ↓↓[現在時刻+30日後に販売終了]↓↓
    //   gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
    //   //	残数表示フラグ  
    //   gachaRemainingDisplayFlag : true,
    // },
    // {
    //   /////////////////////////////////
    //   //  開始日前に表示されるガチャ
    //   gachaTranslateId: 'p04',
    //   gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
    //   gachaTranslateGachaId: '',
    //   gachaTranslateLocalizeId: '',
    //   gachaTranslateName: '発売前にガチャ表示',
    //   gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
    //   gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1858/content_thumbnail.jpg',
    //   gachaTranslateJpFlag: '厳選オリパ03',
    //   gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/2047/top_thumbnail.png',
    //   takeAllGacha: true, //全部引くがあるかどうか
    //   gachaSinglePoint : 200, //１回単価
    //   multiplePrice: 600, //複数価格
    //   gachaTotalCount: 5000, //総数
    //   gachaRemainingCount : 5000, //残数
    //   multipleNumber : 30, //複数枚の数
    //   useSlider: true, //スライダーに表示するかどうか
    //   totalPrizes: 8, //このガチャの[おまけ][商品]の総数
    //   ceilingNumber: 320, //天井
    //   //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
    //   //  ↓↓[いつでも表示]↓↓
    //   gachaViewFlag	: true,
    //   // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
    //   //  ↓↓[ガチャ終了or売り切れても表示]↓↓
    //   gachaSoldOutFlag : true,
    //   //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
    //   //  ↓↓[現在時刻から表示開始]↓↓
    //   gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  0秒後に表示開始
    //   //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
    //   //  ↓↓[現在時刻+１日から販売開始]↓↓
    //   gachaStartDate : new Date().setSeconds(new Date().getSeconds() + 10),  //  10秒後に表示開始
    //   // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
    //   //  ↓↓[現在時刻+30日後に販売終了]↓↓
    //   gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
    //   //	残数表示フラグ  
    //   gachaRemainingDisplayFlag : true,
    // },
    // {
    //   /////////////////////////////////
    //   //  開始日前に表示されるガチャ
    //   gachaTranslateId: 'p05',
    //   gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
    //   gachaTranslateGachaId: '',
    //   gachaTranslateLocalizeId: '',
    //   gachaTranslateName: '発売前にガチャ表示',
    //   gachaTranslateDescription: '20%以上でアドGET！100口毎に豪華キリ番賞付き♬ 大人気リーリエをぶち抜け！',
    //   gachaTranslateImageDetail: 'https://cardel.online/PreRegistration/slide.jpg',
    //   gachaTranslateJpFlag: '厳選オリパ03',
    //   gachaTranslateImageMain: 'https://cardel.online/PreRegistration/slide.jpg',
    //   takeAllGacha: true, //全部引くがあるかどうか
    //   gachaSinglePoint : 200, //１回単価
    //   multiplePrice: 600, //複数価格
    //   gachaTotalCount: 5000, //総数
    //   gachaRemainingCount : 5000, //残数
    //   multipleNumber : 30, //複数枚の数
    //   useSlider: true, //スライダーに表示するかどうか
    //   totalPrizes: 8, //このガチャの[おまけ][商品]の総数
    //   ceilingNumber: 320, //天井
    //   //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
    //   //  ↓↓[いつでも表示]↓↓
    //   gachaViewFlag	: true,
    //   // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
    //   //  ↓↓[ガチャ終了or売り切れても表示]↓↓
    //   gachaSoldOutFlag : true,
    //   //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
    //   //  ↓↓[現在時刻から表示開始]↓↓
    //   gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 12),  //  12秒後に表示開始
    //   //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
    //   //  ↓↓[現在時刻+１日から販売開始]↓↓
    //   gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 2),  //  2分後から開始
    //   // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
    //   //  ↓↓[現在時刻+30日後に販売終了]↓↓
    //   gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
    //   //	残数表示フラグ  
    //   gachaRemainingDisplayFlag : true,
    // },
    /////////////////////////////////
    //  開始日前+終了後+売り切れ後に表示されないガチャ
    // {
    //   gachaTranslateId: 'p06',
    //   gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
    //   gachaTranslateGachaId: '',
    //   gachaTranslateLocalizeId: '',
    //   gachaTranslateName: '発売前にはガチャ非表示',
    //   gachaTranslateDescription: '60%以上でアドGET！ハズレはRR。超高確率オリパです♬',
    //   gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1855/content_thumbnail.jpg',
    //   gachaTranslateJpFlag: '厳選オリパ04',
    //   gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1985/top_thumbnail.png',
    //   takeAllGacha: false, //全部引くがあるかどうか
    //   gachaSinglePoint : 2000, //１回単価
    //   multiplePrice: 20000, //複数価格
    //   gachaTotalCount: 100, //総数
    //   gachaRemainingCount : 98, //残数
    //   multipleNumber : 10, //複数枚の数
    //   useSlider: false, //スライダーに表示するかどうか
    //   totalPrizes: 8, //このガチャの[おまけ][商品]の総数
    //   ceilingNumber: 350, //天井
    //   //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
    //   //  ↓↓[いつでも非表示]↓↓
    //   gachaViewFlag	: false,
    //   // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
    //   //  ↓↓[ガチャ終了or売り切れで非表示]↓↓
    //   gachaSoldOutFlag : false,
    //   //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
    //   //  ↓↓[現在時刻から表示開始]↓↓
    //   gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 15),  //  15秒後に表示開始
    //   //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
    //   //  ↓↓[現在時刻+１日から販売開始]↓↓
    //   gachaStartDate : new Date().setMinutes(new Date().getMinutes() + 50),  //  50分後から開始
    //   // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
    //   //  ↓↓[現在時刻+30日後に販売終了]↓↓
    //   gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
    //   //	残数表示フラグ  
    //   gachaRemainingDisplayFlag : false,
    // },
    // {
    //   /////////////////////////////////
    //   //  ガチャ開始日時にいきなり表示されるガチャ
    //   gachaTranslateId: 'p07',
    //   gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
    //   gachaTranslateGachaId: '',
    //   gachaTranslateLocalizeId: '',
    //   gachaTranslateName: 'ガチャ終了日を超過して非表示',
    //   gachaTranslateDescription: '60%以上でアドGET！ハズレはRR。超高確率オリパです♬',
    //   gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1855/content_thumbnail.jpg',
    //   gachaTranslateJpFlag: '厳選オリパ04',
    //   gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/2035/top_thumbnail.png',
    //   takeAllGacha: false, //全部引くがあるかどうか
    //   gachaSinglePoint : 2000, //１回単価
    //   multiplePrice: 20000, //複数価格
    //   gachaTotalCount: 100, //総数
    //   gachaRemainingCount : 98, //残数
    //   multipleNumber : 10, //複数枚の数
    //   useSlider: false, //スライダーに表示するかどうか
    //   totalPrizes: 8, //このガチャの[おまけ][商品]の総数
    //   ceilingNumber: 350, //天井
    //   //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
    //   //  ↓↓[いつでも表示]↓↓
    //   gachaViewFlag	: true,
    //   // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
    //   //  ↓↓[ガチャ終了or売り切れても表示]↓↓
    //   gachaSoldOutFlag : true,
    //   //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
    //   //  ↓↓[現在時刻から表示開始]↓↓
    //   gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 30),  //  30秒後に表示開始
    //   //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
    //   //  ↓↓[現在時刻+１日から販売開始]↓↓
    //   gachaStartDate : Date.now(),  //  今から開始❗️これが優先されていきなり表示されるはず
    //   // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
    //   //  ↓↓[現在時刻+30日後に販売終了]↓↓
    //   gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
    //   //	残数表示フラグ  
    //   gachaRemainingDisplayFlag : true,
    // },
    // {
    //   /////////////////////////////////
    //   //  ガチャ開始日時にいきなり表示されるガチャ。在庫は0なので売り切れ
    //   gachaTranslateId: 'p08',
    //   gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
    //   gachaTranslateGachaId: '',
    //   gachaTranslateLocalizeId: '',
    //   gachaTranslateName: 'ガチャ終了日を超過して非表示',
    //   gachaTranslateDescription: '60%以上でアドGET！ハズレはRR。超高確率オリパです♬',
    //   gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1855/content_thumbnail.jpg',
    //   gachaTranslateJpFlag: '厳選オリパ04',
    //   gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/2071/top_thumbnail.png',
    //   takeAllGacha: false, //全部引くがあるかどうか
    //   gachaSinglePoint : 2000, //１回単価
    //   multiplePrice: 20000, //複数価格
    //   gachaTotalCount: 100, //総数
    //   gachaRemainingCount : 0, //残数
    //   multipleNumber : 10, //複数枚の数
    //   useSlider: false, //スライダーに表示するかどうか
    //   totalPrizes: 8, //このガチャの[おまけ][商品]の総数
    //   ceilingNumber: 350, //天井
    //   //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
    //   //  ↓↓[いつでも表示]↓↓
    //   gachaViewFlag	: true,
    //   // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
    //   //  ↓↓[ガチャ終了or売り切れても表示]↓↓
    //   gachaSoldOutFlag : true,
    //   //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
    //   //  ↓↓[現在時刻から表示開始]↓↓
    //   gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 15),  //  15秒後に表示開始
    //   //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
    //   //  ↓↓[現在時刻+１日から販売開始]↓↓
    //   gachaStartDate : Date.now(),  //  今から開始
    //   // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
    //   //  ↓↓[現在時刻+30日後に販売終了]↓↓
    //   gachaEndDate : new Date().setDate(new Date().getDate() + 30),  //  30日後に終了
    //   //	残数表示フラグ  
    //   gachaRemainingDisplayFlag : true,
    // },
    // {
    //   /////////////////////////////////
    //   //  ガチャ開始日時にいきなり表示されるガチャ。1分後に売り切れる
    //   gachaTranslateId: 'p09',
    //   gachaCategory : 'c001', //カテゴリ　ボーナスなどのブロック分け
    //   gachaTranslateGachaId: '',
    //   gachaTranslateLocalizeId: '',
    //   gachaTranslateName: 'ガチャ終了日を超過して非表示',
    //   gachaTranslateDescription: '60%以上でアドGET！ハズレはRR。超高確率オリパです♬',
    //   gachaTranslateImageDetail: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1855/content_thumbnail.jpg',
    //   gachaTranslateJpFlag: '厳選オリパ04',
    //   gachaTranslateImageMain: 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/images/original-pack/1985/top_thumbnail.png',
    //   takeAllGacha: false, //全部引くがあるかどうか
    //   gachaSinglePoint : 2000, //１回単価
    //   multiplePrice: 20000, //複数価格
    //   gachaTotalCount: 100, //総数
    //   gachaRemainingCount : 10, //残数
    //   multipleNumber : 10, //複数枚の数
    //   useSlider: false, //スライダーに表示するかどうか
    //   totalPrizes: 8, //このガチャの[おまけ][商品]の総数
    //   ceilingNumber: 350, //天井
    //   //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
    //   //  ↓↓[いつでも表示]↓↓
    //   gachaViewFlag	: true,
    //   // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
    //   //  ↓↓[ガチャ終了or売り切れても表示]↓↓
    //   gachaSoldOutFlag : true,
    //   //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
    //   //  ↓↓[現在時刻から表示開始]↓↓
    //   gachaPostStartDate : new Date().setSeconds(new Date().getSeconds() + 0),  //  0秒後に表示開始
    //   //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
    //   //  ↓↓[現在時刻+１日から販売開始]↓↓
    //   gachaStartDate : Date.now(),  //  今から開始
    //   // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
    //   //  ↓↓[現在時刻+30日後に販売終了]↓↓
    //   gachaEndDate : new Date().setMinutes(new Date().getMinutes() + 1),  //  1分後に終了
    //   //	残数表示フラグ  
    //   gachaRemainingDisplayFlag : true,
    // },
  ],

  effects_UNSTABLE: [persistAtom]

})
