<?php
include("connection.php");
//---------------------------------------------------
$member = json_decode(file_get_contents("php://input"), true);
// echo json_encode($member);

//建立SQL
$sql = "insert into G1.member(account,password,name,phone,jointime,status,address,gender)
values (:account,:password,'',:phone,NOW(),0,:address,:gender);";

  // 包裝起來才可以使PHP 用bindValue
$statement = $link->prepare($sql);

  // 下列都是自定義PHP變數  , 不然看面資料庫看不懂 :price
// $statement->bindValue(":account", $member->account);
// $statement->bindValue(":password", $member->password);
// $statement->bindValue(":phone", $member->phone);
// $statement->bindValue(":address", $member->address);
// $statement->bindValue(":gender", $member->gender);
$statement->bindValue(":account", $member["account"]);
$statement->bindValue(":password", $member["password"]);
$statement->bindValue(":phone", $member["phone"]);
$statement->bindValue(":address", $member["address"]);
$statement->bindValue(":gender", $member["gender"]);

 //執行
$statement->execute();
      //  echo json_encode(['status'=> 'SUCCESS']);
      //  echo "新增成功!";
