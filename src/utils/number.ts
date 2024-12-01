// format number to currency with commas with no decimal points
export const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
    });
};

