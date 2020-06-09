use aggregations;

const milisecondsToMinutes = 1000 * 60;
db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"), $lt: ISODate("2016-03-11T00:00:00Z")
      }
    }
  },
  {
    $group: {
      _id: null,
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } }
    }
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMedia", milisecondsToMinutes] } }
    }
  }
]);
