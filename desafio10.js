use aggregations;

const milisecondToHour = 1000 * 60 * 60;
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } }
    }
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$duracaoMedia", milisecondToHour] }, 2]
      }
    }
  }
]);
