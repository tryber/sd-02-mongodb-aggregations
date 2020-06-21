const week = db.trips.aggregate([
  {
    $addFields: {
      "weekField": {
        $dayOfWeek: "$startTime"
      }
    }
  },
  {
    $group: {
      _id: "$weekField",
      "total": { $sum: 1 },
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      "diaDaSemana": "$_id",
      "total": "$total"
    }
  }
]).toArray()[0].diaDaSemana;

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
      "week": week
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
