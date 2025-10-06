"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusinessDaysBetween = exports.isBusinessDay = exports.isWeekend = exports.getDaysBetween = exports.addYears = exports.addMonths = exports.addDays = exports.formatDate = void 0;
const formatDate = (date, format = 'short') => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return '';
    }
    switch (format) {
        case 'short':
            return d.toLocaleDateString();
        case 'long':
            return d.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        case 'time':
            return d.toLocaleTimeString();
        case 'datetime':
            return d.toLocaleString();
        default:
            return d.toLocaleDateString();
    }
};
exports.formatDate = formatDate;
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
exports.addDays = addDays;
const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};
exports.addMonths = addMonths;
const addYears = (date, years) => {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
};
exports.addYears = addYears;
const getDaysBetween = (startDate, endDate) => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
exports.getDaysBetween = getDaysBetween;
const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
};
exports.isWeekend = isWeekend;
const isBusinessDay = (date) => {
    return !(0, exports.isWeekend)(date);
};
exports.isBusinessDay = isBusinessDay;
const getBusinessDaysBetween = (startDate, endDate) => {
    let count = 0;
    const current = new Date(startDate);
    while (current <= endDate) {
        if ((0, exports.isBusinessDay)(current)) {
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    return count;
};
exports.getBusinessDaysBetween = getBusinessDaysBetween;
//# sourceMappingURL=date.js.map