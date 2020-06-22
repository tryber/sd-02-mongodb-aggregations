use aggregations;
db.movies.aggregate([
  {
    $match: {
      awards: /Won.*Osc/
    }
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: '$imdb.rating' },
      menor_rating: { $min: '$imdb.rating' },
      media_rating: { $avg: '$imdb.rating' },
      desvio_padrao: { $stdDevPop: '$imdb.rating' }
    }
  },
  {
    $project:
    {
      _id: 0
    }
  }
]);
