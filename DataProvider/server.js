import express from 'express';
import session from 'express-session';
import fileRouter from './router/fileRouter';
import fidoAuth from './router/fidoRouter';
let app = express();

app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : "키",
    cookie : { secure : false }
}));

app.use("/file",fileRouter);
app.use("/fido",fidoAuth);


app.listen(4000,()=>{
    console.log("Server Open 4000");
})