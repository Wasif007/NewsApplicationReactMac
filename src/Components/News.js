import React, { Component } from "react";
import Newscomponent from "./Newscomponent";
import Spinner from "./Spinner";

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
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} CatNews-App`;
  }

  async updateData(value) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=232940725ff745df866efb9778420f11&page=${value}&pageSize=${this.props.pageSize}`
    );
    this.setState({
      loading: true,
    });
    const jsonData = await response.json();
    this.setState({
      article: jsonData.articles,
      totalResults: jsonData.totalResults,
      loading: false,
      page: value,
    });
  }
  async componentDidMount() {
    this.updateData(this.state.page);
  }
  functionNext = async () => {
    console.log(this.state.page);
    this.updateData(this.state.page + 1);
  };
  functionPrev = async () => {
    console.log(this.state.page);
    this.updateData(this.state.page - 1);
  };
  render() {
    return (
      <div>
        <div className="container my-3">
          <h2 className="text-center">{this.capitalizeFirstLetter(this.props.category)} Related News</h2>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading &&
              this.state.article.map((element) => {
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
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.functionPrev}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.functionNext}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
