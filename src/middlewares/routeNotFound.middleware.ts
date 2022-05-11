import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const routeNotFoundMiddleware = (req: Request, res: Response): void => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: `Can't find ${req.originalUrl} on this server!` })
}
