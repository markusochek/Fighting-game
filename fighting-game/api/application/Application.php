<?php
require_once("db/DB.php");
require_once("users/Users.php");
require_once("sessionMaps/SessionMaps.php");
require_once("game/Game.php");
class Application {
    function __construct() {
        $db = new DB();
        $this->users = new Users($db);
        $this->game = new Game($db);
        $this->sessionMaps = new SessionMaps($db);
    }

    public function login($params) {
        if ($params['login'] && $params['pass']) {
            return $this->users->login($params['login'], $params['pass']);
        }
    }

    public function registration($params) {
        if ($params['login'] && $params['pass'] && $params['name']) {
            return $this->users->registration($params['login'], $params['pass'], $params['name']);
        }
    }

    public function sessionOn($params) {
        if ($params['token'] && $params['sessionId']) {
            return $this->sessionMaps->sessionOn($params['token'], $params['sessionId']);
        }
    }

    public function getMap($params) {
        if ($params['token'] && $params['mapId']) {
            return $this->sessionMaps->getMap($params['token'], $params['mapId']);
        }
    }

    public function createGamer($params) {
        if ($params['sessionId'] && $params['token'] && $params['x'] && $params['y']) {
            return $this->game->createGamer($params['sessionId'], $params['token'], $params['x'], $params['y']);
        }
    }

    public function createSword($params) {
        if ($params['sessionId'] && $params['token'] && $params['x'] && $params['y'] && $params['dir']) {
            return $this->game->createSword($params['sessionId'], $params['token'], $params['x'], $params['y'], $params['dir']);
        }
    }

    public function moveGamerSword($params) {
        if ($params['token'] && $params['xG'] && $params['yG'] && $params['xS'] && $params['yS'] && $params['dirS']) {
            return $this->game->moveGamerSword($params['token'], $params['xG'], $params['yG'], $params['xS'], $params['yS'], $params['dirS']);
        }
    }

    public function moveGamer($params) {
        if ($params['token'] && $params['x'] && $params['y']) {
            return $this->game->moveGamer($params['token'], $params['x'], $params['y']);
        }
    }

    public function moveSword($params) {
        if ($params['token'] && $params['x'] && $params['y'] && $params['dir']) {
            return $this->game->moveSword($params['token'], $params['x'], $params['y'], $params['dir']);
        }
    }

    public function drawGamerSword($params) {
        if ($params['token'] && $params['sessionId']) {
            return $this->game->drawGamerSword($params['token'], $params['sessionId']);
        }
    }

    public function kill($params) {
        if ($params['token'] && $params['idGamer'] && $params['idKiller']) {
            return $this->game->kill($params['token'], $params['idGamer'], $params['idKiller']);
        }
    }

    public function die($params) {
        if ($params['token'] && $params['idGamer']) {
            return $this->game->die($params['token'], $params['idGamer']);
        }
    }

    public function getScore($params) {
        if ($params['token']) {
            return $this->game->getScore($params['token']);
        }
    }

}
?>