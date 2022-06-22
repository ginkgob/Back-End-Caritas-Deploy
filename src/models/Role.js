new Schema({
    name: String,
    category: String,
    price: Number,
    imgUrl: String,
  }, {
    timestamps: true,
    versionKey: false,
  });