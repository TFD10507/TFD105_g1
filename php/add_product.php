<?php
include('connection.php');
//---------------------------------------------------
// $_REQUEST['Add_color'];
if (is_array($_FILES)) {
   if (is_uploaded_file($_FILES['productpic']['tmp_name'])) {
      // 準確找尋資料夾位子
      $parent=dirname(__DIR__);
      $sourcePath = $_FILES['productpic']['tmp_name'];
      // 傳給資料庫路徑
      $data_base_path = './img/product/'.$_FILES['productpic']['name'];
      // 精準找到檔案位子路徑
      $targetPath = $parent."\\img\\product\\" . $_FILES['productpic']['name'];
      move_uploaded_file($sourcePath, $targetPath);
   }
}

//建立SQL
$sql = "insert into product(name,price,status,detail,kind_id,stock,pic,size)
                VALUES (:name,:price,0,:detail,:kind,:stock,:pic,:size);";

// // 包裝起來才可以使PHP 用bindValue
$statement = $link->prepare($sql);

// // 下列都是自定義PHP變數  , 不然看面資料庫看不懂 
$statement->bindValue(":name", $_REQUEST['Add_name']);
$statement->bindValue(":price", $_REQUEST['Add_price']);
// $statement->bindValue(":status", $_REQUEST['Add_status']);
$statement->bindValue(":detail", $_REQUEST['Add_detail']);
$statement->bindValue(":kind", $_REQUEST['Add_kind']);
$statement->bindValue(":stock", $_REQUEST['Add_stock']);
$statement->bindValue(":size", $_REQUEST['Add_size']);
// 照片檔變數
$statement->bindValue(":pic", $data_base_path);

//執行
$statement->execute();
   // echo "新增成功!";
?>