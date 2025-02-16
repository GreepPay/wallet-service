import { UserBankController } from "../controllers/UserBankController";
import router, { type BunRequest } from "./router";

const APP_VERSION = "v1";

/**
 * @swagger
 * /v1/user-banks:
 *   post:
 *     tags:
 *       - User Banks
 *     summary: Create a new user bank
 *     description: Creates a new user bank account
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
 *               wallet_id:
 *                 type: number
 *               bank_code:
 *                 type: string
 *               bank_name:
 *                 type: string
 *               account_no:
 *                 type: string
 *               currency:
 *                 type: string
 *               is_verified:
 *                 type: boolean
 *               meta_data:
 *                 type: string
 *     responses:
 *       201:
 *         description: User bank created successfully
 *       400:
 *         description: Invalid input data
 */
router.add(
  "POST",
  `/${APP_VERSION}/user-banks`,
  async (request: BunRequest) => {
    const result = await new UserBankController().createUserBank(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/user-banks/{id}:
 *   POST:
 *     tags:
 *       - User Banks
 *     summary: Update user bank
 *     description: Updates a user bank account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user bank to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bank_code:
 *                 type: string
 *               bank_name:
 *                 type: string
 *               account_no:
 *                 type: string
 *               currency:
 *                 type: string
 *               is_verified:
 *                 type: boolean
 *               meta_data:
 *                 type: string
 *     responses:
 *       200:
 *         description: User bank updated successfully
 *       404:
 *         description: User bank not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/user-banks/:id`,
  async (request: BunRequest) => {
    const result = await new UserBankController().updateUserBank(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/user-banks/{id}/soft-delete:
 *   post:
 *     tags:
 *       - User Banks
 *     summary: Soft delete a user bank
 *     description: Soft deletes a user bank by marking it as deleted
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user bank to soft delete
 *     responses:
 *       200:
 *         description: User bank soft deleted successfully
 *       404:
 *         description: User bank not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/user-banks/:id/soft-delete`,
  async (request: BunRequest) => {
    const result = await new UserBankController().softDeleteUserBank(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);
