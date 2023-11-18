function containsSpecialChars(str: string): boolean {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  
  function uuidContainsSpecialChars(str: string): boolean {
    const specialChars = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  
  function sanitize(string: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => map[match]);
  }
  
  function sanitizeData(data: any): { status: boolean; message: any } {
    for (let key in data) {
      if (data.hasOwnProperty(key) && data[key]) {
        if (typeof data[key] === "object" && Array.isArray(data[key])) {
          data[key].forEach((item: any) => sanitizeData(item));
        } else if (typeof data[key] === "object") {
          sanitizeData(data[key]);
        } else if (key === "user_name" && containsSpecialChars(data[key])) {
          return {
            status: false,
            message: "Special character found in username",
          };
        } else if (
          key === "user_email" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data[key].toLowerCase()))
        ) {
          return {
            status: false,
            message: "Enter a valid email",
          };
        } else {
          data[key] = sanitize(data[key]);
        }
      }
    }
    return {
      status: true,
      message: data,
    };
  }
  
  function sanitizeUserPrefs(data: any): { status: boolean; message: any } {
    for (let key in data) {
      if (data.hasOwnProperty(key) && data[key]) {
        if (typeof data[key] === "object" && Array.isArray(data[key])) {
          data[key].forEach((item: any) => sanitizeUserPrefs(item));
        } else if (typeof data[key] === "object") {
          sanitizeUserPrefs(data[key]);
        } else if (key === "news_preferences" && containsSpecialChars(data[key])) {
          return {
            status: false,
            message: `${key} cannot include special characters`,
          };
        } else {
          data[key] = sanitize(data[key]);
        }
      }
    }
    return {
      status: true,
      message: data,
    };
  }
  
  function queryParamsValidator(queryParam: string, type: string): { status: boolean; message: string } {
    if (uuidContainsSpecialChars(queryParam)) {
      return {
        status: false,
        message: "Cannot contain special characters",
      };
    } else if (typeof queryParam !== type) {
      return {
        status: false,
        message: `${type} expected in request param`,
      };
    } else {
      return {
        status: true,
        message: "All right",
      };
    }
  }
  
  export { sanitizeData, sanitizeUserPrefs, queryParamsValidator };
  