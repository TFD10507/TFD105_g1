<?php
// 這支用來更新密碼進去G1.member

require("connection.php");

$pwd = json_decode(file_get_contents("php://input"));
// print_r ( $pwd );

$sql = "UPDATE member set password = if ( password = :oldPassword, :newPassword2, password) where id = :id;";
// $sql = "UPDATE member set password = :newPassword2 where id = :id";

$statement = $link->prepare($sql);

$statement->bindValue(':id', $pwd->id);
// $statement->bindValue(':loginPsw', $psw->loginPsw);
$statement->bindValue(":oldPassword", $pwd->oldPassword);
// $statement->bindValue(":newPassword", $pwd->newPassword);
$statement->bindValue(":newPassword2", $pwd->newPassword2);
// echo $pwd->newPassword;

$data = $statement->fetchAll(PDO::FETCH_ASSOC);
// print_r($data); //array 

$statement->execute();

$result_count = $statement->rowCount();

// 判定是否更新成功 
$psw["message"] = $result_count > 0 ? "Success" : "Error!";

echo json_encode($psw);

?>