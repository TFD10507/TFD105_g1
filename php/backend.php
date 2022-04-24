<?php
    session_start();
    // 判斷有無登入狀態
    if (empty($_SESSION)) {
        $status['status'] = 'Error';
        echo json_encode($status);
    }

?>