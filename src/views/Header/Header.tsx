type HeaderProps = {
  title: string;
  extra?: JSX.Element;
};

function Header({ title, extra }: HeaderProps) {
  return (
    <h1 className="text-black dark:text-white text-center font-semibold text-3xl pb-4">
      {title}
      {extra}
    </h1>
  );
}

export default Header;
