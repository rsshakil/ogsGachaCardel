import { useField } from 'formik';
import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import commonConstants from '../../../lib/commonConstants';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';

const PasswordWithEye = ({ label, labelClassName, inputClassName, eye, setEye, placeholder, isRequired, ...props }) => {
    const [field] = useField(props);
    const toggleEye = () => setEye((prevState) => !prevState);

    return (
        <>
            <label htmlFor={props.id || props.name} className={`${labelClassName} ${isRequired ? 'inline-flex' : ''}`}>
                {label} {isRequired ? <AddRequiredMark /> : null}
            </label>
            <div className="flex justify-between">
                <input
                    className={`h-8 p-2 outline-none hover:outline-1 active:outline-1 focus:outline-2 hover:outline-offset-0 active:outline-offset-0 focus:outline-offset-2 hover:outline-[#145c8f] active:outline-[#145c8f] focus:outline-[#145c8f] focus:transition-all focus:duration-200 focus:ease-in border border-solid border-blue-100 w-full placeholder-gray-300 ${inputClassName}`}
                    type={eye ? 'text' : 'password'}
                    maxLength="32"
                    autoComplete="new-password"
                    placeholder={placeholder ? commonConstants.INPUT_PLACEHOLDER_PREFIX(placeholder) : ''}
                    {...field}
                    {...props}
                />
                <span className="eyeStyle" onClick={toggleEye}>
                    {eye ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
            </div>
        </>
    );
};

export default PasswordWithEye;
