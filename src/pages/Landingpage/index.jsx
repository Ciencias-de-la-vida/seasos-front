import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Img, Text, Heading } from "../../components";
import { Link } from "react-router-dom";
import { Counters } from "pages/Counters";
import { Animals } from "pages/Animals";
import { NavbarLanding } from "pages/Nav";
import { Contact } from "pages/Contact";
import { Reference } from "pages/Reference";


export default function LandingpagePage() {
  return (
    <>
      <Helmet>
        <title>Landing</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="md:container md:mx-0 h-screen" id="containerLanding">
        <div className="h-screen w-full bg-white-A700 relative" id="home">
          <Img
            src="images/img_pexels_pixabay_64219.png"
            alt="pexelspixabay"
            className="justify-center h-screen w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute"
            style={{overflow: "hidden"}}
          />
          <NavbarLanding/>
          <div className="flex flex-row justify-center w-full h-full pl-[69px] pr-14 left-0 bottom-0 right-0 top-0 py-[69px] md:m-auto bg-black-900_59 absolute">
            <div className="flex flex-col items-start justify-start w-full ml-6 max-w-[1247px] mt-12 ">

              <div className="h-px w-full  ml-[5px] mt-[5%]" />
              <Heading size="md" as="h2" className="w-[50%] ml-[3px]" id="titleLanding">
                El Tesoro de <br />la Vida Marina
              </Heading>
              <Text size="s" as="p" className="w-[43%] ml-[7px] z-[1]" id="textLanding">
                Sumérgete en el fascinante mundo de los océanos a través de nuestra plataforma dedicada a la conciencia, 
                conservación e información de la vida marina. 
              </Text>
              <a href="https://firebasestorage.googleapis.com/v0/b/seasos-ciencias.appspot.com/o/win-unpacked.rar?alt=media&token=fa4f0143-8aae-4fe7-b0d7-9d84decb4d38" download id="floating-button"> <i className="fa fa-download"></i> Descarga aquí nuestro proyecto</a>
              <div className="flex flex-row justify-between items-start w-[98%] mt-2 ml-[7px]">
                <Link to="/map" style={{ textDecoration: "none" }}>
                  <Button className="font-poppins min-w-[141px] mt-3" href="/map">Explora en el mapa</Button>
                </Link>
                <div className="flex flex-col items-center justify-start w-1/4 mt-[-15%]">
                  <div className="flex flex-row justify-center w-full" id="containerUnete">
                    <div className="flex flex-row justify-center w-full p-[21px] bg-gradient">
                      <div className="flex flex-col items-start justify-start w-[89 gap-1 mx-[13px]">
                        <Heading as="h3" className="!text-[18.73px]">
                          Unete
                        </Heading>
                        <Text as="p">
                          Forma parte y ayudanos a recopilar mucha más información de las especies marinas en peligro de extinción
                        </Text>
                      </div>
                    </div>
                  </div>

                  <Link to="/login" style={{ textDecoration: "none" }} id="btnParticipa">
                    <Button
                      size="sm"
                      rightIcon={<Img src="images/img_group_4.svg" alt="Group 4" />}
                      className="w-full gap-[15px] mt-[-02%]"
                    >
                      Registrate Aquí
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full max-w-[100%] pb-12"  id='datos' style={{ backgroundColor: "#0a2747" }}>
          <div className="h-px w-full mt-4" />
          <Heading size="md" as="h2" className="w-[100%] text-center" id="titles">
            Datos Recopilados
          </Heading>
          <div className="flex justify-center gap-20 mt-2 ms-auto mx-auto">
            <Counters />
          </div>
        </div>
        <div className="row mt-4 mb-3" id='rowAnimals'>
            <Heading size="md" as="h2" className="w-[100%] text-center text-black" id="titles">
              Especies Marinas Registradas
            </Heading>
          </div>
        <div className='container mb-3' id='animals'>
          <Animals />
        </div>
        <div className='mb-3 w-full max-w-[100%] pb-12' id='contact' style={{ backgroundColor: "#0a2747" }}>
          <Contact />
        </div>
        <div className='mb-3 w-full max-w-[100%] pb-12 pt-4' id='refes'>
        <Heading size="md" as="h2" className="w-full text-center text-black mb-2 mt-2" id="titles">
        Referencias
      </Heading>
          <Reference/>
        </div>
      </div>
    </>
  );
}




