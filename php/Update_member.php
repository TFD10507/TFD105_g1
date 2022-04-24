<?php
// 這是類是串聯別頁PHP
include('connection.php');
//---------------------------------------------------
$Umember = json_decode(file_get_contents("php://input"));
echo json_encode($Umember);

// // SQL 語法
$sql = "update member
              set 
                  password=:password,
                  name=:name,
                  address=:address,
                  phone=:phone,
                  status=:status
              where
                  id=:id;";
//使用這個包裝才可以讓PHP,使用自己定義的 Value
$statement = $link->prepare($sql);

// 自定義 Value區
$statement->bindValue(":password", $Umember->UPpassword);
$statement->bindValue(":name", $Umember->UPname);
$statement->bindValue(":phone", $Umember->UPphone);
$statement->bindValue(":address", $Umember->UPaddress);
$statement->bindValue(":status", $Umember->UPstatus);
$statement->bindValue(":id", $Umember->UPid);

// 執行
$statement->execute();

?>