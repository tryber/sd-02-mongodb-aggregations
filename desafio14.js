db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      "duracaoMedia":  { $avg: { $subtract: ["$stopTime", "$startTime"] } }
    },
  },
  {
    $sort: {
      "duracaoMedia": -1
    }
  },
  {
    $limit: 5
  },
  {
    $project: {
      "_id": 0,
      "bikeId": 1,
      "duracaoMedia": 1
    }
  }
]);
