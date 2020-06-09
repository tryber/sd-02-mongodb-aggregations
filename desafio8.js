use aggregations;

db.air_alliances.aggregate([
  {
    $unwind: "$airlines"
  },
  {
    $lookup: {
      from: "air_routes",
      let: { emp_name: "$airlines" },
      pipeline: [
        {
          $match: {
            $and: [
              {
                $expr: {
                  $eq: ["$airline.name", "$$emp_name"]
                }
              },
              { airplane: { $in: ['747', '380'] } }
            ]
          }
        }
      ],
      as: "group_airlines"
    }
  },
  {
    $match: {
      group_airlines: { $not: { $size: 0 } }
    }
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 }
    }
  },
  {
    $sort: { totalRotas: -1 }
  },
  { $limit: 1 }
]);
