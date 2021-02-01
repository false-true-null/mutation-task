import Document from '../../interfaces/updateStatement/Document.interface';
import { generateInserts } from './insert';
import { generateRemoves } from './remove';
import { generateUpdates } from './update';

const isEmpty = (obj: Object) => Object.keys(obj).length > 0;

/**
 * Generates updates statemen with a mutation string
 */
export default function generateUpdateStatement(originalDocument: Document, mutation: Document) {
  const updates = generateUpdates(originalDocument, mutation);
  const inserts = generateInserts(originalDocument, mutation);
  const removes = generateRemoves(originalDocument, mutation);
  const statement = {
    ...(isEmpty(updates) && {$update: updates}),
    ...(isEmpty(inserts) && {$add: inserts}),
    ...(isEmpty(removes) && {$remove: removes}),
  };  
  return statement;
}