import DB from 'shared/infra/typeorm';

export default class Database extends DB {
  public async truncate(): Promise<void> {
    const conn = this.getConn();

    const clearPromises: Promise<void>[] = [];

    conn.forEach(connection =>
      connection.entityMetadatas.forEach(entity => {
        clearPromises.push(connection.getRepository(entity.name).clear());
      }),
    );

    await Promise.all(clearPromises);
  }
}
