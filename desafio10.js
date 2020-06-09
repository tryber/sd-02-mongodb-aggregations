db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      "duracaoMedia": { $avg: { $subtract: ["$stopTime", "$startTime"] } }
    }
  },
  {
    $project: {
      "_id": 0,
      "tipo": "$_id",
      "duracaoMedia": "$duracaoMedia"
    }
  }
]);
