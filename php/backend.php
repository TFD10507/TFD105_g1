<?php
    session_start();
    if (empty($_SESSION)) {
        $status['status'] = 'Error';
        echo json_encode($status);
    }
    // echo json_encode($_SESSION);
    
    // $id = $_SESSION["id"];
    // $name = $_SESSION["name"];

?>