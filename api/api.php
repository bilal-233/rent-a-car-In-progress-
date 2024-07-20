<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "space";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $sql = "SELECT * FROM users WHERE id = $id";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                echo json_encode($result->fetch_assoc());
            } else {
                echo json_encode(array("message" => "User not found"));
            }
        } else {
            $sql = "SELECT * FROM users";
            $result = $conn->query($sql);
            $users = array();
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode($users);
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $name = $data['name'];
        $email = $data['email'];
        $user_type = $data['user_type'];
        $age = $data['age'];
        $city = $data['city'];
        $contact = $data['contact'];
        $address = $data['address'];
        $identification_number = $data['identification_number'];
        $sql = "INSERT INTO users (name, email, user_type, age, city, contact, address, identification_number) 
                VALUES ('$name', '$email', '$user_type', $age, '$city', '$contact', '$address', '$identification_number')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("message" => "New record created successfully"));
        } else {
            echo json_encode(array("error" => $conn->error));
        }
        break;
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            $id = intval($_GET['id']);  // Make sure to get the id from the query parameter
            $name = $data['name'];
            $email = $data['email'];
            $user_type = $data['user_type'];
            $age = $data['age'];
            $city = $data['city'];
            $contact = $data['contact'];
            $address = $data['address'];
            $identification_number = $data['identification_number'];
            $sql = "UPDATE users SET name='$name', email='$email', user_type='$user_type', age=$age, city='$city', 
                    contact='$contact', address='$address', identification_number='$identification_number' WHERE id=$id";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(array("message" => "Record updated successfully"));
            } else {
                echo json_encode(array("error" => $conn->error));
            }
            break;
        
    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $sql = "DELETE FROM users WHERE id=$id";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(array("message" => "Record deleted successfully"));
            } else {
                echo json_encode(array("error" => $conn->error));
            }
        } else {
            echo json_encode(array("error" => "ID not provided"));
        }
        break;
}

$conn->close();
?>
