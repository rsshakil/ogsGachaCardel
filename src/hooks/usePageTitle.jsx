import { useEffect,useLayoutEffect } from "react";


export default function usePageTitle(title) {

    useLayoutEffect(() => {
        const prevTitle = document.title
        document.title = title;

        return () => {
            document.title = prevTitle
        }
    })
}