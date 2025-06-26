 export const url = "http://localhost:9000/api"

export const handleApiResponse = async (response: Response) => {
    if(!response.ok) {
        let errorMessage = `Request failed with status ${response.status}: ${response.statusText}`;

        try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } else {
                const errorText = await response.text();
                if (errorText) {
                    errorMessage = errorText;
                }
            }
        } catch (parseError) {
            console.warn('Failed to parse error response:', parseError)
        }

        throw new Error(errorMessage)
    }
    return response
}