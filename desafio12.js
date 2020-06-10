use aggregations;

db.trips.aggregate([
  { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, 5] } } },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, nomeEstacao: "$_id", total: 1 } }
]);

// outra forma
const most_trips_day = db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, diaDaSemana: "$_id", total: 1 } }
]).toArray()[0].diaDaSemana;

db.trips.aggregate([
  { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, most_trips_day] } } },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, nomeEstacao: "$_id", total: 1 } }
]);
