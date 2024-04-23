import axios from 'axios';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';

export const Animals = () => {
    const [listaAnimales, setListaAnimales] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); 
    useEffect(() => {
        const getAnimals = async () => {
            try {
                const { data } = await axios.get('https://api-rest-python-six.vercel.app/get/animals');
                setListaAnimales(data);
            } catch (error) {
                console.log(error);
            }
        }
        getAnimals();
    }, []);

    return (
        <div>
            <MDBRow className="mb-4 mt-3" style={{ minHeight: "70vh" }}>
                {listaAnimales?.map((item, index) => (
                    <MDBCol key={index} lg={2} md={6} sm={6} xs={6} className='mb-4 mb-lg-2' id='containerAnimals'>
                        <div className="image-container">
                            <img
                                src={item.img}
                                className={`shadow-1-strong rounded mb-2`}
                                alt={`Image ${index}`}
                                style={{ objectFit: '', height: "25vh", width: "25vh" }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)} 
                                />
                                <div className="overlay">
                                    <p className='overlay-text' style={{width: "17ch"}}>{item.nombre}</p>
                                    <p className='overlay-text2'>{item.country}</p>
                                </div>
                        </div>
                    </MDBCol>
                ))}
            </MDBRow>
        </div>
    );
};
