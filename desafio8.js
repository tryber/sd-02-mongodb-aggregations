use aggregations;
db.air_alliances.aggregate(
  [
    {
      $unwind: '$airlines'
    },
    {
      $lookup: {
        from: 'air_routes',
        let: {
          'airlines': '$airlines', 'name': '$name'
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$$airlines', '$airline.name']
                  },
                  {
                    $in: ['$airplane', ['747', '380']]
                  }
                ]
              }
            }
          }
        ],
        as: 'teste'
      }
    },
    {
      $unwind: '$teste'
    },
    {
      $group: {
        _id: '$name',
        'totalRotas': {
          $sum: 1
        }
      }
    }
  ]
).pretty();
