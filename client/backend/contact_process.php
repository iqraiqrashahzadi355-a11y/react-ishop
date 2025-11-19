<?php
// contact_process.php

//  Enable error reporting (for debugging — optional)
error_reporting(E_ALL);
ini_set('display_errors', 1);

//  Allow only POST requests
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // 🔹 Sanitize and get form data
    $name = htmlspecialchars(trim($_POST["name"] ?? ""));
    $email = htmlspecialchars(trim($_POST["email"] ?? ""));
    $phone = htmlspecialchars(trim($_POST["phone"] ?? ""));
    $message = htmlspecialchars(trim($_POST["message"] ?? ""));

    // 🔹 Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo " Please fill all required fields (Name, Email, Message).";
        exit;
    }

    // 🔹 Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo " Please enter a valid email address.";
        exit;
    }

    //  Optional: Connect to Database (if you want to save messages)
    $conn = new mysqli("localhost", "root", "", "ishop");

    if ($conn->connect_error) {
        echo " Database connection failed: " . $conn->connect_error;
        exit;
    }

    //  Prepare SQL query
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phone, $message);

    if ($stmt->execute()) {
        echo " Thank you, $name! Your message has been received.";
    } else {
        echo " Error while submitting your message. Please try again.";
    }

    $stmt->close();
    $conn->close();

} else {
    echo " Invalid request method.";
}
?>
