// router(라우터)  : 사용자가 요청한 경로에 따른 기능처리

const express = require("express");
const router = express.Router();
const conn = require("../config/DB_config.js");


router.post("/Login", function (request, response) { //로그인 라우터

    let id = request.body.id; // 안드로이드에서 보내준 아이디 값
    let pw = request.body.pw; // 안드로이드에서 보내준 패스워드 값

    let sql = "select * from users where users_id = ?"; // 아이디값을 통한 users 테이블의 데이터 조회
    conn.query(sql, [id], function (err, row) {
        if (row.length == 1) {
            if (pw == row[0].users_pw) { // row로 데이터를 받은 후 users 테이블의 users_pw 컬럼의 값이 users_id와 일치 할 시 로그인 성공
                response.json({ check: "ok" }); 
                console.log("c");
            } else {                    // row로 데이터를 받은 후 users 테이블의 users_pw 컬럼의 값이 users_id와 불일치 할 시 로그인 실패
                response.json({ check: "fail" });
                console.log("a");
            }
        } else {
            response.json({ check: "fail" });
            console.log("b");
        }



    });

});


router.post("/Join", function (request, response) { // 회원가입 라우터
    let id = request.body.id; // 안드로이드에서 보내준 아이디 값
    let pw = request.body.pw; // 안드로이드에서 보내준 패스워드 값
    let gender = request.body.gender; //안드로이드에서 보내준 성별 값
    let age = request.body.age; //안드로이드에서 보내준 나이 값
    let interesting = request.body.interesting; // 안드로이드에서 보내준 관심사항 값
    let low_income = request.body.low_income; // 안드로이드에서 보내준 저소득 값
    let single_parent = request.body.single_parent; // 안드로이드에서 보내준 한부모 값
    let phone_number = request.body.phone_number; //안드로이드에서 보내준 전화번호 값
    let disabled_person = request.body.disabled_person; // 안드로이드에서 보내준 장애인 값
    let pregnant_women = request.body.pregnant_women; // 안드로이드에서 보내준 임산부 값
    let alarm = request.body.alarm; // 안드로이드에서 보내준 알람 값
    let location = request.body.location; // 안드로이드에서 보내준 지역 값

    // 쿼리문 작성을 위한 각 변수에 공백 담기
    let sql = ""; 
    let sql2 = "";
    let sql3 = "";
    let sql4 = "";
    let sql5 = "";
    let sqlrow = [];
    let sqlrow2 = [];
    let sqlrow3 = [];
    let sqlrow4 = [];
    let location_gu = "";

    sql = "insert into users values (?,?,?,?,?,?,?,?,?,?,?,?)"; // 위에서 받아온 회원가입 데이터를 users 테이블에 삽입
    sql5 = "insert into C_Policy values (?, ?, ?, ?, ?, ?)";  // 맞춤 정책 테이블에 데이터를 삽입
    conn.query(sql, [id, pw, gender, age, interesting, low_income, single_parent, phone_number, disabled_person, pregnant_women, alarm, location], function (err, row) {
        if (!err) {
            console.log("입력성공");
            response.json({ check: "ok" });
        } else {
            console.log("입력실패login");
            console.log(err);
            response.json({ check: "fail" });
        }
    });


    sql = "select location_gu from location where location_no=?"; // 지역번호 데이터 값을 통한 지역구 값 조회하기
    conn.query(sql, [location], function (err, row) {
        location_gu = row[0].location_gu;
        console.log(location_gu+"김건형");
    });

    // 회원가입을 할 때 사용자별 각 조건의 맞는 데이터를 조회
    if (age == 1) {
        sql = "select * from policy where policy_location = ? and policy_infants = 1 and policy_" + interesting + "=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql2 = "select * from policy where policy_location = '전국' and policy_infants = 1 and policy_" + interesting + "=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql3 = "select * from policy where policy_location = ? and policy_infants = 1 and policy_" + interesting + "!=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql4 = "select * from policy where policy_location = '전국' and policy_infants = 1 and policy_" + interesting + "!=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;

    } else if (age == 5) {
        sql = "select * from policy where policy_location = ? and policy_child = 1 and policy_" + interesting + "=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql2 = "select * from policy where policy_location = '전국' and policy_child = 1 and policy_" + interesting + "=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql3 = "select * from policy where policy_location = ? and policy_child = 1 and policy_" + interesting + "!=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql4 = "select * from policy where policy_location = '전국' and policy_child = 1 and policy_" + interesting + "!=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
    } else if (age == 19) {
        sql = "select * from policy where policy_location = ? and policy_youth = 1 and policy_" + interesting + "=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql2 = "select * from policy where policy_location = '전국' and policy_youth = 1 and policy_" + interesting + "=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql3 = "select * from policy where policy_location = ? and policy_youth = 1 and policy_" + interesting + "!=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql4 = "select * from policy where policy_location = '전국' and policy_youth = 1 and policy_" + interesting + "!=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
    } else if (age == 35) {
        sql = "select * from policy where policy_location = ? and policy_middle = 1 and policy_" + interesting + "=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql2 = "select * from policy where policy_location = '전국' and policy_middle = 1 and policy_" + interesting + "=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql3 = "select * from policy where policy_location = ? and policy_middle = 1 and policy_" + interesting + "!=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql4 = "select * from policy where policy_location = '전국' and policy_middle = 1 and policy_" + interesting + "!=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
    } else if (age == 65) {
        sql = "select * from policy where policy_location = ? and policy_old = 1 and policy_" + interesting + "=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql2 = "select * from policy where policy_location = '전국' and policy_old = 1 and policy_" + interesting + "=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql3 = "select * from policy where policy_location = ? and policy_old = 1 and policy_" + interesting + "!=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
        sql4 = "select * from policy where policy_location = '전국' and policy_old = 1 and policy_" + interesting + "!=1 and policy_low_income=" + low_income + " and Policy_pregnant_women=" + pregnant_women + " and Policy_disabled_person=" + disabled_person + " and Policy_single_parent=" + single_parent;
    }

    // 각각 조건의 맞는 데이터를 뽑아온 후 맞춤 정책 테이블에 데이터 삽입하기
    conn.query(sql, [location_gu], function (err, row) {
        console.log(row);
        for (let i = 0; i < row.length; i++) {
            sqlrow[i] = row[i];
        }
        for (let i = 0; i < sqlrow.length; i++) {
            conn.query(sql5, [sqlrow[i].Policy_Name, sqlrow[i].Policy_Summary, sqlrow[i].Policy_Content, sqlrow[i].Policy_Apply, id, sqlrow[i].Policy_No], function (err, row) {
                if (!err) {
                    console.log("입력성공1");
                } else {
                    console.log("입력실패1");
                    console.log(err);
                }
            })
        };
    });
    
    // 각각 조건의 맞는 데이터를 뽑아온 후 맞춤 정책 테이블에 데이터 삽입하기
    conn.query(sql2, function (err, row) {
        for (let i = 0; i < row.length; i++) {
            sqlrow2[i] = row[i];
            console.log(sqlrow2[i]
            )
        }
        for (let i = 0; i < sqlrow2.length; i++) {
            conn.query(sql5, [sqlrow2[i].Policy_Name, sqlrow2[i].Policy_Summary, sqlrow2[i].Policy_Content, sqlrow2[i].Policy_Apply, id, sqlrow2[i].Policy_No], function (err, row) {
                if (!err) {
                    console.log("입력성공2");
                } else {
                    console.log("입력실패2");
                    console.log(err);
                }
            })
        };
    });

    // 각각 조건의 맞는 데이터를 뽑아온 후 맞춤 정책 테이블에 데이터 삽입하기
    conn.query(sql3, [location_gu], function (err, row) {
        for (let i = 0; i < row.length; i++) {
            sqlrow3[i] = row[i];
            console.log(sqlrow3[i]
            )
        }
        for (let i = 0; i < sqlrow3.length; i++) {
            conn.query(sql5, [sqlrow3[i].Policy_Name, sqlrow3[i].Policy_Summary, sqlrow3[i].Policy_Content, sqlrow3[i].Policy_Apply, id, sqlrow3[i].Policy_No], function (err, row) {
                if (!err) {
                    console.log("입력성공3");
                } else {
                    console.log("입력실패3");
                    console.log(err);
                }
            })
        };
    });

    // 각각 조건의 맞는 데이터를 뽑아온 후 맞춤 정책 테이블에 데이터 삽입하기
    conn.query(sql4, function (err, row) {
        for (let i = 0; i < row.length; i++) {
            sqlrow4[i] = row[i];
            console.log(sqlrow4[i]
            )
        }
        for (let i = 0; i < sqlrow4.length; i++) {
            conn.query(sql5, [sqlrow4[i].Policy_Name, sqlrow4[i].Policy_Summary, sqlrow4[i].Policy_Content, sqlrow4[i].Policy_Apply, id, sqlrow4[i].Policy_No], function (err, row) {
                if (!err) {
                    console.log("입력성공4");
                } else {
                    console.log("입력실패4");
                    console.log(err);
                }
            })
        };

    });

    console.log('test:' + sql5);

    console.log("test2:", sqlrow2.length);
});

