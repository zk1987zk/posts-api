const express = require('express');
const postsRoute = require('./routes/posts');
const router = express.Router();

router.use('/posts', postsRoute);
//所有posts这个路径就走向postsRoute这个路径。
//如果想让所有路径都使用一个middleware，比如validateId，那就写成这样 
//router.use('/posts', validateId, postsRoute);
module.exports = router;