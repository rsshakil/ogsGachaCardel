import infiniteLoaderIcon from "../img/infinite-spinner.svg";

const InfiniteLoader = ({ className = '', isLoading = false}) => {


    return (
            <div className={`${className}`}  align="center">
                <img src={infiniteLoaderIcon} alt="SVG Icon" />
            </div>
    );
};

export default InfiniteLoader;
