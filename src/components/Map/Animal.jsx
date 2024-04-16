import { Sidebar } from 'components/Nav/Sidebar'
import React from 'react'
import { useParams } from 'react-router-dom';

export const Animal = () => {
  // const { id } = useParams();
  // console.log(id)
  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10" >
          <div className="container mt-5">
              <div className="d-flex align-items-center justify-content-center">
                <div className="animal-image">
                  <img src="https://static.nationalgeographic.es/files/styles/image_3200/public/21574.600x450.jpg?w=1900&h=1425" alt="..." />
                </div>
                </div>
                <div className="">
                  <h2 className="mt-4" style={{ color: 'black', fontSize: "25px", fontWeight: "bold", textAlign: "center" }}>Foca</h2>
                  <p className="mt-1" style={{ color: 'black', fontSize: "15px", fontWeight: "bold", textAlign: "center" }}>
                  Phocidae
                  </p>
                  <p className="mt-2" style={{color: 'black', fontSize: "15px", textAlign: "center", width:"100ch", marginLeft: "10%" }}>Los fócidos o focas verdaderas (Phocidae) son una familia de mamíferos pinnípedos adaptados a vivir en medios acuáticos la mayor parte del tiempo. El nombre común deriva directamente del latín phoca, que a su vez tiene su origen en el griego φώκη (phṓkē).
                  Se conocen 33 especies. Carecen de pabellón auditivo y sus extremidades posteriores están dirigidas hacia atrás y no son funcionales en el desplazamiento terrestre, característica que los diferencia de los otáridos (lobos y osos marinos).</p>
                </div>
            </div>
          </div>
        </div>
      </>
      )
}
