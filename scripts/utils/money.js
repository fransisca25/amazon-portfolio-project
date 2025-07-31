export function formatCurrency(priceCents) {
    return (priceCents / 100).toFixed(2);
}

// each file can only have one default export!
export default formatCurrency;