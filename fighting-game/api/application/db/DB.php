<?php
class DB {
  function __construct() {
    //$dbhost = "192.168.1.89";
    //$dbhost = "192.168.43.112";
    $dbhost = "127.0.0.1";
    $dbport = "3306";
    $dbname = "alcohol_shock";
    $dbuser = "markusok";
    $dbpass = "botkill";

    try {
      $db = new PDO
      (
        "mysql:host=$dbhost;
        dbname=$dbname;
        port=$dbport",
        $dbuser,
        $dbpass
      ); 

      $this->db = $db; /////////////////////////////////////////////////////
      $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    }
    catch (PDOException $e) {
      echo ("Connected failed: ");  
      file_put_contents('PDOErrors.txt', $e->getMessage(), FILE_APPEND); 
    }
  }

  function __destruct() {
    $this->db = null;
  }

  public function getUserPass($login) {
    $query = "SELECT `id`, `pass` FROM `users` WHERE `login` ='$login'";
    return $this->db->query($query)->fetch(PDO::FETCH_LAZY);
  }

  public function getUserId($login) {
    $query = "SELECT `id` FROM `users` WHERE `login` ='$login'";
    return $this->db->query($query)->fetch(PDO::FETCH_LAZY);
  }

  public function getUserIdToken($token) {
    $query = "SELECT `id` FROM `users` WHERE `token` ='$token'";
    return $this->db->query($query)->fetch(PDO::FETCH_LAZY);
  } 

  public function getGamerIdToken($token) {
    $query = "SELECT `gamers`.`id` FROM `users`, `gamers` 
    WHERE `users`.`token` ='$token' AND `users`.`id` = `gamers`.`users_id`";
    return $this->db->query($query)->fetch(PDO::FETCH_LAZY);
  } 

  public function getUserGamerIdToken($token) {
    $query = "SELECT `gamers`.`users_id`, `gamers`.`id` FROM `users`, `gamers`
    WHERE `users`.`token` ='$token' AND `users`.`id` = `gamers`.`users_id`";
    return $this->db->query($query)->fetch(PDO::FETCH_LAZY);
  } 

  public function getMapName($mapId) {
    $query = "SELECT `name` FROM `maps` WHERE `id` ='$mapId'";
    return $this->db->query($query)->fetch(PDO::FETCH_LAZY);
  }

  public function getSession($sessionId) {
    $query = "SELECT `maps_id` FROM `sessions` WHERE `id` ='$sessionId'";
    return $this->db->query($query)->fetch(PDO::FETCH_LAZY);
  }

  public function getIdSession($gamer) {
    $query = 'SELECT `id` FROM `gamers` WHERE `sessions_id` = "'.$gamer['sessions_id'].'"';
    return $this->db->query($query)->fetch(PDO::FETCH_LAZY);
  }

  public function getGamerSessionId($sessionId) {
    $query = "SELECT `gamers`.`id`, `gamers`.`x`, `gamers`.`y`, `swords`.`x`, `swords`.`y`, `swords`.`dir`
    FROM `gamers` JOIN `swords`
    ON `gamers`.`sessions_id` ='$sessionId'  
    AND `gamers`.`id` = `swords`.`gamers_id`";
    return $this->db->query($query)->fetchAll(PDO::FETCH_NUM);
  }

  public function dieGamerSword($idGamer) {
    $query = "DELETE FROM `gamers` WHERE `id` = '$idGamer'";
    $this->db->query($query);
    
    $query = "DELETE FROM `swords` WHERE `gamers_id` = '$idGamer'";
    $this->db->query($query);

    return true;
  }

  public function scoreKiller($idKiller) {
    $query = "UPDATE `gamers` SET `score` = `score`+1 WHERE `id` = '$idKiller'";
    $this->db->query($query);
    $query = "SELECT `score` FROM `gamers` WHERE `id` = '$idKiller'";
    return  $this->db->query($query)->fetch(PDO::FETCH_LAZY);
  }

  public function hashPass($login, $pass) {
    return md5(md5($login.$pass));
  }

  public function token($hash, $user) {
    $token = md5($hash.uniqid(rand(1000, 5000)));

    $query = 'UPDATE `users` SET `token` = "'.$token.'" 
    WHERE `id` = "'.$user['id'].'"';
    $this->db->query($query); 

    return $token;
  }

  public function loginUser($login, $pass) {

    if ($login == "markus") {
      $query ="DELETE FROM `swords`";
      $this->db->query($query);
      $query ="DELETE FROM `gamers`";
      $this->db->query($query);

      $query = 'UPDATE `sessions` SET `status` = "OFF"';
      $stmt = $this->db->prepare($query);
      $stmt->execute();
    }

      
    $user = $this->getUserPass($login);
    $hash = $this->hashPass($login, $pass);
    if ($user) {
      if ($user['pass'] == $hash) {
        $token = $this->token($hash, $user);
      }
    }  else return false;

    return $token;
  }

