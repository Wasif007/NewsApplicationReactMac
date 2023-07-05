import "./App.css";

import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export class App extends Component {
  state={
    progress:0
  }
 setProgress=(progress)=>{
  this.setState({
    progress:progress
  })
 }

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
        
      />
          <Routes>
            <Route
              path="/"
              element={
                <News setProgress={this.setProgress}
                  exact
                  key="general"
                  pageSize={10}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              path="/business"
              element={
                <News setProgress={this.setProgress}
                  exact
                  key="business"
                  pageSize={10}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News setProgress={this.setProgress}
                  exact
                  key="entertainment"
                  pageSize={10}
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              path="/general"
              element={
                <News setProgress={this.setProgress}
                  exact
                  key="general"
                  pageSize={10}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              path="/health"
              element={
                <News setProgress={this.setProgress}
                  exact
                  key="health"
                  pageSize={10}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              path="/science"
              element={
                <News setProgress={this.setProgress}
                  exact
                  key="science"
                  pageSize={10}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News setProgress={this.setProgress}
                  exact
                  key="sports"
                  pageSize={10}
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News setProgress={this.setProgress}
                  exact
                  key="technology"
                  pageSize={10}
                  country="in"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
