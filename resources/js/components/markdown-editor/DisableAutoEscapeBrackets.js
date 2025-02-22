const DisableAutoEscapeBrackets = (ctx) => {
  // prepare plugin
  return async () => {
    // Plugin code
    console.log(ctx);
    return async () => {
      // clean up plugin
    };
  };
};

export default DisableAutoEscapeBrackets;
