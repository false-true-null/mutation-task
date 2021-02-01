import Document from '../../../interfaces/updateStatement/Document.interface';
import Statement from '../../../interfaces/updateStatement/Statement.interface';

import { getItemToInsert } from '.';

/**
 * Functions checks if item is new and generates insert statement
 */
export default function generateInserts(document: Document, mutation: Document): Statement {
  return Object
    .keys(mutation)
    .filter((key: string) => Array.isArray(mutation[key]))
    .reduce((statement: Statement, key: string) => {
      const originalSubDocument = document[key] as Document[];
      const subDocument = mutation[key] as Document[];
      const itemsInserted = getItemToInsert(originalSubDocument, subDocument, key);
      
      if (!itemsInserted) return statement;
      return Object.assign(statement, itemsInserted);
    }, {});
}
