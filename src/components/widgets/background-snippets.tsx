export const BackgroundSnippet = () => {
  return (
    <div
      className="absolute top-0 z-[-2] h-screen w-screen bg-background"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 80% at 50% -20%, oklch(0.7686 0.1647 70.0804 / 0.20), transparent)",
      }}
    />
  );
};
