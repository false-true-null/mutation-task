import Document from '../../../interfaces/updateStatement/Document.interface';
import Statement from '../../../interfaces/updateStatement/Statement.interface';
import { getItemToRemove } from '.';


/**
 * Function generate items to remove
 */
export default function generateRemovess(
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

      // check the removed ones (_delete = true)
      const itemsRemoved = getItemToRemove(originalSubDocument, subDocument, key);

      if (!itemsRemoved) {
        return statement;
      }

      return Object.assign(statement, itemsRemoved);
    }, {});
}