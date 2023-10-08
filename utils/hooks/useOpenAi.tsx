import react, { useContext, useState } from 'react'
import { MessagesAiType, OpenAiContext } from '../contexts/OpenAiContext'
import { AxiosResponse } from 'axios';

const SYSTEM = `You are a highly skilled Code generator. I need a fully functional and professional HTML page. The output should be in pure HTML and meet the following criteria:

1. Use Bootstrap to create a responsive and attractive interface.
2. Incorporate at least one interactive component using JavaScript to enhance the user experience.
3. Apply styles to achieve a modern and sophisticated look.
4. Please, omit any comments or unnecessary text. The generated page should be ready for use and should not include additional text.
6. All the comments you make must be commented inside the html.
5. You must return what the user requires.


Please generate the corresponding HTML code following these detailed instructions.`

// 5. Integrate a contact form with fields for name, email, and message.
// 3. Add a navigation menu with at least three links to different sections of the page.
// 2. Include a header with the application title in a large and attention-grabbing size.
// 2. Add a navigation menu with at least three links to different sections of the page.
// 4. Create a main section that displays relevant content for the application.

export const useOpenAi = () => {
    const { openAiAuthAxios, openAiMessages, setOpenAiMessages } = useContext(OpenAiContext);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleRequestHtml = async (userRequest: string, callback: (r: AxiosResponse)=> void) => {
        setIsLoading(true)
        try {
            const response = await openAiAuthAxios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system", "content": SYSTEM, // All system settings used to generate a response  
                    },
                    ...openAiMessages, // load all previous messages
                    {"role": "user", content: userRequest}, // new message
                ] 
            })

            setOpenAiMessages([
                ...openAiMessages, // previous responses
                {"role": "user", content: userRequest}, // adds users request
                response.data.choices[0].message // adds new Ai response
            ]);
            callback(response);

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
 
    return {handleRequestHtml, isLoading}
}