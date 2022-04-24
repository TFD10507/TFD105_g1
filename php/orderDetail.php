<?php
// 這支用來fetch mySQL G1.order_detail的訂單明細

// get all info
require ("connection.php");

//建立SQL語法 搜尋全部資料
// $SQL = " SELECT * from order_detail order by product_id ";

$orderDetail = json_decode(file_get_contents("php://input"));

$SQL = "select 
       p.id,
       p.name,
       p.price, 
       d.quantity,
       SUM(p.price * d.quantity) as sub_price
       from order_detail d
       join product p
           on d.product_id = p.id
   where
       d.order_id = 3
       group by  d.id";

// if(isset($orderDetail)){
//     $sql = "SELECT * FROM order_detail WHERE order_id = :id";
//     // 包裝起來才可以使PHP 用bindValue
//     // $statement = $link->prepare($sql);  
//     $statement = $pdo->prepare($sql);  
//     // 自定義變數
//     $statement->bindValue(":id", $orderDetail->orderId);
//     // 執行
//     $statement->execute();
// }else{
//     //建立SQL語法   *改成那張表的搜尋全部資料
//     $sql = "SELECT * FROM order_detail Order by id";
//     //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
//     $statement = $link->query($sql);
//     // $statement = $pdo->query($sql);
// }

//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
$statement = $link->query($SQL);
// $statement = $pdo->query($sql);

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll(PDO::FETCH_ASSOC);

$statement->execute();

// 轉回去JSON檔案
echo json_encode($data);

?>