import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './globalState'
import Header from './Components/Header/Header'
import MainPages from './Components/MainPages/MainPages'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <MainPages/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
