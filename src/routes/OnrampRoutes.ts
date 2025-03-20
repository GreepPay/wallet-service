import { OnrampController } from "../controllers/OnrampControllers";
import router, { type BunRequest } from "./router";

const APP_VERSION = "v1";

/**
 * @swagger
 * /v1/onramp/{wallet_id}/{user_id}:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Submit a payment collection (deposit)
 *     description: Submits a payment collection request for depositing funds into a wallet.
 *     parameters:
 *       - in: path
 *         name: wallet_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the wallet to deposit funds into.
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user making the deposit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PaymentCollectionForm"
 *     responses:
 *       201:
 *         description: Payment collection submitted successfully.
 *       400:
 *         description: Invalid input data.
 */
router.add(
  "POST",
  `/${APP_VERSION}/onramp/:wallet_id/:user_id`,
  async (request: BunRequest) => {
    const result = await new OnrampController().submitPaymentCollection(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/accept/{id}:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Accept a collection request
 *     description: Accepts a payment collection request for deposit.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the collection request to accept.
 *     responses:
 *       200:
 *         description: Collection request accepted successfully.
 *       404:
 *         description: Collection request not found.
 */
router.add(
  "POST",
  `/${APP_VERSION}/onramp/accept/:id`,
  async (request: BunRequest) => {
    const result = await new OnrampController().acceptCollectionRequest(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/deny/{id}:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Deny a collection request
 *     description: Denies a payment collection request for deposit.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the collection request to deny.
 *     responses:
 *       200:
 *         description: Collection request denied successfully.
 *       404:
 *         description: Collection request not found.
 */
router.add(
  "POST",
  `/${APP_VERSION}/onramp/deny/:id`,
  async (request: BunRequest) => {
    const result = await new OnrampController().denyCollectionRequest(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/cancel/{id}:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Cancel a collection request
 *     description: Cancels a payment collection request for deposit.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the collection request to cancel.
 *     responses:
 *       200:
 *         description: Collection request canceled successfully.
 *       404:
 *         description: Collection request not found.
 */
router.add(
  "POST",
  `/${APP_VERSION}/onramp/cancel/:id`,
  async (request: BunRequest) => {
    const result = await new OnrampController().cancelCollectionRequest(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/refund/{id}:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Refund a collection request
 *     description: Refunds a payment collection request for deposit.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the collection request to refund.
 *     responses:
 *       200:
 *         description: Collection request refunded successfully.
 *       404:
 *         description: Collection request not found.
 */
router.add(
  "POST",
  `/${APP_VERSION}/onramp/refund/:id`,
  async (request: BunRequest) => {
    const result = await new OnrampController().refundCollectionRequest(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/supported-countries:
 *   get:
 *     tags:
 *       - Onramp
 *     summary: Get supported countries for deposit
 *     description: Retrieves the list of supported countries for deposits.
 *     responses:
 *       200:
 *         description: Supported countries retrieved successfully.
 *       400:
 *         description: Failed to retrieve supported countries.
 */
router.add(
  "GET",
  `/${APP_VERSION}/onramp/supported-countries`,
  async (request: BunRequest) => {
    const result = await new OnrampController().getSupportedCountriesForDeposit(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/channels/{country_code}:
 *   get:
 *     tags:
 *       - Onramp
 *     summary: Get available payment channels for a country
 *     description: Retrieves a list of available payment channels for a specific country.
 *     parameters:
 *       - in: path
 *         name: country_code
 *         required: true
 *         schema:
 *           type: string
 *         description: The two-letter country code (e.g., "NG").
 *     responses:
 *       200:
 *         description: Payment channels retrieved successfully.
 *       404:
 *         description: No channels found for the specified country.
 */
router.add(
  "GET",
  `/${APP_VERSION}/onramp/channels/:country_code`,
  async (request: BunRequest) => {
    const result = await new OnrampController().getChannels(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/networks/{country_code}:
 *   get:
 *     tags:
 *       - Onramp
 *     summary: Get available payment networks for a country
 *     description: Retrieves a list of available payment networks for a specific country.
 *     parameters:
 *       - in: path
 *         name: country_code
 *         required: true
 *         schema:
 *           type: string
 *         description: The two-letter country code (e.g., "NG").
 *     responses:
 *       200:
 *         description: Payment networks retrieved successfully.
 *       404:
 *         description: No networks found for the specified country.
 */
router.add(
  "GET",
  `/${APP_VERSION}/onramp/networks/:country_code`,
  async (request: BunRequest) => {
    const result = await new OnrampController().getNetworks(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/rates/{currency}:
 *   get:
 *     tags:
 *       - Onramp
 *     summary: Get the base exchange rate for a currency
 *     description: Retrieves the base exchange rate for a specific currency.
 *     parameters:
 *       - in: path
 *         name: currency
 *         required: true
 *         schema:
 *           type: string
 *         description: The three-letter currency code (e.g., "NGN").
 *     responses:
 *       200:
 *         description: Exchange rate retrieved successfully.
 *       404:
 *         description: Exchange rate not found for the specified currency.
 */
router.add(
  "GET",
  `/${APP_VERSION}/onramp/rates/:currency`,
  async (request: BunRequest) => {
    const result = await new OnrampController().getBaseExchangeRate(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/account:
 *   get:
 *     tags:
 *       - Onramp
 *     summary: Get global account details
 *     description: Retrieves the global account details.
 *     responses:
 *       200:
 *         description: Account details retrieved successfully.
 *       404:
 *         description: Account details not found.
 */
router.add(
  "GET",
  `/${APP_VERSION}/onramp/account`,
  async (request: BunRequest) => {
    const result = await new OnrampController().getGlobalAccountDetails(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/webhook:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Create a webhook
 *     description: Creates a webhook with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               state:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Webhook created successfully.
 *       400:
 *         description: Invalid input data.
 */
router.add(
  "POST",
  `/${APP_VERSION}/onramp/webhook`,
  async (request: BunRequest) => {
    const result = await new OnrampController().createWebhook(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/onramp/collection/{id}:
 *   get:
 *     tags:
 *       - Onramp
 *     summary: Get a single collection request
 *     description: Retrieves a single collection request by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the collection request to retrieve.
 *     responses:
 *       200:
 *         description: Collection request retrieved successfully.
 *       404:
 *         description: Collection request not found.
 */
router.add(
  "GET",
  `/${APP_VERSION}/onramp/collection/:id`,
  async (request: BunRequest) => {
    const result = await new OnrampController().getSingleCollectionRequest(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);