import { Types } from 'mongoose';
import Contract from '../models/contract.model';
import {
  Contract as ContractType,
  ContractStatus,
} from '../types/contract.types';

const contractService = {
  createContract: async (
    data: Partial<ContractType>
  ): Promise<ContractType> => {
    const contract = new Contract(data);
    return await contract.save();
  },

  getContract: async (contractId: string): Promise<ContractType | null> => {
    return await Contract.findById(contractId)
      .populate('post', 'title description')
      .populate('sublessor', 'firstName lastName email profileImage')
      .populate('sublessees', 'firstName lastName email profileImage')
      .populate('group', 'name');
  },

  updateContract: async (
    contractId: string,
    updates: Partial<ContractType>
  ): Promise<ContractType | null> => {
    return await Contract.findByIdAndUpdate(
      contractId,
      { $set: updates },
      { new: true, runValidators: true }
    )
      .populate('post', 'title description media')
      .populate('sublessor', 'firstName lastName email profileImage')
      .populate('sublessees', 'firstName lastName email profileImage')
      .populate('group', 'name description');
  },

  getContractByGroupId: async (
    groupId: string
  ): Promise<ContractType | null> => {
    return await Contract.findOne({ group: groupId })
      .populate('post', 'title description media')
      .populate('sublessor', 'firstName lastName email profileImage')
      .populate('sublessees', 'firstName lastName email profileImage')
      .populate('group', 'name description');
  },

  deleteContract: async (contractId: string): Promise<boolean> => {
    const result = await Contract.findByIdAndDelete(contractId);
    return !!result;
  },

  getContractsByUser: async (userId: string): Promise<ContractType[]> => {
    return await Contract.find({
      $or: [
        { sublessor: new Types.ObjectId(userId) },
        { sublessees: new Types.ObjectId(userId) },
      ],
    })
      .populate('post', 'title description media')
      .populate('sublessor', 'firstName lastName email profileImage')
      .populate('sublessees', 'firstName lastName email profileImage')
      .populate('group', 'name description')
      .sort({ createdAt: -1 });
  },

  updateContractStatus: async (
    contractId: string,
    status: ContractStatus
  ): Promise<ContractType | null> => {
    return await Contract.findByIdAndUpdate(
      contractId,
      { status },
      { new: true, runValidators: true }
    )
      .populate('post', 'title description media')
      .populate('sublessor', 'firstName lastName email profileImage')
      .populate('sublessees', 'firstName lastName email profileImage')
      .populate('group', 'name description');
  },
};

export default contractService;
