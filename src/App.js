import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Layout from './layouts/main';
import VideoComparator from './views/video-comparator';
import Dashboard from './views/dashboard';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/cam" component={VideoComparator} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
