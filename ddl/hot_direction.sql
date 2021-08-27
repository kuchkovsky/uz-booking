CREATE TABLE hot_direction (
    id INT NOT NULL AUTO_INCREMENT,
    origin_title VARCHAR(64) NOT NULL,
    origin_code INT NOT NULL,
    destination_title VARCHAR(64) NOT NULL,
    destination_code INT NOT NULL,
    process_date DATE NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (
      origin_title,
      origin_code,
      destination_title,
      destination_code,
      process_date
    )
);
