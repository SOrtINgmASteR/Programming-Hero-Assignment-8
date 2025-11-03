import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosMenu } from 'react-icons/io';
import { FaGithub } from 'react-icons/fa';
import logo from '../assets/logo.png';

const navLinkClasses = ({ isActive }) =>
    `px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
        isActive ? 'text-purple-600 text-decoration-line: underline' : 'text-black hover:text-purple-500'
    }`;

const Navbar = () => {
    const navigate = useNavigate();

    const linksOfNavbar = (
        <>
                <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
                <li><NavLink to="/apps" className={navLinkClasses}>Apps</NavLink></li>
                <li><NavLink to="/my-installations" className={navLinkClasses}>My Installation</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-white shadow-sm mx-auto rounded-b-md work-sans-font max-w-[1400px]">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <IoIosMenu className="h-5 w-5 text-black" />
                    </div>
                        <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
                            {linksOfNavbar}
                        </ul>
                </div>
                    <div className="flex items-center gap-2 hover:scale-110 cursor-pointer transition-transform duration-200" onClick={() => navigate('/') }>
                        <img src={logo} alt="HERO.IO" className="h-8" />
                        <span className="text-xl text-purple-600 font-bold">HERO.IO</span>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-black font-semibold gap-4">
                    {linksOfNavbar}
                </ul>
            </div>
            <div className="navbar-end flex items-center gap-3">
                <a
                    className="btn border-none bg-linear-to-r from-purple-500 via-violet-500 to-indigo-500 text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                    href="https://github.com/SOrtINgmASteR"
                    target="_blank"
                    rel="noreferrer">
                    <FaGithub className="h-5 w-5" />
                    Contribution
                </a>
            </div>
        </div>
    );
};

export default Navbar;