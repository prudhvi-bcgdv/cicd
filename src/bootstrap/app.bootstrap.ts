import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import { errorMiddleware } from '../middlewares/error.middleware'
import { Server } from 'http'
import { routeNotFoundMiddleware } from '../middlewares/routeNotFound.middleware'
import * as YAML from 'yamljs'
import { getRouteInfo, InversifyExpressServer } from 'inversify-express-utils'
import container from '../ioc/inversify.ioc'
import * as prettyjson from 'prettyjson'
import * as cors from 'cors'
import * as swaggerUi from 'swagger-ui-express'
const swagger = YAML.load('./swagger.yml')
import { NextFunction, Request, Response } from 'express'
import { SwaggerServer } from '../model/swaggerServer.model'

global.environment = YAML.load(`./environment/env.${process.env.NODE_ENV}.yml`)

export class App {
  private app: express.Application
  private server: InversifyExpressServer
  private port: string | number
  private env = global.environment
  constructor() {
    this.server = new InversifyExpressServer(container, null, {
      rootPath: '/',
    })
    this.port = global.environment.app.port || 3001
    this.env = process.env.NODE_ENV || 'dev'
    this.initializeBasicMiddlewares()
    this.initializeErrorHandling()
    this.build()
    this.initializeRouteNotFound()
  }

  listen(): Server {
    return this.app.listen(this.port, () => {
      if (['dev', 'testing', 'local'].includes(this.env)) {
        const routeInfo = getRouteInfo(container)
        console.log(`======= ENV: ${process.env.NODE_ENV} =======`)
        console.log(`App listening on port ${this.port}`)
        console.log('Environment variables: ', global.environment)
        console.log('=================================')
        console.log(prettyjson.render({ routes: routeInfo }))
      }
    })
  }

  getServer(): express.Application {
    return this.app
  }

  private build(): void {
    this.app = this.server.build()
  }

  private initializeBasicMiddlewares(): void {
    this.server.setConfig((app) => {
      app.use(express.json())
      app.use(express.urlencoded({ extended: true }))
      app.use(cookieParser())
      app.use(
        cors({
          origin: [
            global.environment.app.frontendURL,
            `http://localhost:${global.environment.app.port}`,
            `http://127.0.0.1:${global.environment.app.port}`,
            `http://0.0.0.0:${global.environment.app.port}`,
            /[http|https]{1}:\/\/dcp-core-services-image-[a-z0-9]*(-ue\.a\.run\.app)$/,
          ],
          allowedHeaders: [
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          ],
        }),
      )

      app.use(
        '/api-docs',
        (req: any, res: Response, next: NextFunction) => {
          const swaggerServers = new Map<string, SwaggerServer>()
          swaggerServers.set(req.get('host'), {
            url:
              `${req.get('host').includes('localhost') ? 'http' : 'https'}` +
              '://' +
              req.get('host'),
          })
          swagger.servers = [...swaggerServers.values()]
          req.swaggerDoc = swagger
          next()
        },
        swaggerUi.serve,
        swaggerUi.setup(),
      )
    })
  }

  private initializeErrorHandling(): void {
    this.server.setErrorConfig((app) => app.use(errorMiddleware))
  }

  private initializeRouteNotFound(): void {
    this.app.use(routeNotFoundMiddleware)
  }
}
