import React, { useEffect,useState } from "react";
import Newscomponent from "./Newscomponent";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  
 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const [article,setArticle]=useState([]);
  // const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0);
   
  

  const updateData= async (value)=> {
    props.setProgress(0);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=232940725ff745df866efb9778420f11&page=${value}&pageSize=${props.pageSize}`
    );
    props.setProgress(30);
    const jsonData = await response.json();
    props.setProgress(50);
    setArticle(jsonData.articles);
    setTotalResults(jsonData.totalResults);
    setPage(value);
    props.setProgress(100);
  }
  useEffect(() => {
    updateData(page);
    document.title = `${capitalizeFirstLetter(
      props.category
    )} CatNews-App`;
    // eslint-disable-next-line
  }, []);


  const fetchMoreData = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&category=${
        props.category
      }&apiKey=232940725ff745df866efb9778420f11&page=${
        page + 1
      }&pageSize=${props.pageSize}`
    );
    const jsonData = await response.json();
    setArticle(article.concat(jsonData.articles));
    setTotalResults(jsonData.totalResults);
    setPage(page+1);
  };
  
    return (
      <div>
        <div className="container my-3">
          <h2 className="text-center" style={{marginTop:"90px"}}>
            {capitalizeFirstLetter(props.category)} Related News
          </h2>
          <InfiniteScroll
            dataLength={article.length}
            next={fetchMoreData}
            hasMore={article !== totalResults}
            loader={<Spinner />}
          >
            <div className="row">
              {article.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newscomponent
                      source={element.source.name}
                      date={element.publishedAt}
                      aurthor={!element.author ? "Unkownn" : element.author}
                      name={
                        !element.title
                          ? "No title Available"
                          : element.title.slice(0, 50)
                      }
                      desc={
                        !element.description
                          ? "No Description Available"
                          : element.description.slice(0, 75)
                      }
                      imageUrl={
                        !element.urlToImage
                          ? "https://images.hindustantimes.com/tech/img/2023/07/01/1600x900/8c60a97e945c8d1bd76c3d1e3d0dcb81jpg_1655084471263_1688178609777.jpg"
                          : element.urlToImage
                      }
                      urlTo={element.url}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  
}

export default News;
