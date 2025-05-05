const Authentication = async () => {
  try {
    const response = await fetch(`api/auth/authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response) {
      throw new Error("Network response was not ok");
    }
    return response;
  } catch (error) {
    console.error("Check User error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default Authentication;
