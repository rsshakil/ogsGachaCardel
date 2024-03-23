import { useEffect,useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import session from '../store/recoil/sessionState'
import { accessState } from '../store/recoil/accessState'
import useCsrfToken from './useCsrfToken'
import {pointState} from "../store/recoil/pointState";
import {userState} from "../store/recoil/userState";
import checkStartValue from '../functions/checkStartValue';
import { headersParam } from '../functions/commonFunctions';

const ENDPOINT =
    process.env.REACT_APP_ENV !== 'production'
        ? process.env.REACT_APP_CHECK_SESSION_LOCALHOST
        : process.env.REACT_APP_CHECK_SESSION_PRODUCTION


const useSession = (pathname) => {
    const navigate = useNavigate()
    const [{ loading, error, state }, setValid] = useRecoilState(session)
    const [recoilStateValue, setRecoilState] = useRecoilState(accessState);
    const { getCsrfToken } = useCsrfToken();
    const [pointStateValue, setPointState] = useRecoilState(pointState);
    const [userStateValue, setUserState] = useRecoilState(userState);
    const key = sessionStorage.getItem('key');

    useLayoutEffect(() => {
/*
        setValid(prevState => ({
            ...prevState,
            loading: false
        }))
*/
        setValid(prevState => ({
            ...prevState,
            loading: false,
            state: true,
            error: null,
        }))
/*
        console.log("ENDPOINT", ENDPOINT);
        // console.log();
        fetch(ENDPOINT, {
            body: JSON.stringify({ csrf: getCsrfToken(), key: key }),
            method: 'POST',
            headers: headersParam(),
            credentials: 'include',
            mode: 'cors',
        })
        .then((res) => res.json())
        .then(({ flag, userPointStart, userPointEnd }) => {
            flag
                ?
                setValid(prevState => ({
                    ...prevState,
                    loading: false,
                    state: true,
                    error: null,
                }))
                :
                setValid(prevState => ({
                    ...prevState,
                    loading: false,
                    state: true,
                    error: null,
                }))
                //////////////////
                //  ログインフラグの変更（recoil初期値false）
                setUserState((prevState) => ({
                    ...prevState,
                    isLogin: flag
                }))

            if (flag) {
                console.log("setPointState8 start = " + checkStartValue(userPointStart, userPointEnd, pointStateValue) + " end = " + userPointEnd);
                if (userPointStart && userPointStart >= 1) {
                    if (pointStateValue.end !== userPointEnd) {
                        setPointState((prevState) => ({
                            ...prevState,
                            start: checkStartValue(userPointStart, userPointEnd, pointStateValue),
                            // start: userPointStart
                        }))
                    }
                }
                if (userPointEnd && userPointEnd >= 1) {
                    setPointState((prevState) => ({
                        ...prevState,
                        end: userPointEnd
                    }))
                }
            }
            else {
                console.log("setPointState9 start = 0 end = 0");
                setPointState((prevState) => ({
                    ...prevState,
                    start: 0,
                    end: 0
                }))
            }
            // !flag && navigate('/')
        })
        .catch((err) => {
            console.log('Error => ,', err)
            setValid(prevState => ({
                ...prevState,
                loading: false,
                state: true,
                error: null,
            }))
            // navigate('/')
        })
*/
    }, [pathname])
    return { loading, error, state }
}

export default useSession
