<?php
include("connection.php");

$id = $_POST["id"];

$sql = "select * from product where id='$id'";
$product = $pdo->prepare($sql);

$product->execute();
$productRow = $product->fetchAll();
//送出json字串
echo json_encode($productRow);

?>
