<?php
include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if (isset($_GET['category'])) {
    $category = $_GET['category'];
    $query = "SELECT * FROM products WHERE category='$category'";
} else {
    $query = "SELECT * FROM products";
}

$result = mysqli_query($conn, $query);

$products = [];
while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode($products);
?>
