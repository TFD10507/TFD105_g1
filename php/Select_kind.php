<?php
// 這是類是串聯別頁PHP
require("./Connection.php");
//---------------------------------------------------

//建立SQL語法   *改成那張表的搜尋全部資料
$sql = "SELECT * FROM kind Order by id";
//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
$statement = $link->query($sql);

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll(PDO::FETCH_ASSOC);

// 執行
$statement->execute();

// 轉回去JSON檔案
echo json_encode($data);


