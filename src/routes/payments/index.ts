import express, { Express } from "express";

import { attachRoutePaymentsCharge } from "./charge";
import { TapPaymentsService } from "~/api/tapPaymentsService";

export class PaymentsRoutes {
  private readonly app: Express;
  private readonly tapPaymentsService: TapPaymentsService;

  constructor(app: Express, tapPaymentsService: TapPaymentsService) {
    this.app = app;
    this.tapPaymentsService = tapPaymentsService;
  }

  attachToRouter(router: express.Router) {
    attachRoutePaymentsCharge(router, this.tapPaymentsService);

    this.app.use("/payments", router);
  }
}
