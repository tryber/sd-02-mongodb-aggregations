use aggregations;

db.trips.aggregate(
  [
    {
      $group: {
        _id: {
          $dayOfWeek: "$startTime"
        },
        qtd: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        _id: 0,
        diaDaSemana: "$_id",
        total: "$qtd",
      }
    },
    {
      $group: {
        _id: 0,
        testCamp: {
          $max: "$total",
        }
      }
    },

  ]
);
