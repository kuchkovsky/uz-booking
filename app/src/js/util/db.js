import mysql from 'mysql';
import dayjs from 'dayjs';

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const errorHandler = err => {
  if (err) {
    throw err;
  }
};

const transactionErrorHandler = err => {
  if (err) {
    connection.rollback(() => {
      throw err;
    });
  }
};

const insertData = (data, preparedSql, deriveValues) =>
  connection.beginTransaction(err => {
    errorHandler(err);

    data.forEach(record => {
      const values = deriveValues(record);
      connection.query(preparedSql, values, transactionErrorHandler);
    });

    connection.commit(transactionErrorHandler);
  });


connection.connect(errorHandler);


export const insertHotDirections = stations => {
  const sql = `
    INSERT IGNORE INTO hot_direction (
      origin_title,
      origin_code,
      destination_title,
      destination_code,
      process_date
    ) VALUES (
      ?, ?, ?, ?, ?
    )`;
  const deriveValues = station => [
    station.from.title,
    station.from.value,
    station.to.title,
    station.to.value,
    dayjs().format('YYYY-MM-DD')
  ];
  insertData(stations, sql, deriveValues);
}

export const insertHotStations = (stations, type) => {
  const sql = `
    INSERT IGNORE INTO hot_station (
      title,
      code,
      direction_type,
      process_date
    ) VALUES (
      ?, ?, ?, ?
    )`;
  const deriveValues = station => [
    station.title,
    station.value,
    type,
    dayjs().format('YYYY-MM-DD')
  ];
  insertData(stations, sql, deriveValues);
};

export const insertTrainInterchange = list => {
  const sql = `
    INSERT IGNORE INTO train_interchange (
      departure_number,
      arrival_number,
      departure_station,
      transfer_station,
      arrival_station,
      departure_from_date,
      departure_to_date,
      arrival_from_date,
      arrival_to_date,
      departure_from_time,
      departure_to_time,
      interchange_duration,
      arrival_from_time,
      arrival_to_time,
      travel_time,
      process_date
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )`;
    const deriveValues = row => [
      row.departure.num,
      row.arrival.num,
      row.departure.from.station,
      row.departure.to.station,
      row.arrival.to.station,
      row.departure.from.date,
      row.departure.to.date,
      row.arrival.from.date,
      row.arrival.to.date,
      row.departure.from.time,
      row.departure.to.time,
      row.interchangeDuration,
      row.arrival.from.time,
      row.arrival.to.time,
      row.travelTime,
      dayjs().format('YYYY-MM-DD')
    ];
    insertData(list, sql, deriveValues);
};
