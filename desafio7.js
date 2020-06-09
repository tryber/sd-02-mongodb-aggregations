db.movies.aggregate([
  {
    $group: {
      _id: "_id",
      
    }
  }
]);