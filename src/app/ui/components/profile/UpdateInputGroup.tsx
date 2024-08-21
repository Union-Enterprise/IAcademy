export default function UpdateInputGroup() {
  return (
    <div className="relative flex items-center overflow-hidden rounded-md">
      <input
        type="password"
        disabled
        value={user.password}
        className="bg-background-lightA text-text-lightSub text-opacity-60 w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue peer duration-100"
      />
      <button
        className="text-mainBlue text-sm absolute right-0 px-[10px] h-full"
        onClick={() => setPasswordView(true)}
      >
        Alterar
      </button>
    </div>
  );
}
