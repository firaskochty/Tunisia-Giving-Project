module.exports = mongoose => {
    const fund = mongoose.model(
      "fund",
      mongoose.Schema(
        {
          orgid: String,
          name: String,
          description : String ,
          amount: Number,
          datefin: Date,
          picture: String,
        }, 
        { timestamps: true }
      )
    );
  
    return fund;
  };