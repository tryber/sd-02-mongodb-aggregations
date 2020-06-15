use aggregations;
db.trips.aggregate(
  [
    {
      $match: {
        'startTime': {
          $gte: ISODate('2016-03-10T00:00:00Z'),
          $lt: ISODate('2016-03-11T00:00:00Z')
        }
      }
    },
    {
      $group: {
        _id: null,
        'media': {
          $avg: {
            $subtract: ['$stopTime', '$startTime']
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        'duracaoMediaEmMinutos': {
          $ceil: {
            $divide: ['$media', 1000 * 60]
          }
        }
      }
    }
  ]
);
