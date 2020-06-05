<?php

$naam = $_POST['naam'];
$bezoeker_email = $_POST['email'];
$opmerking = $_POST['opmerking'];

$email_from = 'wesleystrootman7@hotmail.com';

$email_subject = "Contactformulier Kim Nieborg Fotografie";

$email_body = "Naam: $naam.\n".
                "Emailadres: $bezoeker_email.\n".
                    "Opmerking: $opmerking.\n";

$to = "wesleystrootman7@hotmail.com";

$headers = "From: $email_from \r\n";

$headers .= "Reply-To: $bezoeker_email \r\n";

mail($to, $email_subject, $email_body, $headers);

header("Location: contact.html");


?>
