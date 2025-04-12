<?php
if (isset($_POST['submit'])) {
    $uploadDir = "uploads/";
    $file = $_FILES['image'];
    $fileName = basename($file['name']);
    $fileTmp = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];

    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    if (!in_array($ext, $allowedTypes)) {
        die("Only JPG, JPEG, PNG, and GIF files are allowed.");
    }

    if ($fileError !== 0) {
        die("There was an error uploading your file.");
    }

    if ($fileSize > 5 * 1024 * 1024) {
        die("File is too large. Maximum size is 5MB.");
    }

    // Create unique file name
    $newName = uniqid("IMG_", true) . "." . $ext;

    // Check if upload folder exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $uploadPath = $uploadDir . $newName;

    if (move_uploaded_file($fileTmp, $uploadPath)) {
        echo "Image uploaded successfully: <br>";
        echo "<img src='$uploadPath' alt='Uploaded Image' width='300'>";
    } else {
        echo "Failed to upload image.";
    }
}
?>
