import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import VideoComparator from './views/video-comparator';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={VideoComparator} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
