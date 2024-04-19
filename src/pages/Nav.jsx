import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { Heading, Img } from 'components';
import { Link as ScrollLink } from 'react-scroll';

export const NavbarLanding = () => {
  return (
    <Navbar id='navbarLanding'>
      <NavbarBrand>
        <Img src="images/img_1_1.png" alt="Brand Logo" className="h-12 w-12 mr-2" style={{marginLeft: "-18%"}} />
        <Heading size="sm" as="h3" className="font-bold text-white mt-2">
          SEASOS
        </Heading>
      </NavbarBrand>
      <NavbarContent justify='end' className="sm:hidden gap-16 mt-2">
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
      </NavbarContent>
    </Navbar>
  );
};
