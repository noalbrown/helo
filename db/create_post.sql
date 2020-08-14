INSERT INTO posts
  (title, image, content)
VALUES
  ($1, $2, $3);

SELECT *
FROM posts;