import ja from "../store/errorMessage/ja";
import en from "../store/errorMessage/en";
import bn from "../store/errorMessage/bn";
import ko from "../store/errorMessage/ko";
import th from "../store/errorMessage/th";
import zh from "../store/errorMessage/zh";
import fr from "../store/errorMessage/fr";
import es from "../store/errorMessage/es";
import de from "../store/errorMessage/de";
import it from "../store/errorMessage/it";
import id from "../store/errorMessage/id";
import pt from "../store/errorMessage/pt";

import {useState, useLayoutEffect} from "react";
import {useRecoilState} from "recoil";
import {userState} from "../store/recoil/userState";

export default function useSetErrorMessage() {
    const [UserStateObj, setUserState] = useRecoilState(userState);
    const {languageResource: setLanguage = 'ja'} = UserStateObj || {};

    let dictionary;

    switch (setLanguage) {
        case 'ja':
            dictionary = ja;
            break;
        case 'en':
            dictionary = en;
            break;
          case 'bn':
            dictionary = bn;
            break;
        case 'ko':
            dictionary = ko;
            break;
        case 'th':
            dictionary = th;
            break;
        case 'zh':
            dictionary = zh;
            break;
        case 'fr':
            dictionary = fr;
            break;
        case 'es':
            dictionary = es;
            break;
        case 'de':
            dictionary = de;
            break;
        case 'it':
            dictionary = it;
            break;
        case 'id':
            dictionary = id;
            break;
        case 'pt':
            dictionary = pt;
            break;    
        default:
            dictionary = en;
            break;
    }

    return {
        dictionary,
        setLanguage
    };
}
