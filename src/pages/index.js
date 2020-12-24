/* STEP 21 Start of Backend CRUD
import React,{useEffect, useState} from "react"

 function IndexPage (){

  const [data , setData] =useState('');

  useEffect(()=>{
    (async()=>{ 
      const response = await fetch('.netlify/functions/hello');
      const tempdata = await response.json();
      setData(tempdata);
    })();
  },[])
   return(
     <div>
        Henlo 
<div>{data.message}</div>
     </div>
   );

}
  


export default IndexPage
*/

/**STEP 22 sending data to collection through post methood */
import React, { useState } from "react"
import { Formik, Form, ErrorMessage, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider ,Button} from "@material-ui/core";


export default function Home() {
  const [mydata, setData] = useState("");
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#ff8f00" // This is an orange looking color
      },
      secondary: {
        main: "#ffcc80" //Another orange-ish color
      }
    },

  });


  return <div>
    <div >Directory Addition Form</div>
    <br />
    <br />

    <Formik initialValues={{
      firstName: "",
      lastName: "",
      age: 0,
      piaicCourse: "",
      Smester: 0,
      bootCamp2020Status: "",

    }}
      onSubmit={(values) => {
        console.log(values);
        fetch(`.netlify/functions/hello`, {
          method: 'post',
          body: JSON.stringify(values)
        })
          .then(response => response.json())
          .then(data => {
            setData(data);
            console.log("Data: " + JSON.stringify(data));

          });
      }}  >
      {
        (formik) => (

          <ThemeProvider theme={theme}>
            <Form onSubmit={formik.handleSubmit} >
              <div>
                <Field type="text" as={TextField} variant="outlined" label="First Name::" name="firstname" id="firstname" />
                <ErrorMessage name="name" render={(msg) => (
                  <span style={{ color: "red" }}>{msg}</span>
                )} />
              </div>
              <br />
              <div>
                <Field type="text" as={TextField} variant="outlined" label="Last Name::" name="lastname" id="lasttname" />
                <ErrorMessage name="name" render={(msg) => (
                  <span style={{ color: "red" }}>{msg}</span>
                )} />
              </div>
              <br />
              <div>
                <Field type="text" as={TextField} variant="outlined" label="PIAIC Course::" name="piaiccourse" id="piaiccourse" />
                <ErrorMessage name="piaiccourse" render={(msg) => (
                  <span style={{ color: "red" }}>{msg}</span>
                )} />
              </div>
              <br />
              <div>
                <Field type="number" as={TextField} label="Smester or Quarter:: " variant="filled" name="Smester" id="Smester" />
                <ErrorMessage name="Smester" />
              </div>
              <br />
              <div>
                <Field type="text" as={TextField} variant="outlined" label="Boot Camp 2020 Status::" name="bootcamp2020status" id="bootcamp2020status" />
                <ErrorMessage name="piaiccourse" render={(msg) => (
                  <span style={{ color: "red" }}>{msg}</span>
                )} />
              </div>
              <br />

              <div>
                <Field type="number" as={TextField} label="Age:: " variant="filled" name="age" id="age" />
                <ErrorMessage name="age" />
              </div>
              <br />
              <div>
                <button type="submit">Add</button>
                <Button color="primary"></Button>
              </div>
            </Form>
          </ThemeProvider>


        )
      }


    </Formik>

    <div>{mydata.id}</div>
  </div>
}
