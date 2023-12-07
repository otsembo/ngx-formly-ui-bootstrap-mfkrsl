type ObjectWithId = { id?: string; [key: string]: any };
import  deepmerge  from 'ts-deepmerge';

export function overrideObjectArrayById<T extends ObjectWithId>(
  override_id: string,
  override_object: T,
  objectArray: T[]
): T[] {
  const findAndMerge = (obj: T) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (Array.isArray(obj[key])) {
          (obj[key] as T[]).forEach((item: T) => findAndMerge(item));
        } else {
          findAndMerge(obj[key] as T);
        }
      } else if (key === 'id' && obj[key] === override_id) {
        Object.assign(obj, deepmerge(obj, override_object));
      }
    }
  }
  

  objectArray.forEach(findAndMerge);

  return objectArray;
}