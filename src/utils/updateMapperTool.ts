import {
  AccountDetail,
  IAccountDetail,
} from 'src/account/dto/accoun-detail.dto';
import { randomMathInterval } from './ramdomMathInterval';
import { IAccount } from 'src/account/dto/create-account.dto';

export const updateMapperTool = (accountSelected: IAccount) => {
  const transactionTypeList = ['payment reviced', 'payment send'];
  const transactionTypeSelected =
    transactionTypeList[Math.floor(Math.random() * transactionTypeList.length)];
  const transactionValue = randomMathInterval(0, 10);
  let newAccountDetail: IAccountDetail = {
    transactionType: transactionTypeSelected,
    credit:
      transactionTypeSelected === transactionTypeList[0]
        ? transactionValue
        : null,
    debit:
      transactionTypeSelected === transactionTypeList[1]
        ? transactionValue
        : null,
    balance: balanceMapper(
      transactionTypeSelected,
      accountSelected.details,
      transactionValue,
      transactionTypeList,
      'balance',
    ),
    availableBalance: balanceMapper(
      transactionTypeSelected,
      accountSelected.details,
      transactionValue,
      transactionTypeList,
      'availableBalance',
    ),
  };
  accountSelected.details = [...accountSelected?.details, newAccountDetail];
  accountSelected.balance =
    accountSelected?.details[accountSelected?.details?.length - 1]?.balance;
  accountSelected.availableBalance =
    accountSelected?.details[accountSelected?.details?.length - 1]
      ?.availableBalance;
  return accountSelected;
};

export const balanceMapper = (
  transactionType: string,
  details: AccountDetail[],
  transactionValue: number,
  transactionTypeList: string[],
  key: string,
): number => {
  if (details) {
    const lastIndex = details.length - 1;
    if (details?.length >= 1) {
      return transactionType === transactionTypeList[0]
        ? details[lastIndex][key] + transactionValue
        : details[lastIndex][key] - transactionValue;
    }
    if (details?.length < 1) {
      return transactionValue;
    }
  }
  return 0;
};
