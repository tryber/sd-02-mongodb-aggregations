use aggregations;

db.movies.aggregate([
  {
    $project: {
      _id: 0,
      titulo: '$title',
      avaliado: '$rated',
      notaIMDB: '$imdb.rating',
      votosIMDB: '$imdb.votes',
      ano: '$year',
      tituloSeparado: { $split: ['$title', " "] }
    }
  },
  {
    $match: {
      tituloSeparado: { $size: 1 }
    }
  }
]);
