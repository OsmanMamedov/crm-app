import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './style/App.scss';
import 'antd/dist/antd.css'
import { Helmet } from 'react-helmet'
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Authorization from './pages/Definition/Authorization'
import CustomerType from './pages/Definition/CustomerType'
import UserManagement from './pages/UserManagement'
import CompanySetting from './pages/CompanySetting'
import CustomerManagement from './pages/CustomerManagement'
import { isDarkType, isLightType } from './redux/action_types';

function App() {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.theme != null)
      dispatch({ type: localStorage.theme === "dark" ? isDarkType : isLightType });
    if (localStorage.lang != null)
      dispatch({ type: localStorage.lang })
  })

  console.log(theme)
  
  return (
    <>
      <Helmet>
        <html data-theme={localStorage.theme !== null ? localStorage.theme : theme} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
      </Helmet>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/home' exact component={Home} />
          <Route path='/calendar' component={Calendar} />
          <Route path='/user-management' component={UserManagement} />
          <Route path='/company-setting' component={CompanySetting} />
          <Route path='/customer-management' component={CustomerManagement} />
          <Route path='/definitions/customer-type' component={CustomerType} />
          <Route path='/definitions/authorization' component={Authorization} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
