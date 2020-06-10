use aggregations;

db.trips.aggregate([
  {
    $group: {
      _id: null,
      "maiorAnoNascimento": { $max: "$birthYear" },
      "menorAnoNascimento": { $min: "$birthYear" }
    }
  },
  {
    $project: {
      _id: 0
    }
  }
]);
