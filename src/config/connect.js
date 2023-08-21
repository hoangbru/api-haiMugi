import mongoose from "mongoose";

export const connectMongoAtlas = async() => {
  const mongoAtlasUri = process.env.MONGO_ATLAS_URL;

  try {
    await mongoose
      .connect(mongoAtlasUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Mongoose đã được kết nối");
      })
      .catch((error) => {
        console.log("Kết nối thất bại:", error);
      });
  } catch (e) {
    console.log("Không thể kết nối");
  }

  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Kết nối thất bại ${err}`));
  dbConnection.once("open", () => console.log("Kết nối thành công đến DB!"));
};