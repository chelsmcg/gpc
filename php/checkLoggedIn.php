<?php

	include_once "commonFuncs.php";

	if(loginCheck()){
		format_response(true, 'user is looged in');
	}
	
