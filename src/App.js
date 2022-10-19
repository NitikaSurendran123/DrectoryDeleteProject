import React, { useState, useEffect, useRef } from 'react';
import axios, { Axios } from 'axios';
import './App.css'
import api from './api/projects';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';

import "mdb-react-ui-kit/dist/css/mdb.min.css";



function App() {
  const action = useRef(null);
   const [comments, setComments] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
  const [data, setData] = useState([]);


 

  //fetch data
  const loadUserData = async () => {
    console.log("loadUsr")
    
    return await axios.get("http://localhost:3000/disks")
     // .then((response) => setData(response.data))
      .then((res) => {
        setData(res.data)
       
       
    })
      .catch((err) => console.log(err));
  };
  console.log("data", data)

  useEffect(() => {
    loadUserData();
  }, []);
  



//   const handleDelete = async (disk_name) => {
// console.log('disk_name',disk_name)
//     await axios.delete(`http://localhost:3000/disks/${disk_name}`)
    
//     .then(() => {
//       loadUserData()
//       window.location.reload();
//   })
   
  

   
//   };
  // const handleException = async (id) => {
  //   // console.log('id',id)
  //   //     await axios.get("http://localhost:3000/disks")
        
  //   //     .then(() => {
  //   //       loadUserData()
  //   //       window.location.reload();
  //   //   })
  //   fetch('https://myapi.com', 
  //   { method: 'POST',
  //    headers: { accept: 'application/json', 
  //    body: JSON.stringify({ message: 'Hello World!' }) 
  //   } })
      
    
       
  //     };
 
  const url = `http://192.168.2.158/api/namespaces/nitikaone/tree/nitikatwo?op=wait` ;
  

  // function postJourney(data) {

    
  //   return fetch(
  //     url,
  //     {
  //       method:'GET',
     
  //     })
  //     .then(response => response.json())
      
         
  // }
 const  actionButton = () => {
  
   
    if(action =="DELETE" || "EXCEPTION")
    fetch(url, {
        method: 'POST',
        headers: new Headers(),
        body: JSON.stringify({ body: "DELETE" })
    }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
};
 useEffect(() => {
    setLoading(false);
    loadUserData();
  }, []);





  return (
    <MDBContainer>
      <div style={{ marginTop: "100px" }}>
        <h2 className="text-center"> Deleting Records Fetch </h2>

        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col"> ID </th>
                  <th scope="col"> project</th>
                  <th scope="col"> disk_name</th>
                  <th scope="col"> disk_size</th>
                </tr>

              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">No Data Found</td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, id) => (
                  <MDBTableBody key={id}>
                    <tr>
                      <th scope="row"> {id + 1}</th>
                      <td>{item.project}</td>
                      <td>{item.disk_name}</td>
                      <td>{item.disk_size}</td>
                      <td style={{ border: '1px solid black' }}> <button onClick={() => {actionButton(data);}} className="btn btn-danger btn-sm"> DELETE</button></td>
                      <td style={{ border: '1px solid black' }}> <button onClick={() => {actionButton(data);}} className="btn btn-success"> EXCEPTION</button></td>
                    </tr>



                  </MDBTableBody>
                ))
              )}
            </MDBTable>

          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

