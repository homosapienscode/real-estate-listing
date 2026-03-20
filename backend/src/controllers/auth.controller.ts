import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../error";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/auth.service";
import {
  parseLoginInput,
  parseRegisterInput,
} from "../validators/auth.validator";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = parseRegisterInput(req.body);
    const result = await registerUser(input);

    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
          createdAt: result.user.createdAt,
          updatedAt: result.user.updatedAt,
        },
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const input = parseLoginInput(req.body);
    const result = await loginUser(input);

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
          createdAt: result.user.createdAt,
          updatedAt: result.user.updatedAt,
        },
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user?.id) {
      throw new UnauthorizedError("Authentication is required");
    }

    const user = await getCurrentUser(req.user.id);

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
}
