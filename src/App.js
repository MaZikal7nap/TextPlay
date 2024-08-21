import About from './component/About';
import Alert from './component/Alert';
import Navbar from './component/Navbar';
import TextForm from './component/TextForm';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null); 
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      showAlert("Dark Mode Has Been Enabled", "Success");
      document.body.style.backgroundColor = '#0b2d4e';
    } else {
      setMode('light');
      showAlert("Light Mode Has Been Enabled", "Success");
      document.body.style.backgroundColor = '#ffffff';
    }
  };

  return (
    <>
      <Router>
        <Navbar title="✎ TextPro " aboutText="About" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/about" element={<About mode = {mode} />} />
            <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Welcome To TextPro" mode={mode} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
