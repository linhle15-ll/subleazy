import { NextFunction, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { getAuthRequest } from '../utils/common.utils';
import contractService from '../services/contract.service';
import { ContractStatus } from '../types/contract.types';

const contractController = {
  createContract: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const data = authReq.body;

      // Validate required fields
      const { title, post, sublessor, sublessees, group, content } = data;
      if (!title || !post || !sublessor || !sublessees || !group || !content) {
        res.status(400).json({
          error:
            'Missing required fields: title, post, sublessees, group, content',
        });
        return;
      }

      // Validate sublessees is an array
      if (!sublessees || sublessees.length === 0) {
        res.status(400).json({ error: 'Sublessees must be a non-empty array' });
        return;
      }

      // Validate ObjectIds
      if (!mongoose.isValidObjectId(post)) {
        res.status(400).json({ error: 'Invalid post ID' });
        return;
      }

      // Validate group
      if (!mongoose.isValidObjectId(group)) {
        res.status(400).json({ error: 'Invalid group ID' });
        return;
      }

      // Validate sublessees
      for (const sublesseeId of sublessees) {
        if (!mongoose.isValidObjectId(sublesseeId)) {
          res.status(400).json({ error: 'Invalid sublessee ID' });
          return;
        }
      }

      // Validate sublessor
      if (!mongoose.isValidObjectId(sublessor)) {
        res.status(400).json({ error: 'Invalid sublessor ID' });
        return;
      }

      // Only sublessor can create contract
      if (sublessor.toString() !== authReq.user.id) {
        res.status(403).json({ error: 'Unauthorized to create contract' });
        return;
      }

      

      // Create contract data, only sublessor can create contract
      const contractData = {
        title,
        post: new Types.ObjectId(post),
        sublessor: new Types.ObjectId(authReq.user.id),
        sublessees: sublessees.map((id: string) => new Types.ObjectId(id)),
        group: new Types.ObjectId(group),
        content,
        status: ContractStatus.PENDING,
      };

      const contract = await contractService.createContract(contractData);

      res.status(201).json({
        success: true,
        message: 'Contract created successfully',
        data: contract,
      });
    } catch (error) {
      next(error);
    }
  },

  getContractByGroupId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authReq = getAuthRequest(req);
      const groupId = req.params.groupId;

      if (!groupId || !mongoose.isValidObjectId(groupId)) {
        res.status(400).json({ error: 'Invalid group ID' });
        return;
      }

      const contract = await contractService.getContractByGroupId(groupId);

      if (!contract) {
        res.status(404).json({ error: 'Contract not found for this group' });
        return;
      }

      // Check authorization - only involved parties can view
      const isSublessor = (contract.sublessor as any)._id.toString() === authReq.user.id;
      const isSublessee = contract.sublessees.some(
        (sublessee) =>
          (sublessee as any)._id?.toString() ||
          sublessee.toString() === authReq.user.id
      );

      if (!isSublessor && !isSublessee) {
        res.status(403).json({ error: 'Unauthorized to view this contract' });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Contract retrieved successfully',
        data: contract,
      });
    } catch (error) {
      next(error);
    }
  },

  // use case to use delete contract when contract is signed and it is deleted from the group by platform, not by sublessor or sublessee
  deleteContract: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const authReq = getAuthRequest(req);
      const contractId = req.params.contractId;

      if (!contractId || !mongoose.isValidObjectId(contractId)) {
        res.status(400).json({ error: 'Invalid contract ID' });
        return;
      }

      // Get existing contract
      const existingContract = await contractService.getContract(contractId);

      if (!existingContract) {
        res.status(404).json({ error: 'Contract not found' });
        return;
      }

      const deleted = await contractService.deleteContract(contractId);

      if (!deleted) {
        res.status(500).json({ error: 'Failed to delete contract' });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Contract deleted successfully',
        data: { contractId },
      });
    } catch (error) {
      next(error);
    }
  },

  getMyContracts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const userId = authReq.user.id;
      if (!userId || !mongoose.isValidObjectId(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const contracts = await contractService.getContractsByUser(userId);

      res.status(200).json({
        success: true,
        message: 'Contracts retrieved successfully',
        data: contracts,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default contractController;
