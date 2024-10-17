// app/api/authHandler.js (or a utils folder)

export async function handleAuth({ formData, isLogin }) {
  const endpoint = isLogin
    ? `${process.env.NEXT_PUBLIC_API}/login`
    : `${process.env.NEXT_PUBLIC_API}/register`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Algo salió mal.");
    }

    return {
      success: true,
      message: isLogin ? "Logueado" : "Registrado",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
