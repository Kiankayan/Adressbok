export interface Employee {
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;

  location: {
    city: string;
    country: string;
  };
  picture: {
    large: string;
  };
}
