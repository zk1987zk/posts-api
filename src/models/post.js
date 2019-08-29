const posts = []; //这个在模拟数据库
let currentId = 1;

function addPost(post) {
    const newPost = { ...post, id: currentId++ };
    posts.push(newPost);
    return newPost;
}

function getAllPost() {
    // deep copy, 如果直接返回posts，我返回的是一个reference，那么web就可以脱离model去做对posts的操作，那么这里做一个deep copy意思就是你永远只能获得posts的副本，不会对posts做任何操作。
    return JSON.parse(JSON.stringify(posts));
}

function getPostById(id) {
    return posts.find(i => i.id === id);
}

function replacePostById(id, newPost) {
    // newPost should not include id
    const postIndex = getPostIndexById(id);
    const updatedPost = { ...newPost, id };
    posts[postIndex] = updatedPost;
    return updatedPost;
}
/* 被删掉了？
function updatePostById(id, newPost) {
    // newPost should not include id
    // 这个对应的是patch操作,之后被导师删掉了
    const postIndex = getPostIndexById(id);
    const post = posts[postIndex];
    post.author = newPost.author || post.author;
    post.content = newPost.content || post.content;
    return post;
}
*/ 
function deletePostById(id) {
    const postIndex = getPostIndexById(id);
    const deletedPost = posts.slice(postIndex, 1);
    return deletedPost;
}

function doesIdExist(id) {
    // 这个function在这里没被调用，但在实际代码中，这个function用处很大，意思就是如果这个id不存在，那就不运行之后的操作了。
    const postIndex = getPostIndexById(id);
    return postIndex !== -1;
}

function getPostIndexById(id) {
    //注意区分Array.find()和Array.findIndex(), 这里的i是index而不是post
    return posts.findIndex(i => i.id === id);
}

// 只导出web被允许调用的function.
module.exports = {
    getAllPost,
    getPostById,
    replacePostById,
    deletePostById,
    addPost,
    doesIdExist
}