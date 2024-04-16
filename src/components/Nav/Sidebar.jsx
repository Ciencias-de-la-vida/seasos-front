import React from 'react'
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

import "../../styles/sidebar.css";

const navItems = [ "Mapa", "Mapa de calor", "Sugerir especie", "Home"]
const navItemsAdmin = ["Usuarios", "Animales", "Home"]
const navLinks = ["/map", "/heatmap", "/form", "/"]
const navLinksAdmin = ["/userT", "/animalT", "/"]
const navIcons = ["fa fa-map", "fa fa-fire", "fa fa-fish", "fa fa-home"];
const navIconsAdmin = ["fa fa-user", "fa fa-fish" ,"fa fa-home"];
export const Sidebar = () => {
    const isLogged = localStorage.getItem("isLogged")
    const [isOpen, setIsOpen] = useState(true)
    return (
        <>
            {/* <Nav className="col-md-12 d-none d-md-block bg-light sidebar text-center"
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item className='mt-5'>
                <Nav.Link href="/heatmap" style={{textDecoration: "none"}}> <i className="fa fa-map mx-2"></i>Mapa de Calor</Nav.Link>
            </Nav.Item>
            <Nav.Item className='mt-5'>
                <Nav.Link href="/form" style={{textDecoration: "none"}}><i className="fa fa-dog mx-2"></i>Formulario</Nav.Link>
            </Nav.Item>
            <Nav.Item className='mt-5'>
                <Nav.Link href="/" style={{textDecoration: "none"}}><i className="fa fa-home mx-2"></i>Regresar</Nav.Link>
            </Nav.Item>
            </Nav> */}
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
                    <span className='buscar'>

                    <i className="fa fa-search"></i>
                   {isOpen && <input type="text" placeholder="Buscar" className="w-24 bg-sky-200 rounded-lg focus:ring-2 focus:ring-blue-500  " />}
                    </span>
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
                                <Link to={navLinks[index]} className="button-link" >
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
