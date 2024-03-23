import { useField } from 'formik';
import React from 'react';

const Hidden = ({ label, labelClassName, inputClassName, valueunset, ...props }) => {
    const [field] = useField(props);
    return (
        <>
            <input
                type="hidden"
                className={`h-8 p-2 outline-none border border-solid border-blue-100 w-full ${inputClassName}`}
                {...field}
                {...props}
            />
        </>
    );
};

export default Hidden;
