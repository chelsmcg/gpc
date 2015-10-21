<?php
	require_once 'emailConfig.php';
	require_once 'emailFuncs.php';
	echo email('<h1>testing</h1>', 'mark-g-@hotmail.com', 'Mark', 'email test');	require_once '../php/commonFuncs.php';
	// echo email('<h1>testing</h1>', 'mark-g-@hotmail.com', 'Mark', 'email test');
	echo time();
	$time = time();
	$date = date("d-m-Y h:ia",$time);
	echo "the time is $time cool! $date haha";