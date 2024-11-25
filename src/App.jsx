import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
// import Welcome from "./pages/Welcome.jsx";
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';

function App() {
    return (
        <>
            <div
                className={classNames(
                    'w-100 vh-100 bg-light text-dark'
                    //   {
                    //     'bg-dark text-light': theme === 'dark',
                    //     'bg-light text-dark': theme === 'light'
                    // }
                )}
            >
                <div className="row">
                    <Header />
                </div>
                <div className="p-3">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route  path="/welcome" element={<Welcome />}/> */}
                    </Routes>
                </div>
            </div>
            ;
        </>
    );
}

export default App;
