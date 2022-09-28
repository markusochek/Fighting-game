<?php class SessionMaps {
    function __construct($db) {
        $this->db = $db;
    }
    
    public function SessionOn($token, $sessionId) {
        return $this->db->SessionOnId($token, $sessionId);
    }

    public function getMap($token, $mapId) {
        return $this->db->getMapId($token, $mapId);
    }
}