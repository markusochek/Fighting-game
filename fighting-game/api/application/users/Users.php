<?php class Users {
    function __construct($db) {
        $this->db = $db;
    }

    public function login($login, $pass) {
        return $this->db->loginUser($login, $pass);
    }

    public function registration($login, $pass, $name) {
        return $this->db->registrationUser($login, $pass, $name);
    }
}