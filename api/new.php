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
            $sql = "SELECT * FROM cars WHERE id = $id";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                echo json_encode($result->fetch_assoc());
            } else {
                echo json_encode(array("message" => "Car not found"));
            }
        } else {
            $sql = "SELECT * FROM cars";
            $result = $conn->query($sql);
            $cars = array();
            while ($row = $result->fetch_assoc()) {
                $cars[] = $row;
            }
            echo json_encode($cars);
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['carId'], $data['mileage'], $data['day'], $data['userId'], $data['users'], $data['carsId'], $data['cars'],$data['cost'] )) {
            $carId = $data['carId'];
            $mileage = $data['mileage'];
            $day = $data['day'];
            $userId = $data['userId'];
            $users = $data['users'];
            $carId = $data['carId'];
            $cars = $data['cars'];
            $cost = $data['cost'];
            $sql = "INSERT INTO cars (carsId, mileage, day, userId, users, carsId , cars, cost) VALUES ('$carId''$mileage', '$day', $userId, '$users', $carId, $cars '$cost')";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(array("message" => "New car added successfully"));
            } else {
                echo json_encode(array("error" => $conn->error));
            }
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
    
            // Debugging: Print received data
            error_log("Received PUT data: " . print_r($data, true));
    
            if (isset($data['carId'], $data['mileage'], $data['day'], $data['userId'], $data['users'], $data['carId'], $data['cars'], $data['cost'])) {
                $carid = intval($data['carid']);
                $mileage = $data['mileage'];
                $day = $data['day'];
                $userId = $data['userId'];
                $users = $data['users'];
                $carsId = $data['carsId'];
                $cars = $data['cars'];
                $cost = $data['cost'];
                $sql = "UPDATE carsId SET mileage='$mileage', day='$day', userId=$userId, users='$users', carsId=$carsId, cars=$cars WHERE cost=$cost";
    
                // Debugging: Print SQL query
                error_log("Generated SQL query: " . $sql);
    
                if ($conn->query($sql) === TRUE) {
                    echo json_encode(array("message" => "Car updated successfully"));
                } else {
                    echo json_encode(array("error" => $conn->error));
                }
            } else {
                echo json_encode(array("error" => "Invalid input"));
            }
            break;
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'])) {
            $id = intval($data['id']);
            $sql = "DELETE FROM cars WHERE id=$id";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(array("message" => "Car deleted successfully"));
            } else {
                echo json_encode(array("error" => $conn->error));
            }
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;
}

$conn->close();
?>
