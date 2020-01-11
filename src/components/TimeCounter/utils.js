import * as moment from "moment";
import padStart from "lodash/padStart";

function slicedToArray(arr, i) {
  return (
    arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest()
  );
}

function nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === "[object Arguments]"
    )
  ) {
    return;
  }
  const _arr = [];
  let _n = true;
  let _d = false;
  let _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function arrayWithHoles(arr) {
  if (Array.isArray(arr)) {
    return arr;
  }

  return null;
}

const timeUnits = [
  ["Y", 1000 * 60 * 60 * 24 * 365],
  ["M", 1000 * 60 * 60 * 24 * 30],
  ["D", 1000 * 60 * 60 * 24],
  ["H", 1000 * 60 * 60],
  ["m", 1000 * 60],
  ["s", 1000],
  ["S", 1]
];
export function formatTimeStr(duration, format) {
  var leftDuration = duration;
  var escapeRegex = /\[[^\]]*\]/g;
  var keepList = (format.match(escapeRegex) || []).map(function(str) {
    return str.slice(1, -1);
  });
  var templateText = format.replace(escapeRegex, "[]");
  var replacedText = timeUnits.reduce(function(current, _ref) {
    var _ref2 = slicedToArray(_ref, 2),
      name = _ref2[0],
      unit = _ref2[1];

    if (current.indexOf(name) !== -1) {
      var value = Math.floor(leftDuration / unit);
      leftDuration -= value * unit;
      return current.replace(new RegExp("".concat(name, "+"), "g"), function(
        match
      ) {
        var len = match.length;
        return padStart(value.toString(), len, "0");
      });
    }

    return current;
  }, templateText);
  var index = 0;
  return replacedText.replace(escapeRegex, function() {
    var match = keepList[index];
    index += 1;
    return match;
  });
}

export function formatTimeCount(start, value, config) {
  const config$format = config.format;
  const format = config$format === null ? "" : config$format;
  // const target = interopDefault(moment)(value).valueOf();
  //
  let diff = 0;
  // start要大于0
  if (start > 0) {
    const current = interopDefault(moment)().valueOf();
    const targetStart = interopDefault(moment)(start).valueOf();
    diff = Math.max(current - targetStart, 0);
  }

  return formatTimeStr(diff, format);
}

export function interopDefault(m) {
  return m.default || m;
}
