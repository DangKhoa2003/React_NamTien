import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import adminRoutes from "./routes/admin.js";
import bannerRoutes from "./routes/banner.js";
import postRoutes from "./routes/post.js";
import companyRoutes from "./routes/company.js";
import videoRoutes from "./routes/video.js";
const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/products", productRoutes);
app.use("/admin", adminRoutes);
app.use("/banner", bannerRoutes);
app.use("/post", postRoutes);
app.use("/company", companyRoutes);
app.use("/video", videoRoutes);

app.get("/", (req, res) => {
  res.send("Hello API");
});

// const CONNECTION_URL = 'mongodb+srv://javascript:javascript123@atlascluster.ndzewb3.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}/products`);
    })
  )
  .catch((error) => console.log(error.message));
