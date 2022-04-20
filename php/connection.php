<?php
// //MySQL相關資訊
// $db_host = "127.0.0.1";
// $db_user = "root";
// $db_pass = "password";
// $db_select = "pdo";
// $db_name = "G1";

// $db_host = "127.0.0.1";
// $db_user = "tibamefe_since2021";
// $db_pass = "vwRBSb.j&K#E";
// $db_name = "tibamefe_tfd105g1";

//建立資料庫連線物件
// $dsn = "mysql:host=" . $db_host . ";dbname=" . $db_name;

// 連線資訊
// try {
//     // 建立MySQL伺服器連接和開啟資料庫 
//     $link = new PDO($dsn, $db_user, $db_pass);
//     // 指定PDO錯誤模式和錯誤處理
//     $link->setAttribute(
//         PDO::ATTR_ERRMODE,
//         PDO::ERRMODE_EXCEPTION
//     );
//     // echo "成功建立MySQL伺服器連接和開啟test資料庫"; 
//     // print_r ($link);
// } catch (PDOException $e) {
//     // echo "連接失敗: " . $e->getMessage();
// }
?>
<?php
//MySQL相關資訊
$db_host = "127.0.0.1";
$db_user = "root";
$db_pass = "password";
$db_select = "G1";


// $db_host = "127.0.0.1";
// $db_user = "tibamefe_since2021";
// $db_pass = "vwRBSb.j&K#E";
// $db_name = "tibamefe_tfd105g1";

//建立資料庫連線物件
$dsn = "mysql:host=" . $db_host . ";dbname=" . $db_select;

//建立PDO物件，並放入指定的相關資料
$pdo = new PDO($dsn, $db_user, $db_pass);
//   return $pdo;

?>