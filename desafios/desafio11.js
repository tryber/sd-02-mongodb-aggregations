use aggregations;

const weekDay = [
  '',
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

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
        diaDaSemana: {
          $arrayElemAt: [weekDay, "$_id"]
        },
        total: "$qtd",
      }
    },
    {
      $sort: {
        total: -1,
      }
    },
    {
      $limit: 1,
    }
  ]
);
