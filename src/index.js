// 这个是个服务端，用逻辑处理客户提供的数据
const express = require('express');
const app = express();
app.use(express.json()); //body parser见笔记
/* 没有进行逻辑拆分前的代码。
let currentId = 1; //服务端必须知道id
const posts = []; //用来做一个虚拟的数据库

// app.get('/', (req, res) => { // /是根路径，在这里就是http://localhost:3000/ 
//     res.send('hello');
// })

app.get('/posts', (req, res) => { //对posts路径请求的操作
    res.json(posts); //以json形式返回posts， 模拟用户对posts数据库请求。
});

app.get('/posts/:id', (req, res) => { //id是parameter，所以前面要加冒号。
    // get id of the post
    const {id} = req.params; //这是request里拿parameter 注意这个id是string,所以要加Number().
    // find the post from posts
    const post = posts.find(i => i.id === Number(id)); // arrow function是一个cb function
    //return this post
    if (!post) {
        return res.sendStatus(404);
    }
    res.json(post);
});

//添加一个新的post，虽然路径一样，都是‘/posts’，
//但这个是发帖，请求方式不一样，所以不同的逻辑会被触发。
app.post('/posts', (req, res) => { 
    //req.body; 不能直接调用body，必须要用req，否则拿不到发送的内容。
    //console.log(req.body);这里并没有调用res(response)去处理数据，所以请求会被卡住，然后一直等待。用express.json，看笔记。
    //posts.push(req.body)不能这样做，第一，因为每个post都需要一个id。第二不能相信客户端发来的请求，需要做数据检测，比如我只想要author和content，就要把这两项取出来。
    const {author, content} = req.body; //deconstruction req.body必须要有app.use(express.json)
    const newPost = {author, content, id: currentId++}; //加上id
    posts.push(newPost); //现在可以加入posts
    //res.json(newPost);也可以返回这个newpost，如果创建成功，要返回201，表示创建成功。
    res.status(201).json(newPost); //有了res. sending request就会停止。比如可以只写 res.json();也能停止sending request，respond就没有任何内容。

});

app.put('/posts/:id', (req, res) => {
     // get id of the post
     const {id} = req.params;
     // get new content
     const {author, content} = req.body;
     // find the post from posts
     const post = posts.find(i => i.id === Number(id)); 
     //return this post
     if (!post) {
         return res.sendStatus(404);
     }
     // replace old post with new post
     post.author = author;
     post.content = content;
     res.json(post);
});

app.delete('/posts/:id', (req, res) => {
    // get id of the post
    const {id} = req.params;
    // find the post *index* from posts
    const postIndex = posts.findIndex(i => i.id === Number(id)); 
    //return this post
    if (!postIndex === -1) {
        return res.sendStatus(404);
    }
    const deletedPost = posts.splice(postIndex, 1);
    res.json(deletedPost);
})

app.listen(3000, () => {
    console.log('Server listen on port 3000');
});

*/

//进行逻辑拆分后的代码
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
app.use('/v1', routes); //v1代表说这个是version 1，这就是入口文件
app.use(cors());
const PORT = process.env.PORT || 3000; //这个端口号是动态的，不一定是3000， 发布者发布的时候可能是环境变量的port属性，那我就用这个属性，不要hardcode 到 3000，除非发布者没给端口。

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});
//服务器入口文件
