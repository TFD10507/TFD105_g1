<?php
    include("connection.php");
    // $order = json_decode(file_get_contents("php://input"), true);

    $id = $_POST["memberId"];

   // 找到會員帳號的id
   $sql = "SELECT o.ID_order, DATE(o.date) as orderDate, sum(p.price * od.quantity) as total
   FROM (`order` o 
       JOIN order_detail od on o.id = od.order_id)
       JOIN product p on p.id = od.product_id
   WHERE o.id = '$id';";
   
   // 執行sql語法，會回傳值
   $statement = $link->query($sql);
   // 接回傳的值
   $orderId = $statement->fetchAll();
//    print_r($orderId);
//    $result = $orderId[0];
    echo json_encode($orderId);

    
?>
