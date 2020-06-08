use aggregations;

db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: 1 },
      birthYear: { $not: { $eq: '' } }
    }
  },
  {
    $addFields: {
      convertedBirth: { $toInt: "$birthYear" },
    }
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: '$convertedBirth' },
      menorAnoNascimento: { $min: '$convertedBirth' },
    }
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    }
  }
]);
