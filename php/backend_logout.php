<?php

session_start();
// 登出
session_destroy();

header("Location: ../backendLogin.html");

?>