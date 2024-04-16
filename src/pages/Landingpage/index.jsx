import React from "react";
import { Helmet } from "react-helmet";
import { Button, Img, Text, Heading } from "../../components";
import { Link } from "react-router-dom";

export default function LandingpagePage() {
  return (
    <>
      <Helmet>
        <title>Landing</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="h-[900px] w-full bg-white-A700 relative">
        <Img
          src="images/img_pexels_pixabay_64219.png"
          alt="pexelspixabay"
          className="justify-center h-[900px] w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute"
        />
        <div className="flex flex-row justify-center w-full h-full pl-[69px] pr-14 left-0 bottom-0 right-0 top-0 py-[69px] m-auto bg-black-900_59 absolute">
          <div className="flex flex-col items-start justify-start w-full ml-6 max-w-[1247px]">
            <div className="flex flex-row justify-start items-center gap-[3px]">
              <Img src="images/img_1_1.png" alt="image" className="w-2/5 object-cover" />
              <Heading size="s" as="h1" className="!font-poppins">
                SeaSOS
              </Heading>
            </div>
            <div className="h-px w-full mt-[9px] ml-[7px] bg-white-A700" />
            <Heading size="md" as="h2" className="w-[44%] mt-44 ml-[3px]">
              El Tesoro de la Vida Marina
            </Heading>
            <Text size="s" as="p" className="w-[43%] ml-[7px] z-[1]">
              Sumérgete en el fascinante mundo de los océanos a través de nuestra plataforma dedicada a la conciencia y
              conservación de la vida marina.
            </Text>
            <div className="flex flex-row justify-between items-start w-[98%] mt-[-2px] ml-[7px]">
            <Link to="/map" style={{textDecoration:"none"}}>
              <Button className="font-poppins min-w-[141px] mt-3" href="/map">Explora en el mapa</Button>
              </Link>
              <div className="flex flex-col items-center justify-start w-1/4 mt-[-50px]">
                <div className="flex flex-row justify-center w-full">
                  <div className="flex flex-row justify-center w-full p-[21px] bg-gradient">
                    <div className="flex flex-col items-start justify-start w-[89%] mb-0.5 gap-1 mx-[13px]">
                      <Heading as="h3" className="!text-[18.73px]">
                        Unete
                      </Heading>
                      <Text as="p">
                        Forma parte de este gran proyecto para proteger la vida marina por medio de herramientas web y
                        tecnologías digitales.
                      </Text>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  rightIcon={<Img src="images/img_group_4.svg" alt="Group 4" />}
                  className="w-full gap-[15px]"
                >
                  Participa Aquí
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
