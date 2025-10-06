"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateText = exports.formatEmployeeId = exports.formatPhoneNumber = exports.capitalizeWords = exports.capitalizeFirst = exports.formatPercentage = exports.formatNumber = exports.formatCurrency = void 0;
const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
};
exports.formatCurrency = formatCurrency;
const formatNumber = (number, locale = 'en-US') => {
    return new Intl.NumberFormat(locale).format(number);
};
exports.formatNumber = formatNumber;
const formatPercentage = (value, decimals = 2) => {
    return `${(value * 100).toFixed(decimals)}%`;
};
exports.formatPercentage = formatPercentage;
const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
exports.capitalizeFirst = capitalizeFirst;
const capitalizeWords = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};
exports.capitalizeWords = capitalizeWords;
const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
};
exports.formatPhoneNumber = formatPhoneNumber;
const formatEmployeeId = (id) => {
    // Convert "EMP2024001" to "EMP-2024-001"
    const match = id.match(/^EMP(\d{4})(\d{3})$/);
    if (match) {
        return `EMP-${match[1]}-${match[2]}`;
    }
    return id;
};
exports.formatEmployeeId = formatEmployeeId;
const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};
exports.truncateText = truncateText;
//# sourceMappingURL=formatting.js.map