<?php

	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	if(!empty($_GET['packageStats'])){
		$query = "SELECT category FROM packages";
		$categories = customQuery($query);
		$categoryStats = array(
				"Discovery" => 0,
				"Packaging" => 0,
				"Quality Assurance" => 0,
				"UAT" => 0,
				"Completed" => 0
			);

		foreach($categories as $category){
			$cat = $category['category'];
			$categoryStats[$cat]++;
		}
		format_response(true, 'user data could not update', $categoryStats);
	};

