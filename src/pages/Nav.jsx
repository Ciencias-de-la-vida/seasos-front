import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { Heading, Img } from 'components';
import { Link as ScrollLink } from 'react-scroll';
import img from "../assets/images/LogoWhite.png"

export const NavbarLanding = () => {
  return (
    <Navbar id='navbarLanding' className="flex-wrap">
      <NavbarBrand className="flex items-center">
        <Img src={img} alt="Brand Logo" className="h-12 w-12 mr-2 mt-1" />
        <Heading size="sm" as="h3" className="font-bold text-white mt-3" style={{fontSize: "25px"}}>
          SEASOS
        </Heading>
      </NavbarBrand>
      <NavbarContent justify='end' className="sm:hidden gap-5 mt-3">
        <NavbarItem>
          <ScrollLink to="home" spy={true} smooth={true} duration={500} className="text-white" style={{textDecoration: "none", fontWeight:"bold", fontSize: "20px", cursor: "pointer"}}>
            Inicio
          </ScrollLink>
        </NavbarItem>
        <NavbarItem>
          <ScrollLink to="datos" spy={true} smooth={true} duration={500} className="text-white" style={{textDecoration: "none", fontWeight:"bold", fontSize: "20px", cursor: "pointer"}}>
            Datos
          </ScrollLink>
        </NavbarItem>
        <NavbarItem>
          <ScrollLink to="animals" spy={true} smooth={true} duration={500} className="text-white" style={{textDecoration: "none", fontWeight:"bold", fontSize: "20px", cursor: "pointer"}}>
            Animales
          </ScrollLink>
        </NavbarItem>
        <NavbarItem>
          <ScrollLink to="contact" spy={true} smooth={true} duration={500} className="text-white" style={{textDecoration: "none", fontWeight:"bold", fontSize: "20px", cursor: "pointer"}}>
            Contacto
          </ScrollLink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
