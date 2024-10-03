import config from "../config";

export const findGoogleUser = async (username: any, email: any, googleAccount: any) => {
  try {
    const response = await fetch(`${config.apiUrl}/users/findGoogle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, googleAccount }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const findUser = async (username: string, password: string, googleAccount: boolean) => {
  try {
    const response = await fetch(`${config.apiUrl}/users/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, googleAccount }),
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

export const registerUser = async (username: string, password: string, email: string, googleAccount:boolean) => {
  try {
    const response = await fetch(`${config.apiUrl}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email, googleAccount }),
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

export const updateReset = async (userId: string) => {
  try {
    const response = await fetch(`${config.apiUrl}/users/updateReset`, {
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

export const findUserById = async (id: string) => {
  try {
      const response = await fetch(`${config.apiUrl}/users/findById?id=${id}`, {
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

export const updateLevel = async (userid: string, exp: number) => {
  try {
      const response = await fetch(`${config.apiUrl}/users/updateLevel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({ userid, exp }),
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

export const updateUser = async (userid: string, picture: string, username: string, sound: number) => {
  try {
    const response = await fetch(`${config.apiUrl}/users/updateUser`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userid, picture, username, sound}),
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
}

export const unlockMode = async (userid: string, mode: number) => {
  try {
    const response = await fetch(`${config.apiUrl}/users/unlockMode`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userid, mode}),
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
}

export const updateUserLan = async (userid: string, lan: string) => {
  try {
    const response = await fetch(`${config.apiUrl}/users/updateUserLan`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userid, lan}),
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
}

export const updateTotalPower = async (userid: string, power: number) => {
  try {
    const response = await fetch(`${config.apiUrl}/users/updatePower`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userid, power}),
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
}

export const getRank = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/users/getRank`, {
      method: 'GET',
      headers : {
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
}