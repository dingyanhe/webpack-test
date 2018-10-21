import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink,
} from 'react-router-dom'


import '@/styles/reset.styl'
import '@/styles/App.styl'
import logo from '@/assets/images/logo.png'

import Recommend from './recommend/recommend'
import Rank from './rank/rank'
import Search from './search/search'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <header className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
            <h1 className="app-title">Mango Music</h1>
          </header>
          <div className="music-tab">
            <div className="tab-item">
                <NavLink to="/recommend" className="nav-link">
                    <span>推荐</span>
                </NavLink>
            </div>
            <div className="tab-item">
                <NavLink to="/rank" className="nav-link">
                    <span>排行榜</span>
                </NavLink>
            </div>
            <div className="tab-item">
                <NavLink to="/search" className="nav-link">
                    <span>搜索</span>
                </NavLink>
            </div>
          </div>
          <div className="music-view">
            {/*
              Switch组件用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示
              Redirect重定向到列表页
            */}
            <Switch>
              <Route path="/recommend" component={Recommend} />
              <Route path="/rank" component={Rank} />
              <Route path="/search" component={Search} />
              <Redirect from="/" to="/recommend" />
              <Route component={Recommend} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
