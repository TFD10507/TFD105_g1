<?php
include('connection.php');

$result = array('status' => '', 'message' => '');
$coupon = json_decode(file_get_contents("php://input"));
if (!isset($coupon)) {
    $result['status'] = 'FAIL01';
    $result['message'] = '未收到參數';
} else if (empty($coupon->newprice) || $coupon->newprice <= 0) {
    $result['status'] = 'FAIL02';
    $result['message'] = '酷碰券金額不得小於0，或不能為空';
} else if (empty($coupon->newperiod)) {
    $result['status'] = 'FAIL03';
    $result['message'] = '可使用時間不得為空';
}


# 產生隨機字串的 PHP 函數
function random_string($length = 9, $characters =  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
{
    if (!is_int($length) || $length < 0) {
        return false;
    }
    $characters_length = strlen($characters) - 1;
    $string = '';

    for ($i = 0; $i < $length; $i++) {
        $string .= $characters[mt_rand(0, $characters_length)];
    }
    return $string;
}

# 產生長度為 5 的隨機字串
$myRandStr = random_string();

//如果以上有未通過的 就不會到這裡來了，會直接echo json_encode($result); 把錯誤結果給前端
if ($result['status'] == '') {
    $sql = "INSERT INTO coupon(price,period,date,code) VALUES(:price,:dayss,CURDATE(),'$myRandStr');";
    $statement = $link->prepare($sql);
    $statement->bindValue(":price", $coupon->newprice);
    $statement->bindValue(":dayss", $coupon->newperiod);
    $statement->execute();
    $result['status'] = 'SUCCESS';
    $result['message'] = '新增成功';
}

echo json_encode($result);

?>