<?php class Game {
    function __construct($db) {
        $this->db = $db;
    }

    public function createGamer($sessionId, $token, $x, $y) {
        return $this->db->createGamerXY($sessionId, $token, $x, $y);
    }

    public function createSword($sessionId, $token, $x, $y, $dir) {
        return $this->db->createSwordXY($sessionId, $token, $x, $y, $dir);
    }

    public function moveGamerSword($token, $xG, $yG, $xS, $yS, $dirS) {
        return $this->db->moveGamerSwordXY($token, $xG, $yG, $xS, $yS, $dirS);
    }

    public function moveGamer($token, $x, $y) {
        return $this->db->moveGamerXY($token, $x, $y);
    }

    public function moveSword($token, $x, $y, $dir) {
        return $this->db->moveSwordXY($token, $x, $y, $dir);
    }

    public function drawGamerSword($token, $sessionId) {
        return $this->db->drawGamerSwordSessionId($token, $sessionId);
    }

    public function kill($token, $idGamer, $idKiller) {
        return $this->db->killGamer($token, $idGamer, $idKiller);
    }

    public function die($token, $idGamer) {
        return $this->db->dieGamer($token, $idGamer);
    }
    
    public function getScore($token) {
        return $this->db->scoreDie($token);
    }
}