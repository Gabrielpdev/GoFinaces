import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (balance.total < value && type === 'outcome') {
      throw Error('The amount withdrawn is greater than the total balance.');
    }

    const appointment = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return appointment;
  }
}

export default CreateTransactionService;
