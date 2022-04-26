<?php
// 這支用來fetch mySQL G1.order_detail的訂單明細
include("connection.php");

$orderDetail = json_decode(file_get_contents("php://input"), true);
// print_r($orderDetail); //Array ( [oid] => 3 )
// exit;

$sql = "select 
       p.id,
       p.name,
       p.price, 
       d.quantity,
       SUM(p.price * d.quantity) as sub_price
       from order_detail d
       join product p
           on d.product_id = p.id
   where
       d.order_id = :id
       group by d.id";


$statement = $link->prepare($sql);

$statement->bindValue(":id", $orderDetail['oid']);

$statement->execute();

$data = $statement->fetchAll();

echo json_encode($data);

?>