import { TransactionController } from "../controllers/TransactionController";
import router, { type BunRequest } from "./router";

const APP_VERSION = "v1";

/**
 * @swagger
 * /v1/transactions:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Create a new transaction
 *     description: Creates a new transaction (credit or debit)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *               dr_or_cr:
 *                 type: string
 *               currency:
 *                 type: string
 *               wallet_id:
 *                 type: number
 *               user_id:
 *                 type: number
 *               amount:
 *                 type: string
 *               wallet_balance:
 *                 type: string
 *               charge_id:
 *                 type: string
 *               chargeable_type:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               charges:
 *                 type: string
 *               reference:
 *                 type: string
 *               extra_data:
 *                 type: string
 *               gateway:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Invalid input data
 */
router.add(
  "POST",
  `/${APP_VERSION}/transactions`,
  async (request: BunRequest) => {
    const result = await new TransactionController().createTransaction(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/transactions/{id}/status:
 *   POST:
 *     tags:
 *       - Transactions
 *     summary: Update transaction status
 *     description: Updates the status of a transaction (e.g., default, pending, successful)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction status updated successfully
 *       404:
 *         description: Transaction not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/transactions/:id/status`,
  async (request: BunRequest) => {
    const result = await new TransactionController().updateTransactionStatus(
      request,
    );
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/transactions/{id}/soft-delete:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Soft delete a transaction
 *     description: Soft deletes a transaction by marking it as deleted
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to soft delete
 *     responses:
 *       200:
 *         description: Transaction soft deleted successfully
 *       404:
 *         description: Transaction not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/transactions/:id/soft-delete`,
  async (request: BunRequest) => {
    const result = await new TransactionController().softDeleteTransaction(
      request,
    );
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);
