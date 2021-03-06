export const __prod__: boolean = process.env.NODE_ENV === 'production';
export const __dev__: boolean = process.env.NODE_ENV === 'development';
export const __test__: boolean = __prod__ === __dev__;
export const port: number = 8081;