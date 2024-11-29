import React, { useContext } from 'react';
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
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import MyProfile from './pages/MyProfile.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import ListCV from './pages/ListCV.jsx';
import { ThemeContext } from './context/ThemeContext.jsx';

function App() {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={classNames('w-100 min-vh-100 bg-light text-dark', {
                'bg-dark text-white': theme === 'dark',
                'bg-light text-dark': theme === 'light'
            })}
        >
            <div className="row">
                <Header />
            </div>
            <div className="p-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/CVs" element={<ListCV />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected routes */}
                    <Route
                        path="/cv/:id"
                        element={
                            <ProtectedRoute>
                                <CvDetails />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/create-cv"
                        element={
                            <ProtectedRoute>
                                <CreateCv />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/edit-cv/:id"
                        element={
                            <ProtectedRoute>
                                <EditCv />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/my-cvs"
                        element={
                            <ProtectedRoute>
                                <MyCVs />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <MyProfile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/edit-password"
                        element={
                            <ProtectedRoute>
                                <ChangePassword />
                            </ProtectedRoute>
                        }
                    />

                    {/*404*/}
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                <ToastContainer />
            </div>
        </div>
    );
}

export default App;
