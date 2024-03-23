import { useEffect,useLayoutEffect } from "react";


export default function useMetaDescription(description) {

    useLayoutEffect(() => {


        return () => {
            document.querySelector('meta[name="description"]').setAttribute("content", description)
        }
    })
}