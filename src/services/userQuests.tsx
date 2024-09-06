import config from "../config";

export const findUserQuests = async (id: string) => {
    try {
        const response = await fetch(`${config.apiUrl}/userQuests/findById?id=${id}`, {
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

export const findQuests = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/userQuests/findQuestsById`, {
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

export const registerNewQuestUser = async (userId: string) => {
    try {
        const response = await fetch(`${config.apiUrl}/userQuests/create`, {
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

export const findAllQuestUser = async (id: any) => {
  try {
    const data = await findUserQuests(id);
    if (data) {
        return data;
    } else {
      try {
        const newData = await registerNewQuestUser(id);
        if (newData) {
            return data;
        }
      } catch (error: any) {
        console.error('Error registering new quest user:', error);
      }
    }
  } catch (error: any) {
    console.error('Error fetching user quests:', error);
    if (error === "Games no encontradas") {
      console.log("Games no encontradas");
    }
  }
}

export const updateReward = async (userid: string, gachas: Number, game: string) => {
    try {
        const response = await fetch(`${config.apiUrl}/userQuests/updateReward`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ userid, gachas, game }),
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

export const updateWeekQuests = async (userid: string, numWeek: Number, login: Number, summon: Number) => {
    try {
        const response = await fetch(`${config.apiUrl}/userQuests/updateWeekQuests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ userid, numWeek, login, summon }),
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