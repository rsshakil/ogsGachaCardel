import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {useIntl} from 'react-intl'
import IntlTelInput from 'react-intl-tel-input';
import {modalState} from "../../store/recoil/modalState";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';
import { userState } from "../../store/recoil/userState";
///////////////////
let inputWrapClass = 'grid grid-cols-1 content-center';


///////////////////

export const EditShippingAddressForm = ({buttonElement}) => {
    const intl = useIntl();
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);

    const [formData, setFormData] = useState(modalStateValue.data.formData);
    const [errorMessage, setErrorMessage] = useState({ userShippingName: null, userShippingZipcode: null, userShippingAddress: null, userShippingTel: null });

    useEffect(() => {
        const { data } = modalStateValue;
        if (data) {
            const { formData, errorMessage } = data;
            if(formData) {
                let updatedFormData = {...formData};

                if(!updatedFormData.userShippingTelCCValue){
                    updatedFormData.userShippingTelCCValue = UserStateObj.countryOfResidenceCode ? UserStateObj.countryOfResidenceCode.toLowerCase() : 'jp'
                }

                setFormData(updatedFormData);
            }
            if (errorMessage) {
                setErrorMessage(errorMessage);
            }
        }
    }, [modalStateValue.data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOnChangeTelInput = (isValid, telNumber, selectedCountry, fullNumber, extension) => {
        const {dialCode, iso2} = selectedCountry || {};

        setFormData((prevState) => ({
            ...prevState, 
            userShippingTel: telNumber, 
            userShippingTelCountryCode: dialCode ? "+" + dialCode : '',
            userShippingTelCCValue: iso2
        }));
    }

    const handleCountryChange = (telNumber, selectedCountry) => {
        const {dialCode, iso2} = selectedCountry || {};
        
        setFormData((prevState) => ({
            ...prevState, 
            userShippingTelCountryCode: dialCode ? "+" + dialCode : '',
            userShippingTelCCValue: iso2
        }));
    }

    const handleInputChangeCheckBox = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    
    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
            <form className="gap-2" id="editShippingAddress" onSubmit={e => { e.preventDefault(); }}>
            <input name="userShippingId" type="hidden" id="" className="" onChange={handleInputChange} value={formData.userShippingId} />
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
                        name="userShippingAddress2" 
                        id="userShippingAddress2" 
                        className="" 
                        onChange={handleInputChange} 
                        value={formData.userShippingAddress2}
                        autocomplete="shipping address-level2"
                        placeholder={intl.formatMessage({ id: 'Please_enter_state_city_town_village' })}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessage.userShippingAddress2 && intl.formatMessage({ id: errorMessage.userShippingAddress2 })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium required" data-text={intl.formatMessage({ id: 'required' })}>
                        {intl.formatMessage({ id: 'userShippingAddress' })}({intl.formatMessage({ id: 'address_line1' })})
                    </label>
                    <input 
                        name="userShippingAddress3" 
                        id="userShippingAddress3" 
                        className="" 
                        onChange={handleInputChange} 
                        value={formData.userShippingAddress3}
                        autocomplete="shipping address-line1"
                        placeholder={intl.formatMessage({ id: 'Please_enter__town_name__street_address' })}
                    />
                    <span className="text-xs text-error-message">
                        {errorMessage.userShippingAddress3 && intl.formatMessage({ id: errorMessage.userShippingAddress3 })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'userShippingAddress' })}({intl.formatMessage({ id: 'address_line2' })})
                    </label>
                    <input 
                        name="userShippingAddress4" 
                        id="userShippingAddress4" 
                        className="" 
                        onChange={handleInputChange} 
                        value={formData.userShippingAddress4}
                        autocomplete="shipping address-line1"
                        placeholder={intl.formatMessage({ id: 'Please_enter_the_building_name__building_name' })}
                    />

                    <span className="text-xs text-error-message"></span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium required" data-text={intl.formatMessage({ id: 'required' })}>
                        {intl.formatMessage({ id: 'userShippingTel' })}
                    </label>
                    <IntlTelInput 
                        // placeholder={intl.formatMessage({ id: '_6_to_32_characters' })}
                        type="tel"
                        defaultCountry={formData.userShippingTelCCValue}
                        preferredCountries={['JP','TH','TW','ID','KR','ES','PT','US','DE','FR','IT']}
                        fieldId="userShippingTel" 
                        fieldName="userShippingTel"  
                        containerClassName="intl-tel-input text-black"
                        inputClassName="form-control w-full"
                        className="w-full"
                        autoComplete={"on"}
                        defaultValue={formData.userShippingTel}
                        // value={formData.userShippingTel}
                        onPhoneNumberChange={handleOnChangeTelInput}
                        onSelectFlag={handleCountryChange}
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

                    <input id="userShippingTelCountryCode" className="hidden"  type="text"
                        name="userShippingTelCountryCode" 
                        value={formData.userShippingTelCountryCode} 
                    />
                    <input id="userShippingTelCCValue" className="hidden"  type="text"
                        name="userShippingTelCCValue" 
                        value={formData.userShippingTelCCValue} 
                    />

                    <span className="text-xs text-error-message">
                        {errorMessage.userShippingTel && intl.formatMessage({ id: errorMessage.userShippingTel })}
                    </span>
                </div>
                <div id="" className={`${inputWrapClass} self-start`}>
                    <label className="text-sm font-medium">
                        {intl.formatMessage({ id: 'userDefault' })}
                    </label>
                    <input name="userShippingPriorityFlag" type="checkbox" defaultChecked={formData.userShippingPriorityFlag?true:false} id="" className="" onChange={handleInputChangeCheckBox} />
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