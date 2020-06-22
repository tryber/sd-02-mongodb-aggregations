use aggregations;
db.trips.aggregate(
  [
    {
      $group: {
        _id: {
          'estacao': '$startStationName',
          'diaDaSemana': { $dayOfWeek: '$startTime' }
        },
        'total': { $sum: 1 }
      }
    },
    {
      $match: {
        '_id.diaDaSemana': 5
      }
    },
    {
      $sort: { 'total': -1 }
    },
    {
      $limit: 1
    },
    {
      $project: {
        _id: 0,
        'nomeEstacao': '$_id.estacao',
        'total': '$total'
      }
    }
  ]
);
