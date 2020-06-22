use aggregations;

const toMinutes = 1000 * 60;

db.trips.aggregate(
  [
    {
      $match: {
        startTime: {
          $gte: ISODate("2016-03-10T00:00:00Z"),
          $lte: ISODate("2016-03-10T23:59:59Z"),
        }
      }
    },
    {
      $group: {
        _id: null,
        media: {
          $avg: {
            $divide: [
              {
                $subtract: [
                  "$stopTime", "$startTime"
                ]
              },
              toMinutes
            ]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        duracaoMediaEmMinutos: {
          $ceil: "$media"
        }
      }
    }
  ]
);
