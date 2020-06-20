use aggregations;

db.air_alliances.aggregate([
  {
    $unwind: "$airlines"
  },
  {
    $lookup: {
      from: "air_routes",
      let: { air_lines: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [ "$airline.name", "$$air_lines" ]
            },
            "airplane": { $in: [ "747", "380" ] }
          }
        }
      ],
      as: "alliance_routes"
    }
  },
  {
    $match: { "alliance_routes": { $ne: [] } }
  },
  {
    $unwind: "$alliance_routes"
  },
  {
    $group: {
      _id: "$name",
      "totalRotas": { $sum: 1 }
    }
  },
  {
    $sort: {
      "totalRotas": -1
    }
  },
  {
    $limit: 1
  }
]).pretty();
