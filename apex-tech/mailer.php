<?php

// Define some constants
define( "RECIPIENT_NAME", "Test Message" );
define( "RECIPIENT_EMAIL", "ashhad4u@yahoo.com" );
define( "EMAIL_SUBJECT", "Message from Apex Technology" );

// Read the form values
$success = false;
$senderName = isset( $_POST['name'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['name'] ) : "";
$senderEmail = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";
$message = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

//Send Email
$recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
$headers = "From: " . $senderName . " <" . $senderEmail . ">";
$success = mail( $recipient, EMAIL_SUBJECT, $message, $headers );



?>