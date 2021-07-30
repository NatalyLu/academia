<?php

  /* https://api.telegram.org/bot:XXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
  где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

  $name = $_POST['name-review'];
  $comment = $_POST['comment-review'];
  $token = "12321231232123123212312321231232123";
  $chat_id = "55555555";
  $arr = array(
    'Имя пользователя: ' => $name,
    'Отзыв:' => $comment
  );

  foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> <br><br> ".$value."%0A";
  };

  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
  return($sendToTelegram);
?>