  public function registrationUser($login, $pass, $name) {
    $hash = $this->hashPass($login, $pass);

    $query = "INSERT INTO `users` (login, pass, name, token) VALUES (?, ?, ?, ?)";
    $d = array($login, $hash, $name, ""); 
    $stmt = $this->db->prepare($query);
    $stmt->execute($d);

    $user = $this->getUserId($login);
    $token = $this->token($hash, $user);

    return $token;
  }

  public function SessionOnId($token, $sessionId) {
    if ($this->getUserIdToken($token)) {
      $query = 'UPDATE `sessions` SET `status` = "ON" WHERE `id` = "'. $sessionId.'"';
      $stmt = $this->db->prepare($query);
      $stmt->execute();

      $session = $this->getSession($sessionId);
      return $session['maps_id'];
    }
    return false;
  }

  public function getMapId($token, $mapId) {
    if ($this->getUserIdToken($token)) {
      $mapName = $this->getMapName($mapId);
      return $mapName['name'];
    }
    return false;
  }

  public function CreateGamerXY($sessionId, $token, $x, $y) {
    $user = $this->getUserIdToken($token);
    if ($user) {
      $query = "INSERT INTO `gamers` (users_id, sessions_id, x, y, score) VALUES (?, ?, ?, ?, ?)";
      $d = array($user['id'], $sessionId, $x, $y, '0'); 
      $stmt = $this->db->prepare($query);
      $stmt->execute($d);

      $gamer = $this->getGamerIdToken($token);
      return $gamer['id'];
    }
    return false;
  }

  public function CreateSwordXY($sessionId, $token, $x, $y, $dir) {
    $gamer = $this->getGamerIdToken($token);
    if ($gamer) {
      $query = "INSERT INTO `swords` (gamers_id, sessions_id, x, y, dir) VALUES (?, ?, ?, ?, ?)";
      $d = array($gamer['id'], $sessionId, $x, $y, $dir); 
      $stmt = $this->db->prepare($query);
      $stmt->execute($d);

      return true;
    }
    return false;
  }

  public function moveGamerSwordXY($token, $xG, $yG, $xS, $yS, $dirS) {
    $userGamer = $this->getUserGamerIdToken($token);
    if ($userGamer) {
      $query = 'UPDATE `gamers`, `swords` 
      SET `gamers`.`x` = "'.$xG.'", `gamers`.`y` ="'.$yG.'",
      `swords`.`x` = "'.$xS.'", `swords`.`y` ="'.$yS.'", `swords`.`dir` ="'.$dirS.'" 
      WHERE `gamers`.`users_id` = "'.$userGamer['users_id'].'"
      AND `swords`.`gamers_id` = "'.$userGamer['id'].'"';
      $stmt = $this->db->prepare($query);
      $stmt->execute();

      return true;
    }
    return false;
  }

  public function moveGamerXY($token, $x, $y) {
    $user = $this->getUserIdToken($token);
    if ($user['id']) {
      $query = 'UPDATE `gamers` SET `x` = "'.$x.'", `y` ="'.$y.'" 
      WHERE `users_id` = "'.$user['id'].'"';
      $stmt = $this->db->prepare($query);
      $stmt->execute();

      return true;
    }
    return false;
  }

  public function moveSwordXY($token, $x, $y, $dir) {
    $gamer = $this->getGamerIdToken($token);
    if ($gamer['id']) {
      $query = 'UPDATE `swords` SET `x` = "'.$x.'",`y` ="'.$y.'", `dir`="'.$dir.'" 
      WHERE `gamers_id` = "'.$gamer['id'].'"';
      $stmt = $this->db->prepare($query);
      $stmt->execute();

      return true;
    }
    return false;
  }

  public function drawGamerSwordSessionId($token, $sessionId) {
    if ($this->getUserIdToken($token)) {
      return $this->getGamerSessionId($sessionId);
    }
    return false;
  }

  public function killGamer($token, $idGamer, $idKiller) {
    if ($this->getUserIdToken($token))
      if ($this->dieGamerSword($idGamer)) {
        $score = $this->scoreKiller($idKiller);
        return $score['score'];
      }
    return false;
  }

  public function dieGamer($token, $idGamer) {
    if ($this->getUserIdToken($token))
    {
      $query = "SELECT `sessions_id` FROM `gamers` WHERE `id` = '$idGamer'";
      $gamer = $this->db->query($query)->fetch(PDO::FETCH_LAZY);
      $this->dieGamerSword($idGamer);
      $checkId = $this->getIdSession($gamer);
      if(!$checkId['id']) {
        $query = 'UPDATE `sessions` SET `status` = "OFF" WHERE `id` = "'.$gamer['sessions_id'].'"';
        $this->db->query($query);
        return true;
      }
    }
    return false;
  }

  public function scoreDie($token) {
    $gamer = $this->getGamerIdToken($token);
    return $gamer['id'];
  }
}