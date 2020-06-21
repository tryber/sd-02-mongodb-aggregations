use aggregations;

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airlineAlliance: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$airline.name", "$$airlineAlliance"] },
            airplane: { $in: ['747', '380'] }
          }
        }
      ],
      as: 'rotasCorrespondentes'
    }
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: { $size: "$rotasCorrespondentes" } }
    }
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }
]);
