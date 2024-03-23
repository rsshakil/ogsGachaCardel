import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../store/recoil/modalState";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'

export const ContentPaymentFailure = () => {
    const intl = useIntl()
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const {mode} = modalStateValue;

    let spanTextId;

    if(mode === 'FAILED') spanTextId = 'Payment_has_been_failed'
    else if(mode === 'TIME_OUT') spanTextId = 'Payment_time_out'
    else spanTextId = 'invalid_mode';

    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <Headline
                type="h2"
                spanText={intl.formatMessage({ id: spanTextId })}
                spanClass="font-bold text-center text-base font-Prompt text-white flex flex-col"
                // headlineText={intl.formatMessage({ id: 'Enjoy_cardel' })}
                // headlineClass="font-bold text-left text-base  font-Prompt text-white flex flex-col"
            />
        </div>
    )
}

