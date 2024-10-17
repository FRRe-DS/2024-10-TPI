// app/api/authHandler.js (or a utils folder)

export async function handleAuth({ formData, isLogin }) {
  const endpoint = isLogin
    ? `${process.env.NEXT_PUBLIC_API_URL}/login`
    : `${process.env.NEXT_PUBLIC_API_URL}/register`;

  try {
    const response = await fetch(endpoint, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response)
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Algo salió mal.");
    }

    return {
      data,
      success: true,
      message: isLogin ? "Logueado" : "Registrado",
      detail: data?.detail
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
