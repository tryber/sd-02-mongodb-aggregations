use aggregations;
db.trips.aggregate(
  [
    {
      $group: {
        _id: '$usertype',
        'duracaoMedia': {
          $avg: {
            $subtract: ['$stopTime', '$startTime']
          }
        }
      }
    },
    {
      $project: {
        'tipo': '$usertype',
        'duracaoMedia': {
          $round: [
            {
              $divide: ['$duracaoMedia', 1000 * 60 * 60]
            }, 2
          ]
        }
      }
    }
  ]
);
