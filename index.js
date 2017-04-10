const child_process = require('child_process');
const debug = require('debug')('rpi-web');
const Koa = require('koa');
const app = new Koa();
const port = 3000;

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  debug(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(ctx => {
  debug(ctx.query);
  const { cmd } = ctx.query;
  const a = child_process.execSync(`python ./scripts/${cmd}`);
  console.log(a.toString());
  ctx.body = 'Hello Koa';
});

app.listen(port, (err) => {
  if (err) {
      console.error(err);
    } else {
      console.log('==> 🚧  Web server listening on port %s', port);
    }
});
