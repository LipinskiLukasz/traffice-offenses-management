DROP TABLE IF EXISTS traffic_offenses;
CREATE TABLE IF NOT EXISTS traffic_offenses (
  id int(11) NOT NULL AUTO_INCREMENT,
  offender_name varchar(50) NOT NULL DEFAULT '0',
  offender_email varchar(50) NOT NULL DEFAULT '0',
  offender_location varchar(50) NOT NULL DEFAULT '0',
  offender_offense varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO traffic_offenses (id, offender_name, offender_email, offender_location, offender_offense) VALUES
	(1, 'Tim', 'tim@test.com', 'Dublin', 'Speeding');
