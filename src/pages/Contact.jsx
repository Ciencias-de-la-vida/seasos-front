import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'sonner';

export const Contact = () => {
  const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(form.current.name.value && form.current.email.value && form.current.message.value){
        emailjs.sendForm('service_hbizbz2', 'template_midch8e', form.current, 'IXWCW3BqKqG_Znre3')
        .then((result) => {
          toast.success("Se envio su mensaje" , {
            style: {
              padding: "20px"
            }
            
          });
          form.current.name.value = "";
          form.current.email.value= "";
          form.current.message.value = ""
        }, (error) => {
          console.log(error);
          toast.error("No se logro enviar su mensaje", { style: {
            padding: "20px"
          }});
      });
    }else{
      console.log("hola");
      toast.error("Llene todos los datos del formulario");
    }
    };

  


  return (
    <>
    <div className="container mb-2 pt-5">
    <Toaster className="mx-4" richColors expand={true} />
        <div className="row">
            <div className="col-12 col-md-7">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-2 mt-2">Contáctanos</h2>
        <p className="text-center text-blue-600 mb-8">¡Si tienes alguna duda acerca de nosotros!</p>
        <form className="space-y-4" ref={form} onSubmit={handleSubmit}>
          <div>
            <label className="block text-blue-800">Nombre</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500"  placeholder="Tu nombre" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required/>
          </div>
          <div>
            <label className="block text-blue-800">Correo Electrónico</label>
            <input type="email" className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500" placeholder="Tu correo electrónico" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required/>
          </div>
          <div>
            <label className="block text-blue-800">Mensaje</label>
            <textarea className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500" rows="4" placeholder="Tu mensaje"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300">Enviar</button>
        </form>
      </div>
      </div>
      <div className="col-12 col-md-5 mt-2">
      <img src="https://images.pexels.com/photos/3354346/pexels-photo-3354346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Imagen marina" className="rounded-lg shadow-lg" />
      </div>
      </div>
    </div>
    </>
  )
}
