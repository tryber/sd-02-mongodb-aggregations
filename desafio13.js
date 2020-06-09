db.trips.aggregate([
  {
    $match: {
      "startTime": ISODate("2016-03-10")
    }
  },
  {
    $group: {
      _id: "_id",
      "duracaoMediaEmMinutos": {
        $avg: {
          $min: {
            $subtract: ["$stopTime", "$startTime"]
          }
        }
      }
    }
  }
]);
