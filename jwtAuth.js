var jwt = require('jsonwebtoken');

// var token = jwt.sign({
//     data: 'foobar'
//   }, 'secret', { expiresIn: 60 * 60 })

//   console.log(token)


  var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNjMxODc1Nzk4LCJleHAiOjE2MzE4NzkzOTh9.DkBaDq54qHKIqzHJorHsbWhN8K_AOrqoA6kOXGqheLQ", 'secret');
console.log(decoded) // bar
 
jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNjMxODc1Nzk4LCJleHAiOjE2MzE4NzkzOTh9.DkBaDq54qHKIqzHJorHsbWhN8K_AOrqoA6kOXGqheLQ", 'secret34', function(err, decoded) {
    if (err) {
      /*
        err = {
          name: 'JsonWebTokenError',
          message: 'jwt malformed'
        }
      */
     console.log(err.message)
    }
    else{
        console.log(decoded)
    }
  });