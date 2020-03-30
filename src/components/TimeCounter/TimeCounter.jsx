import React, { Component } from "react";
import PropTypes from "prop-types";
import Statistic from "antd/es/statistic";
import "antd/es/statistic/style/css";
import * as moment from "moment";
import { formatTimeCount, interopDefault } from "./utils";

const REFRESH_INTERVAL = 1000 / 30;

function getTime(value) {
  return interopDefault(moment)(value).valueOf();
}

class TimeCounter extends Component {
  static propTypes = {
    start: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    format: PropTypes.string,
    onFinish: PropTypes.func,
    onTick: PropTypes.func
  };

  static defaultProps = {
    format: "HH:mm:ss",
    onFinish: null,
    onTick: null
  };

  constructor(props) {
    super(props);

    this.timeCountID = null;
    this.isFinish = false;
  }

  componentDidMount() {
    this.syncTimer();
  }

  componentWillReceiveProps(nextProps) {
    // 如果重传start和value则把finsh标识置为false
    const { start: curStart, value: curValue } = this.props;
    const { start: newStart, value: newValue } = nextProps;
    if (curStart != newStart || curValue != newValue) {
      this.isFinish = false;
    }
  }

  componentDidUpdate() {
    this.syncTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  syncTimer = () => {
    const { start, value, onFinish, onTick } = this.props;

    const timestampValue = getTime(value);
    const timestampStart = getTime(start);
    const timestampCurt = Date.now();
    const timestampPassed = timestampCurt - timestampStart;
    // 开始时间要大于0，才能开启
    if (timestampStart > 0) {
      // 设定时间大于开始时间，才能开启
      if (timestampValue > timestampStart) {
        // 每次同步时的回调
        if (onTick) {
          onTick(timestampPassed);
        }

        // 当前时间大于等于设定时间，才能触发回调
        if (timestampCurt >= timestampValue) {
          if (this.timeCountID && !this.isFinish && onFinish) {
            this.isFinish = true;

            onFinish();
          }
        }
        this.startTimer();
      }
    }
  };

  startTimer = () => {
    if (this.timeCountID) {
      return;
    }

    this.timeCountID = window.setInterval(() => {
      this.forceUpdate();
    }, REFRESH_INTERVAL);
  };

  stopTimer = () => {
    if (this.timeCountID) {
      clearInterval(this.timeCountID);
      this.timeCountID = null;
      this.isFinish = false;
    }
  };

  formatTimeCount = (value, config) => {
    const { start, format } = this.props;
    const retValue = formatTimeCount(start, value, { ...config, format });

    return retValue;
  };

  // TimeCounter do not need display the timestamp
  valueRender = node =>
    React.cloneElement(node, {
      title: undefined
    });

  render() {
    return (
      <Statistic
        valueRender={this.valueRender}
        {...this.props}
        formatter={this.formatTimeCount}
      />
    );
  }
}

export default TimeCounter;