router.get("/policy", function (request, response) { //정책 데이터 라우터
    let policy_name = request.body.policy_name; // 안드로이드에 보내줄 정책 테이블에 정책 이름
    let policy_summary = request.body.policy_summary; // 안드로이드에 보내줄 정책 테이블에 정책 내용
    let policy_apply = request.body.policy_apply; // 안드로이드에 보내줄 정책 테이블에 정책 신청 페이지
    let policy_content = request.body.policy_content; // 안드로이드에 보내줄 정책 테이블에 정책 세부내용


    let sql = "select policy_name, policy_summary, Policy_Apply, Policy_Content from policy where policy_no > 0"; // 정책번호가 0보다 큰 정책이름, 정책내용, 정책 신청페이지, 정책세부내용 조회
    conn.query(sql, [policy_name, policy_summary, policy_apply, policy_content], function (err, row) {
       
        var testList = new Array();

        for (let i = 0; i < row.length; i++) {
            //전역변수선언 
            let memberdto = new Object;

            //묶을 데이터
            memberdto.policy_name = row[i].policy_name;
            memberdto.policy_summary = row[i].policy_summary;
            memberdto.policy_apply = row[i].policy_apply;
            memberdto.policy_content = row[i].policy_content;

            testList.push(memberdto)
        };

        //보내야한 곳의 라우터
        let jsonData = JSON.stringify(testList);

        console.log(jsonData);
        response.send(jsonData);
    });
    
});

