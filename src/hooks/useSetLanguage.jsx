import ja from "../store/dictionary/ja";
import en from "../store/dictionary/en";
import bn from "../store/dictionary/bn";
import ko from "../store/dictionary/ko";
import th from "../store/dictionary/th";
import zh from "../store/dictionary/zh";
import fr from "../store/dictionary/fr";
import es from "../store/dictionary/es";
import de from "../store/dictionary/de";
import it from "../store/dictionary/it";
import id from "../store/dictionary/id";
import pt from "../store/dictionary/pt";
import {useEffect, useState, useLayoutEffect} from "react";
import {useRecoilState} from "recoil";
import {userState} from "../store/recoil/userState";
import {useLocation} from "react-router";

export default function useSetLanguage(props) {
    const [UserStateObj, setUserState] = useRecoilState(userState);
    let location = useLocation();
    const [languageSetFlag, setLanguageSetFlag] = useState(false)

    let setLanguage;
    //  1,ブラウザーから取得した言語設定となっているが
    //  ❗️❗️地域を取得し、管理画面設定テーブルから言語確定❗️❗️
    let browserLanguage = UserStateObj.navigatorLanguage;
    // console.log('[App]UserStateObj.navigatorLanguage', UserStateObj.navigatorLanguage);
    browserLanguage = window.navigator.language.substring(0, 2);
    // console.log('[App]browserLanguage', browserLanguage);
    let browserLocal = window.navigator.language.substring(3, 2);
    // console.log('[App]browserLocal', browserLocal);
    setLanguage = browserLanguage ;
    //  2,ユーザー設定から取得した言語設定
    //  3,ユーザーによる切り替え操作から取得した言語設定
    let userSelectLanguage = UserStateObj.userSelectLanguage;
    // console.log('[App]userSelectLanguage', userSelectLanguage);
    //  選択した履歴があればそれが表示言語、なければブラウザーの設定
    setLanguage = userSelectLanguage ? userSelectLanguage : browserLanguage;
    //  4,システムによる割り当てによる言語ファイル割り当て決定
    //  5,リソースファイルなどの変更の為最終言語を格納

    //  6,言語に紐つくリソースの確定
    let dictionary;
    let languageResource;
    // console.log('[App]language:before switch (language)==>', setLanguage);
    switch (setLanguage) {
        case 'ja':
            dictionary = ja;
            languageResource = 'ja';
            break;
        case 'en':
            dictionary = en;
            languageResource = 'en';
            break;
        case 'bn':
            //　ベンガル語
            dictionary = bn;
            languageResource = 'bn';
            break;
        case 'ko':
            //　韓国語
            dictionary = ko;
            languageResource = 'ko';
            break;
        case 'th':
            //　タイ語
            dictionary = th;
            languageResource = 'th';
            break;
        case 'zh':
            //　中国語 (簡体字)
            dictionary = zh;
            languageResource = 'zh';
            break;
        case 'fr':
            //　フランス語
            dictionary = fr;
            languageResource = 'fr';
            break;
        case 'es':
            //　スペイン語
            dictionary = es;
            languageResource = 'es';
            break;
        case 'de':
            //　ドイツ語
            dictionary = de;
            languageResource = 'de';
            break;
        case 'it':
            //　イタリア語
            dictionary = it;
            languageResource = 'it';
            break;
        case 'id':
            //　インドネシア語
            dictionary = id;
            languageResource = 'id';
            break;
        case 'pt':
            //　ポルトガル語
            dictionary = pt;
            languageResource = 'pt';
            break;
        default:
            dictionary = en;
            languageResource = 'en';
            break;
    }
    // console.log('[App]dictionary==>', dictionary);
    // console.log('[App]languageResource==>', languageResource);
    //  7,最新の言語とリソースを格納
    useLayoutEffect(() => {
        //  htmlの言語設定の変更
        document.documentElement.lang  = languageResource;
        setUserState((prevState) => ({
            ...prevState,
            languageResource: languageResource,
            language: setLanguage,
        }))

        setLanguageSetFlag(true);
    }, [location, setLanguage,dictionary])

    return {
        languageSetFlag,
        dictionary,
        setLanguage
    };
}
