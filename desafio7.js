use aggregations;
db.movies.aggregate([
  {
    $match: { languages: 'English', cast: { $exists: true } }
  },
  { $unwind: '$cast' },
  {
    $group: { 
      _id: '$cast',
      numeroFilmes: { $sum: 1 }, 
      mediaIMDB: { $avg: '$imdb.rating' }
    }
  },
  {
    $project: {
      numeroFilmes: 1, mediaIMDB: { $trunc: ['$mediaIMDB', 1] }
    }
  },
  { $sort: {numeroFilmes: -1} }
]);
