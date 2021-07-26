

const baseUrl = "http://localhost:5000/";

// export const GET = async (getURL) => {
//     const url = `${baseUrl.concat(getURL)}`;
//     const data = await fetch(url)
//     .then((response) => {
//         return response;
//     })
//     .catch((error) => {
//         console.log(error);
//     })
//     return data;

// }

export const GET = async (getUrl) => {
    const url = `${baseUrl.concat(getUrl)}`;
    const data = await fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        if(err?.status === 401) {
          return `Page not found`
        }
        if(err?.status === 404) {
          return `User not found`
        }
        console.log(err);
      });
    return data;
  };