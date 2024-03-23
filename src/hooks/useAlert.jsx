import { useRecoilState } from 'recoil';
import session from '../store/recoil/sessionState';

const jsPath1 = "/alert1.js";
const jsPath2 = "/alert2.js";

export default function useAlert() {
    const [sessionValue, setSessionValue] = useRecoilState(session)

    const showAlert1 = () => {
        const script1 = document.createElement('script');
        script1.type = 'text/javascript';
        script1.src = jsPath1;
        script1.id = 'admusubikey1';

        document.head.appendChild(script1);
        const element1 = document.getElementById("admusubikey1");
        element1.remove();
    }

    const showAlert2 = () => {
        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = jsPath2;
        script2.id = 'admusubikey2';

        document.head.appendChild(script2);
        const element2 = document.getElementById("admusubikey2");
        element2.remove();
    }

    return { showAlert1, showAlert2 };
}
