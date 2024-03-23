import React, { useRef, useState, useEffect, Suspense } from "react";
import { Headline } from "../../../atoms/text/Headline";
import {useIntl} from 'react-intl'

export const ContentVideoPlayFailure = () => {
    const intl = useIntl()

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Headline
                type="h3"
                spanText={intl.formatMessage({ id: 'Failed_to_play_video' })}
                spanClass="font-bold text-center text-base font-Prompt text-white flex flex-col"
                headlineText={intl.formatMessage({ id: 'This_winning_result_has_been_added_to_your_collection' })}
                headlineClass="font-bold text-left text-base  font-Prompt text-white flex flex-col pt-4"
            />
            <ul className="w-full mt-4 text-error-message list-disc">
                <li className="text-left text-xs ">{intl.formatMessage({ id: 'Please_play_in_a_place_with_good_communication_environment' })}</li>
                <li className="text-left text-xs ">{intl.formatMessage({ id: 'If_you_close_your_browser_and_access_it_again_you_will_be_less_likely_to_experience_playback_failures' })}</li>
            </ul>
        </div>
    )
}