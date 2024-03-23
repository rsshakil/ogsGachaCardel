/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
// import { useSpring, animated } from '@react-spring/web'

import '../../../css/MysteryCircle.css';




export const MysteryCircle = (props) => {
    const location = useLocation();
    // set animation random
    // let animationNumber;
    const [animationNumber, setAnimationNumber] = useState(0);
    let animationRandom;
    useEffect(() => {
        animationRandom =  Math.floor( Math.random() * 3 );

        console.log("[MysteryCircle]animationRandom==>", animationRandom)
        setAnimationNumber(animationRandom);

    }, []);
    return (
        <>
        {/* <div className={`circle-effect-3 circle pointer-events-none`}></div> */}
        <div className={`circle-effect-${animationNumber} circle pointer-events-none`}></div>
            <svg className="circle-svg">
            <filter id="wavy">
                <feTurbulence x="0" y="0" baseFrequency="0.009" numOctaves="5" seed="2">
                <animate attributeName="baseFrequency" dur="60s" values="0.02;0.005;0.02" repeatCount="indefinite"></animate>
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap>
            </filter>
            </svg>
        </>
    );
};
