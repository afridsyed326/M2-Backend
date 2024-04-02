import { COIN_TRANSACTION_TYPE, Transaction } from "../entity/Transaction.entity";
import { User } from "../entity/User.entity";
import { AppDataSource } from "../server/data-source";
import * as ethUtil from 'ethereumjs-util';
import { randomBytes } from 'crypto';
import { Coin } from "../entity/Coin.entity";
import { FEE_TYPE, TransactionFee } from "../entity/TransactionFee.entity";

export const generateWalletAddress = () => {
  const privateKey: Buffer = randomBytes(32);
  const publicKey: Buffer = ethUtil.privateToPublic(privateKey);
  const addressBuffer: Buffer = ethUtil.pubToAddress(publicKey);
  const address: string = ethUtil.bufferToHex(addressBuffer);
  return address;
};

export const generateTrxHash = () => {
  const randBytes = randomBytes(32);
  const hash = ethUtil.keccak256(randBytes);
  return '0x' + hash.toString('hex');
};

export const getCoin = async (symbol: string) => {
    const coin = await AppDataSource.manager.findOne(Coin, {
        where: [{ symbol }],
    });
    return coin;
}

export const getTrxFee = async (transactionType: COIN_TRANSACTION_TYPE, amount: number): Promise<number> => {
    const feeData = await AppDataSource.manager.findOne(TransactionFee, {
        where: [{ transactionType }],
    });
    if (!feeData) return 0

    if (feeData.type === FEE_TYPE.AMOUNT) return feeData.fee;

    return amount * feeData.fee / 100;
}

export const getUserTokenBalance = async (userId:number): Promise<{creditSum: number, debitSum: number}> => {

    const result = await AppDataSource
        .getRepository(Transaction)
        .createQueryBuilder("transaction")
        .select("SUM(CASE WHEN transaction.direction = 'CREDIT' THEN transaction.amount ELSE 0 END)", "creditSum")
        .addSelect("SUM(CASE WHEN transaction.direction = 'DEBIT' THEN transaction.amount ELSE 0 END)", "debitSum")
        .where("transaction.user = :userId", { userId })
        .groupBy("transaction.user")
        .getRawOne();

    if (!result) return {creditSum: 0, debitSum: 0};

    return result;

  };