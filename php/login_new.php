<?php

include("connection.php");

//---------------------------------------------------
$member = json_decode(file_get_contents("php://input"), true);
// echo json_encode($member);

//建立SQL
$sql = "SELECT * FROM G1.member where account= :account and password = :password ";



$statement = $link->prepare($sql);

$statement->bindValue(":account", $member["login_account"]);
$statement->bindValue(":password", $member["login_password"]);

// 執行
$statement->execute();
$data = $statement->fetchAll();
$resultCount = $statement->rowCount();

if ($resultCount > 0) {
   $respBody["id"] = $data[0]["id"];
   $respBody["account"] = $data[0]["account"];
   // $respBody["name"] = $data[0]["name"];
   // $respBody["phone"] = $data[0]["phone"];
   // $respBody["jointime"] = $data[0]["jointime"];
   // $respBody["status"] = $data[0]["status"];
   // $respBody["address"] = $data[0]["address"];
   // $respBody["gender"] = $data[0]["gender"];
   // $respBody["password"] = $data[0]["password"];
   $respBody["successful"] = true;
   // $respBody["message"] = "s";
   // echo json_encode($respBody);
} else {
   $respBody["successful"] = false;
   // $respBody["message"] = "f";
}

echo json_encode($respBody);

