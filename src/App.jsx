import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CvDetails from './pages/CvDetails.jsx';
import CreateCv from './pages/CreateCv.jsx';
import EditCv from './pages/EditCv.jsx';
import MyCVs from './pages/MyCVs.jsx';

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
                        <Route path="/cv/:id" element={<CvDetails />} />
                        <Route path="/my-cvs" element={<MyCVs />} />
                        <Route path="/create-cv" element={<CreateCv />} />
                        <Route path="/edit-cv/:id" element={<EditCv />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<div>404 - Not Found</div>} />
                    </Routes>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

export default App;
