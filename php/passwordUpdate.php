<?php
// 這支用來更新密碼進去G1.member

session_start();
require("connection.php");
$_SESSION["userID"] = "test123";
print_r($_SESSION["userID"]);


// if(isset($_POST['Submit']))
// {
//  $oldpass=md5($_POST['opwd']);
//  $useremail=$_SESSION['login'];
//  $newpassword=md5($_POST['npwd']);
// $sql=mysqli_query($con,"SELECT password FROM userinfo where password='$oldpass' && email='$useremail'");
// $num=mysqli_fetch_array($sql);
// if($num>0)
// {
//  $con=mysqli_query($con,"update userinfo set password=' $newpassword' where email='$useremail'");
// $_SESSION['msg1']="Password Changed Successfully !!";
// }
// else
// {
// $_SESSION['msg1']="Old Password not match !!";
// }
// }


$pwd = json_decode(file_get_contents("php://input"));
// print_r ( $pwd );

$sql = "UPDATE G1.member set password = if ( password = :oldPassword, :newPassword2, password);";

$statement = $link->prepare($sql);

$statement->bindValue(":oldPassword", $pwd->oldPassword);
// $statement->bindValue(":newPassword", $pwd->newPassword);
$statement->bindValue(":newPassword2", $pwd->newPassword2);
// echo $pwd->newPassword;
$data = $statement->fetchAll(PDO::FETCH_ASSOC);
// print_r($data); //array 

$statement->execute();
// $result_count = $statement->rowCount();
// $successful = $result_count > 0;



?>