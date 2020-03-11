<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    $data = json_decode(file_get_contents("php://input"));
    $vIme = $data->ime;
    $vMejl = $data->mejl;
    $vTel = $data->telefon;
    $vNaslov = $data->naslov;
    $vMsg = $data->msg;
    $vDatum = date("H:i - d F Y.  ( l ) ");
    $response['status'] = 'uspesno';

    $mail = new PHPMailer(true);
    try {                   // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'smtp.ionos.com';                       // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'info@devechron.com';                   // SMTP username
        $mail->Password   = '8892!Devechron';                       // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
        $mail->Port       = 587;                                    // TCP port to connect to

        $mail->setFrom('info@devechron.com');
        if($vIme) {
            $mail->addReplyTo($vMejl, $vIme);

            $poslao = '<tr><td style="width: 433px; padding: 15px; background-color: #fff0c2;">
                         <h4 style="margin: 2px;">&nbsp;<span style="color: #800000;">Ime</span></h4>
                         <hr style="width: 90%;" />
                         <p style="text-align: center; font-size: 18px; margin: 0;">'.$vIme.'</p>
                       </td></tr>';
        } else {
            $mail->addReplyTo($vMejl, 'Information');
        }
        $mail->addAddress('info@devechron.com', 'Contact Us');
        $mail->isHTML(true);
        $mail->Subject = $vNaslov;
        $poruka = '<div style="width:100%">
                        <h1 style="text-align: center;"><span style="color: #ff6600;"><strong>NOVI ZAHTEV&nbsp;</strong></span></h1>
                        <h2 style="text-align: center;"><span style="background-color: #2e2e2e; color: #d9e021; padding: 5px;"><strong>DEVECHRON</strong></span></h2>
                        <p style="text-align: left;">&nbsp;&nbsp;</p>
                        <table style="width: 471px; margin: auto; height: 322px;">
                        <tbody>
                        '.$poslao.'
                        <tr>
                        <td style="width: 433px; padding: 15px; background-color: #fff0c2;">
                        <h4 style="margin: 2px;">&nbsp;<span style="color: #800000;">E-mail</span></h4>
                        <hr style="width: 90%;" />
                        <p style="text-align: center; font-size: 18px; margin: 0;">'.$vMejl.'</p>
                        </td>
                        </tr>
                        <tr>
                        <td style="width: 433px; padding: 15px; background-color: #fff0c2;">
                        <h4 style="margin: 2px;">&nbsp;<span style="color: #800000;">Poruka</span></h4>
                        <hr style="width: 90%;" />
                        <p style="text-align: justify; font-size: 15px; margin: 0;">'.$vMsg.'</p>
                        </td>
                        </tr>
                        <tr>
                        <td style="width: 433px; padding: 15px; background-color: #fff0c2;">
                        <p style="text-align: center; font-size: 12px; margin: 0;">Poslato '.$vDatum.'</p>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                    </div>';
        $mail->Body = $poruka;
        $mail->send();
    } catch (Exception $e) {
        $response['status'] = 'neuspesno';
        $response['error'] = $mail->ErrorInfo;
    }
    echo json_encode($response);
?>