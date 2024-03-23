import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import {modalState} from "../../store/recoil/modalState";
import { userState } from "../../store/recoil/userState";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';
//  https://www.npmjs.com/package/intl-tel-input?activeTab=readme
//  https://patw0929.github.io/react-intl-tel-input/?selectedKind=Documentation&selectedStory=Props&full=0&addons=0&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs
//  https://www.npmjs.com/package/react-intl-tel-input
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const CreateShippingAddressFormV2 = ({buttonElement}) => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [formData, setFormData] = useState({ userShippingName: '', userShippingZipcode: '', userShippingAddress: '',userShippingTel: '',userShippingPriorityFlag:0 });
    const [errorMessage, setErrorMessage] = useState({ userShippingName: null, userShippingZipcode: null, userShippingAddress: null, userShippingTel: null });

    // console.log("[CreateShippingAddressFormV2]")
    useEffect(() => {
        console.log("fire useEffect show error");
        const { data } = modalStateValue;
        if (data) {
            console.log("fire useEffect show error",data);
            const { formData:formDataValue, errorMessages:errorMessageValue } = data;
            console.log("fire useEffect show error",formDataValue);
            console.log("fire useEffect show error",errorMessageValue);
            if(formDataValue) {
                setFormData(formDataValue);
            }
            if (errorMessageValue) {
                setErrorMessage(errorMessageValue);
            }
        }
    }, [modalStateValue.data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChangeCheckBox = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form className="gap-2" id="createShippingAddress" onSubmit={e => { e.preventDefault(); }}>
                <div id="" className={`${inputWrapClass} self-end`}>
                    <label className="text-sm font-medium required" data-text={intl.formatMessage({ id: 'required' })}>
                        {intl.formatMessage({ id: 'userShippingName' })}
                    </label>
                    <input 
                        name="userShippingName"
                        id="" className=""
                        onChange={handleInputChange}
                        value={formData.userShippingName}
                        autocomplete="name"
                        placeholder={intl.formatMessage({ id: 'userShippingName_placeholder' })}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessage.userShippingName && intl.formatMessage({ id: errorMessage.userShippingName })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-center`}>
                    <label className="text-sm font-medium required" data-text={intl.formatMessage({ id: 'required' })}>
                        {intl.formatMessage({ id: 'userShippingZipcode' })}
                    </label>
                    <input 
                        name="userShippingZipcode" 
                        id="" className="" 
                        onChange={handleInputChange} 
                        value={formData.userShippingZipcode}
                        autocomplete="shipping postal-code"
                        placeholder={intl.formatMessage({ id: 'userShippingZipcode_placeholder' })}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessage.userShippingZipcode && intl.formatMessage({ id: errorMessage.userShippingZipcode })}
                    </span>
                </div>
                {/* 旧来のフィールドは都道府県として採用する */}
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium required" data-text={intl.formatMessage({ id: 'required' })}>
                        {intl.formatMessage({ id: 'userShippingAddress' })}({intl.formatMessage({ id: 'address_level1' })})
                    </label>
                    <input 
                        name="userShippingAddress" 
                        id="userShippingAddress" 
                        className="" 
                        onChange={handleInputChange} 
                        value={formData.userShippingAddress}
                        autocomplete="shipping address-level1"
                        placeholder={intl.formatMessage({ id: 'Please_enter_your_prefecture' })}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessage.userShippingAddress && intl.formatMessage({ id: errorMessage.userShippingAddress })}
                    </span>
                </div>

                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium required" data-text={intl.formatMessage({ id: 'required' })}>
                        {intl.formatMessage({ id: 'userShippingAddress' })}({intl.formatMessage({ id: 'address_level2' })})
                    </label>
                    <input 
                        name="userShippingAddressLevel2" 
                        id="userShippingAddressLevel2" 
                        className="" 
                        onChange={handleInputChange} 
                        value={formData.userShippingAddressLevel2}
                        autocomplete="shipping address-level2"
                        placeholder={intl.formatMessage({ id: 'Please_enter_state_city_town_village' })}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessage.userShippingAddressLevel2 && intl.formatMessage({ id: errorMessage.userShippingAddressLevel2 })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium required" data-text={intl.formatMessage({ id: 'required' })}>
                        {intl.formatMessage({ id: 'userShippingAddress' })}({intl.formatMessage({ id: 'address_line1' })})
                    </label>
                    <input 
                        name="userShippingAddressLne1" 
                        id="userShippingAddressLne1" 
                        className="" 
                        onChange={handleInputChange} 
                        value={formData.userShippingAddressLne1}
                        autocomplete="shipping address-line1"
                        placeholder={intl.formatMessage({ id: 'Please_enter__town_name__street_address' })}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessage.userShippingAddressLne1 && intl.formatMessage({ id: errorMessage.userShippingAddressLne1 })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'userShippingAddress' })}({intl.formatMessage({ id: 'address_line2' })})
                    </label>
                    <input 
                        name="userShippingAddressLne2" 
                        id="userShippingAddressLne2" 
                        className="" 
                        onChange={handleInputChange} 
                        value={formData.userShippingAddressLne2}
                        autocomplete="shipping address-line1"
                        placeholder={intl.formatMessage({ id: 'Please_enter_the_building_name__building_name' })}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessage.userShippingAddressLne2 && intl.formatMessage({ id: errorMessage.userShippingAddressLne2 })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium required" data-text={intl.formatMessage({ id: 'required' })}>
                        {intl.formatMessage({ id: 'userShippingTel' })}
                    </label>
                    <IntlTelInput 
                        // placeholder={intl.formatMessage({ id: '_6_to_32_characters' })}
                        type="tel"
                        defaultCountry={UserStateObj.countryOfResidenceCode}
                        preferredCountries={[UserStateObj.countryOfResidenceCode,'JP','TH','TW','ID','KR','ES','PT','US','DE','FR','IT']}
                        fieldId="TelephoneNumber" 
                        name="userShippingTel" 
                        id="TelephoneNumber" 
                        containerClassName="intl-tel-input text-black"
                        inputClassName="form-control w-full"
                        className="w-full"
                        autoComplete={"on"}
                        value={formData.userShippingTel}
                        numberType={"FIXED_LINE"}
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
                    />

                    {/* 
                    <input 
                        name="userShippingTel" 
                        id="" className="" 
                        onChange={handleInputChange} 
                        value={formData.userShippingTel} 
                    /> 
                    */}
                    <span className="text-xs text-error-message">
                        {errorMessage.userShippingTel && intl.formatMessage({ id: errorMessage.userShippingTel })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'userDefault' })}
                    </label>
                    <input name="userShippingPriorityFlag" type="checkbox" id="" className="" defaultChecked={formData.userShippingPriorityFlag?true:false} onChange={handleInputChangeCheckBox} />
                </div>
                <div id="" className={`${inputWrapClass} self-end justify-self-start`}>
                    <p className="text-xs">
                        {/* {intl.formatMessage({ id: 'I_will_register_as_a_member_after_agreeing_to_the_terms_of_use_and_privacy_policy_of_this_service' })} */}
                    </p>
                </div>
            </form>
            {/* {buttonElement((e) => handleOnSubmit(e))} */}
        </div>
    )

}