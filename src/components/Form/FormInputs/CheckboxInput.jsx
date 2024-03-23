import { useField } from 'formik';
import { GiCheckMark } from 'react-icons/gi';

const Checkbox = ({ children, subLabel, borderColor, ...props }) => {
    const [field] = useField({ ...props, type: 'checkbox' }); 
    return (
        <>
            <label className="checkbox-input cursor-pointer font-normal relative">
                <input
                    className={`checkbox-c appearance-none ${borderColor ? borderColor : ''}`}
                    type="checkbox"
                    {...field}
                    {...props}
                />{' '}
                <GiCheckMark className="text-2xl absolute left-[2px] text-green-500 bottom-[-2px] text-opacity-0 check-1" />
                <span className="p-2 cursor-pointer">{children}</span>
            </label>
        </>
    );
};
export default Checkbox;
