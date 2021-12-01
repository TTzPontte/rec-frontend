import notifications from '@iso/components/Feedback/Notification';
export default {
  onlyNumber(value, setFieldValue, field) {
    const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

    let result = value;
    if (regex.test(result.toString()) && setFieldValue) {
      setFieldValue(field, result);
    } else {
      result = value.replace(/\D/g, '');
      if (setFieldValue) {
        setFieldValue(field, result);
      }
    }

    return result;
  },

  removeLeftZeros(value, setFieldValue, field) {
    let result = value;

    if (result) {
      result = parseInt(result, 10);
      if (setFieldValue) {
        setFieldValue(field, result);
      }
    }
  },

  openNotification(icone, titulo, msg) {
    notifications[icone]({
      message: titulo,
      description: msg,
    });
  },
};
