import config from "../config";

export const findUserGames = async (id: string) => {
    try {
        const response = await fetch(`${config.apiUrl}/userGames/findById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return undefined;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const findGameById = async (id: string) => {
    try {
        const response = await fetch(`${config.apiUrl}/userGames/findGameImageById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

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
};

export const registerNewGameUser = async (userId: string) => {
    try {
        const response = await fetch(`${config.apiUrl}/userGames/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ userId }),
        });

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
};

export const updateGameUser = async (userid: string, finished: boolean, tries: Number, resets: Number, statusReward: Number, game: string, mode: number) => {
    try {
        const response = await fetch(`${config.apiUrl}/userGames/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ userid, finished, tries, resets, statusReward, game, mode}),
        });

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
};

export const updateSelected = async (userid: string, game: string, mode: number) => {
    try {
        const response = await fetch(`${config.apiUrl}/userGames/updateSelected`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ userid, game, mode }),
        });

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
};

export const updateReward = async (userid: string, gachas: Number, status: Number, game: string, mode: number) => {
    try {
        const response = await fetch(`${config.apiUrl}/userGames/updateReward`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ userid, gachas, status, game, mode }),
        });

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
};

export const findCharacters = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/userGames/findCharacters`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

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
};

export const resetGame = async (userid: string, game: string, mode: number) => {
    try {
        const response = await fetch(`${config.apiUrl}/userGames/resetGame`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid, game, mode }),
        });

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
};

export const deleteAll = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/userGames/deleteAll`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error');
        }
        console.log(response)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};