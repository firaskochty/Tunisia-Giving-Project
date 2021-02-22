module.exports = mongoose => {
    const user = mongoose.model(
      "user",
      mongoose.Schema(
        {
          name: String,
          mail: String,
          phone: Number,
          picture: String,
          password: String,
          type: String
        }, 
        { timestamps: true }
      )
    );
  
    return user;
  };