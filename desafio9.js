db.trips.aggregate([
  {
    $match: {
      birthYear: { $nin: [ "", null ] }
    }
  },
  {
    $project: { _id: 0, birthYear: { $toInt: "$birthYear"} }
  },
  { 
    $group: { _id: "$birthYear", birthYear: { $first: "$birthYear" } }
  },
  {
    $sort: { birthYear: -1 }
  },
  {
    $group: { _id: null, maiorAnoNascimento: { $first: "$birthYear" }, menorAnoNascimento: { $last: "$birthYear" } }
  }
]);
