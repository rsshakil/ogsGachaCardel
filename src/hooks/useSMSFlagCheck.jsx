import {useIntl} from 'react-intl'
import { useRecoilState } from "recoil";
import { modalState } from "../store/recoil/modalState";
import * as queries from "../restapi/queries";
import { instance } from '../services/axios';
import {unixTimestampToDateFormat} from "../utils/commonFunctions";

export default function useSMSFlagCheck() {
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const intl = useIntl()

    const verifySMSFlag = async(forbiddenErrorMode = "payment") => {
        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                formData: {},
                errorMessages: {}
            }
        }))

        try {
            const config = {
                method: queries.postMethod,
                url: queries.baseURL + queries.userSmsPayment,
                data: {}
            }

            return await instance.request(config);

        }catch(err) {
            console.log('my error >>>', err);
            let statusCode = 400;
            if (err.response) {
                const { data = {}, status = 400 } = err.response || '';
                const { errorCode = '', ip="", timestamp=[] } = data || '';
                statusCode = errorCode ? errorCode : status;
                console.log("errorCode", errorCode);

                if (statusCode == 403) {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        mode: forbiddenErrorMode,
                        modalType: "SmsNotAuthenticated",
                    }))
                }
                else if (statusCode == 601) {//ipAddressError
                    // let attemptTimes = timestamp[0] && timestamp[0].length>0 && timestamp[0].map(attemptTime=>{
                    //     return `\t\t\t${unixTimestampToDateFormat(attemptTime.userCreatedAt,true,true)}`;
                    // });
                    // setModalState((prevState) => ({
                    //     ...prevState,
                    //     BaseModalOpen: true,
                    //     modalType: 'IPFail2BanError',
                    //     mode: "",
                    //     data: {
                    //         ...prevState.data,
                    //         formData: {},
                    //         IPAddress:ip,
                    //         datearray:attemptTimes

                    //     }
                    // }))
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'ipRestriction'
                    }))
                }
                else {
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        data: {
                            title: "",
                            body: intl.formatMessage({id: "A_system_error_has_occurred__Please_try_again"})
                        }
                    }))
                }
            }
        }
    }


    return {
        verifySMSFlag
    }
}