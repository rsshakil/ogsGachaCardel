import React from "react";

export const Headline = (props) => {
    // console.log("[Headline]children===>", props)
    const { type, spanText, spanClass, headlineText, headlineClass} = props;

    let headline;
    switch (type) {
        case 'h1':
            return (
                <h1 className={`${headlineClass}`}>
                    <small className={`${spanClass}`}>
                        {spanText}
                    </small>
                    {headlineText}
                </h1>
                
            )

        case 'h2':
            return (
                <h2 className={`${headlineClass}`}>
                    <small className={`${spanClass}`}>
                        {spanText}
                    </small>
                    {headlineText}
                </h2>
                
            )

        case 'h3':
            return (
                <h3 className={`${headlineClass}`}>
                    <small className={`${spanClass}`}>
                        {spanText}
                    </small>
                    {headlineText}
                </h3>
                
            )
 
        case 'h4':
            return (
                <h4 className={`${headlineClass}`}>
                    <small className={`${spanClass}`}>
                        {spanText}
                    </small>
                    {headlineText}
                </h4>
                
            )

        case 'h5':
            return (
                <h5 className={`${headlineClass}`}>
                    <small className={`${spanClass}`}>
                        {spanText}
                    </small>
                    {headlineText}
                </h5>
                
            )

        case 'h6':
            return (
                <h6 className={`${headlineClass}`}>
                    <small className={`${spanClass}`}>
                        {spanText}
                    </small>
                    {headlineText}
                </h6>
                
            )

        case 'h7':
            return (
                <h7 className={`${headlineClass}`}>
                    <small className={`${spanClass}`}>
                        {spanText}
                    </small>
                    {headlineText}
                </h7>
                
            )

        default:
            return (
                <h8 className={`${headlineClass}`}>
                    <small className={`${spanClass}`}>
                        {spanText}
                    </small>
                    {headlineText}
                </h8>
                
            )

    }
};



