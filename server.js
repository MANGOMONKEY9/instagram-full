const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

async function connectDatabase () {
    try {
        db = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "nicky44roxx",
            port: 3306,
            database: "testing"
        });
    } catch (err) {
        console.error("failed to connect to db", err);
        process.exit(1);
    }
}

connectDatabase();

app.get("/getData", async (req, res) => {
    const { username, password } = req.query;
    const query = `SELECT * FROM login_info WHERE username = ? AND password = ?`
    try {
        const [result] = await db.query(query, [username, password]);
        res.json(result)
    } catch (err) {
        console.error(err)
    }
});

app.get("/api/posts", async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM post_info")
        res.json(result);
} catch (err) {
    console.error(err)
}
})

app.get("/api/postcomments/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const [result] = await db.query("SELECT COUNT(*) AS count FROM comments WHERE post_id = ?", [postId]);
        res.json(result[0])
    } catch (err) {
        console.log(err)
    }
})

app.post("/api/posts/:postId/like", async(req, res) => {
    const { postId } = req.params;
    try {
        const [result] = await db.query("UPDATE post_info SET likes = likes + 1 WHERE post_id = ?", [postId]);
        res.json(result)
} catch (err) {
    console.log(err)
}
})

app.post("/api/comments/:postId", async (req, res) => {
    const {post_id, user_id, comment_text, comment_date } = req.body;
    try {
        const [result] = await db.query("INSERT INTO comments (post_id, user_id, comment_text, comment_date) VALUES (?, ?, ?, ?)",[post_id, user_id, comment_text, comment_date])
        res.json(result)
    } catch (err) {
        console.error(err)
    }
})

app.post("/api/posts/:postId/dislike", async(req,res) => {
    const { postId } = req.params;
    try {
        const [result] = await db.query("UPDATE post_info SET likes = likes - 1 WHERE post_id = ?", [postId])
        res.json(result)
} catch (err) {
    console.log(err)
}
})

app.get("/api/posts/:id", async (req, res) => {
    const postId = req.params.id;
    try {
        const [result] = await db.query(`SELECT picture_url, caption, likes, user_id, prof_pic, created_at FROM post_info WHERE post_id = ?`, [postId])
        res.json(result)
    
} catch (err) {
    console.error(err)
}
})

app.post("/api/posts/create", async (req,res) => {
    const {caption, pictureUrl, likes, user_id, prof_pic} = req.body;
    //construct query
    const query = "INSERT INTO post_info (caption, picture_url, likes, user_id, prof_pic) VALUES (?, ?, ?, ?, ?)"
    //query from db
    try {
        const [result] = await db.query(query, [caption, pictureUrl, likes, user_id, prof_pic])
        res.json(result)
} catch (err) {
    console.error(err)
}
})

app.listen(4000, () => {
    console.log("Server started on port 4000")
});