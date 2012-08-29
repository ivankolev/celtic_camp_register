<?php
//echo $_POST['step6CampSessionConfirmText'];
//echo $_POST['step6BusTransportationConfirmText'];
//echo $_POST['step6ActivitiesConfirmText'];
//echo $_POST['step6CamperInfoConfirmText'];
//echo $_POST['step6HealthInfoConfirmText'];
//echo $_POST['step6ParentInfoConfirmText'];
$part1 = str_replace("<br>", "\r\n",$_POST['step6CampSessionConfirmText']);
$part1 = strip_tags($part1);
$part2 = str_replace("<br>", "\r\n",$_POST['step6BusTransportationConfirmText']);
$part3 = str_replace("<br>", "\r\n",$_POST['step6ActivitiesConfirmText']);
$part4 = str_replace("<br>", "\r\n",$_POST['step6CamperInfoConfirmText']);
$part5 = str_replace("<br>", "\r\n",$_POST['step6HealthInfoConfirmText']);
$part6 = str_replace("<br>", "\r\n",$_POST['step6ParentInfoConfirmText']);

$toIvan  = 'ivan.kolev@gmail.com';
$toScott = 'scott@scottmcfadyen.com ';
$subject = 'Online Registration Submission';
$message = "Session Information:\r\n".$part1
    ."\r\n".$part2.
    "\r\nActivities:\r\n".$part3.
    "\r\nCamper Information:\r\n".$part4.
    "\r\nHealth Information:\r\n".$part5.
    "\r\nParent Information:\r\n".$part6;
$headers = 'From: webmaster@campceltic.ca' . "\r\n" .
    'Reply-To: webmaster@campceltic.ca' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($toIvan, $subject, $message, $headers);
//mail($toScott, $subject, $message, $headers);
