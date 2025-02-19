const breakpoints = {
  mobile: "600px",
  tablet: "900px",
  desktop: "1200px",
};

const mq = {
  mobile: `(max-width: ${breakpoints.mobile})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
};

export default mq;