router.post("/C_Policy", function (request, response) { // 맞춤 정책 데이터 라우터
    let C_Policy_Name = request.body.C_Policy_Name; // 안드로이드에 보내줄 맞춤 정책 이름
    let C_Policy_Summary = request.body.C_Policy_Summary; // 안드로이드에 보내줄 맞춤 정책 내용
    let id = request.body.id; // 안드로이드에서 받아온 users_id 값

    let sql ="";
    sql = "select C_Policy_Name, C_Policy_Summary from C_Policy where users_id = ?"; // users_id 값을 통한 맞춤 정책 이름, 맞춤 정책 내용 조회 
    conn.query(sql, [id], function (err, row) {

        var C_list = new Array();

        for (let i = 0; i < row.length; i++) {
            //전역변수선언 
            let cpolicydto = new Object;

            //묶을 데이터
            cpolicydto.C_Policy_Name = row[i].C_Policy_Name;
            cpolicydto.C_Policy_Summary = row[i].C_Policy_Summary;

            C_list.push(cpolicydto)
        };

        //보내야한 곳의 라우터
        let jsonData = JSON.stringify(C_list);

        console.log(jsonData);
        response.send(jsonData);

    });
    
});

router.post("/C_Policy_Rating", function (request, response) { //맞춤 정책 데이터별 평점 보내기 라우터
    let C_Policy_Name = request.body.C_Policy_Name; // 안드로이드에 보낼 맞춤 정책 이름
    let C_Policy_Summary = request.body.C_Policy_Summary; // 안드로이드에 보낼 맞춤 정책 내용
    let policy = request.body.policy_no; // 안드로이드에 보낼 정책 번호
    let rating_point = request.body.rating_point; // 안드로이드에 보낼 맞춤 정책 평점
    let id = request.body.id; // 안드로이드에서 받아온 users_id 값

    let sql ="";
    sql = "select c.C_Policy_Name AS name, COUNT(c.Policy_no) AS count, AVG(r.rating_point) AS avg from C_Policy AS c JOIN rating AS r ON c.Policy_no = r.Policy_no where c.users_id = ? group by c.C_Policy_Name"; // users_id 값을 통해 맞춤 정책 내용, 맞춤 정책 번호 갯수, 맞춤 정책 평균 평점을 맞춤 정책, 평점 테이블의 조인을 통해 조회
    conn.query(sql, [id], function (err, row) {
        console.log(row);
        var p_list = new Array();

        for (let i = 0; i < row.length; i++) {
            //전역변수선언 
            let pointdto = new Object;

            //묶을 데이터
            pointdto.name = row[i].name;
            pointdto.count = row[i].count;
            pointdto.avg = row[i].avg;

            p_list.push(pointdto)
        };

        //보내야한 곳의 라우터
        let jsonData = JSON.stringify(p_list);

        console.log(jsonData);
        response.send(jsonData);

    });
            
});

