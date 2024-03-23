import React, {useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {modalState} from "../../store/recoil/modalState";
import _ from "lodash";


export const Check3dEpsilonForm = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const {trackingUUID } = modalStateValue.data || {};

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [pareqVal, setPareqVal] = useState('');
    const [tds2UrlVal, setTds2UrlVal] = useState('');


    useEffect(() => {
        const { data } = modalStateValue;
        console.log('my paraq', data)
        if (data) {
            const {pareq = '',  tds2URL = ''} = data;
            setPareqVal(pareq);
            setTds2UrlVal(tds2URL);

            keepCardInfoTemporary(data);
        }
    }, [modalStateValue]);

    const submitForm = () => document.downloadForm.submit();

    useEffect(() => {
         if(pareqVal && !formSubmitted) {
            setFormSubmitted(true);
            submitForm();
         }
      }, [pareqVal]);


    const triggerSubmit = (e) => {
        e.preventDefault();

        if(pareqVal && !formSubmitted) {
            setFormSubmitted(true);
            submitForm();
        }
    }

    function keepCardInfoTemporary(data) {
        const pickedObject = _.pick(data || {}, ['formData', 'chargePoint', 'userChargePoint', 'key', 'paymentMethodType']);
     
        localStorage.setItem('cc', btoa(JSON.stringify(pickedObject)));
    }


     const callbackUrl = process.env.REACT_APP_ENVIRONMENT == 'cardel-develop' ? 
     process.env.REACT_APP_EPSILON_PAYMENT_URL_EC2_LOCALHOST + '/callback?redirectTo=' + window.location.href : 
     process.env.REACT_APP_EPSILON_PAYMENT_URL_EC2_PRODUCTION + '/callback?redirectTo=' + window.location.href;

    return (
        <div id="loginWrap" className="w-full grid grid-cols-1">
           {/* Redirect to epsilon payment page */}
            {pareqVal && (
                <form  
                    name="downloadForm" 
                    action={tds2UrlVal} 
                    method="POST" 
                    enctype="application/x-www-form-urlencoded" 
                    onSubmit={triggerSubmit}
                >
                    <br />
                    <br />
                    <center>
                        <h2>
                        3-Dセキュア認証を続けます。
                        <br />
                        ボタンをクリックしてください。
                        </h2>
                        <input type="submit" value="OK"  disabled={formSubmitted}/>
                    </center>

                    <input type="hidden" name="PaReq" value={pareqVal} />
                    <input type="hidden"  name="TermUrl"  value={callbackUrl}/>
                    <input type="hidden"  name="MD" value={trackingUUID} />
                </form>
            )}
        </div>
    )
}