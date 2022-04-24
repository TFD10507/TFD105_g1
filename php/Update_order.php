<?php
// 這是類是串聯別頁PHP
require("./Connection.php");
//---------------------------------------------------
$order = json_decode(file_get_contents("php://input"));
echo json_encode($order);

// // SQL 語法
$sql = "update `order`
              set 
                  phone=:phone,
                  status=:status,
                  address=:address
              where
                  id=:id;";
//使用這個包裝才可以讓PHP,使用自己定義的 Value
$statement = $link->prepare($sql);

// 自定義 Value區
$statement->bindValue(":phone", $order->UPphone);
$statement->bindValue(":status", $order->UPstatus);
$statement->bindValue(":address", $order->UPaddress);
$statement->bindValue(":id", $order->UPid);

// 執行
$statement->execute();

?>