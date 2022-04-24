<?php
require_once("./Connection.php");

// 網頁傳回來的 id 跟 psw


 //MySQL相關資訊
 $db_host = "127.0.0.1";
 $db_user = "root";
 $db_pass = "password";
 $db_select = "pdo";
 $db_name = "G1";

 //建立資料庫連線物件
 $dsn = "mysql:host=".$db_host.";dbname=".$db_name;

 // 連線資訊
//  try {
//      // 建立MySQL伺服器連接和開啟資料庫 
//      $link = new PDO($dsn, $db_user, $db_pass);
//      // 指定PDO錯誤模式和錯誤處理
//      $link->setAttribute(PDO::ATTR_ERRMODE, 
//          PDO::ERRMODE_EXCEPTION);
//      // echo "成功建立MySQL伺服器連接和開啟test資料庫"; 
//      // print_r ($link);
//  } catch (PDOException $e) {
//      // echo "連接失敗: " . $e->getMessage();
//  }

$pdo = new PDO($dsn, $db_user, $db_pass);

$id = $_POST["id"];
$psw = $_POST["psw"];

$sql = "select * from controller where account = '$id' and password = '$psw'";
$statement = $pdo->query($sql);
$data = $statement->fetchAll();

if (count($data) > 0) {
    //轉址
    session_start();
    $_SESSION["memberID"] = "$id";

    // header("Location:Main.php");
    // echo '登入成功';
    // 再用登入成功傳到前面去判定
    // header("Location:search1.php");
    header("Location:../backend.html");
} else {
    // echo "帳號或密碼錯誤";
    // 失敗回到原頁
    header("Location:backendLogin.html");
    // alert("帳號密碼錯誤");
}
