// import React from 'react'
// import firebase from 'firebase/compat/app'; // Para usar Firebase versión 9 (v9) o superior
// import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase

// import Plotly from 'plotly.js-dist';

// // Configura Firebase (asegúrate de haber inicializado Firebase en tu proyecto)
// const firebaseConfig = {
//     apiKey: "AIzaSyAVBkiw1ILa7wGfmDRM_FoK0SopkU56EgM",
//     authDomain: "seasos-ciencias.firebaseapp.com",
//     projectId: "seasos-ciencias",
//     storageBucket: "seasos-ciencias.appspot.com",
//     messagingSenderId: "1083035773706",
//     appId: "1:1083035773706:web:b081fba6404690d68c28f3",
//     measurementId: "G-MP1J8627KH"
// };
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }
  
//   // Referencia a la base de datos de Firebase
//   const database = firebase.database();
  
//   // Función para obtener los datos de visitas de Firebase
//   const getVisitDataFromFirebase = async () => {
//     try {
//       const snapshot = await database.ref('visits').once('value');
//       return snapshot.val(); // Suponiendo que tus datos están almacenados bajo la referencia 'visits'
//     } catch (error) {
//       console.error('Error fetching visit data from Firebase:', error);
//       return null;
//     }
//   };
  
//   // Función para procesar los datos de visitas y agruparlos por día
//   const processVisitData = (visitData) => {
//     const visitsByDay = {};
//     visitData.forEach((visit) => {
//       const date = new Date(visit.timestamp); // Suponiendo que cada visita tiene un campo 'timestamp'
//       const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
//       visitsByDay[dayKey] = (visitsByDay[dayKey] || 0) + 1;
//     });
//     return visitsByDay;
//   };
  
//   // Función para crear la gráfica lineal
//   const createLineChart = (visitData) => {
//     const visitsByDay = processVisitData(visitData);
//     const days = Object.keys(visitsByDay);
//     const visits = Object.values(visitsByDay);
  
//     const data = [{
//       x: days,
//       y: visits,
//       type: 'scatter',
//       mode: 'lines+markers',
//       name: 'Visitas por Día'
//     }];
  
//     const layout = {
//       title: 'Visitas a la Página por Día',
//       xaxis: {
//         title: 'Día'
//       },
//       yaxis: {
//         title: 'Número de Visitas'
//       }
//     };
  
//     return { data, layout };
//   };
  
//   // Obtener los datos de visitas de Firebase y crear la gráfica
//   export const getLineChartFromFirebase = async () => {
//     const visitData = await getVisitDataFromFirebase();
//     if (visitData) {
//       return createLineChart(visitData);
//     }
//     return null;
//   };

