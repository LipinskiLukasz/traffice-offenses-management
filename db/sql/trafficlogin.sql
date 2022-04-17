
DROP TABLE IF EXISTS trafficlogin;

CREATE TABLE IF NOT EXISTS trafficlogin (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) DEFAULT '0',
  userpassword varchar(50) DEFAULT '0',
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO trafficlogin (id, username, userpassword) VALUES
	(1, 'john', 'john');
