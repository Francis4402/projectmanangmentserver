import { Request, Response } from "express";
export declare const getTasks: (req: Request, res: Response) => Promise<void>;
export declare const createTask: (req: Request, res: Response) => Promise<void>;
export declare const updateTaskStatus: (req: Request, res: Response) => Promise<void>;
export declare const getUserTasks: (req: Request, res: Response) => Promise<void>;
