export default interface Document {
  [key: string]: Document[] | boolean | null | string | number ;
}