import { Sidebar } from 'components/Nav/Sidebar';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiAnimals } from "./apiAnimals";
import "../../styles/animal.css";
import { Configuration, OpenAIApi } from "openai";
import { Heading } from 'components';

export const Animal = () => {
  const { id } = useParams();

  const [animal, setAnimal] = useState(null);
  const [result, setResult] = useState("");
  const [result2, setResult2] = useState([]);
  const [result3, setResult3] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = (newMode) => {
    setDarkMode(newMode);
  };

  const configuration = new Configuration({
    apiKey: "sk-proj-DKBrAd0IagEFGTrZzFy0T3BlbkFJ15QncAPeMvYMy836MI9x"
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await apiAnimals();
        const animalEncontrado = response1.find(animal => animal._id === id);
        setAnimal(animalEncontrado);

        const openai = new OpenAIApi(configuration);

        const prompt = `Dame la descripción de ${animalEncontrado?.nombre} que sea un párrafo de 4-5 líneas`;
        const prompt2 = `Dame 3 usos que se le da al ${animalEncontrado?.nombre} luego de cazarlo`;
        const prompt3 = `Dame un año aproximado para la extinción de este animal: ${animalEncontrado?.nombre} en dado caso se siga la caza continua y la desinformación; Solo quiero el plazo aproximado`;


        setLoading(true);

        const response = await openai.createCompletion({
          model: "gpt-3.5-turbo-instruct",
          prompt: prompt,
          temperature: 0.5,
          max_tokens: 1000,
        });
        setResult(response.data.choices[0].text);

        const response2 = await openai.createCompletion({
          model: "gpt-3.5-turbo-instruct",
          prompt: prompt2,
          temperature: 0.5,
          max_tokens: 1000,
        });

        const listItems = response2.data.choices[0].text.split('\n').filter(item => item.trim().length > 0);
        setResult2(listItems);

        const response3 = await openai.createCompletion({
          model: "gpt-3.5-turbo-instruct",
          prompt: prompt3,
          temperature: 0.5,
          max_tokens: 1000,
        });

        console.log(response3.data.choices[0].text)

        setResult3(response3.data.choices[0].text);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.response || error.message || error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='container mb-5'>
      <Sidebar onToggleDarkMode={handleToggleDarkMode} />
      <div className="row">
      <div className=""></div>
      <div className="col-md-12 d-flex align-items-center justify-content-center" >
        <div className="container mt-5 d-flex align-items-center justify-content-center">
            <div className="">
              <div className="animal-image">
                <img src={animal?.img} alt="..." />
              </div>
              </div>
              <div style={{marginLeft: "10%"}}>
                <h2 className="mt-4" style={{ color: 'black', fontSize: "35px", fontWeight: "900", textAlign: "center", width: "15ch" }}>{animal?.nombre}</h2>
                <p className="mt-2" style={{ color: 'gray', fontSize: "20px", fontWeight: "400", textAlign: "center",  }}>
                Cientifico: {animal?.cientifico}
                </p>
                <p className='mt-2' style={{ color: 'gray', fontSize: "15px", fontWeight: "400", textAlign: "center"}}>
                Region: {animal?.region}
                </p>
              </div>
          </div>
        </div>
        <div className="col-md-8 mt-5 text-center" style={{ marginLeft: "20%" }}>
          <section style={{ backgroundColor: !darkMode ? "#1589e2 ": "#0a2747", padding: "40px" }}>
            <Heading size="sm" as="h2" style={{ color: !darkMode ? "white" : "white", fontSize: "25px", fontWeight: "bold", textAlign: "center", marginTop: "10px" }}>
              Descripción
            </Heading>
            {loading ? ( // Mostramos el skeleton mientras carga
              <div className="animate-pulse p-4">
              <div className="bg-gray-300 h-3 w-100 mb-2"></div>
              <div className="bg-gray-300 h-3 w-100 mb-2"></div>
              <div className="bg-gray-300 h-3 w-100 mb-2"></div>
            </div>
            ) : (
              <p style={{ color: 'white', fontSize: "15px", fontWeight: "200", textAlign: "justify", marginTop: "10px" }}>
                {result}
              </p>
            )}
          </section>
        </div>
        
        <div className="col-md-8 mt-3 text-center" style={{ marginLeft: "20%" }}>
          <section style={{ backgroundColor: "#fff", padding: "20px" }}>
            <Heading size="sm" as="h2" className="text-dark" style={{ color: 'black', fontSize: "25px", fontWeight: "bold", textAlign: "center", marginTop: "10px" }}>
              Factores de riesgo
            </Heading>
            {loading ? ( // Mostramos el skeleton mientras carga
              <div className="animate-pulse p-4">
              <div className="bg-gray-300 h-3 w-100 mb-2"></div>
              <div className="bg-gray-300 h-3 w-100 mb-2"></div>
              <div className="bg-gray-300 h-3 w-100 mb-2"></div>
            </div>
            ) : (
              <>
                {result2 && result2.length > 0 ? (
                  <ul style={{ color: 'black', fontSize: "15px", fontWeight: "200", textAlign: "justify", marginTop: "10px", paddingLeft: "20px" }}>
                    {result2.map((item, index) => (
                      <li key={index} style={{ marginBottom: "10px" }}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: 'black', fontSize: "15px", fontWeight: "bold", textAlign: "justify", marginTop: "10px" }}>
                    No se encontraron usos específicos después de cazar este animal.
                  </p>
                )}
              </>
            )}
          </section>
        </div>
        <div className="col-md-8 mt-5 text-center" style={{ marginLeft: "20%" }}>
          <section style={{ backgroundColor: !darkMode ? "#81c4f8":"#0f3e6b", padding: "40px" }}>
            <Heading size="sm" as="h2" style={{ color: !darkMode ? "white" : "white", fontSize: "25px", fontWeight: "bold", textAlign: "center", marginTop: "10px" }}>
              Extinción (aproximado)
            </Heading>
            {loading ? ( // Mostramos el skeleton mientras carga
              <div className="animate-pulse p-4">
              <div className="bg-gray-300 h-3 w-100 mb-2"></div>
              <div className="bg-gray-300 h-3 w-100 mb-2"></div>
              <div className="bg-gray-300 h-3 w-100 mb-2"></div>
            </div>
            ) : (
              <p style={{ color: 'white', fontSize: "15px", fontWeight: "200", textAlign: "justify", marginTop: "10px" }}>
                {result3}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
