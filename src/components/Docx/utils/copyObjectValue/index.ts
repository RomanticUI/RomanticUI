import isValidKey from '../isValidKey';

export default <T extends {}>(
  object: T,
  copiedObject: Object,
  expects: Array<number | string | symbol> = ['disposition', 'children'],
) => {
  Object.keys(copiedObject)
    .filter((value) => expects.indexOf(value) === -1)
    .forEach((value) => {
      if (isValidKey(value, copiedObject)) {
        object[value] = copiedObject[value];
      }
    });

  return object;
};
