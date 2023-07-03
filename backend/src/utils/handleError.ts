import { Response } from "express";

export function handleError(res: Response, status: number, message: string) {
  res.status(status).json({ message });
}
