<?php
// 這是類是串聯別頁PHP
require("./Connection.php");
//---------------------------------------------------
$Ucoupon = json_decode(file_get_contents("php://input"));
// echo json_encode($Ucoupon);
// // SQL 語法
$sql = "update G1.coupon
              set 
                  price=:UPprice,
                  period=:UPperiod
              where
                  id=:UPid;";
//使用這個包裝才可以讓PHP,使用自己定義的 Value
$statement = $link->prepare($sql);

// 自定義 Value區
$statement->bindValue(":UPid", $Ucoupon->id);
$statement->bindValue(":UPprice", $Ucoupon->price);
$statement->bindValue(":UPperiod", $Ucoupon->period);

// 執行
$statement->execute();
