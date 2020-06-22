use aggregations;
db.movies.aggregate([
  {
    $project: {
      _id: 0,
      titulo: "$title",
      oneWord: { $size: { $split: ['$title', " "] } }
    }
  },
  {
    $match: {
      oneWord: 1
    }
  }
]).pretty();
