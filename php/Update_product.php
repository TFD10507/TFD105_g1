<?php
// 這是類是串聯別頁PHP
require("./Connection.php");
//---------------------------------------------------
$UPproduct = json_decode(file_get_contents("php://input"));
echo json_encode($UPproduct);

// // SQL 語法
$sql = "update product
              set 
                  name=:name,
                  status=:status,
                  price=:price,
                  stock=:stock,
                  detail=:detail,
                  size=:size,
                  kind_id=:kind
              where
                  id=:id;";
//使用這個包裝才可以讓PHP,使用自己定義的 Value
$statement = $link->prepare($sql);

// 自定義 Value區
$statement->bindValue(":name", $UPproduct->UPname);
$statement->bindValue(":price", $UPproduct->UPprice);
$statement->bindValue(":stock", $UPproduct->UPstock);
$statement->bindValue(":status", $UPproduct->UPstatus);
$statement->bindValue(":detail", $UPproduct->UPdetail);
$statement->bindValue(":size", $UPproduct->UPsize);
$statement->bindValue(":kind", $UPproduct->UPkind);
$statement->bindValue(":id", $UPproduct->UPid);

// 執行
$statement->execute();

?>