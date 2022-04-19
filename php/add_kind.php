<?php
require("Connection.php");
//---------------------------------------------------
$kind = json_decode(file_get_contents("php://input"));
// echo json_encode($kind);

//建立SQL
$sql = "insert into kind(name)
      values (:name);";

// 包裝起來才可以使PHP 用bindValue
$statement = $link->prepare($sql);

//   // 下列都是自定義PHP變數  , 不然看面資料庫看不懂 
$statement->bindValue(":name", $kind->newkindname);

//  //執行
$statement->execute();
