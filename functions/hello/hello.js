// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

/* STEP 21
const faunadb = require('faunadb'),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    var client = new faunadb.Client({ secret: "fnAD90X7evACAkiBVdPFPDm-sVQh2kWZbvAyX2EN"});
    var result = await client.query(
      q.Get(q.Ref(q.Collection('posts'), '285528650930979335'))
      
    );
    console.log(result)
    //console.log("Document retrived from Container in Database: " + result.data.title);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `${result.data.title}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}*/
/**STEP 22 sending data to collection through post */

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const faunadb = require('faunadb'),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {

    // Only allow POST
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    let reqObj = JSON.parse(event.body);

    var client = new faunadb.Client({ secret: "fnAD913-i6ACBwBeHpXheEjXQ5Z5ofQhJ9u8Wc7Z" });

    var result = await client.query(
      q.Create(
        q.Collection('inaamdirectorycrud'),
        {
          data: {
            firstName: reqObj.firstName,
            lastName: reqObj.LastName,
            age: reqObj.age,
            piaicCourse: reqObj.PiaicCourse,
            Smester: reqObj.Smester,
            bootCamp2020Status: reqObj.BootCamp2020Status,



          }
        },
      )
    );

    console.log("Entry Created and Inserted in Container: " + result.ref.id);


    return {
      statusCode: 200,
      body: JSON.stringify({ id: `${result.ref.id}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
