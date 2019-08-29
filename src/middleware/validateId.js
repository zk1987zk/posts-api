const postModel = require('../models/post');
//这次导出的写法又不一样，它只导出这个function
module.exports = function(req, res, next) {
    let { id } = req.params;
    id = Number(id);
    if (!postModel.doesIdExist(id)) {
        return res.status(404).json({ error: 'post id not found'});
    }
    req.params.id = id; //因为我们的id取出来的是一个string，如果不写这行，那么req.params.id还是string
    next();
};

// *注意* 这次的文件名字因为只有一个validateID的function，所以可以直接取这个名，如果这个文件对应其他的post的middleware，那就可以命名为post.js