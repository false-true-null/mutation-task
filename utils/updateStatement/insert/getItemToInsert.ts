import Document from '../../../interfaces/updateStatement/Document.interface';
import hasSubDocument from '../hasSubDocument';
import generateInserts from './generateInserts';

/**
 * this function will get the new items and map it to a string type object
 */
export default function getItemToInsert(
  originalSubDocument: Document[],
  subDocument: Document[],
  key: string,
): Document {
  return subDocument
    .reduce((insertResponse: Document, item: Document) => {
      if (hasSubDocument(item)) {

        const itemKey = originalSubDocument
          .findIndex((tempItem: Document) => tempItem._id === item._id);
        
        const originalItem = originalSubDocument[itemKey];

        if (!originalItem) return insertResponse;
        
        const childrenInserts = generateInserts(originalItem, item);

        return Object
          .keys(childrenInserts)
          .reduce((tempResponse: Document, childKey: string) => Object.assign(tempResponse, {
            [`${key}.${itemKey}.${childKey}`]: childrenInserts[childKey],
          }), insertResponse);
      }

      if (item._id) return insertResponse;
      
      let tempItem = [item];
      if (Array.isArray(insertResponse[key])) {
        tempItem = (insertResponse[key] as Document[]).concat(item);
      }

      return Object.assign(insertResponse, {
        [key]: tempItem,
      });
    }, {});
}