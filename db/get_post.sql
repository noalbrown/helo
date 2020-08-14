SELECT *
FROM posts
WHERE id = $1
JOIN users ON posts.id = users.username AND posts.profile_pic;