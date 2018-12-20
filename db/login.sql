SELECT
  id,
  name,
  email,
  sociallink,
  img_url,
  privilege_level
FROM kid
WHERE name = $1;
