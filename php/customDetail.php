<?php
// 這支用來fetch mySQL G1.customization的訂單清單
require("connection.php");

$customDetails = json_decode(file_get_contents("php://input"), true);
// print_r($customDetails);
// exit;

$SQL = "SELECT * FROM customization where customizeOrderID = :id ;";

$statement = $link->prepare($SQL);

$statement->bindValue(":id", $customDetails['cid']);

$statement->execute();

$data = $statement->fetchAll();

echo json_encode($data);

?>