import React, { useRef, useState, useEffect, Suspense, useLayoutEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams,useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { accessState } from "../store/recoil/accessState";

export const QueryParameter = () => {
  // const searchParams = useSearchParams();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { pathname } = useLocation();
  const [accessStateValue, setAccessState] = useRecoilState(accessState);
  // console.log("[QueryParameter]params=======>",params);

  // console.log("[QueryParameter]searchParams=======>",searchParams);
  // console.log("[QueryParameter]searchParams=======>",searchParams);
  const searchParamsArray = [];
  searchParams.forEach((value, key) => {
    searchParamsArray.push([key, value]);
  })
//  console.log("[QueryParameter]searchParamsArray=======>",searchParamsArray);

useLayoutEffect(() => {
    // console.log("[QueryParameter]searchParams=======>",searchParams);
    // console.log("[QueryParameter]searchParams.get(af)=======>",searchParams.get("af"));
    // console.log("[QueryParameter]params=======>",params);
    // console.log("[QueryParameter]pathname=======>",pathname);
    setAccessState((prevState) => ({
        ...prevState,
        pageParam: params,
        pagePath: pathname,
        pageSearchParams: searchParamsArray,
        getAf: searchParams.get("af")?searchParams.get("af"):prevState.getAf, //アフィリコード　課金+ガチャ＋登録などで成果を追う
        /////////////////////////////////////////
        //  招待コード
        //  20240122利用停止
        // getInvitation: searchParams.get("invitation")?searchParams.get("invitation"):prevState.getInvitation,
        //  招待コード
        /////////////////////////////////////////

        // pageName: pageName,
    }))


}, [pathname]);


  // const name = searchParams.get("name");
  return (
    <></>
  );
};