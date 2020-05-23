import express from 'express';
import jsZip from 'jszip';
import fs from 'fs';
import sequelize from './../models/index';
const router = express.Router();

router.get('/', async (request,response)=>{
    let transaction = null;
    try {
        transaction = await sequelize.transaction();

        //1. 토큰 검색
        let token = 2;
        if(token === undefined){
            response.status(404);
            return;
        }

        //2. 토큰에 대한 정보를 찾기
        let papers = await sequelize.models.token.findAndCountAll({where:{token:token}, transaction});
        if(papers === undefined || papers.count === 0){
            response.status(404).send("Error");
            return;
        }

        let count = papers.count;
        let pathes = [];
        for(let i=0;i<count;++i){
            pathes.push(papers.rows[i].dataValues.path);
        }


        //3. 찾은 파일들 획득
        let file=[];
        pathes.forEach(path => {
            file.push(fs.readFileSync(path,{encoding:"UTF-8"}));
        });

        //4. 찾은 파일들 압축 하여 한 파일로 만듦    
        var zip = new jsZip();
        for(let i=0;i<count;++i){
            zip.file( i + ".txt", fs.readFileSync(pathes[i],{encoding:"UTF-8"}));
        }
    
        let result = await zip.generateAsync({type:"nodebuffer"});
        await sequelize.models.token.destroy({where:{token:token}, transaction});
        response.setHeader("Content-Type","application/zip");
        response.send(result);
    } catch (error) {
        if(transaction){
            await transaction.rollback();
        }

        response.status(404).send("Error");
    }
});

module.exports = router;