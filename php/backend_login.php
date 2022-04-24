<?php
    include('connection.php');
    
    $backend = json_decode(file_get_contents('php://input'));

    // SQL 語法
    $sql = "select * from controller where account = :account and password = :psw";
    // 啟動變數
    $statement = $link->prepare($sql);
    // 設定變數
    $statement ->bindValue(":account", $backend->account);
    $statement ->bindValue(":psw", $backend->psw);
    // 執行
    $statement->execute();

    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

    // 創造空間放狀態
    $status = [];

    // 找尋資料庫 0 筆資料時候
    if(count($data) == 0){
        $status['status'] = 'Error';
    } else {
        // 寫入 session
        session_start();
        $_SESSION["id"] =  $data[0]["id"]; 
        $_SESSION["name"] =  $data[0]["name"]; 
        // echo json_encode($_SESSION);
        // 寫入狀態
        $status['status'] = 'Success';
    }

    echo json_encode($status);
    
?>
