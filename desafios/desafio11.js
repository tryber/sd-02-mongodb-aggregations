use aggregations;

db.trips.aggregate([
  {
    $addFields: {
      convertDayOfWeek: {
        $dayOfWeek: '$startTime'
      }
    }
  },
  {
    $group: {
      _id: '$convertDayOfWeek',
      total: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      total: -1
    }
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: 1
    }
  },
  { $limit: 1 }
]);
