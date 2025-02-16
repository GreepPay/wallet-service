import { WalletController } from "../controllers/WalletController";
import router, { type BunRequest } from "./router";

const APP_VERSION = "v1";

/**
 * @swagger
 * /v1/wallets:
 *   post:
 *     tags:
 *       - Wallets
 *     summary: Create a new wallet
 *     description: Creates a new wallet for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *               user_id:
 *                 type: number
 *               total_balance:
 *                 type: string
 *               point_balance:
 *                 type: string
 *               credited_amount:
 *                 type: string
 *               debited_amount:
 *                 type: string
 *               locked_balance:
 *                 type: string
 *               credited_point_amount:
 *                 type: string
 *               debited_point_amount:
 *                 type: string
 *               cash_point_balance:
 *                 type: string
 *               cash_per_point:
 *                 type: string
 *               wallet_account:
 *                 type: string
 *               currency:
 *                 type: string
 *     responses:
 *       201:
 *         description: Wallet created successfully
 *       400:
 *         description: Invalid input data
 */
router.add("POST", `/${APP_VERSION}/wallets`, async (request: BunRequest) => {
  const result = await new WalletController().createWallet(request);
  return new Response(JSON.stringify(result.body), {
    headers: { "Content-Type": "application/json" },
    status: result.statusCode,
  });
});

/**
 * @swagger
 * /v1/wallets/{id}/balance:
 *   POST:
 *     tags:
 *       - Wallets
 *     summary: Update wallet balance
 *     description: Updates the balance of a wallet (e.g., total_balance, point_balance)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the wallet to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total_balance:
 *                 type: string
 *               point_balance:
 *                 type: string
 *               credited_amount:
 *                 type: string
 *               debited_amount:
 *                 type: string
 *               locked_balance:
 *                 type: string
 *               credited_point_amount:
 *                 type: string
 *               debited_point_amount:
 *                 type: string
 *               cash_point_balance:
 *                 type: string
 *               cash_per_point:
 *                 type: string
 *     responses:
 *       200:
 *         description: Wallet balance updated successfully
 *       404:
 *         description: Wallet not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/wallets/:id/balance`,
  async (request: BunRequest) => {
    const result = await new WalletController().updateWalletBalance(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/wallets/{id}/soft-delete:
 *   post:
 *     tags:
 *       - Wallets
 *     summary: Soft delete a wallet
 *     description: Soft deletes a wallet by marking it as deleted
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the wallet to soft delete
 *     responses:
 *       200:
 *         description: Wallet soft deleted successfully
 *       404:
 *         description: Wallet not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/wallets/:id/soft-delete`,
  async (request: BunRequest) => {
    const result = await new WalletController().softDeleteWallet(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);
