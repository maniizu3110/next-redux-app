export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export const incrementCount = () => ({ type: INCREMENT });
export const decrementCount = () => ({ type: DECREMENT });
export const resetCount = () => ({ type: RESET });
