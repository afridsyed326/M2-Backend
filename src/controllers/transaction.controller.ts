import { Request, Response } from 'express';
import { generateTrxHash, getCoin, getTrxFee, getUserTokenBalance } from '../services/wallet.service';
import { AppDataSource } from '../server/data-source';
import { User } from '../entity/User.entity';
import BadRequestError from '../errors/BadRequestError';
import { COIN_TRANSACTION_TYPE, TRANSACTION_DIRECTION, TRANSACTION_STATUS, Transaction } from '../entity/Transaction.entity';
import { apiResponse } from '../utils/apiResponse';

export const sendCoins = async (req: Request, res: Response) => {
    const { walletAddress, amount } = req.body;

    const userBalance = await getUserTokenBalance(req.user.id);

    const toUser = await AppDataSource.manager.findOne(User, {
        where: [{ walletAddress }],
    });

    if (!toUser) throw new BadRequestError({message: 'Invalid wallet address'})

    const fee = await getTrxFee(COIN_TRANSACTION_TYPE.TRANSFER, amount)

    if (amount + fee > userBalance) throw new BadRequestError({message: 'Insufficient balance'})

    const coin = await getCoin('M2X');

    const hash = await generateTrxHash()

    const toTrx = new Transaction()
    toTrx.user = toUser
    toTrx.amount = amount - fee
    toTrx.direction = TRANSACTION_DIRECTION.CREDIT
    toTrx.status = TRANSACTION_STATUS.COMPLETED
    toTrx.hash = hash
    toTrx.coin = coin
    toTrx.type = COIN_TRANSACTION_TYPE.TRANSFER

    await AppDataSource.manager.save(toTrx);

    const fromTrx = new Transaction()
    fromTrx.user = toUser
    fromTrx.amount = amount
    fromTrx.direction = TRANSACTION_DIRECTION.DEBIT
    fromTrx.status = TRANSACTION_STATUS.COMPLETED
    fromTrx.hash = hash
    fromTrx.fee = fee
    fromTrx.coin = coin
    fromTrx.type = COIN_TRANSACTION_TYPE.TRANSFER

    await AppDataSource.manager.save(fromTrx);

    return apiResponse({
        res,
        message: 'Transaction successfull'
    })


}