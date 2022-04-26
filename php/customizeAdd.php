<?php
// 這支用在客製化訂單頁面, 新增客製清單到 G1.customization table

require("connection.php");
//---------------------------------------------------

$customize = json_decode(file_get_contents("php://input"));
echo json_encode($customize);
// print_r($customize);
// exit;

// 自動生成清單編號 17碼
$cusID = date('YmdHis').rand(100,999);

//建立SQL
$sql = "insert into customization ( member_id, color,  detail, date, quantity, customizeOrderID, kind, status )
      values (:id, :color, :detail, NOW(), :quantity, $cusID, :kind, '待處理');";

//包裝起來才可以使PHP 用bindValue
$statement = $link->prepare($sql);

$statement->bindValue(":id", $customize->id);
$statement->bindValue(":kind", $customize->kind);
$statement->bindValue(":color", $customize->color);
$statement->bindValue(":quantity", $customize->quantity);
$statement->bindValue(":detail", $customize->detail);

$data = $statement->fetchAll(PDO::FETCH_ASSOC);

//執行
$statement->execute();

$result_count = $statement->rowCount();

// 判定是否更新成功 
$custom["message"] = $result_count > 0 ? "Success" : "Error";

//  echo json_encode(['status'=> 'SUCCESS']);
//  echo "新增成功!";

echo json_encode($custom["message"]);
?>