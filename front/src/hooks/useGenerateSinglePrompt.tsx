import apiClient from "../api/client";

export const useGenerateSinglePrompt = () => {
  const postPromt = async (prompt: string): Promise<string> => {
    try {
      console.log("Sending prompt:", prompt);
      const response = await apiClient.post("/generate", {
        message: prompt,
      });
      console.log("Prompt Response:", response.data);

      if (!response.data.responseMessage) {
        throw new Error("No response message");
      }
      return response.data.responseMessage;
    } catch (error) {
      console.error("Promt failed:", error);
      return "We couldn´t process the request, try again later.";
    }
  };

  return { postPromt };
};
