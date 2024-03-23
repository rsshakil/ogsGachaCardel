import { useField } from 'formik';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';
import AddRequiredText from '../../HelpingComponent/AddRequiredText';

const SelectBox = ({ label, labelClassName, inputClassName, border = 'border', isRequired,requiredText, ...props }) => {
    const [field] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                {label} {isRequired ? <AddRequiredText requiredText={ requiredText } /> : null}
            </label>
            <div className="flex justify-between">
                <select
                    className={` ${inputClassName} ${border}`}
                    {...field}
                    {...props}
                />
            </div>
        </>
    );
};
export default SelectBox;
