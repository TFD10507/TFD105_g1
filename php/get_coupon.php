<?php
    include("connection.php");
    $coupon = json_decode(file_get_contents("php://input"), true);

    $couponNum = $coupon["couponNum"];


    // 找到折價券
    $sql = "SELECT price FROM coupon WHERE code = '$couponNum'";
    
    // 執行sql語法，會回傳值
    $statement = $link->query($sql);
    // 接回傳的值
    $data = $statement->fetchAll();
    echo json_encode($data);

    
?>
