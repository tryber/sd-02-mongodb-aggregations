use aggregations;
db.movies.aggregate(
  [
    {
      $project: {
        _id: 0,
        'title': 1,
        titulosNaoCompostos: {
          $split: ['$title', ' ']
        }
      }
    },
    {
      $match: {
        titulosNaoCompostos: {
          $size: 1
        }
      }
    }
  ]
);
