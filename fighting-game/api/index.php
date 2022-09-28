<?php
error_reporting(-1);
require_once("application/Application.php");
header("Content-type:application/json; charset-utf-8");

function router($params) {
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            
            case 'login': return $app->login($params);
            case 'logout': return $app->logout($params);
            case 'registration': return $app->registration($params);

            case 'getOffers': return $app->getOffers($params);
            case 'createOffers': return true;
            case 'deleteOffers': return true;
            case 'acceptOffers': return true;
            case 'isOfferAccepted': return true;

            case 'getGame': return $app->getGame($params);
            case 'makeTurn': return $app->makeTurn($params);
            case 'leftGame': return $app->leftGame($params);

            case 'sessionOn': return $app->sessionOn($params);
            case 'getMap': return $app->getMap($params);

            case 'createGamer': return $app->createGamer($params);
            case 'createSword': return $app->createSword($params);

            case 'moveGamerSword': return $app->moveGamerSword($params);
            case 'moveGamer': return $app->moveGamer($params);
            case 'moveSword': return $app->moveSword($params);

            case 'drawGamerSword': return $app->drawGamerSword($params);
            case 'kill': return $app->kill($params);
            case 'die': return $app->die($params);
            case 'getScore': return $app->getScore($params);
        };

    }
    return false;
}

function answer($data) {
    if($data) {
        return array('status'=>'OK', 'data'=>$data);
    }
    return array('status'=>'ERROR');
}
echo json_encode(answer(router($_GET)));
?>