import { useField } from 'formik';
import React from 'react';

const FileInput = ({ label, labelClassName, inputClassName, ...props }) => {
    const [field] = useField(props);
    return (
        <>
            {label && (
                <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                    {label}
                </label>
            )}
            <input
                className={`h-32 p-2 hover:outline-1 active:outline-1 focus:outline-1 hover:outline-offset-0 active:outline-offset-0 focus:outline-offset-0 hover:outline-[#145c8f] active:outline-[#145c8f] focus:outline-[#145c8f] outline-none border border-solid border-blue-100 w-full ${inputClassName}`}
                {...field}
                {...props}
            />
        </>
    );
};

export default FileInput;
