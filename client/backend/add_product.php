<?php
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $category = $_POST['category'];

    // Image upload
    $image = '';
    if (!empty($_FILES['image']['name'])) {
        $target_dir = "uploads/";
        $image = basename($_FILES["image"]["name"]);
        $target_file = $target_dir . $image;
        move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);
    }

    $sql = "INSERT INTO products (name, description, price, category, image) 
            VALUES ('$name', '$description', '$price', '$category', '$image')";
    if (mysqli_query($conn, $sql)) {
        echo json_encode(["success" => true, "message" => "Product added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error adding product"]);
    }
}
?>
