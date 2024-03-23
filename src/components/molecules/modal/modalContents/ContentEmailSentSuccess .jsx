import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'


export const ContentEmailSentSuccess  = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
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


    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Headline
            type="h3"
            spanText={intl.formatMessage({ id: 'Instructions_to_reset_your_password_have_been_sent_to_your_email_address' })}
            spanClass="font-bold text-left text-base font-Prompt text-white flex flex-col"
            headlineText=''
            headlineClass="font-bold text-left text-base  font-Prompt text-white flex flex-col"
            />
            {/* <ul className="w-full mt-4 text-error-message list-disc">
                <span className="w-full text-center text-sm">
                    ※{intl.formatMessage({ id: 'If_you_do_not_receive_the_information_email' })}
                </span>
                <li className="text-left text-xs py-2">
                    {intl.formatMessage({ id: 'There_may_be_an_error_in_your_email_address__Please_register_again_with_the_correct_email_address' })}
                </li>
                <li className="text-left text-xs py-2">
                    {intl.formatMessage({ id: 'The_verification_email_may_arrive_in_your_spam_folder_Please_check_your_spam_folder' })}
                </li>
                <li className="text-left text-xs py-2">
                    {intl.formatMessage({id: 'Please_set_your_settings_so_that_you_can_receive_emails_from'}, {email: 'aaa@aaa.aa'} )}
                </li>
            </ul> */}
        </div>
    )
}