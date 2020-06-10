use aggregations;

db.trips.aggregate([
  {
    $addFields: {
      dia_semana: { $dayOfWeek: "$startTime" }
    }
  },
  {
    $group: {
      _id: "$dia_semana",
      total: { $sum: 1 }
    }
  },
  {
    $sort: {
      total: -1
    }
  },
  {
    $project: {
      _id: 0, diaDaSemana: "$_id", total: "$total"
    }
  },
  { $limit: 1 }
]);
