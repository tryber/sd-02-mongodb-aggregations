const weekField = db.trips.aggregate([
  {
    $addFields: {
      "week": {
        $dayOfWeek: "$startTime"
      }
    }
  },
  {
    $group: {
      _id: "$week",
      "total": { $sum: 1 },
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      "diaDaSemana": "$_id",
      "total": "$total"
    }
  }
]).toArray()[0].diaDaSemana;

db.trips.aggregate([
  {
    $addFields: {
      "week": {
        $dayOfWeek: "$startTime"
      }
    }
  },
  {
    $match: {
      "week": weekField
    }
  },
  {
    $group: {
      _id: { nomeEstacao: "$startStationName" },
      total: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: "$_id",
      total: {
        $max: "$total"
      }
    }
  }
]);
