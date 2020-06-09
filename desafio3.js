db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      "genres": {
        $not: {
          $in: ["Crime", "Horror"]
        },
      },
      "rated": { $in: ["PG", "G"]},
      "languages": {
        $all: ["English", "Spanish"]
      }
    },
  },
  {
    $sort: { "year": -1, "title": -1, "imdb.rating": -1 }
  },
  {
    $project: {
      "titulo": "$title",
      "avaliado": "$rated",
      "notaIMDB": "$imdb.rating",
      "votosIMDB": "$imdb.votes",
      "ano": "$year"
  } },
]);
