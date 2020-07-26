export default class dateUtil {
  static getCurrentFormatDate () {
    const date = new Date()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    let currentDate = date.getFullYear() + '-' + month + '-' + strDate
    return currentDate
  }
}
