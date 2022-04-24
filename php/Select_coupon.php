<?php
       // 這是類是串聯別頁PHP
       include('connection.php');
       //---------------------------------------------------
       $coupon = json_decode(file_get_contents("php://input"));
       if(isset($coupon)){
              $sql = "SELECT * FROM coupon WHERE id = :id";
              // 包裝起來才可以使PHP 用bindValue
              $statement = $link->prepare($sql);  
              // 自定義變數
              $statement->bindValue(":id", $coupon->couponid);
              // 執行
              $statement->execute();
       }else{
              //建立SQL語法   *改成那張表的搜尋全部資料
              $sql = "SELECT * FROM coupon Order by id";
              //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
              $statement = $link->query($sql);
       }

       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll(PDO::FETCH_ASSOC);

       // 轉回去JSON檔案
       echo json_encode($data);
?>