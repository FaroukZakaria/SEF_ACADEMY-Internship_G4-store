const Input = ({ label, icon, ...props }) => {
  return (
    <>
      <label className="text-xs text-amazon-textLight">{label}</label>
      <div className="flex items-center gap-2 border-2 border-amazon-border rounded-2xl px-4 py-3 mt-1 focus-within:border-amazon-orange">
        <p className="text-gray-400">{icon}</p>
        <input
          className="w-full outline-none bg-transparent"
          {...props}
        />
      </div>
    </>
  );
};

export default Input;
