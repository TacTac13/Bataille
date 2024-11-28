import { HttpHeaders } from "@angular/common/http";

export const environment = {
  httpOptions: {
    headers: new HttpHeaders({
      'Authorization': 'MySecret2024!',
    })
  },
  apiUrl: '/api',
};
