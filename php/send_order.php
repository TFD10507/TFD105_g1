<?php
    include("connection.php");

    print_r($_POST);
    
    $name = htmlspecialchars($_POST["name"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $address = htmlspecialchars($_POST["address"]);
    $other = htmlspecialchars($_POST["other"]);
    $productsId = htmlspecialchars($_POST["productsId"]);
    $productsPrice = htmlspecialchars($_POST["productsPrice"]);
    $productsCount = htmlspecialchars($_POST["productsCount"]);

    // 自動生成清單編號 17碼
    $cusID = date('YmdHis').rand(100,999);

    $sql = "INSERT INTO `order` (ID_order, member_id, status, date, name, phone, address, other) VALUES ('$cusID', '1', '待處理', NOW(), '$name', '$phone', '$address', '$other')";
    
    // 用來事先編譯好一個SQL敍述
    $order = $pdo->prepare($sql);
    
    $pdo->exec($sql);
    // lastInsertId() 抓取insert後自動產生的id號
    $orderId = $pdo->lastInsertId();
    
    $sql2 = "INSERT INTO order_detail (product_id, order_id, price, quantity) VALUES ('$productsId', '$orderId', '$productsPrice', '$productsCount')";
    

    $orderDetail = $pdo->prepare($sql2);
    $pdo->exec($sql2);
   
?>
