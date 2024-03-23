import { useState } from "react";
import { useRecoilState } from "recoil";
import useCsrfToken from "./useCsrfToken";
import session from "../store/recoil/sessionState";
import { userState } from "../store/recoil/userState";
import { instance } from "../services/axios";
import * as queries from "../restapi/queries";
import { headersParam } from '../functions/commonFunctions';

export default function useFetchUserCollectionQuery() {
    const { getCsrfToken } = useCsrfToken();

    const [{ loading, error, state }, setValid] = useRecoilState(session)
    const [UserStateObj, setUserState] = useRecoilState(userState);

    const fetchUserCollections = async (skip = 0, take = 100) => {
        const ENDPOINT = process.env.REACT_APP_ENV !== "production" ? process.env.REACT_APP_CHECK_SESSION_LOCALHOST : process.env.REACT_APP_CHECK_SESSION_PRODUCTION;

        try{
/*
            const checkSessionRes = await fetch(ENDPOINT, {
                body: JSON.stringify({ csrf: getCsrfToken() }),
                method: 'POST',
                headers: headersParam(),
                credentials: 'include',
                mode: 'cors',
            })
    
            const {flag} = await checkSessionRes.json();
*/
            const flag = true;

            if(!flag){
                console.log('got checksession false value')
                setValid(prevState => ({
                    ...prevState,
                    loading: false,
                    state: true,
                    error: null,
                }))
            }

            const config = {
                method: queries.getMethod,
                url: queries.baseURL + queries.readUser + "?l=" + UserStateObj.language + "&skip="+ skip + "&take=" + take
            }
            const{status, data} = await instance.request(config);

            if(status == 200){
                const {myCollection = [], hasMore = false} = data || {};

                setUserState(prevState => {
                    let updatedState = Object.assign({}, prevState);

                    const prevRecordObjValues = Object.values(updatedState.myCollection); 
                    const incomingRecordObjValues = Object.values({... myCollection});
                    const mergedValues = [...prevRecordObjValues, ...incomingRecordObjValues];
                
                    updatedState = {...updatedState, myCollection: {...mergedValues}}
                    
                     return updatedState;
                })

                return {success: true, hasMore }
            }

            return {success: false, hasMore: true }
        }catch(err){
            console.log('Error occurred in catch block', err);

            setValid(prevState => ({
                ...prevState,
                loading: false,
                state: true,
                error: null,
            }))

            return {success: false, hasMore: true }
        }
    };


    return {
        fetchUserCollections,
    }
}