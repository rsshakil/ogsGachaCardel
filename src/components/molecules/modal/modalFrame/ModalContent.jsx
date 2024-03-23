import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { displayState } from "../../../../store/recoil/displayState";
import { modalState } from "../../../../store/recoil/modalState";
import { LoginForm } from "../../../Form/LoginForm";
import { SignUpForm } from "../../../Form/SignUpForm";
import { ContentSignUpThanks } from "../modalContents/ContentSignUpThanks";
import { ContentConfirm } from "../modalContents/ContentConfirm";
import { ContentVerificationEmail } from "../modalContents/ContentVerificationEmail";
// import { ContentCharge } from "../modalContents/ContentCharge";
import { GachaLoading } from "../modalContents/GachaLoading";
import { Error } from "../modalContents/Error";
import { Loading } from "../modalContents/Loading";
import { OnGacha } from "../modalContents/OnGacha";
import { GachaHistory } from "../modalContents/GachaHistory";
import { Gacha } from "../modalContents/Gacha";
import { ContentExchangeConfirm } from "../modalContents/ContentExchangeConfirm";
import { ContentExchangeCompleted } from "../modalContents/ContentExchangeCompleted";
import { ContentShowPrize } from "../modalContents/ContentShowPrize";
import { ContentCollectionConfirm } from "../modalContents/ContentCollectionConfirm";
import { ContentShowCollection } from "../modalContents/ContentShowCollection";
import { ContentShowWaiting4Shipping } from "../modalContents/ContentShowWaiting4Shipping";
import { ContentShowShippingCompleted } from "../modalContents/ContentShowShippingCompleted";
import { ResidenceRegistrationForm } from "../../../Form/ResidenceRegistrationForm";
import { ContentCountryOfResidence } from "../modalContents/ContentCountryOfResidence";
import { ContentShowShippingAddress } from "../modalContents/ContentShowShippingAddress";
import { ContentShippingConfirm } from "../modalContents/ContentShippingConfirm";
import { ContentShippingCompleted } from "../modalContents/ContentShippingCompleted";
import { ContentConfirmShippingAddress } from "../modalContents/ContentConfirmShippingAddress";
import { CreateShippingAddressForm } from "../../../Form/CreateShippingAddressForm";
import { EditShippingAddressForm } from "../../../Form/EditShippingAddressForm";
import { ChangePasswordForm } from "../../../Form/ChangePasswordForm";
import { ChangeEmailAddressForm } from "../../../Form/ChangeEmailAddressForm";
import { EnterCouponForm } from "../../../Form/EnterCouponForm";
import { ContentShowGiftBox } from "../modalContents/ContentShowGiftBox";
import { ContentGetGiftCompleted } from "../modalContents/ContentGetGiftCompleted";
import { ContentChangePasswordCompleted } from "../modalContents/ContentChangePasswordCompleted";
import { ContentEnterCouponCompleted } from "../modalContents/ContentEnterCouponCompleted";
import { ContentShowChargeList } from "../modalContents/ContentShowChargeList";
import { ContentMetodOfPaymentConfirm } from "../modalContents/ContentMetodOfPaymentConfirm";
import { EnterEmailForm } from "../../../Form/EnterEmailForm";
import { ContentEmailSentSuccess } from "../modalContents/ContentEmailSentSuccess ";
import { EnterNewPasswordForm } from "../../../Form/EnterNewPasswordForm";
import { ModalLayoutSampleForm } from "../../../Form/ModalLayoutSampleForm";
import { ContentStripe } from "../modalContents/ContentStripe";
import { ContentSelectMovie } from "../modalContents/ContentSelectMovie";
import { ContentSelectGimmick } from "../modalContents/ContentSelectGimmick";
import { ContentReady2TestFlight } from "../modalContents/ContentReady2TestFlight";
import { ContentPaymentCompleted } from "../modalContents/ContentPaymentCompleted";
import { ContentPaymentRetry } from "../modalContents/ContentPaymentRetry";
import { ForgetPasswordForm } from "../../../Form/ForgetPasswordForm";
import { ContentInvitation } from "../modalContents/ContentInvitation";
import { ContentShowCollectionV2 } from "../modalContents/ContentShowCollectionV2";
import { ContentVideoPlayFailure } from "../modalContents/ContentVideoPlayFailure";
import { EnterTelephoneNumberForm } from "../../../Form/EnterTelephoneNumberForm";
import { EnterAuthenticationCode } from "../../../Form/EnterAuthenticationCode";
import { CreateShippingAddressFormV2 } from "../../../Form/CreateShippingAddressFormV2";
import { TooMuchSessionChecK } from "../modalContents/TooMuchSessionCheck";
import { ContentSMSAuthenticated } from "../modalContents/ContentSMSAuthenticated";
import { ContentMultipleAccountCreationError } from "../modalContents/ContentMultipleAccountCreationError";
import { MultipleEnterCouponCodeError } from "../modalContents/MultipleEnterCouponCodeError";
import { ContentBillingLock } from "../modalContents/ContentBillingLock";
import { ContentIPFail2BanError } from "../modalContents/ContentIPFail2BanError";
import { EnterAuthenticationCode4Shipping } from "../../../Form/EnterAuthenticationCode4Shipping";
import { ContentSmsNotAuthenticated } from "../modalContents/ContentSmsNotAuthenticated";
import { ContentBankTransferApplicationCompleted } from "../modalContents/ContentBankTransferApplicationCompleted";
import { EnterCustomerInformationForm } from "../../../Form/EnterCustomerInformationForm";
import { ContentAccountIsPending } from "../modalContents/ContentAccountIsPending";
import { EnterEpsilonPurchaseForm } from "../../../Form/EnterEpsilonPurchaseForm";
import { EnterEpsilonPurchaseForm2 } from "../../../Form/EnterEpsilonPurchaseForm2";
import { Check3dEpsilonForm } from "../../../Form/Check3dEpsilonForm";
import { ContentPayPay } from "../modalContents/ContentPayPay";
import { ContentPaymentFailure } from "../modalContents/ContentPaymentFailure";
import { ContentIpRestriction } from "../modalContents/ContentIpRestriction";


