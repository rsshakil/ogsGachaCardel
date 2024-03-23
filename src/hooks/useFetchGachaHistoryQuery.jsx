import { useRecoilState } from "recoil";
import session from "../store/recoil/sessionState";
import { userState } from "../store/recoil/userState";
import { instance } from "../services/axios";
import * as queries from "../restapi/queries";
import { modalState } from "../store/recoil/modalState";
import { useIntl } from "react-intl";

export default function useFetchGachaHistoryQuery() {
    const intl = useIntl();

    const [{ loading, error, state }, setValid] = useRecoilState(session)
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const fetchGachaHistory = async (gachaId, pageNumber = 1) => {
        try{
            //  API通信のためにくるくるを開始
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'Loading',
                mode: "withClose",
                data: {gachaId, currentPageNo: pageNumber}
            }))

            const config = {
                method: queries.getMethod,
                url: queries.baseURL + queries.readGachaHistory + gachaId + "?l=" + UserStateObj.language + "&pageNumber="+ pageNumber
            }
            const{status, data} = await instance.request(config);

            console.log('my dataaaaa>>>>', data)

            if(status == 200){
                const {records = [], hasNextPage, hasPrevPage} = data || {};

                setModalState((prevState) => ({
                    ...prevState,
                    // BaseModalOpen: true,
                    modalType: 'gachaHistory',
                    // mode : openMode,
                    data : {gachaId, records, hasNextPage, hasPrevPage, currentPageNo: pageNumber},
                }))
            }
        }catch(err){
            console.log('Error occurred in catch block', err);

            let mType ="error";
            let mData = {
                title: "",
                body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })
            };

            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: mType,
                // mode: "",
                data: mData
            }))
        }
    };


    return [
        fetchGachaHistory,
    ]
}