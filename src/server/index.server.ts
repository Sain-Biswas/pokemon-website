import swagger from "@elysiajs/swagger";
import Elysia, { t } from "elysia";


const server = new Elysia({prefix:'/api'})
.use(swagger())
.get('/', () => ({message: 'Welcome to Webdex API service 👋'}),
{
  response: t.Object({
    message: t.String()
  }, {
    description: "Welcome response"
  })
})

export default server;
