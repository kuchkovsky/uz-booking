CREATE TABLE hot_station (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(64) NOT NULL,
    code INT NOT NULL,
    direction_type VARCHAR(4) NOT NULL,
    process_date DATE NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (
      title,
      code,
      direction_type,
      process_date
    )
);
