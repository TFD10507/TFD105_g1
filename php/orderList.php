<?php
// 這支用來fetch mySQL G1.order的訂單清單
// get all info
require ("connection.php");

//建立SQL語法 搜尋全部資料
$SQL = " SELECT * from order order by id ";

//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
$statement = $link->query($SQL);

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll(PDO::FETCH_ASSOC);

// 轉回去JSON檔案
echo json_encode($data);

?>