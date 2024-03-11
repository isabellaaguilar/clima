// import axios, { AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios';
// import React, { useEffect, useState } from 'react';

// interface AxiosResponse<T = any, D = any> {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
//   config: InternalAxiosRequestConfig<D>;
//   request?: any;
// }

// interface climapropiedades{
//   data: AxiosResponse[];
// }


// export const Clima = () => {

//   const [climadata, setClimadata] = useState<climapropiedades[]>([])


//   useEffect(() => {
//     const obtenerInfo = async () => {
//       try {
//         const climaInfo = await axios.get('https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=d083dc46b2e9666c356ea88122e10ba1');
//         const climapropiedades: climapropiedades[] = [];
//         await Promise.all(climaInfo.data.map(async (clima: { "": string; })=> {
//           const dataclima = await axios.get<climapropiedades>(clima[''])
//           console.log(dataclima)
//         }))
//         // console.log(climaInfo.data);
//       } catch (error) {
//         console.error('Error al obtener información del clima:', error);
//       }
//     };

//     obtenerInfo(); // Aquí se llama a la función para que se ejecute al montar el componente
//   }, []); // Se pasa un array vacío para que se ejecute solo una vez al montar el componente

//   return (
//     <div>
        
//       {/* Aquí va el contenido de tu componente */}
//     </div>
//   );
// };
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ClimaInfo {
  main: {
    temp: number;
    humidity: number;
   
  };
  weather: {
    description: string;
  }[];
  visibility: number;
}

interface Infoclima{
  temp: number;
  humidity: number;
  visibility: number;
}

export const Clima = () => {

  const [climadata, setClimadata] = useState<Infoclima>();

  useEffect(() => {
    const obtenerInfo = async () => {
      try {
        const climaInfo = await axios.get<ClimaInfo>('https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=d083dc46b2e9666c356ea88122e10ba1');
        setClimadata({
          temp: climaInfo.data.main.temp,
          humidity: climaInfo.data.main.humidity,
          visibility: climaInfo.data.visibility
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
  }, []);

  return (
    <div>
    <h2>Información del clima:</h2>
    <p>Temperatura: {climadata?.temp}°C</p>
    <p>Humedad: {climadata?.humidity}%</p>
    <p>Visibilidad: {climadata?.visibility} metros</p>
  </div>
  );
};


