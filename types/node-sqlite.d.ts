declare module 'node:sqlite' {
  type SQLValue = null | number | bigint | string | Uint8Array;

  export class DatabaseSync {
    constructor(location: string, options?: { open?: boolean });
    close(): void;
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
  }

  export class StatementSync {
    all(...params: SQLValue[]): Record<string, SQLValue>[];
    get(...params: SQLValue[]): Record<string, SQLValue> | undefined;
    run(...params: SQLValue[]): { changes: number; lastInsertRowid: number | bigint };
  }
}
