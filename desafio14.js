use aggregations;

const fatorMsMin = 1/(1000 * 60);

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: { $multiply: [{ $subtract: ["$stopTime", "$startTime"] }, fatorMsMin] }
      }
    }
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" }
    }
  }
]);
