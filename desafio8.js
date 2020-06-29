use aggregations;

db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup:
    {
      from: "air_routes",
      let: { route_airline: "$airlines" },
      pipeline: [{
          $match: {
            $expr: { $eq: ["$airline.name", "$$route_airline"] },
            airplane: { $in: ['747', '380'] }
          }
        }],
      as: "alliances_routes"
    }
  },
  {
    $match: {
      "alliances_routes": { $not: { $size: 0 } }
    }
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: { $size: "$alliances_routes" } },
    }
  },
  {
    $sort: { "totalRotas": -1 }
  },
  {
    $limit: 1
  }
]);