router.post("/Update", function (request, response) { // 회원 정보 수정 라우터

    let id = request.body.id; // 안드로이드에서 받아온 users_id 값
    let choice = request.body.choice; // 안드로이드에서 받아온 변경할 컬럼
    let data = request.body.update_data; // 안드로이드에서 받아온 변경할 데이터


    let sql = "";

    // users_id 값에 따라 각각 변경할 컬럼에 변경할 데이터 수정하기
    if (choice == "users_pw") {
        sql = "update users set users_pw = ? where users_id = ?";
    } else if (choice == "users_gender") {
        sql = "update users set users_gender = ? where users_id = ?";
    } else if (choice == "users_age") {
        sql = "update users set users_age = ? where users_id = ?";
    } else if (choice == "users_interesting") {
        sql = "update users set users_interesting = ? where users_id = ?";
    } else if (choice == "users_low_income") {
        sql = "update users set users_low_income = ? where users_id = ?";
    } else if (choice == "users_single_parent") {
        sql = "update users set users_single_parent = ? where users_id = ?";
    } else if (choice == "users_phone_number") {
        sql = "update users set users_phone_number = ? where users_id = ?";
    } else if (choice == "users_disabled_person") {
        sql = "update users set users_disabled_person = ? where users_id = ?";
    } else if (choice == "users_pregnant_women") {
        sql = "update users set users_pregnant_women = ? where users_id = ?";
    } else if (choice == "users_alarm") {
        sql = "update users set users_alarm = ? where users_id = ?";
    } else if (choice == "users_location_no") {
        sql = "update users set users_location_no = ? where users_id = ?";
    }
    conn.query(sql, [data, id], function (err, row) {
        if (!err) {
            console.log("수정성공");
        } else {
            console.log("수정실패" + err);
        }
    });
    conn.end();
});

router.post("/IdSelect", function (request, response) { // 전화번호를 통한 회원정보 아이디 찾기 라우터

    let phone_number = request.body.phone_number; // 안드로이드에서 받아온 전화 번호 값

    let sql = "select users_id from users where users_phone_number = ?"; // 핸드폰 번호 값을 통한 users_id 조회하기
    conn.query(sql, [phone_number], function (err, row) {
        if (!err) {
            console.log("입력성공");
            response.json({ check: "ok" });
        } else {
            console.log("입력실패");
            console.log(err);
            response.json({ check: "fail" });
        }
    });
   
});

router.post("/PwSelect", function (request, response) { // 아이디,전화번호를 통한 회원정보 비밀번호 찾기 라우터

    let id = request.body.id; // 안드로이드에서 받아온 users_id 값
    let phone_number = request.body.phone_number; // 안드로이드에서 받아온  전화번호 값


    let sql = "select users_pw from users where users_id=? and users_phone_number = ?"; // users_id 값 and 전화번호를 통한 users_pw 조회하기
    conn.query(sql, [id, phone_number], function (err, row) {
        if (!err) {
            console.log("입력성공");
            response.json({ check: "ok" });
        } else {
            console.log("입력실패");
            console.log(err);
            response.json({ check: "fail" });
        }
    });
});

