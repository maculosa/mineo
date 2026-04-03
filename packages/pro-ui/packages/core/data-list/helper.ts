import type { DataListFilter, DataListSort, DataListSchema } from "./types";

/**
 * 过滤数据
 * @param data 原始数据
 * @param filters 过滤条件
 * @returns 过滤后的数据
 */
export function filterData(data: any[], filters: DataListFilter[]): any[] {
  if (!filters || filters.length === 0) {
    return data;
  }

  return data.filter(item => {
    return filters.every(filter => {
      const { field, value, operator = 'contains' } = filter;
      const itemValue = item[field];

      if (itemValue === undefined || itemValue === null) {
        return false;
      }

      switch (operator) {
        case 'eq':
          return itemValue === value;
        case 'contains':
          return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
        case 'startsWith':
          return String(itemValue).toLowerCase().startsWith(String(value).toLowerCase());
        case 'endsWith':
          return String(itemValue).toLowerCase().endsWith(String(value).toLowerCase());
        case 'gt':
          return Number(itemValue) > Number(value);
        case 'lt':
          return Number(itemValue) < Number(value);
        case 'gte':
          return Number(itemValue) >= Number(value);
        case 'lte':
          return Number(itemValue) <= Number(value);
        default:
          return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
      }
    });
  });
}

/**
 * 排序数据
 * @param data 原始数据
 * @param sort 排序条件
 * @returns 排序后的数据
 */
export function sortData(data: any[], sort: DataListSort | null): any[] {
  if (!sort) {
    return data;
  }

  const { field, direction } = sort;
  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue < bValue) {
      return direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

/**
 * 分页数据
 * @param data 原始数据
 * @param page 当前页码
 * @param pageSize 每页条数
 * @returns 分页后的数据
 */
export function paginateData(data: any[], page: number, pageSize: number): any[] {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
}

/**
 * 格式化数据项
 * @param item 数据项
 * @param schema Schema 配置
 * @returns 格式化后的数据项
 */
export function formatItem(item: any, schema: DataListSchema[]): any {
  if (!schema || schema.length === 0) {
    return item;
  }

  const formattedItem = { ...item };
  schema.forEach(fieldSchema => {
    const { field, format } = fieldSchema;
    if (format && formattedItem[field] !== undefined) {
      formattedItem[field] = format(formattedItem[field], item);
    }
  });
  return formattedItem;
}

/**
 * 生成骨架屏数据
 * @param count 骨架屏数量
 * @param schema Schema 配置
 * @returns 骨架屏数据
 */
export function generateSkeletonData(count: number, schema: DataListSchema[]): any[] {
  return Array.from({ length: count }, () => {
    const skeletonItem: any = {};
    schema.forEach(fieldSchema => {
      const { field, type = 'text' } = fieldSchema;
      switch (type) {
        case 'text':
          skeletonItem[field] = 'skeleton';
          break;
        case 'number':
          skeletonItem[field] = 0;
          break;
        case 'date':
          skeletonItem[field] = new Date();
          break;
        case 'boolean':
          skeletonItem[field] = false;
          break;
        default:
          skeletonItem[field] = 'skeleton';
      }
    });
    return skeletonItem;
  });
}

/**
 * 深度克隆对象
 * @param obj 要克隆的对象
 * @returns 克隆后的对象
 */
export function deepClone(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  if (typeof obj === 'object') {
    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

/**
 * 检查两个对象是否相等
 * @param obj1 第一个对象
 * @param obj2 第二个对象
 * @returns 是否相等
 */
export function isEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }
  if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}
