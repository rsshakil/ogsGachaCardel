import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate,useParams,useLocation } from 'react-router-dom';
import { displayState } from "../../../../store/recoil/displayState";
import { modalState } from "../../../../store/recoil/modalState";
import '../../../../css/ModalButton.css';
import { KiraKiraButton } from "../../../atoms/buttons/KiraKiraButton";
import { ButtonWrapSignUp } from "../modalButtons/ButtonWrapSignUp";
import { ButtonWrapLogin } from "../modalButtons/ButtonWrapLogin";
import { ButtonWrapDoLogin } from "../modalButtons/ButtonWrapDoLogin";
import { ButtonWrapConfirm} from "../modalButtons/ButtonWrapConfirm";
import { ButtonWrapClose} from "../modalButtons/ButtonWrapClose";
import { ButtonWrapPaymentClose} from "../modalButtons/ButtonWrapPaymentClose";
import { ButtonWrapVerification } from "../modalButtons/ButtonWrapVerification";
import { ButtonWrapShowPrize } from "../modalButtons/ButtonWrapShowPrize";
import { ButtonWrapExchangeConfirm } from "../modalButtons/ButtonWrapExchangeConfirm";
import { ButtonWrapExchangeCompleted } from "../modalButtons/ButtonWrapExchangeCompleted";
import { ButtonWrapCollectionConfirm } from "../modalButtons/ButtonWrapCollectionConfirm";
import { ButtonWrapCollectionCompleted } from "../modalButtons/ButtonWrapCollectionCompleted";
import { ButtonWrapShowCollection } from "../modalButtons/ButtonWrapShowCollection";
import { ButtonWrapResidenceRegistration } from "../modalButtons/ButtonWrapResidenceRegistration";
import { ButtonWrapConfirmShippingAddress } from "../modalButtons/ButtonWrapConfirmShippingAddress";
import { ButtonWrapShippingConfirm } from "../modalButtons/ButtonWrapShippingConfirm";
import { ButtonWrapEditShippingAddress } from "../modalButtons/ButtonWrapEditShippingAddress";
import { ButtonWrapCreateShippingAddress } from "../modalButtons/ButtonWrapCreateShippingAddress";
import { ButtonWrapChangePassword} from "../modalButtons/ButtonWrapChangePassword";
import { ButtonWrapChangeEmailAddress } from "../modalButtons/ButtonWrapChangeEmailAddress";
import { ButtonWrapEnterCoupon } from "../modalButtons/ButtonWrapEnterCoupon";
import { ButtonWrapShowGiftBox } from "../modalButtons/ButtonWrapShowGiftBox";
import { ButtonWrapMetodOfPaymentConfirm } from "../modalButtons/ButtonWrapMetodOfPaymentConfirm";
import { ButtonWrapEnterEmail } from "../modalButtons/ButtonWrapEnterEmail";
import { ButtonWrapSelectMovie } from "../modalButtons/ButtonWrapSelectMovie";
import { userState } from "../../../../store/recoil/userState";
import { pointState } from "../../../../store/recoil/pointState";
import * as queries from "../../../../restapi/queries";
import { instance } from '../../../../services/axios.js';
import { ButtonWrapSelectGimmick } from "../modalButtons/ButtonWrapSelectGimmick";
import { ButtonWrapTestFlightStart } from "../modalButtons/ButtonWrapTestFlightStart";
import checkStartValue from '../../../../functions/checkStartValue';
import { ButtonWrapStripe } from "../modalButtons/ButtonWrapStripe";
import { ButtonWrapTimeoutStripe } from "../modalButtons/ButtonWrapTimeoutStripe";
import { ButtonWrapShippingCompleted} from "../modalButtons/ButtonWrapShippingCompleted";
import { ButtonWrapEnterCouponCompleted} from "../modalButtons/ButtonWrapEnterCouponCompleted";
import { ButtonWrapGetGiftCompleted} from "../modalButtons/ButtonWrapGetGiftCompleted";
import { ButtonWrapForgetPassword } from "../modalButtons/ButtonWrapForgetPassword";
import { productListState } from "../../../../store/recoil/productListState";
import { ButtonWrapReload } from "../modalButtons/ButtonWrapReload";
import { ButtonWrapEnterTelephoneNumber } from "../modalButtons/ButtonWrapEnterTelephoneNumber";
import { ButtonWrapAuthenticationExecution } from "../modalButtons/ButtonWrapAuthenticationExecution";
import { ButtonWrapShippingApplicationIdentityVerification } from "../modalButtons/ButtonWrapShippingApplicationIdentityVerification";
import { ButtonWrapPaymentApplicationIdentityVerification } from "../modalButtons/ButtonWrapPaymentApplicationIdentityVerification";
import { ButtonWrapEnterCustomerInformation } from "../modalButtons/ButtonWrapEnterCustomerInformation";
import { ButtonWrapEnterEpsilonPurchaseForm } from "../modalButtons/ButtonWrapEnterEpsilonPurchaseForm";
import { ButtonWrapEnterEpsilonPurchaseForm2 } from "../modalButtons/ButtonWrapEnterEpsilonPurchaseForm2";
import { ButtonWrapSmsNotAuthenticated } from "../modalButtons/ButtonWrapSmsNotAuthenticated";
import { ButtonWrapDoPayPay } from "../modalButtons/ButtonWrapDoPayPay";


