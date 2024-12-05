import React from 'react';
import Router from './Components/router/index';
import './App.css'
import {AuthProvider} from './Context/MyContext';
function App() {
  return (
    <AuthProvider >
      <Router />
    </AuthProvider>
  );
}
export default App;
