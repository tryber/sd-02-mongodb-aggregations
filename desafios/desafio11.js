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
    $project: {
      diaDaSemana: "$_id",
      total: 1
    }
  }
]);
