import sequelize from './models/index';
import express from 'express'
const router = express.Router();

let func = async ()=>{

    await sequelize.models.token.create({token:1, path:__dirname + "\\files\\user1\\1.txt"});
    await sequelize.models.token.create({token:1, path:__dirname + "\\files\\user1\\2.txt"});
    await sequelize.models.token.create({token:2, path:__dirname + "\\files\\user2\\1.txt"});
    await sequelize.models.token.create({token:2, path:__dirname + "\\files\\user2\\2.txt"});

    let token = 2;
    let papers = await sequelize.models.token.findAndCountAll({where:{token:token}});
    let count = papers.count;
    console.log(count);
    for(let i=0;i<count;++i){
        console.log(papers.rows[i].dataValues.path);
    }
}

//1. 토큰 검색

func();

