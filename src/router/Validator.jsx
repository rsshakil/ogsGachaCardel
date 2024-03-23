import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../components/atoms/buttons/LoadingButton'
import useSession from '../hooks/useSession'
import { modalState } from '../store/recoil/modalState'
import { useRecoilState } from "recoil";
import * as queries from "../restapi/queries";
import { instance } from '../services/axios'
import {useIntl, IntlProvider} from 'react-intl'

const Validator = ({ children }) => {
    const intl = useIntl();
    const location = useLocation()
    const { loading } = useSession(location.pathname)
    const [modalStateValue, setModalState] = useRecoilState(modalState);


    useEffect(() => {
        //Hasanul | Epsilon
        const searchParams = new URLSearchParams(location.search);
        const trxID = searchParams.get('TrxID');
        const result = searchParams.get('result');
        const point = searchParams.get('point');
        const errorCode = searchParams.get('errCode');
        const paymentHistoryId = searchParams.get('phi');

        console.log('incoming > result: ', result)
        console.log('incoming > trxID: ', trxID)

        //Hasanul | Paypay
        const modalType = searchParams.get('modalType');
       
    
        //If transition from epsilon payment gateway
        if (result !== null && result >= 0) {
            //if success payment then reset modal state value
            if (result == 1 && trxID) {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'paymentCompleted',
                    data: { point: point }
                }))
            }
            else {
                let cardInfoTemp = localStorage.getItem('cc');
                cardInfoTemp = cardInfoTemp ? JSON.parse(atob(cardInfoTemp)) : '';

                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'epsilonPurchaseForm',
                    mode: 'purchase',
                    data: {
                        ...cardInfoTemp, 
                        paymentHistoryId: paymentHistoryId,
                        resultError: errorCode
                    }
                }))
            }

            localStorage.removeItem('cc');  //Remove credit card info from localstorage

            clearQueryparamsFromUrl();   
        }
        //For PayPay
        else if(modalType == 'paypay' && paymentHistoryId > 0) {
             clearQueryparamsFromUrl();  

            const pollResource = async() => {
                setModalState((prevState) => ({
                    ...prevState,
                    BaseModalOpen: true,
                    modalType: 'Loading',
                }));


                try{
                    const config = {
                        method: queries.getMethod,
                        url: queries.baseURL + queries.pollPayment + paymentHistoryId,
                    }

                    console.time('myCodeExecution');

                    for(let i = 1; i <= 5; i++) {
                        const {status, data} = await instance.request(config);

                        console.log('poll count: ', i);
                        console.log('my statys >>>', status)
                        console.log('my statys >>> data', data)

                        if(status == 200) {
                            const {userPaymentHistoryStatus, userPaymentHistoryPaymentPoint: amount} = data.records || {};

                            //Payment success
                            if(userPaymentHistoryStatus == 1) {
                                console.timeEnd('myCodeExecution');

                                setModalState((prevState) => ({
                                    ...prevState,
                                    BaseModalOpen: true,
                                    modalType: 'paymentCompleted',
                                    data: {
                                       point: amount
                                    }
                                }))

                                return;
                            }
                            else if(![12, 1].includes(userPaymentHistoryStatus)) { //12=initial status, 1=success status
                                //Hnadle failure case
                                setModalState((prevState) => ({
                                    ...prevState,
                                    BaseModalOpen: true,
                                    modalType: 'paymentFailure',
                                    mode: 'FAILED'
                                }))

                                return;
                            }
                        }
                        
                        console.log('before waiting')
                        await new Promise(resolve => setTimeout(resolve, 3000));
                    }

                    //Payment processing timeout
                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'paymentFailure',
                        mode: 'TIME_OUT'
                    }))

                }catch(error) {
                    console.log('Error | poll', error)

                    setModalState((prevState) => ({
                        ...prevState,
                        BaseModalOpen: true,
                        modalType: 'error',
                        data: {title: '',body: intl.formatMessage({ id: "A_system_error_has_occurred__Please_try_again" })}
                    }));
                }
            }

            pollResource();
        }
      }, []);


      function clearQueryparamsFromUrl() {
        //Function to remove query parameters from a URL
        const removeQueryParams = (url) =>  url.split('?')[0];
        // Get the current URL
        const currentUrl = window.location.href;
        // Remove query parameters
        const cleanedUrl = removeQueryParams(currentUrl);
        // Replace the current URL without query parameters
        window.history.replaceState({}, document.title, cleanedUrl);
      }

    return children
}

export default Validator
