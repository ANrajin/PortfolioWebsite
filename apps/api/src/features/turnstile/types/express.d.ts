import "express";

declare module "express" {
    interface Request {
        turnstileVerified?: boolean;
    }
}
