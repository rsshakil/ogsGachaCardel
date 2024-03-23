export const baseURL = process.env.REACT_APP_API_URL;
// export const authURL = process.env.REACT_APP_AUTH_URL;
export const authURL = (process.env.REACT_APP_ENV !== "production") ? process.env.REACT_APP_AUTH_URL_LOCALHOST : process.env.REACT_APP_AUTH_URL_PRODUCTION;
export const paymentURL = (process.env.REACT_APP_ENV !== "production") ? process.env.REACT_APP_PAYMENT_URL_LOCALHOST : process.env.REACT_APP_PAYMENT_URL_PRODUCTION;
// *************** api
//method type
export const postMethod = "POST";
export const getMethod = "GET";
export const putMethod = "PUT";
export const deleteMethod = "DELETE";
// ユーザーメール認証
export const verifyMail = `/oripa/user/mail/verification/`;
// 商品一覧
export const readProduct = `/oripa/product/`
// ガチャ実行
export const executeProduct = `/oripa/product/`
// ユーザー登録
export const createUser = `/oripa/user/`;
// ユーザー情報
export const readUser = `/oripa/user/`;
// クーポン実行
export const executeCoupon = `/oripa/user/coupon/`;
//全てのカードをポイント化する
//選択したカードをポイント化する
export const userCollectionExecute = `/oripa/user/collection/`;
// create-user-address
export const createUserAddress = `/oripa/user/shipping`;
// create-user-address
export const updateUserAddress = `/oripa/user/shipping`;
// userCountryUpdate
export const userCountryUpdate = `/oripa/user/country`;
// userLanguageUpdate
export const userLanguageUpdate = `/oripa/user/language`;
// userCountryRead
export const userCountryRead = `/oripa/user/country`;
// userPresentRead
export const userPresentRead = `/oripa/user/present`;
// userPresentExecute
export const userPresentExecute = `/oripa/user/present`;
// userMailChange
export const userChangeMail = `/oripa/user/mail`;
// userSms
export const userSms = `/oripa/user/sms`;
// userSmsVerification
export const userSmsAuth = `/oripa/user/sms/auth`;
// userSmsVerification check + sms send for shipping
export const userSmsShipping = `/oripa/user/shipping/sms`;
// ユーザーメール変更認証
export const verifyChangeMail = `/oripa/user/change/mail/verification/`;
// userPasswordChange
export const userChangePassword = `/oripa/user/password`;
// userForgetPassword
export const userForgetPassword = `/oripa/user/password/forget`;
// userForgetPassword
export const forgetPasswordVerification = `/oripa/user/password/forget/verification/`;
// *************** auth
// ログイン
export const login = `/auth/login`;

//Point
export const readPoint = `/oripa/point`;


// *************** payment
// config
export const readConfig = `/config`;
// create-payment stripe
export const userSmsPayment = `/oripa/user/payment/sms`;
export const userSmsPaymentVerify = `/oripa/user/payment/sms/auth`;
export const createPayment = `/create-payment-intent`;
export const userBankPayment = `/oripa/user/payment/bank`;

//Common
export const createPaymentHistory = `/oripa/create-payment-history`;
export const pollPayment = `/oripa/poll/payments/`;

// create-payment epsilon
export const createPaymentEpsilon = `/oripa/create-payment-credit`;
export const createPaymentEpsilon2 = `https://epsilon.cardel.online/create-payment-credit`;
export const epsilonPaymentVerify = `https://epsilon.cardel.online/cardel-payment/payment-verify`;

//Create-payment paypay
export const createPaymentPayPay = `/oripa/create-payment-paypay`;

//Gacha History
export const readGachaHistory = `/oripa/product/history/`;
