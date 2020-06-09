use aggregations;

db.trips.aggregate([
  {
    $addFields: {
      convertDayOfWeek: {
        $dayOfWeek: '$startTime'
      }
    }
  },
  {
    $group: {
      _id: {
        convertDayOfWeek: '$convertDayOfWeek',
        startStationId: '$startStationId'
      },
      total: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      '_id.convertDayOfWeek': -1,
      total:-1
    }
  },
  {
    $group: {
      _id: '$_id.convertDayOfWeek',
      nomeEstacao: { $first: '$_id.startStationId' },
      total: {
        $max: '$total'
      }
    }
  },
  {
    $project: {
      _id: 0
    }
  }
]);

db.trips.aggregate([
  {
    $addFields: {
      convertDayOfWeek: {
        $dayOfWeek: '$startTime'
      }
    }
  },
  {
    $group: {
      _id: {
        convertDayOfWeek: '$convertDayOfWeek',
        startStationId: '$startStationId'
      },
      total: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      '_id.convertDayOfWeek': -1,
      total:-1
    }
  },
  {
    $project: {
      _id: 1,
      total: 1
    }
  }
]);
