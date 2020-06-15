use aggregations;
db.trips.aggregate([
  {
    $addFields:
    {
      segundos: { $subtract: ['$stopTime', '$startTime'] },
    }
  },
  {
    $group: { _id: '$bikeid', mediaSegundos: { $avg: '$segundos' } }
  },
  {
    $project: {
      _id: 0, bikeId: '$_id', duracaoMedia: { $ceil: { $divide: ['$mediaSegundos', 60000] } }
    }
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 }
]).pretty();
