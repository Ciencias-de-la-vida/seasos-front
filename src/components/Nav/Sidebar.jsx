import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';
import logo from "../../assets/images/logo.png";
import logoWhite from "../../assets/images/logoWhite.png";

import { Heading } from '..';
import { Switch } from '@nextui-org/react';

const navItems = ['Mapa', 'HeatMap', 'Sugiere', 'Home'];
const navItemsAdmin = ['Usuarios', 'Animales', 'Home'];
const navLinks = ['/map', '/heatmap', '/form', '/'];
const navLinksAdmin = ['/userT', '/animalT', '/'];
const navIcons = ['fa fa-map mx-2', 'fa fa-fire mx-2', 'fa fa-fish mx-2', 'fa fa-home mx-2'];
const navIconsAdmin = ['fa fa-user mx-2', 'fa fa-fish mx-2', 'fa fa-home mx-2'];
const textLightClass = 'text-white';
const textDarkClass = 'text-black';


export const Sidebar = ({ onToggleDarkMode }) => {
    const isLogged = localStorage.getItem('isLogged');
    const [isOpen, setIsOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkMode') === 'true'
    );

    const handleHomeClick = (item) => {
        if (isLogged && item === 'Home') {
            localStorage.clear();
        }
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode); // Actualiza localStorage
        
    };

    useEffect(() => {
        onToggleDarkMode(darkMode); // Llama a la función de cambio de modo oscuro
    }, [darkMode, onToggleDarkMode]);

    return (
        <aside className={`sidebarPr ${isOpen ? 'open' : ''} ${!darkMode ? 'bg-white' : 'bg-black'}`}>
            <div className='inner'>
                <header>
                    <button type='button' className='sidebar-burger' onClick={() => setIsOpen(!isOpen)}>
                        <span className='icon'>
                            {isOpen ? (
                                <div className='d-flex'>
                                    <img src={darkMode ? logoWhite : logo} alt="" className='mx-[1vh] mt-3' style={{ width: "45px", height: "45px" }} />
                                    <Heading size="xs" as="h2" className={`mt-4 w-[20%] text-center ${darkMode ? textLightClass : textDarkClass} mb-2`}>
                                        SEASOS
                                    </Heading>
                                </div>
                            ) : (
                                <img src={darkMode ? logoWhite : logo} alt="" className='mx-[1vh]' style={{ width: "45px", height: "45px" }} />
                            )}
                        </span>
                    </button>
                </header>
                <nav>
                    {isLogged ? (
                        navItemsAdmin.map((item, index) => (
                            <Link to={navLinksAdmin[index]} className={`button-link mt-5 ${window.location.pathname === navLinksAdmin[index] ? 'selected' : ''}`} key={item}>
                                <button type='button' onClick={() => handleHomeClick(item)}>
                                    <span className='icon'>
                                        <i className={`${navIconsAdmin[index]} ${darkMode ? textLightClass : textDarkClass} mx-[1vh]`}></i>
                                    </span>
                                    {isOpen && <span className={darkMode ? textLightClass : textDarkClass} style={{ fontSize: "18px" }}> {item} </span>}
                                </button>
                            </Link>
                        ))
                    ) : (
                        navItems.map((item, index) => (
                            <Link to={navLinks[index]} className={`button-link mt-5 ${window.location.pathname === navLinks[index] ? 'selected' : ''}`} key={item}>
                                <button type='button' onClick={() => handleHomeClick(item)} style={{ fontSize: "16px" }}>
                                    <span className='icon'>
                                        <i className={`${navIcons[index]} ${darkMode ? textLightClass : textDarkClass} mx-[1vh]`}></i>
                                    </span>
                                    {isOpen && <span className={darkMode ? textLightClass : textDarkClass}> {item} </span>}
                                </button>
                            </Link>
                        ))
                    )}

                </nav>
                <div className="bottom-section mt-[12vh]">
    <div className="dark-mode-container mx-3">
        {isOpen ? (
            <div className='d-flex'>
                <i className={`fa fa-moon mx-2 ${darkMode ? textLightClass : textDarkClass}`}></i>
                <span className={`mt-[-0.5vh] ${darkMode ? textLightClass : textDarkClass}`}>Dark</span>
                <Switch
                    className='mx-3 mt-[-0.7vh]'
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    isSelected={darkMode}
                />
            </div>
        ) : (
            <>
                <i className={`fa fa-moon mx-[1vh] ${darkMode ? textLightClass : textDarkClass}`}></i>
                <Switch
                    className='mx-[-1.5vh] mt-[1vh]'
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    isSelected={darkMode}
                    style={{ transform: 'scale(0.6)' }}
                />
            </>
        )}
    </div>
</div>

            </div>
        </aside>
    );
};
