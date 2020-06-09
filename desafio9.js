db.trips.aggregate([
  {
    $match: {
      "birthYear": { $exists: true }
    }
  },
  {
    $group: {
      _id: "_id",
      "maiorAnoNascimento": { $max: "$birthYear" },
      "menorAnoNascimento": { $min: "$birthYear" },
    }
  }
]);
