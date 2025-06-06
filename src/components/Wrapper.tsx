import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      <footer className="w-full text-center py-4 text-xs text-blue-300 bg-transparent">
        Developed by manishkumarsharma
      </footer>
      </ThemeProvider>
    </>
  );
};

export default Wrapper;
