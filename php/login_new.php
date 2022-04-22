<?php

include("connection.php");

//---------------------------------------------------
$member = json_decode(file_get_contents("php://input"), true);
// echo json_encode($member);

//建立SQL
$sql = "SELECT * FROM G1.member where account= :account and password = :password ";



$statement = $pdo->prepare($sql);

$statement->bindValue(":account", $member["login_account"]);
$statement->bindValue(":password", $member["login_password"]);

// 執行
$statement->execute();
$data = $statement->fetchAll();
$resultCount = $statement->rowCount();

if ($resultCount > 0) {
   $respBody["id"] = $data[0]["id"];
   $respBody["account"] = $data[0]["account"];
   // $respBody["password"] = $data[0]["password"];
   $respBody["successful"] = true;
   // $respBody["message"] = "s";
   // echo json_encode($respBody);
} else {
   $respBody["successful"] = false;
   // $respBody["message"] = "f";
}

echo json_encode($respBody);

