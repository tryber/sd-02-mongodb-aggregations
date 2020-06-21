const week = require('./desafio11');
const weekField = week.toArray()[0].diaDaSemana;

db.trips.aggregate([
  {
    $addFields: {
      "week": {
        $dayOfWeek: "$startTime"
      }
    }
  },
  {
    $match: {
      "week": weekField
    }
  },
  {
    $group: {
      _id: "$startStationName",
      "total": { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      "startStationName": "$_id",
      "total": "$total"
    }
  }
]);
