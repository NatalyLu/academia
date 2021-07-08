<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['phone'];
$time = $_POST['time'];

// Enable verbose debug output
//$mail->SMTPDebug = 3;

// Set mailer to use SMTP
$mail->isSMTP();
// Specify main and backup SMTP servers
$mail->Host = 'smtp.mail.ru';
// Enable SMTP authentication
$mail->SMTPAuth = true;
// Логин и пароль от почты с которой будут отправляться письма
$mail->Username = 'egeacademy_callback@mail.ru';
$mail->Password = 'EgeCallback1310';
// Enable TLS encryption, `ssl` also accepted
$mail->SMTPSecure = 'ssl';
// TCP port to connect to
$mail->Port = 465;

// От кого будет уходить письмо?
$mail->setFrom('egeacademy_callback@mail.ru');
// Кому будет уходить письмо
$mail->addAddress('egeacademynn@gmail.com');
// Name is optional
//$mail->addAddress('ellen@example.com');
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
// Add attachments
//$mail->addAttachment('/var/tmp/file.tar.gz');
// Optional name
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');
// Set email format to HTML
$mail->isHTML(true);

$mail->Subject = 'Заявка на звонок';
$mail->Body    = '' .$name . ' оставил заявку, его телефон<br> '.$phone. '<br>Удобное время для звонка: ' .$time;
$mail->AltBody = '';

if(!$mail->send()) {
    // echo 'Error';
    header('location: error.html');
} else {
    header('location: thank-you.html');
}
?>
