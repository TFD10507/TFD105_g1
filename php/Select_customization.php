<?php
       // 這是類是串聯別頁PHP
       include('connection.php');

       //---------------------------------------------------
       $customization = json_decode(file_get_contents("php://input"));
 
       if(isset($customization)){
              $sql = "SELECT * FROM customization WHERE id = :id";
              $statement = $link->prepare($sql);
              $statement->bindValue(":id", $customization->customizationid);
              $statement->execute();
       }else{
              //建立SQL語法   *改成那張表的搜尋全部資料
              $sql = "SELECT * FROM customization Order by id desc";
              //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
              $statement = $link->query($sql);
       }

       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll(PDO::FETCH_ASSOC);

      

       // 轉回去JSON檔案
       echo json_encode($data);
?>