export const ModalButton = () => {
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [productListArraySingle, setProductListSingle] = useRecoilState(productListState);
    const location = useLocation();

    const navigate = useNavigate();
    //  テスト用の基準時間セット
    let testDateTimeUTC;
    testDateTimeUTC = new Date(UserStateObj.currentDateTimeUTC)

    //  編集か、作成かの切り替え
    let mode;
    switch (modalStateValue.mode) {
        case 'edit':
            mode = '編集';
        break;
        case 'create':
            mode = '作成';
        break;
        default:
            //any
        break;
    }
    function closeModal(e) {
        // console.log("[BaseModal]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }
    function openConfirmModal(modalType){
        //pattern_1,2,3
        // console.log("sakil>>pattern",modalType);
        let gachaIdValue = location && location?.pathname && location.pathname.slice(location.pathname.lastIndexOf("/") , location.pathname.length);
        gachaIdValue = gachaIdValue.slice(1);
        // console.log("Sakil GachaID",gachaIdValue);
        // console.log("sakil>>productListArraySingle[id]",gachaIdValue);
        // console.log("sakil>>productListArraySingle[id]",productListArraySingle[gachaIdValue]);
        const {
            gachaId,
            gachaTranslateId,
            gachaTranslateGachaId,
            gachaTranslateLocalizeId,
            gachaTranslateName,
            gachaTranslateDescription,
            gachaTranslateImageDetail,
            gachaTranslateJpFlag,
            gachaTranslateImageMain,
            takeAllGacha,
            gachaSinglePoint,
            gachaConosecutivePoint,
            gachaTotalCount,
            gachaRemainingCount,
            gachaAllRestCount,
            //  連続ガチャの回数
            gachaConosecutiveCount,
            //  テスト用に初期値を設定
            //  ガチャ表示フラグ。在庫０or期間終了までは最優先、逆に在庫０or期間終了後は作用しない
            gachaViewFlag = true,
            // 売り切れ表示フラグ。在庫０or期間終了後に作用する。ガチャ表示フラグより優先
            gachaSoldOutFlag  = true,
            //  表示開始日。発売前に表示される日付、ガチャ表示フラグのほうが優先となる
            gachaPostStartDate = testDateTimeUTC.setSeconds(testDateTimeUTC.getSeconds() + 1),  //  秒後に表示開始　表示後はカウントダウン　表示前はリダイレクト
            //  ガチャ開始日。何も指定がない時にこの日時に表示開始される
            gachaStartDate = testDateTimeUTC.setSeconds(testDateTimeUTC.getSeconds() + 69),  //   秒後にパック解禁
            // ガチャ終了日。売り切れ状態にもなる。この日時以降ガチャはできない。表示に関しては他の設定に依存する
            gachaEndDate = testDateTimeUTC.setSeconds(testDateTimeUTC.getSeconds() + 180),  //    秒後にパック販売停止　停止後はリダイレクト
            //	残数表示フラグ  
            gachaRemainingDisplayFlag,
        // } = productListArraySingle[0];
        // } = productListArraySingle.find((row) => row.gachaId == id) 
        } = productListArraySingle[gachaIdValue];

        let modalDataObject;
        if(modalType==="pattern_1"){
            modalDataObject = {
                ...productListArraySingle, 
                ...{
                    select:"takeSingle",
                    price:gachaSinglePoint,
                    takeNumber:1,
                    pattern: 1
                }
            };
            
        }
        else if(modalType==="pattern_2"){
            modalDataObject = {
                ...productListArraySingle, 
                ...{
                    select:"takeMultiple",
                    price:gachaConosecutivePoint,
                    takeNumber:gachaConosecutiveCount,
                    pattern: 2
                }
            };
        }
        else if(modalType==="pattern_3"){
            modalDataObject = {
                ...productListArraySingle, 
                ...{
                    select:"takeAll",
                    price:gachaSinglePoint*gachaRemainingCount,
                    takeNumber:gachaRemainingCount,
                    pattern: 3
                }
            };
        }
        console.log("sakil Open confirm Modal");
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Confirm',
            // mode : openMode,
            data : modalDataObject,
        }));
    }
    //call api to updateUserPoint
    const updateGachaUserPoint = () =>{
        // console.log("@@@@@@@@@@ updateGachaUserPointStart",UserStateObj);
        // console.log("modalObject",modalStateValue);
        let prevModalInfo = modalStateValue;
        //loader starat
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'Loading',
            // mode: "edit",
            // data: {}
        }));
        (async () => {
            try {
                const config = {
                    method: "get",
                    url: queries.baseURL + queries.readUser + "?pp=" + pointStateValue.end
                }
                const result = await instance.request(config);
                // updateUserPointInRecoil
                // console.log("Sakil userResult 0",result);
                if (result) {
                    // console.log("Sakil userPoint beforeChange",pointStateValue);
                    const {userPointStart:startPoint, userPointEnd:endPoint} = result.data || 0;
                    // console.log("Sakil userPoint S",startPoint);
                    // console.log("Sakil userPoint E",endPoint);
                    // console.log("Sakil userPoint E",typeof endPoint);
                    const updateValue = pointStateValue.end - endPoint;
                    // console.log("setPointState7 start = " + checkStartValue(pointStateValue.end, endPoint, pointStateValue) + " end = " + endPoint);
                    setPointState((prevState) => ({
                        ...prevState,
                        start: checkStartValue(pointStateValue.end, endPoint, pointStateValue),
                        end: endPoint,
                        // start: pointStateValue.end,
                        update: updateValue
                    }));
                    // console.log("Sakil userPoint updatesd E",pointStateValue.end);
                    // console.log("Sakil userPoint updated E",typeof pointStateValue.end);
                    // console.log("Sakil userPoint AfterChange11",pointStateValue);
                }
                //There 4pattern in paymentComplete
                //1from gacha left patten1Take single
                //2from gacha right pattern2Take multi
                //3from gacha middle pattern3Take all 
                //4from shippingConfirm
                //implement ContinueModal
                console.log("sakil>>prevModalInfo",prevModalInfo);
                if(prevModalInfo.modalType==="paymentCompleted" && prevModalInfo.mode!=="purchase"){
                    //after paymentComplete go back to continue modal
                    if(prevModalInfo.mode==="shippingConfirmation"){
                        //displayShippingConfirmModal
                        setModalState((prevState) => ({
                            ...prevState,
                            BaseModalOpen: true,
                            modalType: 'ShippingConfirm',
                            mode: "",
                            // data: {}
                        }));
                    }else if(prevModalInfo.mode==="pattern_1" || prevModalInfo.mode==="pattern_2" || prevModalInfo.mode==="pattern_3"){
                        //displayDrawpointConfirmModal
                        // console.log("prevModalInfo.mode",prevModalInfo.mode);
                        openConfirmModal(prevModalInfo.mode);
                    }else{
                        closeModal();
                    }
                }else{
                    closeModal();
                }
                // console.log("Sakil userPoint AfterChange22",pointStateValue);
            } catch (err) {
                // console.log('app UserPoint up err---3', err);
                closeModal();
            }
            // console.log("Sakil userPoint AfterChange33",pointStateValue);
        })();
        // console.log("Sakil userPoint AfterChange44",pointStateValue);
    }
    return (
        <div id="modal-footer" className="flex flex-row items-center justify-between w-full py-4 relative">
        {
            {
                'Confirm': <ButtonWrapConfirm/>,
                'Login': <ButtonWrapLogin openConfirmModal={openConfirmModal}/>,
                'SignUp': <ButtonWrapSignUp />,
                //  modeが'withClose'の時はローデイングを中止できるようになる
                'Loading' : modalStateValue.mode === 'withClose'?<ButtonWrapClose/>:'',
                'ForgotPassword' : <ButtonWrapEnterEmail/>,
                'EmailSentSuccess': <ButtonWrapClose/>,
                'SignUpThanks': <ButtonWrapClose/>,//before ButtonWrapLogin
                'verificationEmail': <ButtonWrapDoLogin/>,
                'charge': <ButtonWrapClose/>,
                'MethodOfPayment' : <ButtonWrapMetodOfPaymentConfirm/>,
                'InsufficientPoints': <ButtonWrapClose/>,
                'error': <ButtonWrapReload/>,
                'gachaHistory': <ButtonWrapClose/>,
                'showPrize': <ButtonWrapShowPrize />,
                'exchangeConfirm': <ButtonWrapExchangeConfirm updateGachaUserPoint={updateGachaUserPoint}/>,
                'exchangeCompleted': <ButtonWrapExchangeCompleted updateGachaUserPoint={updateGachaUserPoint}/>,
                'collectionConfirm': <ButtonWrapCollectionConfirm updateGachaUserPoint={updateGachaUserPoint}/>,
                'collectionCompleted': <ButtonWrapCollectionCompleted updateGachaUserPoint={updateGachaUserPoint}/>,
                'showCollection': <ButtonWrapShowCollection/>,
                'showCollectionV2': <ButtonWrapShowCollection/>,
                'showWaiting4Shipping': <ButtonWrapClose/>,
                'showShippingCompleted': <ButtonWrapClose/>,
                'showShippingAddress' : <ButtonWrapClose/>,
                'editShippingAddress' : <ButtonWrapEditShippingAddress/>,
                'createShippingAddress' : <ButtonWrapCreateShippingAddress/>,
                'createShippingAddressV2' : <ButtonWrapCreateShippingAddress/>,
                ////////////////////////////////////////////////////////////
                //  2024-1-22　メールアドレスの自動変更一時退避
                // 'ChangeEmailAddress' : <ButtonWrapChangeEmailAddress/>,
                'ChangeEmailAddress' : <ButtonWrapReload/>,
                ////////////////////////////////////////////////////////////
                'ChangeEmailAddressCompleted' : <ButtonWrapClose/>,
                'ChangePassword' : <ButtonWrapChangePassword />,
                'ChangePasswordCompleted' : <ButtonWrapClose/>,
                'EnterNewPassword' : <ButtonWrapChangePassword />,
                'ForgetPassword' :  <ButtonWrapForgetPassword />,
                'showGiftBox' : <ButtonWrapShowGiftBox />,
                'ConfirmShippingAddress' : <ButtonWrapConfirmShippingAddress/>,
                'ShippingConfirm' : <ButtonWrapShippingConfirm/>,
                'CountryOfResidence' : <ButtonWrapClose/>,
                'shippingCompleted' : <ButtonWrapShippingCompleted updateGachaUserPoint={updateGachaUserPoint}/>,
                'CountryofResidenceRegistration' : <ButtonWrapResidenceRegistration openConfirmModal={openConfirmModal}/>,
                'EnterCoupon' : <ButtonWrapEnterCoupon />,
                'EnterCouponCompleted' : <ButtonWrapEnterCouponCompleted updateGachaUserPoint={updateGachaUserPoint}/>,
                'GetGiftCompleted' : <ButtonWrapGetGiftCompleted updateGachaUserPoint={updateGachaUserPoint}/>,
                'Stripe' : <ButtonWrapStripe/>,
                'ModalLayoutSample' : <ButtonWrapClose/>,
                'selectMovie' : <ButtonWrapSelectMovie />,
                'selectGimmick' : <ButtonWrapSelectGimmick />,
                'Ready2TestFlight' : <ButtonWrapTestFlightStart />,
                'paymentCompleted': <ButtonWrapPaymentClose updateGachaUserPoint={updateGachaUserPoint}/>,
                'TimeoutStripe' : <ButtonWrapTimeoutStripe/>,
                'Invitation' : <ButtonWrapClose/>,
                'VideoPlayFailure' : <ButtonWrapReload/>,
                'SmsAuth' : <ButtonWrapEnterTelephoneNumber />,
                'SendSmsCompleted': <ButtonWrapAuthenticationExecution />,
                'SMSAuthenticated' : <ButtonWrapClose/>,
                'ShippingApplicationIdentityVerification' : <ButtonWrapShippingApplicationIdentityVerification />,
                'tooMuchSessionCheck' : <ButtonWrapReload/>,
                'MultipleAccountCreationError' : <ButtonWrapReload/>,
                'MultipleEnterCouponCodeError' : <ButtonWrapReload/>,
                'BillingLock' : <ButtonWrapReload/>,
                'IPFail2BanError' : <ButtonWrapReload/>,
                'SmsNotAuthenticated' : <ButtonWrapSmsNotAuthenticated/>,
                'PaymentApplicationIdentityVerification' : <ButtonWrapPaymentApplicationIdentityVerification />,
                'bankTransferApplicationCompleted' : <ButtonWrapReload/>,
                'enterCustomerInformation' : <ButtonWrapEnterCustomerInformation/>,
                'isBlocking' : <ButtonWrapReload/>,
                'epsilonPurchaseForm' : <ButtonWrapEnterEpsilonPurchaseForm/>,
                'epsilonPurchaseForm2' : <ButtonWrapEnterEpsilonPurchaseForm2/>,
                'doPayPay' : <ButtonWrapDoPayPay/>,
                'paymentFailure': <ButtonWrapClose/>,
                'ipRestriction' : <ButtonWrapReload/>,
            }[modalStateValue.modalType]
        }
        </div>
    );
};


