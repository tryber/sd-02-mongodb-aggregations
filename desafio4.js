use aggregations;
db.movies.aggregate([
  {
    $project: {
      _id: 0, titulo: { $split: ["$title", " "] }, avaliado: "$rated",
      notaIMDB: "$imdb.rating", votosIMDB: "$imdb.votes", ano: "$year"
    }
  },
  { 
    $addFields: { tamanhoTitulo: { $size: "$titulo" } }
  },
  {
    $match: { tamanhoTitulo: 1 }
  }
]);
