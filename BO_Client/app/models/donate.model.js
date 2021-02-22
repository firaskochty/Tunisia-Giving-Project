module.exports = mongoose => {
    const donate = mongoose.model(
      "donate",
      mongoose.Schema(
        {
          userid: String,
          fundid: String,
          amount: Number,
          anomyme: Number
        }, 
        { timestamps: true }
      )
    );
  
    return donate;
  };