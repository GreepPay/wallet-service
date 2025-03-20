import { PointTransactionController } from "../controllers/PointTransactionController";
import router, { type BunRequest } from "./router";

const APP_VERSION = "v1";

/**
 * @swagger
 * /v1/point-transactions:
 *   post:
 *     tags:
 *       - Point Transactions
 *     summary: Create a new point transaction
 *     description: Creates a new point transaction (credit or debit)
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
 *               wallet_id:
 *                 type: number
 *               user_id:
 *                 type: number
 *               amount:
 *                 type: string
 *               point_balance:
 *                 type: string
 *               charge_id:
 *                 type: string
 *               chargeable_type:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               reference:
 *                 type: string
 *               extra_data:
 *                 type: string
 *               currency:
 *                 type: string
 *     responses:
 *       201:
 *         description: Point transaction created successfully
 *       400:
 *         description: Invalid input data
 */
router.add(
  "POST",
  `/${APP_VERSION}/point-transactions`,
  async (request: BunRequest) => {
    const result =
      await new PointTransactionController().createPointTransaction(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/point-transactions/{id}/status:
 *   post:
 *     tags:
 *       - Point Transactions
 *     summary: Update point transaction status
 *     description: Updates the status of a point transaction (e.g., default, pending, successful)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the point transaction to update
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
 *         description: Point transaction status updated successfully
 *       404:
 *         description: Point transaction not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/point-transactions/:id/status`,
  async (request: BunRequest) => {
    const result =
      await new PointTransactionController().updatePointTransactionStatus(
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
 * /v1/point-transactions/{id}/soft-delete:
 *   post:
 *     tags:
 *       - Point Transactions
 *     summary: Soft delete a point transaction
 *     description: Soft deletes a point transaction by marking it as deleted
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the point transaction to soft delete
 *     responses:
 *       200:
 *         description: Point transaction soft deleted successfully
 *       404:
 *         description: Point transaction not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/point-transactions/:id/soft-delete`,
  async (request: BunRequest) => {
    const result =
      await new PointTransactionController().softDeletePointTransaction(
        request,
      );
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);
