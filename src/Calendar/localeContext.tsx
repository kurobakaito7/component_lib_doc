// 全局统一配置locale
import { createContext } from "react";

export interface LocaleContextType {
    locale: string;
}

const LocaleContext = createContext<LocaleContextType>({
    locale: 'zh-CN'
});

export default LocaleContext;