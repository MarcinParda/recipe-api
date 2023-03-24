export const initializeSeeds = () => {
  const ACCEPTED_ENVS = ['development', 'test'];
  const env = process.env.NODE_ENV;

  if (!ACCEPTED_ENVS.includes(env)) {
    console.info(
      '[DANGER] CANNOT make a seed for \x1b[31m%s\x1b[0m [DANGER]',
      env,
    );
    console.info(
      'You need to exactly specify the \x1b[35mNODE_ENV\x1b[0m as one of: \x1b[31m%s\x1b[0m!',
      ACCEPTED_ENVS.join(' or '),
    );
    console.info(
      'Only the %s can perform seed! TO prevent .del() DB on any of production env',
      ACCEPTED_ENVS,
    );
    process.exit(1);
  }
};
