import Document from '../../../interfaces/updateStatement/Document.interface';
import Statement from '../../../interfaces/updateStatement/Statement.interface';

/**
 * this function will return the difference between two documents
 *
 * @param orignalItem
 * @param item
 */
export default function getObjectDiff(orignalItem:Document, item:Document) {
  return Object
    .keys(orignalItem)
    .filter((key: string) => !Array.isArray(orignalItem[key]))
    .reduce((response: Statement, key: string) => {
      if (orignalItem[key] === item[key]) return response;
      return { ...response, ...{ [key]: item[key] } };
    }, {});
}