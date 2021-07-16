<?php

  /* https://api.telegram.org/bot:XXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
  где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $time = $_POST['time'];
  $token = "12321231232123123212312321231232123";
  $chat_id = "55555555";
  $arr = array(
    'Имя пользователя: ' => $name,
    'Телефон: ' => $phone,
    'Удобное время для звонка' => $time
  );

  foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
  };

  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

  // if ($sendToTelegram) {
  //   // header('Location: thank-you.html');
  //   $message = "Error";
  // } else {
  //   // echo "Error";
  //   $message = "Success";
  // }

  $response = ['message' => $message];
  header("Content-type: application/json");
  echo json_encode($response);
?>
