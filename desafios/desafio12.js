use aggregations;

db.trips.aggregate([
  {
    $group: {
      _id: {
        convertDayOfWeek: { $dayOfWeek: "$startTime" },
        nomeEstacao: "$startStationName"
      },
      total: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      '_id.convertDayOfWeek': -1,
      total: -1
    }
  },
  {
    $group: {
      _id: '$_id.convertDayOfWeek',
      nomeEstacao: { $first: '$_id.nomeEstacao' },
      total: {
        $max: '$total'
      }
    }
  },
  {
    $project: {
      _id: 0
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
