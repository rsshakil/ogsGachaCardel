import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from 'recoil'
import { productListState } from "../../store/recoil/productListState";
import { Headline } from "../atoms/text/Headline";
import {useIntl} from 'react-intl'
import '../../css/textPanel.css';
import { useMount } from "react-use";
import {pointState} from "../../store/recoil/pointState";
import {userState} from "../../store/recoil/userState";
import { modalState } from "../../store/recoil/modalState";
import useSessionCheck from "../../hooks/useSessionCheck";
import * as queries from "../../restapi/queries";
import { instance } from '../../services/axios.js';

// import { useNavigate } from 'react-router-dom';
let productWrapStyle = 'aspect-[3/2] w-full overflow-hidden rounded';
let productBgStyle = 'transition transform duration-150 ease-in w-full h-full bg-no-repeat bg-cover bg-center hover:scale-125';
let class1stLevelLi = '';
let class1stLevelSpan = 'font-bold text-xl leading-loose';
let class1stLevelP = '';

let class2ndLevelUl = 'pl-4 py-4';
let class2ndLevelLi = 'pl-4';

let class3rdLevelUl = 'pl-4 py-4';
let class3rdLevelLi = 'pl-4';
let class3rdLevelSpan = 'font-bold';
let class3rdLevelP = 'font-normal text-base';

let class4thLevelUl = 'pl-4';
let class4thLevelLi = 'pl-4';

let class5thLevelUl = 'pl-4';
let class5thLevelLi = 'pl-4';


export const MaintenanceInfo = () => {
    const [productListArray, setProductList] = useRecoilState(productListState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    console.log("[ProductList]", productListArray)
    const intl = useIntl()
    const resetUserState = useResetRecoilState(userState);
    const resetPointState = useResetRecoilState(pointState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const { getSessionCheck } = useSessionCheck();
    ///////////////////////////////////////////////////////
    //  マウントされた時にリセット処理
    useMount(() => {

        //  ユーザー情報リセット
        resetUserState()
        //  ポイント情報リセット
        resetPointState()
        //  トークンの削除
        sessionStorage.removeItem("token");
        //  モーダルを閉じる
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: "",
            data : "",
        }));
    });
    //  マウントされた時にリセット処理
    ///////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////
    //  メンテナンスの状況によりこの部分を毎回書き換える
    //  ❗️❗️❗️❗️❗️完了したら初期値に戻す❗️❗️❗️❗️❗️
    //  現在メンテナンス中ですの表示　初期値
    let undergoingMaintenance = intl.formatMessage({ id: 'Currently_undergoing_maintenance' });
    //  現在メンテナンス中ですの表示　メンテナンスしていない時は上書き
    undergoingMaintenance = intl.formatMessage({ id: 'No_maintenance_scheduled_at_this_time' });

    //  開始日時Timestamp　初期値
    let ScheduledStartDateTime = intl.formatDate(Date.now()) + " " + intl.formatTime(Date.now());
    //  開始日時Timestamp　メンテナンスしていない時は『現在メンテナンスの予定はありません』上書き
    ScheduledStartDateTime = '';

    //  終了日時Timestamp　初期値
    let ScheduledEndtDateTime = intl.formatDate(Date.now()) + " " + intl.formatTime(Date.now());
    //  終了日時Timestamp　メンテナンスしていない時は上書き
    ScheduledEndtDateTime = '';

    //  作業内容　初期値
    let contents = '『Pokémon HOME』から『Pokémon GO』の特別なポケモンを連れてくる際、対象のポケモンをVer.1.3.2以前の『ポケットモンスター スカーレット・バイオレット』で一度入手したにも関わらず連れてくることができなかった不具合を修正';
    //  作業内容　メンテナンスしていない時は上書き
    contents = '';
    //  メンテナンスの状況によりこの部分を毎回書き換える
    ///////////////////////////////////////////////////////

    return (
    <>
        <section id="informationWrap" className={`flex justify-center text-white py-8 px-4`}>
            <div className="w-256 grid grid-cols-1 gap-4 justify-items-center">
                <Headline 
                            type="h1"
                            spanText=""
                            spanClass="text-center text-sm text-white drop-shadow-md"
                            headlineText={intl.formatMessage({ id: 'Under_maintenance' })}
                            headlineClass="text-center text-5xl font-bold font-Prompt text-white flex flex-col drop-shadow-md"
                />
                <div className="text-panel w-full lg:w-256">
                    <div className="text-panel-inner px-10 sm:px-12 md:px-14 lg:px-16 py-16 text-white">
                        <span className="font-bold">{undergoingMaintenance}</span>
                        <ul className="grid grid-cols-1 gap-4 sm:gap-12 font-Prompt text-white pt-8">
                            <li className={`${class1stLevelLi}`}>
                                {ScheduledStartDateTime?<span className={`${class1stLevelSpan}`}>{intl.formatMessage({ id: 'Scheduled_start_date_and_time' })}</span>:''}
                                <p className={`${class1stLevelP}`}>{ScheduledStartDateTime}</p>
                            </li>
                            <li className={`${class1stLevelLi}`}>
                                {ScheduledEndtDateTime?<span className={`${class1stLevelSpan}`}>{intl.formatMessage({ id: 'Scheduled_end_date_and_time' })}</span>:''}
                                <p className={`${class1stLevelP}`}>{ScheduledEndtDateTime}</p>
                            </li>
                            <li className={`${class1stLevelLi}`}>
                                {contents?<span className={`${class1stLevelSpan}`}>{intl.formatMessage({ id: 'Version_update_contents' })}</span>:''}
                                <p className={`${class1stLevelP}`}>{contents}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
};


