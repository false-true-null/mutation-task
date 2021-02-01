import Document from '../../interfaces/updateStatement/Document.interface';

export default (item: Document) => Object.values(item).some(Array.isArray);