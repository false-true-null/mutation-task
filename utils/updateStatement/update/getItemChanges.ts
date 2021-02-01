import Document from '../../../interfaces/updateStatement/Document.interface';
import Statement from '../../../interfaces/updateStatement/Statement.interface';
import hasSubDocument from '../hasSubDocument';
import { generateUpdates, getObjectDiff } from '.';

/**
 * this function will get the changes and map it to a string type object
 */
export default function getItemChanges(
  originalSubDocument: Document[],
  subDocument: Document[],
  key: string,
): Document {
  return subDocument
    .filter((item: Document) => item._id)
    .filter((item: Document) => !item._delete)
    .reduce((updateResponse: Statement, item: Document) => {

      const itemKey = originalSubDocument
        .findIndex((tempItem: Document) => tempItem._id === item._id);

      const originalItem = originalSubDocument[itemKey];

      if (!originalItem) {
        return updateResponse;
      }

      const difference = getObjectDiff(originalItem, item);
      const parentResponse = Object
        .keys(difference)
        .filter((differenceKey: string) => difference[differenceKey])
        .reduce((tempStatement:Statement, differenceKey: string) => Object.assign(tempStatement, {
          [`${key}.${itemKey}.${differenceKey}`]: difference[differenceKey],
        }), updateResponse);

      if (hasSubDocument(item)) {
        const childrenResponse = generateUpdates(originalItem, item);
        return Object
          .keys(childrenResponse)
          .reduce((tempStatement: Statement, childKey: string) => Object.assign(tempStatement, {
            [`${key}.${itemKey}.${childKey}`]: childrenResponse[childKey],
          }), parentResponse);
      }

      return parentResponse;
    }, {});
}