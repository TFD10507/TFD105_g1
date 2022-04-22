<?php
    include('connection.php');

    // 把所有在資料庫的商品都選擇出來
    $sql = "SELECT * FROM product";
    
    $statement = $link->query($sql);
    $data = $statement->fetchAll();
    if(count($data) > 0) {
        echo json_encode($data);
    }


?>