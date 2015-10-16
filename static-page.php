<?php
$SITE_ROOT = "http://www.curatedcontrols.com/";

$jsonData = getData($SITE_ROOT);
makePage($jsonData, $SITE_ROOT);
function getData($siteRoot) {
    $id = $_GET['id'];

    $MyApplicationId = 'j9xiw2SW5WIg3GcFe5L3mJeIX61zKiXqKwdDcwlG';
    $MyParseRestAPIKey = 'U7Z83FdFHLo9ViIyzg3vMH3Rm7AIqGe9fxgKug4b';
    $url = 'https://api.parse.com/1/classes/control/'.$id;

    $headers = array(
        "Content-Type: application/json",
        "X-Parse-Application-Id: " . $MyApplicationId,
        "X-Parse-REST-API-Key: " . $MyParseRestAPIKey
    );

    $handle = curl_init();
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);

    $data = curl_exec($handle);
    curl_close($handle);

    return json_decode($data);
}

function makePage($data, $siteRoot) {
    ?>
    <!DOCTYPE html>
    <html>
        <head>
            <meta property="og:title" content="<?php echo $data->name; ?>" />
            <meta property="og:description" content="<?php echo $data->description; ?>" />
            <meta property="og:image" content="<?php echo current($data->previews)->url; ?>" />

            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:site" content="@curatedcontrols">
            <meta name="twitter:title" content="<?php echo $data->name; ?>">
            <meta name="twitter:description" content="<?php echo $data->description; ?>">
            <meta name="twitter:image" content="<?php echo current($data->previews)->url; ?>">
        </head>
        <body>
            <p><?php echo $data->description; ?></p>
            <img src="<?php echo current($data->previews)->url; ?>">
        </body>
    </html>
    <?php
}
?>
