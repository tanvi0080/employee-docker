
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Employee API is running"
    });
});

// Database health check
app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            database: "PostgreSQL connected",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error("Database health error:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

// Employee routes
const employeeRoutes = require("./routes/employees");

app.use("/api/employees", employeeRoutes);

// Start server
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await pool.query("SELECT 1");

        console.log("PostgreSQL connected successfully!");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Backend running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Backend startup failed:", error);
        process.exit(1);
    }
}

startServer();
