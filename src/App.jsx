import React, {Fragment} from 'react';
import Routes from './routes';
import { Header } from './components';
import './App.css';

function App() {
  return (
    <Fragment>
      <Header title='Portfolio Manager' />
      <Routes/>
    </Fragment>
  );
}

export default App;
