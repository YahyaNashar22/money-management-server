import mongoose from "mongoose";

export const dbConnection = async (uri, port, app) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
