import React,{useState, useEffect} from 'react';
import axios, { Axios } from 'axios';
import './App.css'
import api from './api/projects';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';

import "mdb-react-ui-kit/dist/css/mdb.min.css";

function App(){
    const[data, setData] = useState([]);

    useEffect(() => {
        loadUserData();
    }, []);
    //fetch data
    const loadUserData = async()=> {
       return await api.get("/disks")
       .then((response) => setData(response.data))
       .catch((err) => console.log(err));
    };
    console.log("data", data)

    const handleDelete = async (item)=> {
     
     await api.delete(`/disks/item`); 

   

      
    }
   
    return (
      <MDBContainer>
      <div style = {{marginTop: "100px"}}>
      <h2 className= "text-center"> Deleting Records Fetch </h2>
      
      <MDBRow>
        <MDBCol size ="12">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
              <th scope="col"> No. </th>
                <th scope="col"> project</th>
                <th scope="col"> disk_name</th>
                <th scope="col"> disk_size</th>
              </tr>

            </MDBTableHead>
            {data.length === 0 ? (
              <MDBTableBody className= "align-center mb-0">
                <tr>
                  <td colSpan = {8} className="text-center mb-0">No Data Found</td>
                </tr>
              </MDBTableBody>
            ):(
              data.map((item, index)=> (
                <MDBTableBody key={index}>
                  <tr>
                    <th scope = "row"> {index+1}</th>
                    <td>{item.project}</td>
                    <td>{item.disk_name}</td>
                    <td>{item.disk_size}</td>
                    <td style={{border: '1px solid black'}}> <button onClick={() => handleDelete(index)} className= "btn btn-danger btn-sm"> DELETE</button></td>
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

