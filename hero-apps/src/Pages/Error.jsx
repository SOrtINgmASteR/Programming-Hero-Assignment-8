import React, { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import error_404 from '../assets/error-404.png';

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            console.error('Routing error captured by Error boundary:', error);
        }
    }, [error]);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }
        navigate('/');
    };

    return (
        <>
            <Navbar></Navbar>
            <section className="flex flex-col gap-3 items-center bg-white m-20 p-5">
            <img src={error_404} alt="404 Error" />
            <h1 className="text-3xl font-bold text-gray-800">Oops, page not found!</h1>
            <p className="text-gray-600 mb-4">The page you are looking for is not available.</p>
            <button type="button" className="btn btn-primary" onClick={handleBack}>
                Go Back
            </button>
            </section>
            <Footer></Footer>
        </>
    );
};

export default Error;