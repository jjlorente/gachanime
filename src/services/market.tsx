import config from "../config";

export const addCard = async (userId: string, cardId: string, price: number) => {
    try {
        const response = await fetch(`${config.apiUrl}/markets/addCard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, cardId, price}),
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getDataMarket = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/markets/getDataMarket`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const buyCard = async (userId: string, cardId: string, price: number, userIdMarket: string) => {
    try {
        const response = await fetch(`${config.apiUrl}/markets/buyCard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, cardId, price, userIdMarket}),
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const cancelCard = async (userId: string, cardId: string, price: number) => {
    try {
        const response = await fetch(`${config.apiUrl}/markets/cancelCard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, cardId, price }),
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}