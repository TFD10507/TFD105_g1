<?php
// 這是類是串聯別頁PHP
include('connection.php');
//---------------------------------------------------
$customization = json_decode(file_get_contents("php://input"));
echo json_encode($customization);

// // SQL 語法
$sql = "update customization
              set 
                  status=:status
              where
                  id=:id;";

//使用這個包裝才可以讓PHP,使用自己定義的 Value
$statement = $link->prepare($sql);

// 自定義 Value區
$statement->bindValue(":id", $customization->UPid);
$statement->bindValue(":status", $customization->UPstatus);

// 執行
$statement->execute();

?>