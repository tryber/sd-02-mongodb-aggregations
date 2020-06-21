use aggregations;

const diaDaSemana = db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      total: 1,
      diaDaSemana: "$_id"
    }
  }
]).toArray()[0].diaDaSemana;

db.trips.aggregate([
  {
    $match: {
      $expr: { $eq: [{ $dayOfWeek: "$startTime" }, diaDaSemana] }
    }
  },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, nomeEstacao: "$_id", total: 1 } }
]);
