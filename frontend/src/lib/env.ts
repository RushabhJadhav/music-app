export const getEnv = (key: string) => {
  const value = import.meta.env[key];
  if(!value) throw new Error(`Missing environmental Variable: ${key}`);
  return value;
};