db.air_routes.find({
  "airplane": "747"
}).limit(1);

db.air_alliances.aggregate([
  {
    $unwind: "$airlines"
  },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airlines",
      as: "airlines_airlines"
    }
  }
]);