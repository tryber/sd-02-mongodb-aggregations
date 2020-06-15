use aggregations;
db.movies.aggregate([
  { 
    $project: { titulo: { $split: ['$title', ' '] } }
  },
  {
    $match: { titulo: { $size: 1 } }
  }
]).pretty();
