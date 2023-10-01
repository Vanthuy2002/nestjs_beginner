export const logger = (params?: any): void => {
  if (params) {
    console.log(params.toString());
  }
};
