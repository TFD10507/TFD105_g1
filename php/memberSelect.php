<?php
       // 這是類是串聯別頁PHP
       require("connection.php");

       //---------------------------------------------------
       $member = json_decode(file_get_contents("php://input"));
       
       $sql = "SELECT * FROM member WHERE id = :id";
              $statement = $link->prepare($sql);
              $statement->bindValue(":id" , $member->id);
              $statement->execute();

       $data = $statement->fetchAll(PDO::FETCH_ASSOC);

       echo json_encode($data);
       
?>