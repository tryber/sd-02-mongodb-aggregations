db.trips.aggregate([
  {
    $match: { "startTime": { $gte: ISODate("2016-03-10T00:00:00Z"), $lte: ISODate("2016-03-10T23:59:59Z") }}
  },
  {
    $addFields: { tripDuration: { $divide: [ {$subtract: ["$stopTime", "$startTime"] }, 1000 * 60] } }
  },
  {
    $group: { _id: null, duracaoMediaEmMinutos: { $avg: "$tripDuration" } }
  },
  {
    $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } }
  }
]);
