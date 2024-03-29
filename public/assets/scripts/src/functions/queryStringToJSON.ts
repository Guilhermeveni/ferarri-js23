import { AnyObject } from "../types/anyObject";

const splitQueryString = (queryString: string, values: AnyObject) => {
  queryString
    .split("?")[1]
    .split("&")
    .forEach((item) => {
      const keyAndValue = item.split("=");
      const key = keyAndValue[0];
      const value = keyAndValue[1];

      if (values[key]) {
        if (values[key] instanceof Array) {
          values[key].push(value);
        } else {
          values[key] = [values[key], value];
        }
      } else {
        values[key] = value;
      }
    });

  return values;
};

export const queryStringToJSON = () => {
  let values = {} as AnyObject;
  const queryString = location.search;

  if (queryString) {
    values = splitQueryString(queryString, values);
  } else if (location.hash) {
    values = splitQueryString(location.hash, values);
  }

  return values;
};
