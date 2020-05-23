import express from 'express';
const router = express.Router();

router.get("/authFido",(request,response)=>{
    request.session.auth = 1234;
    let authId = request.query.id;
    console.log(authId);
    //인증이 됐다고 가정하기 위한 주소

    response.send("Auth OK / id :" + authId);
})

module.exports = router;