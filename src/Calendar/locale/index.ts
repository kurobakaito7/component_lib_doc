// 国际化资源包的入口
import zhCN from './zh-CN';
import enUS from './en-US';
import { CalendarType } from './interface';

const allLocales: Record<string, CalendarType> = {
    'zh-CN': zhCN,
    'en-US': enUS
}

export default allLocales;