router.post("/Delete", function (request, response) { // 회원탈퇴 라우터

    let id = request.body.id; // 안드로이드에서 받아온 users_id 값
    let pw = request.body.pw; // 안드로이드에서 받아온 users_pw 값
    

    let sql = "delete from users where users_id = ? and users_pw = ?"; // users_id 값 and users_pw 값이 일치하는 users 정보 삭제
    conn.query(sql, [id, pw], function (err, row) {
        if (!err) {
            console.log("입력성공");
            response.json({ check: "ok" });
        } else {
            console.log("입력실패");
            console.log(err);
            response.json({ check: "fail" });
        }
    });
});

router.post("/community_select", function (request, response) { //회원 아이디를 통한 맞춤 정책 이름, 평점 평균 제공 라우터

    let id = request.body.id; // 안드로이드에서 받아온 users_id 값
    let C_Policy_Name = request.body.C_Policy_Name; // 안드로이드에 보내줄 맞춤 정책 이름 값
    let rating_point = request.body.rating_point; // 안드로이드에서 보내줄 평점 값


    let sql = "";
    sql = "select c.C_Policy_Name, avg(r.rating_point) from C_Policy c , rating r where c.Policy_no = r.Policy_no and users_id = ? group by c.C_Policy_Name"; // users_id 값에 따라 커뮤니티 테이블의 정책 번호와 평점 테이블의 정책 번호가 같을 시 그에 따른 맞춤 정책 이름과 평점 평균 조회하기
    conn.query(sql, [id], function (err, row) {
        var U_list = new Array();

        for (let i = 0; i < row.length; i++) {
            //전역변수선언 
            let Upolicydto = new Object;

            //묶을 데이터
            Upolicydto.C_Policy_Name = row[i].C_Policy_Name;
            Upolicydto.rating_point = row[i].rating_point;

            U_list.push(Upolicydto)
        };

        //보내야한 곳의 라우터
        let jsonData = JSON.stringify(U_list);

        console.log(jsonData);
        response.send(jsonData);


        //  response.json({check : "ok"}); 
    });
});

