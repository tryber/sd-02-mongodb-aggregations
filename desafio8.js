use aggregations;

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airline_alliance: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$airline.name", "$$airline_alliance"]
            },
            airplane: { $in: ["747", "380"] }
          }
        }
      ],
      as: "alliance_routes_by_plane"
    }
  },
  { $match: { alliance_routes_by_plane: { $ne: [] } } },
  { $unwind: "$alliance_routes_by_plane" },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 }
    }
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }
]);
