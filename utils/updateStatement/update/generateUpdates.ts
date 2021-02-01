import Document from '../../../interfaces/updateStatement/Document.interface';
import Statement from '../../../interfaces/updateStatement/Statement.interface';
import { getItemChanges } from '.';

/**
 * Check if item is changed and generate update statements
 */
export default function generateUpdates(
  originalDocument: Document,
  mutation: Document,
): Statement {
  return Object
    .keys(mutation)
    .filter((key: string) => Array.isArray(mutation[key]))
    .reduce((statement: Statement, key: string) => {
      // check in the document if the array item exists
      const originalSubDocument = originalDocument[key] as Document[];
      const subDocument = mutation[key] as Document[];

      if (!originalSubDocument || !subDocument) {
        return statement;
      }

      // check the update ones (_id exists)
      const itemsUpdated = getItemChanges(originalSubDocument, subDocument, key);

      if (!itemsUpdated) {
        return statement;
      }

      return Object.assign(statement, itemsUpdated);
    }, {});
}