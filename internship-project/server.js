const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");

const ADMIN_DELETE_PASSWORD = "admin123";

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sachin@9538124888",
  database: "internship_db"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));

function redirectIfLoggedIn(req, res, next) {
    if (req.session.user) {
        return res.redirect("/dashboard");
    }
    next();
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { error: null });
});

app.get("/signup", redirectIfLoggedIn, (req, res) => {
    res.render("signup", { error: null });
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render("signup", { error: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err) => {
            if (err) {
                return res.render("signup", { error: "User already exists" });
            }
            res.redirect("/login");
        }
    );
});

app.get("/login", redirectIfLoggedIn, (req, res) => {
    res.render("login", { error: null });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, results) => {
            if (err || results.length === 0) {
                return res.render("login", { error: "Invalid credentials" });
            }

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.render("login", { error: "Invalid credentials" });
            }

            req.session.user = user.id;
            res.redirect("/dashboard");
        }
    );
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.render("index", {
      error: "All fields are required.",
    });
  }

  const sql = "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting feedback:", err);
      return res.status(500).send("Database error");
    }

    res.render("result", {
      name,
      email,
      message,
    });
  });
});

app.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    db.query("SELECT * FROM feedback", (err, results) => {
        if (err) {
            console.error(err);
            return res.send("Database error");
        }
        res.render("dashboard", { submissions: results });
    });
});

app.post("/delete/:id", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const id = req.params.id;
    const { password } = req.body;

    if (password !== ADMIN_DELETE_PASSWORD) {
        return res.send("Incorrect password. Deletion not allowed.");
    }

    db.query("DELETE FROM feedback WHERE id = ?", [id], (err) => {
        if (err) {
            console.error(err);
            return res.send("Database error");
        }
        res.redirect("/dashboard");
    });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
