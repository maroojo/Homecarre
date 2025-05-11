const LogOutService = async () => {
  try {
    const response = await fetch(`/admin/logout`);
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};
export default LogOutService;
