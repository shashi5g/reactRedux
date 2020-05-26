import React from 'react';
import {Switch,Route} from 'react-router'
import './App.css';
import AsyncRoute from './AsynRoute'




function App() {
  return (
    <Switch>
       <div className="app">
      <Route exact path="/" component={props => <AsyncRoute props={props} loadingPromise={import('./containers/CharacterList/CharactersList')} />} />
  
      <Route exact path="/search" component={props => <AsyncRoute props={props} loadingPromise={import('./containers/CharacterList/CharactersList')} />} />
      <Route
        path="/search/:name"
        component={(props) => {
          const {match} = props;
          debugger
          const selectedShow = match.params.name ;
          return (
            <AsyncRoute
              loadingPromise={import('./containers/Search/Search')}
              props={Object.assign({ selectedShow }, props)}
            />
          );
        }}
      />
      {/* <Route exact path="*" component={props => <AsyncRoute props={props} loadingPromise={import('./components/NoMatch/NoMatch')} />}/> */}
    </div>
     
    </Switch>
  );
}

export default App;
