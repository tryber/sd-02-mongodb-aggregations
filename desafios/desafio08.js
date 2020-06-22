use aggregations;

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airlineCo: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$airline.name", "$$airlineCo"]
            },
            airplane: {
              $in: ['747', '380']
            }
          }
        }
      ],
      as: 'matchingRoutes'
    }
  },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum:
        {
          $size:
            "$matchingRoutes"
        }
      }
    }
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }
]);
