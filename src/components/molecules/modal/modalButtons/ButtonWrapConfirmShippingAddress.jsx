import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import {useIntl} from 'react-intl'
import { userState } from "../../../../store/recoil/userState";
import useSessionCheck from '../../../../hooks/useSessionCheck'



export const ButtonWrapConfirmShippingAddress = () => {

    const intl = useIntl()
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const { getSessionCheck } = useSessionCheck();
    const {
        BaseModalOpen,
        modalType,
        mode,
    } = modalStateValue;

    let shippingArray;
    shippingArray = UserStateObj.myShippingAddress;
    const [canShipping, setCanShipping] = useState('disableShipping');
    useEffect(() => {
        console.log("shippingConfirmUseEffectFireDefault",UserStateObj.myShippingAddress);
    },[]);
    useEffect(() => {
        console.log("shippingConfirmUseEffectFire");
        setCanShipping('disableShipping');
        Object.keys(shippingArray).map(key => {
            if(shippingArray[key].isItemSelected){
                setCanShipping('enableShipping');
            }
        })
    }, [shippingArray]);

    function shippingAddressCancel(e) {
        //  現在のmodeでキャンセル後の遷移先をスイッチする
        //  allFromCollection=>コレクション
        //  selectedFromCollection=>コレクション
        //  allFromShowPrize=>抽選結果
        //  なし＝＞閉じる（例外）

        console.log("[ButtonWrapConfirmShippingAddress]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'showCollection',
            mode: "select",
            // data: {}
        }))
    }


    async function shippingAddressConfirmed(e) {
        // let modalProps = {
        //     displayModal:true,
        //     modalType:"ConfirmShippingAddress",
        //     mode:"select",
        //     data:{}
        // }
        if (await getSessionCheck(shippingAddressConfirmed,e)) {
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                modalType: 'ShippingConfirm',
                mode: "",
                // data: {}
            }))
        }
    }


    return (
    <>

{
    {
        'disableShipping':<>
            <div 
                className="cursor-not-allowed button-half-left button-white button-disable flex flex-row justify-center items-center touch-none select-none"
            >
                <p className="pointer-events-none text-base font-bold font-Roboto mix-blend-soft-light">
                    {intl.formatMessage({ id: 'confirm' })}
                </p>
            </div>
        </>,
        'enableShipping':<>
            <div 
                className="button-half-left flex flex-row justify-center items-center touch-none select-none"
                // onClick={(e) => gachaLoading()}
                onClick={(e) => shippingAddressConfirmed()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    {intl.formatMessage({ id: 'confirm' })}
                </p>
            </div>
        </>
    }[canShipping]
}
        <div 
            className="button-half-right button-white flex flex-row justify-center items-center touch-none select-none"
            onClick={(e) => shippingAddressCancel()}
        >
            <p className="pointer-events-none text-base font-bold font-Roboto text-slate">
                {intl.formatMessage({ id: 'Back' })}
            </p>
        </div>
    </>
)

}