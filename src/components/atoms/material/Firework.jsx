/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
// import { useSpring, animated } from '@react-spring/web'

import '../../../css/Firework.css';
import  hanabi  from "../../atoms/img/hanabi.png";



export const Firework = (props) => {
    const location = useLocation();
    // set animation random
    // let animationNumber;
    const [animationNumber, setAnimationNumber] = useState(0);
    let animationRandom;
    useEffect(() => {
        animationRandom =  Math.floor( Math.random() * 4 );
        // console.log("[Firework]animationRandom==>", animationRandom)
        setAnimationNumber(animationRandom);
    }, []);



    return (
        <>
            <section class="sky">
                <div class="hanabi hanabi_left">
                    <img src={`${hanabi}`} alt="hanabi_left" />
                </div>
                <div class="hanabi hanabi_left_middle">
                    <img src={`${hanabi}`} alt="hanabi_left" />
                </div>
                <div class="hanabi hanabi_left_bottom1">
                    <img src={`${hanabi}`} alt="hanabi_left" />
                </div>
                <div class="hanabi hanabi_left_bottom2">
                    <img src={`${hanabi}`} alt="hanabi_left" />
                </div>
                <div class="hanabi hanabi_center">
                    <img src={`${hanabi}`} alt="hanabi_center" />
                </div>
                <div class="hanabi hanabi_center_middle1">
                    <img src={`${hanabi}`} alt="hanabi_right" />
                </div>
                <div class="hanabi hanabi_center_middle2">
                    <img src={`${hanabi}`} alt="hanabi_right" />
                </div>
                <div class="hanabi hanabi_center_bottom">
                    <img src={`${hanabi}`} alt="hanabi_right" />
                </div>
                <div class="hanabi hanabi_right">
                    <img src={`${hanabi}`} alt="hanabi_right" />
                </div>
                <div class="hanabi hanabi_right_middle">
                    <img src={`${hanabi}`} alt="hanabi_right" />
                </div>
                <div class="hanabi hanabi_right_bottom">
                    <img src={`${hanabi}`} alt="hanabi_right" />
                </div>
            </section>
        </>
    
    );
};
