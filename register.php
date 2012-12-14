<?php
//echo $_POST['step6CampSessionConfirmText'];
//echo $_POST['step6BusTransportationConfirmText'];
//echo $_POST['step6ActivitiesConfirmText'];
//echo $_POST['step6CamperInfoConfirmText'];
//echo $_POST['step6HealthInfoConfirmText'];
//echo $_POST['step6ParentInfoConfirmText'];
$part1_0 = str_replace("<br>", "\r\n",urldecode($_POST['step6CampSessionConfirmText0']));
$part1_0 = strip_tags($part1_0);
$part1_1 = str_replace("<br>", "\r\n",urldecode($_POST['step6CampSessionConfirmText1']));
$part1_1 = strip_tags($part1_1);
$part1_2 = str_replace("<br>", "\r\n",urldecode($_POST['step6CampSessionConfirmText2']));
$part1_2 = strip_tags($part1_2);
$part1_3 = str_replace("<br>", "\r\n",urldecode($_POST['step6CampSessionConfirmText3']));
$part1_3 = strip_tags($part1_3);
$part2 = str_replace("<br>", "\r\n",urldecode($_POST['step6BusTransportationConfirmText']));
$part2 = strip_tags($part2);
$part3 = str_replace("<br>", "\r\n",urldecode($_POST['step6ActivitiesConfirmText']));
$part3 = str_replace("</div>", "\r\n", $part3);
$part3 = str_replace('<div class=`sessionHeader`>', "", $part3);
$part4 = str_replace("<br>", "\r\n",urldecode($_POST['step6CamperInfoConfirmText']));
$part4 = strip_tags($part4);
$part5 = str_replace("<br>", "\r\n",urldecode($_POST['step6HealthInfoConfirmText']));
$part5 = strip_tags($part5);
$part6 = str_replace("<br>", "\r\n",urldecode($_POST['step6ParentInfoConfirmText']));
$part6 = strip_tags($part6);

$separator = "---------------------------------------";

$toIvan  = 'ivan.kolev@gmail.com';
$toScott = 'scott@scottmcfadyen.com';
$toGeoff = 'higeoffyates@hotmail.com';
$subject = 'Online Registration Submission';
$message = "Session Information:\r\n".$part1_0."\r\n".$part1_1."\r\n".$part1_2."\r\n".$part1_3
    ."\r\n".$part2.$separator.
    "\r\nActivities:\r\n".$part3."\r\n".$separator.
    "\r\nCamper Information:\r\n".$part4."\r\n".$separator.
    "\r\nHealth Information:\r\n".$part5.$separator.
    "\r\nParent Information:\r\n".$part6;
$headers = 'From: webmaster@campceltic.ca' . "\r\n" .
    'Reply-To: webmaster@campceltic.ca' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();


$confirmSubject = "Camp Celtic - We've received your registration";

$confirmMessage = "Thank you for registering for camp at Camp Celtic. After we review your registration we'll contact
you with an invoice email and all the information you need to make the most of Camp Celtic. If we have any questions
or concerns we may call you directly. If you would like to speak to us please don't hesitate to call or email.
Our contact information is at the bottom of this email."."\r\n\r\n"."
Below is the information we received from you. Please double check this and contact us if there are any errors or omissions.
"."\r\n"."
See you soon!"."\r\n\r\n".$separator.$message."\r\n".$separator."\r\n".
"Camp Celtic\r\n
248 Stokes Bay Road\r\n
Lion's Head, ON\r\n
N0H1W0\r\n
\r\n
519-793-3911\r\n
info@campceltic.ca\r\n
\r\n
\r\n
Since 1984 Camp Celtic has created thousands of fantastic camp experiences\r\n
for kids from throughout Ontario and around the world.";
$confirmEmail = $_POST["step5Email1"];


mail($confirmEmail, $confirmSubject, $confirmMessage, $headers);
mail($toIvan, $subject, $message, $headers);
//mail($toScott, $subject, $message, $headers);
//mail($toGeoff, $subject, $message, $headers);
