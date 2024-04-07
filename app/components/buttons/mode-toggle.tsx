import { Theme, useTheme } from "remix-themes";
import { Button } from "~/Button";

export default function ModeToggle() {
  const [theme, setTheme] = useTheme();
  return (
    <Button
      onPress={() =>
        theme === "dark" ? setTheme(Theme.LIGHT) : setTheme(Theme.DARK)
      }
    >
      Set
    </Button>
  );
}
