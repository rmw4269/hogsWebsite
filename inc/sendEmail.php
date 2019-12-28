<?php

// Replace this with your own email address
$siteOwnersEmail = 'hogseboard@gmail.com';


if($_POST) {
	$name = trim(stripslashes($_POST['contactName']));
	$email = trim(stripslashes($_POST['contactEmail']));
	$subject = trim(stripslashes($_POST['contactSubject']));
	$contact_message = trim(stripslashes($_POST['contactMessage']));
	/*
	//Get the uploaded file information
	$name_of_uploaded_file = basename($_FILES['uploaded_file']['name']);
	//get the file extension of the file
	$type_of_uploaded_file =
		substr($name_of_uploaded_file,
		strrpos($name_of_uploaded_file, '.') + 1);
	//size in KBs
	$size_of_uploaded_file = $_FILES["uploaded_file"]["size"]/1024;
	*/
	// Check Name
	if (strlen($name) < 2) {
		$error['name'] = "Please enter your name.";
	}
	// Check Email
	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
		$error['email'] = "Please enter a valid email address.";
	}
	// Check Message
	if (strlen($contact_message) < 15) {
		$error['message'] = "Please enter your message. It should have at least 15 characters.";
	}
	/*
	// Check Upload Files
 	//Settings
	$max_allowed_file_size = 100; // size in KB
	
	$allowed_extensions = array("jpg", "jpeg", "pdf");
	//Validations
	if($size_of_uploaded_file > $max_allowed_file_size ){
		$errors .= "\n Size of file should be less than $max_allowed_file_size";
	}
	//------ Validate the file extension -----
	$allowed_ext = false;
	for($i=0; $i<sizeof($allowed_extensions); $i++){
		if(strcasecmp($allowed_extensions[$i],$type_of_uploaded_file) == 0){
			$allowed_ext = true;
		}
	}
	if(!$allowed_ext){
		$errors .= "\n The uploaded file is not supported file type. ".
		"Only the following file types are supported: ".implode(',',$allowed_extensions);
	}
	// COPY UPLOAD
	$path_of_uploaded_file = $upload_folder . $name_of_uploaded_file;
	$tmp_path = $_FILES["uploaded_file"]["tmp_name"];
	if(is_uploaded_file($tmp_path)){
		if(!copy($tmp_path,$path_of_uploaded_file)){
			$errors .= '\n error while copying the uploaded file';
		}
	}
	*/
	// COMPOSE EMAIL
	//============================================================================
	
	// Subject
	if ($subject == '') {
		$subject = "Contact Form Submission";
	}
	// Set Message
	$message .= "Email from: " . $name . "<br />";
	$message .= "Email address: " . $email . "<br />";
	$message .= "Message: <br />";
	$message .= $contact_message;
	$message .= "<br /> ----- <br /> This email was sent from your site's contact form. <br />";
	/*
	$message .= addAttachment($path_of_uploaded_file);
	*/
	// Set From: header
	$from =  $name . " <" . $email . ">";
	// Email Headers
	$headers = "From: " . $from . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
 	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

	// Attempt Send
	if (!$error) {
    	ini_set("sendmail_from", $siteOwnersEmail); // for windows server
    	$mail = mail($siteOwnersEmail, $subject, $message, $headers);
		if ($mail) { echo "OK"; }
    	else { echo "Something went wrong. Please try again."; }	
	} # end if - no validation error
	else {
		$response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;
		$response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
		$response .= (isset($error['message'])) ? $error['message'] . "<br />" : null;
		echo $response;
	} # end if - there was a validation error
	
}
?>