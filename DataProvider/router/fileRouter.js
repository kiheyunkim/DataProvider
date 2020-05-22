import express from 'express';
import jsZip from 'jszip';
import fs from 'fs';

const router = express.Router();

router.post('/', async (request,response)=>{
    //1. 토큰 검색
    if(request.body.token === undefined){
        response.status(404).send("error");
        return;
    }

    //2. 토큰에 대한 정보를 찾기
    let token = request.body.token;
    //Select * from users where token = ? ;
    let result = users;
    if(result === undefined){
        response.status(404).send("error");
        return;
    }

    //3. 찾은 파일들 획득
    let pathes = result;
    let files = [];
    pathes.forEach(path => {
        files.push(fs.readFileSync(path,{encoding:"UTF-8"}));
    });

    //4. 찾은 파일들 압축 하여 한 파일로 만듦
    let zip = new jsZip();
    zip.file(__dirname)

});