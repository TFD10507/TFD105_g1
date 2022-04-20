<?php
// 這支用來更新會員資料進去G1.member

require("Connection.php");
//---------------------------------------------------
// variable
$member = json_decode(file_get_contents("php://input"));
// print_r($member);
// exit();

//SQL語法
$sql = "UPDATE G1.member 
            set 
                user = :user,
                address = :address,
                phone = :phone
            WHERE id = 3;";

//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
// $statement = $link->query($sql);
$statement = $link->prepare($sql);

// // $statement->bindValue(":account", $member->account);
$statement->bindValue(":user", $member->user);
$statement->bindValue(":address", $member->address);
$statement->bindValue(":phone", $member->phone);

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll(PDO::FETCH_ASSOC);

//執行
$statement->execute();

$result_count = $statement->rowCount();

// 判定是否更新成功 
$mem["message"] = $result_count != 0 ? "更新成功" : "更新錯誤，請聯絡管理員!";

// 轉回去JSON檔案
// echo json_encode($data);
// echo ($mem["message"]);

echo json_encode($mem["message"]);

?>