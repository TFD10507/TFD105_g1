<?php
// 這支用在客製化訂單頁面, 新增客製清單到 G1.customization table

require("connection.php");
//---------------------------------------------------

$customize = json_decode(file_get_contents("php://input"));
echo json_encode($customize);
// echo ("hello");

// 自動生成清單編號 17碼
$cusID = date('YmdHis').rand(100,999);
// echo $cusID;

//建立SQL
$sql = "insert into customization ( member_id, color,  detail, date, quantity, customizeOrderID, kind, status )
      values (1, :color, :detail, NOW(), :quantity, $cusID, :kind, '待處理');";

//包裝起來才可以使PHP 用bindValue
$statement = $link->prepare($sql);

//下列都是自定義PHP變數  , 不然看面資料庫看不懂 
$statement->bindValue(":kind", $customize->kind);
$statement->bindValue(":color", $customize->color);
$statement->bindValue(":quantity", $customize->quantity);
$statement->bindValue(":detail", $customize->detail);

 //執行
$statement->execute();

//  echo json_encode(['status'=> 'SUCCESS']);
//  echo "新增成功!";
