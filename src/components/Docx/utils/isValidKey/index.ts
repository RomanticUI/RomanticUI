export default function (key: string | number | symbol, object: Object): key is keyof object {
  return key in object;
}