router.post("/Search_Select", function (request, response) { // 전국, 맞춤 지역 검색 결과 보여주기 라우터

    let Policy_Name = request.body.Policy_Name; // 안드로이드에 보내줄 정책 이름
    let Policy_Summary = request.body.Policy_Summary; // 안드로이드에 보내줄 정책 내용
    let location_no  = request.body.location_no; // 안드로이드에 받아온 지역 번호 값
    let category = request.body.category; // 안드로이드에 받아온 카테고리 값
    let Policy_home  = request.body.home; // 안드로이드에 보내줄 정책 테이블 주거 값
    let Policy_hire  = request.body.hire; // 안드로이드에 보내줄 정책 테이블 고용 값
    let Policy_education  = request.body.education; // 안드로이드에 보내줄 정책 테이블 교육 값
    let Policy_health  = request.body.health; // 안드로이드에 보내줄 정책 테이블 건강 값
    let Policy_culture  = request.body.culture; // 안드로이드에 보내줄 정책 테이블 문화 값
    let Policy_low_income  = request.body.low_income; // 안드로이드에 보내줄 정책 테이블 저소득 값
    let Policy_single_parent  = request.body.single_parent; // 안드로이드에 보내줄 정책 테이블 한부모 값 
    let Policy_disabled_person  = request.body.disabled; // 안드로이드에 보내줄 정책 테이블 장애인 값 
    let Policy_pregnant_women  = request.body.pregnant_women; // 안드로이드에 보내줄 정책 테이블 임산부 값
    let Policy_child  = request.body.child; // 안드로이드에 보내줄 정책 테이블 청소년 값
    let Policy_youth  = request.body.youth; // 안드로이드에 보내줄 정책 테이블 청년 값 
    let Policy_middle  = request.body.middle; // 안드로이드에 보내줄 정책 테이블 중년 값
    let Policy_old  = request.body.old; // 안드로이드에 보내줄 정책 테이블 노년 값 
    let Policy_infants  = request.body.infants // 안드로이드에 보내줄 정책 테이블 유아 값

    let sql = "";
    let sql2 = "";
    let sql3 = "";

    // 각각 카테고리 값에 따른 전국 지역 검색 통한 값 조회하기
    if (category == "Policy_pregnant_women") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_pregnant_women = '1'";
    } else if (category == "Policy_infants") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_infants = '1'";
    } else if (category == "Policy_child") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_child = '1'";
    } else if (category == "Policy_youth") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_youth = '1'";
    } else if (category == "Policy_middle") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_middle = '1'";
    } else if (category == "Policy_old") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_old = '1'";
    } else if (category == "Policy_disabled_person") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_disabled_person = '1'";
    } else if (category == "Policy_single_parent") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_single_parent = '1'";
    } else if (category == "Policy_low_income") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_low_income = '1'";
    } else if (category == "Policy_education") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_education = '1'";
    } else if (category == "Policy_hire") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_hire = '1'";
    } else if (category == "Policy_home") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_home = '1'";
    } else if (category == "Policy_health") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_health = '1'";
    } else if (category == "Policy_culture") {
        sql = "select * from Policy where Policy_location = '전국' and Policy_culture = '1'";
    }


    sql3 = "select location_gu from location where location_no = ? "; // 지역 번호 값을 통해 그에 맞는 지역 구를 조회하기


    // 지역 값에 따른 각각의 카테고리 값 조회하기   
    if (category == "Policy_pregnant_women") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_pregnant_women = '1'";
    } else if (category == "Policy_infants") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_infants = '1'";
    } else if (category == "Policy_child") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_child = '1'";
    } else if (category == "Policy_youth") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_youth = '1'";
    } else if (category == "Policy_middle") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_middle = '1'";
    } else if (category == "Policy_old") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_old = '1'";
    } else if (category == "Policy_disabled_person") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_disabled_person = '1'";
    } else if (category == "Policy_single_parent") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_single_parent = '1'";
    } else if (category == "Policy_low_income") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_low_income = '1'";
    } else if (category == "Policy_education") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_education = '1'";
    } else if (category == "Policy_hire") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_hire = '1'";
    } else if (category == "Policy_home") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_home = '1'";
    } else if (category == "Policy_health") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_health = '1'";
    } else if (category == "Policy_culture") {
        sql2 = "select * from Policy where Policy_location = ? and Policy_culture = '1'";
    }
    
    var all_list = new Array(); // 전체 배열을 담아줄 all_list 선언

    conn.query(sql, function (err, row) { // 전국 검색 결과를 보내줄 쿼리문

        //var all_list = new Array();

        for (let i = 0; i < row.length; i++) {
            //전역변수선언 
             let allpolicydto = new Object;

            //묶을 데이터
            allpolicydto.Policy_Name = row[i].Policy_Name;
            allpolicydto.Policy_Summary = row[i].Policy_Summary;

            all_list.push(allpolicydto)
        };
    });
    conn.query(sql3,[location_no], function (err, row) { // 지역 번호를 받아 지역 번호에 맞는 지역 구를 조회하여 각각의 구에 따른 맞춤 값 보내주기
        let loca=row[0].location_gu
        conn.query(sql2,[loca], function (err, row) {
    
            console.log(row);
           // var all_list = new Array();
    
            for (let i = 0; i < row.length; i++) {
                //전역변수선언 
                let allpolicydto = new Object;
    
                //묶을 데이터
                allpolicydto.Policy_Name = row[i].Policy_Name;
                allpolicydto.Policy_Summary = row[i].Policy_Summary;
    
                all_list.push(allpolicydto)
            };
            let jsonData = JSON.stringify(all_list);

            console.log(jsonData);
            response.send(jsonData);
        });
    });
});


router.post("/RatingSend", function (request, response) { // 평점 삽입 후 안드로이드에 값을 보내주는 라우터
    let id = request.body.id; // 안드로이드에서 받아온 users_id 값
    let point = request.body.point; // 안드로이드에서 받아온 평점 데이터 값
    let policy = request.body.policy; // 안드로이드에서 받아온 정책 번호 값
    let sql = "";
    let sqlrow = "";
    sql2 = "select Policy_no from policy where Policy_Name = ?"; // 정책 이름에 따른 정책 번호를 조회하기
    sql = "insert into rating(rating_point, Policy_no, users_id) values (?, ?, ?)"; // 평점 테이블에 평점 값, 정책 번호, users_id 삽입하기
    conn.query(sql2, [policy], function (err, row) {
        sqlrow = row;
        console.log(row[0].Policy_no);
        if (!err) {
            conn.query(sql, [point, parseInt(sqlrow[0].Policy_no), id], function (err, row) {
                if (!err) {
                    console.log("입력성공");
                    response.json({ check: "ok" });
                } else {
                    console.log("입력실패");
                    console.log(err);
                    response.json({ check: "fail" });
                }
            });
        } else {
            console.log("넘버입력실패");
            console.log(err);
        }
    });
})

