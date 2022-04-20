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

$resultCount = $statement->rowCount();

if ($resultCount > 0) {
   $respBody["successful"] = true;
   // $respBody["message"] = "s";
} else {
   $respBody["successful"] = false;
   // $respBody["message"] = "f";
}

echo json_encode($respBody);

