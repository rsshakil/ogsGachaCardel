import React from 'react';
//this container will be used to wrap any input field(i.e. text, select, check, radio, textarea)
const InputContainer = ({children, className, id}) => {
    return (
        <div className={`flex flex-col ${className ? className:"mb-4"}`} id={id} >
            {children}
        </div>
    );
};

export default InputContainer;