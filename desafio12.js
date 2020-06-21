use aggregations;

db.trips.aggregate([
  {
    $addFields: {
      "dayOfWeek": {
        $dayOfWeek: "$startTime"
      }
    }
  },
  {
    $group: {
      _id: { "dayOfWeek": "$dayOfWeek", "nomeEstacao": "$startStationName"  },
      "total": { $sum: 1 }
    }
  },
  {
    $match: {
      "_id.dayOfWeek": 5
    }
  },
  {
    $sort: {
      "total": -1
    }
  },
  {
    $limit: 1
  },
  {
    $project: {
      _id: 0,
      "nomeEstacao": "$_id.nomeEstacao",
      "total": "$total",
    }
  }
]);
