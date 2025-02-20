<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$host = "*****************";
$dbname = "***************";
$username = "***********";
$password = "*****************";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_PERSISTENT => true
    ]);

    $pdo->exec("CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone INT(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
} catch (PDOException $e) {
    die(json_encode(["error" => "Database connection failed: " . $e->getMessage()]));
}

$request_uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

if ($request_uri === "/api/submit" && $method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data["name"], $data["email"], $data["phone"])) {
        die(json_encode(["error" => "Invalid request"]));
    }

    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)");
    if ($stmt->execute([$data["name"], $data["email"], $data["phone"]])) {
        echo json_encode(["success" => "Message saved"]);
    } else {
        echo json_encode(["error" => "Failed to save message"]);
    }
} elseif ($request_uri === "/api/contacts" && $method === "GET") {
    $stmt = $pdo->query("SELECT id, name, email, phone FROM contacts");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} else {
    http_response_code(200);
    echo json_encode(["error" => "This route returns no page. Try something else!"]);
}
?>
