module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white: { A700: "#ffffff" },
        black: { 900: "#000000", "900_59": "#00000059" },
        teal: { A200: "#7fffd4" },
      },
      boxShadow: { xs: "0px 2px  4px 0px #821218" },
      fontFamily: { rubik: "Rubik", poppins: "Poppins" },
      backgroundImage: { gradient: "linear-gradient(148deg, #ffffff7f,#ffffff00)" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
