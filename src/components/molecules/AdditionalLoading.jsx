import InfiniteScroll from "react-infinite-scroll-component";

export default function AdditionalLoading({children, className='', dataLength, fetchMoreDataFn = ()=> console.log('Fetch more data...'), hasMore, loaderTemplate=<h4>Loading...</h4>, scrollableTarget, scrollThreshold, endMessage=(<p className="text-center"><b>Yay! You have seen it all</b></p>)}){

    const nextDataCall = () => fetchMoreDataFn(dataLength);

    return (
        <InfiniteScroll
            className={className}
            style={{overflow: 'hidden !important'}}
            dataLength={dataLength}
            next={nextDataCall}
            hasMore={hasMore}
            loader={loaderTemplate}
            scrollableTarget={scrollableTarget}
            scrollThreshold={scrollThreshold}
            endMessage={endMessage}
        >
            {children}
        </InfiniteScroll>
    )
}