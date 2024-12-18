import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors
import connectDB from "./config/db.js";
import "dotenv/config.js";
import morgan from "morgan";
import accountRouter from "./routes/AccountRouter.js";
import applicantRouter from "./routes/ApplicantRouter.js";
import applicationRouter from "./routes/ApplicationRouter.js";
import appRouter from "./routes/AppRouter.js";
import collectionRouter from "./routes/CollectionRouter.js";
import leadRouter from "./routes/LeadsRouter.js"; // Import routes
import employeeRouter from "./routes/EmployeesRouter.js";
import verifyRouter from "./routes/VerifyRouter.js";
import sanctionRouter from "./routes/SanctionRouter.js";
import disbursalRouter from "./routes/DisbursalRouter.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const PORT = process.env.PORT || 3000;
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //cookie parser middlerware

// CORS configuration
var corsOption = {
    origin: [
        "https://crm.salarysaathi.com",
        "http://localhost:5173",
        "https://salarysaathi.com",
        "https://www.salarysaathi.com",
        "https://crm.salarysaathi.com",
        "https://www.crm.salarysaathi.com",
        "https://api.salarysaathi.com",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOption));

// Logging middleware (optional)
app.use(morgan("dev")); // Log HTTP requests

// Routes
app.get("/", (req, res) => {
    res.send("API is running.......");
});

app.use("/api/mobile", appRouter); // Use the mobile routes
app.use("/api/accounts", accountRouter); // Use the account routes
app.use("/api/applications", applicationRouter); // Use the application routes
app.use("/api/applicant", applicantRouter); // Use the applicant's routes
app.use("/api/collections", collectionRouter); // Use the collection routes
app.use("/api/disbursals", disbursalRouter); // Use the disbursal routes
app.use("/api/employees", employeeRouter); // Use the employee routes
app.use("/api/leads", leadRouter); // Use the lead routes
app.use("/api/sanction", sanctionRouter); // Use teh sanction letter
app.use("/api/verify", verifyRouter); // Use the verify routes sevice to verify PAN and aadhaar

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
