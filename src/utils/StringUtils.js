export default class StringUtils {

  static isNotNull(obj) {
      let rt = true;
      if (typeof obj === 'undefined') {
          rt = false;
      } else if (obj === null) {
          rt = false;
      } else if (obj === '') {
          rt = false;
      }
      return rt;
  }

    static truncateString(str, num) {
        if (StringUtils.isNotNull(str) && str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
      }

}