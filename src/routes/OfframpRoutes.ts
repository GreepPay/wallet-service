import { OfframpController } from "../controllers/OfframpControllers";
import router, { type BunRequest } from "./router";

const APP_VERSION = "v1";

/**
 * @swagger
 * /v1/offramp/{wallet_id}/{user_id}:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Submit a payment request (withdrawal)
 *     description: Submits a payment request for withdrawing funds from a wallet.
 *     parameters:
 *       - in: path
 *         name: wallet_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the wallet to withdraw funds from.
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user making the withdrawal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PaymentRequestForm"
 *     responses:
 *       201:
 *         description: Payment request submitted successfully.
 *       400:
 *         description: Invalid input data.
 */
router.add(
  "POST",
  `/${APP_VERSION}/offramp/:wallet_id/:user_id`,
  async (request: BunRequest) => {
    const result = await new OfframpController().submitPaymentRequest(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/offramp/accept/{id}:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Accept a payment request
 *     description: Accepts a payment request for withdrawal.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment request to accept.
 *     responses:
 *       200:
 *         description: Payment request accepted successfully.
 *       404:
 *         description: Payment request not found.
 */
router.add(
  "POST",
  `/${APP_VERSION}/offramp/accept/:id`,
  async (request: BunRequest) => {
    const result = await new OfframpController().acceptPaymentRequest(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/offramp/deny/{id}:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Deny a payment request
 *     description: Denies a payment request for withdrawal.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment request to deny.
 *     responses:
 *       200:
 *         description: Payment request denied successfully.
 *       404:
 *         description: Payment request not found.
 */
router.add(
  "POST",
  `/${APP_VERSION}/offramp/deny/:id`,
  async (request: BunRequest) => {
    const result = await new OfframpController().denyPaymentRequest(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/offramp/settlement:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Create a settlement
 *     description: Creates a settlement for withdrawing funds to an external wallet.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CryptoSettlementForm"
 *     responses:
 *       201:
 *         description: Settlement created successfully.
 *       400:
 *         description: Invalid input data.
 */
router.add(
  "POST",
  `/${APP_VERSION}/offramp/settlement`,
  async (request: BunRequest) => {
    const result = await new OfframpController().createSettlement(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/offramp/settlement/{sequenceId}:
 *   get:
 *     tags:
 *       - Offramp
 *     summary: Get a settlement by sequence ID
 *     description: Retrieves a settlement by its sequence ID.
 *     parameters:
 *       - in: path
 *         name: sequenceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The sequence ID of the settlement to retrieve.
 *     responses:
 *       200:
 *         description: Settlement retrieved successfully.
 *       404:
 *         description: Settlement not found.
 */
router.add(
  "GET",
  `/${APP_VERSION}/offramp/settlement/:sequenceId`,
  async (request: BunRequest) => {
    const result = await new OfframpController().getSettlement(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/offramp/{id}:
 *   get:
 *     tags:
 *       - Offramp
 *     summary: Get a single payment request
 *     description: Retrieves a single payment request by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment request to retrieve.
 *     responses:
 *       200:
 *         description: Payment request retrieved successfully.
 *       404:
 *         description: Payment request not found.
 */
router.add(
  "GET",
  `/${APP_VERSION}/offramp/:id`,
  async (request: BunRequest) => {
    const result = await new OfframpController().getPaymentRequest(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/offramp/resolve-bank-account:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Resolve bank account details
 *     description: Resolves bank account details using the provided account number and network ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumber:
 *                 type: string
 *               networkId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bank account resolved successfully.
 *       400:
 *         description: Invalid input data.
 */
router.add(
  "POST",
  `/${APP_VERSION}/offramp/resolve-bank-account`,
  async (request: BunRequest) => {
    const result = await new OfframpController().resolveBankAccount(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/offramp/webhook:
 *   put:
 *     tags:
 *       - Offramp
 *     summary: Update a webhook
 *     description: Updates a webhook with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               url:
 *                 type: string
 *               state:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Webhook updated successfully.
 *       400:
 *         description: Invalid input data.
 */
router.add(
  "PUT",
  `/${APP_VERSION}/offramp/webhook`,
  async (request: BunRequest) => {
    const result = await new OfframpController().updateWebhook(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/offramp/webhook/{id}:
 *   delete:
 *     tags:
 *       - Offramp
 *     summary: Delete a webhook
 *     description: Deletes a webhook by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the webhook to delete.
 *     responses:
 *       200:
 *         description: Webhook deleted successfully.
 *       404:
 *         description: Webhook not found.
 */
router.add(
  "DELETE",
  `/${APP_VERSION}/offramp/webhook/:id`,
  async (request: BunRequest) => {
    const result = await new OfframpController().deleteWebhook(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/offramp/supported-countries:
 *   get:
 *     tags:
 *       - Offramp
 *     summary: Get supported countries for withdrawals
 *     description: Retrieves the list of supported countries for withdrawals.
 *     responses:
 *       200:
 *         description: Supported countries retrieved successfully.
 *       400:
 *         description: Failed to retrieve supported countries.
 */
router.add(
  "GET",
  `/${APP_VERSION}/offramp/supported-countries`,
  async (request: BunRequest) => {
    const result = await new OfframpController().getSupportedCountriesForWithdrawal(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);