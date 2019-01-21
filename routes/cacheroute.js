const express = require('express');
const router = express.Router();
var mcache = require('memory-cache');
const Cache = require('../models/cache');





var cache = (duration) =>{
    return (req,res,next) =>{
        let key = '__express__'+ req.originalUrl || req.url;
        let cachedBody = mcache.get(key);
        if(cachedBody){
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send;
            res.send = (body) =>{
                mcache.put(key,body,duration*1000);
                cache.setKey(key,body);
                cacheData = new Cache({
                    key: key,
                    body: body,
                    
                });
                console.log(cacheData);
                cacheData.save();
                res.sendResponse(body);
            } 
            next();
        }
    }
}


  
  router.get('/user/:id', cache(20), (req, res) => {
    setTimeout(() => {
        Cache.find({key : req.params.id})
          .then((cachedata)=>{
            res.json(cachedata)
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send(err);
        });
    }, 3000) 
  })
  

module.exports = router;