<?php
// 這支用來fetch mySQL G1.customization的訂單清單
require("connection.php");

$customList = json_decode(file_get_contents("php://input"), true);

$SQL = "SELECT * FROM customization where member_id = :id ;";

$statement = $link->prepare($SQL);

$statement->bindValue(":id", $customList['id']);

$statement->execute();

$data = $statement->fetchAll();

echo json_encode($data);

?>