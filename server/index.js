require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.router');
const adminRouter = require('./routers/admin.router');
const warehouseRouter = require('./routers/warehouse.router');
const serviceRouter = require('./routers/service.router');
const commonRouter = require('./routers/common.router');
const farmerRouter = require('./routers/farmer.router');
const callingRouter = require('./routers/calling.router');
const filedServiceRouter = require("./routers/filedService.router.js");
require("./configs/db/mongoConn")
const app = express();
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
const allowedOrigins = [
  'http://88.222.214.93:3001',
  'http://localhost:3000', // Optional for local testing
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  credentials: true, // Allow cookies if needed
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/service", serviceRouter);
app.use("/warehouse", warehouseRouter);
app.use("/common", commonRouter);
app.use("/calling", callingRouter);
app.use("/farmer", farmerRouter);
app.use("/filedService", filedServiceRouter);


app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running ${port}.`);
})
