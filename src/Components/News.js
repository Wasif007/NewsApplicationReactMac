import React, { Component } from "react";
import Newscomponent from "./Newscomponent";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  article = [];
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      article: this.article,
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} CatNews-App`;
  }

  async updateData(value) {
    this.props.setProgress(0);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${value}&pageSize=${this.props.pageSize}`
    );
    this.props.setProgress(30);
    const jsonData = await response.json();
    this.props.setProgress(50);
    this.setState({
      article: jsonData.articles,
      totalResults: jsonData.totalResults,
      page: value,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateData(this.state.page);
  }

  fetchMoreData = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=${this.props.apikey}&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`
    );
    const jsonData = await response.json();
    this.setState({
      article: this.state.article.concat(jsonData.articles),
      totalResults: jsonData.totalResults,
      page: this.state.page + 1,
    });
  };
  render() {
    return (
      <div>
        <div className="container my-3">
          <h2 className="text-center">
            {console.log(this.props.apiKey)}
            {this.capitalizeFirstLetter(this.props.category)} Related News
          </h2>
          <InfiniteScroll
            dataLength={this.state.article.length}
            next={this.fetchMoreData}
            hasMore={this.state.article !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="row">
              {this.state.article.map((element) => {
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
}

export default News;
