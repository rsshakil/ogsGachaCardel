import React from "react";
import { Link } from "react-router-dom";

// import { useNavigate } from 'react-router-dom';

export const LinkList = () => {
    return (
        <>        
        <h3 ><span>-LinkList-</span></h3>
        <ul className="flex flex-row gap-4">
        <li><Link to="/">▶︎Top</Link></li>

        </ul>
        </>
    );
};


