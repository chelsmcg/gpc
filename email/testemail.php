<?php
	require_once 'emailConfig.php';
	require_once 'emailFuncs.php';
	echo email('<h1>testing</h1>', 'mark-g-@hotmail.com', 'Mark', 'email test');