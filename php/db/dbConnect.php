<?php

$mysqli = new mysqli('localhost','mark','password','gpc_db');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

global $mysqli;