db.air_alliances.aggregate([
  {
    $unwind: "$airlines"
  },
  {
    $lookup: {
      from: "air_routes",
      let: { airline: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
                $and:[
                { $eq: [ "$$airline", "$airline.name" ] },
                { $in: [ "$airplane", [ "747", "380" ] ] }
              ]
            }
          }
        }
      ],
      as: "routes"
    }
  },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }
]).pretty();
