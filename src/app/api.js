import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const fetchCryptoStats = async (coin) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/crypto/stats`, {
      params: { coin },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch crypto stats",
    );
  }
};

export const fetchDeviation = async (coin) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/crypto/deviation`, {
      params: { coin },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch deviation data",
    );
  }
};

export const fetchMarketChart = async (coin, days) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/crypto/market-chart`, {
      params: { coin, days },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch market chart data",
    );
  }
};
