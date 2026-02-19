/* hasData
* Method to check value against each key of passed object
* if value not present in any of the key then return false;
* if value present in all key of object then return true;
*/
const hasData = (obj: Record<string, any> | undefined) => {
  if (!obj) return false;
  return Object.values(obj).some(
    (value) =>
      value !== null &&
      value !== undefined &&
      (typeof value !== "string" || value.trim() !== "")
  );
};

export {hasData};