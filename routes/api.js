const express = require('express');
var request = require('request');
const trails = require('../models/trails');
let token = null;
require('../generateToken').getAuthToken().then((resp)=>{
    token = resp.access_token;
});
let router = express.Router();

router.get('/trails',(req,res,next)=>{
    res.status(200);
    res.json(trails);
})

router.get('/intent', (req,res,next)=>{
    // let token = require('../generateToken').oauthToken;
    var formData = {
      modelId: "CommunitySentiment",
      document: req.query.document
    }
    var options = {
        url: ` https://api.einstein.ai/v2/language/sentiment`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'Connection': 'keep-alive',
          'Cache-Control': 'no-cache'
  
        },
        formData:formData
    }

    console.log(options);
    request.post(options, function(error, response, body){
        console.log("response ",response);
        if(error)next(error);
        if(response.statusCode==401){
            require('../generateToken').getAuthToken().then((res)=>{
                token = res.access_token;
                request.post(options, function(error, response, body){
                    res.status(200);
                    res.json(JSON.parse(body));
                })
            })
        }
            
        res.status(200);
        res.json(JSON.parse(body));
        console.log("body ", JSON.parse(body));
    });
})
module.exports = router;