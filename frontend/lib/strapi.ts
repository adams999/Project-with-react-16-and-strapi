import { cacheLife } from "next/cache";
import qs from "qs";

export const STRAPI_BASE_URL =
  process.env.STRAPI_BASE_URL || "http://localhost:1337";

const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
};

export async function getHomePage() {
  'use cache'
  cacheLife({expire: 3600});
  
  const query = qs.stringify(QUERY_HOME_PAGE);
  const response = await getStrapiData(`home-page?${query}`);
  return response?.data;
}

export async function getStrapiData(endpoint: string) {
  const url = `${STRAPI_BASE_URL}/api/${endpoint}`;    
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch data from Strapi" + res.status);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    return null;
  }
}

export async function registerUserService(userData:object) {
  try {
    const res = await fetch(`${STRAPI_BASE_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || { status: res.status, message: "Registration failed" } };
    }

    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: { status: 500, message: "Network error occurred" } };
  }
}


export async function loginUserService(userData:object) {
  try {
    const res = await fetch(`${STRAPI_BASE_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify(userData),
    });    

    return await res.json();
    }catch (error) {
      console.error("Error login user:", error);
      throw error;
    }
  }