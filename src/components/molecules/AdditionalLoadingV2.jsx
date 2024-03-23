import { useCallback, useEffect, useRef, useState } from "react";


export default function AdditionalLoadingV2(props){
    const {
        dataLength = 0, 
        itemsPerPage = 0,
        className="",
        scrollableTarget,
        loaderTemplate=<h4>Loading...</h4>, 
        contentTemplate=()=> console.log('Please set a content template to show ur data'), 
        fetchMoreDataFn = ()=> console.log('Fetch more data...'), 
        scrollThreshold, 
        endMessage=(<p className="text-center"><b>Yay! You have seen it all</b></p>)
    } = props || {};

    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const loaderRef = useRef(null);
    
    const nextDataCall = () => fetchMoreDataFn(dataLength);

    const recordRange = Array.from({ length: (dataLength - 1) - (pageNumber*itemsPerPage) + 1 }, (_, i) => (pageNumber*itemsPerPage) + i);

    console.log('recordRange >>>>>>>>>', recordRange)
    console.log('dataLength >>>>>>>>>', dataLength)


    const fetchData = useCallback(async () => {
        console.log('trying to getch more records .........');
        if (isLoading) return;
      
        setIsLoading(true);

       const {success, hasMore} =  await fetchMoreDataFn(dataLength, itemsPerPage);
      
       setPageNumber((prevIndex) => prevIndex + 1);
        setIsLoading(false);

      }, [pageNumber, isLoading]);


      useEffect(() => {
        const option = {
            root: null, // Use the viewport as the root
            rootMargin: '500px 0px 0px 0px',
            threshold: 0.1, // Trigger when 10% of the target is visible
        }

        const observer = new IntersectionObserver((entries) => {
          const target = entries[0];
          if (target.isIntersecting) {
            fetchData();
          }
        }, option);


        const target = document.querySelector(scrollableTarget);

        console.log('target', target)
        console.log('llllllllllkikiki', loaderRef.current)
    
        if (loaderRef.current) {
          observer.observe(loaderRef.current);
        }
    
        return () => {
          if (loaderRef.current) {
            observer.unobserve(loaderRef.current);
          }
        };
      }, [fetchData]);


    return (
        <div className="relative">

            <div  className={`${className}`}>
                {recordRange.map(x => contentTemplate(x))}
            </div>

            {/* <div ref={loaderRef} style={{position: 'absolute', bottom: `${scrollThreshold*100}%`, width: '100%'}}>hi i am here</div> */}

            <div  ref={loaderRef} className="w-full h-12 max-h-12 mt-0 mb-[50px]">{isLoading && loaderTemplate}</div>
        </div>
    )
}