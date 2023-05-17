import express, { Express } from "express";

import { UsersRepository } from "~/db/repositories/usersRepository";
import { attachRouteAuthLogin } from "./login";
import { attachRouteAuthTokenRefresh } from "./tokenRefresh";
import { attachRouteAuthRegister } from "./register";

export class AuthRoutes {
  private readonly app: Express;
  private readonly usersRepository: UsersRepository;

  constructor(app: Express, usersRepository: UsersRepository) {
    this.app = app;
    this.usersRepository = usersRepository;
  }

  attachToRouter(router: express.Router) {
    attachRouteAuthLogin(router, this.usersRepository);
    attachRouteAuthTokenRefresh(router);
    attachRouteAuthRegister(router, this.usersRepository);

    this.app.use("/auth", router);
  }
}
