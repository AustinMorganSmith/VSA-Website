<?php
$name=stripslashes($_POST["name"]);
$email=stripslashes($_POST["email"]);
$subject=stripslashes($_POST["subject"]);
$secret="6LeqSMkaAAAAAA4oXzB6YzdGqJJSgLftvM7vH-vx";
$response=$_POST["captcha"];

$verify=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
$captcha_success=json_decode($verify);
if ($captcha_success->success==false) {
  echo "Error, you are a robot?";
}
else if ($captcha_success->success==true) {
  echo "successful!!";
}
?>