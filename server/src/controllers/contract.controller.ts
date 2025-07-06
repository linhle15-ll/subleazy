import { NextFunction, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { getAuthRequest } from '../utils/common.utils';

const contractController = {
  // Create a new contract
  createContract: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const data = authReq.body;

      // Add the authenticated user as the contract creator
      data.creator = new Types.ObjectId(authReq.user.id);

      // TODO: Add contract data validation
      // if (validateContractData(data)) {
      //   res.status(400).json({ error: 'Invalid contract data' });
      //   return;
      // }

      // TODO: Implement contract creation logic
      // const contract = await contractService.createContract(data);

      res.status(201).json({
        success: true,
        message: 'Contract created successfully',
        data: {},
      });
    } catch (error) {
      next(error);
    }
  },

  // Edit/Update an existing contract
  editContract: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const contractId = authReq.params.contractId;

      if (!contractId || !mongoose.isValidObjectId(contractId)) {
        res.status(400).json({ error: 'Invalid contract ID' });
        return;
      }

      // TODO: Get existing contract
      // const existingContract = await contractService.getContract(contractId);

      // if (!existingContract) {
      //   res.status(404).json({ error: 'Contract not found' });
      //   return;
      // }

      // TODO: Check authorization - only creator or involved parties can edit
      // if (getContractCreatorId(existingContract) !== authReq.user.id) {
      //   res.status(403).json({ error: 'Unauthorized to edit this contract' });
      //   return;
      // }

      // TODO: Define allowed fields for updates
      // const allowedFields = [
      //   'terms',
      //   'status',
      //   'startDate',
      //   'endDate',
      //   'rentAmount',
      //   'depositAmount'
      // ];

      // const filteredData = Object.fromEntries(
      //   Object.entries(updates).filter(([key]) => allowedFields.includes(key))
      // );

      // TODO: Validate updated data
      // if (validateContractData({ ...existingContract.toObject(), ...updates })) {
      //   res.status(400).json({ error: 'Invalid contract data' });
      //   return;
      // }

      // TODO: Update contract
      // const editedContract = await contractService.updateContract(contractId, filteredData);

      res.status(200).json({
        success: true,
        message: 'Contract updated successfully',
        data: { contractId },
      });
    } catch (error) {
      next(error);
    }
  },

  // Get contract by post ID
  getContractByPostId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authReq = getAuthRequest(req);
      const postId = req.params.postId;

      if (!postId || !mongoose.isValidObjectId(postId)) {
        res.status(400).json({ error: 'Invalid post ID' });
        return;
      }

      // TODO: Get contract by post ID
      // const contract = await contractService.getContractByPostId(postId);

      // if (!contract) {
      //   res.status(404).json({ error: 'Contract not found for this post' });
      //   return;
      // }

      // TODO: Check authorization - only involved parties can view
      // if (!isContractParticipant(contract, authReq.user.id)) {
      //   res.status(403).json({ error: 'Unauthorized to view this contract' });
      //   return;
      // }

      res.status(200).json({
        success: true,
        message: 'Contract retrieved successfully',
        data: { postId },
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete a contract
  deleteContract: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const contractId = req.params.contractId;

      if (!contractId || !mongoose.isValidObjectId(contractId)) {
        res.status(400).json({ error: 'Invalid contract ID' });
        return;
      }

      // TODO: Get existing contract
      // const existingContract = await contractService.getContract(contractId);

      // if (!existingContract) {
      //   res.status(404).json({ error: 'Contract not found' });
      //   return;
      // }

      // TODO: Check authorization - only creator can delete
      // if (getContractCreatorId(existingContract) !== authReq.user.id) {
      //   res.status(403).json({ error: 'Unauthorized to delete this contract' });
      //   return;
      // }

      // TODO: Delete contract
      // await contractService.deleteContract(contractId);

      res.status(200).json({
        success: true,
        message: 'Contract deleted successfully',
        data: { contractId },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default contractController;
