import React, { useRef, useState, useEffect } from "react";
export const Content = (props) => {
    const { children } = props;


    let sectionWrapStyle = {minHeight: `100%`};


    return (
        <article id="sectionWrap" className={`overflow-x-clip flex flex-col min-h-full grow`} style={sectionWrapStyle}>
            {/* 与えられた高さを使い切る */}
            {children}
        </article>
    );
};
