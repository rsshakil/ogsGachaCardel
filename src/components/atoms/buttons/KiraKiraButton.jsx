/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, Suspense } from "react";
import Star from "../img/Star.png";
export const KiraKiraButton = (props) => {


    return (
        <figure className="absolute h-14 w-full grid grid-cols-50 content-center pointer-events-none">
        {[...Array(7)].map((i,value,index) => {
            // console.log("[KiraKiraButton]111111==>", value)
            return (
                <>
                <img className={`kira rand-${Math.floor( Math.random() * 50 )} row-${value} h-1.5 col-start-3`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 51 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 52 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 53 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 54 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 55 )} row-${value} h-1.5`} src={`${Star}`}></img>

                <img className={`kira rand-${Math.floor( Math.random() * 116 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 117 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 118 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 119 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 120 )} row-${value} h-1.5`} src={`${Star}`}></img>

                <img className={`kira rand-${Math.floor( Math.random() * 121 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 122 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 123 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 124 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 125 )} row-${value} h-1.5`} src={`${Star}`}></img>

                <img className={`kira rand-${Math.floor( Math.random() * 245 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 246 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 247 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 248 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 249 )} row-${value} h-1.5`} src={`${Star}`}></img>

                <img className={`kira rand-${Math.floor( Math.random() * 300 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 350 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 350 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 300 )} row-${value} h-1.5`} src={`${Star}`}></img>

                <img className={`kira rand-${Math.floor( Math.random() * 249 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 248 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 247 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 246 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 245 )} row-${value} h-1.5`} src={`${Star}`}></img>

                <img className={`kira rand-${Math.floor( Math.random() * 125 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 124 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 123 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 122 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 121 )} row-${value} h-1.5`} src={`${Star}`}></img>


                <img className={`kira rand-${Math.floor( Math.random() * 120 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 119 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 118 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 117 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 116 )} row-${value} h-1.5`} src={`${Star}`}></img>

                <img className={`kira rand-${Math.floor( Math.random() * 55 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 54 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 53 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 52 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 51 )} row-${value} h-1.5`} src={`${Star}`}></img>
                <img className={`kira rand-${Math.floor( Math.random() * 50 )} row-${value} h-1.5`} src={`${Star}`}></img>
                </>
            );
        })}
        </figure>
    );
};
