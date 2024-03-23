import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { displayState } from "../../../../store/recoil/displayState";
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'


export const ModalHead = ({}) => {
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const navigate = useNavigate();
    const intl = useIntl()


 
    let errorText = '';
    // console.log("[ModalHead]modalStateValue.data.title==>", modalStateValue.data.title);
    errorText = modalStateValue.data?.title ? modalStateValue.data.title : '';

    return (
        <div id="modal-head" className="flex items-center justify-between">
            <h2 id="modal-title" className="w-full text-xl font-bold leading-6 text-center py-4">
                {
                    {
                        'Confirm' : intl.formatMessage({ id: 'Confirmation_of_consumption_points' }),
                        'ForgotPassword' : intl.formatMessage({ id: 'Reset_password' }),
                        'EmailSentSuccess': intl.formatMessage({ id: 'Email_sent_success' }),
                        'Login' : intl.formatMessage({ id: 'login' }),
                        'SignUp' : intl.formatMessage({ id: 'sign_up' }),
                        'SignUpThanks' : intl.formatMessage({ id: 'Thank_you_for_signing_up' }),
                        'verificationEmail': intl.formatMessage({ id: 'Confirm_email_address' }),
                        'charge' : modalStateValue?.data && modalStateValue?.data.hasOwnProperty('isPurchaseAgain')?intl.formatMessage({ id: 'Purchase_points_again' }):modalStateValue.mode==="purchase"?intl.formatMessage({ id: 'Purchase_points' }):intl.formatMessage({ id: 'not_enough_points' }),
                        'MethodOfPayment' : intl.formatMessage({ id: 'Confirm_payment_method' }),
                        'InsufficientPoints' : intl.formatMessage({ id: 'insufficient_points' }),
                        'error' : intl.formatMessage({ id: 'error' },{ text: errorText }),
                        'gachaLoading' : '',
                        'gachaHistory' : intl.formatMessage({ id: 'game_history' }),
                        'showPrize' : intl.formatMessage({ id: 'Pack_opening_results' }),
                        'exchangeConfirm' : intl.formatMessage({ id: 'Confirmation_of_point_redemption' }),
                        'exchangeCompleted' : intl.formatMessage({ id: 'Point_redemption_completed' }),
                        'collectionConfirm' : intl.formatMessage({ id: 'Confirmation_of_collection' }),
                        'collectionCompleted' : intl.formatMessage({ id: 'Collection_completed' }),
                        'showCollection' : intl.formatMessage({ id: 'Collection_List' }),
                        'showCollectionV2': intl.formatMessage({ id: 'Collection_List' }),
                        'showWaiting4Shipping' : intl.formatMessage({ id: 'Waiting_for_shipping' }),
                        'showShippingCompleted' : intl.formatMessage({ id: 'Shipping_completed' }),
                        'showShippingAddress' : intl.formatMessage({ id: 'Shipping_Address' }),
                        'editShippingAddress' : intl.formatMessage({ id: 'Edit_Shipping_address' }),
                        'createShippingAddress' : intl.formatMessage({ id: 'Add_new_delivery_address' }),
                        'createShippingAddressV2' : intl.formatMessage({ id: 'Add_new_delivery_address' }),
                        'ChangeEmailAddress' : intl.formatMessage({ id: 'Change_email_address' }),
                        'ChangeEmailAddressCompleted' : intl.formatMessage({ id: 'Email_sent_success' }),
                        'ChangePassword' : intl.formatMessage({ id: 'Change_Password' }),
                        'ChangePasswordCompleted' : intl.formatMessage({ id: 'Password_change_completed' }),
                        'EnterNewPassword' : intl.formatMessage({ id: 'Set_new_password' }),
                        'ForgetPassword' : intl.formatMessage({ id: 'Set_new_password' }),
                        'showGiftBox' : intl.formatMessage({ id: 'Gift_Box' }),
                        'ConfirmShippingAddress' : intl.formatMessage({ id: 'Confirm_Shipping_Address' }),
                        'ShippingConfirm' : intl.formatMessage({ id: 'Shipping_application_confirmation' }),
                        'shippingCompleted' : intl.formatMessage({ id: 'Shipping_application_completed' }),
                        'CountryOfResidence' : intl.formatMessage({ id: 'Country_of_residence' }),
                        'CountryofResidenceRegistration' : intl.formatMessage({ id: 'Country_of_residence_registration' }),
                        'EnterCoupon' : intl.formatMessage({ id: 'enter_coupon' }),
                        'EnterCouponCompleted' : intl.formatMessage({ id: 'Coupon_used_successfully' }),
                        'GetGiftCompleted' : intl.formatMessage({ id: 'Successfully_received_the_gift' }),
                        'Stripe' : intl.formatMessage({ id: 'Payment_information_input' }),
                        'ModalLayoutSample' : 'Modal layout sample',
                        'selectMovie' : '動画選択',
                        'selectGimmick' : 'ギミック選択',
                        'Ready2TestFlight' : '再生内容確認',
                        'paymentCompleted': intl.formatMessage({ id: 'Point_purchase_completed' }),
                        'TimeoutStripe' : intl.formatMessage({ id: 'error' }),
                        'Invitation' : intl.formatMessage({ id: 'INVITE_CODE' }),
                        'VideoPlayFailure' : intl.formatMessage({ id: 'Video_playback_failure' }),
                        'SmsAuth' : intl.formatMessage({ id: 'SMS_authentication' }),
                        'SendSmsCompleted': intl.formatMessage({ id: 'SMS_sent_completed' }),
                        'ShippingApplicationIdentityVerification' : intl.formatMessage({ id: 'Shipping_application_identity_verification' }),
                        'SMSAuthenticated' : intl.formatMessage({ id: 'SMS_authentication' }),
                        'tooMuchSessionCheck' : 'セッション猛チェック',
                        'MultipleAccountCreationError' : intl.formatMessage({ id: 'MultipleAccountCreationError' }),
                        'MultipleEnterCouponCodeError' : intl.formatMessage({ id: 'MultipleEnterCouponCodeError' }),
                        'BillingLock' : intl.formatMessage({ id: 'BillingLock' }),
                        'IPFail2BanError' : intl.formatMessage({ id: 'MultipleAccountCreationError' }),
                        'SmsNotAuthenticated' : intl.formatMessage({ id: 'SMS_not_authenticated' }),
                        'PaymentApplicationIdentityVerification' : intl.formatMessage({ id: 'Verification_of_identity_at_time_of_payment' }),
                        'enterCustomerInformation' : intl.formatMessage({ id: 'Enter_customer_information' }),
                        'isBlocking' : intl.formatMessage({ id: 'Account_is_pending' }),
                        'epsilonPurchaseForm' : intl.formatMessage({ id: 'Payment_information_input' }),
                        'epsilonPurchaseForm2' : intl.formatMessage({ id: 'Payment_information_input' }),
                        'doPayPay' : intl.formatMessage({ id: 'PayPay' }),
                        'paymentFailure' : intl.formatMessage({ id: 'Point_purchase_failure_or_timeout' }),
                        'ipRestriction' : intl.formatMessage({ id: 'ipRestriction' }),

                    }[modalStateValue.modalType]
                }
                </h2>
        </div>
    );
};


