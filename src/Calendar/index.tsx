import dayjs, { Dayjs } from 'dayjs';
import './index.scss';
import MonthCalendar from './monthCalendar';
import Header from './header';
import { CSSProperties, ReactNode, useState } from 'react';
import cs from 'classnames'
import LocaleContext from './localeContext';
import { useControllableValue } from 'ahooks';

export interface CalendarProps {
    value?: Dayjs;
    defaultValue?: Dayjs; 
    // style和className用于修改Calendar组件外层容器的样式
    style?: CSSProperties;
    className?: string | string[];
    // 定制日期显示，会完全覆盖日期单元格
    dateRender?: (currentDate: Dayjs) => ReactNode;
    // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效
    dateInnerContent?: (currentDate: Dayjs) => ReactNode;
    // 国际化相关
    locale?: string;
    onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {

    const {
        value,
        style,
        className,
        locale,
        onChange
    } = props;

    // 进行className的合并
    const classNames = cs("calendar", className);

    // 抽离修改日期重复逻辑
    function changeDate(date: Dayjs) {
        setCurValue(date);
        setCurMonth(date);
        onChange?.(date);
    }

    // 处理点击
    // const [curValue, setCurValue] = useState<Dayjs>(value);
    const [curValue, setCurValue] = useControllableValue<Dayjs>(props, {
        defaultValue: dayjs()
    })
    function selectHandler(date: Dayjs) {
        changeDate(date);
    }

    // 处理头部切换月份
    // const [curMonth, setCurMonth] = useState<Dayjs>(value);
    const [curMonth, setCurMonth] = useState<Dayjs>(curValue);
    function prevMonthHandler() {
        setCurMonth(curMonth.subtract(1, 'month'));
    }
    function nextMonthHandler() {
        setCurMonth(curMonth.add(1, 'month'));
    }

    // 今天按钮回调
    function todayHandler() {
        const date = dayjs(Date.now());

        changeDate(date)
    }

    return <LocaleContext.Provider
        value={{ locale: locale || navigator.language }}>
        <div className={classNames} style={style}>
            <Header
                curMonth={curMonth}
                prevMonthHandler={prevMonthHandler}
                nextMonthHandler={nextMonthHandler}
                todayHandler={todayHandler}
            ></Header>
            <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler}></MonthCalendar>
        </div>
    </LocaleContext.Provider>
}

export default Calendar;