const DescriptionTab = ({ description }) => {
  return (
    <div className="rounded-2xl border border-amazon-border bg-amazon-surface p-6">
      <p className="leading-8 text-amazon-textLight">
        {description}
      </p>
    </div>
  );
};

export default DescriptionTab;