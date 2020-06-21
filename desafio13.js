use aggregations;

const fatorConversaoMsMin = 1/(1000 * 60);

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate('2016-03-10T00:00:00Z'),
        $lt: ISODate("2016-03-11T00:00:00Z")
      }
    }
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: { $multiply: [{ $subtract: ["$stopTime", "$startTime"] }, fatorConversaoMsMin] }
      }
    }
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" }
    }
  }
]);
