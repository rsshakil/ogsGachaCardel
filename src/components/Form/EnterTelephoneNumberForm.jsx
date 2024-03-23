//  UserStateObj.countryOfResidenceCodeが空だったら国選択が出るように改変する
//  認証済みの電話番号は30日間利用できないようにする
//  https://online-sms.org/ja
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
import { userState } from "../../store/recoil/userState";
//  https://www.npmjs.com/package/intl-tel-input?activeTab=readme
//  https://patw0929.github.io/react-intl-tel-input/?selectedKind=Documentation&selectedStory=Props&full=0&addons=0&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs
//  https://www.npmjs.com/package/react-intl-tel-input
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';
let countryCode = 'JP';

///////////////////

export const EnterTelephoneNumberForm = () => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);

    console.log('[EnterTelephoneNumberForm]UserStateObj', UserStateObj)

    // Get errorMessages from modalState recoil
    const {formData, errorMessages = {}} = modalStateValue.data;

    //  ユーザーの設定居住国をセット
    countryCode = UserStateObj.countryOfResidenceCode;
    ////////////////////////////
    //  ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
    //  ❗️❗️しばらくは強制的にJP❗️❗️
    countryCode = "JP";
    //  ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
    ////////////////////////////



    return (
        <div className="w-full grid grid-cols-1">
            <form className="gap-2" onSubmit={e => { e.preventDefault(); }}>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'Phone_number_Japan' })}
                    </label>
                    <IntlTelInput 
                            // placeholder={intl.formatMessage({ id: '_6_to_32_characters' })}
                            type="tel"
                            //////////////////////////////////////
                            //  居住地の番号しか使えないように運用要求あり
                            //  1/11時点ではjp(+81)だけにしてほしいとの期間限定要求あり
                            //  捨て番号で何回も特典を得られる為
                            allowDropdown={false}
                            defaultCountry={countryCode}
                            onlyCountries={[countryCode]}
                            //  居住地の番号しか使えないように運用要求あり
                            //////////////////////////////////////
                            preferredCountries={[countryCode]}
                            fieldId="TelephoneNumber" 
                            name="TelephoneNumber" 
                            id="TelephoneNumber" 
                            containerClassName="intl-tel-input text-black"
                            inputClassName="form-control w-full"
                            className="w-full"
                            autoComplete={"on"}
                            // separateDialCode={true}
                            // autoPlaceholder={"aggressive"}
                            // customPlaceholder={"11111111"}
                            // placeholder={{JP:"1111"}}
                            // format={true}
                            //  運用側の要件として電話番号はハイフン無しが良いとのこと
                            customPlaceholder={function(selectedCountryPlaceholder, selectedCountryData) {
                                console.log('[EnterTelephoneNumberForm]selectedCountryPlaceholder', selectedCountryPlaceholder)
                                return  selectedCountryPlaceholder.replaceAll("-", "");
                            }}
                            defaultValue={formData && formData.countryCode+formData.telephoneNumber}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessages?.telephoneNumber && intl.formatMessage({ id: errorMessages.telephoneNumber })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'Please_enter_a_phone_number_that_can_receive_SMS' })}
                    </p>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'Only_phone_numbers_in_your_area_of_residence_can_be_used_for_SMS_verification' })}
                    </p>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'SMS_authentication_cannot_be_performed_multiple_times_with_the_same_phone_number' })}
                    </p>
                    <p className="text-xs">
                        {intl.formatMessage({ id: 'The_verification_code_will_arrive_within_5_minutes' })}
                    </p>
                </div>
            </form>

        </div>
    )
}