const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({
    text: true,
    urlencoded: true,
    multipart: true,
    json: true,
  }));

let posts = [
    {
        id: 1,
        content: 'new React post',
        created: Date.now()  
    },
    {
        id: 2,
        content: 'another React post',
        created: Date.now()  
    }
];
let nextId = 3;

const router = new Router();

router.get('/posts', async (ctx, next) => {
    ctx.response.body = posts;
});

router.post('/posts', async(ctx, next) => {
    const {id, content} = ctx.request.body;

    if (id) {
        console.log(id, content)
        posts = posts.map(o => Number(o.id) !== Number(id) ? o : {...o, content: content});
        ctx.response.status = 204;
        return;
    }

    posts.push({...ctx.request.body, id: nextId++, created: Date.now()});
    ctx.response.status = 204;
    console.log(posts);
});

router.get('/posts/:id', async(ctx, next) => {
    const postId = Number(ctx.params.id);
    const post = posts.find(el => el.id === postId); 
    ctx.response.body = post;
    // ctx.response.status = 204;
});

router.delete('/posts/:id', async(ctx, next) => {
    const postId = Number(ctx.params.id);
    const index = posts.findIndex(o => o.id === postId);
    if (index !== -1) {
        posts.splice(index, 1);
    }
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));