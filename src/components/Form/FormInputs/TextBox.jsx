import { useField } from 'formik';
import React, { forwardRef } from 'react';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';
import AddRequiredText from '../../HelpingComponent/AddRequiredText';

const TextBox = forwardRef(
    ({ label, labelClassName, inputClassName, valueunset, placeholder, isRequired,requiredText, ...props }, ref) => {
        const [field] = useField(props);
        return (
            <>
                {label && (
                    <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                        {label} {isRequired ? <AddRequiredText requiredText={ requiredText } /> : null}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`${inputClassName}`}
                    placeholder={placeholder??''}
                    {...field}
                    {...props}
                />
            </>
        );
    }
);

export default TextBox;
