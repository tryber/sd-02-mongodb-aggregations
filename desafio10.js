db.trips.aggregate([
  {
    $addFields: {
      diferencaDuracao: {
        $divide: [
          { $subtract: [ "$stopTime", "$startTime" ] }, 1000 * 60 * 60
        ]
      }
    }
  },
  {
    $group: {
      _id: "$usertype", duracaoMedia: { $avg: "$diferencaDuracao" }
    }
  },
  {
    $project: { _id: 0, tipo:  "$_id", duracaoMedia: {$trunc: ["$duracaoMedia", 2] } }
  }
]);
