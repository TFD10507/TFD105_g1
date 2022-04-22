<?php
    require("Connection.php");  

    $result = array('status' => '', 'message' => '');
    $coupon = json_decode(file_get_contents("php://input"));
    if(!isset($coupon)){
        $result['status'] = 'FAIL01';
        $result['message'] = '未收到參數';
    } else if(empty($coupon->newprice) || $coupon->newprice <= 0){
        $result['status'] = 'FAIL02';
        $result['message'] = '酷碰券金額不得小於0，或不能為空';
    } else if(empty($coupon->newperiod)){
        $result['status'] = 'FAIL03';
        $result['message'] = '可使用時間不得為空';
    }

    //如果以上有未通過的 就不會到這裡來了，會直接echo json_encode($result); 把錯誤結果給前端
    if($result['status'] == ''){
        $sql = "INSERT INTO G1.coupon(price,period,date) VALUES(:price,:dayss,CURDATE());";
        $statement = $link->prepare($sql);
        $statement->bindValue(":price", $coupon->newprice);
        $statement->bindValue(":dayss", $coupon->newperiod);
        $statement->execute();
        $result['status'] = 'SUCCESS';
        $result['message'] = '新增成功';
    }
    
    echo json_encode($result);
?>