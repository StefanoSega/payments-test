import express, { Express } from "express";

import { AuthRoutes } from "./auth";
import { UsersRepository } from "~/db/repositories/usersRepository";
import { PaymentsRoutes } from "./payments";
import { TapPaymentsService } from "~/api/tapPaymentsService";

export const applyRoutes = (app: Express) => {
  const router = express.Router();
  const usersRepository = new UsersRepository();
  const tapPaymentsService = new TapPaymentsService();

  new AuthRoutes(app, usersRepository).attachToRouter(router);
  new PaymentsRoutes(app, tapPaymentsService).attachToRouter(router);
};
