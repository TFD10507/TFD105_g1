<?php
    require_once("connect.php");
    $sql = "select * from product where psn=:psn";
    $product = $pdo->prepare($sql);
    $product->bindValue(":id", $_GET['id']);
    $product->execute();
    if ($product->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";
    } else { //找得到
        //取回一筆資料
        $productRow = $product->fetchAll(PDO::FETCH_ASSOC);
        //送出json字串
        echo json_encode($productRow);
    }
?>