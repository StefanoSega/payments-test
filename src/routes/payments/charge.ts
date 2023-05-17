import express from "express";

import { existsValidator, numberValidator } from "../validators";
import { getValidationErrors } from "../routesHelpers";
import { ResponseType, getJsonResponse } from "../responseHelpers";
import { TapPaymentsService } from "~/api/tapPaymentsService";

export const attachRoutePaymentsCharge = (
  router: express.Router,
  tapPaymentsService: TapPaymentsService
) => {
  router.post(
    "/charge",
    [
      existsValidator("card"),
      numberValidator("amount"),
      numberValidator("phoneNumber"),
    ],
    async (req, res) => {
      const errorsAfterValidation = getValidationErrors(req);
      if (errorsAfterValidation) {
        return getJsonResponse(
          res,
          ResponseType.BadRequest,
          errorsAfterValidation
        );
      }

      try {
        const { card, amount, phoneNumber } = req.body;
        const response = await tapPaymentsService.createCharge(
          card,
          amount,
          phoneNumber
        );

        if (!response?.transaction?.url) {
          return getJsonResponse(res, ResponseType.InternalServerError, {
            card: "Something went wrong",
          });
        }

        return getJsonResponse(res, ResponseType.Success, {
          redirectUrl: response.transaction.url,
        });
      } catch (exc) {
        return getJsonResponse(res, ResponseType.InternalServerError, {
          error: exc,
        });
      }
    }
  );
};
