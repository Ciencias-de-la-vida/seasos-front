import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";

import "../../styles/sidebar.css";

const navItems = [ "Mapa", "Mapa de calor", "Sugerir especie", "Home"]
const navItemsAdmin = ["Usuarios", "Animales", "Home"]
const navLinks = ["/map", "/heatmap", "/form", "/"]
const navLinksAdmin = ["/userT", "/animalT", "/"]
const navIcons = ["fa fa-map mx-1", "fa fa-fire mx-1", "fa fa-fish mx-1", "fa fa-home mx-1"];
const navIconsAdmin = ["fa fa-user mx-1", "fa fa-fish mx-1" ,"fa fa-home mx-1"];
export const Sidebar = () => {
    const isLogged = localStorage.getItem("isLogged")
    const [isOpen, setIsOpen] = useState(true)
    return (
        <>
            <aside className= {`sidebarPr ${isOpen ? "open" : ""}`}>
                <div className='inner'>
                    <header>
                        <button type='button' className='sidebar-burger' onClick={() => setIsOpen(!isOpen)}>
                            <span className='icon'>
                                {isOpen ? <i className='fa fa-chevron-left'></i> : <i className='fa fa-bars'></i>}
                            </span>
                        </button>
                        
                        </header>
                    <nav>
                        {isLogged ? 
                            navItemsAdmin.map((item,index) => (
                                <Link to={navLinksAdmin[index]} className="button-link" >
                                <button key ={item} type="button">
                                    <span className='icon'>
                                       <i className={navIconsAdmin[index]}></i>
                                    
                                    </span>
                                    {isOpen && <span> {item} </span>}
                                </button>
                                </Link>
                            ))
                        : 
                            navItems.map((item,index) => (
                                <Link to={navLinks[index]} className="button-link mt-5" >
                                <button key ={item} type="button">
                                    <span className='icon'>
                                    <i className={navIcons[index]}></i>
                                    
                                    </span>
                                    {isOpen && <span> {item} </span>}
                                </button>
                                </Link>
                            ))
                        }
                    </nav>
                </div>
            </aside>

          
        </>
        );
}
