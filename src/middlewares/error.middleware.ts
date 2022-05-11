import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const status: number = error.status || StatusCodes.INTERNAL_SERVER_ERROR
  const message: string = error.message || 'unhandled error message'
  const env = process.env.NODE_ENV

  if (['dev', 'testing', 'local'].includes(env)) {
    console.error(error.stack)
    console.error(
      `${req.method} ${req.path} - statusCode: ${status}, message: ${message}`,
    )
  }
  res.status(status).json({ message })
}
