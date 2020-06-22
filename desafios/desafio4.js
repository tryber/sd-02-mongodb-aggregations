use aggregations;

db.movies.aggregate(
  [
    {
      $match: {
        $expr: {
          $eq: [
            {
              $size: {
                $split: ["$title", " "]
              }
            },
            1
          ]
        }
      }
    },
  ]
);
