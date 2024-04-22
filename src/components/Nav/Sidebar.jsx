import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';
import logo from "../../assets/images/logo.png";
import { Heading } from '..';
import { Switch } from '@nextui-org/react';

const navItems = ['Mapa', 'HeatMap', 'Sugiere', 'Home'];
const navItemsAdmin = ['Usuarios', 'Animales', 'Home'];
const navLinks = ['/map', '/heatmap', '/form', '/'];
const navLinksAdmin = ['/userT', '/animalT', '/'];
const navIcons = ['fa fa-map mx-2', 'fa fa-fire mx-2', 'fa fa-fish mx-2', 'fa fa-home mx-2'];
const navIconsAdmin = ['fa fa-user mx-2', 'fa fa-fish mx-2', 'fa fa-home mx-2'];

export const Sidebar = ( { onToggleDarkMode } ) => {
    const isLogged = localStorage.getItem('isLogged');
    const [isOpen, setIsOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    
    const handleHomeClick = (item) => {
        if (isLogged && item === 'Home') {
            localStorage.clear();
        }
    };

    const toggleDarkMode = () => {
          setDarkMode(!darkMode);
          onToggleDarkMode(!darkMode);
      };

    return (
        <>
            <aside className={`sidebarPr ${isOpen ? 'open' : ''}`}>
                <div className='inner'>
                    <header>
                        <button type='button' className='sidebar-burger' onClick={() => setIsOpen(!isOpen)}>
                            <span className='icon'>
                                {isOpen ? <div className='d-flex'><img src={logo} alt="" className='mx-2 mt-3' style={{width: "45px", height: "45px"}} /> <Heading size="xs" as="h2" className="mt-4  w-[20%] text-center text-black mb-2">
                                   SEASOS
                                </Heading> </div> : <img src={logo} alt="" className='mx-2' style={{width: "45px", height: "45px"}}/>}
                            </span>
                        </button>
                    </header>
                    <nav>
                        {isLogged ? (
                            navItemsAdmin.map((item, index) => (
                                <Link to={navLinksAdmin[index]} className={`button-link mt-5 ${window.location.pathname === navLinksAdmin[index] ? 'selected' : ''}`} key={item}>
                                    <button type='button' onClick={() => handleHomeClick(item)}>
                                        <span className='icon'>
                                            <i className={navIconsAdmin[index]}></i>
                                        </span>
                                        {isOpen && <span style={{fontSize: "18px"}}> {item} </span>}
                                    </button>
                                </Link>
                            ))
                        ) : (
                            navItems.map((item, index) => (
                                <Link to={navLinks[index]} className={`button-link mt-5 ${window.location.pathname === navLinks[index] ? 'selected' : ''}`} key={item}>
                                    <button type='button' onClick={() => handleHomeClick(item)} style={{fontSize: "16px"}}>
                                        <span className='icon'>
                                            <i className={navIcons[index]}></i>
                                        </span>
                                        {isOpen && <span> {item} </span>}
                                    </button>
                                </Link>
                            ))
                        )}
                        
                    </nav>
                    <div className="bottom-section mt-[12vh]">
                        <div className="dark-mode-container mx-3">
                            {isOpen ? <div className='d-flex '><i className="fa fa-moon mx-2"></i>
                            <span className="mt-[-0.5vh]">Dark</span> <Switch className='mx-3 mt-[-0.7vh]'  checked={darkMode}  onChange={()=>{toggleDarkMode()}}/></div> : <i className="fa fa-moon mx-2"></i>}
                            
                            
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
