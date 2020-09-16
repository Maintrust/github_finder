class EasyHTTP {
  async get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  // Make HTTP Post request
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const data2 = await response.json();
    return data2;
  }

  // Make an HTTP PUT request
  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const data2 = await response.json();
    return data2;
  }

  // Make an HTTP DELETE request
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    const data = await "User deleted";
    return data;
  }
}
