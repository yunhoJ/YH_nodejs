// express에서 Main 역할하는 파일
// middleware(미들웨어) : 사용자가 요청한 기능을
//                      수행하기 위해서 필요한 기능들을 정의

const express = require("express");
const app = express();
const router = require("./routes/router.js");
const ejs = require("ejs");
const body = require("body-parser");

app.use(body.urlencoded({extended:false}))
//post방식으로 데이터를 처리할 때 사용하는 기능

const session = require("express-session"); // 세션 기능 사용
const mysql_session = require("express-mysql-session"); // 세션 저장 공간 설정(mysql)

let conn = {
        host : "localhost",
        user : "root",
        password : "1234",
        port : "3306",
        database :  "p_db"
    
}

let sessionSave = new mysql_session(conn);
//세션저장공간설정 기능을 사용

app.use(session({
    secret : "smart_session", // 세션ID 설정
    resave : false, // 세션을 항상 저장할건지
    saveUninitialized : true, // 세션을 저장할때마다 초기화할건지
    store : sessionSave
}));

app.set("view engine", "ejs");
// express에서 갖고있는 view engine 중에 ejs라는 기능을 사용

app.use(router);
app.listen(3000);