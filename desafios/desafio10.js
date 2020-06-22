use aggregations;

const convertHour = 60 * 60 * 1000;
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia:
      {
        $avg:
        {
          $subtract: ["$stopTime", "$startTime"]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{
          $divide: ["$duracaoMedia", convertHour]
        }, 2]
      }
    }
  }
]);
