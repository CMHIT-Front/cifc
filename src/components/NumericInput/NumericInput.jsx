import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "antd/es/input";
import "antd/es/input/style/css";

export default class NumericInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    onBlur: undefined
  };

  onChange = e => {
    const { max, min, precision, positiveNumber, onChange } = this.props;
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    // 不能输入非数字，并且要通过正则校验
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      // 值要为数字才进行下面的校验
      if (!isNaN(value)) {
        // 值是否只能为正数
        if (positiveNumber) {
          if (value === "-" || parseFloat(value) < 0) {
            return;
          }
        }
        // 值的精度
        const precisionLength = parseInt(precision);
        if (precisionLength && !isNaN(precisionLength)) {
          const arrValue = value.split(".");
          if (arrValue && arrValue.length > 1) {
            const valuePrecision = arrValue[1];
            const valuePrecisionLength = valuePrecision.length;
            if (valuePrecisionLength > precisionLength) {
              return;
            }
          }
        }
        if (max && !isNaN(max)) {
          // 值只能小于等于定义的最大值
          if (parseFloat(max) < parseFloat(value)) {
            return;
          }
        }
        // 值只能大于等于定义的最小值
        if (min && !isNaN(min)) {
          if (parseFloat(min) > parseFloat(value)) {
            return;
          }
        }
      }

      if (onChange) {
        onChange(value);
      }
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = e => {
    const {
      value,
      max,
      min,
      precision,
      positiveNumber,
      onBlur,
      onChange
    } = this.props;
    let valueTemp = value;
    // 值末尾为.或只输入了-，则需要去掉
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    // 值要为数字才进行下面的校验
    if (!isNaN(value)) {
      // 值是否只能为正数
      if (positiveNumber) {
        if (value === "-" && parseFloat(value) < 0) {
          valueTemp = "";
        }
      }
      // 值的精度
      const precisionLength = parseInt(precision);
      if (precisionLength && !isNaN(precisionLength)) {
        const arrValue = value.split(".");
        if (arrValue && arrValue.length > 1) {
          const valuePrecision = arrValue[1];
          const valuePrecisionLength = valuePrecision.length;
          if (valuePrecisionLength > precisionLength) {
            valueTemp = "";
          }
        }
      }
      // 值只能小于等于定义的最大值
      if (max && !isNaN(max)) {
        if (parseFloat(max) < parseFloat(value)) {
          valueTemp = "";
        }
      }
      // 值只能大于等于定义的最小值
      if (min && !isNaN(min)) {
        if (parseFloat(min) > parseFloat(value)) {
          valueTemp = "";
        }
      }
    } else {
      valueTemp = "";
    }

    if (onChange) {
      onChange(valueTemp.replace(/0*(\d+)/, "$1"));
      if (onBlur) {
        onBlur(e);
      }
    }
  };

  render() {
    return (
      <Input {...this.props} onChange={this.onChange} onBlur={this.onBlur} />
    );
  }
}
