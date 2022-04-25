<?php
// 這支用來fetch mySQL G1.order的訂單清單
require("connection.php");

$orderList = json_decode(file_get_contents("php://input"), true);

$SQL = " SELECT
            o.id,
            o.ID_order,
            o.member_id,
            m.account,
            m.phone,
            o.date,
            m.address,
            SUM(p.price * ol.quantity) as total_price,
            o.status
         from
            `order` o
         join member m
            on o.member_id = m.id
         join order_detail ol
            on o.id = ol.order_id
         join product p
            on ol.product_id = p.id
         where o.member_id = :id
         group by
         o.id";

$statement = $link->prepare($SQL);

$statement->bindValue(":id", $orderList['id']);

$statement->execute();

$data = $statement->fetchAll();

echo json_encode($data);

?>