import hasChildArray from '../hasSubDocument';
import Document from '../../../interfaces/updateStatement/Document.interface';
import Statement from '../../../interfaces/updateStatement/Statement.interface';
import checkRemoveItem from './generateRemoves';

/**
 * this function will get the remove flag items and map it to a string type object
 */
export default function getItemToRemove(
  originalSubDocument: Document[],
  subDocument: Document[],
  key: string,
): Document {
  return subDocument
    .reduce((deleteStatement: Statement, item: Document) => {
      const originalItem = originalSubDocument
        .find((tempItem: Document) => tempItem._id === item._id);

      const itemKey = originalSubDocument
        .findIndex((tempItem: Document) => tempItem._id === item._id);

      if (!originalItem) {
        return deleteStatement;
      }

      if (hasChildArray(item)) {
        const childrenResponse = checkRemoveItem(originalItem, item);

        return Object
          .keys(childrenResponse)
          .reduce((tempStatement: Statement, childKey: string) => Object.assign(tempStatement, {
            [`${key}.${itemKey}.${childKey}`]: true,
          }), deleteStatement);
      }

      if (!item._delete) {
        return deleteStatement;
      }

      return Object.assign(deleteStatement, {
        [`${key}.${itemKey}`]: true,
      })
    }, {});
}