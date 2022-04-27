<?php
// 這是類是串聯別頁PHP
include('connection.php');
//---------------------------------------------------
// 把前端的數值丟進暫存容器
$order = json_decode(file_get_contents("php://input"));

//如果html有傳值,先找值對應的ID
if (isset($order)) {
       $sql = "select
                     o.id,
                     o.ID_order,
                     o.member_id,
                     m.account,
                     o.phone,
                     o.date,
                     o.address,
                     SUM(p.price * ol.quantity) as     total_price,
                     o.status,
                     o.other,
                     o.name
              from
                     `order` o
              join 
                     member m
                            on o.member_id = m.id
              join 
                     order_detail ol
                            on o.id = ol.order_id
              join
                     product p
                            on  ol.product_id = p.id
              where 
                     o.id = :id
              group by
                     o.id";
       $statement = $link->prepare($sql);
       $statement->bindValue(":id", $order->orderid);
       $statement->execute();
} else {  //沒有傳值,就改成搜索全部會員資料
       //建立SQL語法   *改成那張表的搜尋全部資料
       $sql = "SELECT * FROM `order` Order by id desc";
       //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
       $statement = $link->query($sql);
}

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll(PDO::FETCH_ASSOC);


// 轉回去JSON檔案
echo json_encode($data);

?>
