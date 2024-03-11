import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ClimaInfo } from './interface/ClimaInfo';
import { Infoclima } from './interface/InfoClima';
import { InfoPais } from './interface/InfoPais';


export const Clima = () => {

  const [selectedCountry, setSelectedCountry] = useState<number>(2172797); // ID predeterminado

  const [climadata, setClimadata] = useState<Infoclima>();

  const infoPaises: InfoPais[] = [{nombre: "Australia", id: 2172797 },{nombre: "España", id: 2510769},{nombre: "Francia", id: 2988507 }, {nombre: "Japon", id: 1850147 }]

  useEffect(() => {
    const obtenerInfo = async () => {
      try {
        const climaInfo = await axios.get<ClimaInfo>(`https://api.openweathermap.org/data/2.5/weather?id=${selectedCountry}&appid=d083dc46b2e9666c356ea88122e10ba1`);
        setClimadata({
          temp: climaInfo.data.main.temp,
          humidity: climaInfo.data.main.humidity,
          visibility: climaInfo.data.visibility,
          description: climaInfo.data.weather[0].description
                })
        console.log('Información del clima:', climaInfo.data);
        console.log('Temperatura:', climaInfo.data.main.temp);
        console.log('Humedad:', climaInfo.data.main.humidity);
        console.log('visibilidad',climaInfo.data.visibility);
        console.log('Descripción del clima:', climaInfo.data.weather[0].description);
        
      } catch (error) {
        console.error('Error al obtener información del clima:', error);
      }
    };

    obtenerInfo();
  }, [selectedCountry]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(Number(event.target.value));
  };
  return (
    <div>
    <div>
      <h2>Selecciona un país:</h2>
      <select value={selectedCountry} onChange={handleCountryChange}>
       {infoPaises.map(infoPais => {
        return (
          <option value={infoPais.id}>{infoPais.nombre}</option>
        )
       })}
      </select>


    </div>
    <div>
    <h2>Información del clima:</h2>
    <p>Temperatura: {climadata?.temp}°C</p>
    <p>Humedad: {climadata?.humidity}%</p>
    <p>Visibilidad: {climadata?.visibility} metros</p>
    <p>Descripcion: {climadata?.description}</p>
  </div>
  </div>
  );
};


