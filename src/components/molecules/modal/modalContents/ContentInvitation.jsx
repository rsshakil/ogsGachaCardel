import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";

import { Headline } from "../../../atoms/text/Headline";
import '../../../../css/Loading.css';
import {QRCodeSVG} from 'qrcode.react';
import QRCode from 'qrcode.react';
import {useIntl} from 'react-intl'

export const ContentInvitation = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    function closeModal(e) {
        
        console.log("[BaseModal]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
 
        }))
    }
    const InvitationCode = UserStateObj?.userId??"";
    const InvitationUrl = process.env.REACT_APP_URL_PRODUCTION + '?invitation=' + InvitationCode;



    return (
        <div className="w-full flex flex-col justify-center items-center overflow-hidden">
            <>
                <Headline
                    type="h2"
                    spanText=''
                    spanClass="px-2 font-bold text-center text-base font-Prompt text-white flex flex-col"
                    headlineText={intl.formatMessage({ id: 'There_is_no_friend_referral_campaign_in_progress' })}
                    headlineClass=" text-left  font-Prompt text-white flex flex-col"
                />
                {/* 20240123　一時退避 */}
                {/* 再実施するときは以下を解放数する */}
                {/* <Headline
                    type="h2"
                    spanText={intl.formatMessage({ id: 'Invite_your_friends_and_get_great_benefits' })}
                    spanClass="px-2 font-bold text-center text-base font-Prompt text-white flex flex-col"
                    headlineText={intl.formatMessage({ id: 'Your_friend_will_become_a_member_of_Cardel_using_the_referral_code_and_benefits_will_be_delivered_to_each_others_gift_box_after_SMS_authentication_is_completed' })}
                    headlineClass=" text-left text-xs font-Prompt text-white flex flex-col"
                />
                <div className="invitation flex flex-col w-full justify-center "> 
                    <QRCode 
                        className="w-full max-w-md mx-auto"
                        value={InvitationUrl}
                        renderAs="canvas"
                        includeMargin={true}
                        size={256}
                    />
                    <p className="text-left text-xs font-Prompt text-white flex flex-col mt-2">{intl.formatMessage({ id: 'Introduction_URL_if_you_cannot_use_QR_code' })}</p>
                    <textarea id="invitationArea" rows="1" className="w-full text-xs whitespace-normal break-all" >
                        {InvitationUrl}
                    </textarea>
                    <p className="text-left text-xs font-Prompt text-white flex flex-col mt-2">{intl.formatMessage({ id: 'When_entering_the_invitation_code_directly_please_use_the_numbers_below' })}</p>
                    <textarea id="invitationArea" rows="1" className="w-full text-xs whitespace-normal break-all" >
                        {InvitationCode}
                    </textarea>
                </div> */}
            </>            
        </div>
)

}