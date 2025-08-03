<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'name' => $_POST['fname'] ?? '',
        'phone' => $_POST['phone'] ?? '',
        'email' => $_POST['email'] ?? '',
        'subject' => $_POST['subject'] ?? '',
        'message' => $_POST['msg'] ?? ''
    ];

    $json = json_encode($data);

    $ch = curl_init('https://script.google.com/macros/s/AKfycbzK14ky74zaAg4GazLXOobrzemVco7sl3CWwp9lPGPysGr0tLpo1Ckf7YJ7cs1WsIa6/exec');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    $response = curl_exec($ch);
    curl_close($ch);

    // ✅ Send JSON back to your JS
    echo json_encode([
        'status' => 'Success',
        'msg' => 'Thank you! Your message has been sent. Our team will contact you soon.'
    ]);
    exit;
}

// If not POST, respond with error
echo json_encode([
    'status' => 'Error',
    'msg' => 'Form was submitted. Please check your internet connection and try again later.'
]);
exit;
