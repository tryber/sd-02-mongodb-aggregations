use aggregations;

const maiorDia = db.trips.aggregate([
  {
    $addFields: {
      dia_semana: { $dayOfWeek: "$startTime" }
    }
  },
  {
    $group: {
      _id: "$dia_semana",
      total: { $sum: 1 }
    }
  },
  {
    $sort: {
      total: -1
    }
  },
  {
    $project: {
      _id: 0, diaDaSemana: "$_id", total: "$total"
    }
  },
  { $limit: 1 }
]).toArray()[0].diaDaSemana;

db.trips.aggregate([
  {
    $addFields: {
      dia_semana: { $dayOfWeek: "$startTime" }
    }
  },
  {
    $group: {
      _id: { dia_semana: "$dia_semana", nomeEstacao: "$startStationName" },
      total: { $sum: 1 }
    }
  },
  {
    $match: { "_id.dia_semana": maiorDia }
  },
  {
    $sort: { total: -1 }
  },
  {
    $limit: 1
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total"
    }
  }
]);
