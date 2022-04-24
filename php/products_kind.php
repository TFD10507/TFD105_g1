<?php
//     include('connection.php');

//    // 把所有在資料庫的商品都選擇出來
//    $sql = "SELECT * FROM product where product = :KIND";    
//    $statement = $pdo->query($sql);
//    $product = $pdo->prepare($sql);
//    $product->bindValue(":KIND", $_POST['KIND']);
//    $data = $statement->fetchAll();

//    if(count($data) > 0) {
//         echo json_encode($data);
//    }
   include('connection.php');

   $kind = $_POST['kind'];
   // 把所有在資料庫的商品都選擇出來
   $sql = "SELECT * FROM product where kind_id = '$kind'";
   
   $statement = $link->query($sql);
   $data = $statement->fetchAll();
   if(count($data) > 0) {
       echo json_encode($data);
   }
?>