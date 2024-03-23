import { useRecoilState } from "recoil";
import { userState } from "../store/recoil/userState";
import { instance } from "../services/axios";
import * as queries from "../restapi/queries";
import {modalState} from "../store/recoil/modalState";
import {useIntl} from "react-intl";
import {useEffect} from "react";

export default function useFetchUserPresentQuery() {
    const intl = useIntl();
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);

    const fetchUserPresents = async () => {
        try{
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'Loading',
                mode: "withClose",
                data: {}
            }))

            const config = {
                method: queries.getMethod,
                url: queries.baseURL + queries.userPresentRead
            }
            const{status, data} = await instance.request(config);

            if(status == 200){
                const {records = []} = data || {};
                setUserState(prevState => {
                    let updatedState = Object.assign({}, prevState);
                
                    updatedState = {...updatedState, myGiftCards: {...records}}
                    
                     return updatedState;
                })
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
        fetchUserPresents,
    ]
}