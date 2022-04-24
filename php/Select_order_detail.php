<?php
// 這是類是串聯別頁PHP
include('connection.php');
//---------------------------------------------------
// 把前端的數值丟進暫存容器
$order_detail = json_decode(file_get_contents("php://input"));

//如果html有傳值,先找值對應的ID
if (isset($order_detail)) {
       $sql = "select 
       p.id,
       p.name,
       p.price,	
       d.quantity,
       SUM(p.price * d.quantity) total_price
       from order_detail d
       join product p
           on d.product_id = p.id
   where
       d.order_id = :id 
       group by  d.id";
       $statement = $link->prepare($sql);
       $statement->bindValue(":id", $order_detail->detail_id);
       $statement->execute();
} else {  //沒有傳值,就改成搜索全部會員資料
       //建立SQL語法   *改成那張表的搜尋全部資料
       $sql = "SELECT * FROM order_detail Order by id";
       //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
       $statement = $link->query($sql);
}

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll(PDO::FETCH_ASSOC);


// 轉回去JSON檔案
echo json_encode($data);

?>
