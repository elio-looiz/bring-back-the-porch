export const Footer = () => {
  return (
    <footer className="relative bg-gray-950 py-10 px-4 text-center text-gray-500 border-t border-gray-800 z-50">
      <div className="container mx-auto text-sm">
        <p>
          &copy; {new Date().getFullYear()} Bring Back The Porch. All rights
          reserved.
        </p>
        <p className="mt-2">Made with ❤️ for Medicine Hat.</p>
      </div>
    </footer>
  );
};
