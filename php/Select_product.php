<?php
       // 這是類是串聯別頁PHP
       include('connection.php');
       //---------------------------------------------------
       // 把前端的數值丟進暫存容器
       $product = json_decode(file_get_contents("php://input"));
       
       //如果html有傳值,先找值對應的ID
       if(isset($product)){    
              $sql = "SELECT * FROM product WHERE id = :id";
              // 包裝變數讓php看得懂
              $statement = $link->prepare($sql);
              //  自創的變數
              $statement->bindValue(":id", $product->productid);
              //  執行
              $statement->execute();
       }else{  //沒有傳值,就改成搜索全部會員資料
              //建立SQL語法   *改成那張表的搜尋全部資料
              $sql = "SELECT * FROM product Order by id";
              //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
              $statement = $link->query($sql);
       }

       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll(PDO::FETCH_ASSOC);

       //狀態數字改寫
       foreach($data as $status => $value){
              if($value['status'] == 0){
                     $data[$status]['text'] = '上架';
              }else if($value['status'] == 1){
                     $data[$status]['text'] = '下架';
              }
       };

       // 轉回去JSON檔案
       echo json_encode($data);