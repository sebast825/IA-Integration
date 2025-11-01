import apiClient from "../api/client";

export const  useGenerate = () => {

  const postPromt = async (prompt: string) : Promise<string | undefined> => {
  try {
   console.log('Sending prompt:', prompt);
      const response = await apiClient.post('/generate', {
        message:prompt
    
      });
      console.log('Prompt Response:', response.data);

      return response.data.responseMessage
    } catch (error) {
      console.error('Promt failed:', error);
    }
   }

  return { postPromt };

}