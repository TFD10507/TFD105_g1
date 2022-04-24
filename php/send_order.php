<?php

    // ============ send_order ===================
    include("connection.php");

    // print_r($_POST);

    $order = json_decode(file_get_contents("php://input"), true);
    
    $memberId = $order["id"];
    $name = $order["name"];
    $phone = $order["phone"];
    $address = $order["address"];
    $other = $order["other"];

    // 自動生成清單編號 17碼
    $cusID = date('YmdHis').rand(100,999);

    // // 找到會員帳號的id
    // $findMemberId = "SELECT id FROM member WHERE account='$account';";
    // // 執行sql語法，會回傳值
    // $statement = $link->query($findMemberId);
    // // 接回傳的值
    // $memberId = $statement->fetchColumn();

    // 插入order的sql指令 - 將商品資訊插入
    $sql1 = "INSERT INTO `order`(ID_order, member_id, status, date, name, phone, address, other)
    VALUES(:cusId, '$memberId', '待處理', NOW(), :name, :phone, :address, :other)";

    // 用來事先編譯好一個SQL敍述
    $stmt1 = $link->prepare($sql1);
    $stmt1->bindValue(":cusId", $cusID);
    $stmt1->bindValue(":name", $name);
    $stmt1->bindValue(":phone", $phone);
    $stmt1->bindValue(":address", $address);
    $stmt1->bindValue(":other", $other);
    $stmt1->execute();
    // echo $cusID;

    // lastInsertId() 抓取insert後自動產生的id號
    $orderId = $link->lastInsertId();

    // 接收ajax傳送過來的 products 陣列
    $products = $order["products"];
    // products陣列跑迴圈傳送商品資料到order_detail
    foreach ($products as $key => $product) {
        $sql2 = "INSERT INTO order_detail (product_id, order_id, quantity) VALUES (:productId, :orderId, :productsCount)";
        $stmt2 = $link->prepare($sql2);
        $stmt2->bindValue(":productId", $product["id"]);
        $stmt2->bindValue(":orderId", $orderId);
        $stmt2->bindValue(":productsCount", $product["count"]);
        $stmt2->execute();
    };
    echo $orderId;


    // =============== send_order end ================

    
