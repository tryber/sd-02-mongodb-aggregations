db.movies.aggregate([
  {
    $match: { awards: { $regex: /won [0-9][0-9]* oscar.*/gi } }
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" }
    }
  }
]);
