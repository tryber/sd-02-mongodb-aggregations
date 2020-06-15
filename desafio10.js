use aggregations;
db.trips.aggregate([
  {
    $set: {
      mediaViagem: { $divide: [{ $subtract: ['$stopTime', '$startTime'] }, 60 * 60000] }
    }
  },
  {
    $group: { _id: '$usertype', duracaoMedia: { $avg: '$mediaViagem' } }
  },
  {
    $project: {
      _id: 0,
      tipo: '$_id',
      duracaoMedia: { $trunc: ['$duracaoMedia', 2] }
    }
  }
]);
