<?php
require("Connection.php");
//---------------------------------------------------
// $_REQUEST['Add_color'];
if (is_array($_FILES)) {
   if (is_uploaded_file($_FILES['colorpic']['tmp_name'])) {
      $sourcePath = $_FILES['colorpic']['tmp_name'];
      $targetPath = "./img/cart/" . $_FILES['colorpic']['name'];
      move_uploaded_file($sourcePath, $targetPath);
   }
}

//建立SQL
$sql = "insert into G1.color(name,pic)
                VALUES (:name,:pic);";

// // 包裝起來才可以使PHP 用bindValue
$statement = $link->prepare($sql);

// // 下列都是自定義PHP變數  , 不然看面資料庫看不懂 :price
$statement->bindValue(":name", $_REQUEST['Add_color']);
$statement->bindValue(":pic", $targetPath);

//執行
$statement->execute();
   // echo "新增成功!";