export const ModalContent = () => {
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const navigate = useNavigate();
    const {
        BaseModalOpen,
        modalType,
        mode,
    } = modalStateValue;
    const {
        // エラーになるやつは初期値を入れておく
        price = 0,
        gachaId,
        gachaTranslateId,
        gachaTranslateDescription,
        gachaTranslateGachaId,
        gachaTranslateLocalizeId,
        gachaTranslateName,
        gachaTranslateImageDetail,
        gachaTranslateJpFlag,
        gachaTranslateImageMain,
        takeAllGacha,
        gachaSinglePoint,
        gachaConosecutivePoint,
        gachaTotalCount,
        gachaRemainingCount,
        gachaConosecutiveCount,
        select,
        takeNumber = 0,
    } = modalStateValue['data'] || {};
    return (
        <>
            <div id="modal-content" className="
                grow
                flex
                overflow-x-auto
                overflow-y-auto
                ">
            {
                {
                    'Confirm' : <ContentConfirm />,
                    'Login' : <LoginForm />,
                    'SignUp' : <SignUpForm />,
                    'ForgotPassword' : <EnterEmailForm />,
                    'EmailSentSuccess' : <ContentEmailSentSuccess />,
                    'SignUpThanks' : <ContentSignUpThanks />,
                    'verificationEmail' : <ContentVerificationEmail />,
                    'charge' : <ContentShowChargeList/>,
                    'MethodOfPayment' : <ContentMetodOfPaymentConfirm />,
                    // 'InsufficientPoints' : <ContentCharge/>,
                    'gachaLoading' : <GachaLoading/>,
                    'Loading' : <Loading/>,
                    'error' : <Error/>,
                    'onGacha' : <OnGacha/>,
                    'gacha' : <Gacha/>,
                    'gachaHistory' : <GachaHistory/>,
                    'showPrize' : <ContentShowPrize/>,
                    'exchangeConfirm' : <ContentExchangeConfirm/>,
                    'exchangeCompleted' : <ContentExchangeCompleted/>,
                    'collectionConfirm' : <ContentCollectionConfirm/>,
                    'collectionCompleted' : <ContentExchangeCompleted/>,
                    'showCollection' : <ContentShowCollection/>,
                    'showCollectionV2': <ContentShowCollectionV2/>,
                    'showWaiting4Shipping' : <ContentShowWaiting4Shipping/>,
                    'showShippingCompleted' : <ContentShowShippingCompleted/>,
                    'showShippingAddress' : <ContentShowShippingAddress/>,
                    'editShippingAddress' : <EditShippingAddressForm/>,
                    'createShippingAddress' : <CreateShippingAddressForm />,
                    'createShippingAddressV2' : <CreateShippingAddressFormV2 />,
                    'ChangePassword' : <ChangePasswordForm/>,
                    'ChangePasswordCompleted' : <ContentChangePasswordCompleted />,
                    'EnterNewPassword' : <EnterNewPasswordForm/>,
                    'ForgetPassword' :<ForgetPasswordForm/>,
                    'ChangeEmailAddress' : <ChangeEmailAddressForm/>,
                    'ChangeEmailAddressCompleted' : <ContentSignUpThanks/>,
                    'showGiftBox' : <ContentShowGiftBox/>,
                    'ConfirmShippingAddress' : <ContentConfirmShippingAddress/>,
                    'ShippingConfirm' : <ContentShippingConfirm />,
                    'shippingCompleted' : <ContentShippingCompleted />,
                    'CountryOfResidence' : <ContentCountryOfResidence/>,
                    'CountryofResidenceRegistration' : <ResidenceRegistrationForm />,
                    'EnterCoupon' : <EnterCouponForm />,
                    'EnterCouponCompleted' : <ContentEnterCouponCompleted />,
                    'GetGiftCompleted' : <ContentGetGiftCompleted />,
                    'Stripe' : <ContentStripe />,
                    'ModalLayoutSample' : <ModalLayoutSampleForm/>,
                    'selectMovie' : <ContentSelectMovie/>,
                    'selectGimmick' : <ContentSelectGimmick/>,
                    'Ready2TestFlight' : <ContentReady2TestFlight/>,
                    'paymentCompleted': <ContentPaymentCompleted />,
                    'TimeoutStripe' : <ContentPaymentRetry />,
                    'Invitation' : <ContentInvitation/>,
                    'VideoPlayFailure' : <ContentVideoPlayFailure/>,
                    'SmsAuth' : <EnterTelephoneNumberForm />,
                    'SendSmsCompleted': <EnterAuthenticationCode />,
                    'ShippingApplicationIdentityVerification' : <EnterAuthenticationCode4Shipping />,
                    'SMSAuthenticated' : <ContentSMSAuthenticated/>,
                    'tooMuchSessionCheck' : <TooMuchSessionChecK/>,
                    'MultipleAccountCreationError' : <ContentMultipleAccountCreationError />,
                    'MultipleEnterCouponCodeError' : <MultipleEnterCouponCodeError />,
                    'BillingLock' : <ContentBillingLock />,
                    'IPFail2BanError' : <ContentIPFail2BanError />,
                    'SmsNotAuthenticated' : <ContentSmsNotAuthenticated/>,
                    'PaymentApplicationIdentityVerification' : <EnterAuthenticationCode4Shipping />,
                    'bankTransferApplicationCompleted' : <ContentBankTransferApplicationCompleted />,
                    'enterCustomerInformation' : <EnterCustomerInformationForm />,
                    'isBlocking' : <ContentAccountIsPending />,
                    'epsilonPurchaseForm' : <EnterEpsilonPurchaseForm/>,
                    'epsilon3dCheckForm' : <Check3dEpsilonForm/>,
                    'epsilonPurchaseForm2' : <EnterEpsilonPurchaseForm2/>,
                    'doPayPay' : <ContentPayPay />,
                    'paymentFailure' : <ContentPaymentFailure />,
                    'ipRestriction' : <ContentIpRestriction />,
                }[modalStateValue.modalType]
            }
            </div>
            {
                (modalStateValue.modalType !== "Login" && modalStateValue.modalType !== "SignUp" && modalStateValue.modalType !== "EnterCoupon")
            }
        </>
    );
};


