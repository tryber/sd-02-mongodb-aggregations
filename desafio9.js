use aggregations;
db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: '' } } },
  {
    $group: {
      _id: null,
      maiorAnoNacimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    }
  },
  { $project: { _id: 0 } }
]);
