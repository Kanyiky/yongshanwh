/* 真太阳时
 * 北京时间按东经 120° 的平太阳时。
 * 改正：真太阳时 = 北京时间 + (当地经度 - 120) × 4 分钟 + 均时差。
 * 均时差用 Spencer 的近似式，误差大约在一分钟上下。
 * 时辰交界前后几分钟，结果可能因这个近似而差一个时辰。
 * 这里只改钟点，年月日的历法仍交给 lunar-javascript。
 */
var TrueSun = (function () {
  function dayOfYear(year, month, day) {
    var t = Date.UTC(year, month - 1, day);
    var start = Date.UTC(year, 0, 1);
    return Math.round((t - start) / 86400000) + 1;
  }

  /* 返回分钟。正数表示真太阳时比平时快。 */
  function equationOfTime(year, month, day) {
    var n = dayOfYear(year, month, day);
    var b = 2 * Math.PI * (n - 81) / 364;
    return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  }

  /* 经度改正加上均时差，单位分钟。 */
  function offsetMinutes(year, month, day, longitude) {
    return (longitude - 120) * 4 + equationOfTime(year, month, day);
  }

  /* 把年月日时分加上若干分钟。用 UTC 计算，避免受电脑时区影响。 */
  function addMinutes(year, month, day, hour, minute, delta) {
    var ms = Date.UTC(year, month - 1, day, hour, minute) + Math.round(delta * 60000);
    var dt = new Date(ms);
    return {
      year: dt.getUTCFullYear(),
      month: dt.getUTCMonth() + 1,
      day: dt.getUTCDate(),
      hour: dt.getUTCHours(),
      minute: dt.getUTCMinutes()
    };
  }

  function adjust(year, month, day, hour, minute, longitude) {
    var delta = offsetMinutes(year, month, day, longitude);
    var next = addMinutes(year, month, day, hour, minute, delta);
    next.offsetMinutes = delta;
    return next;
  }

  return {
    dayOfYear: dayOfYear,
    equationOfTime: equationOfTime,
    offsetMinutes: offsetMinutes,
    addMinutes: addMinutes,
    adjust: adjust
  };
})();
