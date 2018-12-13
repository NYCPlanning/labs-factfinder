import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function sanitizeStyle([styleObject]) {
  return htmlSafe(
    Object
      .keys(styleObject)
      .reduce((acc, key) => acc.concat(`${key}:${styleObject[key]};`), ''),
  );
}

export default helper(sanitizeStyle);
