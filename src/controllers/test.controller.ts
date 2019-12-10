import { NextFunction, Request, Response } from 'express';

export function testController(req: Request, res: Response): Response {
  return res.status(200).send('Test!');
}