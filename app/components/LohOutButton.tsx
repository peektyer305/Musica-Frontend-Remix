export default function LogOutButton() {
  const logOut = async () => {
    console.log("ログアウト完了");
  };
  return (
    <button
      onClick={() => {
        logOut();
      }}
      className="text-gray-800 hover:text-blue-500 transition duration-300"
    >
      Logout
    </button>
  );
}
