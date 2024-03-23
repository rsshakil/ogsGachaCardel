import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { modalState } from "../../../../store/recoil/modalState";
import { userState } from "../../../../store/recoil/userState";
import { playScenarioState } from "../../../../store/recoil/playScenarioState";
import {useIntl} from 'react-intl'


export const ButtonWrapTestFlightStart = ({handleOnSubmit}) => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const [playScenarioObj, setPlayScenarioState] = useRecoilState(playScenarioState);
    const intl = useIntl()

    let isSlected = '';
    let movieID;
    let movieName;
    let moviePath;
    let currentEnv;
    let currentS3Path;
    let prizeRarity;
    /////////////////////////////////////
    //  テストフライトデータの収集
    //
    //  現在の環境のS3パス
    currentEnv = UserStateObj.UserStateObj;
    if(currentEnv === 'develop'){
        currentS3Path = 'https://productvideo-ogs-develop.s3.ap-northeast-1.amazonaws.com/';
    }else if(currentEnv === 'staging'){
        currentS3Path = 'https://productvideo-ogs-staging.s3.ap-northeast-1.amazonaws.com/';
    }else if(currentEnv === 'mirror'){
        currentS3Path = 'https://productvideo-ogs-cardel.s3.ap-northeast-1.amazonaws.com/';
    }else if(currentEnv === 'cardel'){
        currentS3Path = 'https://productvideo-ogs-cardel.s3.ap-northeast-1.amazonaws.com/';
    }else{
        //  develop
        currentS3Path = 'https://productvideo-ogs-develop.s3.ap-northeast-1.amazonaws.com/';
    }
    //  動画URL確定
    Object.keys(playScenarioObj.movie).map(key => {
        if(playScenarioObj.movie[key].isMovieSelected === true) {
            moviePath = currentS3Path + playScenarioObj.movie[key].movieID + '.mp4';
            // console.log("[ButtonWrapTestFlightStart]moviePath==>", moviePath);
        }else{

        }
    })
    //  賞のレアリティ確定
    Object.keys(playScenarioObj.gimmick).map(key => {
        if(key === 'config'){
            //  configだったらカードに変換しない
        }else{
            //  configでないのであればカードにする
            //  gimmick選択済みかどうか
            if(playScenarioObj.gimmick[key].isGimmickSelected === true) {
                // console.log("[ButtonWrapTestFlightStart]playScenarioObj.gimmick[key].gimmickID==>", playScenarioObj.gimmick[key].gimmickID);
                prizeRarity = playScenarioObj.gimmick[key].gimmickID;
            }else{

            }
        }})


    //  テストフライトデータの収集
    /////////////////////////////////////


    function back2SelectGimmick(e) {
        // console.log("[ButtonWrapTestFlightStart]closeModal e==>", e);
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: 'selectGimmick',
            mode: "select",
            data: {}
        }))
    }




    function SelectGimmickCompleted(e) {
        const videoPreload = document.getElementById("video-preload");
        console.log("[BurgerMenu]openConfirm==>", e);
        //  API通信のためにくるくるを開始
        // setModalState((prevState) => ({
        //     ...prevState,
        //     BaseModalOpen: true,
        //     // modalType: 'gachaLoading',
        //     modalType: 'gacha',
        //     mode: "edit",
        //     data: {}    //  ここで初期化を行わないと通信に失敗すると前回の当選を引きずる
        // }))

        //  実際はタイムアウトではなくAPI通信を行う
        // setTimeout(function(){
            // alert("gachaSession: '4f0ae8cbd32ef19d-39fa90e4f'とか飛ばしてシナリオ確定
            //  不正チェックレスポンス来て、動画の再生準備が整ってから再生する、ダメならエラー処理する。
            //  アニメーションはランダムで複数パターン用意。

            //  実際にはAPIから取得した動画URLを格納
            // var movieRandum = Math.floor(Math.random() * (21 - 1) + 1)
            // var videoUrl = 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/videos/purchase-direction/04/018.mp4';
            // var videoUrl = false
            // videoUrl = 'https://s3.ap-northeast-1.amazonaws.com/oripa-prod-public/videos/purchase-direction/04/0' +('00' + movieRandum).slice( -2 )+ '.mp4';
            videoPreload.href = moviePath;

            //  動画の準備を始めるためにクルクルしながらロードさせる
            setModalState((prevState) => ({
                ...prevState,
                BaseModalOpen: true,
                // modalType: 'gachaLoading',
                modalType: 'gacha',
                mode: "edit",
                data: {
                    'isTestFlight':true,
                    'videoUrl': moviePath,
                    'prizeRarity':prizeRarity,
                    'startPoint': 9898300,
                    'endPoint': 9897300,
                    'prizes': {
                        '550e8400-e29b-41d4-a716-446655440000':{
                            'itemShippingFlag' : true,  //配送制限true=>制限あり
                            'isItemSelected':false,
                            'prizeRank':1,  //賞の上からの順位
                            'itemPoint':55,
                            'itemUUID': '550e8400-e29b-41d4-a716-446655440000',
             
                            'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                            'itemImagePath2':'画像２',
                            'itemImagePath3':'画像３',
                            'itemSippingFlag':1,
                            'categoryName':'ポケモン',
                            'itemName':'わたしリーリエ ほしぐもちゃん',
                            'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                            'itemDescription2':'説明の2',
                            'itemAttribute1':'サポート',
                            'itemAttribute2':'SM4+',
                            'itemAttribute3':'119/114',
                            'itemAttribute4':'SR',
                            'itemAttribute5':'',
                            'itemAttribute6':'美品',
                            'itemAttribute7':'お買い得',
                            'itemAttribute8':'貴重品',
                        },
                        '550e8400-e29b-41d4-a716-446655440001':{
                            'itemShippingFlag' : false,  //配送制限true=>制限あり
                            'isItemSelected':false,
                            'prizeRank':1,  //賞の上からの順位
                            'itemPoint':855,
                            'itemUUID': '550e8400-e29b-41d4-a716-446655440001',
                       
                            'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                            'itemImagePath2':'画像２',
                            'itemImagePath3':'画像３',
                            'itemSippingFlag':1,
                            'categoryName':'ポケモン',
                            'itemName':'リーリエ',
                            'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                            'itemDescription2':'説明の2',
                            'itemAttribute1':'サポート',
                            'itemAttribute2':'SM4+',
                            'itemAttribute3':'119/114',
                            'itemAttribute4':'SR',
                            'itemAttribute5':'PSA10',
                            'itemAttribute6':'美品',
                            'itemAttribute7':'お買い得',
                            'itemAttribute8':'貴重品',
                        },
                        '550e8400-e29b-41d4-a716-446655440002':{
                            'itemShippingFlag' : false,  //配送制限true=>制限あり
                            'isItemSelected':false,
                            'prizeRank':1,  //賞の上からの順位
                            'itemPoint':5895,
                            'itemUUID': '550e8400-e29b-41d4-a716-446655440002',
                       
                            'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                            'itemImagePath2':'画像２',
                            'itemImagePath3':'画像３',
                            'itemSippingFlag':1,
                            'categoryName':'ポケモン',
                            'itemName':'リーリエ',
                            'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                            'itemDescription2':'説明の2',
                            'itemAttribute1':'サポート',
                            'itemAttribute2':'SM4+',
                            'itemAttribute3':'119/114',
                            'itemAttribute4':'SR',
                            'itemAttribute5':'PSA10',
                            'itemAttribute6':'美品',
                            'itemAttribute7':'お買い得',
                            'itemAttribute8':'貴重品',
                        },
                        '550e8400-e29b-41d4-a716-446655440003':{
                            'itemShippingFlag' : false,  //配送制限true=>制限あり
                            'isItemSelected':false,
                            'prizeRank':1,  //賞の上からの順位
                            'itemPoint':58965,
                            'itemUUID': '550e8400-e29b-41d4-a716-446655440003',
                    
                            'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                            'itemImagePath2':'画像２',
                            'itemImagePath3':'画像３',
                            'itemSippingFlag':1,
                            'categoryName':'ポケモン',
                            'itemName':'リーリエ',
                            'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                            'itemDescription2':'説明の2',
                            'itemAttribute1':'サポート',
                            'itemAttribute2':'SM4+',
                            'itemAttribute3':'119/114',
                            'itemAttribute4':'SR',
                            'itemAttribute5':'PSA10',
                            'itemAttribute6':'美品',
                            'itemAttribute7':'お買い得',
                            'itemAttribute8':'貴重品',
                        },


                        '550e8400-e29b-41d4-a716-446655440006':{
                            'itemShippingFlag' : false,  //配送制限true=>制限あり
                            'isItemSelected':false,
                            'prizeRank':1,  //賞の上からの順位
                            'itemPoint':55,
                            'itemUUID': '550e8400-e29b-41d4-a716-446655440006',
                    
                            'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                            'itemImagePath2':'画像２',
                            'itemImagePath3':'画像３',
                            'itemSippingFlag':1,
                            'categoryName':'ポケモン',
                            'itemName':'リーリエ',
                            'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                            'itemDescription2':'説明の2',
                            'itemAttribute1':'サポート',
                            'itemAttribute2':'SM4+',
                            'itemAttribute3':'119/114',
                            'itemAttribute4':'SR',
                            'itemAttribute5':'PSA10',
                            'itemAttribute6':'美品',
                            'itemAttribute7':'お買い得',
                            'itemAttribute8':'貴重品',
                        },
                        '550e8400-e29b-41d4-a716-446655440007':{
                            'itemShippingFlag' : false,  //配送制限true=>制限あり
                            'isItemSelected':false,
                            'prizeRank':1,  //賞の上からの順位
                            'itemPoint':55,
                            'itemUUID': '550e8400-e29b-41d4-a716-446655440007',
                         
                            'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                            'itemImagePath2':'画像２',
                            'itemImagePath3':'画像３',
                            'itemSippingFlag':1,
                            'categoryName':'ポケモン',
                            'itemName':'わたしリーリエ ほしぐもちゃん',
                            'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                            'itemDescription2':'説明の2',
                            'itemAttribute1':'サポート',
                            'itemAttribute2':'SM4+',
                            'itemAttribute3':'119/114',
                            'itemAttribute4':'SR',
                            'itemAttribute5':'',
                            'itemAttribute6':'美品',
                            'itemAttribute7':'お買い得',
                            'itemAttribute8':'貴重品',
                        },
                        '550e8400-e29b-41d4-a716-446655440008':{
                            'itemShippingFlag' : false,  //配送制限true=>制限あり
                            'isItemSelected':false,
                            'prizeRank':1,  //賞の上からの順位
                            'itemPoint':855,
                            'itemUUID': '550e8400-e29b-41d4-a716-446655440008',
                     
                            'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                            'itemImagePath2':'画像２',
                            'itemImagePath3':'画像３',
                            'itemSippingFlag':1,
                            'categoryName':'ポケモン',
                            'itemName':'リーリエ',
                            'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                            'itemDescription2':'説明の2',
                            'itemAttribute1':'サポート',
                            'itemAttribute2':'SM4+',
                            'itemAttribute3':'119/114',
                            'itemAttribute4':'SR',
                            'itemAttribute5':'PSA10',
                            'itemAttribute6':'美品',
                            'itemAttribute7':'お買い得',
                            'itemAttribute8':'貴重品',
                        },
                        '550e8400-e29b-41d4-a716-446655440009':{
                            'itemShippingFlag' : false,  //配送制限true=>制限あり
                            'isItemSelected':false,
                            'prizeRank':1,  //賞の上からの順位
                            'itemPoint':5895,
                            'itemUUID': '550e8400-e29b-41d4-a716-446655440009',
                 
                            'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                            'itemImagePath2':'画像２',
                            'itemImagePath3':'画像３',
                            'itemSippingFlag':1,
                            'categoryName':'ポケモン',
                            'itemName':'リーリエ',
                            'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                            'itemDescription2':'説明の2',
                            'itemAttribute1':'サポート',
                            'itemAttribute2':'SM4+',
                            'itemAttribute3':'119/114',
                            'itemAttribute4':'SR',
                            'itemAttribute5':'PSA10',
                            'itemAttribute6':'美品',
                            'itemAttribute7':'お買い得',
                            'itemAttribute8':'貴重品',
                        },
                        '550e8400-e29b-41d4-a716-44665544000a':{
                            'itemShippingFlag' : false,  //配送制限true=>制限あり
                            'isItemSelected':false,
                            'prizeRank':1,  //賞の上からの順位
                            'itemPoint':58965,
                            'itemUUID': '550e8400-e29b-41d4-a716-44665544000a',
                      
                            'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                            'itemImagePath2':'画像２',
                            'itemImagePath3':'画像３',
                            'itemSippingFlag':1,
                            'categoryName':'ポケモン',
                            'itemName':'リーリエ',
                            'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                            'itemDescription2':'説明の2',
                            'itemAttribute1':'サポート',
                            'itemAttribute2':'SM4+',
                            'itemAttribute3':'119/114',
                            'itemAttribute4':'SR',
                            'itemAttribute5':'PSA10',
                            'itemAttribute6':'美品',
                            'itemAttribute7':'お買い得',
                            'itemAttribute8':'貴重品',
                        },
                        '550e8400-e29b-41d4-a716-44665544000b':{
                            'itemShippingFlag' : false,  //配送制限true=>制限あり
                            'isItemSelected':false,
                            'prizeRank':1,  //賞の上からの順位
                            'itemPoint':5234565,
                            'itemUUID': '550e8400-e29b-41d4-a716-44665544000b',
                   
                            'itemImagePath1':'https://torecacamp-pokemon.com/cdn/shop/products/LUpxkzvEQZzJbz6waPEUYOOCcKO6cPxPntX7sgmP_500x.jpg?v=1689392215',
                            'itemImagePath2':'画像２',
                            'itemImagePath3':'画像３',
                            'itemSippingFlag':1,
                            'categoryName':'ポケモン',
                            'itemName':'リーリエ',
                            'itemDescription1':'一人称は「わたし」。他者やポケモンに「さん」を付けて呼ぶなど、丁寧な口調。訳あってククイ博士の助手をしている。年齢は主人公と近い。ポケモンが傷つくのを見るのは忍びないと感じているためポケモンバトルは苦手。読書をすることが好き。本人曰く、よく道に迷うという。「ほしぐもちゃん」と呼んでいる珍しいポケモンコスモッグと一緒にいるが、自身はポケモントレーナーではないためモンスターボールには入れておらず、普段はバッグに入ってもらっている。',
                            'itemDescription2':'説明の2',
                            'itemAttribute1':'サポート',
                            'itemAttribute2':'SM4+',
                            'itemAttribute3':'119/114',
                            'itemAttribute4':'SR',
                            'itemAttribute5':'PSA10',
                            'itemAttribute6':'美品',
                            'itemAttribute7':'お買い得',
                            'itemAttribute8':'貴重品',
                        },


                    }
                }
            }))
        // },1000)
    }



    return (
        <div className="w-full flex flex-col justify-center items-center">
            <button
                className="button-full flex flex-row justify-center items-center touch-none select-none"
                onClick={(e) => SelectGimmickCompleted()}
                type="submit"

            >
                <p className="pointer-events-none text-base font-bold font-Roboto">
                    Test Flight
                </p>
            </button>
            <div 
                className="button-full button-white flex flex-row justify-center items-center touch-none select-none mt-4"
                onClick={(e) => back2SelectGimmick()}
            >
                <p className="pointer-events-none text-base font-bold font-Roboto text-slate">
                    {intl.formatMessage({ id: 'Back' })}
                </p>
            </div>
        </div>
)

}