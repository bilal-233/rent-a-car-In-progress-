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

// Enable error reporting
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT * FROM bills WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                echo json_encode($result->fetch_assoc());
            } else {
                echo json_encode(array("message" => "Bill not found"));
            }
            $stmt->close();
        } else {
            $result = $conn->query("SELECT * FROM bills");
            $bills = array();
            while ($row = $result->fetch_assoc()) {
                $bills[] = $row;
            }
            echo json_encode($bills);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['userId'], $data['carId'], $data['day'], $data['mileage'], $data['cost'])) {
            $userId = intval($data['userId']);
            $carId = intval($data['carId']);
            $day = intval($data['day']);
            $mileage = floatval($data['mileage']);
            $cost = floatval($data['cost']);

            $stmt = $conn->prepare("INSERT INTO bills (user_id, car_id, day, mileage, total_cost) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("iiidd", $userId, $carId, $day, $mileage, $cost);

            if ($stmt->execute()) {
                echo json_encode(array("message" => "New bill added successfully"));
            } else {
                echo json_encode(array("error" => $stmt->error));
            }

            $stmt->close();
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'], $data['userId'], $data['carId'], $data['day'], $data['mileage'], $data['cost'])) {
            $id = intval($data['id']);
            $userId = intval($data['userId']);
            $carId = intval($data['carId']);
            $day = intval($data['day']);
            $mileage = floatval($data['mileage']);
            $cost = floatval($data['cost']);

            $stmt = $conn->prepare("UPDATE bills SET user_id = ?, car_id = ?, day = ?, mileage = ?, total_cost = ? WHERE id = ?");
            $stmt->bind_param("iiiddi", $userId, $carId, $day, $mileage, $cost, $id);

            if ($stmt->execute()) {
                echo json_encode(array("message" => "Bill updated successfully"));
            } else {
                echo json_encode(array("error" => $stmt->error));
            }

            $stmt->close();
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'])) {
            $id = intval($data['id']);
            $stmt = $conn->prepare("DELETE FROM bills WHERE id = ?");
            $stmt->bind_param("i", $id);

            if ($stmt->execute()) {
                echo json_encode(array("message" => "Bill deleted successfully"));
            } else {
                echo json_encode(array("error" => $stmt->error));
            }

            $stmt->close();
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;

    default:
        echo json_encode(array("error" => "Unsupported request method"));
        break;
}

$conn->close();
?>
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

// Enable error reporting
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT * FROM bills WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                echo json_encode($result->fetch_assoc());
            } else {
                echo json_encode(array("message" => "Bill not found"));
            }
            $stmt->close();
        } else {
            $result = $conn->query("SELECT * FROM bills");
            $bills = array();
            while ($row = $result->fetch_assoc()) {
                $bills[] = $row;
            }
            echo json_encode($bills);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['userId'], $data['carId'], $data['day'], $data['mileage'], $data['cost'])) {
            $userId = intval($data['userId']);
            $carId = intval($data['carId']);
            $day = intval($data['day']);
            $mileage = floatval($data['mileage']);
            $cost = floatval($data['cost']);

            $stmt = $conn->prepare("INSERT INTO bills (user_id, car_id, day, mileage, total_cost) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("iiidd", $userId, $carId, $day, $mileage, $cost);

            if ($stmt->execute()) {
                echo json_encode(array("message" => "New bill added successfully"));
            } else {
                echo json_encode(array("error" => $stmt->error));
            }

            $stmt->close();
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'], $data['userId'], $data['carId'], $data['day'], $data['mileage'], $data['cost'])) {
            $id = intval($data['id']);
            $userId = intval($data['userId']);
            $carId = intval($data['carId']);
            $day = intval($data['day']);
            $mileage = floatval($data['mileage']);
            $cost = floatval($data['cost']);

            $stmt = $conn->prepare("UPDATE bills SET user_id = ?, car_id = ?, day = ?, mileage = ?, total_cost = ? WHERE id = ?");
            $stmt->bind_param("iiiddi", $userId, $carId, $day, $mileage, $cost, $id);

            if ($stmt->execute()) {
                echo json_encode(array("message" => "Bill updated successfully"));
            } else {
                echo json_encode(array("error" => $stmt->error));
            }

            $stmt->close();
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'])) {
            $id = intval($data['id']);
            $stmt = $conn->prepare("DELETE FROM bills WHERE id = ?");
            $stmt->bind_param("i", $id);

            if ($stmt->execute()) {
                echo json_encode(array("message" => "Bill deleted successfully"));
            } else {
                echo json_encode(array("error" => $stmt->error));
            }

            $stmt->close();
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;

    default:
        echo json_encode(array("error" => "Unsupported request method"));
        break;
}

$conn->close();
?>
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

// Enable error reporting
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT * FROM bills WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                echo json_encode($result->fetch_assoc());
            } else {
                echo json_encode(array("message" => "Bill not found"));
            }
            $stmt->close();
        } else {
            $result = $conn->query("SELECT * FROM bills");
            $bills = array();
            while ($row = $result->fetch_assoc()) {
                $bills[] = $row;
            }
            echo json_encode($bills);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['userId'], $data['carId'], $data['day'], $data['mileage'], $data['cost'])) {
            $userId = intval($data['userId']);
            $carId = intval($data['carId']);
            $day = intval($data['day']);
            $mileage = floatval($data['mileage']);
            $cost = floatval($data['cost']);

            $stmt = $conn->prepare("INSERT INTO bills (user_id, car_id, day, mileage, total_cost) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("iiidd", $userId, $carId, $day, $mileage, $cost);

            if ($stmt->execute()) {
                echo json_encode(array("message" => "New bill added successfully"));
            } else {
                echo json_encode(array("error" => $stmt->error));
            }

            $stmt->close();
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'], $data['userId'], $data['carId'], $data['day'], $data['mileage'], $data['cost'])) {
            $id = intval($data['id']);
            $userId = intval($data['userId']);
            $carId = intval($data['carId']);
            $day = intval($data['day']);
            $mileage = floatval($data['mileage']);
            $cost = floatval($data['cost']);

            $stmt = $conn->prepare("UPDATE bills SET user_id = ?, car_id = ?, day = ?, mileage = ?, total_cost = ? WHERE id = ?");
            $stmt->bind_param("iiiddi", $userId, $carId, $day, $mileage, $cost, $id);

            if ($stmt->execute()) {
                echo json_encode(array("message" => "Bill updated successfully"));
            } else {
                echo json_encode(array("error" => $stmt->error));
            }

            $stmt->close();
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'])) {
            $id = intval($data['id']);
            $stmt = $conn->prepare("DELETE FROM bills WHERE id = ?");
            $stmt->bind_param("i", $id);

            if ($stmt->execute()) {
                echo json_encode(array("message" => "Bill deleted successfully"));
            } else {
                echo json_encode(array("error" => $stmt->error));
            }

            $stmt->close();
        } else {
            echo json_encode(array("error" => "Invalid input"));
        }
        break;

    default:
        echo json_encode(array("error" => "Unsupported request method"));
        break;
}

$conn->close();
?>
