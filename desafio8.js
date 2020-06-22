use aggregations;

db.air_alliances.aggregate([
  { $unwind: '$airlines' },
  {
    $lookup: {
      from: "air_routes",
      let: { airlines: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr:
            {
              $and:
                [
                  { $eq: ["$airline.name", "$$airlines"] },
                  { $in: ['$airplane', ['747', '380']] },
                ]
            }
          }
        }
      ],
      as: "airlinesGroup",
    },
  },
  {
    $match: {
      airlinesGroup: { $not: { $size: 0 } }
    }
  },
  { $unwind: '$airlinesGroup' },
  {
    $group: {
      _id: '$name',
      totalRotas: { $sum: 1 }
    }
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }
]);
