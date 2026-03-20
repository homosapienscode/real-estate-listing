import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError, buildErrorResponse } from "../error";


export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json(
      buildErrorResponse({
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: err.flatten(),
      })
    );
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      buildErrorResponse({
        code: err.code,
        message: err.message,
        details: err.details,
      })
    );
  }

  console.error("Unhandled error:", err);

  return res.status(500).json(
    buildErrorResponse({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    })
  );
}