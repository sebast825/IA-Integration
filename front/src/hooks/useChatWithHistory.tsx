import apiClient from "../api/client";

export const useChatWithHistory = () => {
  const postPromt = async (prompt: string): Promise<string> => {
    try {
      console.log("Sending prompt:", prompt);
      const response = await apiClient.post("/chat", {
        message: prompt,
      });
      console.log("Prompt Response:", response.data);

      if (!response.data.responseMessage) {
        throw new Error("No response message");
      }
      return response.data.responseMessage;
    } catch (error) {
      console.error("Promt failed:", error);
      throw new Error("No response message");
    }
  };

  return { postPromt };
};
