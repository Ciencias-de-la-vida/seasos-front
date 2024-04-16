import React from 'react'
import { Nav } from 'react-bootstrap';

export const Sidebar = () => {
    return (
        <>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar text-center"
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
            </Nav>
          
        </>
        );
}
