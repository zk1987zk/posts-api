const express = require('express'); //因为需要用到express的router.
const {
    getAllPost,
    getPostById,
    updatePostById,
    replacePostById,
    addPost,
    deletePostById
} = require('../controllers/posts'); 
//这里倒入的方法有些不同于controller里的倒入方法，controller是直接倒入到一个const，而这里用的方法是deconstruturing把这些method都分解出来了，这样的话，下面就可以很直观地看出来在调用哪一个的逻辑。
const validateId = require('../middleware/validateId');

const router = express.Router(); //注意之前的写法是const app = express();然后app.get...
// *注意* router.get,put...里面的路径并没有提到resources，比如posts/:id这个posts resource， 那么这些resource应该写到哪里呢，写到routes.js里。
router.get('', getAllPost); 

router.get('./:id', validateId, getPostById); //用了middleware

router.post('', addPost);

router.put('/:id', validateId, replacePostById);

router.patch('/:id', validateId, updatePostById);

router.delete('/:id', validateId, deletePostById);

module.exports = router; //用了router之后，最后再到处这个router就好了。