router.post("/ChatSend", function (request, response) { // 커뮤니티 게시글 삽입하는 라우터 
    let id = request.body.id; // 안드로이드에서 받아온 users_id 값
    let content = request.body.content; // 안드로이드에서 받아온 커뮤니티 content 값
    let policy = request.body.policy; // 안드로이드에서 받아온 정책 번호 값 
    let sql = "";
    let sqlrow = "";
    sql2 = "select Policy_no from policy where Policy_Name = ?"; // 정책 이름을 통한 정책 번호를 조회하기
    sql = "insert into community(community_content, Policy_no, users_id) values (?, ?, ?)"; // 안드로이드에서 받아온 값을 통해 커뮤니티 테이블에 값을 삽입하기
    conn.query(sql2, [policy], function (err, row) {
        sqlrow = row;
        console.log(row[0].Policy_no);
        if (!err) {
            conn.query(sql, [content, parseInt(sqlrow[0].Policy_no), id], function (err, row) {
                if (!err) {
                    console.log("입력성공");
                    response.json({ check: "ok" });
                } else {
                    console.log("입력실패");
                    console.log(err);
                    response.json({ check: "fail" });
                }
            });
        } else {
            console.log("넘버입력실패");
            console.log(err);
        }
    })
})


router.post("/ChatSelect", function (request, response) { // 커뮤니티 댓글 내용을 다시 보내주는 라우터
        let id = request.body.id; // 안드로이드에 보내줄 users_id 값
        let date = request.body.date; // 안드로이드에 보내줄 게시글 날짜 값
        let content = request.body.content; // 안드로이드에 게시글 내용 값
        let number = request.body.number; // 안드로이드에 보내줄 정책 번호 값
        let policy = request.body.policy; // 안드로이드에서 받아온 정책 이름 값
        let sqlrow="";
        let sql = "select community_date, community_content, users_id from community where Policy_no =?"; // 정책 번호에 따른 기록된 유저의 아이디값, 내용, 날짜값 조회하기
        let sql2 = "select Policy_no from policy where Policy_Name = ?"; // 정책이름에 따른 정책 번호를 조회하기
        conn.query(sql2, [policy], function (err, row) {
            sqlrow = row;
            if (!err) {
             conn.query(sql, [parseInt(sqlrow[0].Policy_no)] ,function (err, row) {

                var chatList = new Array();

                for (let i = 0; i < row.length; i++) {
                    //전역변수선언 
                    let chatdto = new Object;

                    //묶을 데이터
                    chatdto.community_date = row[i].community_date;
                    chatdto.community_content = row[i].community_content;
                    chatdto.users_id = row[i].users_id;
                    
                    chatList.push(chatdto)
                };

                //보내야한 곳의 라우터
                let jsonDatas = JSON.stringify(chatList);

                console.log(jsonDatas);
                response.send(jsonDatas);

            });
        } else {
            console.log("넘버입력실패");
            console.log(err);
        }
        });
    });

router.post("/fragmentD", function (request, response) { // 게시글 총 갯수를 구하는 라우터
        let id = request.body.id; // 안드로이드에서 받아온 users_id 값
        
        let sql = "";
        sql = "select count(community_no) as count from community where users_id = ?"; // 유저 id값을 통한 커뮤니티 글의 개수를 count하는 쿼리문
       
        conn.query(sql, [id], function (err, row) {
            console.log(row);
            var count_list = new Array();

            for (let i = 0; i < row.length; i++) {
                //전역변수선언 
                let countdto = new Object;
    
                //묶을 데이터
                countdto.count = row[i].count;
    
                count_list.push(countdto)
            };
    
            //보내야한 곳의 라우터
            let jsonData = JSON.stringify(count_list);
    
            console.log(jsonData);
            response.send(jsonData);
             
        })
    })



module.exports = router;