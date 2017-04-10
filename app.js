const child_process = require('child_process');
const path = require('path');
const debug = require('debug')('rpi-web');
const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();
const cwd = process.cwd();

app.use(serve(path.join(cwd, 'assets')));

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  debug(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use((ctx, next) => {
  if (ctx.url === '/exec') {
    debug(ctx.query);
    const { cmd } = ctx.query;
    const a = child_process.execSync(`python ./scripts/${cmd}`);
    console.log(a.toString());
    ctx.body = 'Hello Koa';
  }
  else {
    next();
  }
});

module.exports = app;
