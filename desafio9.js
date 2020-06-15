use aggregations;
db.trips.aggregate(
  [
    {
      $match: {
        'birthYear': { $exists: true, $ne: '' }
      }
    },
    {
      $group: {
        _id: null,
        'maiorAnoNascimento': { $max: '$birthYear' },
        'menorAnoNascimento': { $min: '$birthYear' },
      }
    },
    {
      $project: {
        _id: 0,
        'maiorAnoNascimento': 1,
        'menorAnoNascimento': 1
      }
    }
  ]
);
