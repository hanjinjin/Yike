<?php

	$day = $_GET['day'];  //-5

    /*
       strtotime php 的一个函数.

      strtotime("day") //获取当前时间，并且把当前时间变成时间戳
      date 格式化日期.   2017-03-30 php 的格式化的
    */

	$date = date('Y-m-d', strtotime($day . 'day')); // -1day

	$url = 'https://moment.douban.com/api/stream/date/'. $date .'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	echo file_get_contents($url);

?>