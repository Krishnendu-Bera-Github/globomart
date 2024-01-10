import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "https://fakestoreapi.com";

export const getProductList = async () => {
  try {
    const response = await axios.get(`${baseURL}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${baseURL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${baseURL}/products/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategory = async (category) => {
  try {
    const response = await axios.get(
      `${baseURL}/products/category/${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoginUser = async (user) => {
  try {
    if (user && user.email && user.password) {
      const response = await axios.get(
        `https://globomart-database.onrender.com/users?email=${user.email}&password=${user.password}`
      );

      if (response.data.length > 0) {
        toast.success(`Welcome to Globomart ${response?.data[0]?.firstName}`);
        return { success: true, user: response.data };
      } else {
        toast.warn("Invalid credentials");
        return { success: false, message: "Invalid credentials" };
      }
    }
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (newInfo) => {
  try {
    const response = await axios.put(
      `https://globomart-database.onrender.com/users/${newInfo.id}`,
      newInfo
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postResgisterUser = async (user) => {
  try {
    const emailExists = await checkUserExists(user?.email);
    if (emailExists) {
      toast.error(
        `Email ${user.email} already exists... Register with different email`
      );
      throw new Error("Email already exists");
    } else {
      const response = await axios.post(
        `https://globomart-database.onrender.com/users`,
        user
      );
      toast.success("Successfully Registered");
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const checkUserExists = async (email) => {
  try {
    const response = await axios.get(
      `https://globomart-database.onrender.com/users?email=${email}`
    );

    return response?.data?.length > 0;
  } catch (error) {
    throw error;
  }
};
