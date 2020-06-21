use aggregations;

const fatorConversao = 1/(1000 * 60 * 60);

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: { $multiply: [{ $subtract: ["$stopTime", "$startTime"] }, fatorConversao] }
      }
    }
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] }
    }
  }
]);
