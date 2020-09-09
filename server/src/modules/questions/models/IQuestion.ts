export default interface IQuestion {
  id: string;

  title: string;

  text: string;

  disabledAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}
