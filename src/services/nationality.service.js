import http from '../config/http';

const path = '/?name=';

export const getNameOrigin = async (name) => {
  try {
    const resp = await http.get(`${path}${name}`);
    return resp.data;
  } catch (error) {
    return error.message;
  }
};

export const getNamesOrigin = async (names) => {
  let uri = '/?name[]=';

  names.map((name, i) => {
    if (i > 0) {
      uri = uri + '&name[]=' + name;
    } else {
      uri = uri + name;
    }
  });

  try {
    const answer = await http.get(uri);
    return answer;
  } catch (error) {
    return error;
  }
};
